import { SimpleGrid, Card, Image, TextInput, Select, Button } from '@mantine/core';
import { useState } from 'react';
import ModalIngredientsSelector from '../../components/ingredients-selector';
import IngredientView from '../ingredients/ingredient-view';
import cnf from '../../config';

const Merge = () => {
    const [showSelector, setShowSelector] = useState(false);
    const [ingredient1, setIngredient1] = useState(null);
    const [ingredient2, setIngredient2] = useState(null);
    const [ingredientMerge, setIngredientMerge] = useState({});

    const [isLoadOne, setIsLoadOne] = useState({});
    const updateLoad = (ingredient) => {
        if (isLoadOne) {
            // eslint-disable-next-line eqeqeq
            if (JSON.stringify(ingredientMerge) == JSON.stringify({})) {
                setIngredientMerge(ingredient);
            }
            setIngredient1(ingredient);
        } else {
            setIngredient2(ingredient);
        }
    };

    return (
        <>
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
                    <Select label="Unit" placeholder="Select unit" data={cnf.units} />
                    <Button mt="sm" color="blue" fullWidth variant="light" disabled={!(ingredient1 && ingredient2)}>
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
        </>
    );
};

export default Merge;
