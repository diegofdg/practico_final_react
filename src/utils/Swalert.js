import Swal from 'sweetalert2';

const Swalert={}

Swalert.mjeError=(title='Error.',text='Ocurrió un Error.',tipo='error')=>{
    Swal.fire({
        icon: tipo,
        title,
        text
        });        
};


Swalert.mjeOk=(title='Correcto',text='La Operación se realizó Exitosamente.',tipo='success')=>{
    Swal.fire(
        title,
        text,
        tipo
    );
};


export default Swalert;