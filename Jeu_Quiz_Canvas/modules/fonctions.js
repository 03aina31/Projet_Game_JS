/*
    Toutes les fonctions créées sont dans ce fichiers
*/

export function _get(elem){
    return document.querySelector(elem);
}
export function _getAll(elem){
    return document.querySelectorAll(elem)
}
export function _rafraichie(){
    location.reload();
}
export function _attend(duree){
    const t = Date.now();
    while(Date.now() - t < duree){

    }
}
export function _aleatoire(max,min){
    //genere un nombre entier aleatoire entre max et min (max et min sont inclus) 
    return Math.floor(Math.random() * (max-min+1)) + min;
}

export function _cree_canvas(){   
    let canvas = _get("#canvas"),
    ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth - 355;
    canvas.height = window.innerHeight -122;
    //canvas.width = "1000";
    //canvas.height = "563";
    canvas.style.border = "red 3px solid";

    let width = canvas.width,
    height = canvas.height;
    //Initialisations des axes
    ctx.lineWidth = 1;
    //Axe des x
    ctx.beginPath();
        ctx.moveTo(1,1);
        ctx.lineTo(width,1);
    ctx.stroke();
    //Axe des y
    ctx.beginPath()
        ctx.moveTo(1,1);
        ctx.lineTo(1,height);
        ctx.stroke();
    ctx.closePath();

    //Graduations
    ctx.lineWidth = 0.3;
    ctx.font = "2px";
    //x
    for(let i=0;i<=width;i+=159){
        ctx.beginPath();
        ctx.moveTo(i,0);
        ctx.lineTo(i,height);
        ctx.fillText(i,i,12);
        ctx.stroke();
    }
    //y
    for(let i=0;i<=height;i+=150){
        ctx.beginPath();
        ctx.moveTo(0,i);
        ctx.lineTo(width,i);
        ctx.fillText(i,5,i);
        ctx.stroke();
    }
}