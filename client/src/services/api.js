import axios from 'axios';

const caller = (url = '/api') => {
    return axios.create({
        baseURL: url,
    });
};

const API = {
    createIngredient(data) {
        return caller().post('/ingredient/create', data);
    },
    updateIngredient(data) {
        return caller().post('/ingredient/update', data);
    },
    listIngredients(limit, offset) {
        return caller().get(`/ingredient/list?limit=${limit}&offset=${offset}`);
    },
    deleteIngredient(id) {
        return caller().delete(`/ingredient/delete/${id}`);
    },
    searchIngredient(search) {
        return caller().get(`/ingredient/search?search=${search}`);
    },
    validateIngredient(data) {
        return caller().post('/ingredient/validate', data);
    },
    createRecipe(data) {
        return caller().post('/recipe/create', data);
    },
    listRecipes(limit, offset, search) {
        return caller().get(`/recipe/list?limit=${limit}&offset=${offset}&search=${search ?? ''}`);
    },
    validateRecipe(data) {
        return caller().post('/recipe/validate', data);
    },
    getRecipe(id) {
        return caller().get(`/recipe/view/${id}`);
    },
    deleteRecipe(id) {
        return caller().delete(`/recipe/delete/${id}`);
    },
    updateRecipe(body) {
        return caller().put('/recipe/update', body);
    },
    searchRecipe(search) {
        return caller().get(`/recipe/search?search=${search}`);
    },
};

export default API;
