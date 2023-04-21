import { Card, Divider, Text, Title, Image, Badge, Button } from '@mantine/core';
import GrantAccess from '../../tools/grant-access';

const IngredientView = ({ item, button }) => {
    return (
        <Card shadow="sm" padding="md" withBorder>
            <Card.Section>
                <Image src={item?.image ?? ''} alt={item?.title ?? ''} withPlaceholder height={160} />
            </Card.Section>
            <Title order={3} mt="xs">
                {item?.name ?? 'Ingredient Name'}
            </Title>
            <Divider my="sm" />
            <Text size="md" color="dimmed" mb="sm">
                {item?.alternateNames?.map(
                    (name, index) => `${name}${index === item?.alternateNames.length - 1 ? '' : ', '}`
                ) ?? 'Alternate names'}
            </Text>
            <Badge color="blue">{item?.unit ?? 'unit'}</Badge>
            <Divider my="sm" />
            <Badge color={item?.valid ? 'green' : 'red'}>{item?.valid ? 'Valid' : 'Invalid'}</Badge>
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
            </GrantAccess>
        </Card>
    );
};

export default IngredientView;
