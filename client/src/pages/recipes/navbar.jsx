import { Title, Button, Group, Divider, Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const NavbarRecipes = ({ handler }) => {
    return (
        <>
            <Group position="apart">
                <Title order={1}>Recipes</Title>
                <Group>
                    <Autocomplete
                        placeholder="Search"
                        data={['one', 'two', 'three']}
                        icon={<IconSearch size="1rem" stroke={1.5} />}
                    />
                    <Button onClick={handler}>New Recipe</Button>
                </Group>
            </Group>
            <Divider />
        </>
    );
};

export default NavbarRecipes;
