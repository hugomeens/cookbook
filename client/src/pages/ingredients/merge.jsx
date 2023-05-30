import { SimpleGrid, Card, Image, TextInput, Select, Button, Modal, Center, Text } from '@mantine/core';
import { useState } from 'react';
import ModalIngredientsSelector from '../../components/ingredients-selector';
import IngredientView from './ingredient-view';
import cnf from '../../config';
import API from '../../services/api';
import setNotification from '../errors/error-notification';
import { isNotEmpty, useForm } from '@mantine/form';

const ModalMergeIngredients = ({ opened, handler, updater }) => {
    const [showSelector, setShowSelector] = useState(false);
    const [ingredient1, setIngredient1] = useState(null);
    const [ingredient2, setIngredient2] = useState(null);

    const [isMergeLoading, setIsMergeLoading] = useState(false);

    const [isLoadOne, setIsLoadOne] = useState(true);
    const updateLoad = (ingredient) => {
        if (isLoadOne) {
            form.setFieldValue('name', ingredient?.name);
            form.setFieldValue('image', ingredient?.image);
            form.setFieldValue('alternativeNames', ingredient?.alternativeNames.join(';'));
            setIngredient1(ingredient);
        } else {
            let altNames = form.values.alternativeNames?.split(';') ?? [];
            for (let i = 0; i < ingredient.alternativeNames.length; i++) {
                const element = ingredient.alternativeNames[i];
                altNames.push(element);
            }
            form.setFieldValue('alternativeNames', altNames.join(';'));
            setIngredient2(ingredient);
        }
    };

    const form = useForm({
        initialValues: {
            name: '',
            image: '',
            alternativeNames: '',
            unit: '',
        },
        validate: {
            name: isNotEmpty('Name is required'),
            unit: isNotEmpty('Unit is required'),
        },
    });

    const mergeHanlder = async () => {
        try {
            setIsMergeLoading(true);
            console.log(form.values);
            let data = {
                _id: ingredient1._id,
                name: form.values.name,
                alternativeNames:
                    (form.values.alternativeNames?.length ?? 0) > 0 ? form.values.alternativeNames.split(';') : [],
            };
            ingredient2.fusion = ingredient1._id;
            await API.updateIngredient(data);
            await API.updateIngredient(ingredient2);
            setIsMergeLoading(false);
            updater(ingredient2._id, data);
            handler();
        } catch (error) {
            console.log(error);
            setNotification(true, 'Failed to merge ingredients');
            setIsMergeLoading(false);
        }
    };

    return (
        <Modal.Root opened={opened} onClose={handler} size={1000}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Merge ingredients
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <SimpleGrid cols={3}>
                        <IngredientView
                            item={ingredient1}
                            button={{
                                clickHandler: () => {
                                    setIsLoadOne(true);
                                    setShowSelector(true);
                                },
                                text: 'Load',
                            }}
                        />
                        <IngredientView
                            item={ingredient2}
                            button={{
                                clickHandler: () => {
                                    setIsLoadOne(false);
                                    setShowSelector(true);
                                },
                                text: 'Load',
                            }}
                        />
                        <Card shadow="sm" withBorder>
                            <Card.Section>
                                <Image
                                    src={form.getInputProps('image')}
                                    alt={form.getInputProps('name')}
                                    height={160}
                                    fit="cover"
                                    radius="md"
                                    withPlaceholder
                                />
                            </Card.Section>
                            <TextInput my="xs" label="Name" {...form.getInputProps('name')} />
                            <TextInput
                                label="Alternate names"
                                placeholder="Alternate names"
                                description="Semicolon separated"
                                {...form.getInputProps('alternativeNames')}
                                mb="sm"
                            />
                            <Select label="Unit" placeholder="Select unit" data={cnf.units} />
                            <Button
                                mt="sm"
                                color="blue"
                                fullWidth
                                variant="light"
                                disabled={!(ingredient1 && ingredient2)}
                                onClick={mergeHanlder}
                                loading={isMergeLoading}
                            >
                                Merge
                            </Button>
                        </Card>
                    </SimpleGrid>
                    {showSelector && (
                        <ModalIngredientsSelector
                            handleClose={() => setShowSelector(false)}
                            opened={showSelector}
                            handleSubmit={updateLoad}
                        />
                    )}
                    <Center mt="lg">
                        <Button onClick={handler}>Cancel</Button>
                    </Center>
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalMergeIngredients;
