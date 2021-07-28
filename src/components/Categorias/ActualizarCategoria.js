// Importamos las dependencias
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

//Actions de Redux
import { updateCategoriaAction } from "../../actions/categoriaActions";

const ActualizarCategoria = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    //Accedemos al state del Store
    const categorias = useSelector((state) => state.categorias.categorias);

    // State para guardar categoria actualizada
    const [categoria, guardarCategoria] = useState({
        nombre: "",
    });

    // Categoria a Actualizar
    const categoriaActual = useSelector(
        (state) => state.categorias.actualizarCategoria
    );

    //Cargar datos en el State de categoria nueva automaticamente
    useEffect(() => {
        guardarCategoria(categoriaActual);
    }, [categoriaActual]);

    // //Leer los datos del form
    const onChangeFormulario = (e) => {
        guardarCategoria({
            ...categoria,
            [e.target.name]: e.target.value.toUpperCase().trim(),
        });
    };

    const { nombre } = categoria;

    const submitActualizarCategoria = (e) => {
        e.preventDefault();
        // Validamos el form
        if (!/[a-z]+$/i.test(nombre.trim())) {
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
            const resultado = categorias.find((cat) => cat.nombre === nombre);
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

        dispatch(updateCategoriaAction(categoria));

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
                            Actualizar Categoría
                        </h2>
                        <form onSubmit={submitActualizarCategoria}>
                            <div className="form-group">
                                <label className="form-label mt-2 mb-3">
                                    Edite la categoría:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombre"
                                    placeholder="Nombre Categoría"
                                    value={nombre}
                                    required
                                    onChange={onChangeFormulario}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-4 text-uppercase"
                                >
                                    Actualizar
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
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ActualizarCategoria;
