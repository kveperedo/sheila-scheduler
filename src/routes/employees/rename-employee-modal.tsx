import { Button, Modal, TextField, Tooltip } from '@/components/ui';
import { IconPencilBox } from 'justd-icons';
import { useValidateEmployeeName } from './hooks';
import { useState } from 'react';

export type RenameEmployeeModalProps = {
	employeeName: string;
	onRename: (employeeName: string) => void;
};

export const RenameEmployeeModal = ({ employeeName, onRename }: RenameEmployeeModalProps) => {
	const [errorMessage, setErrorMessage] = useState<string | undefined>();
	const { validate } = useValidateEmployeeName();

	const handleSubmit = (close: () => void) => (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const { result, errorMessage } = validate(formData.get('employee'));
		if (errorMessage) {
			setErrorMessage(errorMessage);
			return;
		}

		onRename(result as string);
		close();
	};

	return (
		<Modal>
			<Tooltip>
				<Button appearance='plain' size='square-petite'>
					<IconPencilBox />
				</Button>
				<Tooltip.Content>Rename employee</Tooltip.Content>
			</Tooltip>
			<Modal.Content>
				{({ state: { close } }) => (
					<form onSubmit={handleSubmit(close)}>
						<Modal.Header>
							<Modal.Title>Rename employee</Modal.Title>
							<Modal.Description>
								<TextField
									aria-label='Employee name'
									name='employee'
									defaultValue={employeeName}
									isInvalid={Boolean(errorMessage)}
									errorMessage={errorMessage}
									onChange={() => setErrorMessage(undefined)}
								/>
							</Modal.Description>
						</Modal.Header>
						<Modal.Footer>
							<Modal.Close type='button' appearance='outline'>
								Cancel
							</Modal.Close>
							<Button appearance='solid' type='submit'>
								Rename
							</Button>
						</Modal.Footer>
					</form>
				)}
			</Modal.Content>
		</Modal>
	);
};
