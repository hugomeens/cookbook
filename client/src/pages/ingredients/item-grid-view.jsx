import { Card, Divider, Title, Image, Badge, Button } from '@mantine/core';

const ItemGridViewIngredients = ({ item }) => {
    return (
        <Card shadow="sm" padding="md" withBorder>
            <Card.Section>
                <Image src={item.image} alt={item.title} withPlaceholder height={160} />
            </Card.Section>
            <Title order={3}>{item.name}</Title>
            <Divider my="sm" />
            <Badge color={item.valid ? 'green' : 'red'}>{item.valid ? 'Valid' : 'Invalid'}</Badge>
            <Button variant="light" fullWidth mt="sm">
                Open
            </Button>
        </Card>
    );
};

export default ItemGridViewIngredients;
