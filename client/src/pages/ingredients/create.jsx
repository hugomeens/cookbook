import { Modal, Text } from '@mantine/core';
import IngredientViewEditer from './ingredient-view-editer';
import API from '../../services/api';

const ModalCreateIngredient = ({ opened, handler, addIngredient }) => {
    const validated = (item) => {
        addIngredient(item);
        handler();
    };

    return (
        <Modal.Root opened={opened} onClose={handler}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Create Ingredient
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <IngredientViewEditer
                        buttonText="Create"
                        APICall={API.createIngredient}
                        handler={(item) => validated(item)}
                    />
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalCreateIngredient;
