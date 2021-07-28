// Importamos las dependencias
import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

//Redux
import { useDispatch } from "react-redux";
import {
    getCategoria,
    deleteCategoriaAction,
    getCategoriaActualizar,
} from "../../actions/categoriaActions";

const Categoria = ({ categoria }) => {
    const { id, nombre } = categoria;
    const dispatch = useDispatch();
    const history = useHistory(); // Habilita history para redirección

    //Confirmar eliminar Categoria
    const confirmarEliminarCategoria = (id) => {
        // Preguntar a usuario si esta seguro
        Swal.fire({
            title: `¿Está seguro de eliminar la categoría ${id}?`,
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarla!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {
                //Pasa al Action
                dispatch(deleteCategoriaAction(id));
            }
        });
    };

    //Funcion para redirigir
    const redireccionarActualizacion = (categoria) => {
        dispatch(getCategoriaActualizar(categoria));
        history.push(`/categoria/${categoria.id}`);
    };

    //Funcion para redirigir
    const mostrarLibros=(categoria)=>{        
        dispatch(getCategoria(categoria));
        history.push(`/categoriaLibros/${categoria.id}`);
    }

    return (
        <tr>
            <td>{id}</td>
            <td>{nombre}</td>
            <td>
                <button
                    type="button"
                    className="btn btn-warning mr-2"
                    onClick={() => redireccionarActualizacion(categoria)}
                >
                    Actualizar
                </button>
                <button
                    type="button"
                    className="btn btn-danger mr-2"
                    onClick={() => confirmarEliminarCategoria(id)}
                >
                    Eliminar
                </button>
                <button 
                    type="button" 
                    className="btn btn-primary mr-2"
                    onClick={ () => mostrarLibros(categoria) } 
                >   
                    Libros
                </button>
            </td>
        </tr>
    );
};

export default Categoria;
