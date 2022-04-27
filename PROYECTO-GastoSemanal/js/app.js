//variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

//Eventos
eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto)
}



//Clases

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];

        console.log(this.gastos);
    }
}


class UI {
    insertarPresupuesto(cantidad) {
        //Extrayendo el valor
        const {
            presupuesto,
            restante
        } = cantidad;

        //Agregarlos al html
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        //crear el div

        const divAlerta = document.createElement('div');
        divAlerta.classList.add('text-center', 'alert');

        if (tipo === 'error') {
            divAlerta.classList.add('alert-danger');
        } else {
            divAlerta.classList.add('alert-success');
        }

        //Mensaje de erorr
        divAlerta.textContent = mensaje;


        //insertar en html
        document.querySelector('.primario').insertBefore(divAlerta, formulario);

        //quitar alerta
        setTimeout(() => {
            divAlerta.remove();
        }, 3000);
    }
}


//Instanciar
const ui = new UI();
let presupuesto;


//Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cúal es tú presupuesto?');

    // console.log(Number(presupuestoUsuario));

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
        console.log('efecto');
    }

    //Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto)

}

//Añadir gastos
function agregarGasto(e) {
    e.preventDefault();

    //leer datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //validar
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Cantidad no válida', 'error');
        return;
    }


    //generar objeto del gasto
    const gasto = {
        nombre,
        cantidad,
        id: Date.now()
    }

    //Añade un nuevo gasto
    presupuesto.nuevoGasto(gasto)

    //Mensaje de ok
    ui.imprimirAlerta('Gasto agregado correctamente')

    //Reinicia el formulario
    formulario.reset();
}