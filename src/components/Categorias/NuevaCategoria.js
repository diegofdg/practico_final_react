import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

// Actions de Redux
import { crearNuevaCategoria } from "../../actions/categoriaActions";

const NuevaCategoria = () => {
    const history = useHistory();

    // State para guardar categoria nueva
    const [categoriaNueva, guardarCategoria] = useState("");

    //Utilizamos useDispatch y crea una funcion
    const dispatch = useDispatch();

    //Accedemos al state del Store
    const cargando = useSelector((state) => state.categorias.loading);
    const error = useSelector((state) => state.categorias.error);
    const categorias = useSelector((state) => state.categorias.categorias);

    //Llamamos el action de categoriaAction
    const agregarCategoria = (categoria) =>
        dispatch(crearNuevaCategoria(categoria));

    // Cuando enviamos el formulario
    const submitNuevaCategoria = (e) => {
        e.preventDefault();
        // Validamos el form
        if (!/[a-z]+$/i.test(categoriaNueva.trim())) {
            Swal.fire({
                title: "¡Verifique!",
                text: "Solo se admiten letras para el nombre de la categoría!",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
            return;
        }

        // Verifico que no haya categorias registradas con ese nombre
        if (categorias.length !== 0) {
            const resultado = categorias.find(
                (cat) => cat.nombre === categoriaNueva
            );
            if (resultado) {
                Swal.fire({
                    title: "¡Verifique!",
                    text: "Ya existe una categoría con ese nombre!",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
                return;
            }
        }
        // Si no hay errores creamos la categoria nueva
        agregarCategoria({
            nombre: categoriaNueva,
        });

        //Redirijimos a Categorias
        reDirigir();
    };

    //Volver a pagina anterior (Categorias)
    const reDirigir = () => history.push("/categoria");

    return (
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nueva Categoría
                        </h2>
                        <form onSubmit={submitNuevaCategoria}>
                            <div className="form-group">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label mt-2 mb-3"
                                >
                                    Ingrese una Nueva categoría:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="categoria"
                                    placeholder="Nombre Categoría"
                                    value={categoriaNueva}
                                    required
                                    onChange={(e) =>
                                        guardarCategoria(
                                            e.target.value.toUpperCase().trim()
                                        )
                                    }
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-4 text-uppercase"
                                >
                                    Agregar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger mt-4 ml-4 text-uppercase"
                                    onClick={() => reDirigir()}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                        {cargando ? <p>Cargando...</p> : null}
                        {error ? (
                            <p className="alert alert-danger p2 mt-4 text-center">
                                {" "}
                                Existe un error{" "}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NuevaCategoria;
