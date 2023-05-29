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
    const [ingredientsShown, setIngredientsShown] = useState([]);

    useEffect(() => {
        API.listIngredients(limit, page)
            .then((res) => {
                if (res.status === 200) {
                    if (ingredients.length === 0) setIngredients(res.data);
                    else setIngredients((prev) => [...prev, ...res.data]);
                }
            })
            .catch((err) => {
                setNotification(true, err);
            });

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const [search, setSearch] = useState('');

    const loadMore = () => {
        setPage((prev) => prev + limit);
    };

    function getMinIndex(a, s) {
        let aCount = a.name.toLowerCase().indexOf(s);
        for (const name of a.alternativeNames) {
            let nCount = name.toLowerCase().indexOf(s);
            // eslint-disable-next-line eqeqeq
            if (nCount != -1 && (nCount < aCount || aCount == -1)) aCount = nCount;
        }
        return aCount;
    }

    const handleMerge = (idDeletedIngredient, updatedIngredients) => {
        // delete
        console.log(idDeletedIngredient);
        console.log(updatedIngredients);
        // todo ingredients not updating
        setIngredients(
            // eslint-disable-next-line array-callback-return
            ingredients.map((item) => {
                if (item._id === updatedIngredients._id) {
                    return updatedIngredients;
                } else if (item._id === idDeletedIngredient) {
                    // eslint-disable-next-line array-callback-return
                    return;
                }
            })
        );
        upIngredient(updatedIngredients);
    };

    useEffect(() => {
        let s = search.toLowerCase();
        setIngredientsShown(ingredients.filter((ingredient) => getMinIndex(ingredient, s) >= 0));
        ingredientsShown.sort((a, b) => {
            let aCount = getMinIndex(a, s);
            let bCount = getMinIndex(b, s);
            return bCount - aCount;
        });

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, ingredients]);

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

    return (
        <>
            <NavbarCookBook data={navbar} />
            <GridViewIngredients
                data={ingredientsShown}
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
                    updater={(idDeletedIngredient, updatedIngredients) =>
                        handleMerge(idDeletedIngredient, updatedIngredients)
                    }
                />
            )}
            {showValidate && <ModalValidateIngredients opened={showValidate} handler={toggleModalValidate} />}
        </>
    );
};

export default Ingredients;
