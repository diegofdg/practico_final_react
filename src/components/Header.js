// Importamos las dependencias
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <div className="container-fluid">
                <p className="navbar-brand marca">Biblioteca</p>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse enlaces"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav">
                        <Link className="nav-link" to={"/"}>
                            Home
                        </Link>
                        <Link className="nav-link" to={"/libro"}>
                            Libros
                        </Link>
                        <Link className="nav-link" to={"/categoria"}>
                            Categorías
                        </Link>
                        <Link className="nav-link" to={"/persona"}>
                            Personas
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
