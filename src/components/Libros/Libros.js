// Importamos las dependencias
import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

//Componentes
import Libro from "./Libro";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getLibrosAction } from "../../actions/libroActions";

const Libros = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Consultamos API
        const cargarLibros = () => dispatch(getLibrosAction());
        cargarLibros();
        // eslint-disable-next-line
    }, []);

    //Obtener el state
    const libros = useSelector((state) => state.libros.libros);
    const error = useSelector((state) => state.libros.error);
    const cargando = useSelector((state) => state.libros.loading);

    return (
        <Fragment>
            <div className="col-12 text-center">
                <h2>
                    Listado de Libros
                    <Link
                        to={"/libro/nuevoLibro"}
                        className="btn btn-success ml-5"
                    >
                        Agregar &#43;
                    </Link>
                </h2>
            </div>

            {error ? (
                <p className="alert alert-danger p2 mt-4 text-center">
                    Hubo un error
                </p>
            ) : null}
            {cargando ? (
                <p className="alert alert-success p2 mt-4 text-center">
                    Cargando Libros...
                </p>
            ) : null}

            <table className="table table-striped text-center">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Persona Id</th>
                        <th scope="col">Categoria Id</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.length === 0 ? (
                        <tr>
                            <td colSpan="6">No hay Libros para mostrar.</td>
                        </tr>
                    ) : (
                        libros.map((libro) => (
                            <Libro key={libro.id} libro={libro} />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Libros;