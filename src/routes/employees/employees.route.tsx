import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';
import { useValidateEmployeeName } from './hooks';
import { useEmployees } from '@/hooks/useEmployees';
import { Button, GridList, TextField } from '@/components/ui';
import { RenameEmployeeModal } from './rename-employee-modal';
import { DeleteEmployeeModal } from './delete-employee-modal';

export const Route = createFileRoute('/employees')({
	component: RouteComponent,
});

function RouteComponent() {
	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const { validate } = useValidateEmployeeName();
	const { employees, setEmployees } = useEmployees();
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const { result, errorMessage } = validate(formData.get('employee'));
		if (errorMessage) {
			setErrorMessage(errorMessage);
			inputRef.current?.focus();
			return;
		}

		setEmployees((prev) => [...prev, { id: crypto.randomUUID(), name: result as string }]);
		e.currentTarget.reset();
	};

	return (
		<div className='flex flex-col gap-4 h-full overflow-auto'>
			<form className='flex gap-4 items-start' onSubmit={handleSubmit}>
				<TextField
					ref={inputRef}
					name='employee'
					aria-label='Add employee form'
					placeholder='Add new employees here'
					className='w-96'
					onChange={() => setErrorMessage(undefined)}
					isRequired
					isInvalid={Boolean(errorMessage)}
					errorMessage={errorMessage}
				/>
				<Button intent='primary' type='submit'>
					Add employee
				</Button>
			</form>
			<GridList
				aria-label='Employee list'
				items={employees}
				selectionMode='none'
				layout='stack'
				className='grid grid-cols-3 max-h-[unset] gap-2 h-full border-none auto-rows-max rounded-none'
			>
				{(employee) => (
					<GridList.Item
						id={employee.id}
						textValue={employee.name}
						className='items-center justify-between border rounded-md first:rounded-md first:border-t last:rounded-md last:border-b'
					>
						<span className='mr-auto'>{employee.name}</span>
						<div className='flex items-center gap-2'>
							<RenameEmployeeModal
								employeeName={employee.name}
								onRename={(newEmployeeName) => {
									setEmployees((prev) =>
										prev.map((prevEmployee) =>
											prevEmployee.id === employee.id
												? { ...prevEmployee, name: newEmployeeName }
												: prevEmployee
										)
									);
								}}
							/>
							<DeleteEmployeeModal
								onConfirm={() => {
									setEmployees((prev) =>
										prev.filter((prevEmployee) => prevEmployee.id !== employee.id)
									);
								}}
							/>
						</div>
					</GridList.Item>
				)}
			</GridList>
		</div>
	);
}
