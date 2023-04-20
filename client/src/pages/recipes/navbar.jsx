import { Title, Button, Group, Divider } from '@mantine/core';

const NavbarRecipes = ({ handler }) => {
    return (
        <>
            <Group position="apart">
                <Title order={1}>Recipes</Title>
                <Button onClick={handler}>New Recipe</Button>
            </Group>
            <Divider />
        </>
    );
};

export default NavbarRecipes;
