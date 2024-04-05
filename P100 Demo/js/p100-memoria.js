var ampladaCarta, alcadaCarta;
var separacioH=20, separacioV=20;
var nFiles=3, nColumnes=3;

var jocCartes = [
    'carta14',
    'carta15',
    'carta16'
];

$(function(){
    // mida del tauler
        // 2 x 2 => 40
        // 3 x 3 => 60
        // 4 x 4 => 80
    let totalRestar = 0
    totalRestar = nFiles != 1 ? (20 * nFiles) - 20 : 0
    console.log(totalRestar)
    $("#tauler").css({
        "width" : `${120 * nColumnes - totalRestar}px`,
        "height": `${160 * nFiles - totalRestar}px`
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

function generarCarta(f, c) {

    let cartaID = `f${f}c${c}`;
    let cartaHTML = `<div class="carta" id="${cartaID}"><div class="cara darrera"></div><div class="cara davant"></div></div>`;
    $('#tauler').append(cartaHTML);

    let carta = $(`#${cartaID}`);
    carta.css({
        "top" :  ((f-1)*(alcadaCarta+separacioV)+separacioV)+"px",
        "left"  :  ((c-1)*(ampladaCarta+separacioH)+separacioH)+"px"
    });
    
    carta.find(".davant").addClass(jocCartes.pop());
}