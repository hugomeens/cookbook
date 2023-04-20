import NavbarIngredients from './navbar';
import { useState } from 'react';

const Ingredients = () => {
    const [showCreate, setShowCreate] = useState(false);
    const toggleModalCreate = () => setShowCreate(!showCreate);
    return (
        <>
            <NavbarIngredients handler={toggleModalCreate} />
            {/* <GridView /> */}
            {/* <ModalCreate open={showCreate} handler={toggleModalCreate} /> */}
        </>
    );
};

export default Ingredients;
