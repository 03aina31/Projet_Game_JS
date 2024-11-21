$(document).ready(function(){
    $("#jouer").click(function(){
        window.location.href = "./otherPages/jouer.html";
    });
    $("#retour").click(function(){
        window.location.href = "../index.html";
    });
    $("#scrollBox").scroll(function(){
        console.log(i+=1);
    });
});