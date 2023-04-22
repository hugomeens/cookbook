import { Card, Divider, Text, Title, Image, Button } from '@mantine/core';
import GrantAccess from '../../tools/grant-access';

const ItemGridViewRecipe = ({ item }) => {
    return (
        <Card shadow="sm" padding="md" withBorder>
            <Card.Section>
                <Image src={item.image} alt={item.title} withPlaceholder height={160} />
            </Card.Section>
            <Title mt="sm" order={3}>
                {item.title}
            </Title>
            <Divider my="sm" />
            <Text>{item.time}</Text>
            <Divider my="sm" />
            <Button
                variant="light"
                color="green"
                fullWidth
                my="sm"
                onClick={() => (window.location.href = `/recipe/${item.id}`)}
            >
                Open
            </Button>
            <GrantAccess roles={['admin']}>
                <Button variant="light" color="blue" fullWidth>
                    Update
                </Button>
                <Button my="sm" variant="light" color="red" fullWidth>
                    Delete
                </Button>
            </GrantAccess>
        </Card>
    );
};

export default ItemGridViewRecipe;
