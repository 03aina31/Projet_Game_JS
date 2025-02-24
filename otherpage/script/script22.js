/**
 * La logique du jeu se trouve ici
 */

import {De,COULEURS} from './modules/de.js'
import {_get, _getAll, _aleatoire, _attend} from './modules/fonctions.js'
import {THEMES} from './donnees/questions.js'
import { coordXY as pos } from './donnees/coordonnesXY.js'

//sous-prog
import {THEMES} from '../script/donnees/questions.js';
//import { theme_courant } from './modules/elements.js';
import { coordXY as pos } from './donnees/coordonnesXY.js';
var timer=document.getElementById('timer');

function verifier_theme(pion){
    if(pion.Case >=0 && pion.Case <=6) pion.theme_courant = "Géographie"
    if(pion.Case > 6 && pion.Case <= 12) pion.theme_courant = "Histoire"
}
function efface(k){
    for(let i=0;i<4;i++){
      if(document.getElementById('bt'+i).textContent!=THEMES.divertissement.reponse[k][0]){
        $('#bt'+i).hide();
      }
    }
}

function verifie(bt,k){
    if(document.getElementById(bt).textContent==THEMES.divertissement.reponse[k][0]){
        console.log("Bonne reponse");
        //timer.innerHTML = "Bonne réponse! Vous avancez de + cases";
    }
    else console.log("Mauvaise reponse");
}

function decremente(k){
    //k est l'id de la question présent en affichage
    var i=6;
    var t=0;
    //lancement du chronomètre
    let to = setInterval(()=>{

        $('#bt0').click(function(){
            
            verifie('bt0',k); //vérifie si la réponse choisi soit vraie
            t=parseInt(i+1); //stockage de la dérnière valeur du chrono
            efface(k); //efface tout les reponse qui ne sont pas vraie
        }); 
        $('#bt1').click(function(){
            
            verifie('bt1',k); 
            t=parseInt(i+1);
            efface(k);
        }); 
        $('#bt2').click(function(){
            
            verifie('bt2',k);
            t=parseInt(i+1);
            efface(k);
        }); 
        $('#bt3').click(function(){
            verifie('bt3',k);
            t=parseInt(i+1);
            efface(k);
        });

        // Si le joueur a choisit sa reponse:
        if(t!=0){
            console.log(t);
            i++; //maintient de l'arrêt du chrono sur l'affichage
            clearInterval(to);
        }

        timer.innerHTML = i--;
        if(i == -1) { 
            t=0;
            timer.innerHTML = "Perdu";
            clearInterval(to); //fin de la chronomètre
            efface(k);
        }
    },1000);   
    return t;    
} 

const _chrono = ()=>{
    affichager_question();
    return new Promise(resolve =>{
        var id_qst = Math.floor((Math.random())*6); //choix du question à poser
        $('#qst').text(THEMES.divertissement.question[id_qst]); //affichage de la question
        timer.innerHTML = "Réfléchissez sur votre reponse";
        setTimeout(()=>{
            resolve(id_qst);
        },5000);
    })
}
//fin sous-prog


class Pion2{
    
    constructor(indicePion=1, nbrCase=0){
        this.nbrCase = nbrCase;
        this.indicePion = indicePion;
        this.caseActu =0;
    }
    move(indicePion,nbrCase,memeCase=0) {
        var ox=0;
        var posActuXY =[
            [0,0],
            [20,630],
            [60,630],
            [100,630],
            [140,630]];
        
        
        this.caseActu+=nbrCase;
        switch (memeCase){
            case 1: {
                ox = pos[this.caseActu].x+30;
                break;
            }
            case 2:{
                ox = pos[this.caseActu].x-30
                break;
            }
            case 3: pos[this.caseActu].x+30;
                break;
            default:
                ox = pos[this.caseActu].x;
        }
        posActuXY[indicePion][0]=(this.caseActu===0)?posActuXY[indicePion][0]:(ox);
        posActuXY[indicePion][1]=(this.caseActu===0)?posActuXY[indicePion][1]:(pos[this.caseActu].y);
        $("#pion"+indicePion).attr("style","top:"+parseInt(posActuXY[indicePion][1])+"px");
        $("#pion"+indicePion).css("left",parseInt(posActuXY[indicePion][0])+"px");

        return this.caseActu;
    }
}

const p1 = new Pion2(1,0);
const p2 = new Pion2(2,0);
const p3 = new Pion2(3,0);
const p4 = new Pion2(4,0);
const de = new De("gray");

var dist =40;
var joueur_en_cours=0;
//var caseActu=0;
var caseActu1 =0;
var caseActu2 =0;
var caseActu3 =0;
var caseActu4 =0;
var tabIndiDeja = [];
var theme_courant = THEMES.divertissement;
let div_question = _get("#qst"),
    div_choix1 = _get("#bt1"),
    div_choix2 = _get("#bt2"),
    div_choix3 = _get("#bt3"),
    div_choix4 = _get("#bt0");
    
//Pion2
/*
function deplacement(indicePion, nbrCase){
    caseActu+=nbrCase;
    posActuXY[indicePion][0]=(caseActu===0)?posActuXY[indicePion][0]:(pos[caseActu].x);
    posActuXY[indicePion][1]=(caseActu===0)?posActuXY[indicePion][1]:(pos[caseActu].y);
    console.log("case P1: "+caseActu);
    $("#pion"+indicePion).attr("style","top:"+parseInt(posActuXY[indicePion][1])+"px");
    $("#pion"+indicePion).css("left",parseInt(posActuXY[indicePion][0])+"px");
}*/


var indTab=0;
let nbrCase=0;
function _poser_question(){   
    console.log("mandee");//******************************************** */
    
    //aleatoire question
    let indice = _aleatoire(5,0);
    while(indice in tabIndiDeja)
        indice = _aleatoire(5,0);
    tabIndiDeja[indTab++] = indice;
        
    if(theme_courant == THEMES.divertissement){
        console.log("theme_courant = divertissement");
        _attend(2500);
        div_question.innerHTML = THEMES.divertissement.question[indice];
        div_choix1.innerHTML = THEMES.divertissement.reponse[indice][0];
        div_choix2.innerHTML = THEMES.divertissement.reponse[indice][1];
        div_choix3.innerHTML = THEMES.divertissement.reponse[indice][2];
        div_choix4.innerHTML = THEMES.divertissement.reponse[indice][3]; 
    }
        let choix_selectionne;
        let liste_choix = _getAll(".choix");
    
    //#################################################################
        for(let i = 0; i < liste_choix.length; i++)
        liste_choix[i].addEventListener("click", function(){
            choix_selectionne = this.innerHTML;
            if(choix_selectionne === THEMES.divertissement.reponse[indice][0]){
               nbrCase=1;
                switch (joueur_en_cours){
                    case 1:{
                        //p1.move(joueur_en_cours,nbrCase);
                        p1.caseActu+=nbrCase;
                        caseActu1 = p1.move(joueur_en_cours,p1.caseActu);
                        caseActu2 = p2.move(2,0);
                        caseActu3 = p3.move(3,0);
                        caseActu4 = p4.move(4,0);

                        if (parseInt(caseActu1) === parseInt(caseActu3) || parseInt(caseActu2) || parseInt(caseActu4)){
                            //console.log("case actu1: "+caseActu1);
                            //console.log("case actu2: "+caseActu2);
                            p4.move(1,0,4);
                        }
                        joueur_en_cours ++;
                        if(joueur_en_cours>4) joueur_en_cours = 1;
                        break;
                    }
                    case 2:{
                        //p2.move(joueur_en_cours,nbrCase);
                        p2.caseActu+=nbrCase;
                        caseActu1 = p1.move(1,0);
                        caseActu2 = p2.move(joueur_en_cours,p2.caseActu);
                        caseActu3 = p3.move(3,0);
                        caseActu4 = p4.move(4,0);

                        if (parseInt(caseActu2) === parseInt(caseActu4) || parseInt(caseActu1) || parseInt(caseActu3)){
                            //console.log("case actu1: "+caseActu1);
                            //console.log("case actu2: "+caseActu2);
                            p2.move(2,0,3);
                        }
                        joueur_en_cours ++;
                        if(joueur_en_cours>4) joueur_en_cours = 1;
                        break;
                    }
                    case 3:{
                        //p3.move(joueur_en_cours,nbrCase);
                        p3.caseActu+=nbrCase;
                        caseActu1 = p1.move(1,0);
                        caseActu2 = p2.move(2,0);
                        caseActu3 = p3.move(joueur_en_cours,p3.caseActu);
                        caseActu4 = p4.move(4,0);

                        if (parseInt(caseActu3) === parseInt(caseActu2) || parseInt(caseActu1) || parseInt(caseActu4)){
                            //console.log("case actu1: "+caseActu1);
                            //console.log("case actu2: "+caseActu2);
                            p3.move(3,0,2);
                        }
                        joueur_en_cours ++;
                        if(joueur_en_cours>4) joueur_en_cours = 1;
                        break;
                    }
                    case 4:{
                        p4.caseActu+=nbrCase;
                        caseActu1 = p1.move(1,0);
                        caseActu2 = p2.move(2,0);
                        caseActu3 = p3.move(3,0);
                        caseActu4 = p4.move(joueur_en_cours,p4.caseActu);

                        if (parseInt(caseActu4) === parseInt(caseActu2) || parseInt(caseActu1) || parseInt(caseActu3)){
                            //console.log("case actu1: "+caseActu1);
                            //console.log("case actu2: "+caseActu2);
                            p4.move(0,0,1);
                        }
                        joueur_en_cours ++;
                        if(joueur_en_cours>4) joueur_en_cours = 1;
                        break;
                    }
                    default: console.log("no move");
                }
            //_poser_question();
            return  console.log("vrai");
            }
            else{
                return console.log("faux");
                //_poser_question();
            }
        })
        
    }

function _qui_commence(){  
    let compteur_de_cliques = 0;
    let val_de_depart = [0,0,0,0,0]; //val des dés de chaque joueur pour choisir qui commence en premier
    div_de.style.backgroundColor = COULEURS[1];
    let clique_de = div_de.addEventListener("click", function(event){     
        compteur_de_cliques++;
        (compteur_de_cliques==4)?(alert("Go")):("")//***********************test */
        val_de_depart[compteur_de_cliques] = de.alea();
        //div_de.style.backgroundColor = COULEURS[compteur_de_cliques+1];
        
        if(compteur_de_cliques >= 4){
            div_de.removeEventListener("click",clique_de);   //tsy mande
            let max = Math.max(val_de_depart[1], val_de_depart[2], val_de_depart[3], val_de_depart[4])
            switch(max){
                case val_de_depart[1]: {
                    setTimeout(function(){
                        div_de.innerHTML = "Joueur: "+ 1+" commence";
                    },1000)
                    joueur_en_cours = 1;
                    break;
                }
                case val_de_depart[2]: {
                    setTimeout(function(){
                        div_de.innerHTML = "Joueur: "+ 2+" commence";
                    },1000)
                    joueur_en_cours =  2;
                    break;
                };
                case val_de_depart[3]: {
                    setTimeout(function(){
                        div_de.innerHTML = "Joueur: "+ 3+" commence";
                    },1000)
                    joueur_en_cours =  3;
                    break;
                };
                case val_de_depart[4]: {
                    setTimeout(function(){
                        div_de.innerHTML = "Joueur: "+ 4+" commence";
                    },1000)
                    joueur_en_cours =  4;
                    break;
                };
            } 
            _poser_question();
        }
        
    })
}
let k=0;
let l=0;

//************MAIN */
$(document).ready(function(){
    window.addEventListener('mousemove',function(event){
        $("#forX").html(event.offsetX);  
        $("#forY").html(event.offsetY);      
    })
//position du début
    //deplacement(1,1);
    
    /*
    $("#jouerr").click(()=>{
        caseActu1 = p1.move(1,++k)
        if (parseInt(caseActu1) === parseInt(caseActu2)){
            //console.log("case actu1: "+caseActu1);
            //console.log("case actu2: "+caseActu2);
            p1.move(1,k,1)
        }
            
        
    });
    $("#jouerr2").click(()=>{
        caseActu2= p2.move(2,++l);
        if (parseInt(caseActu1) === parseInt(caseActu2)){
            //console.log("case actu1: "+caseActu1);
            //console.log("case actu2: "+caseActu2);
            p2.move(2,l,1);
        }
    });
    //deplacement(2,0);
    //deplacement(3,0);
    //deplacement(4,0);
*/
    _qui_commence();
    
    /*setInterval(()=>{
        if (k<=38)
        deplacement(1,2,pos[k].x,pos[k++].y);
        },1000);
    */

})