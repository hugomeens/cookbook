import { MantineLogo } from '@mantine/ds';
import { Center, Text, TextInput, ActionIcon, useMantineTheme, Title } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const InputWithButton = (props) => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    return (
        <TextInput
            icon={<IconSearch size="1.1rem" stroke={1.5} />}
            radius="xl"
            size="md"
            rightSection={
                <ActionIcon
                    size={32}
                    radius="xl"
                    color={useMantineTheme().primaryColor}
                    variant="filled"
                    onClick={() => navigate(`/recipes/${search}`)}
                >
                    <IconArrowRight size="1.1rem" stroke={1.5} />
                </ActionIcon>
            }
            placeholder="Search Recipes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            rightSectionWidth={42}
            autoFocus={true}
            onKeyDown={(e) => (e.key === 'Enter' ? navigate(`/recipes/${search}`) : '')}
            {...props}
        />
    );
};

const Home = () => (
    <>
        <Center mt={150} mb="xl">
            <MantineLogo size={100} type="mark" color="red" />
            <Title order={1} ml="md" fw={700} size={80}>
                uuCookBook
            </Title>
        </Center>
        <Text align="center" fw={500} fz="xl">
            Share and discover recipes!
        </Text>
        <Center my={50}>
            <InputWithButton style={{ width: '50%' }} />
        </Center>
    </>
);

export default Home;
