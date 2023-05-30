import { useEffect, useState } from 'react';
import ModalUpdateIngredient from './update';
import ModalCreateIngredient from './create';
import NavbarCookBook from '../../components/navbar';
import GridViewIngredients from './grid-view-ingredients';
import API from '../../services/api';
import ModalMergeIngredients from './merge';
import ModalValidateIngredients from './validate';
import setNotification from '../errors/error-notification';

const Ingredients = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showMerge, setShowMerge] = useState(false);
    const [showValidate, setShowValidate] = useState(false);
    const [item, setItem] = useState({});
    const [page, setPage] = useState(0);
    const limit = 4;

    const toggleModalCreate = () => setShowCreate(!showCreate);
    const toggleModalUpdate = () => setShowUpdate(!showUpdate);
    const toggleModalMerge = () => setShowMerge(!showMerge);
    const toggleModalValidate = () => setShowValidate(!showValidate);

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        API.listIngredients(limit, page)
            .then((res) => {
                if (res.status === 200) {
                    if (ingredients.length === 0) setIngredients(res.data);
                    else setIngredients((prev) => [...prev, ...res.data]);
                }
            })
            .catch((err) => {
                setNotification(true, err.response.data.error);
            });

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const [search, setSearch] = useState('');

    const loadMore = () => {
        setPage((prev) => prev + limit);
    };

    const handleMerge = (idDeletedIngredient, updatedIngredients) => {
        let ing = [];
        for (let i = 0; i < ingredients.length; i++) {
            const item = ingredients[i];
            if (item._id === updatedIngredients._id) {
                ing.push(updatedIngredients);
            } else if (item._id === idDeletedIngredient) {
                continue;
            } else {
                ing.push(item);
            }
        }
        setIngredients(ing);
    };

    const setNewIngredients = async (s) => {
        if (s.length >= 2) {
            let res = await API.searchIngredient(s);
            setIngredients(res.data);
        } else if (s.length === 0) {
            let res = await API.listIngredients(limit, page);
            setIngredients(res.data);
        }
    };

    useEffect(() => {
        let s = search.toLowerCase();
        setNewIngredients(s);
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const navbar = {
        title: 'Ingredients',
        search: search,
        handlerChange: (e) => setSearch(e.target.value),
        buttonMerge: {
            text: 'Merge Ingredients',
            handler: toggleModalMerge,
        },
        buttonValidate: {
            text: 'Validate Ingredients',
            handler: toggleModalValidate,
        },
        buttonCreate: {
            text: 'New Ingredients',
            handler: toggleModalCreate,
        },
    };

    function upIngredient(ingredient) {
        setIngredients(ingredients.map((item) => (item._id === ingredient._id ? ingredient : item)));
    }

    const validateIngredient = (id) => {
        setIngredients(
            ingredients.map((item) => {
                if (item._id === id) {
                    item.valid = true;
                }
                return item;
            })
        );
    };

    return (
        <>
            <NavbarCookBook data={navbar} />
            <GridViewIngredients
                data={ingredients}
                updateItem={setItem}
                updateHandler={toggleModalUpdate}
                loadMore={loadMore}
            />
            <ModalCreateIngredient
                opened={showCreate}
                addIngredient={(ingredient) => setIngredients((prev) => [...prev, ingredient])}
                handler={toggleModalCreate}
            />
            {showUpdate && (
                <ModalUpdateIngredient
                    opened={showUpdate}
                    updateIngredient={(ingredient) => upIngredient(ingredient)}
                    handler={toggleModalUpdate}
                    item={item}
                />
            )}
            {showMerge && (
                <ModalMergeIngredients
                    opened={showMerge}
                    handler={toggleModalMerge}
                    updater={(idDeletedIngredient, updatedIngredient) =>
                        handleMerge(idDeletedIngredient, updatedIngredient)
                    }
                />
            )}
            {showValidate && (
                <ModalValidateIngredients
                    opened={showValidate}
                    handler={toggleModalValidate}
                    updater={(id) => validateIngredient(id)}
                />
            )}
        </>
    );
};

export default Ingredients;
