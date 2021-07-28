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
    COMENZAR_ACTUALIZACION_PERSONA,
    PERSONA_ACTUALIZADA_EXITO,
    PERSONA_ACTUALIZADA_ERROR,
    COMENZAR_DESCARGA_PERSONA
} from '../types';

// Importamos las dependencias
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

///////////////////////////////////////////////////////
// Crear nueva Persona ////////////////////////////////
///////////////////////////////////////////////////////
export function crearNuevaPersona(persona){
    return async (dispatch) => {        
        dispatch(agregarPersona());
        try {
            //Insertar en la API
            const respuesta = await clienteAxios.post('/persona/', persona);

            //Si todo va bien, actualizamos el state de Personas
            if (respuesta.status === 200) {                
                dispatch( agregarPersonaExito(respuesta.data));

                // Alerta
                Swal.fire(
                    'Correcto',
                    'La Persona se agregó correctamente.',
                    'success'
                );
            }  
            
        } catch (error) {            
            //Si hay un error, cambiamos el state
            dispatch( agregarPersonaError());

            // Alerta
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intente nuevamente'
            });
        }
    }
}

const agregarPersona = () => ({
    type: AGREGAR_PERSONA,
    payload: true
});

const agregarPersonaExito = (persona) => ({
    type: AGREGAR_PERSONA_EXITO,
    payload: persona
});

const agregarPersonaError = () => ({
    type: AGREGAR_PERSONA_ERROR,
    payload: true

});

///////////////////////////////////////////////////////
// Descargar las personas de la DB///////////
///////////////////////////////////////////////////////
export function getPersonasAction(){
    return async (dispatch) => {
        dispatch(descargarPersonas() );
        let respuesta;
        try {
            // Consultamos la API
            respuesta = await clienteAxios.get('/persona');
            
            //Si todo va bien, actualizamos el state de personas            
            dispatch( descargarPersonasOk(respuesta.data));
                      
        } catch (error) {            
            dispatch(descargarpersonasError());
            console.log(error.message);
        }
    }
}

const descargarPersonas = () => ({
    type: COMENZAR_DESCARGA_PERSONAS,
    payload: true
});

const descargarPersonasOk = personas => ({
    type: DESCARGA_PERSONAS_EXITO,
    payload: personas
});

const descargarpersonasError = () => ({
    type: DESCARGA_PERSONAS_ERROR,
    payload: true
});

///////////////////////////////////////////////////////
// Seleccion Persona para ser eliminada de la DB //////
///////////////////////////////////////////////////////
export function deletePersonaAction(id) {
    return async (dispatch) => {
        dispatch(eliminarPersona(id));
        try {
            // Enviamos la petición a la API
            const respuesta = await clienteAxios.delete(`/persona/${id}`);

            if (respuesta.status === 200) {
                // Actualizamos el state de personas    
                dispatch( eliminarPersonaOk());

                // Alerta de Persona Eliminada
                Swal.fire(
                    'Eliminada',
                    `La persona ${id} ha sido eliminada correctamente`,
                    'success'
                );
            } else if (respuesta.status === 204) {
                
                // Alerta de Persona con libros prestados
                Swal.fire(
                    'Error',
                    `La persona ${id} tiene libros prestados, no se puede eliminar`,
                    'error'
                );
            }    
        } catch (error) {
            dispatch( eliminarPersonaError());
            
            // Alerta
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intente nuevamente'
            });
            console.log(error);
        }
    }   
}

const eliminarPersona = (id) => ({
    type: OBTENER_PERSONA_ELIMINAR,
    payload: id
});

const eliminarPersonaOk = () => ({
    type: PERSONA_ELIMINADA_EXITO, 
});

const eliminarPersonaError = () => ({
    type: PERSONA_ELIMINADA_ERROR,
    payload: true
});

///////////////////////////////////////////////////////
// Colocar la persona en actualización ////////////////
///////////////////////////////////////////////////////
export function getPersonaActualizar(persona){
    return (dispatch) => {
        dispatch(getPersonaActualizarAction(persona));
    }
}

const getPersonaActualizarAction = persona => ({
    type: OBTENER_PERSONA_ACTUALIZAR,
    payload: persona
})

const sweetMensajeError=(text='Hubo un error, intente nuevamente')=>{
    Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        text
        }
    );
}

///////////////////////////////////////////////////////
// Actualiza la Persona en la DB y el state ///////////
///////////////////////////////////////////////////////
export function updatePersonaAction(persona) {
    return async (dispatch) => {
        dispatch( actualizarPersona() );
        let respuesta;
        try {
            if(persona.nombre.trim()===''){
                sweetMensajeError('Ingrese Nombre de la Persona')
            }            
            // Enviamos la petición a la API
            respuesta = await clienteAxios.put(`/persona/${persona.id}`, persona);

            //Actualizamos el state de personas  
            if (respuesta.status === 200) {  
                dispatch( actualizarPersonaOk(persona));
                Swal.fire(
                    'Actualizado',
                    `La Persona ${persona.id} ha sido actualizada correctamente`,
                    'Success'
                )
            }         
        } catch (error) {
            dispatch(actualizarPersonaError());
            sweetMensajeError();            
        }
    }
}

const actualizarPersona = () => ({
    type: COMENZAR_ACTUALIZACION_PERSONA
})

const actualizarPersonaOk = persona => ({
    type: PERSONA_ACTUALIZADA_EXITO,
    payload: persona
});

const actualizarPersonaError = () => ({
    type: PERSONA_ACTUALIZADA_ERROR,
    payload: true
})

///////////////////////////////////////////////////////
// Descargar la persona de la DB //////////////////////
///////////////////////////////////////////////////////

export function getPersona(persona){
    return (dispatch) => {
        dispatch(descargarPersona(persona));
    }
}

const descargarPersona = (persona) => ({
    type: COMENZAR_DESCARGA_PERSONA,
    payload: persona
});