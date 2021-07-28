import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

//Actions de Redux
import {updatePersonaAction} from '../../actions/personaActions';

const ActualizarPersona = () => {
    
    const history = useHistory();
    const dispatch = useDispatch();

    // State para guardar categoria actualizada
    const [persona, guardarPersona] = useState({
        nombre: '',
        apellido:'',
        email:'',
        alias:''
    });
    
    // Categoria a Actualizar
    const personaActual = useSelector(state => state.personas.actualizarPersona);
    
    // Leer el store
    //const personas = useSelector(state => state.personas.personas);            
    
    
    //Cargar datos en el State de persona automaticamente
    useEffect( () => {
        guardarPersona(personaActual);
    }, [personaActual]);
 
    // //Leer los datos del form
    const onChangeFormulario = e => {
        guardarPersona({
            ...persona,
            [e.target.name] : e.target.value.toUpperCase()
        });
    }

    const { nombre,apellido,email,alias } = persona;
    

    const submitActualizarPersona = e => {
        e.preventDefault();
        dispatch(updatePersonaAction(persona));
        
        reDirigir();
    }


    //Volver a pagina anterior (Categorias)
    const reDirigir = () => history.push('/persona');

    return(
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold"
                        >Actualizar Persona</h2>

                        <form onSubmit={ submitActualizarPersona }>
                                                    
                            <div className="form-group">    
                                <label className="form-label mt-2 mb-3"
                                >Edite la categoría:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="nombre"
                                    placeholder="Nombre de Persona"
                                    value={nombre}
                                    required
                                    onChange={ onChangeFormulario }
                                />
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="apellido"
                                    placeholder="Apellido de Persona"
                                    value={apellido}
                                    required
                                    onChange={ onChangeFormulario }
                                />
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="email"
                                    placeholder="Email"                                    
                                    value={email}
                                    disabled
                                    onChange={ onChangeFormulario }
                                />
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="alias"
                                    placeholder="Alias de Persona"
                                    value={alias}
                                    required
                                    onChange={ onChangeFormulario }
                                />
                                <button 
                                    type="submit" 
                                    className="btn btn-primary mt-4 text-uppercase"
                                >Actualizar</button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger mt-4 ml-4 text-uppercase"
                                    onClick={ ()=> reDirigir() }
                                >Cancelar</button>       
                            </div>
                        </form>
                    
                    </div>     
                </div>
            </div>
        </div>               
    );
}
export default ActualizarPersona;