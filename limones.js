let canvas=document.getElementById("areaJuego")
let ctx = canvas.getContext("2d")

const ALTURA_SUELO= 20;
const ALTURA_PERSONAJE =60;
const ANCHO_PERSONAJE = 40;
const ANCHO_LIMON= 20;
const ALTURA_LIMON=20;
let personajeX = canvas.width/2;
let personajeY =  canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE)
let limonX = canvas.width/2;
let limonY = 5;
let puntaje = 0;
let vidas = 3;
let velocidadCaida = 200;
let intervalo

function dibujarSuelo(){
    ctx.fillStyle= ("red")
    ctx.fillRect(0, canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO)
}

function dibujarPersonaje(){
    ctx.fillStyle= ("yellow")
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE)
}

function iniciar(){
    intervalo=setInterval(bajarLimon, velocidadCaida)
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}


function moverIzquierda(){
    personajeX = personajeX - 10;
    refrescarPantalla();
    detectarAtrapado();
   
}

function moverDerecha(){
    personajeX = personajeX + 10;
    refrescarPantalla();
    detectarAtrapado();
    
}

function refrescarPantalla(){
    limpiarPersonaje();
    dibujarPersonaje();
    dibujarSuelo();
    dibujarLimon();
    
}
function limpiarPersonaje(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
}

function dibujarLimon(){
    ctx.fillStyle= ("green")
    ctx.fillRect(limonX,limonY, ANCHO_LIMON, ALTURA_LIMON);
    
}

function bajarLimon (){
    limonY = limonY + 10
    dibujarLimon();
    refrescarPantalla();
    detectarPiso();
    detectarAtrapado();
}
function detectarAtrapado(){
    if(limonX+ANCHO_LIMON > personajeX && 
        limonX < personajeX+ANCHO_PERSONAJE &&
        limonY+ALTURA_LIMON > personajeY &&
        limonY <personajeY+ALTURA_PERSONAJE){
        aparecerLimon();
        puntaje = puntaje + 1
        mostrarEnSpan("txtPuntaje", puntaje)
        if(puntaje == 3 ){
        clearInterval(intervalo)
        velocidadCaida = 100;
        intervalo = setInterval(bajarLimon, velocidadCaida)

    }else if(puntaje == 6){
        clearInterval(intervalo)
        velocidadCaida = 50;
        intervalo = setInterval(bajarLimon, velocidadCaida)
    }else if(puntaje == 10){
        clearInterval(intervalo);
        alert("TIENES LOS LIMONES, AHORA TE FALTA SAL Y TEQUILA")
        
    return ;
    }
    
    }
    
}

function aparecerLimon(){
    limonX=generarAleatorio(0,canvas.width,canvas.height-ANCHO_LIMON);
    limonY = 0;
    refrescarPantalla();
    
}
function detectarPiso(){
    if (limonY + ALTURA_LIMON == canvas.height-ALTURA_SUELO ){
        aparecerLimon();
        vidas = vidas  - 1
        mostrarEnSpan("txtVida", vidas)
        
    }
    if (vidas == 0){
        alert("GAME OVER")
        clearInterval(intervalo)
    }
    
      
}

function reiniciar(){
    clearInterval(intervalo)
    velocidadCaida = 200
    vidas = 3;
    puntaje = 0;
    
    let reiniciarVidas=document.getElementById("txtVida")
    reiniciarVidas.innerText= vidas;

    let reiniciarPuntaje = document.getElementById("txtPuntaje")
    reiniciarPuntaje.innerText = puntaje

    iniciar();
}

