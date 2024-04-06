var ampladaCarta, alcadaCarta;
var separacioH=20, separacioV=20;
var nFiles=3, nColumnes=3;

var barallaMa1 = [
    'carta14',
    'carta15',
    'carta16',
    'carta24'
];

var barallaMa2 = [
    'carta14',
    'carta15',
    'carta16',
    'carta24'
];

$(function(){
console.log("Funciona");
    // mida del tauler
        // 2 x 2 => 20
        // 3 x 3 => 40
        // 4 x 4 => 60
    let totalRestar = nFiles != 1 ? 20 * (nFiles - 1) : 0;
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

// TODO: Función que baraje el array
function barajar(array) {
    
}

function generarCarta(f, c) {

    let cartaID = `f${f}c${c}`;
    let cartaHTML = `<div class="carta" id="${cartaID}"><div class="cara darrera"></div><div class="cara davant"></div></div>`;
    $('#tauler').append(cartaHTML);

    let carta = $(`#${cartaID}`);
    carta.css({
        "top" :  ((f-1)*(alcadaCarta+separacioV)+separacioV)+"px",
        "left"  :  ((c-1)*(ampladaCarta+separacioH)+separacioH)+"px"
    });
    
    carta.find(".davant").addClass(barallaMa1.pop());
}