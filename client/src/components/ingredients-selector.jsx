import { Modal, Button, Text, Group, Grid, TextInput, ScrollArea } from '@mantine/core';
import mockdata from '../pages/ingredients/mockdata';
import SelectorItem from './select-item';
import { IconSearch } from '@tabler/icons-react';

const ModalIngredientsSelector = ({ opened, handleClose, handleSubmit, ...props }) => {
    const ingredients = [];

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
                            {mockdata.map((ingredient) => (
                                <SelectorItem ingredient={ingredient} clickHandler={clickHandler} key={ingredient.id} />
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
