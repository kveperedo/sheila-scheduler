import { useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const useEmployees = () => {
	const [employees, setEmployees] = useLocalStorage<Array<{ id: string; name: string }>>('employees', []);
	const employeeMap = useMemo(() => new Map(employees.map((employee) => [employee.id, employee.name])), [employees]);

	return { employees, employeeMap, setEmployees };
};
