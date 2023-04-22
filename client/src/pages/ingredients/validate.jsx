import IngredientView from './ingredient-view';
import API from '../../services/api';
import { useEffect, useState } from 'react';
import { Modal, Text, Paper, Grid, ScrollArea, Button, Center } from '@mantine/core';

const ModalValidateIngredients = ({ opened, handler }) => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        API.listIngredients()
            .then((res) => {
                if (res.status === 200) {
                    res.data = res.data.filter((ingredient) => ingredient.valid === false);
                    setIngredients(res.data);
                }
            })
            .catch((err) => {
                // todo
                console.log(err);
            });

        return () => {};
    }, []);

    const clickHandler = async (item) => {
        try {
            await API.validateIngredient({ _id: item._id });
            item.valid = true;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal.Root opened={opened} onClose={handler} size="lg">
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fz="lg" fw={700}>
                            Validate ingredients
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <Paper shadow="sm" p="md" withBorder mb="md">
                        <ScrollArea h={500} offsetScrollbars>
                            <Grid columns={12}>
                                {ingredients.map((ingredient) => (
                                    <Grid.Col span={6} key={ingredient._id}>
                                        <IngredientView
                                            item={ingredient}
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
                    </Paper>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalValidateIngredients;
