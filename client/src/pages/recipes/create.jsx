import { Modal } from '@mantine/core';

const ModalCreate = ({ open, handler }) => {
    return (
        <Modal.Root opened={open} onClose={handler}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>Create Recipe</Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <p>Modal body</p>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalCreate;
