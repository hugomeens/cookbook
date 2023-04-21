import mockdata from '../ingredients/mockdata';
import NavbarCookBook from '../../components/navbar';
import GridViewIngredients from '../ingredients/grid-view-ingredients';

const Validate = () => {
    const navbar = {
        title: 'Ingredients',
    };

    const clickHandler = (id) => {
        
    };

    return (
        <>
            <NavbarCookBook data={navbar} />
            <GridViewIngredients
                data={mockdata}
                button={{
                    clickHandler: clickHandler,
                    text: 'Validate',
                }}
            />
        </>
    );
};

export default Validate;
