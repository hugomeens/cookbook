import { createStyles, Header, Group, rem, UnstyledButton, Title, ActionIcon, Tooltip } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import SwitchToggle from './toggle-colorscheme';
import { IconUserCheck, IconUserEdit, IconUserOff } from '@tabler/icons-react';
import { logout, useAuth } from '../tools/auth-provider';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
    },

    inner: {
        height: rem(56),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    search: {
        [theme.fn.smallerThan('xs')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },
}));

const links = [
    { label: 'Recipes', link: '/recipes' },
    { label: 'Ingredients', link: '/ingredients' },
];

const HeaderSearch = () => {
    const { classes } = useStyles();
    const { role } = useAuth();
    const color = role === 'admin' ? 'red' : role === 'editor' ? 'green' : 'gray';
    const navigate = useNavigate();

    const items = links.map((link) => (
        <UnstyledButton key={link.label} className={classes.link} onClick={() => navigate(link.link)}>
            <Title order={4}>{link.label}</Title>
        </UnstyledButton>
    ));

    return (
        <Header height={56} className={classes.header}>
            <div className={classes.inner}>
                <Group>
                    <MantineLogo size={30} type="mark" color="red" />
                    <UnstyledButton onClick={() => navigate('/')} className={classes.link}>
                        <Title order={1}>uuCookBook</Title>
                    </UnstyledButton>
                </Group>

                <Group>
                    <Group ml={50} spacing={5} className={classes.links}>
                        {items}
                    </Group>
                    <SwitchToggle />
                    <Tooltip
                        label={role === 'admin' || role === 'editor' ? 'Logout' : 'Connect'}
                        withArrow
                        color={color}
                    >
                        <ActionIcon variant="light" size="lg" onClick={logout} color={color}>
                            {role === 'admin' ? (
                                <IconUserCheck size="1.2rem" stroke={1.5} />
                            ) : role === 'editor' ? (
                                <IconUserEdit size="1.2rem" stroke={1.5} />
                            ) : (
                                <IconUserOff size="1.2rem" stroke={1.5} />
                            )}
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </div>
        </Header>
    );
};

export default HeaderSearch;
