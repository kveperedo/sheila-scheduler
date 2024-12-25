import { useEmployees } from '@/hooks/useEmployees';

type ValidationResult = {
	errorMessage?: string;
	result?: string;
};

const ERROR_MESSAGES = {
	EMPTY: 'Employee name cannot be empty',
	INVALID: 'Employee name is invalid',
	EXISTS: 'Employee already exists',
} as const;

export const useValidateEmployeeName = () => {
	const { employees } = useEmployees();
	const employeesSet = new Set(employees.map((employee) => employee.name.toLowerCase()));

	const validate = (name: unknown): ValidationResult => {
		if (!name) {
			return { errorMessage: ERROR_MESSAGES.EMPTY };
		}
		if (typeof name !== 'string') {
			return { errorMessage: ERROR_MESSAGES.INVALID };
		}

		const trimmedName = name.trim();
		if (trimmedName === '') {
			return { errorMessage: ERROR_MESSAGES.EMPTY };
		}

		const isEmployeeExists = employeesSet.has(trimmedName.toLowerCase());
		if (isEmployeeExists) {
			return { errorMessage: ERROR_MESSAGES.EXISTS };
		}

		return { result: trimmedName };
	};

	return { validate };
};
