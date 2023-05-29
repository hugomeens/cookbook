import { Button, Center, Grid, Paper, ScrollArea } from '@mantine/core';
import IngredientView from './ingredient-view';

const GridViewIngredients = (props) => {
    return (
        <Paper shadow="sm" p="md" withBorder mb="md">
            <ScrollArea.Autosize mah={700} offsetScrollbars>
                <Grid columns={12}>
                    {props.data.map((ingredient) => (
                        <Grid.Col xl={2} lg={3} md={3} sm={4} xs={4} key={ingredient._id}>
                            <IngredientView
                                item={ingredient}
                                button={{
                                    clickHandler:
                                        props?.button?.clickHandler ??
                                        ((item) => {
                                            props.updateItem(item);
                                            props.updateHandler();
                                        }),
                                    text: props?.button?.text ?? 'Update',
                                }}
                            />
                        </Grid.Col>
                    ))}
                </Grid>
            </ScrollArea.Autosize>
            <Center>
                <Button onClick={props.loadMore} mt="md">
                    Load More
                </Button>
            </Center>
        </Paper>
    );
};

export default GridViewIngredients;
