import React, { useEffect} from 'react';
//Componentes
import Libro from '../Libros/Libro';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriasAction } from '../../actions/categoriaActions';
import { getPersonaLibrosAction } from '../../actions/libroActions';

const PersonaLibros = () => {
    const dispatch = useDispatch();    
    
    const libros = useSelector( state =>state.libros.libros );
    const persona= useSelector( state =>state.personas.persona );    
    const cargando = useSelector( state =>state.libros.loading );
    const categorias = useSelector( state =>state.categorias.categorias );
    
    useEffect( () => {
        // Consultamos API
        const cargarLibros = () => dispatch( getPersonaLibrosAction(persona) );        
        cargarLibros();        
        const cargarCategorias = () => dispatch ( getCategoriasAction() );            
        cargarCategorias();    
        // eslint-disable-next-line
    }, [persona] );
    
    
    return (
        <>            
            <div className="col-12 text-center">
                <h2>Libros Prestados a  {persona!==null ? persona.alias :"" }</h2>
                     
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
                                    libro.persona_id === persona.id
                                    ?
                                        <Libro 
                                            key = { libro.id}
                                            libro = {libro} 
                                            categorias = {categorias}
                                        />
                                    :
                                        <tr>
                                            <td colSpan="6">
                                                No tiene Libros prestados para mostrar.
                                            </td>
                                        </tr>  
                                ))
                        }    
                    </tbody>
                </table>      
        </>
        
    );
}

export default PersonaLibros;