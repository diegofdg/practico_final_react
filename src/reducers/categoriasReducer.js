//Importamos los types
import { 
    AGREGAR_CATEGORIA,
    AGREGAR_CATEGORIA_EXITO,    
    AGREGAR_CATEGORIA_ERROR,
    COMENZAR_DESCARGA_CATEGORIAS,
    DESCARGA_CATEGORIAS_EXITO,
    DESCARGA_CATEGORIAS_ERROR,
    OBTENER_CATEGORIA_ELIMINAR,
    CATEGORIA_ELIMINADA_EXITO,
    CATEGORIA_ELIMINADA_ERROR,
    OBTENER_CATEGORIA_ACTUALIZAR,
    CATEGORIA_ACTUALIZADA_EXITO,
    CATEGORIA_ACTUALIZADA_ERROR,
    COMENZAR_DESCARGA_CATEGORIA,
} from '../types';

// CATEGORIA REDUCER (Cada reducer tiene su propio state)
const estadoInicial = {
    categorias: [],
    error: null,
    loading: false,
    eliminarCategoria: null,
    actualizarCategoria: null,
    categoria: null    
}

const categoriasReducer=function (state = estadoInicial, action) {
    switch (action.type) {
        case AGREGAR_CATEGORIA:
            return{
                ...state,
                loading: action.payload
            }
        
        case AGREGAR_CATEGORIA_EXITO:
            return{
                ...state,
                loading: false,                
                categorias: [...state.categorias, action.payload]
            }
        
        case AGREGAR_CATEGORIA_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }       

        case COMENZAR_DESCARGA_CATEGORIAS:
            return{
                ...state,
                loading: action.payload 
            }
        
        case DESCARGA_CATEGORIAS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                categorias: action.payload
            }
        
        case DESCARGA_CATEGORIAS_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case OBTENER_CATEGORIA_ELIMINAR:
            return{
                ...state,
                eliminarCategoria: action.payload
            }

        case CATEGORIA_ELIMINADA_EXITO:
            return{
                ...state,
                categorias: state.categorias.filter( categoria => 
                    categoria.id !== state.eliminarCategoria ),
                eliminarCategoria: null
            }
        
        case CATEGORIA_ELIMINADA_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case OBTENER_CATEGORIA_ACTUALIZAR:
            return{
                ...state,
                actualizarCategoria: action.payload
            }
        
        case CATEGORIA_ACTUALIZADA_EXITO:
            return{
                ...state,
                actualizarCategoria: null,
                categorias: state.categorias.map( categoria => 
                    categoria.id === action.payload.id 
                        ? categoria = action.payload
                        : categoria 
                )
            }
        
        case CATEGORIA_ACTUALIZADA_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case COMENZAR_DESCARGA_CATEGORIA:
            return{
                ...state,
                loading: false,
                error: null,
                categoria: action.payload
            }
        
        default:
            return state;
    }
}

export default categoriasReducer;