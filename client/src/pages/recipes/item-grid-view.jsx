import { Card, Divider, Text, Title, Image, Badge } from '@mantine/core';

const ItemGridView = ({ recipe }) => {
    return (
        <Card shadow="sm" padding="md" withBorder>
            <Card.Section>
                <Image src={recipe.image} alt={recipe.title} withPlaceholder height={160} />
            </Card.Section>
            <Title order={3}>{recipe.title}</Title>
            <Divider my="sm" />
            <Text>{recipe.time}</Text>
            <Divider my="sm" />
            {recipe.tags.map((tag) => (
                <Badge key={tag} color="red" mr="xs">
                    #{tag}
                </Badge>
            ))}
        </Card>
    );
};

export default ItemGridView;
