import { createStyles, Header, Group, rem, UnstyledButton, Title, ActionIcon, Tooltip } from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
// import { useDisclosure } from '@mantine/hooks';
import SwitchToggle from './toggle-colorscheme';
import { IconUserShield } from '@tabler/icons-react';

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
    { label: 'Home', link: '/' },
    { label: 'Recipes', link: '/recipes' },
    { label: 'Ingredients', link: '/ingredients' },
];

const HeaderSearch = () => {
    // const [opened, { toggle }] = useDisclosure(false);
    const { classes } = useStyles();

    const items = links.map((link) => (
        <UnstyledButton key={link.label} className={classes.link} component="a" href={link.link}>
            {link.label}
        </UnstyledButton>
    ));

    return (
        <Header height={56} className={classes.header}>
            <div className={classes.inner}>
                <Group>
                    {/* <Burger opened={opened} onClick={toggle} size="sm" /> */}
                    <MantineLogo size={30} type="mark" color="red" />
                    <Title order={1}>uuCookBook</Title>
                </Group>

                <Group>
                    <Group ml={50} spacing={5} className={classes.links}>
                        {items}
                    </Group>
                    <SwitchToggle />
                    <Tooltip label="Users" withArrow color="red">
                        <ActionIcon variant="light" color="red" size="lg" component="a" href="/auth">
                            <IconUserShield size="1.2rem" stroke={1.5} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </div>
        </Header>
    );
};

export default HeaderSearch;
