import API from '../../services/api';
import { useEffect, useState } from 'react';
import { Alert, Modal, Text, Grid, ScrollArea, Button, Center } from '@mantine/core';
import setNotification from '../errors/error-notification';
import ItemGridViewRecipe from './item-grid-view';
import { IconCheck } from '@tabler/icons-react';

const ModalValidateRecipes = ({ open, handler, updater }) => {
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
                setNotification(true, err.response.data.error);
            });

        return () => {};
    }, []);

    const clickHandler = (item) => {
        API.validateRecipe({ _id: item._id })
            .then((res) => {
                if (res.status === 200) {
                    setRecipes(recipes.filter((r) => r._id !== item._id));
                    updater(item._id);
                }
            })
            .catch((error) => {
                setNotification(true, error.response.data.error);
            });
    };

    return (
        <Modal.Root opened={open} onClose={handler} size="lg">
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fz="lg" fw={700}>
                            Validate Recipes
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <ScrollArea h={500} offsetScrollbars>
                        <Grid columns={12}>
                            {recipes.length === 0 ? (
                                <Grid.Col span={12}>
                                    <Center>
                                        <Alert icon={<IconCheck />} color="green" m="xl">
                                            All recipes are validated !
                                        </Alert>
                                    </Center>
                                </Grid.Col>
                            ) : (
                                recipes.map((recipe) => (
                                    <Grid.Col span={6} key={recipe._id}>
                                        <ItemGridViewRecipe item={recipe} validate={() => clickHandler(recipe)} />
                                    </Grid.Col>
                                ))
                            )}
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
