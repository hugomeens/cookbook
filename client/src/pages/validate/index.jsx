import NavbarCookBook from '../../components/navbar';
import GridViewIngredients from '../ingredients/grid-view-ingredients';
import API from '../../services/api';
import { useEffect, useState } from 'react';

const Validate = () => {
    const navbar = {
        title: 'Ingredients',
    };

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        API.listIngredients()
            .then((res) => {
                if (res.status === 200) {
                    res.data = res.data.filter((ingredient) => (ingredient.valid === false));
                    setIngredients(res.data);
                }
            })
            .catch((err) => {
                // todo
                console.log(err);
            });

        return () => {};
    }, []);

    const clickHandler = async (item) => {
        try {
            await API.validateIngredient({ _id: item._id });
            item.valid = true;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <NavbarCookBook data={navbar} />
            <GridViewIngredients
                data={ingredients}
                button={{
                    clickHandler: clickHandler,
                    text: 'Validate',
                }}
            />
        </>
    );
};

export default Validate;
