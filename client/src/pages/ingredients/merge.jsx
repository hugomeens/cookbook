import { SimpleGrid, Card, Image, TextInput, Select, Button, Modal, Center, Text } from '@mantine/core';
import { useState } from 'react';
import ModalIngredientsSelector from '../../components/ingredients-selector';
import IngredientView from './ingredient-view';
import cnf from '../../config';
import API from '../../services/api';
import { useNavigate } from 'react-router-dom';
import setNotification from '../errors/error-notification';

const ModalMergeIngredients = ({ opened, handler }) => {
    const [showSelector, setShowSelector] = useState(false);
    const [ingredient1, setIngredient1] = useState(null);
    const [ingredient2, setIngredient2] = useState(null);
    const [ingredientMerge, setIngredientMerge] = useState({});

    const [isMergeLoading, setIsMergeLoading] = useState(false);

    const navigate = useNavigate();

    const [isLoadOne, setIsLoadOne] = useState({});
    const updateLoad = (ingredient) => {
        if (isLoadOne) {
            // eslint-disable-next-line eqeqeq
            if (JSON.stringify(ingredientMerge) === JSON.stringify({})) {
                setIngredientMerge(ingredient);
            }
            setIngredient1(ingredient);
        } else {
            setIngredient2(ingredient);
        }
    };

    const mergeHanlder = async () => {
        try {
            setIsMergeLoading(true);
            let data = ingredientMerge;
            data.alternativeNames = (data?.alternativeNames?.length ?? 0) > 0 ? data.alternativeNames.split(';') : [];
            await API.updateIngredient(data);
            await API.deleteIngredient(ingredient2._id);
            setIsMergeLoading(false);
            // todo returns updates to show in main
            handler();
        } catch (error) {
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
                                    src={ingredientMerge.image}
                                    alt={ingredientMerge.name}
                                    height={160}
                                    fit="cover"
                                    radius="md"
                                    withPlaceholder
                                />
                            </Card.Section>
                            <TextInput my="xs" label="Name" defaultValue={ingredientMerge.name} />
                            <TextInput
                                label="Alternate names"
                                placeholder="Alternate names"
                                description="Semicolon separated"
                                defaultValue={ingredientMerge?.alternativeNames?.join(';') ?? ''}
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
