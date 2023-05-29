import { Grid, Paper, Center, Button } from '@mantine/core';

const GridView = (props) => {
    return (
        <Paper shadow="sm" p="md" withBorder>
            <Grid columns={12}>
                {props.data.map((recipe) => (
                    <Grid.Col xl={2} lg={3} md={3} sm={4} xs={4} key={recipe._id}>
                        <props.item
                            item={recipe}
                            updateItem={props.updateItem}
                            updateHandler={props.updateHandler}
                            openUpdate={(id) => props?.openUpdate(id)}
                            onDelete={(id) => props?.onDelete(id)}
                        />
                    </Grid.Col>
                ))}
            </Grid>
            <Center>
                <Button onClick={props.loadMore} mt="md">
                    Load More
                </Button>
            </Center>
        </Paper>
    );
};

export default GridView;
