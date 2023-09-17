/*
    Les elements du plateau de jeu se trouvent dans ce fichier(coordonnes des cases, couleurs, rayon des pions, pion, de)
*/ 
import {_get, _refresh, _aleatoire,_cree_canvas} from './fonctions.js'

export const COORD_MAP = {
    P1: {x:131, y:131, couleur:"white"},
    P2: {x:470, y:130, couleur:"white"},
    P3: {x:470, y:469, couleur:"white"},
    P4: {x:131, y:470, couleur:"white"},
    0: {x:75, y:264, couleur: "rgb(0, 255, 30)"},
    1: {x:113, y:264, couleur:"white"},
    2: {x:150, y:264, couleur:"white"},
    3: {x:187, y:264, couleur:"white"},
    4: {x:225, y:264, couleur:"white"},
    5: {x:262, y:225, couleur:"white"},
    6: {x:262, y:187, couleur:"white"},
    7: {x:262, y:148, couleur:"white"},
    8: {x:262, y:116, couleur:"white"},
    9: {x:262, y:75, couleur:"white"},
    10: {x:262, y:38, couleur:"white"}
}

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
            0:["A0","B0","C0","D0"],
            1:["A1","B1","C1","D1"],
            2:["A2","B2","C2","D2"],
            3:["A3","B3","C3","D3"],
            4:["A4","B4","C4","D4"],
            5:["A5","B5","C5","D5"],
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
export const RAYON_PIONS = 15;
//export let joueur_en_cours = 0;//Le premier joueur qui joue est le joueur de couleur verte càd COULEUR[0]
    let canvas = _get("#canvas");
    //let ctx = canvas.getContext('2d');

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
        return val;
    }
}