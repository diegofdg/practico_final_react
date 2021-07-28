//Importamos los types
import { 
    AGREGAR_PERSONA,
    AGREGAR_PERSONA_EXITO,
    AGREGAR_PERSONA_ERROR,
    COMENZAR_DESCARGA_PERSONAS,
    DESCARGA_PERSONAS_EXITO,
    DESCARGA_PERSONAS_ERROR,
    OBTENER_PERSONA_ELIMINAR,
    PERSONA_ELIMINADA_EXITO,
    PERSONA_ELIMINADA_ERROR,
    OBTENER_PERSONA_ACTUALIZAR,
    PERSONA_ACTUALIZADA_EXITO,
    PERSONA_ACTUALIZADA_ERROR,
    COMENZAR_DESCARGA_PERSONA,
    DESCARGA_PERSONALIBROS_EXITO,
    DESCARGA_PERSONALIBROS_ERROR
} from '../types';

// PERSONA REDUCER (Cada reducer tiene su propio state)
const estadoInicial = {
    personas: [],
    error: null,
    loading: false,
    eliminarPersona: null,
    actualizarPersona: null,
    PersonaLibros:null,
    persona:null
}

const personasReducer=function (state = estadoInicial, action) {
    switch (action.type) {
        case AGREGAR_PERSONA:
            return{
                ...state,
                loading: action.payload
            }
        
        case AGREGAR_PERSONA_EXITO:
            return{
                ...state,
                loading: false,
                personas: [...state.personas, action.payload]
            }
        
        case AGREGAR_PERSONA_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case COMENZAR_DESCARGA_PERSONAS:
            return{
                ...state,
                loading: action.payload 
            }
        
        case DESCARGA_PERSONAS_EXITO:
            return{
                ...state,
                loading: false,
                error: null,
                personas: action.payload
            }
        
        case DESCARGA_PERSONAS_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case OBTENER_PERSONA_ELIMINAR:
            return{
                ...state,
                eliminarPersona: action.payload
            }

        case PERSONA_ELIMINADA_EXITO:
            return{
                ...state,
                personas: state.personas.filter( persona => 
                    persona.id !== state.eliminarPersona ),
                eliminarPersona: null
            }
        
        case PERSONA_ELIMINADA_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }

        case OBTENER_PERSONA_ACTUALIZAR:
            return{
                ...state,
                actualizarPersona: action.payload
            }
        
        case PERSONA_ACTUALIZADA_EXITO:
            return{
                ...state,
                actualizarPersona: null,
                personas: state.personas.map( persona => 
                    persona.id === action.payload.id 
                        ? persona = action.payload
                        : persona 
                )
            }
        
        case PERSONA_ACTUALIZADA_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        
        case COMENZAR_DESCARGA_PERSONA:
            return{
                ...state,
                loading: false,
                error: null,
                persona: action.payload
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

export default personasReducer;