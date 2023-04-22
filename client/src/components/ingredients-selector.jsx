import { Modal, Button, Text, Group, Grid, TextInput, ScrollArea } from '@mantine/core';
import SelectorItem from './select-item';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import API from '../services/api';

const ModalIngredientsSelector = ({ opened, handleClose, handleSubmit, ...props }) => {
    const [ingredients, setIngredients] = useState([]);

    const clickHandler = (ingredient) => {
        const { id, name, unit } = ingredient;
        if (props.multi) {
            if (ingredients.includes({ id, name, unit, quantity: 0 })) {
                const index = ingredients.indexOf({ id, name, unit, quantity: 0 });
                ingredients.splice(index, 1);
            } else ingredients.push({ id, name, unit, quantity: 0 });
        } else {
            handleSubmitLocal({ id, name, unit, quantity: 0 });
        }
    };

    const handleSubmitLocal = (ingredient) => {
        handleSubmit(props.multi ? ingredients : ingredient);
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
                    <TextInput
                        placeholder="Type to Search"
                        mb="sm"
                        radius="md"
                        icon={<IconSearch size="1rem" stroke={1.5} />}
                    />
                    <ScrollArea h={430} offsetScrollbars>
                        <Grid columns={3}>
                            {ingredients.map((ingredient) => (
                                <SelectorItem ingredient={ingredient} clickHandler={clickHandler} key={ingredient._id} />
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
