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
    COMENZAR_ACTUALIZACION_CATEGORIA,
    CATEGORIA_ACTUALIZADA_EXITO,
    CATEGORIA_ACTUALIZADA_ERROR,
    COMENZAR_DESCARGA_CATEGORIA
} from '../types';

// Importamos las dependencias
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

///////////////////////////////////////////////////////
// Crear nueva categoria //////////////////////////////
///////////////////////////////////////////////////////
export function crearNuevaCategoria(categoria){
    return async (dispatch) => {        
        dispatch(agregarCategoria());

        try {
            // Insertar en la API
            const respuesta = await clienteAxios.post('/categoria/', categoria);            
            
            // Si todo va bien, actualizamos el state de categorias
            if (respuesta.status === 200) {                
                dispatch( agregarCategoriaExito(respuesta.data));
                // Alerta
                Swal.fire(
                    'Correcto',
                    'La Categoría se agregó correctamente.',
                    'success'
                );
            }            
        } catch (error) {
            //Si hay un error, cambiamos el state
            dispatch( agregarCategoriaError(true));
            
            // Alerta
            Swal.fire({
                icon: 'Error',
                title: 'Hubo un error',
                text: 'Hubo un error, intente nuevamente.'
            }
            );
            console.log(error);
        }
    }
}

const agregarCategoria = () => ({
    type: AGREGAR_CATEGORIA,
    payload: true
});

const agregarCategoriaExito = (categoria) => ({
    type: AGREGAR_CATEGORIA_EXITO,
    payload: categoria
});

const agregarCategoriaError = (estado) => ({
    type: AGREGAR_CATEGORIA_ERROR,
    payload: estado
});

///////////////////////////////////////////////////////
// Descargar las categorias de la DB //////////////////
///////////////////////////////////////////////////////
export function getCategoriasAction(){
    return async (dispatch) => {
        dispatch(descargarCategorias() );
        let respuesta;
        try {
            // Consultar en la API
            respuesta = await clienteAxios.get('/categoria');

            //Si todo va bien, actualizamos el state de categorias                
            dispatch( descargarCategoriasOk(respuesta.data));
                      
        } catch (error) {
            //Si hay un error, cambiamos el state
            dispatch( descargarCategoriasError());
            console.log(error.message);
        }
    }
}

const descargarCategorias = () => ({
    type: COMENZAR_DESCARGA_CATEGORIAS,
    payload: true
});

const descargarCategoriasOk = categorias => ({
    type: DESCARGA_CATEGORIAS_EXITO,
    payload: categorias
});

const descargarCategoriasError = () => ({
    type: DESCARGA_CATEGORIAS_ERROR,
    payload: true
});

///////////////////////////////////////////////////////
// Seleccion Categoria para ser eliminada de la DB ////
///////////////////////////////////////////////////////
export function deleteCategoriaAction(id) {
    return async (dispatch) => {
        dispatch(eliminarCategoria(id));        
        try {
            // Enviar la peticion a la API
            await clienteAxios.delete(`/categoria/${id}`);
            
            //Actualizamos el state de categorias    
            dispatch( eliminarCategoriaOk());
            
            //Alerta de Categoria Eliminada
            Swal.fire(
                'Eliminada',
                `La categoria ${id} ha sido eliminada correctamente`,
                'success'
            )                      
        } catch (error) {
            // Si hay un error, cambiamos el state
            dispatch( eliminarCategoriaError());

            // Validamos si el error se debe a una categoría que tiene libros asociados
            if(error.response.status===405){
                // Alerta
                Swal.fire(
                    'Error',
                    `La categoria ${id} no se puede eliminar ya que existen libros catalogados con la misma`,
                    'error'
                )                    
            } else {
                // Alerta
                Swal.fire({
                    icon: 'Error',
                    title: 'Hubo un error',
                    text: 'Hubo un error, intente nuevamente.'
                })
            }
            console.log(error);
        }
    }   
}

const eliminarCategoria = (id) => ({
    type: OBTENER_CATEGORIA_ELIMINAR,
    payload: id
});

const eliminarCategoriaOk = () => ({
    type: CATEGORIA_ELIMINADA_EXITO, 
});

const eliminarCategoriaError = () => ({
    type: CATEGORIA_ELIMINADA_ERROR,
    payload: true
});

///////////////////////////////////////////////////////
// Colocar la categoria en actualización //////////////
///////////////////////////////////////////////////////
export function getCategoriaActualizar(categoria){
    return (dispatch) => {
        dispatch(getCategoriaActualizarAction(categoria));
    }
}

const getCategoriaActualizarAction = categoria => ({
    type: OBTENER_CATEGORIA_ACTUALIZAR,
    payload: categoria
})


///////////////////////////////////////////////////////
// Actualiza la Categoria en la DB y state ////////////
///////////////////////////////////////////////////////
export function updateCategoriaAction(categoria) {
    return async (dispatch) => {
        dispatch( actualizarCategoria() );
        let respuesta;
        try {            
            // Enviamos la petición a la API
            respuesta = await clienteAxios.put(`/categoria/${categoria.id}`, categoria);

            //Si todo va bien, actualizamos el state de categorias
            if (respuesta.status === 200) {                
                dispatch( actualizarCategoriaOk(categoria));
                
                //Alerta de Categoria Actualizada
                Swal.fire(
                    'Actualizada',
                    `La categoria ${categoria.id} ha sido actualizada correctamente`,
                    'success'
                );
            }                      
        } catch (error) {
            dispatch(actualizarCategoriaError());
            console.log(error);
        }
    }
}

const actualizarCategoria = () => ({
    type: COMENZAR_ACTUALIZACION_CATEGORIA
})

const actualizarCategoriaOk = categoria => ({
    type: CATEGORIA_ACTUALIZADA_EXITO,
    payload: categoria
});

const actualizarCategoriaError = () => ({
    type: CATEGORIA_ACTUALIZADA_ERROR,
    payload: true
});

///////////////////////////////////////////////////////
// Descargar la categoria de la DB ////////////////////
///////////////////////////////////////////////////////
export function getCategoria(categoria){
    return (dispatch) => {
        dispatch(descargarCategoria(categoria));
    }
}

const descargarCategoria = (categoria) => ({
    type: COMENZAR_DESCARGA_CATEGORIA,
    payload: categoria
});