import { useEffect, useRef, useState } from 'react';
import { createStyles, NumberInput, ActionIcon, rem } from '@mantine/core';
import { IconPlus, IconMinus } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `${rem(6)} ${theme.spacing.xs}`,
        borderRadius: theme.radius.sm,
        border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]}`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
        width: rem(130),

        '&:focus-within': {
            borderColor: theme.colors[theme.primaryColor][6],
        },
    },

    control: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3]}`,

        '&:disabled': {
            borderColor: theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[3],
            opacity: 0.8,
            backgroundColor: 'transparent',
        },
    },

    input: {
        textAlign: 'center',
        paddingRight: `${theme.spacing.sm} !important`,
        paddingLeft: `${theme.spacing.sm} !important`,
        height: rem(28),
        flex: 1,
    },
}));

const QuantityInput = ({ min = 1, initialValue, ...props }) => {
    const { classes } = useStyles();
    const handlers = useRef(null);
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
        return () => {};
    }, [initialValue]);

    return (
        <div className={classes.wrapper}>
            <ActionIcon
                size={28}
                variant="transparent"
                onClick={() => handlers.current?.decrement()}
                disabled={value === min}
                className={classes.control}
                onMouseDown={(event) => event.preventDefault()}
            >
                <IconMinus size="1rem" stroke={1.5} />
            </ActionIcon>

            <NumberInput
                variant="unstyled"
                min={min}
                handlersRef={handlers}
                value={value}
                onChange={setValue}
                classNames={{ input: classes.input }}
                {...props}
            />

            <ActionIcon
                size={28}
                variant="transparent"
                onClick={() => handlers.current?.increment()}
                className={classes.control}
                onMouseDown={(event) => event.preventDefault()}
            >
                <IconPlus size="1rem" stroke={1.5} />
            </ActionIcon>
        </div>
    );
};

export default QuantityInput;
