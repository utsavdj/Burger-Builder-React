import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngerdient = (name) => {
    return {
        type:  actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngerdient = (name) => {
    return {
        type:  actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
};

const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://react-my-burger-ef2e2.firebaseio.com/ingredients.json").then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
            dispatch(fetchIngredientsFailed());
        });
    }
};
