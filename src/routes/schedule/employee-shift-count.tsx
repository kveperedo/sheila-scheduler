import { useMemo } from 'react';
import { Schedule } from './types';
import { useEmployees } from '@/hooks/useEmployees';

const calculateEmployeeShiftCount = (schedule: Schedule, employeeMap: Map<string, string>): Record<string, number> => {
	const employeeShiftCount: Record<string, number> = {};

	Object.values(schedule).forEach((shifts) => {
		Object.values(shifts).forEach((employeeIds) => {
			employeeIds.forEach((employeeId) => {
				const isExistingEmployee = employeeMap.has(employeeId);
				if (!isExistingEmployee) {
					return;
				}

				employeeShiftCount[employeeId] = (employeeShiftCount[employeeId] ?? 0) + 1;
			});
		});
	});

	return employeeShiftCount;
};

export type EmployeeShiftCountProps = {
	schedule: Schedule;
};

export const EmployeeShiftCount = ({ schedule }: EmployeeShiftCountProps) => {
	const { employeeMap } = useEmployees();
	const employeeShiftCount = useMemo(
		() => calculateEmployeeShiftCount(schedule, employeeMap),
		[employeeMap, schedule]
	);
	const totalCount = useMemo(
		() => Object.values(employeeShiftCount).reduce((acc, count) => acc + count, 0),
		[employeeShiftCount]
	);

	return (
		<div className='w-64 rounded-md px-6 py-4 border shadow-sm flex flex-col'>
			<p className='text-lg text-left mb-4'>Employee Shift Count</p>
			{Object.entries(employeeShiftCount).map(([employeeId, count]) => (
				<p key={employeeId} className='flex items-center justify-between py-1'>
					<span className='text-stone-800 font-semibold'>{employeeMap.get(employeeId)}</span>
					<span>{count}</span>
				</p>
			))}
			<p className='mt-auto text-right'>Total count: {totalCount}</p>
		</div>
	);
};
