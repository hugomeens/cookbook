import { MantineLogo } from '@mantine/ds';
import { Center, TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';

const InputWithButton = (props) => {
    const theme = useMantineTheme();

    return (
        <TextInput
            icon={<IconSearch size="1.1rem" stroke={1.5} />}
            radius="xl"
            size="md"
            rightSection={
                <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                    <IconArrowRight size="1.1rem" stroke={1.5} />
                </ActionIcon>
            }
            placeholder="Search Recipes"
            rightSectionWidth={42}
            {...props}
        />
    );
};

const Home = () => {
    return (
        <>
            <Center my={150}>
                <MantineLogo size={100} />
            </Center>
            <Center my={150}>
                <InputWithButton />
            </Center>
        </>
    );
};

export default Home;
