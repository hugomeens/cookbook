import { Title, Button, Group, Autocomplete, Paper, Anchor } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import GrantAccess from '../tools/grant-access';

const NavbarCookBook = ({ data }) => {
    // const Icon = data.view.value === 'grid' ? IconLayoutGrid : IconLayoutList;
    return (
        <Paper shadow="sm" p="md" withBorder mb="md">
            <Group position="apart">
                <Title order={1}>{data.title}</Title>
                <Group>
                    {data?.buttonMerge && (
                        <GrantAccess roles={['admin']}>
                            <Anchor href={data.buttonMerge.href} color="yellow">
                                {data.buttonMerge.text}
                            </Anchor>
                        </GrantAccess>
                    )}
                    {data?.buttonValidate && (
                        <GrantAccess roles={['admin']}>
                            <Button onClick={data.buttonValidate.handler} color="red">
                                {data.buttonValidate.text}
                            </Button>
                        </GrantAccess>
                    )}
                    <Autocomplete
                        placeholder="Search"
                        data={['one', 'two', 'three']}
                        icon={<IconSearch size="1rem" stroke={1.5} />}
                    />
                    {/* <ActionIcon onClick={data.view.handler} variant="outline" size="lg" color="blue">
                        <Icon size="1.5rem" stroke={1.5} />
                    </ActionIcon> */}
                    {data?.buttonCreate && (
                        <GrantAccess roles={['admin', 'editor']}>
                            <Button onClick={data.buttonCreate.handler}>{data.buttonCreate.text}</Button>
                        </GrantAccess>
                    )}
                </Group>
            </Group>
        </Paper>
    );
};

export default NavbarCookBook;
