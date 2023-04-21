import { Modal, Button, TextInput, Select, FileInput, Text, Image, Group } from '@mantine/core';
import mockdata from '../pages/ingredients/mockdata';
import GridViewIngredients from '../pages/ingredients/grid-view-ingredients';

const ModalIngredientsSelector = ({ opened, handleClose, handleSubmit, ...props }) => {
    const ingredients = [];

    const clickHandler = (ingredient) => {
        if (props.multi) {
            ingredients.push(ingredient);
        } else {
            handleSubmitLocal(ingredient);
        }
    };

    const handleSubmitLocal = (ingredient) => {
        handleSubmit(ingredient);
        handleClose();
    };

    return (
        <Modal.Root opened={opened} onClose={handleClose} size="xs">
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
                    <GridViewIngredients
                        data={mockdata}
                        updateItem={() => {}}
                        button={{ text: props.multi ? 'Add' : 'Select', clickHandler: clickHandler }}
                        updateHandler={() => {}}
                    />
                </Modal.Body>
                {props.multi && (
                    <Group position="right" mt="md">
                        <Button variant="light" color="red" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="light"
                            color="green"
                            onClick={() => handleSubmitLocal(ingredients)}
                        >
                            Validate
                        </Button>
                    </Group>
                )}
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalIngredientsSelector;
