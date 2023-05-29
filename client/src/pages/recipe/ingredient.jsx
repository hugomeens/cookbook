import { Card, Image, Divider, Text, Title } from '@mantine/core';

const IngredientsCard = ({ item, nbPerson, defaultValue }) => {
    return (
        <Card shadow="sm" p="md" withBorder>
            <Card.Section>
                <Image src={item.image} alt={item.title} withPlaceholder height={160} />
            </Card.Section>
            <Title order={3} mt="sm">
                {item.name}
            </Title>
            <Divider my="sm" />
            <Text>
                {(item.quantity * nbPerson) / defaultValue} {item.unit}
            </Text>
        </Card>
    );
};

export default IngredientsCard;
