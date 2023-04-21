import ModalCreate from './create';
import GridView from '../../components/grid-view';
import { useState } from 'react';
import mockdata from '../mockdata';
import ItemGridViewRecipe from './item-grid-view';
import NavbarCookBook from '../../components/navbar';

const Recipes = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [view, setView] = useState('grid');
    const toggleModalCreate = () => setShowCreate(!showCreate);

    const navbar = {
        title: 'Recipes',
        buttonValidate: {
            text: 'Validate Recipes',
            handler: () => alert('not implemented'),
        },
        buttonCreate: {
            text: 'New Recipe',
            handler: toggleModalCreate,
        },
        view: {
            handler: () => setView(view === 'grid' ? 'list' : 'grid'),
            value: view,
        },
    };

    return (
        <>
            <NavbarCookBook data={navbar} />
            <GridView data={mockdata} item={ItemGridViewRecipe} />
            <ModalCreate open={showCreate} handler={toggleModalCreate} />
        </>
    );
};

export default Recipes;
