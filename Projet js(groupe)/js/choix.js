$(window).ready(function(){
    $("#nombre1").click(function(){
        $('#nom').html("Entrer votre nom:");
        $('#p1').show();
        $('#p2').hide();
        $('#p3').hide();
        $('#p4').hide();
    });
    $("#nombre2").click(function(){
        $('#nom').html("Entrer vos noms:");
        $('#p1').show();
        $('#p2').show();
        $('#p3').hide();
        $('#p4').hide();
    });
    $("#nombre3").click(function(){
        $('#nom').html("Entrer vos noms:");
        $('#p1').show();
        $('#p2').show();
        $('#p3').show();
        $('#p4').hide();
    });
    $("#nombre4").click(function(){
        $('#nom').html("Entrer vos noms:");
        $('#p1').show();
        $('#p2').show();
        $('#p3').show();
        $('#p4').show();
    });
    
})