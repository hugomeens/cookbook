import mockdata from './mockdata';
import { Grid, Title } from '@mantine/core';
import ItemGridView from './item-grid-view';

const GridView = () => {
    return (
        <div>
            <Title order={2}>Grid View</Title>
            <Grid columns={12}>
                {mockdata.map((recipe) => (
                    <Grid.Col span={2} key={recipe.id}>
                        <ItemGridView recipe={recipe} />
                    </Grid.Col>
                ))}
            </Grid>
        </div>
    );
};

export default GridView;
