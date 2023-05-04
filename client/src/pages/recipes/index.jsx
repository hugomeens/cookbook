import ModalCreate from './create';
import ModalValidateRecipes from './validate';
import GridView from '../../components/grid-view';
import { useState } from 'react';
import ItemGridViewRecipe from './item-grid-view';
import NavbarCookBook from '../../components/navbar';
import API from '../../services/api';
import { useEffect } from 'react';
import setNotification from '../errors/error-notification';
import ModalUpdate from './update';

const Recipes = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [showValidate, setShowValidate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [view, setView] = useState('grid');
    const toggleModalCreate = () => setShowCreate(!showCreate);
    // const [search, setSearch] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [idUpdate, setIdUpdate] = useState('');

    const openUpdate = (id) => {
        setIdUpdate(id);
        toggleModalUpdate();
    };

    const createRecipe = (recipe) => {
        if (recipe) {
            setRecipes((prev) => [...prev, recipe]);
        }
        toggleModalCreate();
    };

    const navbar = {
        title: 'Recipes',
        buttonValidate: {
            text: 'Validate Recipes',
            handler: toggleModalValidateRecipes,
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

    useEffect(() => {
        API.listRecipes()
            .then((res) => {
                if (res.status === 200) {
                    setRecipes(res.data);
                }
            })
            .catch((err) => {
                setNotification(true, err);
            });

        return () => {};
    }, []);

    return (
        <>
            <NavbarCookBook data={navbar} />
            <GridView data={recipes} item={ItemGridViewRecipe} />
            <ModalCreate open={showCreate} handler={toggleModalCreate} />
        </>
    );
};

export default Recipes;
