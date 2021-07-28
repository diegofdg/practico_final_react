import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

//Redux
import { useDispatch } from 'react-redux';
import { deletePersonaAction, getPersonaActualizar,getPersona } from '../../actions/personaActions';

const Persona = ({persona}) => {
    const { id, nombre,apellido,email,alias } = persona;
    const dispatch = useDispatch();
    const history = useHistory();  // Habilita history para redirección

    //Confirmar eliminar Persona
    const confirmarEliminarPersona = id => {
        // Preguntar a usuario si esta seguro
        Swal.fire({
            title: `¿Está seguro de eliminar la Persona ${id}?`,
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarla!',
            cancelButtonText: 'Cancelar'
            
        }).then((result) => {
            if(result.value){
                //Pasa al Action
                dispatch( deletePersonaAction(id) );
            }
        })
        
    }

    //Funcion para redirigir
    const redireccionarActualizacion = persona => {
        dispatch(getPersonaActualizar(persona));
        history.push(`/persona/${persona.id}`);
    }
    //Funcion para redirigir
    const mostrarLibros=(persona)=>{
        dispatch(getPersona(persona));
        history.push(`/personaLibros/${persona.id}`);
    }

    return (
        <tr>
            <td>{id}</td>
            <td>{nombre}</td>
            <td>{apellido}</td>
            <td>{email}</td>
            <td>{alias}</td>
            <td>
                <button
                    type='button'
                    className="btn btn-warning mr-2"
                    onClick={ () => redireccionarActualizacion(persona) }   
                >Actualizar</button>
                <button 
                    type="button" 
                    className="btn btn-danger mr-2"
                    onClick={ () => confirmarEliminarPersona(id) } 
                >Eliminar</button>
                 <button 
                    type="button" 
                    className="btn btn-primary mr-2"
                    onClick={ () => mostrarLibros(persona) } 
                >Libros</button>
            </td>
        </tr>      
    );
}

export default Persona;