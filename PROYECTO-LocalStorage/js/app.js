//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];



//Event Listeners
evenListeners();

function evenListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);


    //cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        console.log(tweets);
        listadoTweets();
    });
}




//Funciones

function agregarTweet(event) {
    event.preventDefault();


    //TextArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //Validacion
    if (tweet === '') {
        mostrarAlertaError('No puede ir vacio');

        return; //evita que se ejecuta mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        text: tweet
    }
    //añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    //una vez agregado pintarlos en el HTML
    listadoTweets();

}

function mostrarAlertaError(errorMsg) {
    const mensaje = document.createElement('p');
    mensaje.textContent = errorMsg;
    mensaje.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensaje);

    setTimeout(() => {
        mensaje.remove();
    }, 1500);
}

function listadoTweets() {

    limpiarHTML();
    if (tweets.length > 0) {
        tweets.forEach(tuit => {

            //agregar boton eliminar
            const btn = document.createElement('a');
            btn.classList.add('borrar-tweet');
            btn.textContent = 'X';

            //añadir funcion de eliminar
            btn.onclick = () => {
                borrarTweet(tuit.id);
            }

            //crear el HTML
            const li = document.createElement('li');

            //añadir el texto
            li.innerText = tuit.text;

            //Asignar boton
            li.appendChild(btn);

            //insertarlo en el HTML
            listaTweets.appendChild(li);

            //Reiniciar el formulario
            formulario.reset();
        })
    }

    sincronizarStorage();
}

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//Limpiar HTML
function limpiarHTML() {
    while (listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

function borrarTweet(id) {
    tweets = tweets.filter(tweet =>
        tweet.id !== id
    );
    listadoTweets();
    console.log('Borrando', tweets);
}