import { useEffect, useState } from 'react';
import ModalUpdateIngredient from './update';
import ModalCreateIngredient from './create';
import NavbarCookBook from '../../components/navbar';
import { useNavigate } from 'react-router-dom';
import GridViewIngredients from './grid-view-ingredients';
import API from '../../services/api';

const Ingredients = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    // const [view, setView] = useState('grid');

    const [item, setItem] = useState({});
    const toggleModalCreate = () => setShowCreate(!showCreate);
    const toggleModalUpdate = () => setShowUpdate(!showUpdate);

    const navigate = useNavigate();

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
            handler: () => navigate('/merge'),
        },
        buttonValidate: {
            text: 'Validate Ingredients',
            handler: () => navigate('/validate'),
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
        </>
    );
};

export default Ingredients;
