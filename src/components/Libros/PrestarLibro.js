// Importamos las dependencias
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import clienteAxios from "../../config/axios";

//Actions de Redux
import { prestarLibroAction } from "../../actions/libroActions";

const PrestarLibro = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    // State para guardar el libro a prestar
    const [libro, guardarLibro] = useState({
        nombre: "",
        descripcion: "",
        persona_id: 0,
        categoria_id: 0,
    });

    // Libro a prestar
    const libroActual = useSelector((state) => state.libros.actualizarLibro);

    //Cargar datos en el State de libro nuevo automaticamente
    useEffect(() => {
        guardarLibro(libroActual);
    }, [libroActual]);

    //Cargamos las personas a mostrar para el prestamos
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        async function getData() {
            const respuesta = await clienteAxios.get("/persona");
            if (respuesta.status === 200) {
                setPersonas(respuesta.data);
            }
        }
        getData();
    }, []);

    //Cargamos las categorias a mostrar en el libro seleccionado
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        async function getData() {
            const respuesta = await clienteAxios.get("/categoria");
            if (respuesta.status === 200) {
                setCategorias(respuesta.data);
            }
        }
        getData();
    }, []);

    // //Leer los datos del form
    const onChangeFormulario = (e) => {
        guardarLibro({
            ...libro,
            persona_id: e.target.value,
        });
    };

    const { nombre, descripcion, categoria_id } = libro;

    const submitPrestarLibro = (e) => {
        e.preventDefault();        
        dispatch(prestarLibroAction(libro));

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
                            Prestar Libro
                        </h2>
                        <form onSubmit={submitPrestarLibro}>
                            <div className="card-body">
                                <div>
                                    <label className="text-success text-center mb-3 font-weight-bold">
                                        Libro:{" "}
                                    </label>
                                    <label className="text-center m-2 font-weight-bold">
                                        {nombre}
                                    </label>
                                </div>
                                <div>
                                    <label className="text-success text-center mb-3 font-weight-bold">
                                        Descripción:{" "}
                                    </label>
                                    <label className="text-center m-2 font-weight-bold">
                                        {descripcion}
                                    </label>
                                </div>
                                <div>
                                    <label className="text-success text-center mb-3 font-weight-bold">
                                        Categoría:{" "}
                                    </label>
                                    <label className="text-center m-2 font-weight-bold">
                                        {categorias.map((item) =>
                                            item.id === categoria_id
                                                ? item.nombre
                                                : ""
                                        )}
                                    </label>
                                </div>
                                <div>
                                    <label className="text-success text-center mb-3 font-weight-bold">
                                        Elija Persona:{" "}
                                    </label>

                                    <select
                                        className="bg-warning m-3 text-dark font-weight-bold"
                                        name="persona_id"
                                        onChange={onChangeFormulario}
                                    >
                                        <option value="">
                                            --Selecciona Persona--
                                        </option>
                                        {personas.map((item) => (
                                            <option
                                                className="font-weight-bold"
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {" " +
                                                    item.nombre +
                                                    " " +
                                                    item.apellido +
                                                    " "}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-4 text-uppercase"
                                >
                                    Prestar
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
export default PrestarLibro;
