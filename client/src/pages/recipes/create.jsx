import {
    Accordion,
    ActionIcon,
    Button,
    Center,
    Grid,
    Group,
    List,
    Modal,
    NumberInput,
    Paper,
    ScrollArea,
    Text,
    TextInput,
} from '@mantine/core';
import QuantityInput from '../../components/count-people';
import ModalIngredientsSelector from '../../components/ingredients-selector';
import { useState } from 'react';
import { IconTrash } from '@tabler/icons-react';

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
                    <Text size="lg">{ingredient.unit}</Text>
                </Grid.Col>
                <Grid.Col span={2}>
                    <ActionIcon
                        color="red"
                        variant="light"
                        size="lg"
                        onClick={() => removeHandler((prev) => prev.filter((i) => i.id !== ingredient.id))}
                    >
                        <IconTrash size="1rem" />
                    </ActionIcon>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

const LineStep = ({ step, handler }) => {
    return (
        <Paper p="xs" radius="sm" withBorder my="md">
            <List.Item>
                <Group position="apart">
                    <TextInput
                        placeholder="Enter step"
                        onChange={(e) =>
                            handler((prev) => prev.map((s) => (s.id === step.id ? { ...s, text: e.target.value } : s)))
                        }
                    />
                    <ActionIcon
                        color="red"
                        variant="light"
                        size="lg"
                        onClick={() => handler((prev) => prev.filter((s) => s.id !== step.id))}
                    >
                        <IconTrash size="1rem" />
                    </ActionIcon>
                </Group>
            </List.Item>
        </Paper>
    );
};

const ModalCreate = ({ open, handler }) => {
    const [showSelector, setShowSelector] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([{ id: 0, text: '' }]);
    const [countSteps, setCountSteps] = useState(1);

    const handleSelector = (data) => {
        // eslint-disable-next-line array-callback-return
        data.map((ingredient) => {
            if (!ingredients.includes(ingredient)) {
                setIngredients((prev) => [...prev, ingredient]);
            }
        });
    };

    const addStep = () => {
        setCountSteps((prev) => prev + 1);
        setSteps((prev) => [...prev, { id: countSteps, text: '' }]);
    };

    const handleCreate = () => {
        console.log(steps);
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
                                <ScrollArea h={200} offsetScrollbars>
                                    {ingredients.map((ingredient) => (
                                        <LineIngredient
                                            ingredient={ingredient}
                                            removeHandler={setIngredients}
                                            key={ingredient.id}
                                        />
                                    ))}
                                </ScrollArea>
                                <Center>
                                    <Button mt="sm" onClick={() => setShowSelector(true)}>
                                        Add Ingredients
                                    </Button>
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
                                <ScrollArea h={200} offsetScrollbars>
                                    <List type="ordered">
                                        {steps.map((step) => (
                                            <LineStep step={step} handler={setSteps} key={step.id} />
                                        ))}
                                    </List>
                                </ScrollArea>
                                <Center>
                                    <Button mt="sm" onClick={addStep}>
                                        Add Step
                                    </Button>
                                </Center>
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                    <Center>
                        <Button onClick={handleCreate} mt="md">
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
