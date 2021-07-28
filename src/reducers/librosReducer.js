//Importamos los types
import { 
    AGREGAR_LIBRO,
    AGREGAR_LIBRO_EXITO,
    AGREGAR_LIBRO_ERROR,
    COMENZAR_DESCARGA_LIBROS,
    DESCARGA_LIBROS_EXITO,
    DESCARGA_LIBROS_ERROR,
    OBTENER_LIBRO_ELIMINAR,
    LIBRO_ELIMINADO_EXITO,
    LIBRO_ELIMINADO_ERROR,
    OBTENER_LIBRO_ACTUALIZAR,
    LIBRO_ACTUALIZADO_EXITO,
    LIBRO_ACTUALIZADO_ERROR,
    OBTENER_LIBRO_PRESTAR,    
    LIBRO_PRESTAR_EXITO,
    LIBRO_PRESTAR_ERROR,
    OBTENER_LIBRO_DEVOLVER,    
    LIBRO_DEVOLVER_EXITO,
    LIBRO_DEVOLVER_ERROR,
    DESCARGA_PERSONALIBROS_EXITO,
    DESCARGA_PERSONALIBROS_ERROR
} from '../types';

// LIBRO REDUCER (Cada reducer tiene su propio state)
const estadoInicial = {
    libros: [],
    error: null,
    loading: false,
    eliminarLibro: null,
    actualizarLibro: null,
    devolverLibro: null,
    prestarLibro: null
}

const librosReducer=function (state = estadoInicial, action) {
    switch (action.type) {
        case AGREGAR_LIBRO:
            return{
                ...state,
                loading: action.payload
            }
        
        case AGREGAR_LIBRO_EXITO:
            return{
                ...state,
                loading: false,
                libros: [...state.libros, action.payload]
            }
        
        case AGREGAR_LIBRO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case COMENZAR_DESCARGA_LIBROS:
            return{
                ...state,
                loading: action.payload 
            }
        
        case DESCARGA_LIBROS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                libros: action.payload
            }
        
        case DESCARGA_LIBROS_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case OBTENER_LIBRO_ELIMINAR:
            return{
                ...state,
                eliminarLibro: action.payload
            }

        case LIBRO_ELIMINADO_EXITO:
            return{
                ...state,
                libros: state.libros.filter( libro => 
                    libro.id !== state.eliminarLibro ),
                    eliminarLibro: null
            }
        
        case LIBRO_ELIMINADO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case OBTENER_LIBRO_ACTUALIZAR:
            return{
                ...state,
                actualizarLibro: action.payload
            }
        
        case LIBRO_ACTUALIZADO_EXITO:
            return{
                ...state,
                actualizarLibro: null,
                libros: state.libros.map( libro => 
                    libro.id === action.payload.id 
                        ? libro = action.payload
                        : libro 
                )
            }
        
        case LIBRO_ACTUALIZADO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        
        case OBTENER_LIBRO_PRESTAR:
            return{
                ...state,
                prestarLibro: action.payload
            }
        
        case LIBRO_PRESTAR_EXITO:
            return{
                ...state,
                prestarLibro: null,
                libros: state.libros.map( libro => 
                    libro.id === action.payload.id 
                        ? libro = action.payload
                        : libro 
                )
            }
            
        case LIBRO_PRESTAR_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case OBTENER_LIBRO_DEVOLVER:
            return{
                ...state,
                devolverLibro: action.payload
            }
        
        case LIBRO_DEVOLVER_EXITO:
            return{
                ...state,
                devolverLibro: null,
                libros: state.libros.map( libro => 
                    libro.id === action.payload.id 
                        ? libro = action.payload
                        : libro 
                )
            }
            
        case LIBRO_DEVOLVER_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case DESCARGA_PERSONALIBROS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                libros: action.payload
            }
        
        case DESCARGA_PERSONALIBROS_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }        
        
        default:
            return state;
    }
}

export default librosReducer;