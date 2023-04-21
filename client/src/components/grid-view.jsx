import { Grid, Paper } from '@mantine/core';

const GridView = (props) => {
    return (
        <Paper shadow="sm" p="md" withBorder mb="md">
            <Grid columns={12}>
                {props.data.map((recipe) => (
                    <Grid.Col xl={2} lg={3} md={3} sm={4} xs={4} key={recipe.id}>
                        <props.item item={recipe} updateItem={props.updateItem} updateHandler={props.updateHandler} />
                    </Grid.Col>
                ))}
            </Grid>
        </Paper>
    );
};

export default GridView;
