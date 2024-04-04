var ampladaCarta, alcadaCarta;
var separacioH=20, separacioV=20;
var nFiles=2, nColumnes=2;

var jocCartes = [
    "carta14",
];

$(function(){

    // mida del tauler
    $("#tauler").css({
        "width" : `${120 * nColumnes}px`,
        "height": `${160 * nFiles}px`
    });
   
    ampladaCarta=$(".carta").width(); 
    alcadaCarta=$(".carta").height();

    for (i = 0; i < nFiles; i++) {
        for (j = 0; j < nColumnes; j++) {
            generarCarta(i+1, j+1);
        }
    }

    $(".carta").on("click",function(){
        $(this).toggleClass("carta-girada");
    });

});

function generarCarta(fila, columna) {
    let f, c, carta;
    f=fila;
    c=columna;
    
    let cartaID = `#f${f}c${c}`;
    let cartaHTML = `<div class="carta" id="${cartaID}"><div class="cara darrera"></div><div class="cara davant"></div></div>`;
    $('#tauler').append(cartaHTML);

    carta = $(cartaID);
    carta.css({
        "top": ((c - 1) * (ampladaCarta + separacioH) + separacioH) + "px",
        "left": ((f - 1) * (alcadaCarta + separacioV) + separacioV) + "px"
    });
    
    carta.find(".davant").addClass(jocCartes.pop());
}