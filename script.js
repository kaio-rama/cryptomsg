const textArea = document.querySelector("#textArea");
const deTextArea = document.querySelector("#decoder");


// NUMERO RANDOM DE 1 al 127
function randomize(){
    let num = Math.random(127)
    return Math.floor(num * 127);
}

// ESCRIBIR MENSAJE --> ENCRIPTAR MENSAJE
textArea.addEventListener("keypress", function(event) {
    if(event.key === 'Enter'){
        let mensaje = textArea.value;
        printMes(encryptMes(mensaje));
    }
})

function encryptMes(msj){
    let seed = randomize();
    let cryptomsj = [];

    for(let i=0; i < msj.length; i++ ){
        cryptomsj.push(msj.charCodeAt(i) * seed)
    }
    
    const KEYMSJ = {key: seed, msj: cryptomsj}
    return KEYMSJ
}


// IMPRIMIR MENSAJE EN PANTALLA
function printMes(msj){
    let key = document.querySelector("#cryptkey")
    let text = document.querySelector("#cryptmsj")
    key.textContent = "key: " + msj.key;
    text.textContent= msj.msj;
}



// DESIFRAR MENSAJE --> DESENCRIPTAR MENSAJE
deTextArea.addEventListener("keypress", function(event){
    if(event.key === 'Enter'){
        let mensaje = deTextArea.value;
        let key = document.querySelector("input").value;
        printMes(desenCrypt(mensaje, key));
    }
})

function desenCrypt(msj, key){
    let translate = [];
    console.log(msj.length)

    for(let i = 0; i < msj.length; i++){
        translate.push(msj[i])
    }
    
    let numeros = unirNumeros(translate);
    let mensaje = [];
    for( let i = 0; i < numeros.length; i++){
    mensaje.push(Math.trunc(numeros[i] / key))
    }

    return {key: key, msj: String.fromCharCode(...mensaje)}

}

function unirNumeros(array) {
    let resultado = [];
    let numeroActual = '';

    for (let i = 0; i < array.length; i++) {
        if (array[i] === ',') {
            resultado.push(numeroActual);
            numeroActual = '';
        } else {
            numeroActual += array[i];
        }
    }

    if (numeroActual !== '') {
        resultado.push(numeroActual);
    }

    return resultado;
}

// COPIAR TEXTO

document.getElementById("copyText").addEventListener("click", copyText)

function copyText(){
    let text = document.getElementById("cryptmsj").textContent
    navigator.clipboard.writeText(text)
}