import { MantineLogo } from '@mantine/ds';
import { Center, Text, TextInput, ActionIcon, useMantineTheme, Title } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';

const InputWithButton = (props) => (
    <TextInput
        icon={<IconSearch size="1.1rem" stroke={1.5} />}
        radius="xl"
        size="md"
        rightSection={
            <ActionIcon size={32} radius="xl" color={useMantineTheme().primaryColor} variant="filled">
                <IconArrowRight size="1.1rem" stroke={1.5} />
            </ActionIcon>
        }
        placeholder="Search Recipes"
        rightSectionWidth={42}
        {...props}
    />
);

const Home = () => (
    <>
        <Center mt={150} mb="xl">
            <MantineLogo size={100} type="mark" color="red" />
            <Title order={1} ml="md" fw={700} size={80}>
                uuCookBook
            </Title>
        </Center>
        <Text align="center" fw={500} fz="xl">
            Share and discover recipes from France!
        </Text>
        <Center my={50}>
            <InputWithButton style={{ width: '50%' }} />
        </Center>
    </>
);

export default Home;
