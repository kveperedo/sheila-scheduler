import { useEmployees } from '@/hooks/useEmployees';
import { ComboBox, MultipleSelect, Tag } from '../../components/ui';
import { useMemo } from 'react';
import { ShiftType } from './types';

export type EmployeeSelectProps = {
	selectedEmployees: Array<string>;
	onSelectedEmployeesChange: (selectedEmployees: Array<string>) => void;
	type: ShiftType;
};

const shiftTypeMap = {
	am: 'AM',
	pm: 'PM',
	night: 'Night',
};

export const EmployeeSelect = ({ type, selectedEmployees, onSelectedEmployeesChange }: EmployeeSelectProps) => {
	const { employees, employeeMap } = useEmployees();
	const selectedEmployeeSet = useMemo(() => new Set(selectedEmployees), [selectedEmployees]);
	const filteredEmployees = useMemo(
		() => employees.filter((employee) => !selectedEmployeeSet.has(employee.id)),
		[employees, selectedEmployeeSet]
	);

	const selectedEmployeesList = useMemo(
		() =>
			selectedEmployees
				.filter((id) => Boolean(employeeMap.get(id)))
				.map((id) => ({ id, name: employeeMap.get(id) ?? '' })),
		[selectedEmployees, employeeMap]
	);

	return (
		<div className='flex gap-2 flex-col flex-1'>
			<Tag.Group
				aria-label='Selected employees'
				onRemove={(keys) =>
					onSelectedEmployeesChange(selectedEmployees.filter((employee) => !keys.has(employee)))
				}
			>
				<Tag.List items={selectedEmployeesList}>
					{(employee) => <Tag.Item intent='secondary'>{employee.name}</Tag.Item>}
				</Tag.List>
			</Tag.Group>
			<ComboBox
				aria-label='Employee select'
				placeholder={`Select ${shiftTypeMap[type]} employees`}
				selectedKey={null}
				onSelectionChange={(key) => onSelectedEmployeesChange([...selectedEmployees, key as string])}
				className='mt-auto'
			>
				<ComboBox.Input />
				<ComboBox.List items={filteredEmployees}>
					{(employee) => (
						<MultipleSelect.Option textValue={employee.name}>{employee.name}</MultipleSelect.Option>
					)}
				</ComboBox.List>
			</ComboBox>
		</div>
	);
};
