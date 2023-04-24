import { Modal, Text } from '@mantine/core';
import API from '../../services/api';
import RecipeViewEditer from './recipe-view-editer';

const ModalCreate = ({ open, handler }) => {
    const createRecipe = (recipe) => {
        handler();
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
                    <RecipeViewEditer buttonText={'Create recipe'} handler={createRecipe} APICall={API.createRecipe}/>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalCreate;
