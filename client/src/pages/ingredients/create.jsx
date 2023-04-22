import { Modal, Text } from '@mantine/core';
import IngredientViewUpdate from './ingredient-view-update';
import API from '../../services/api';

const ModalCreateIngredient = ({ opened, handler, addIngredient }) => {

    const validated = (item) => {
        console.log("validated")
        addIngredient(item);
        handler();
    }

    return (
        <Modal.Root opened={opened} onClose={handler} size="xs">
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
                    <IngredientViewUpdate buttonText="Create" APICall={API.createIngredient} hanlder={validated}/>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalCreateIngredient;
