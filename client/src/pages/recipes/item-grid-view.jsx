import { Card, Divider, Text, Title, Image, Badge, Button } from '@mantine/core';
import GrantAccess from '../../tools/grant-access';
import { useNavigate } from 'react-router-dom';

const ItemGridViewRecipe = ({ item }) => {
    const navigate = useNavigate();
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
            <Divider my="sm" />
            <GrantAccess roles={['admin']}>
                <Button variant="light" color="blue" fullWidth>
                    Update
                </Button>
            </GrantAccess>
            <Button variant="light" color="green" fullWidth my="sm" onClick={() => navigate(`/recipe/${item.id}`)}>
                Open
            </Button>
        </Card>
    );
};

export default ItemGridViewRecipe;
