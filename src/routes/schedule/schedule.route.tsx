import { useEmployees } from '@/hooks/useEmployees';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { useLocalStorage } from 'usehooks-ts';
import { Schedule, ShiftType } from './types';
import { Button, Select } from '@/components/ui';
import { copyHtmlTableToClipboard, generateData } from './table-generation';
import { EmployeeSelect } from './employee-select';
import { EmployeeShiftCount } from './employee-shift-count';

type ScheduleSearch = {
	month: number;
	year: number;
};

export const Route = createFileRoute('/')({
	component: RouteComponent,
	validateSearch: (search: Record<string, unknown>): ScheduleSearch => {
		const currentDate = dayjs();

		return {
			month: Number(search?.month || currentDate.month()),
			year: Number(search?.year || currentDate.year()),
		};
	},
});

function RouteComponent() {
	const { employees } = useEmployees();
	const { month, year } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const daysInMonth = dayjs().year(year).month(month).daysInMonth();
	const months = dayjs.months().map((month, index) => ({ id: index, label: month }));
	const years = Array.from({ length: 11 }, (_, index) => ({
		id: year - 5 + index,
		label: (year - 5 + index).toString(),
	}));

	const [schedule, setSchedule] = useLocalStorage<Schedule>(`schedule-${month}-${year}`, {} as Schedule);

	const updateEmployees = (day: number, shift: ShiftType, selectedEmployees: Array<string>) => {
		setSchedule((prev) => ({
			...prev,
			[day]: {
				...prev[day],
				[shift]: selectedEmployees,
			},
		}));
	};

	return (
		<div className='flex gap-4 h-full'>
			<div className='flex flex-col gap-4 flex-1'>
				<div className='flex gap-2 items-end'>
					<Select
						aria-label='Month'
						selectedKey={month}
						onSelectionChange={(key) => navigate({ search: (prev) => ({ ...prev, month: Number(key) }) })}
						className='w-32'
					>
						<Select.Trigger />
						<Select.List items={months}>
							{(month) => (
								<Select.Option key={month.id} textValue={month.label}>
									{month.label}
								</Select.Option>
							)}
						</Select.List>
					</Select>
					<Select
						aria-label='Year'
						selectedKey={year}
						onSelectionChange={(key) => navigate({ search: (prev) => ({ ...prev, year: Number(key) }) })}
						className='w-24'
					>
						<Select.Trigger />
						<Select.List items={years}>
							{(year) => (
								<Select.Option key={year.id} textValue={year.label}>
									{year.label}
								</Select.Option>
							)}
						</Select.List>
					</Select>

					<Button
						className='ml-auto'
						onPress={async () => {
							const employeeMap = employees.reduce<Record<string, string>>((acc, employee) => {
								acc[employee.id] = employee.name;

								return acc;
							}, {});

							await copyHtmlTableToClipboard(generateData({ schedule, employeeMap, month, year }));
						}}
					>
						Generate schedule table
					</Button>
				</div>

				<div className='flex flex-col gap-4 overflow-auto'>
					{Array(daysInMonth)
						.fill(1)
						.map((_, index) => {
							const day = index + 1;
							const date = dayjs().year(year).month(month).date(day);

							return (
								<div key={day} className='rounded-md px-4 py-2 border shadow-sm flex flex-col gap-2'>
									<div className='flex items-center justify-between'>
										<p className='text-lg text-left mb-1'>
											<span className='font-semibold text-indigo-700'>
												{date.format('MMMM D ')}
											</span>
											<span className='text-stone-700'>{date.format('- dddd')}</span>
										</p>
										<Button
											size='extra-small'
											appearance='outline'
											onPress={() =>
												setSchedule((prev) => ({
													...prev,
													[day]: { am: [], pm: [], night: [] },
												}))
											}
										>
											Clear
										</Button>
									</div>
									<div className='flex gap-8'>
										<EmployeeSelect
											selectedEmployees={schedule?.[day]?.['am'] ?? []}
											onSelectedEmployeesChange={(selectedEmployees) =>
												updateEmployees(day, 'am', selectedEmployees)
											}
											type='am'
										/>
										<EmployeeSelect
											selectedEmployees={schedule?.[day]?.['pm'] ?? []}
											onSelectedEmployeesChange={(selectedEmployees) =>
												updateEmployees(day, 'pm', selectedEmployees)
											}
											type='pm'
										/>
										<EmployeeSelect
											selectedEmployees={schedule?.[day]?.['night'] ?? []}
											onSelectedEmployeesChange={(selectedEmployees) =>
												updateEmployees(day, 'night', selectedEmployees)
											}
											type='night'
										/>
									</div>
								</div>
							);
						})}
				</div>
			</div>
			<EmployeeShiftCount schedule={schedule} />
		</div>
	);
}
