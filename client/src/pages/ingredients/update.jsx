import { Modal, Button, TextInput, Select, FileInput, Text, Image, Group } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';

const ModalUpdateIngredient = ({ item, opened, handler }) => {
    const handleClose = () => {
        form.reset();
        handler();
    };

    const form = useForm({
        initialValues: {
            name: item.name,
            type: item.type,
            image: item.image,
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
                            Update Ingredient
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
                                Update
                            </Button>
                        </Group>
                    </form>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalUpdateIngredient;
