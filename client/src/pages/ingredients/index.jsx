import { useState } from 'react';
import GridView from '../../components/grid-view';
import mockdata from './mockdata';
import ItemGridViewIngredients from './item-grid-view';
import ModalCreateIngredient from './create';
import ModalUpdateIngredient from './update';
import NavbarCookBook from '../../components/navbar';
import { useNavigate } from "react-router-dom";

const Ingredients = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    // const [view, setView] = useState('grid');
    const [item, setItem] = useState({});
    const toggleModalCreate = () => setShowCreate(!showCreate);
    const toggleModalUpdate = () => setShowUpdate(!showUpdate);

    const navigate = useNavigate();

    const navbar = {
        title: 'Ingredients',
        buttonMerge: {
            text: 'Merge Ingredients',
            handler: () => navigate("/merge"),
        },
        buttonValidate: {
            text: 'Validate Ingredients',
            handler: () => alert('not implemented'),
        },
        buttonCreate: {
            text: 'New Ingredients',
            handler: toggleModalCreate,
        },
        // view: {
        //     handler: () => setView(view === 'grid' ? 'list' : 'grid'),
        //     value: view,
        // },
    };

    return (
        <>
            <NavbarCookBook data={navbar} />
            {/* {view === 'grid' ? ( */}
            <GridView
                data={mockdata}
                item={ItemGridViewIngredients}
                updateItem={setItem}
                updateHandler={toggleModalUpdate}
            />
            {/* ) : (
                <div>List View</div>
            )} */}
            <ModalCreateIngredient opened={showCreate} handler={toggleModalCreate} />
            {showUpdate && <ModalUpdateIngredient opened={showUpdate} handler={toggleModalUpdate} item={item} />}
        </>
    );
};

export default Ingredients;
