import { Card, Divider, Text, Title, Image, Badge, Button } from '@mantine/core';
import GrantAccess from '../../tools/grant-access';
import API from '../../services/api';

const IngredientView = ({ item, button, onDelete, context }) => {
    const deleteHandler = async () => {
        try {
            await API.deleteIngredient(item._id);
            onDelete(item._id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card shadow="sm" padding="md" withBorder style={{ borderColor: item?.valid ?? true ? '#373A40' : 'orange' }}>
            <Card.Section>
                <Image src={item?.img ?? ''} alt={item?.title ?? ''} withPlaceholder height={160} />
            </Card.Section>
            <Title order={3} mt="xs">
                {item?.name ?? 'Ingredient Name'}
            </Title>
            <Divider my="sm" />
            <Text size="md" color="dimmed" mb="sm">
                {(item?.alternativeNames?.length ?? 0) > 0
                    ? item.alternativeNames.map(
                          (name, index) => `${name}${index === item?.alternativeNames.length - 1 ? '' : ', '}`
                      )
                    : 'No alternative names'}
            </Text>
            <Badge color="blue">{item?.unit ?? 'unit'}</Badge>
            <GrantAccess roles={['admin']}>
                <Button
                    variant="light"
                    fullWidth
                    mt="sm"
                    onClick={() => button.clickHandler(item)}
                    disabled={button.disabled}
                >
                    {button.text}
                </Button>
                {context !== 'merge' ? (
                    <Button
                        variant="light"
                        fullWidth
                        mt="sm"
                        color="red"
                        onClick={() => deleteHandler()}
                        disabled={button.disabled}
                    >
                        Delete
                    </Button>
                ) : null}
            </GrantAccess>
        </Card>
    );
};

export default IngredientView;
