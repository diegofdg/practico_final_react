// Importamos las dependencias
import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

//Componentes
import Categoria from "./Categoria";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getCategoriasAction } from "../../actions/categoriaActions";

const Categorias = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Consultamos API para traer todas las categorías
        const cargarCategorias = () => dispatch(getCategoriasAction());
        cargarCategorias();
        // eslint-disable-next-line
    }, []);

    //Obtener el state
    const categorias = useSelector((state) => state.categorias.categorias);
    const error = useSelector((state) => state.categorias.error);
    const cargando = useSelector((state) => state.categorias.loading);

    return (
        <Fragment>
            <div className="col-12 text-center">
                <h2>
                    Lista de Categorías
                    <Link
                        to={"/categoria/nuevaCategoria"}
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
                    Cargando Categorías...
                </p>
            ) : null}

            <table className="table table-striped text-center">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.length === 0 ? (
                        <tr>
                            <td colSpan="3">No hay Categorias para mostrar.</td>
                        </tr>
                    ) : (
                        categorias.map((categoria) => (
                            <Categoria
                                key={categoria.id}
                                categoria={categoria}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
    );
};

export default Categorias;
