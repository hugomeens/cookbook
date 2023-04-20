import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Container,
    Group,
    Button,
    Popover,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

const Authentication = () => {
    const form = useForm({
        initialValues: {
            name: '',
            password: '',
            remember: false,
        },
        validate: {
            name: isNotEmpty('Name is required'),
            password: isNotEmpty('Password is required'),
        },
    });

    const handleLogin = (e) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;
    };

    return (
        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Connect to uuCookBook
            </Title>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={handleLogin}>
                    <TextInput label="Name" placeholder="Your name" {...form.getInputProps('name')} withAsterisk />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        mt="md"
                        {...form.getInputProps('password')}
                        withAsterisk
                    />
                    <Group position="apart" mt="lg">
                        <Checkbox label="Remember me" />
                        <Popover width={200} position="bottom" withArrow shadow="md">
                            <Popover.Target>
                                <Anchor component="button" size="sm">
                                    Forgot password?
                                </Anchor>
                            </Popover.Target>
                            <Popover.Dropdown>RIP, you will never be able to login again</Popover.Dropdown>
                        </Popover>
                    </Group>
                    <Button fullWidth mt="xl" type="submit">
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Authentication;
