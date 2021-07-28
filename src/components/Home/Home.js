// Importamos las dependencias
import { React, Fragment, useEffect, useState } from "react";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getCategoriasAction } from "../../actions/categoriaActions";
import { getLibrosAction } from "../../actions/libroActions";
import { getPersonasAction } from "../../actions/personaActions";

const Home = () => {
    const dispatch = useDispatch();

    // Cargamos libros disponibles para prestar en el HOME
    const [cantLibros, setCantLibros] = useState([]);
    const [librosPrestados, setLibrosPrestados] = useState([]);
    const [cantPersonas, setCantPersonas] = useState([]);
    const [cantCategorias, setCantCategorias] = useState([]);

    //Obtener los states
    const categorias = useSelector((state) => state.categorias.categorias);
    const libros = useSelector((state) => state.libros.libros);
    const personas = useSelector((state) => state.personas.personas);

    // Inicializamos el store con todas las categorías
    useEffect(() => {
        const cargarCategorias = () => dispatch(getCategoriasAction());
        cargarCategorias();
        // eslint-disable-next-line
    }, []);

    // Inicializamos el store con todos los libros
    useEffect(() => {
        const cargarLibros = () => dispatch(getLibrosAction());
        cargarLibros();
        // eslint-disable-next-line
    }, []);

    // Inicializamos el store con todas las personas
    useEffect(() => {
        const cargarPersonas = () => dispatch(getPersonasAction());
        cargarPersonas();
        // eslint-disable-next-line
    }, []);

    // Contamos la cantidad de categorías registradas
    useEffect(() => {
        setCantCategorias(categorias.length);
    }, [categorias]);

    // Contamos la cantidad de personas registradas
    useEffect(() => {
        setCantPersonas(personas.length);
    }, [personas]);

    //  Contamos la cantidad de libros registrados y de libros prestados
    useEffect(() => {
        if (libros.length === 0) {
            setLibrosPrestados(0);
            setCantLibros(0);
        } else {
            let listadoLibrosPrestados = [];
            libros.forEach((libro) => {
                if (libro.persona_id === null) {
                    return;
                } else {
                    listadoLibrosPrestados.push(libro);
                }
            });
            setLibrosPrestados(listadoLibrosPrestados);
            setCantLibros(libros.length);
        }
    }, [libros]);

    return (
        <Fragment>
            <div className="container text-center mt-4">
                <div className="container-fluid">
                    {/* <!-- Small boxes (Stat box) --> */}
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            {/* <!-- small box --> */}
                            <div className="small-box bg-info text-dark">
                                <div className="inner">
                                    <h3 className="inner2">{cantLibros}</h3>
                                    <p>
                                        <br />
                                        Libros
                                    </p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-bag"></i>
                                </div>
                            </div>
                        </div>
                        {/* <!-- ./col --> */}
                        <div className="col-lg-3 col-6">
                            {/* <!-- small box --> */}
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <h3 className="inner2">
                                        {librosPrestados === 0
                                            ? 0
                                            : librosPrestados.length}
                                    </h3>
                                    <p>Libros Prestados</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-stats-bars"></i>
                                </div>
                            </div>
                        </div>
                        {/* <!-- ./col --> */}
                        <div className="col-lg-3 col-6">
                            {/* <!-- small box --> */}
                            <div className="small-box bg-warning">
                                <div className="inner">
                                    <h3 className="inner2">{cantPersonas}</h3>
                                    <p>Personas Registradas</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-person-add"></i>
                                </div>
                            </div>
                        </div>
                        {/* <!-- ./col --> */}
                        <div className="col-lg-3 col-6">
                            {/* <!-- small box --> */}
                            <div className="small-box bg-danger">
                                <div className="inner">
                                    <h3 className="inner2">{cantCategorias}</h3>

                                    <p>Categorías Literarias</p>
                                </div>
                                <div className="icon">
                                    <i className="ion ion-pie-graph"></i>
                                </div>
                            </div>
                        </div>
                        {/* <!-- ./col --> */}
                    </div>
                    {/* <!-- /.row -->  */}
                </div>
            </div>
        </Fragment>
    );
};

export default Home;
