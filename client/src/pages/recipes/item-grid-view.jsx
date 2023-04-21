import { Card, Divider, Text, Title, Image, Badge } from '@mantine/core';

const ItemGridViewRecipe = ({ item }) => {
    return (
        <Card shadow="sm" padding="md" withBorder>
            <Card.Section>
                <Image src={item.image} alt={item.title} withPlaceholder height={160} />
            </Card.Section>
            <Title order={3}>{item.title}</Title>
            <Divider my="sm" />
            <Text>{item.time}</Text>
            <Divider my="sm" />
            {item.tags.map((tag) => (
                <Badge key={tag} color="red" mr="xs">
                    #{tag}
                </Badge>
            ))}
        </Card>
    );
};

export default ItemGridViewRecipe;
