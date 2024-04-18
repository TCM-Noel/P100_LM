// Variables globals
var ampladaCarta, alcadaCarta;
var separacioH=20, separacioV=20; // Separació entre cartes
var nFiles=2, nColumnes=2; // Files i columnes
var numCartesJugar = 0; // Numero que escull l'usuari per jugar cartes
var numCartesMa = 52; // Mà "deck" per defecte

// Dues mans amb la que es generarà el joc
var barallaMa = [];

/**
 * Funció que comproba el resultat de l'input del menú 
 */
function comprobarCartes () {
    let comprobacio = comprobarNumCorrecte();
    if (comprobacio) {
        $('#menuInicial').css('display', 'none')
        $('#footer').css('display', 'block')
        $('#tauler').css('display', 'block')
        $('#temporitzador').show();
        reproducirSonidotaulell();
        iniciaJoc();
    } else {
        $('#footer').css('display', 'none')
        $('#tauler').css('display', 'none')
    }
}

/**
 * Funció que posa l'input en diferents colors èr
 * @returns Comprobació si el numero introduit pel jugador
 */
function comprobarNumCorrecte () {
    inp = $('#numCartes');
    numCartesJugar = parseInt(inp.val());
    console.log(numCartesJugar);
    if (numCartesJugar!="" && numCartesJugar%2===0 && numCartesJugar<= numCartesMa && numCartesJugar > 0) {
        inp.removeClass('numIncorrecte');
        return true;
    } else {
        if (isNaN(numCartesJugar) || numCartesJugar === 0) {
            inp.val('');
            inp.attr('placeholder', 'Introdueix un numero...')
            inp.removeClass('numIncorrecte');
        } else {
            inp.addClass('numIncorrecte');
        }
        return false;
    }
}   

/**
 * Funció que genera tot el joc
 */
function iniciaJoc () {
    crearMa();
    
    midesGenerals();
    
    // Doble iteració per generar les cartes en el taulell
    let comptadorCartes = 0;
    for (i = 0; i < nFiles; i++) {
        for (j = 0; j < nColumnes; j++) {
            if (comptadorCartes !== numCartesJugar) {
                generarCarta(i+1, j+1);
                comptadorCartes++;
            }
        }
    }

    controlarCartes();
    temporitzadorJoc();
}

/**
 * Funció que escolta als botons que trien cada mà
 * @param jugaAmb Cartes amb les que es juga
 * @param carta Passa la carta seleccionada
 */
function numCartesDeMa (jugaAmb, carta) {
    numCartesMa = jugaAmb;
    $('.maTriadaJoc').css('filter', 'grayscale(90%)')
    $(carta).css('filter', 'none')
    console.log(numCartesMa)
}
/**
 * Funció que genera la mà i controla el numero de cartes
 */
function crearMa () {
    // S'afegeixen totes les cartes a l'array 'barallaMa'.
    for(let i = 1; i <= numCartesMa; i++){
        barallaMa.push('carta' + i);
    }

    // Gestió de columnes i files
    nColumnes = numCartesJugar === 2 || numCartesJugar === 4 ? 2 : trobarFactor();
    nFiles = Math.round(numCartesJugar / nColumnes);

    barrejar(barallaMa); // Es barreja totes les cartes de la mà per tal de poder obtenir cartes aleatories en el joc.
    barallaMa = barallaMa.slice(0,(nFiles*nColumnes)/2); // Crea una copia de l'array original
                                                         /* Es multiplica el nombre de files i columnes i es divideix entre 2
                                                            per obtenir el total de cartes amb què es jugarà */
    
    barallaMa.push(...barallaMa) // Duplica los valores del array

    // Es barrejen les dues mans per tal de obtenir dues mans diferents i així després jugar amb diferents cartes.
    barrejar(barallaMa);
}

/**
 * Fa un càcul per tal de quadrar correctament les columnes i així tenir una bona distribució del taulell
 * @returns nColumnes
 */
function trobarFactor () {

    let divisors = [];
    for (i = 1; i <= numCartesJugar; i++) {
        if (numCartesJugar%i === 0 && i !== 1 && i !== numCartesJugar) divisors.push(i);
    }
    if (divisors.length === 1) {
        return divisors[0];
    } else {
        let divisorMigGran = divisors[Math.floor(divisors.length / 2)];
        let divisorMigPetit = divisors[Math.floor(divisors.length / 2)-1];
        if (divisorMigPetit+1 != divisorMigGran) {
            let diferencia = (divisorMigGran - divisorMigPetit);
            console.log("primer return")
            console.log(divisorMigGran-(Math.floor(diferencia/2)))
            return divisorMigGran-(Math.floor(diferencia/2));
        }
        console.log("segundo return")
        console.log(divisorMigGran)
        return divisorMigGran;
    }
}
console.log(trobarFactor(16)); // Prueba con 16
console.log(trobarFactor(36)); // Prueba con 36

/**
 * Funció que controla les mides del taulell de joc i les cartes
 */
function midesGenerals () {
    // Càlcul per tal d'ajustar el taulell a la quantitat de cartes a jugar. Mida del tauler:
        // 2 x 2 => 20
        // 3 x 3 => 40
        // 4 x 4 => 60
        let totalRestarFiles = 0;
        let totalRestarColumnes = 0;
    
        if (nFiles > 1) {
            totalRestarFiles = 20 * (nFiles - 1);
        }
    
        if (nColumnes > 1) {
            totalRestarColumnes = 20 * (nColumnes - 1);
        }
    $("#tauler").css({
        "width" : `${120 * nColumnes - totalRestarColumnes}px`,
        "height": `${160 * nFiles - totalRestarFiles}px`
    });

    // Agafa les mesures de les cartes
    ampladaCarta=$(".carta").width(); 
    alcadaCarta=$(".carta").height();
}

/**
 * Funció que barreja les cartes de les mans.
 * La funció genera un numero aleatori i calcula les posicions de l'array. Amb aquestes mesures reparteix
 *  aleatoriament les cartes per les posicions de l'array.
 * @param array[] Mà de cartes
 */
function barrejar(array) {
    let quants = array.length;
    for(i=0;i<array.length;i++){
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
        "top"  :  ((f-1)*(alcadaCarta+separacioV)+separacioV)+"px",
        "left" :  ((c-1)*(ampladaCarta+separacioH)+separacioH)+"px"
    });
    carta.find(".davant").addClass(barallaMa.pop());
}

/**
 * Funció que escolta als clicks del ratolí
 */
function controlarCartes () {
    // Funció que salta quan es fa click sobre alguna de les cartes
    let contadorClics = 0;
    let par1, par2;
    $(".carta").on("click", function() {
        if (contadorClics === 1 && par1[0] === this) {
            return; // No fer res si es fa clic a la mateixa carta.
        }
        $(this).toggleClass("carta-girada"); // Auqesta funció gira les cartes
        if(contadorClics === 0){
            par1=$(this);
        }
        
        contadorClics++; 
        if (contadorClics === 2) {
            par2 = $(this);
            // Obté les classes de les cares davanteres de les cartes
            let clasePar1 = par1.find(".davant").attr('class');
            let clasePar2 = par2.find(".davant").attr('class');
            $('.carta').addClass('noClick'); // Afegeix la classe noClick 
        
            // Timeout que comprova les cartes clickades
            setTimeout(function() {
                if (clasePar1 == clasePar2){
                    par2.hide();
                    par1.hide();
                    verificarFinJuego();
                } else {
                    $(par1).toggleClass("carta-girada");
                    $(par2).toggleClass("carta-girada");
                }
                $('.carta').removeClass('noClick'); // Elimina la classe noClick que bloqueja els events
            }, 1000); // Retard d'un segon
            
            contadorClics = 0;
        }        
    });
}

/**
 * Funció que controla el temporitzador del joc
 */
function temporitzadorJoc () {
    // Temporizador
    
    let tiempoRestante = 3*numCartesJugar;
    $("#temporitzador").animate({ value: tiempoRestante }, 1000);
    $("#temporitzador").attr("max", tiempoRestante);
    let temporizador = setInterval(function() {
        tiempoRestante--;
        console.log(tiempoRestante);
        //$("#temporitzador").attr("value", tiempoRestante);
        $("#temporitzador").animate({ value: tiempoRestante }, 1000);
        if(tiempoRestante<=5){
            reproducirSonidoPocoTiempo();
        }
        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            setTimeout(function() {
                $("#temporitzador").text("El temps s'ha esgotat");
                 // Acciones cuando el tiempo se acabe
                 $('.carta').hide();
                 pausarSonidoPocoTiempo();
                 pausarSonidotaulell();
                 senseTemps();
            }, 1000);
        }
    }, 1000); 
    
    
}

/**
 * Funcions de so
 */
function senseTemps(){
    var audio = document.getElementById("perdut");
    audio.play();
}
function pausarSonidoPocoTiempo(){
    var audio = document.getElementById("PocTemps");
    audio.pause();
}
function pausarSonidoMenu() {
    var audio = document.getElementById("menuSound");
    audio.pause();
}
function pausarSonidotaulell() {
    var audio = document.getElementById("taulerSound");
    audio.pause();
}
function reproducirSonidoPocoTiempo(){
    var audio = document.getElementById("PocTemps");
    audio.play();
}
function reproducirSonidoMenu() {
    var audio = document.getElementById("menuSound");
    audio.play();
}
function reproducirSonidotaulell() {
    var audio = document.getElementById("taulerSound");
    audio.play();
}

/**
 * Funció que finalitza el joc
 */
function verificarFinJuego() {
    var cartas = $('.carta'); 
    var todasOcultas = true;
    var tiempoRestante = parseInt($("#temporizador").text()); // Asumiendo que el temporizador está en un elemento con id 'temporizador'

    cartas.each(function() {
        if ($(this).css('display') !== 'none') {
            todasOcultas = false;
        }
    });

    if (todasOcultas) {
        alert('¡Felicidades! Has completado el juego.');
    }
}

