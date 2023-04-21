import { Modal, Text, Select, TextInput, Button, FileInput, Group, Image } from '@mantine/core';
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
            alternateNames: '',
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
                            mb="sm"
                        />
                        <TextInput
                            label="Alternate names"
                            placeholder="Alternate names"
                            description="Semicolon separated"
                            {...form.getInputProps('alternateNames')}
                            mb="sm"
                        />
                        <FileInput
                            label="Image"
                            placeholder="Select image"
                            withAsterisk
                            {...form.getInputProps('image')}
                            mb="md"
                        />
                        <Image
                            src={form.values.image}
                            alt={form.values.name}
                            withPlaceholder
                            height={160}
                            radius="sm"
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
                            my="md"
                        />
                        <Group position="right" mt="md">
                            <Button variant="light" color="red" onClick={handleClose}>
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
