import React, { useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom';

//Componentes
import Persona from './Persona';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { getPersonasAction } from '../../actions/personaActions';

const Personas = () => {

    const dispatch = useDispatch();
    
    useEffect( () => {
        // Consultamos API
        const cargarPersonas = () => dispatch(getPersonasAction());
        cargarPersonas();
        // eslint-disable-next-line
    }, [] );
    
    //Obtener el state
    const personas = useSelector( state =>state.personas.personas );
    const error = useSelector( state =>state.personas.error );
    const cargando = useSelector( state =>state.personas.loading );
    
    return (
        <Fragment>
            
            <div className="col-12 text-center">
                <h2>Listado de Personas 
                    <Link
                        to={'/persona/nuevaPersona'}
                        className="btn btn-success ml-5" 
                    >Agregar &#43;</Link> 
                </h2>     
            </div>

            { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
            { cargando ? <p className="alert alert-success p2 mt-4 text-center">Cargando Personas...</p> : null}
            
                <table className="table table-striped text-center">
                    <thead className="bg-primary table-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Alias</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { personas.length === 0 
                            ? 
                                <tr>
                                    <td colSpan="6">
                                        No hay Personas para mostrar.
                                    </td>
                                </tr>                            
                            : personas.map( persona => (
                                <Persona 
                                    key = { persona.id}
                                    persona = {persona} 
                                />  
                                )
                            )
                        }
                    </tbody>
                </table>      
        </Fragment>
        
    );
}

export default Personas;