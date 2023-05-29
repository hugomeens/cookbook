import { Paper, Grid, Text, Title, Group, List, Image } from '@mantine/core';
import IngredientsCard from './ingredient';
import QuantityInput from '../../components/count-people';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import { parseTime } from '../../tools/timeUtil';
import setNotification from '../errors/error-notification';

const Recipe = (item) => {
    const id = window.location.href.split('/').slice(-1)[0];
    const [recipe, setRecipe] = useState(null);
    const [nbPerson, setNbPerson] = useState(0);

    useEffect(() => {
        if (JSON.stringify(item) !== '{}') {
            setRecipe(item);
        } else {
            API.getRecipe(id)
                .then((res) => {
                    if (res.status === 200) {
                        setRecipe(res.data);
                        setNbPerson(res.data.nbPerson);
                    }
                })
                .catch((err) => {
                    setNotification(true, err);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <>
            <Image src={recipe?.img} alt={recipe?.name} radius="md" withPlaceholder height={200} />
            <Title m="md" order={2}>
                {recipe?.name}
            </Title>
            <Text>
                Time to prepare:{' '}
                <Text span fw={700}>
                    {parseTime(recipe?.preparationTime)}
                </Text>
            </Text>
            <Paper p="xs" radius="sm" shadow="sm" withBorder my="md">
                <Group position="apart" mb="lg">
                    <Title order={3}>Ingredients</Title>
                    <Group position="right">
                        <Text>Number of people: </Text>
                        <QuantityInput initialValue={nbPerson} onChange={setNbPerson} />
                    </Group>
                </Group>
                <Grid columns={12}>
                    {(recipe?.ingredients?.length ?? 0) !== 0 ? (
                        recipe?.ingredients?.map((ingredient) => (
                            <Grid.Col xl={2} lg={3} md={3} sm={4} xs={4} key={ingredient?._id}>
                                <IngredientsCard item={ingredient} nbPerson={nbPerson} defaultValue={recipe.nbPerson} />
                            </Grid.Col>
                        ))
                    ) : (
                        <Grid.Col span={12}>
                            <Text>Error while getting ingredients</Text>
                        </Grid.Col>
                    )}
                </Grid>
            </Paper>
            <Paper p="xs" radius="sm" shadow="sm" withBorder my="md">
                <Title order={3}>Steps</Title>
                <List type="ordered" withPadding>
                    {recipe?.instructions?.map((step) => (
                        <List.Item py="xs" key={step.id}>
                            <Text>{step.text}</Text>
                        </List.Item>
                    ))}
                </List>
            </Paper>
        </>
    );
};

export default Recipe;
