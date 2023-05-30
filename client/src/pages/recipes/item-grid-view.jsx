import { Card, Divider, Text, Title, Image, Button } from '@mantine/core';
import GrantAccess from '../../tools/grant-access';
import { useNavigate } from 'react-router-dom';
import { parseTime } from '../../tools/timeUtil';
import { useState } from 'react';
import API from '../../services/api';

const ItemGridViewRecipe = ({ item, openUpdate, onDelete }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const deleteHandler = async () => {
        try {
            setLoading(true);
            await API.deleteRecipe(item._id);
            setLoading(false);
            onDelete(item._id);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    console.log(item);

    return (
        <Card shadow="sm" padding="md" withBorder style={{ borderColor: item.valid ? '#373A40' : 'orange' }}>
            <Card.Section>
                <Image src={item.img} alt={item.name} withPlaceholder height={160} />
            </Card.Section>
            <Title mt="sm" order={3}>
                {item.name}
            </Title>
            <Divider my="sm" />
            <Text>{parseTime(item.preparationTime)}</Text>
            <Divider my="sm" />
            <Button variant="light" color="green" fullWidth my="sm" onClick={() => navigate(`/recipe/${item._id}`)}>
                Open
            </Button>
            <GrantAccess roles={['admin']}>
                <Button variant="light" color="blue" fullWidth onClick={() => openUpdate(item._id)}>
                    Update
                </Button>
                <Button my="sm" variant="light" color="red" fullWidth onClick={() => deleteHandler()} loading={loading}>
                    Delete
                </Button>
            </GrantAccess>
        </Card>
    );
};

export default ItemGridViewRecipe;
