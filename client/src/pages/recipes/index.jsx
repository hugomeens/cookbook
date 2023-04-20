import ModalCreate from './create';
import GridView from './grid-view';
import NavbarRecipes from './navbar';
import { useState } from 'react';

const Recipes = () => {
    const [showCreate, setShowCreate] = useState(false);
    const toggleModalCreate = () => setShowCreate(!showCreate);
    return (
        <>
            <NavbarRecipes handler={toggleModalCreate} />
            <GridView />
            <ModalCreate open={showCreate} handler={toggleModalCreate} />
        </>
    );
};

export default Recipes;
