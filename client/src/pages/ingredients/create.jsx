import { Modal, Text, Select, TextInput, Button, FileInput, Group, Image } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useRef } from 'react';
import API from '../../services/api';

const ModalCreateIngredient = ({ opened, handler }) => {
    const handleClose = () => {
        form.reset();
        handler();
    };

    const button = useRef(null);

    const form = useForm({
        initialValues: {
            name: '',
            unit: '',
            image: '',
        },
        validate: {
            name: isNotEmpty('Name is required'),
            unit: isNotEmpty('Unit is required'),
            // image: isNotEmpty('Image is required'),
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (form.validate().hasErrors) return;
        try {
            button.current.loading = true;
            form.values.alternativeNames = []; //todo
            delete form.values.image;
            form.values.imageId = "";
            console.log(form.values)
            await API.createIngredient(form.values);
            button.current.loading = false;
            handleClose();
        } catch (error) {
            button.current.loading = false;
            // todo
        }
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
                            {...form.getInputProps('unit')}
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
                            <Button ref={button} type="submit" variant="light" color="green">
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
