import { Center, TextInput } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { IconSearch } from '@tabler/icons-react';

const Home = () => {
    return (
        <>
            <Center my={150}>
                <MantineLogo size={100} />
            </Center>
            <Center my={150}>
                <TextInput
                    placeholder="Search a Recipe, an Ingredient"
                    icon={<IconSearch size="1rem" stroke={1.5} />}
                />
            </Center>
        </>
    );
};

export default Home;
