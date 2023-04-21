import { Card, Grid, Title, Image, Button, Center } from '@mantine/core';
import { useState } from 'react';

const SelectorItem = ({ ingredient, clickHandler }) => {
    const [selected, setSelected] = useState(false);
    const handleClick = () => {
        setSelected(!selected);
        clickHandler(ingredient);
    };

    return (
        <Grid.Col span={1} key={ingredient.id}>
            <Card shadow="sm">
                <Card.Section>
                    <Image src={ingredient.image} alt={ingredient.name} height={100} fit="cover" radius="md" />
                </Card.Section>
                <Center>
                    <Title order={4} mt="md">
                        {ingredient.name}
                    </Title>
                </Center>
                <Button mt="sm" color={selected ? 'red' : 'blue'} fullWidth variant="light" onClick={handleClick}>
                    {selected ? 'Unselect' : 'Select'}
                </Button>
            </Card>
        </Grid.Col>
    );
};

export default SelectorItem;
