import { Card, Divider, Text, Title, Image, Button } from '@mantine/core';
import GrantAccess from '../../tools/grant-access';
import { useNavigate } from 'react-router-dom';

const ItemGridViewRecipe = ({ item }) => {
    const navigate = useNavigate();
    const parseTime = (preparationTime) => {
        let res = '';
        let hours = Math.floor(preparationTime / 60);
        res += hours > 0 ? `${hours} hours` : '';
        res += Math.floor(preparationTime % 60) + ' min';
        return res;
    };

    return (
        <Card shadow="sm" padding="md" withBorder>
            <Card.Section>
                <Image src={item.image} alt={item.name} withPlaceholder height={160} />
            </Card.Section>
            <Title mt="sm" order={3}>
                {item.name}
            </Title>
            <Divider my="sm" />
            <Text>{parseTime(item.preparationTime)}</Text>
            <Divider my="sm" />
            <Button variant="light" color="green" fullWidth my="sm" onClick={() => navigate(`/recipe/${item.id}`)}>
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
