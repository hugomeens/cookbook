import { useEffect, useState } from 'react';
import ModalUpdateIngredient from './update';
import ModalCreateIngredient from './create';
import NavbarCookBook from '../../components/navbar';
import GridViewIngredients from './grid-view-ingredients';
import API from '../../services/api';
import ModalMergeIngredients from './merge';
import ModalValidateIngredients from './validate';

const Ingredients = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showMerge, setShowMerge] = useState(false);
    const [showValidate, setShowValidate] = useState(false);
    const [item, setItem] = useState({});
    // const [view, setView] = useState('grid');

    const toggleModalCreate = () => setShowCreate(!showCreate);
    const toggleModalUpdate = () => setShowUpdate(!showUpdate);
    const toggleModalMerge = () => setShowMerge(!showMerge);
    const toggleModalValidate = () => setShowValidate(!showValidate);

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        API.listIngredients()
            .then((res) => {
                if (res.status === 200) {
                    setIngredients(res.data);
                }
            })
            .catch((err) => {
                // todo
                console.log(err);
            });

        return () => {};
    }, []);

    const [search, setSearch] = useState('');

    function getMinIndex(a, s) {
        let aCount = a.name.toLowerCase().indexOf(s);
        for (const name of a.alternativeNames) {
            let nCount = name.toLowerCase().indexOf(s);
            // eslint-disable-next-line eqeqeq
            if (nCount != -1 && (nCount < aCount || aCount == -1)) aCount = nCount;
        }
        return aCount;
    }

    useEffect(() => {
        let s = search.toLowerCase();
        ingredients.sort((a, b) => {
            let aCount = getMinIndex(a, s);
            let bCount = getMinIndex(b, s);
            return bCount - aCount;
        });

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
        // view: {
        //     handler: () => setView(view === 'grid' ? 'list' : 'grid'),
        //     value: view,
        // },
    };

    return (
        <>
            <NavbarCookBook data={navbar} />
            {/* {view === 'grid' ? ( */}
            <GridViewIngredients data={ingredients} updateItem={setItem} updateHandler={toggleModalUpdate} />
            {/* ) : (
                <div>List View</div>
            )} */}
            <ModalCreateIngredient opened={showCreate} handler={toggleModalCreate} />
            {showUpdate && <ModalUpdateIngredient opened={showUpdate} handler={toggleModalUpdate} item={item} />}
            {showMerge && <ModalMergeIngredients opened={showMerge} handler={toggleModalMerge} />}
            {showValidate && <ModalValidateIngredients opened={showValidate} handler={toggleModalValidate} />}
        </>
    );
};

export default Ingredients;
