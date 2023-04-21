import { Grid, Paper } from '@mantine/core';
import IngredientView from './ingredient-view';

const GridViewIngredients = (props) => {
    return (
        <Paper shadow="sm" p="md" withBorder mb="md">
            <Grid columns={12}>
                {props.data.map((ingredient) => (
                    <Grid.Col xl={2} lg={3} md={3} sm={4} xs={4} key={ingredient.id}>
                        <IngredientView
                            item={ingredient}
                            button={{
                                clickHandler: () => {
                                    props.updateItem(ingredient);
                                    props.updateHandler();
                                },
                                text: props?.button?.text ?? 'Update',
                            }}
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </Paper>
    );
};

export default GridViewIngredients;
