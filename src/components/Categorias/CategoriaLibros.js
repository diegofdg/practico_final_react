import React, { useEffect} from 'react';
//Componentes
import Libro from '../Libros/Libro';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriaLibrosAction } from '../../actions/libroActions';

const CategoriaLibros = () => {
    const dispatch = useDispatch();    
    
    const libros = useSelector( state =>state.libros.libros );
    const categoria= useSelector( state =>state.categorias.categoria );    
    const cargando = useSelector( state =>state.libros.loading );    
    
    useEffect( () => {
        // Consultamos API
        const cargarLibros = () => dispatch( getCategoriaLibrosAction(categoria) );        
        cargarLibros();                
        // eslint-disable-next-line
    }, [categoria] );    
    
    return (
        <>            
            <div className="col-12 text-center">
                <h2>Libros con la categoria  {categoria!==null ? categoria.nombre :"" }</h2>
                     
            </div>
            
            { cargando ? <p className="alert alert-success p2 mt-4 text-center">Cargando Libros...</p> : null}
            
                <table className="table table-striped text-center">
                    <thead className="bg-primary table-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Persona Id</th>
                            <th scope="col">Categoría Id</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { libros.length === 0
                            ?   
                                <tr>
                                    <td colSpan="6">
                                        No hay Libros para mostrar.
                                    </td>
                                </tr>
                                                            
                            :   
                                libros.map( libro => (
                                    libro.categoria_id === categoria.id
                                    ?
                                        <Libro 
                                            key = { libro.id}
                                            libro = {libro}                                             
                                        />
                                    :
                                        <tr>
                                            <td colSpan="6">
                                                La categoría seleccionada no tiene Libros para mostrar.
                                            </td>
                                        </tr>  
                                ))
                        }    
                    </tbody>
                </table>      
        </>
        
    );
}

export default CategoriaLibros;