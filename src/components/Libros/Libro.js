// Importamos las dependencias
import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

//Redux
import { useDispatch } from "react-redux";
import {
    deleteLibroAction,
    getLibroActualizar,
    devolverLibroAction,
} from "../../actions/libroActions";

const Libro = ({ libro }) => {
    const { id, nombre, descripcion, persona_id, categoria_id } = libro;

    const dispatch = useDispatch();
    const history = useHistory(); // Habilita history para redirección

    //Confirmar eliminar Libro
    const confirmarEliminarLibro = (id) => {
        // Preguntar a usuario si esta seguro
        Swal.fire({
            title: `¿Está seguro de eliminar el Libro ${id}?`,
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminarlo!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {
                //Pasa al Action
                dispatch(deleteLibroAction(id));
            }
        });
    };

    //Funcion para redirigir actualizacion
    const redireccionarActualizacion = (libro) => {
        dispatch(getLibroActualizar(libro));
        history.push(`/libro/${libro.id}`);
    };
    //Funcion para redirigir prestar
    const redireccionarPrestar = (libro) => {
        dispatch(getLibroActualizar(libro));
        history.push(`/libro/prestar/${libro.id}`);
    };
    //Funcion para redirigir devolver
    const redireccionarDevolver = async (libro) => {
        Swal.fire({
            title: `¿Está seguro de devolver el Libro ${libro.id}?`,
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, devolverlo!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {
                const libroquesedevuelve = {
                    ...libro,
                    persona_id: null,
                };
                dispatch(devolverLibroAction(libroquesedevuelve));                
            }
        });
    };

    return (
        <tr>
            <td>{id}</td>
            <td>{nombre}</td>
            <td>{descripcion}</td>
            <td>{persona_id ? persona_id : "--"}</td>
            <td>{categoria_id}</td>
            <td>
                {persona_id ? (
                    <button
                        type="button"
                        className="btn btn-info mr-2"
                        onClick={() => redireccionarDevolver(libro)}
                    >
                        Devolver
                    </button>
                ) : (
                    <button
                        type="button"
                        className="btn btn-primary mr-2"
                        onClick={() => redireccionarPrestar(libro)}
                    >
                        Prestar
                    </button>
                )}
                <button
                    type="button"
                    className="btn btn-warning mr-2"
                    onClick={() => redireccionarActualizacion(libro)}
                >
                    Actualizar
                </button>

                <button
                    type="button"
                    className="btn btn-danger mr-2"
                    onClick={() => confirmarEliminarLibro(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
};

export default Libro;