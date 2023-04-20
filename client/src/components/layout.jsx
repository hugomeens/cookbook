import { AppShell } from '@mantine/core';
import HeaderSearch from './header';
import AppRouter from '../pages/app-router';

const Layout = () => {
    return (
        <AppShell mx="md" header={<HeaderSearch />}>
            <AppRouter />
        </AppShell>
    );
};

export default Layout;
