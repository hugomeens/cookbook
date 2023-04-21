import ModalCreate from './create';
import GridView from '../../components/grid-view';
import NavbarRecipes from './navbar';
import { useState } from 'react';
import mockdata from './mockdata';
import ItemGridViewRecipe from './item-grid-view';

const Recipes = () => {
    const [showCreate, setShowCreate] = useState(false);
    const toggleModalCreate = () => setShowCreate(!showCreate);
    return (
        <>
            <NavbarRecipes handler={toggleModalCreate} />
            <GridView data={mockdata} item={ItemGridViewRecipe} />
            <ModalCreate open={showCreate} handler={toggleModalCreate} />
        </>
    );
};

export default Recipes;
