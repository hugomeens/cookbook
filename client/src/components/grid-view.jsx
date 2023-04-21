import { Grid, Title } from '@mantine/core';

const GridView = (props) => {
    return (
        <div>
            <Title order={2}>Grid View</Title>
            <Grid columns={12}>
                {props.data.map((recipe) => (
                    <Grid.Col span={2} key={recipe.id}>
                        <props.item item={recipe} />
                    </Grid.Col>
                ))}
            </Grid>
        </div>
    );
};

export default GridView;
