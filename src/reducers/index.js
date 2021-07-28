import { combineReducers } from 'redux';
import categoriasReducer from './categoriasReducer';
import personasReducer from './personasReducer';
import librosReducer from './librosReducer';

export default combineReducers({
    categorias: categoriasReducer,
    personas: personasReducer,
    libros:librosReducer
});
