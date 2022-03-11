//Variables
const marca = document.querySelector('#marca');
const anio = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultado = document.querySelector('#resultado');
const anioMax = new Date().getFullYear();
const anioMin = anioMax - 10;


//Generar objeto con la busqueda
const datosBusqueda = {
    marca: '',
    anio: '',
    precioMinimo: '',
    precioMaximo: '',
    puertas: '',
    transmicion: '',
    color: '',

}


console.table(autos)

//Eventos

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos); //Muestra los autos al cargar

    llenarSelect(); //Llena las opciones año en el select
});

//Event Listener para los select de busqueda
marca.addEventListener('change', (event) => {
    datosBusqueda.marca = event.target.value;

    filtrarAuto();
});

anio.addEventListener('change', (event) => {
    datosBusqueda.anio = event.target.value;

    filtrarAuto();
});

minimo.addEventListener('change', (event) => {
    datosBusqueda.precioMinimo = event.target.value;

    filtrarAuto();
});

maximo.addEventListener('change', (event) => {
    datosBusqueda.precioMaximo = event.target.value;

    filtrarAuto();
});

puertas.addEventListener('change', (event) => {
    datosBusqueda.puertas = event.target.value;

    filtrarAuto();
});

transmision.addEventListener('change', (event) => {
    datosBusqueda.transmicion = event.target.value;

    filtrarAuto();
});

color.addEventListener('change', (event) => {
    datosBusqueda.color = event.target.value;

    filtrarAuto();
    console.log(datosBusqueda);
});




//Funciones
function mostrarAutos(autos) {

    limpiarHTML(); //Elimina el HTML previo

    autos.forEach(auto => {
        const {
            marca,
            modelo,
            year,
            puertas,
            transmision,
            precio,
            color
        } = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `${marca} ${modelo} del año ${year} - ${puertas} Puertas - ${transmision} -${precio} -${color}`;

        resultado.appendChild(autoHTML);
    });
}

//Limpiar HTML
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function llenarSelect() {

    for (let i = anioMax; i >= anioMin; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;

        opcion.textContent = i;

        anio.appendChild(opcion); //Agrega las opciones de año a select
    }

}

function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca)
        .filter(filtrarYear)
        .filter(filtrarMinimo)
        .filter(filtrarMaximo)
        .filter(filtrarPuertas)
        .filter(filtrarTransmision)
        .filter(filtrarColor)


    // console.log(resultado);
    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {

    limpiarHTML();
    const alert = document.createElement('div');
    alert.classList.add('alerta', 'error');
    alert.textContent = 'No hay resultados';
    resultado.appendChild(alert);
}

function filtrarMarca(auto) {
    if (datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca
    } else {
        return auto;
    }
}

function filtrarYear(auto) {
    if (datosBusqueda.anio) {
        return auto.year === parseInt(datosBusqueda.anio)
    } else {
        return auto;
    }
}

function filtrarMinimo(auto) {

    if (datosBusqueda.precioMinimo) {
        return auto.precio >= datosBusqueda.precioMinimo
    } else {
        return auto;
    }
}

function filtrarMaximo(auto) {
    if (datosBusqueda.precioMaximo) {
        return auto.precio <= datosBusqueda.precioMaximo
    } else {
        return auto;
    }
}

function filtrarPuertas(auto) {
    if (datosBusqueda.puertas) {
        return auto.puertas === parseInt(datosBusqueda.puertas)
    } else {
        return auto;
    }
}

function filtrarTransmision(auto) {
    if (datosBusqueda.transmicion) {
        return auto.transmision === datosBusqueda.transmicion
    } else {
        return auto;
    }
}

function filtrarColor(auto) {
    if (datosBusqueda.color) {
        return auto.color === datosBusqueda.color
    } else {
        return auto;
    }
}