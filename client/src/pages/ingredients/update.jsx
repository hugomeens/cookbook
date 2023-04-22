import { Modal, Text } from '@mantine/core';
import API from '../../services/api';
import IngredientViewUpdate from './ingredient-view-update';

const ModalUpdateIngredient = ({ item, opened, handler, updateIngredient }) => {
    const validated = (ingredient) => {
        console.log(ingredient);
        updateIngredient(ingredient);
        handler();
    };

    return (
        <Modal.Root opened={opened} onClose={handler} size="xs">
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Update Ingredient
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <IngredientViewUpdate
                        item={item}
                        buttonText="Update"
                        APICall={API.updateIngredient}
                        handler={(ingredient) => validated(ingredient)}
                    />
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalUpdateIngredient;
