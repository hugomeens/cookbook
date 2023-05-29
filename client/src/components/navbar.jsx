import { Title, Button, Group, Input, Paper } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import GrantAccess from '../tools/grant-access';

const NavbarCookBook = ({ data }) => {
    return (
        <Paper shadow="sm" p="md" withBorder mb="md">
            <Group position="apart">
                <Title order={1}>{data.title}</Title>
                <Group>
                    {data?.buttonMerge && (
                        <GrantAccess roles={['admin']}>
                            <Button onClick={data.buttonMerge.handler} color="yellow">
                                {data.buttonMerge.text}
                            </Button>
                        </GrantAccess>
                    )}
                    {data?.buttonValidate && (
                        <GrantAccess roles={['admin']}>
                            <Button onClick={data.buttonValidate.handler} color="green">
                                {data.buttonValidate.text}
                            </Button>
                        </GrantAccess>
                    )}
                    <Input
                        placeholder="Search"
                        value={data.search}
                        onChange={(event) => data.handlerChange(event)}
                        icon={<IconSearch size="1rem" stroke={1.5} />}
                    />
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
