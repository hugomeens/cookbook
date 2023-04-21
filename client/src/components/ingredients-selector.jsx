import { Modal, Button, Text, Image, Group, Grid, Card, Title, Center } from '@mantine/core';
import mockdata from '../pages/ingredients/mockdata';

const ModalIngredientsSelector = ({ opened, handleClose, handleSubmit, ...props }) => {
    const ingredients = [];

    const clickHandler = (ingredient) => {
        if (props.multi) {
            ingredients.push(ingredient);
        } else {
            handleSubmitLocal(ingredient);
        }
    };

    const handleSubmitLocal = (ingredient) => {
        if (props.multi) {
            handleSubmit(ingredients);
        } else {
            handleSubmit(ingredient);
            handleClose();
        }
    };

    return (
        <Modal.Root opened={opened} onClose={handleClose} size="lg">
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Select Ingredient{props.multi ? 's' : ''}
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <Grid columns={3}>
                        {mockdata.map((ingredient) => (
                            <Grid.Col span={1} key={ingredient.id}>
                                <Card shadow="sm">
                                    <Card.Section>
                                        <Image
                                            src={ingredient.image}
                                            alt={ingredient.name}
                                            height={100}
                                            fit="cover"
                                            radius="md"
                                        />
                                    </Card.Section>
                                    <Center>
                                        <Title order={4} mt="md">
                                            {ingredient.name}
                                        </Title>
                                    </Center>
                                    <Button
                                        mt="sm"
                                        fullWidth
                                        variant="light"
                                        onClick={() => clickHandler(ingredient)}
                                    >
                                        Select
                                    </Button>
                                </Card>
                            </Grid.Col>
                        ))}
                    </Grid>
                    {props.multi && (
                        <Group position="right" mt="md">
                            <Button variant="light" color="red" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="light" color="green" onClick={() => handleSubmitLocal()}>
                                Validate
                            </Button>
                        </Group>
                    )}
                </Modal.Body>
            </Modal.Content>
        </Modal.Root>
    );
};

export default ModalIngredientsSelector;
