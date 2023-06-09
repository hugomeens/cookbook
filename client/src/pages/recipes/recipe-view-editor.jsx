import {
    Accordion,
    ActionIcon,
    Button,
    Center,
    Grid,
    Group,
    NumberInput,
    Paper,
    ScrollArea,
    Text,
    TextInput,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import QuantityInput from '../../components/count-people';
import ModalIngredientsSelector from '../../components/ingredients-selector';
import { useEffect, useState } from 'react';
import { IconTrash } from '@tabler/icons-react';
import setNotification from '../errors/error-notification';

const LineIngredient = ({ ingredient, removeHandler }) => {
    return (
        <Paper p="xs" radius="sm" shadow="sm" withBorder my="md" style={{ borderColor: ingredient?.valid ?? true ? '#373A40' : 'orange' }}>
            <Grid columns={12}>
                <Grid.Col span={4}>
                    <Text>{ingredient.name}</Text>
                </Grid.Col>
                <Grid.Col span={4}>
                    <NumberInput
                        placeholder="Enter quantity"
                        value={ingredient.quantity}
                        onChange={(e) =>
                            removeHandler((prev) =>
                                prev.map((i) => (i._id === ingredient._id ? { ...i, quantity: e } : i))
                            )
                        }
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <Text size="lg">{ingredient.unit}</Text>
                </Grid.Col>
                <Grid.Col span={2}>
                    <ActionIcon
                        color="red"
                        variant="light"
                        size="lg"
                        onClick={() => removeHandler((prev) => prev.filter((i) => i._id !== ingredient._id))}
                    >
                        <IconTrash size="1rem" />
                    </ActionIcon>
                </Grid.Col>
            </Grid>
        </Paper>
    );
};

const LineStep = ({ id, step, handler }) => {
    return (
        <Paper p="xs" radius="sm" withBorder my="md">
            <Group position="apart">
                <Text> Step {id + 1}:</Text>
                <TextInput
                    style={{ width: '82%' }}
                    placeholder="Enter step"
                    value={step.text}
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
        </Paper>
    );
};

const RecipeViewEditor = ({ handler, buttonText, APICall, recipe }) => {
    const [showSelector, setShowSelector] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([{ id: 0, text: '' }]);
    const [countSteps, setCountSteps] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        initialValues: {
            title: '',
            time: '',
            people: 4,
            img: '',
        },

        validate: {
            title: isNotEmpty('Title is required'),
            time: isNotEmpty('Time is required'),
            img: (value) => (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value) ? null : 'Image must be a valid URL'),
        },
    });

    useEffect(() => {
        form.setFieldValue('title', recipe?.name);
        form.setFieldValue('time', recipe?.preparationTime);
        form.setFieldValue('img', recipe?.img);
        form.setFieldValue('people', recipe?.nbPerson ?? 4);
        if (recipe?.instructions) {
            setSteps(recipe.instructions);
            setIngredients(recipe.ingredients);
        }
        return () => {};
        // eslint-disable-next-line
    }, [recipe]);

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

    const handleValidate = async () => {
        if (form.validate().hasErrors) return;
        try {
            setIsLoading(true);
            let recipePush = {
                name: form.values.title,
                description: '',
                img: form.values.img,
                nbPerson: form.values.people,
                preparationTime: form.values.time,
                ingredients: ingredients.map((item) => {
                    return { _id: item._id, quantity: item.quantity ?? 0 };
                }),
                instructions: steps,
                valid: false,
            };
            if (recipe) recipePush._id = recipe._id;
            await APICall(recipePush);
            setIsLoading(false);
            handler(recipePush);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setNotification(true, error.response.data.error);
        }
    };

    return (
        <>
            <Grid columns={24} mb="lg">
                <Grid.Col span={8}>
                    <TextInput
                        label="Title of the Recipe"
                        placeholder="Enter Title"
                        withAsterisk
                        {...form.getInputProps('title')}
                    />
                </Grid.Col>
                <Grid.Col span={5}>
                    <NumberInput
                        label="Time to Prepare"
                        placeholder="Time in minutes"
                        withAsterisk
                        {...form.getInputProps('time')}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput label="Image URL" placeholder="Enter URL" withAsterisk {...form.getInputProps('img')} />
                </Grid.Col>
                <Grid.Col span={5}>
                    <Text fz="sm" fw={500}>
                        People
                        <Text span fw={700} fz="sm" color="red">
                            {' '}
                            *
                        </Text>
                    </Text>
                    <QuantityInput initialValue={4} {...form.getInputProps('people')} />
                </Grid.Col>
            </Grid>
            <Accordion variant="separated">
                <Accordion.Item value="ingredients">
                    <Accordion.Control>
                        <Group position="apart">
                            <Text fw={700} fz="lg">
                                Ingredients
                            </Text>
                            <Text fz="sm" fw={500}>
                                For {form.values.people} people
                            </Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <ScrollArea h={200} offsetScrollbars>
                            {ingredients.map((ingredient) => (
                                <LineIngredient
                                    ingredient={ingredient}
                                    removeHandler={setIngredients}
                                    key={ingredient._id}
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
                            {steps.map((step, id) => (
                                <LineStep id={id} step={step} handler={setSteps} key={id} />
                            ))}
                        </ScrollArea>
                        <Center>
                            <Button mt="sm" onClick={addStep}>
                                Add Step
                            </Button>
                        </Center>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <ModalIngredientsSelector
                handleClose={() => setShowSelector(false)}
                opened={showSelector}
                handleSubmit={handleSelector}
                already={ingredients.map((item) => item._id)}
                multi
            />
            <Center>
                <Button onClick={handleValidate} mt="md" loading={isLoading}>
                    {buttonText}
                </Button>
            </Center>
        </>
    );
};

export default RecipeViewEditor;
