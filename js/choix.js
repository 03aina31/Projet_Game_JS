var nbrPlayer = 4;
$(window).ready(function(){
    $("#nombre1").click(function(){
        $('#nom').html("Entrer votre nom:");
        $('#p1').show();
        $('#p2').hide();
        $('#p3').hide();
        $('#p4').hide();
        nbrPlayer = 1;
    });
    $("#nombre2").click(function(){
        $('#nom').html("Entrer vos noms:");
        $('#p1').show();
        $('#p2').show();
        $('#p3').hide();
        $('#p4').hide();
        nbrPlayer = 2;
    });
    $("#nombre3").click(function(){
        $('#nom').html("Entrer vos noms:");
        $('#p1').show();
        $('#p2').show();
        $('#p3').show();
        $('#p4').hide();
        nbrPlayer = 3;
    });
    $("#nombre4").click(function(){
        $('#nom').html("Entrer vos noms:");
        $('#p1').show();
        $('#p2').show();
        $('#p3').show();
        $('#p4').show();
        nbrPlayer = 4;
    });
    let btn_play = $('#play'),
        in_p1 = $('#in_p1'),
        in_p2 = $('#in_p2'),
        in_p3 = $('#in_p3'),
        in_p4 = $('#in_p4');
    
        btn_play.click(function(){
            let nom_p1 = in_p1.val(),
                nom_p2 = in_p2.val(),
                nom_p3 = in_p3.val(),
                nom_p4 = in_p4.val();
            sessionStorage.setItem('joueur1',nom_p1);
            sessionStorage.setItem('joueur2',nom_p2);
            sessionStorage.setItem('joueur3',nom_p3);
            sessionStorage.setItem('joueur4',nom_p4);
            sessionStorage.setItem('nbrPlayer',parseInt(nbrPlayer));
            console.log(sessionStorage.getItem('joueur1'));
            console.log(sessionStorage.getItem('joueur2'));
            console.log(sessionStorage.getItem('joueur3'));
            console.log(sessionStorage.getItem('joueur4'));
        })
    $('#play').click(()=>window.location.href='../otherpage/jouer.html');
})