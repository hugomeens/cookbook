import NavbarIngredients from './navbar';
import { useState } from 'react';
import GridView from '../../components/grid-view';
import mockdata from './mockdata';
import ItemGridViewIngredients from './item-grid-view';
import ModalCreateIngredient from './create';

const Ingredients = () => {
    const [showCreate, setShowCreate] = useState(false);
    const toggleModalCreate = () => setShowCreate(!showCreate);
    return (
        <>
            <NavbarIngredients handler={toggleModalCreate} />
            <GridView data={mockdata} item={ItemGridViewIngredients} />
            <ModalCreateIngredient opened={showCreate} handler={toggleModalCreate} />
        </>
    );
};

export default Ingredients;
