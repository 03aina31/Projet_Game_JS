import {Pion2} from './elements.js';
import { _get, _attend } from './fonctions.js';
import {THEMES} from '../script/donnees/questions.js';

var theme_courant= "geographie";

function verifier_theme_quest(pion,id_qsts){
    if(pion.caseActu >=0 && pion.caseActu <=6){
        return THEMES.Geographie.question[id_qsts];
    }; 
    if(pion.caseActu > 6 && pion.caseActu <= 12) {
        //a reviser
        return THEMES.histoire.question[id_qsts];
    }
    if(pion.caseActu >12 && pion.caseActu <=18) {
        return THEMES.sciences.question[id_qsts];
    }
    if(pion.caseActu >18 && pion.caseActu <=24) {
        return THEMES.litterature.question[id_qsts];
    }
    if(pion.caseActu >24 && pion.caseActu <=30) {
        return THEMES.sports.question[id_qsts];
    }
    if(pion.caseActu >30) {
        return THEMES.divertissement.question[id_qsts];
    }
}
//verification theme
function verifier_theme(pion,n=0,j=0){
    //console.log("case actuel: "+pion.caseActu);
    if(pion.caseActu >=0 && pion.caseActu <=6){
        theme_courant= "geographie";
        //qst_courant= THEMES.Geographie.question[id_qsts];
        return THEMES.Geographie.reponse[n][j];
    }; 
    if(pion.caseActu > 6 && pion.caseActu <= 12) {
        theme_courant= "Histoire";
        //a reviser
        //qst_courant= THEMES.sciences.question[id_qsts];
        return THEMES.histoire.reponse[n][j];
    }
    if(pion.caseActu >12 && pion.caseActu <=18) {
        theme_courant= "sciences";
        //qst_courant= THEMES.sciences.question[id_qsts];
        return THEMES.sciences.reponse[n][j];
    }
    if(pion.caseActu >18 && pion.caseActu <=24) {
        theme_courant= "divertissement";
        //qst_courant= THEMES.divertissement.question[id_qsts];
        return THEMES.litterature.reponse[n][j];
    }
    if(pion.caseActu >24 && pion.caseActu <=30) {
        theme_courant= "litterature";
        //qst_courant= THEMES.litterature.question[id_qsts];
        return THEMES.sports.reponse[n][j];
    }
    if(pion.caseActu >30) {
        theme_courant= "divertissement";
        //qst_courant= THEMES.divertissement.question[id_qsts];
        return THEMES.divertissement.reponse[n][j];
    }
}

var partT = false;
const p1 = new Pion2(1,0);
const p2 = new Pion2(2,0);
const p3 = new Pion2(3,0);
const p4 = new Pion2(4,0);
var toutPion =[0,p1,p2,p3,p4];
var toutJoueurs = [0,sessionStorage.getItem('joueur1'),sessionStorage.getItem('joueur2'),sessionStorage.getItem('joueur3'),sessionStorage.getItem('joueur4')];
let j=1;
let joueur=1;
var nbrPlayer = sessionStorage.getItem('nbrPlayer');
$("#valid").hide()
function _jouer(debut){
    $("#pion1").hide();
    $("#pion2").hide();
    $("#pion3").hide();
    $("#pion4").hide();
    for (let i=1;i<=nbrPlayer;i++)
        $("#pion"+i).show();

    $('#passerJouer').click(()=>{
        $('#timer').css('color','black');
        $('#timer').css('font-weight','bold');
        $('#timer').css('font-size','2em');
    
        $("#nuage, #timer").slideDown();
        //debut reponse
        $('#passerJouer').fadeOut();
        switch (joueur){
            case 1: j=1;
                break;
            case 2: j=2;
                break;
            case 3: j=3;
                break;
            case 4: j=4;
                break;
        }
        joueur+=1;
        (joueur>parseInt(nbrPlayer))?(joueur=1):(joueur=joueur);
        _chrono()
        .then((n) =>{
    decremente(n); //déclenchement du chronomètre
    
    //Affichage des réponses
    for(let i=0;i<4;i++){
        if(i==0){
            var j=Math.floor((Math.random())*4); //choix de la 1ère reponse à afficher
            var lj=[];  //tableau qui stocke les reponses déja affichées
            lj[i]=j;  //sauvegarde de la 1ère reponse comme 1ère element de ce tableau
            $('#bt'+i).text(verifier_theme(toutPion[joueur],n,j)); //affichage de la 1ère reponse 
        }
        else{
            do{
                j=Math.floor((Math.random())*4); //choix de la prochaine reponse à afficher
            }while(different(lj,j)); //vérifie si la reponse choisit est déja present en affichage
            lj[i]=j;//sauvegarde de la reponse choisit comme element de ce tableau
            $('#bt'+i).text(verifier_theme(toutPion[joueur],n,j)); //affichage des autres reponses
        }
    }
  })
  for(let i=0;i<4;i++){
    $('#bt'+i).show();
  }
    })
}

var timer=document.getElementById('timer');

function efface(k){
    for(let i=0;i<4;i++){
      if(document.getElementById('bt'+i).textContent!=verifier_theme(toutPion[joueur],k,0)){
        $('#bt'+i).hide();
      }
    }
}

function verifie(bt,k){
    let rep;
    if(document.getElementById(bt).textContent==verifier_theme(toutPion[joueur],k,0)){
        //console.log("Bonne reponse");
        rep = true;
        return rep;
        //$("#mess").text("Bonne réponse!");
        //  mess.innerHTML = "Bonne réponse"
    }
    else {
        //console.log("Mauvaise reponse");
        rep = false;
        return rep;
    };
}

function decremente(k){
    //k est l'id de la question présent en affichage
    var i=6;
    var t=0;
    let reponse;
    //lancement du chronomètre
    let to = setInterval(()=>{
        
        $('#bt0').click(function(){
            
            reponse = verifie('bt0',k); //vérifie si la réponse choisi soit vraie
            t=parseInt(i+1); //stockage de la dérnière valeur du chrono
            efface(k); //efface tout les reponse qui ne sont pas vraie
        }); 
        $('#bt1').click(function(){
            
            reponse = verifie('bt1',k); 
            t=parseInt(i+1);
            efface(k);
        }); 
        $('#bt2').click(function(){
            
            reponse = verifie('bt2',k);
            t=parseInt(i+1);
            efface(k);
        }); 
        $('#bt3').click(function(){
            reponse = verifie('bt3',k);
            t=parseInt(i+1);
            efface(k);
        });

        // Si le joueur a choisit sa reponse:
        if(t!=0){
            console.log(t);
            i++; //maintient de l'arrêt du chrono sur l'affichage
            clearInterval(to);
            if(reponse){
                $('#timer').css('color','green');
                $('#timer').css('font-weight','bold');
                $('#timer').css('font-size','2.5em');
            
                timer.innerHTML = "Bonne réponse";
            
                _attend(500);
                $("#nuage, #timer").slideUp();
                
                switch (j){
                    case 1: {
                        p1.deplacer(t);
                        if (p1.caseActu === p2.caseActu || p3.caseActu || p4.caseActu){
                            p1.deplacer(0,1);
                        }
                        if (p1.caseActu>=37){
                            $("#mess").html(toutJoueurs[joueur]+" a gagné la partie");
                            $("#nuage, #timer, #passerJouer").hide();
                            partT= true;
                        }   
                        break;}
                    case 2: {
                        p2.deplacer(t);
                        if (p2.caseActu === p1.caseActu || p3.caseActu || p4.caseActu){
                            p2.deplacer(0,2);
                        }
                        if (p2.caseActu>=37)
                                {$("#mess").html(toutJoueurs[joueur]+" a gagné la partie");
                                $("#nuage, #timer, #passerJouer").hide();
                                partT=true;}
                        break;}
                    case 3: {
                        p3.deplacer(t);
                        if (p3.caseActu === p2.caseActu || p1.caseActu || p4.caseActu){
                            p3.deplacer(0,3);
                        }
                        if (p3.caseActu>=37){
                                $("#mess").html(toutJoueurs[joueur]+" a gagné la partie");
                                $("#nuage, #timer, #passerJouer").hide();
                                partT=true;}
                        break;}
                    case 4: {p4.deplacer(t);
                        if (p4.caseActu === p2.caseActu || p3.caseActu || p1.caseActu){
                            p4.deplacer(0,4);
                        }
                        if (p4.caseActu>=37){
                                $("#mess").html(toutJoueurs[joueur]+" a gagné la partie");
                                $("#nuage, #timer, #passerJouer").hide();
                                partT=true;}
                        break;}
                }
                _attend(1000);
                //$("#nuage, #timer").fadeIn();
                $('#passerJouer').html("Continuer en tant que "+toutJoueurs[joueur]);
                $('#passerJouer').fadeIn();
                if(partT==true){
                    $("#nuage, #timer, #passerJouer").hide();
                    $("#valid").show()
                };
                
            }                
            else{
                $('#timer').css('color','red');
                $('#timer').css('font-weight','bold');
                $('#timer').css('font-size','3em');
                timer.innerHTML = "Mauvaise réponse";
                $('#passerJouer').html("Continuer en tant que "+toutJoueurs[joueur]);
                $('#passerJouer').fadeIn();
                if(partT==true){
                    $("#nuage, #timer, #passerJouer").hide();
                    $("#valid").show()
                };
                
            } 
            return;
        }

        timer.innerHTML = i--;
        if(i == -1) { 
            t=0;
            $('#timer').css('color','red');
            $('#timer').css('font-size','2em');
            $('#timer').css('font-weight','bold');
            timer.innerHTML = "Perdu";
            clearInterval(to); //fin de la chronomètre
            efface(k);
            $('#passerJouer').html("Continuer en tant que "+toutJoueurs[joueur]);
            $('#passerJouer').fadeIn();
            if(partT==true){
                $("#nuage, #timer, #passerJouer").hide();
                $("#valid").show()
            };
            
        }
    },1000);   
    return t;    
} 
const _chrono = ()=>{
    affichager_question();
    return new Promise(resolve =>{
        var id_qst = Math.floor((Math.random())*15); //choix du question à poser
        //verifier_theme(toutPion[joueur],id_qst);
        $('#qst').text(verifier_theme_quest(toutPion[joueur],id_qst)); //affichage de la question
        timer.innerHTML = "Réfléchissez à votre reponse";
        setTimeout(()=>{
            resolve(id_qst);
        },5000);
    })
}

///*********MAIN */

$('#passerJouer').html(toutJoueurs[joueur]+" va Commencer");
_jouer();   //debut




function different(tab,j){
    let i=0;
    let egal=0;
    do{
        if(tab[i]==j){
            egal=1;
            break;
        } 
        else i++;
    }while(i<4);
    return egal;
}


function affichager_question(){
    //animation de l'affichage des questions
    $("#nuage").css("transform","translateY(0)"); 
    $("#conteneur").css({
        transform:"translateX(0)",
        backgroundColor: "rgba(244, 244, 244, 0.489)",
    })
    //Changement de la couleur du nuage en fonction du theme courant
    //console.log(verifier_theme(p1));
    let theme = theme_courant;
    switch(theme){
        case "divertissement":{
           $('#nuage').css({
                background:'url("./Images/rose.png")',
                backgroundSize: '50%',
                backgroundPosition:'top',
                backgroundRepeat: 'no-repeat'
            })
            break;
        }
        case "science":{
            $('#nuage').css({
                background:'url("./Images/vert.png")',
                backgroundSize: '50%',
                backgroundPosition:'top',
                backgroundRepeat: 'no-repeat'
            })
            break;
        }
        case "histoire":{
            $('#nuage').css({
                background:'url("./Images/jaune.png")',
                backgroundSize: '50%',
                backgroundPosition:'top',
                backgroundRepeat: 'no-repeat'
            })
            break;
        }
        case "geographie":{
            $('#nuage').css({
                background:'url("./Images/bleu.png")',
                backgroundSize: '50%',
                backgroundPosition:'top',
                backgroundRepeat: 'no-repeat'
            })
            break;
        }
        case "sport":{
            $('#nuage').css({
                background:'url("./Images/orange.png")',
                backgroundSize: '50%',
                backgroundPosition:'top',
                backgroundRepeat: 'no-repeat'
            })
            break;
        }
        case "litterature":{
            $('#nuage').css({
                background:'url("./Images/violet.png")',
                backgroundSize: '50%',
                backgroundPosition:'top',
                backgroundRepeat: 'no-repeat'
            })
            break;
        }
    }
    
};
