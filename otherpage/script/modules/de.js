
import { _get, _aleatoire } from "./fonctions.js";

export const  COULEURS = ["pas de joueur 0","green","red","blue","rgb(199, 199, 0)"]; //rgb(199, 199, 0) = jaune
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