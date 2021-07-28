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
    COMENZAR_ACTUALIZACION_LIBRO,
    LIBRO_ACTUALIZADO_EXITO,
    LIBRO_ACTUALIZADO_ERROR,
    OBTENER_LIBRO_PRESTAR,
    COMENZAR_PRESTAR_LIBRO,
    LIBRO_PRESTAR_EXITO,
    LIBRO_PRESTAR_ERROR,
    OBTENER_LIBRO_DEVOLVER,
    COMENZAR_DEVOLVER_LIBRO,
    LIBRO_DEVOLVER_EXITO,
    LIBRO_DEVOLVER_ERROR
} from '../types';

// Importamos las dependencias
import clienteAxios from '../config/axios';
import Swalert from '../utils/Swalert';

///////////////////////////////////////////////////////
// Crear nuevo Libro //////////////////////////////////
///////////////////////////////////////////////////////
export function crearNuevoLibro(libro){
    return async (dispatch) => {        
        dispatch(agregarLibro());
        try {
            //Insertar en la API
            const respuesta = await clienteAxios.post('/libro/', libro);

            //Si todo va bien, actualizamos el state de Libros
            if (respuesta.status === 200) {
                dispatch( agregarLibroExito(respuesta.data));
                // Alerta
                Swalert.mjeOk();
            }  
            
        } catch (error) {            
            //Si hay un error, cambiamos el state
            dispatch( agregarLibroError(true));

            // Alerta
            Swalert.mjeError();

            console.log(error);
        }
    }
}

const agregarLibro = () => ({
    type: AGREGAR_LIBRO,
    payload: true
});

const agregarLibroExito = (libro) => ({
    type: AGREGAR_LIBRO_EXITO,
    payload: libro
});

const agregarLibroError = (estado) => ({
    type: AGREGAR_LIBRO_ERROR,
    payload: estado

});

///////////////////////////////////////////////////////
// Descargar los libros de la DB //////////////////////
///////////////////////////////////////////////////////
export function getLibrosAction(){
    return async (dispatch) => {
        dispatch(descargarLibros() );
        let respuesta;
        try {
            //Consultar la API
            respuesta = await clienteAxios.get('/libro');

            //Si todo va bien, actualizamos el state de libros            
            dispatch( descargarLibrosOk(respuesta.data));
                      
        } catch (error) {
            //Si hay un error, cambiamos el state
            dispatch(descargarlibrosError());
            console.log(error.message);
        }
    }
}

const descargarLibros = () => ({
    type: COMENZAR_DESCARGA_LIBROS,
    payload: true
});

const descargarLibrosOk = libros => ({
    type: DESCARGA_LIBROS_EXITO,
    payload: libros
});

const descargarlibrosError = () => ({
    type: DESCARGA_LIBROS_ERROR,
    payload: true
});

///////////////////////////////////////////////////////
// Seleccion de Libro para ser eliminado de la DB /////
///////////////////////////////////////////////////////
export function deleteLibroAction(id) {
    return async (dispatch) => {
        dispatch(eliminarLibro(id));
        try {
            // Enviar la petición a la API
            await clienteAxios.delete(`/libro/${id}`);  

            //Actualizamos el state de libros    
            dispatch( eliminarLibroOk());

            //Alerta de Libro Eliminada
            Swalert.mjeOk(
                'Eliminada',
                `El libro ${id} ha sido eliminado correctamente`
            );
                
    
        } catch (error) {
            // Si hay un error, cambiamos el state
            dispatch( eliminarLibroError());

            // Validamos si el error se debe a un libro prestado
            
            if(error.response.status===405){
                // Alerta
                Swalert.mjeError(
                    'Error',
                    `El libro ${id} no se puede eliminar ya que esta prestado`,
                    'error'
                );
            } else {
                // Alerta
                Swalert.mjeError({
                    icon: 'Error',
                    title: 'Hubo un error',
                    text: 'Hubo un error, intente nuevamente.'
                });
            }
            console.log(error);            
        }
    }   
}

const eliminarLibro = (id) => ({
    type: OBTENER_LIBRO_ELIMINAR,
    payload: id
});

const eliminarLibroOk = () => ({
    type: LIBRO_ELIMINADO_EXITO, 
});

const eliminarLibroError = () => ({
    type: LIBRO_ELIMINADO_ERROR,
    payload: true
});

///////////////////////////////////////////////////////
// Colocar el libro en actualización //////////////////
///////////////////////////////////////////////////////
export function getLibroActualizar(libro){
    return (dispatch) => {
        dispatch(getLibroActualizarAction(libro));
    }
}

const getLibroActualizarAction = libro => ({
    type: OBTENER_LIBRO_ACTUALIZAR,
    payload: libro
})

///////////////////////////////////////////////////////
// Actualiza el Libro en la DB y state ////////////////
///////////////////////////////////////////////////////
export function updateLibroAction(libro) {
    return async (dispatch) => {
        dispatch( actualizarLibro() );
        let respuesta;
        try {
            if(libro.nombre.trim()===''){
                Swalert.mjeError(
                    'Error',
                    'Ingrese Nombre del Libro'
                );
            }         

            // Enviamos la petición a la API
            respuesta = await clienteAxios.put(`/libro/${libro.id}`, libro);
            
            // Si todo va bien, actualizamos el state de libros
            if (respuesta.status === 200) {  
                dispatch( actualizarLibroOk(libro));

                //Alerta de Libro Actualizado
                Swalert.mjeOk(
                    'Actualizado',
                    `El Libro ${libro.id} ha sido actualizado correctamente`
                );
            }         
        } catch (error) {
            dispatch(actualizarLibroError());
            Swalert.mjeError()            
        }
    }
}

const actualizarLibro = () => ({
    type: COMENZAR_ACTUALIZACION_LIBRO
})

const actualizarLibroOk = libro => ({
    type: LIBRO_ACTUALIZADO_EXITO,
    payload: libro
});

const actualizarLibroError = () => ({
    type: LIBRO_ACTUALIZADO_ERROR,
    payload: true
});

///////////////////////////////////////////////////////
// Colocar el libro en prestar ////////////////////////
///////////////////////////////////////////////////////
export function getLibroPrestar(libro){
    return (dispatch) => {
        dispatch(getLibroPrestarAction(libro));
    }
}

const getLibroPrestarAction = libro => ({
    type: OBTENER_LIBRO_PRESTAR,
    payload: libro
})

///////////////////////////////////////////////////////
// Prestar un  libro //////////////////////////////////
///////////////////////////////////////////////////////
export function prestarLibroAction(libro) {
    return async (dispatch) => {
        dispatch( prestarLibro() );        
        
        try {            
            // Enviamos la petición a la API
            const respuesta = await clienteAxios.put(`/libro/prestar/${libro.id}`, libro);            
            
            // Si todo va bien, actualizamos el state de libros  
            if (respuesta.status === 200) {                  
                dispatch( prestarLibroOk(libro));

                //Alerta de Libro prestado
                Swalert.mjeOk(
                    'Actualizado',
                    `El Libro ${libro.id} ha sido actualizado correctamente`
                );
            }         
        } catch (error) {
            dispatch(prestarLibroError());
            Swalert.mjeError()            
        }
    }
}

const prestarLibro = () => ({
    type: COMENZAR_PRESTAR_LIBRO
})

const prestarLibroOk = libro => ({
    type: LIBRO_PRESTAR_EXITO,
    payload: libro
});

const prestarLibroError = () => ({
    type: LIBRO_PRESTAR_ERROR,
    payload: true
});

///////////////////////////////////////////////////////
// Colocar el libro en devolver ///////////////////////
///////////////////////////////////////////////////////
export function getLibroDevolver(libro){
    return (dispatch) => {
        dispatch(getLibroDevolverAction(libro));
    }
}

const getLibroDevolverAction = libro => ({
    type: OBTENER_LIBRO_DEVOLVER,
    payload: libro
})

///////////////////////////////////////////////////////
// Devolver un  libro /////////////////////////////////
///////////////////////////////////////////////////////
export function devolverLibroAction(libro) {
    return async (dispatch) => {
        dispatch( devolverLibro() );                       
        libro.persona_id = null;
        
        try {            
            // Enviamos la petición a la API
            const respuesta = await clienteAxios.put(`/libro/devolver/${libro.id}`, libro);            
            
            //Actualizamos el state de libros  
            if (respuesta.status === 200) {                  
                dispatch( devolverLibroOk(libro));
                Swalert.mjeOk('Actualizado',`El Libro ${libro.id} ha sido actualizada correctamente`);
            }         
        } catch (error) {
            dispatch(devolverLibroError());
            Swalert.mjeError()            
        }
    }
}

const devolverLibro = () => ({
    type: COMENZAR_DEVOLVER_LIBRO
})

const devolverLibroOk = libro => ({
    type: LIBRO_DEVOLVER_EXITO,
    payload: libro
});

const devolverLibroError = () => ({
    type: LIBRO_DEVOLVER_ERROR,
    payload: true
});


///////////////////////////////////////////////////////
// Listar libros que tiene una persona ////////////////
///////////////////////////////////////////////////////
export function getPersonaLibrosAction(persona){
    return async (dispatch) => {
        let respuesta;
        dispatch( descargarLibros() );
        try {
            // Consultamos en la API
            respuesta = await clienteAxios.get(`/personaLibrosPrestado/${persona.id}`);
            
            //Si todo va bien, actualizamos el state de personas            
            dispatch( descargarLibrosOk(respuesta.data));
                      
        } catch (error) {            
            dispatch(descargarlibrosError(error));
        }
    }
}

///////////////////////////////////////////////////////
// Listar libros que tiene una categoria //////////////
///////////////////////////////////////////////////////
export function getCategoriaLibrosAction(categoria){
    return async (dispatch) => {
        let respuesta;
        dispatch( descargarLibros() );
        try {
            // Consultamos en la API
            respuesta = await clienteAxios.get('/libro');
            const resultado = respuesta.data;

            // Filtramos los libros con la categoría seleccionada
            const librosCategoria = resultado.filter( libro => (
                libro.categoria_id === categoria.id
            ));           
            
            //Si todo va bien, actualizamos el state
            dispatch( descargarLibrosOk(librosCategoria));
                      
        } catch (error) {            
            dispatch(descargarlibrosError(error));
        }
    }
}