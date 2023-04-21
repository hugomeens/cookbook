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


    return (
        <>
            <div className={classes.main}>
                <span>
                    <label></label>
                    <IngredientView button={{ clickHandler: () => setShowSelector(true), text: 'Load' }} />
                </span>
                <span>
                    <IngredientView button={{ clickHandler: () => setShowSelector(true), text: 'Load' }} />
                </span>
                <span>
                    <IngredientView button={{ clickHandler: () => '', text: 'Merge' }} />
                </span>
            </div>
            {showSelector && (
                <ModalIngredientsSelector
                    handleClose={() => setShowSelector(false)}
                    opened={showSelector}
                    handleSubmit={() => {}}
                />
            )}
        </>
    );
};

export default Merge;
