import { Title, Button, Group, Divider } from '@mantine/core';

const NavbarIngredients = ({ handler }) => {
    return (
        <>
            <Group position="apart">
                <Title order={1}>Ingredients</Title>
                <Button onClick={handler}>New Ingredients</Button>
            </Group>
            <Divider />
        </>
    );
};

export default NavbarIngredients;
