import { createStyles, Button } from '@mantine/core';
import { useState } from 'react';
import ModalIngredientsSelector from '../../components/ingredients-selector';
import IngredientView from '../ingredients/ingredient-view';

const useStyles = createStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
}));

const Merge = () => {
    const { classes } = useStyles();
    const [showSelector, setShowSelector] = useState(false);
    const [ingredient1, setIngredient1] = useState({});
    const [ingredient2, setIngredient2] = useState({});
    const [ingredientMerge, setIngredientMerge] = useState({});

    const [isLoadOne, setIsLoadOne] = useState({});
    const updateLoad = (ingredient) => {
        if (isLoadOne) {
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
            <div className={classes.main}>
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
                <IngredientView
                    item={ingredientMerge}
                    button={{
                        clickHandler: () => {
                            // delete ingredient2
                            // update ingredient1
                        },
                        text: 'Merge',
                    }}
                />
            </div>
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
