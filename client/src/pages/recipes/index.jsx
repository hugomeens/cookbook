import ModalCreate from './create';
import GridView from '../../components/grid-view';
import { useState } from 'react';
import ItemGridViewRecipe from './item-grid-view';
import NavbarCookBook from '../../components/navbar';
import API from '../../services/api';
import { useEffect } from 'react';
import setNotification from '../errors/error-notification';
import ModalUpdate from './update';
import ModalValidateRecipes from './validate';

const Recipes = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showValidate, setShowValidate] = useState(false);
    const toggleModalCreate = () => setShowCreate(!showCreate);
    const toggleModalUpdate = () => setShowUpdate(!showUpdate);
    const toggleModalValidate = () => setShowValidate(!showValidate);
    const [recipes, setRecipes] = useState([]);
    const [idUpdate, setIdUpdate] = useState('');
    const [page, setPage] = useState(0);
    let split = window.location.href.split('/');
    const defaultSearch = split.length > 4 ? window.location.href.split('/').slice(-1)[0] : undefined;
    const [search, setSearch] = useState(defaultSearch ?? '');
    const limit = 3;

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

    const updateRecipe = (recipe) => {
        if (recipe) {
            setRecipes(
                recipes.map((item) => {
                    if (item._id === recipe._id) {
                        return recipe;
                    }
                    return item;
                })
            );
        }
        toggleModalUpdate();
    };

    const validateRecipe = (id) => {
        setRecipes(
            recipes.map((item) => {
                if (item._id === id) {
                    item.valid = true;
                }
                return item;
            })
        );
    };

    const loadMore = () => {
        setPage((prev) => prev + limit);
    };

    const navbar = {
        title: 'Recipes',
        handlerChange: (e) => setSearch(e.target.value),
        search: search,
        buttonValidate: {
            text: 'Validate Recipes',
            handler: toggleModalValidate,
        },
        buttonCreate: {
            text: 'New Recipe',
            handler: toggleModalCreate,
        },
    };

    const setNewRecipes = async (s) => {
        if (s.length >= 2) {
            let res = await API.listRecipes(limit, page, s);
            setRecipes(res.data);
        } else if (s.length === 0) {
            let res = await API.listRecipes(limit, page);
            setRecipes(res.data);
        }
    };

    useEffect(() => {
        setNewRecipes(search);
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    useEffect(() => {
        if (search.length >= 2) {
            setNewRecipes(search);
        } else {
            API.listRecipes(limit, page)
                .then((res) => {
                    if (res.status === 200) {
                        if (recipes.length === 0) setRecipes(res.data);
                        else setRecipes((prev) => [...prev, ...res.data]);
                    }
                })
                .catch((err) => {
                    setNotification(true, err.response.data.error);
                });
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <>
            <NavbarCookBook data={navbar} />
            <GridView
                data={recipes}
                item={ItemGridViewRecipe}
                openUpdate={(id) => openUpdate(id)}
                onDelete={(id) => setRecipes(recipes.filter((recipe) => recipe._id !== id))}
                loadMore={loadMore}
            />
            <ModalCreate open={showCreate} handler={(recipe) => createRecipe(recipe)} />
            <ModalUpdate open={showUpdate} handler={(recipe) => updateRecipe(recipe)} id={idUpdate} />
            <ModalValidateRecipes
                open={showValidate}
                handler={toggleModalValidate}
                updater={(id) => validateRecipe(id)}
            />
        </>
    );
};

export default Recipes;
