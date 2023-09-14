/**
 * La logique du jeu se trouve ici
 */

import {Pion, De, COULEURS, RAYON_PIONS as R_PIONS} from './modules/elements.js';
import {_get, _getAll, _cree_canvas, _aleatoire} from './modules/fonctions.js'
import { COORD_MAP as Map } from './donnees/coordonnes.js';
import {THEMES} from './donnees/questions.js'
//import Questions from './donnees/questions.json' assert {type:'json'}
//import Map from './donnees/coordonnes.json' assert {type:'json'}

//------------------Coordonnees de la souris
let coordonnees = _get("#coordonnees"),
    forX = _get("#forX"),
    forY = _get("#forY");

canvas.addEventListener("mousemove", function(e){
    forX.innerHTML = "x: "+ e.offsetX;
    forY.innerHTML = "y: "+ e.offsetY;
})

//---------------------------------------------------------Debut du jeu-------------------------------------------------------


let vert = new Pion(Map[0], R_PIONS, COULEURS[1]),
    rouge = new Pion(Map[16], R_PIONS, COULEURS[2]),
    bleu = new Pion(Map[32], R_PIONS, COULEURS[3]),
    jaune = new Pion(Map[48], R_PIONS, COULEURS[4]),
    
    de = new De("gray"),
    num_case_courante = [0,0,0,0,0]; // ce tableau stocke le numero de case où chaque pion est situee
                                    // il contient 5 valeurs pour éviter d'utiliser l'indice 0 car le numéro de joueur commence par 1
let joueur_en_cours = 0;
let theme_courant = THEMES.divertissement;

let div_question = _get("#question"),
    div_choix1 = _get("#choix1"),
    div_choix2 = _get("#choix2"),
    div_choix3 = _get("#choix3"),
    div_choix4 = _get("#choix4");


//Cette fonction lance le jeu une fois que le numero du joueur à jouer en premier est connu:
function _qui_commence(){  
    let compteur_de_cliques = 0;
    let val_de_depart = [0,0,0,0,0]; //val des dés de chaque joueur pour choisir qui commence en premier
    div_de.style.backgroundColor = COULEURS[1]
    let clique_de = div_de.addEventListener("click", function(e){ 
        compteur_de_cliques++;
        val_de_depart[compteur_de_cliques] = de.alea();
        div_de.style.backgroundColor = COULEURS[compteur_de_cliques+1];
        
        if(compteur_de_cliques >= 4){
            //div_de.removeEventListener("click",clique_de);   //tsy mande
            let max = Math.max(val_de_depart[1], val_de_depart[2], val_de_depart[3], val_de_depart[4])
            switch(max){
                case val_de_depart[1]: {
                    setTimeout(function(){
                        div_de.innerHTML = "Joueur: "+ 1+" commence";
                    },1000);
                    joueur_en_cours = 1;
                    _jeu();
                    return;
                }
                case val_de_depart[2]: {
                    setTimeout(function(){
                        div_de.innerHTML = "Joueur: "+ 2+" commence";
                    },1000);
                    joueur_en_cours =  2;
                    _jeu();
                    return;
                };
                case val_de_depart[3]: {
                    setTimeout(function(){
                        div_de.innerHTML = "Joueur: "+ 3+" commence";
                    },1000);
                    joueur_en_cours =  3;
                    _jeu();
                    return;
                };
                case val_de_depart[4]: {
                    setTimeout(function(){
                        div_de.innerHTML = "Joueur: "+ 4+" commence";
                    },1000);
                    joueur_en_cours =  4;
                    _jeu();
                    return;
                };
            }   
        }
    })
}

//Cette fonction prend une question au hasard dans elements.js:
function _poser_question(){   
    let indice = _aleatoire(5,0);
    if(theme_courant == THEMES.divertissement){
        console.log("theme_courant = divertissement");
        setTimeout(function(){
            div_question.innerHTML = THEMES.divertissement.question[indice];
            div_choix1.innerHTML = THEMES.divertissement.reponse[indice][0];
            div_choix2.innerHTML = THEMES.divertissement.reponse[indice][1];
            div_choix3.innerHTML = THEMES.divertissement.reponse[indice][2];
            div_choix4.innerHTML = THEMES.divertissement.reponse[indice][3];
        },2500);
        
    }
    let choix_selectionne;
    let liste_choix = _getAll(".choix");

    for(let i = 0; i < liste_choix.length; i++){
    liste_choix[i].addEventListener("click", function(){
        choix_selectionne = this.innerHTML;
        if(choix_selectionne == THEMES.divertissement.reponse[indice][0]){
            console.log("vrai");
            switch (joueur_en_cours){
                case 1:{
                    let case_suivante = parseInt(vert.case_courante.id)+ 1 
                    vert.deplacer(Map[case_suivante]);
                    joueur_en_cours ++;
                    if(joueur_en_cours>4) joueur_en_cours = 1;
                    break;
                }
                case 2:{
                    let case_suivante = parseInt(rouge.case_courante.id)+ 1 
                    rouge.deplacer(Map[case_suivante]);
                    joueur_en_cours ++;
                    if(joueur_en_cours>4) joueur_en_cours = 1;
                    break;
                }
                case 3:{
                    let case_suivante = parseInt(bleu.case_courante.id)+ 1 
                    bleu.deplacer(Map[case_suivante]);
                    joueur_en_cours ++;
                    if(joueur_en_cours>4) joueur_en_cours = 1;
                    break;
                }
                case 4:{
                    let case_suivante = parseInt(jaune.case_courante.id)+ 1 
                    jaune.deplacer(Map[case_suivante]);
                    joueur_en_cours ++;
                    if(joueur_en_cours>4) joueur_en_cours = 1;
                    break;
                }
            }
        _poser_question();
        }
        else{
            console.log("faux");
            _poser_question();
        }
    })
}
}
    //-------Fonction principale:
function _jeu(){
    console.log("JEUU!!")
    _poser_question();  
    
}


window.addEventListener("load",function(e){
    _cree_canvas();

    vert.dessiner();
    rouge.dessiner();
    bleu.dessiner();
    jaune.dessiner();
    
    _qui_commence(); //Cette fonction lance le jeu une fois que le numero du joueur à jouer en premier est connu

    /*let i = 0;
    div_de.addEventListener('click', function(){
            vert.deplacer(Map[vert.case_courante.id + 1]);
            rouge.deplacer(Map[rouge.case_courante.id + 1]);
            bleu.deplacer(Map[bleu.case_courante.id + 1]);
            jaune.deplacer(Map[jaune.case_courante.id + 1]);
    })*/
    
})