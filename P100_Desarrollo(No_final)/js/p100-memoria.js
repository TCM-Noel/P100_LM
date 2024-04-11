// Variables globals
var ampladaCarta, alcadaCarta;
var separacioH=20, separacioV=20;
var nFiles=4, nColumnes=4;

// Dues mans amb la que es generarà el joc
var barallaMa1 = [];
var barallaMa2 = [];

$(function(){

    // S'afegeixen totes les cartes a l'array 'barallaMa1'.
    for(let i = 1; i <= 52; i++){
        barallaMa1.push('carta' + i);
    }

    barrejar(barallaMa1); // Es barreja totes les cartes de la mà per tal de poder obtenir cartes aleatories en el joc.

    barallaMa1 = barallaMa1.slice(0,(nFiles*nColumnes)/2); // Crea una copia de l'array original
                                                           /* Es multiplica el nombre de files i columnes i es divideix entre 2
                                                              per obtenir el total de cartes amb què es jugarà */
    barallaMa2 = barallaMa1.slice();

    // Es barrejen les dues mans per tal de obtenir dues mans diferents i així després jugar amb diferents cartes.
    barrejar(barallaMa1);
    barrejar(barallaMa2);
    
    // Càlcul per tal d'ajustar el taulell a la quantitat de cartes a jugar. Mida del tauler:
        // 2 x 2 => 20
        // 3 x 3 => 40
        // 4 x 4 => 60
    let totalRestarFiles = nFiles != 1 ? 20 * (nFiles - 1) : 0;
    let totalRestarColumnes = nFiles != 1 ? 20 * (nColumnes - 1) : 0;
    $("#tauler").css({
        "width" : `${120 * nColumnes - totalRestarColumnes}px`,
        "height": `${160 * nFiles - totalRestarFiles}px`
    });
    
    // Agafa les mesures de les cartes
    ampladaCarta=$(".carta").width(); 
    alcadaCarta=$(".carta").height();

    // Doble iteració per generar les cartes en el taulell
    for (i = 0; i < nFiles; i++) {
        for (j = 0; j < nColumnes; j++) {
            generarCarta(i+1, j+1);
        }
    }

    // Funció que salta quan es fa click sobre alguna de les cartes
    var contadorClics = 0;
    var par1, par2;
$(".carta").on("click", function() {
    $(this).toggleClass("carta-girada"); //CON ESTO SE GIRAN LAS CARTAS
    if(contadorClics === 0){
        par1=$(this);
    }
    
    contadorClics++;
    console.log(contadorClics);
    if (contadorClics === 2) {
        par2 = $(this);
        // Obtiene las clases de las caras delanteras de las cartas
        let clasePar1 = par1.find(".davant").attr('class');
        let clasePar2 = par2.find(".davant").attr('class');
    
        if (clasePar1 == clasePar2) {
            setTimeout(function() {
                par2.hide();
                par1.hide();
            }, 1000); // Retraso de 1 segundo
        } else {
            setTimeout(function() {
                $(par1).toggleClass("carta-girada");
                $(par2).toggleClass("carta-girada");
            }, 1000); // Retraso de 1 segundo
        }
        contadorClics = 0;
    }
    
    
    
});

});

/**
 * Funció que barreja les cartes de les mans.
 * La funció genera un numero aleatori i calcula les posicions de l'array. Amb aquestes mesures reparteix
 *  aleatoriament les cartes per les posicions de l'array.
 * @param array[] Mà de cartes
 */
function barrejar(array) {
    let quants = array.length;
    for(let i=0;i<array.length;i++){
        let rnd = Math.floor(Math.random()*quants);
        let aux = array[i];
        array[i]=array[rnd];
        array[rnd] = aux;
    }
}

/**
 * Funció que genera cada carta dintre del taulell
 * @param f Fila iterant
 * @param c Columna iterant
 */
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
<<<<<<< HEAD
    
}
//FUNCION CARTA GIRADA

//TEMPORIZADOR
/*
var tiempoRestante = 100; 

var temporizador = setInterval(function() {//GRACIAS A CHATGPT PARA DECIRME SETINTERVAL
    tiempoRestante--;
    document.getElementById("temporitzador").textContent = tiempoRestante;
    var prueva
    if (tiempoRestante <= 0) {
        clearInterval(temporizador);
        document.getElementById("temporitzador").textContent = "El temps s'ha esgotat";
        //AQUI PONEMOS LO QUE PASARA SI SE ACABA EL TEMPORIZADOR (EXPLOTA EL JUEGO POSIBLEMENTE)
    }
}, 1000); 
*/
=======


//CONTROLAR LAS ACCIONES CADA 2 CLICKS
var contadorClics = 0;
$(document).ready(function() {
    var contadorClics = 0;
    $(".carta").on("click", function() {
        contadorClics++;
        if (contadorClics === 2) {
            // Acciones cuando se hace clic en dos cartas
            contadorClics = 0;
        }
        $(this).toggleClass("carta-girada"); // Esta clase deberá manejar el efecto de giro en tu CSS
    });

    // Temporizador
    var tiempoRestante = 100; 
    var temporizador = setInterval(function() {
        tiempoRestante--;
        $("#temporitzador").text(tiempoRestante);
        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            $("#temporitzador").text("El temps s'ha esgotat");
            // Acciones cuando el tiempo se acabe
        }
    }, 1000); 
    })
    function iniciarJuego(dificultad) {
        // Ocultar menú de dificultad
        document.getElementById('menu-dificultad').style.display = 'none';
        
        // Mostrar tablero del juego
        var tablero = document.getElementById('tablero-juego');
        tablero.style.display = 'block';
        
        // Generar contenido del tablero según la dificultad
        tablero.innerHTML = '<h2>Dificultad: ' + dificultad + '</h2>';
        // Aquí puedes expandir la lógica para generar el tablero según la dificultad
        
        console.log('Dificultad seleccionada:', dificultad);
    }
}
>>>>>>> 0095ea5eabc67f9a00df0e0df38ab7a4d4e69d5d
