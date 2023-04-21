import { Modal, Button, Text, Image, Group, Grid, Card, Title, Center } from '@mantine/core';
import { useEffect, useState } from 'react';
import API from '../services/api';

const ModalIngredientsSelector = ({ opened, handleClose, handleSubmit, ...props }) => {
    const [ingredients, setIngredients] = useState([]);

    const clickHandler = (ingredient) => {
        if (props.multi) {
            if (ingredients.includes(ingredient)) {
                const index = ingredients.indexOf(ingredient);
                ingredients.splice(index, 1);
            } else ingredients.push(ingredient);
        } else {
            handleSubmitLocal(ingredient);
        }
    };

    const handleSubmitLocal = (ingredient) => {
        if (props.multi) {
            handleSubmit(ingredients);
        } else {
            handleSubmit(ingredient);
            handleClose();
        }
    };

    useEffect(() => {
        API.listIngredients()
            .then((res) => {
                if (res.status === 200) {
                    setIngredients(res.data);
                }
            })
            .catch((err) => {
                // todo
                console.log(err);
            });

        return () => {};
    }, []);

    return (
        <Modal.Root opened={opened} onClose={handleClose} size="lg">
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Select Ingredient{props.multi ? 's' : ''}
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <Grid columns={3}>
                        {ingredients.map((ingredient) => (
                            <Grid.Col span={1} key={ingredient._id}>
                                <Card shadow="sm">
                                    <Card.Section>
                                        <Image
                                            src={ingredient.image}
                                            alt={ingredient.name}
                                            height={100}
                                            fit="cover"
                                            radius="md"
                                        />
                                    </Card.Section>
                                    <Center>
                                        <Title order={4} mt="md">
                                            {ingredient.name}
                                        </Title>
                                    </Center>
                                    <Button mt="sm" fullWidth variant="light" onClick={() => clickHandler(ingredient)}>
                                        Select
                                    </Button>
                                </Card>
                            </Grid.Col>
                        ))}
                    </Grid>
                    {props.multi && (
                        <Group position="right" mt="md">
                            <Button variant="light" color="red" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="light" color="green" onClick={() => handleSubmitLocal()}>
                                Validate
                            </Button>
                        </Group>
                    )}
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalIngredientsSelector;
