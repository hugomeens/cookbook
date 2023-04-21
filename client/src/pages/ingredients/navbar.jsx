import { Title, Button, Group, Divider, Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import GrantAccess from '../../tools/grant-access';

const NavbarIngredients = ({ handler }) => {
    return (
        <>
            <Group position="apart">
                <Title order={1}>Ingredients</Title>
                <Group>
                    <GrantAccess roles={['admin']}>
                        <Button onClick={() => alert('not implemented')} color="red">
                            Validate Ingredients
                        </Button>
                    </GrantAccess>
                    <Autocomplete
                        placeholder="Search"
                        data={['one', 'two', 'three']}
                        icon={<IconSearch size="1rem" stroke={1.5} />}
                    />
                    <GrantAccess roles={['admin', 'editor']}>
                        <Button onClick={handler}>New Ingredients</Button>
                    </GrantAccess>
                </Group>
            </Group>
            <Divider my="sm" />
        </>
    );
};

export default NavbarIngredients;
