// Importamos las dependencias
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

//Actions de Redux
import { updateLibroAction } from "../../actions/libroActions";

const ActualizarLibro = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    // State para guardar libro actualizado
    const [libro, guardarLibro] = useState({
        nombre: "",
        descripcion: "",
        persona_id: 0,
        categoria_id: 0,
    });

    // Libro a Actualizar
    const libroActual = useSelector((state) => state.libros.actualizarLibro);
    const categoriaActual = useSelector(
        (state) =>
            state.categorias.categorias.find(
                (element) => element.id === libroActual.categoria_id
            ).nombre
    );

    //Cargar datos en el State de libro nuevo automaticamente
    useEffect(() => {
        guardarLibro(libroActual);
    }, [libroActual]);

    // //Leer los datos del form
    const onChangeFormulario = (e) => {
        guardarLibro({
            ...libro,
            [e.target.name]: e.target.value.toUpperCase(),
        });
    };

    const { nombre, descripcion, persona_id } = libro;

    const submitActualizarLibro = (e) => {
        e.preventDefault();
        dispatch(updateLibroAction(libro));

        reDirigir();
    };

    //Volver a pagina anterior (Categorias)
    const reDirigir = () => history.push("/libro");

    return (
        <div className="row justify-content-center">
            <div className="col-md-10">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Actualizar Libro
                        </h2>
                        <form onSubmit={submitActualizarLibro}>
                            <div className="form-group">
                                <label className="form-label mt-2 mb-3">
                                    Edite la descripción:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nombre"
                                    placeholder="Nombre Libro"
                                    value={nombre}
                                    disabled
                                    required                                    
                                />
                                <input
                                    type="text"
                                    className="form-control"
                                    name="descripcion"
                                    placeholder="Descripción"
                                    value={descripcion.toUpperCase()}
                                    required
                                    onChange={onChangeFormulario}
                                />
                                <input
                                    type="text"
                                    className="form-control"
                                    name="categoria_id"
                                    placeholder="categoria_id"
                                    value={categoriaActual}
                                    disabled
                                    required                                    
                                />
                                <input
                                    type="text"
                                    className="form-control"
                                    name="persona_id"
                                    placeholder="persona_id"
                                    value={persona_id === null ? 0 : persona_id}
                                    disabled
                                    required                                    
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
export default ActualizarLibro;
