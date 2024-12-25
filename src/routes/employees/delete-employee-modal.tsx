import { Button, Modal, Tooltip } from '@/components/ui';
import { IconTrash } from 'justd-icons';

export type DeleteEmployeeModalProps = {
	onConfirm: () => void;
};

export const DeleteEmployeeModal = ({ onConfirm }: DeleteEmployeeModalProps) => {
	return (
		<Modal>
			<Tooltip>
				<Button
					appearance='plain'
					size='square-petite'
					className='[&_[data-slot=icon]]:text-red-500 hover:bg-red-100'
				>
					<IconTrash />
				</Button>
				<Tooltip.Content>Delete employee</Tooltip.Content>
			</Tooltip>

			<Modal.Content role='alertdialog'>
				{({ state: { close } }) => (
					<>
						<Modal.Header>
							<Modal.Title>Delete employee</Modal.Title>
							<Modal.Description>
								This will permanently delete the employee. Are you sure you want to continue?
							</Modal.Description>
						</Modal.Header>
						<Modal.Footer>
							<Modal.Close appearance='outline'>Cancel</Modal.Close>
							<Button
								appearance='solid'
								intent='danger'
								onPress={() => {
									close();
									onConfirm();
								}}
							>
								Continue
							</Button>
						</Modal.Footer>
					</>
				)}
			</Modal.Content>
		</Modal>
	);
};
