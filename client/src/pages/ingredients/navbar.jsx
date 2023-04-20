import { Title, Button, Group, Divider, Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const NavbarIngredients = ({ handler }) => {
    return (
        <>
            <Group position="apart">
                <Title order={1}>Ingredients</Title>
                <Group>
                    <Autocomplete
                        placeholder="Search"
                        data={['one', 'two', 'three']}
                        icon={<IconSearch size="1rem" stroke={1.5} />}
                    />
                    <Button onClick={handler}>New Ingredients</Button>
                </Group>
            </Group>
            <Divider />
        </>
    );
};

export default NavbarIngredients;
