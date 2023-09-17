import {Pion, De, COULEURS, RAYON_PIONS as R_PIONS, COORD_MAP as Map, THEMES} from './elements.js';

var timer=document.getElementById('timer');

function efface(k){
    for(let i=0;i<4;i++){
      //si la réponse prensent en affichage n'est pas égale à la vraie reponse alors on l'efface
      if(document.getElementById('bt'+i).textContent!=THEMES.divertissement.reponse[k][0]){
        $('#bt'+i).hide();
      }
    }
}

function verifie(bt,k){
    if(document.getElementById(bt).textContent==THEMES.divertissement.reponse[k][0]) console.log("Bonne reponse"); 
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
    return new Promise(resolve =>{
        var id_qst = Math.floor((Math.random())*6); //choix du question à poser
        $('#question').text(THEMES.divertissement.question[id_qst]); //affichage de la question
        timer.innerHTML = "Réfléchissez sur votre reponse";
        setTimeout(()=>{
            resolve(id_qst);
        },5000);
    })
}

_chrono()
  .then((n) =>{
    decremente(n); //déclenchement du chronomètre
    
    for(let i=0;i<4;i++){
        if(i==0){
            var j=Math.floor((Math.random())*4); //choix de la 1ère reponse à afficher
            var lj=[];  //tableau qui stocke les reponses déja afficher
            lj[i]=j;  //sauvegarde de la 1ère reponse comme 1ère element de ce tableau
            $('#bt'+i).text(THEMES.divertissement.reponse[n][j]); //affichage de la 1ère reponse 
        }
        else{
            do{
                j=Math.floor((Math.random())*4); //choix de la prochaine reponse à afficher
            }while(different(lj,j)); //vérifie si la reponse choisit est déja present en affichage
            lj[i]=j;//sauvegarde de la reponse choisit comme element de ce tableau
            $('#bt'+i).text(THEMES.divertissement.reponse[n][j]); //affichage des autres reponses
        }
    }
  })

function different(tab,j){
    let i=0;
    let egal=0;
    //On compare la reponse choisi avec les reponses déja présent en affichage 
    do{
        if(tab[i]==j){
            egal=1; //la reponse choisi est déja présent en affichage
            break;
        } 
        else i++;
    }while(i<4); //compare la reponse avec les 4 éléments du tableau si déja présent 
    return egal;
}
