// Importamos las dependencias
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';

// Componentes
import Home from './components/Home/Home';
import Personas from './components/Personas/Personas';
import NuevaPersona from './components/Personas/NuevaPersona';
import ActualizarPersona from './components/Personas/ActualizarPersona';
import PersonaLibros from './components/Personas/PersonaLibros';

import Categorias from './components/Categorias/Categorias';
import NuevaCategoria from './components/Categorias/NuevaCategoria';
import ActualizarCategoria from './components/Categorias/ActualizarCategoria';
import CategoriaLibros from './components/Categorias/CategoriaLibros';

import Libros from './components/Libros/Libros';
import NuevoLibro from './components/Libros/NuevoLibro';
import ActualizarLibro from './components/Libros/ActualizarLibro';
import PrestarLibro from './components/Libros/PrestarLibro';

function App() {

  return (
    <Router>
        <Header/>
        <div className='container mt-3'>
          <Switch>
          <Route exact path="/" component={ Home } />
            
            {/* Rutas Libros */}
            <Route exact path="/libro" component={ Libros } />
            
            {/* Rutas Categorias */}
            <Route exact path="/categoria" component={ Categorias } />
            <Route exact path="/categoria/nuevaCategoria" component={ NuevaCategoria } />
            <Route exact path="/categoria/:id" component={ ActualizarCategoria } />
            <Route exact path="/categoriaLibros/:id" component={ CategoriaLibros } />
            
            {/* Rutas Personas */}
            <Route exact path="/persona" component={ Personas } />            
            <Route exact path="/persona/nuevaPersona" component={ NuevaPersona } />
            <Route exact path="/persona/:id" component={ ActualizarPersona } />
            <Route exact path="/personaLibros/:id" component={ PersonaLibros } />

            {/* Rutas Libros */}
            <Route exact path="/libro" component={ Libros } />            
            <Route exact path="/libro/nuevoLibro" component={ NuevoLibro } />
            <Route exact path="/libro/:id" component={ ActualizarLibro } />
            <Route exact path="/libro/prestar/:id" component={ PrestarLibro } />        
                
          </Switch>
        </div>
    </Router>
  );
}

export default App;