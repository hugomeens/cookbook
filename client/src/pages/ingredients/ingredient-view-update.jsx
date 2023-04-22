import { Button, TextInput, Select, FileInput, Image, Group } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import { useState } from 'react';

const IngredientViewUpdate = ({ item, handler, buttonText, APICall }) => {
    const handleClose = (ingredient) => {
        form.reset();
        handler(ingredient);
    };

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        initialValues: {
            name: item?.name ?? '',
            unit: item?.type ?? '',
            image: item?.image ?? '',
            alternativeNames: item?.alternativeNames?.join(';') ?? '',
        },
        validate: {
            name: isNotEmpty('Name is required'),
            unit: isNotEmpty('Unit is required'),
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (form.validate().hasErrors) return;
        try {
            setIsLoading(true);
            form.values.alternativeNames =
                (form.values?.alternativeNames?.length ?? 0) > 0 ? form.values.alternativeNames.split(';') : [];
            delete form.values.image;
            form.values.imageId = '';
            if (item) {
                form.values._id = item?._id;
            }
            const res = await APICall(form.values);
            setIsLoading(false);
            handleClose(res.data);
        } catch (error) {
            setIsLoading(false);
            // todo
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} mb="sm" />
            <TextInput
                label="Alternate names"
                placeholder="Alternate names"
                description="Semicolon separated"
                {...form.getInputProps('alternativeNames')}
                mb="sm"
            />
            <FileInput label="Image" placeholder="Select image" {...form.getInputProps('image')} mb="md" />
            <Image src={form.values.image} alt={form.values.name} withPlaceholder height={160} radius="sm" />
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
                <Button type="submit" variant="light" color="green" loading={isLoading}>
                    {buttonText}
                </Button>
            </Group>
        </form>
    );
};

export default IngredientViewUpdate;
