import {
    Modal,
    Text,
    TextInput,
    NumberInput,
    Grid,
    Group,
    Paper,
    Center,
    Button,
    ActionIcon,
    Accordion,
    List,
} from '@mantine/core';
import QuantityInput from '../../components/count-people';
import ModalIngredientsSelector from '../../components/ingredients-selector';
import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import './create.css';

const LineIngredient = ({ ingredient, removeHandler }) => {
    return (
        <Paper p="xs" radius="sm" shadow="sm" withBorder my="md">
            <Grid columns={12}>
                <Grid.Col span={4}>
                    <Text>{ingredient.name}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                    <NumberInput placeholder="Enter quantity" />
                </Grid.Col>
                <Grid.Col span={2}>
                    <Text>{ingredient.unit}</Text>
                </Grid.Col>
                <Grid.Col span={2}>
                    <ActionIcon
                        color="red"
                        variant="light"
                        onClick={() => removeHandler((prev) => prev.filter((i) => i.id !== ingredient.id))}
                    >
                        <IconTrash size="1rem" />
                    </ActionIcon>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

const LineStep = ({ step, removeHandler }) => {
    return (
        <Paper p="xs" radius="sm" shadow="sm" withBorder my="md">
            <List.Item style={{marginRight: "15px"}}>
                <TextInput
                    placeholder="Enter step"
                    style={{width: "100%"}}
                    onBlur={() => removeHandler((prev) => prev.filter((s) => s.id !== step.id))}
                />
            </List.Item>
        </Paper>
    );
};

const ModalCreate = ({ open, handler }) => {
    const [showSelector, setShowSelector] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);

    const handleSelector = (data) => {
        // eslint-disable-next-line array-callback-return
        data.map((ingredient) => {
            if (!ingredients.includes(ingredient)) {
                setIngredients((prev) => [...prev, ingredient]);
            }
        });
    };

    return (
        <Modal.Root opened={open} onClose={handler} size="xl">
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>
                        <Text fw={700} fz="lg">
                            Create Recipe
                        </Text>
                    </Modal.Title>
                    <Modal.CloseButton />
                </Modal.Header>
                <Modal.Body>
                    <Accordion defaultValue="metadata" variant="separated">
                        <Accordion.Item value="metadata">
                            <Accordion.Control>
                                <Text fw={700} fz="lg">
                                    Metadata
                                </Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Grid columns={24}>
                                    <Grid.Col span={10}>
                                        <TextInput label="Title of the Recipe" placeholder="Enter Title" withAsterisk />
                                    </Grid.Col>
                                    <Grid.Col span={9}>
                                        <NumberInput
                                            label="Time to Prepare"
                                            placeholder="Time in minutes"
                                            withAsterisk
                                        />
                                    </Grid.Col>
                                    <Grid.Col span={5}>
                                        <Text fz="sm" fw={500}>
                                            People
                                            <Text span fw={700} fz="sm" color="red">
                                                {' '}
                                                *
                                            </Text>
                                        </Text>
                                        <QuantityInput label="Number of people" initialValue={4} />
                                    </Grid.Col>
                                </Grid>
                            </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item value="ingredients">
                            <Accordion.Control>
                                <Group position="apart">
                                    <Text fw={700} fz="lg">
                                        Ingredients
                                    </Text>
                                    <Text fz="sm" fw={500}>
                                        For {4} people
                                    </Text>
                                </Group>
                            </Accordion.Control>
                            <Accordion.Panel>
                                {ingredients.map((ingredient) => (
                                    <LineIngredient
                                        ingredient={ingredient}
                                        removeHandler={setIngredients}
                                        key={ingredient.id}
                                    />
                                ))}
                                <Center>
                                    <Button onClick={() => setShowSelector(true)}>Add Ingredients</Button>
                                </Center>
                            </Accordion.Panel>
                        </Accordion.Item>
                        <Accordion.Item value="steps">
                            <Accordion.Control>
                                <Text fw={700} fz="lg">
                                    Steps
                                </Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <List type="ordered">
                                    {steps.map((step) => (
                                        <LineStep step={step} removeHandler={setSteps} key={step} />
                                    ))}
                                    <LineStep step="Step 1" removeHandler={setSteps} />
                                </List>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                    <Center>
                        <Button onClick={handler} mt="md">
                            Create Recipe
                        </Button>
                    </Center>
                </Modal.Body>
            </Modal.Content>
            <ModalIngredientsSelector
                handleClose={() => setShowSelector(false)}
                opened={showSelector}
                handleSubmit={handleSelector}
                multi
            />
        </Modal.Root>
    );
};

export default ModalCreate;
