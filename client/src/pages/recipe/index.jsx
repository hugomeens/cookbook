import { Paper, Grid, Text, Title, Group, List, Image } from '@mantine/core';
import IngredientsCard from './ingredient';
import QuantityInput from '../../components/count-people';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import { parseTime } from '../../tools/timeUtil';

const Recipe = () => {
    const id = window.location.href.split('/').slice(-1)[0];
    const [recipe, setRecipe] = useState([]);
    useEffect(() => {
        API.getRecipe(id)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    setRecipe(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <Image src={recipe.image} alt={recipe.name} radius="md" withPlaceholder />
            <Title m="md" order={2}>
                {recipe.title}
            </Title>
            <Text>
                Time to prepare:{' '}
                <Text span fw={700}>
                    {parseTime(recipe.preparationTime)}
                </Text>
            </Text>
            <Paper p="xs" radius="sm" shadow="sm" withBorder my="md">
                <Group position="apart">
                    <Title order={3}>Ingredients</Title>
                    <Group position="right">
                        <Text>Number of people: </Text>
                        <QuantityInput initialValue={recipe.nbPerson} />
                    </Group>
                </Group>
                <Grid columns={12}>
                    {recipe?.ingredients?.map((ingredient) => (
                        <Grid.Col xl={2} lg={3} md={3} sm={4} xs={4} key={ingredient._id}>
                            <IngredientsCard item={ingredient} />
                        </Grid.Col>
                    ))}
                </Grid>
            </Paper>
            <Paper p="xs" radius="sm" shadow="sm" withBorder my="md">
                <Title order={3}>Steps</Title>
                <List type="ordered" withPadding>
                    {recipe?.steps?.map((step) => (
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
