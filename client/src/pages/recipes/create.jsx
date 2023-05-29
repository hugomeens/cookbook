import { Modal, Text } from '@mantine/core';
import API from '../../services/api';
import RecipeViewEditor from './recipe-view-editor';

const ModalCreate = ({ open, handler }) => {
    const createRecipe = (recipe) => {
        handler(recipe);
    };

    return (
        <Modal.Root opened={open} onClose={handler} size="xl">
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Create Recipe
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <RecipeViewEditor
                        buttonText={'Create recipe'}
                        handler={(recipe) => createRecipe(recipe)}
                        APICall={API.createRecipe}
                    />
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalCreate;
