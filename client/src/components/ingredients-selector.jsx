import { Modal, Button, Text, Group, Grid, TextInput } from '@mantine/core';
import mockdata from '../pages/ingredients/mockdata';
import SelectorItem from './select-item';
import { IconSearch } from '@tabler/icons-react';

const ModalIngredientsSelector = ({ opened, handleClose, handleSubmit, ...props }) => {
    const ingredients = [];

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
                    <Grid columns={3}>
                        {mockdata.map((ingredient) => (
                            <SelectorItem ingredient={ingredient} clickHandler={clickHandler} key={ingredient.id} />
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
