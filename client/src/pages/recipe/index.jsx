import { Text, Title } from '@mantine/core';

const Recipe = () => {
    const id = window.location.href.split('/').slice(-1)[0];
    return (
        <>
            <Title order={3}>Recipe {id}</Title>
            <Text>Content</Text>
        </>
    );
};

export default Recipe;
