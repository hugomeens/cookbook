import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Container, Group, Button } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useAuth } from '../tools/auth-provider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Authentication = () => {
    const { setRole } = useAuth();
    const navigate = useNavigate();
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

    useEffect(() => {
        localStorage.setItem('role', form.values.name);
    }, [form.values.name]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (form.validate().hasErrors) return;
        setRole(form.values.name);
        navigate('/');
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
                        label="Password 1"
                        placeholder="Your first password"
                        mt="md"
                        {...form.getInputProps('password')}
                        withAsterisk
                    />
                    <PasswordInput label="Password 2" placeholder="Your second password" mt="md" withAsterisk />
                    <Group position="apart" mt="lg">
                        <Checkbox label="Remember me" />
                        <Anchor size="sm" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmljayByb2xs">
                            Forgot password(s)?
                        </Anchor>
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
