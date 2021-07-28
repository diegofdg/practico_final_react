import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

// Actions de Redux
import { crearNuevaPersona } from '../../actions/personaActions';

const NuevaPersona = () => {
    
    const history = useHistory();
    
    // State para guardar Persona nueva
    const [nombre, guardarNombre] = useState('');
    const [apellido, guardarApellido] = useState('');
    const [email, guardarEmail] = useState('');
    const [alias, guardarAlias] = useState('');
    
    //Utilizamos useDispatch y crea una funcion
    const dispatch = useDispatch(); 

    //Accedemos al state del Store
    const cargando = useSelector( state => state.personas.loading );
    const error = useSelector( state => state.personas.error);
    const personas = useSelector(state => state.personas.personas);            

    //Llamamos el action de categoriaAction
    const agregarPersona = persona => dispatch( crearNuevaPersona(persona) );
    
    //Volver a pagina anterior (Categorias)
    const reDirigir = () => history.push('/persona');

    // Cuando enviamos el formulario
    const submitNuevaPersona = e => {
        e.preventDefault();

        // Verifico que no haya personas registradas con ese mail 
        if(personas.length!==0)  {
            const resultado = personas.find( per => per.email === email );
            if(resultado){
                Swal.fire({
                    title: '¡Verifique!',
                    text: "Ya existe una persona registrada con ese email!",
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                  })
         
                return;
            }
         
        }
        // Si no hay errores

        // Creamos la Persona nueva
        agregarPersona({
            nombre,
            apellido,
            email,
            alias
        });
        
        //Redirigimos a Persona
        reDirigir();

    }
   
    return(
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold"
                        >Agregar Nueva Persona</h2>

                        <form 
                            onSubmit={submitNuevaPersona}
                        >
                            <div className="form-group">    
                                <label htmlFor="validationCustom01" className="form-label mt-2 mb-3"
                                >Ingrese una Nueva Persona:</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="nombre"
                                    placeholder="Nombre de Persona"
                                    value={nombre}
                                    required
                                    onChange={e => guardarNombre(e.target.value.toUpperCase())}
                                />
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="apellido"
                                    placeholder="Apellido de Persona"
                                    value={apellido}
                                    required
                                    onChange={e => guardarApellido(e.target.value.toUpperCase())}
                                />
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    required
                                    onChange={e => guardarEmail(e.target.value.toUpperCase())}
                                />
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="alias"
                                    placeholder="Alias de Persona"
                                    value={alias}
                                    required
                                    onChange={e => guardarAlias(e.target.value.toUpperCase())}
                                />
                                <button 
                                    type="submit" 
                                    className="btn btn-primary mt-4 text-uppercase"
                                >Agregar</button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger mt-4 ml-4 text-uppercase"
                                    onClick={ () => reDirigir() }                                                                        
                                >Cancelar</button>

                            </div>
                        </form>
                        { cargando ? <p>Cargando...</p> : null}
                        { error ? <p className="alert alert-danger p2 mt-4 text-center"> Existe un error </p> : null}
                    </div>     
                </div>
            </div>
        </div>               
    );
}
export default NuevaPersona;