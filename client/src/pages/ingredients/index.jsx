import { useEffect, useState } from 'react';
import ModalCreateIngredient from './create';
import ModalUpdateIngredient from './update';
import NavbarCookBook from '../../components/navbar';
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

    const navbar = {
        title: 'Ingredients',
        buttonMerge: {
            text: 'Merge Ingredients',
            href: '/merge',
        },
        buttonValidate: {
            text: 'Validate Ingredients',
            handler: () => navigate("/validate"),
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
            <GridViewIngredients
                data={ingredients}
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
