var ampladaCarta, alcadaCarta;
var separacioH=20, separacioV=20;
var nFiles=2, nColumnes=2;

var jocCartes = [
    'carta14',
    'carta15'
];

$(function(){

    // mida del tauler
    $("#tauler").css({
        "width" : `${110 * nColumnes}px`,
        "height": `${150 * nFiles}px`
    });

    for (i = 0; i < nFiles; i++) {
        for (j = 0; j < nColumnes; j++) {
            generarCarta(i+1, j+1);
        }
    }

    $(".carta").on("click",function(){
        $(this).toggleClass("carta-girada");
    });

});

function generarCarta(f, c) {

    let cartaID = `f${f}c${c}`;
    //style="left:${((f-1)*(alcadaCarta+separacioV)+separacioV)}px; top: ${((c-1)*(ampladaCarta+separacioH) +separacioH)}px"
    let cartaHTML = `<div class="carta" id="${cartaID}"><div class="cara darrera"></div><div class="cara davant"></div></div>`;
    $('#tauler').append(cartaHTML);

    ampladaCarta=$(".carta").width(); 
    alcadaCarta=$(".carta").height();

    let carta = $(`#${cartaID}`);
    carta.css({
        "top" :  ((f-1)*(alcadaCarta+separacioV)+separacioV)+"px",
        "left"  :  ((c-1)*(ampladaCarta+separacioH) +separacioH)+"px"
    });
    //$('#tauler').append(cartaHTML);
    
    //let carta = $("#f"+f+"c"+c);
    carta.find(".davant").addClass(jocCartes.pop());
}