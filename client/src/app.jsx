import Layout from './components/layout';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useState } from 'react';

const App = () => {
    const [colorScheme, setColorScheme] = useState('dark');
    const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    return (
        <>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
                    <Layout />
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
};

export default App;
