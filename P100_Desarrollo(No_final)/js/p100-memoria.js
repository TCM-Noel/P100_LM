var ampladaCarta, alcadaCarta;
var separacioH=20, separacioV=20;
var nFiles=4, nColumnes=4;

    var barallaMa1 = [];
    var barallaMa2 = [];
    for(let i = 1; i <= 52; i++){
        barallaMa1.push('carta' + i);
    }
    
    barajar(barallaMa1);
    
    barallaMa1 = barallaMa1.slice(0,8);
    barallaMa2 = barallaMa1.slice();

    


$(function(){
    barajar(barallaMa1);
    barajar(barallaMa2);
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
    let quants = array.length;
    for(let i=0;i<array.length;i++){
        let rnd = Math.floor(Math.random()*quants);
        let aux = array[i];
        array[i]=array[rnd];
        array[rnd] = aux;

    }
    

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
    c%2==0?carta.find(".davant").addClass(barallaMa1.pop()) : carta.find(".davant").addClass(barallaMa2.pop());
    
}