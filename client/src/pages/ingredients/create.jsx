import { Modal, Text, Select, TextInput, Button, FileInput, Group } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

const ModalCreateIngredient = ({ opened, handler }) => {
    const handleClose = () => {
        form.reset();
        handler();
    };

    const form = useForm({
        initialValues: {
            name: '',
            type: '',
            image: '',
        },
        validate: {
            name: isNotEmpty('Name is required'),
            type: isNotEmpty('Type is required'),
            image: isNotEmpty('Image is required'),
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (form.validate().hasErrors) return;
        console.log(form.values, 'MUST BE SENT TO BACKEND');
    };

    return (
        <Modal.Root opened={opened} onClose={handleClose} size="xs">
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Create Ingredient
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            label="Name"
                            placeholder="Name"
                            withAsterisk
                            {...form.getInputProps('name')}
                            mb="md"
                        />
                        <Select
                            label="Unit"
                            placeholder="Select unit"
                            withAsterisk
                            dropdownPosition="bottom"
                            {...form.getInputProps('type')}
                            data={[
                                { label: 'Grams', value: 'g' },
                                { label: 'Centiliters', value: 'cl' },
                            ]}
                            mb="md"
                        />
                        <FileInput
                            label="Image"
                            placeholder="Select image"
                            withAsterisk
                            {...form.getInputProps('image')}
                        />
                        <Group position="right" mt="md">
                            <Button type="button" variant="light" color="red" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="light" color="green">
                                Create
                            </Button>
                        </Group>
                    </form>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalCreateIngredient;
