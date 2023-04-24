import { Modal, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import RecipeViewEditer from './recipe-view-editer';

const ModalUpdate = ({ open, handler, id }) => {
    const updateRecipe = (recipe) => {
        handler();
    };

    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        if (!id) return;
        API.getRecipe(id)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setRecipe(res.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        return () => {};
    }, [id]);

    return (
        <Modal.Root opened={open} onClose={handler} size="xl">
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Update Recipe
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <RecipeViewEditer
                        buttonText={'Update recipe'}
                        handler={updateRecipe}
                        APICall={API.updateRecipe}
                        recipe={recipe}
                    />
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalUpdate;
