import { Modal, Button, Text, Group, Grid, TextInput, ScrollArea } from '@mantine/core';
import SelectorItem from './select-item';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import API from '../services/api';
import setNotification from '../pages/errors/error-notification';

const ModalIngredientsSelector = ({ opened, handleClose, handleSubmit, ...props }) => {
    const [ingredients, setIngredients] = useState([]);
    let resIngredients = [];

    const clickHandler = (ingredient) => {
        if (props.multi) {
            // eslint-disable-next-line eqeqeq
            const indexIngredient = resIngredients.findIndex((item) => item._id == ingredient._id);
            console.log(indexIngredient, ingredient.name);
            if (indexIngredient === -1) {
                resIngredients.push(ingredient);
            } else {
                resIngredients.splice(indexIngredient, 1);
            }
        } else {
            handleSubmitLocal(ingredient);
        }
    };

    const handleSubmitLocal = (ingredient) => {
        handleSubmit(props.multi ? resIngredients : ingredient);
        handleClose();
    };

    useEffect(() => {
        API.listIngredients()
            .then((res) => {
                if (res.status === 200) {
                    setIngredients(res.data);
                }
            })
            .catch((err) => {
                setNotification(true, err);
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
                    <TextInput
                        placeholder="Type to Search"
                        mb="sm"
                        radius="md"
                        icon={<IconSearch size="1rem" stroke={1.5} />}
                    />
                    <ScrollArea h={430} offsetScrollbars>
                        <Grid columns={3}>
                            {ingredients.map((ingredient) => (
                                <SelectorItem
                                    ingredient={ingredient}
                                    clickHandler={clickHandler}
                                    key={ingredient._id}
                                />
                            ))}
                        </Grid>
                    </ScrollArea>
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
