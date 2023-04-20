import NavbarIngredients from './navbar';
import { useState } from 'react';
import GridView from '../../components/grid-view';
import mockdata from './mockdata';
import ItemGridViewIngredients from './item-grid-view';

const Ingredients = () => {
    const [showCreate, setShowCreate] = useState(false);
    const toggleModalCreate = () => setShowCreate(!showCreate);
    return (
        <>
            <NavbarIngredients handler={toggleModalCreate} />
            <GridView data={mockdata} item={ItemGridViewIngredients} />
            {/* <ModalCreate open={showCreate} handler={toggleModalCreate} /> */}
        </>
    );
};

export default Ingredients;
