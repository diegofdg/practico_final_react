// Importamos las dependencias
import React, { Fragment, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";

const FormLibro = () => {
    // State para guardar libro nuevo
    const [libroNuevo, guardarLibro] = useState({
        nombre: "",
        descripcion: "",
        categoria: "",
        persona_id: "",
    });

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

    //Capturar Datos
    const { nombre, descripcion, categoria, persona_id } = libroNuevo;

    const onChangeForm = (e) => {
        guardarLibro({
            [e.target.name]: e.target.value, //Captura y asigna el libro ingresado
        });
    };

    //Enviar el Form
    const onSubmit = (e) => {
        e.preventDefault();        
    };

    return (
        <Fragment>
            <form className="" onSubmit={onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <label
                                htmlFor="validationCustom01"
                                className="form-label mt-2 mb-3"
                            >
                                Ingrese:
                            </label>
                            <input
                                type="text"
                                className="form-control mb-4"
                                name="nombre"
                                placeholder="Nombre libro"
                                value={nombre}
                                onChange={onChangeForm}
                            />
                            <input
                                type="text"
                                className="form-control mb-4"
                                name="descripcion"
                                placeholder="Descripción"
                                value={descripcion}
                                onChange={onChangeForm}
                            />
                            <select
                                className="form-control mb-4"
                                name="categoria"
                            >
                                {categorias.map((item) => (
                                    <option value={item.nombre}>
                                        {item.nombre}
                                    </option>
                                ))}
                                onChange={onChangeForm}
                            </select>
                            <input
                                type="text"
                                className="form-control mb-4"
                                name="prestadoA"
                                placeholder="Prestado a"
                                value={persona_id}
                                onChange={onChangeForm}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onSubmit={onSubmit}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    );
};
export default FormLibro;
