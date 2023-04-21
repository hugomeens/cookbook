import { Paper, Grid, Text, Title, Group, List, Image } from '@mantine/core';
import mockdata from '../mockdata';
import IngredientsCard from './ingredient';
import QuantityInput from './count-people';

const Recipe = () => {
    const id = window.location.href.split('/').slice(-1)[0];
    // eslint-disable-next-line eqeqeq
    const data = mockdata.find((item) => item.id == id);

    return (
        <>
            <Image src={data.image} alt={data.title} radius="md" withPlaceholder />
            <Title m="md" color="white" order={2}>
                {data.title}
            </Title>
            <Text>
                Time to prepare:{' '}
                <Text span fw={700}>
                    {data.time}
                </Text>
            </Text>
            <Paper p="xs" radius="sm" shadow="sm" withBorder my="md">
                <Group position="apart">
                    <Title order={3}>Ingredients</Title>
                    <Group position="right">
                        <Text>Number of people: </Text>
                        <QuantityInput initialValue={data.people} />
                    </Group>
                </Group>
                <Grid columns={12}>
                    {data.ingredients.map((ingredient) => (
                        <Grid.Col xl={2} lg={3} md={3} sm={4} xs={4} key={ingredient.id}>
                            <IngredientsCard item={ingredient} />
                        </Grid.Col>
                    ))}
                </Grid>
            </Paper>
            <Paper p="xs" radius="sm" shadow="sm" withBorder my="md">
                <Title order={3}>Steps</Title>
                <List type="ordered" withPadding>
                    {data.steps.map((step) => (
                        <List.Item py="xs" key={step}>
                            <Text>{step}</Text>
                        </List.Item>
                    ))}
                </List>
            </Paper>
        </>
    );
};

export default Recipe;
