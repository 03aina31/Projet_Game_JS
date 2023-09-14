/*
    Les elements du plateau de jeu se trouvent dans ce fichier(coordonnes des cases, couleurs, rayon des pions, pion, de)
*/ 
import {_get, _refresh, _aleatoire,_cree_canvas} from './fonctions.js'

export const THEMES = {
    divertissement:{
        question:{
            0:"question 0",
            1:"question 1",
            2:"question 2",
            3:"question 3",
            4:"question 4",
            5:"question 5",
        },
        reponse:{
            0:["A0","B","C","D"],
            1:["A1","B","C","D"],
            2:["A2","B","C","D"],
            3:["A3","B","C","D"],
            4:["A4","B","C","D"],
            5:["A5","B","C","D"],
        }
    },
    sport:{
        question:{
            0:"question 0",
            1:"question 1",
            2:"question 2",
            3:"question 3",
            4:"question 4",
            5:"question 5",
        },
        reponse:{
            0:["A0","B","C","D"],
            1:["A1","B","C","D"],
            2:["A2","B","C","D"],
            3:["A3","B","C","D"],
            4:["A4","B","C","D"],
            5:["A5","B","C","D"],
        }
    }
}

export const  COULEURS = ["pas de joueur 0","green","red","blue","rgb(199, 199, 0)"]; //rgb(199, 199, 0) = jaune
export const RAYON_PIONS = 5;
//export let joueur_en_cours = 0;//Le premier joueur qui joue est le joueur de couleur verte càd COULEUR[0]
    let canvas = _get("#canvas"),
        ctx = canvas.getContext('2d');

export class Pion{
    constructor(Case,rayon,couleur){
        this.x = Case.x,
        this.y =  Case.y,
        this.rayon = rayon,
        this.couleur = couleur;
        this.case_courante = Case
    }
    dessiner(){
        ctx.beginPath();
            ctx.arc(this.x,this.y,this.rayon,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fillStyle = this.couleur;
        ctx.fill();
        //alert(this.case_courante.couleur);
    }
    deplacer(Case){
        ctx.fillStyle = this.case_courante.couleur;
        ctx.beginPath();
            ctx.arc(this.x,this.y,RAYON_PIONS + 1,0,Math.PI*2);
        ctx.fill();
            this.x = Case.x;
            this.y = Case.y;
            this.case_courante = Case;
            this.dessiner();
    }
}

export class De{
    static div_de = _get("#div_de"); //div qui represente le de a l'ecran
    constructor(couleur){
        this.couleur = couleur;
        //this.joueur_en_cours = 0;
        div_de.style.backgroundColor = this.couleur;
    }
    alea(){
        let val = _aleatoire(6,1);
        div_de.innerHTML = val;
        //alert("val_de: "+val);
        return val;
    }
}
export class Question{
    constructor(){
        
    }
}