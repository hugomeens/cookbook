import Recipe from '../recipe/index';
import API from '../../services/api';
import { useEffect, useState } from 'react';
import { Modal, Text, Grid, ScrollArea, Button, Center } from '@mantine/core';
import setNotification from '../errors/error-notification';
import ItemGridViewRecipe from './item-grid-view';

const ModalValidateRecipes = ({ open, handler }) => {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        API.listRecipes()
            .then((res) => {
                if (res.status === 200) {
                    res.data = res.data.filter((recipe) => recipe.valid === false);
                    setRecipes(res.data);
                }
            })
            .catch((err) => {
                setNotification(true, err);
            });

        return () => {};
    }, []);

    const clickHandler = async (item) => {
        try {
            await API.validateRecipe({ _id: item._id });
            item.valid = true;
        } catch (error) {
            setNotification(true, error);
        }
    };

    return (
        <Modal.Root opened={open} onClose={handler} size="lg">
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fz="lg" fw={700}>
                            Validate recipes
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <ScrollArea h={500} offsetScrollbars>
                        <Grid columns={12}>
                            {recipes.map((recipe) => (
                                <Grid.Col span={6} key={recipes._id}>
                                    <ItemGridViewRecipe
                                        item={recipe}
                                        button={{
                                            clickHandler,
                                            text: 'Validate',
                                        }}
                                    />
                                </Grid.Col>
                            ))}
                        </Grid>
                    </ScrollArea>
                    <Center mt="md">
                        <Button onClick={handler}>Close</Button>
                    </Center>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalValidateRecipes;
