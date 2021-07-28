// Importamos las dependencias
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

// Actions de Redux
import { crearNuevoLibro } from "../../actions/libroActions";

const NuevoLibro = () => {
    const history = useHistory();

    // State para guardar libro nuevo
    const [nombreNuevo, guardarNombre] = useState("");
    const [descripcionNueva, guardarDescripcion] = useState("");
    //const [persona_id_nueva, guardarPersona_id] = useState('0');
    const [categoria_id_nueva, guardarCategoria_id] = useState(0);

    //Utilizamos useDispatch y crea una funcion
    const dispatch = useDispatch();

    //Accedemos al state del Store
    const cargando = useSelector((state) => state.libros.loading);
    const error = useSelector((state) => state.libros.error);
    const categorias = useSelector((state) => state.categorias.categorias);
    const libros = useSelector((state) => state.libros.libros);
    //const personas = useSelector(state => state.personas.personas);

    //Llamamos el action de categoriaAction
    const agregarLibro = (libro) => dispatch(crearNuevoLibro(libro));

    // Cuando enviamos el formulario
    const submitNuevoLibro = (e) => {
        e.preventDefault();

        // Verifico que no haya libros registrados con ese nombre
        if (libros.length !== 0) {
            const resultado = libros.find((lib) => lib.nombre === nombreNuevo);
            if (resultado) {
                Swal.fire({
                    title: "¡Verifique!",
                    text: "Ya existe un libro con ese nombre!",
                    icon: "error",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
                return;
            }
        }

        // Creamos Libro
        agregarLibro({
            nombre: nombreNuevo,
            descripcion: descripcionNueva,
            persona_id: "0",
            categoria_id: categoria_id_nueva,
        });

        //Redirigimos
        reDirigir();
    };

    //Volver a pagina anterior (Libros)
    const reDirigir = () => history.push("/libro");

    return (
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Libro
                        </h2>

                        <form onSubmit={submitNuevoLibro}>
                            <div className="form-group">
                                <label
                                    htmlFor="validationCustom01"
                                    className="form-label mt-2 mb-3"
                                >
                                    Ingrese un Nuevo Libro:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={nombreNuevo}
                                    required
                                    onChange={(e) =>
                                        guardarNombre(
                                            e.target.value.toUpperCase()
                                        )
                                    }
                                />
                                <input
                                    type="text"
                                    className="form-control"
                                    name="descripcion"
                                    placeholder="Descripcion"
                                    value={descripcionNueva}                                    
                                    onChange={(e) =>
                                        guardarDescripcion(
                                            e.target.value.toUpperCase()
                                        )
                                    }
                                />

                                <select
                                    className="form-control"
                                    name="categoria_id"
                                    required
                                    onChange={(e) =>
                                        guardarCategoria_id(e.target.value)
                                    }
                                >
                                    <option value="">
                                        --Selecciona Categoría--
                                    </option>
                                    {categorias.map((categoria) => (
                                        <option
                                            key={categoria.id}
                                            value={categoria.id}
                                        >
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
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
export default NuevoLibro;
