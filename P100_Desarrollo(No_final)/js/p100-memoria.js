// Variables globals
var separacioH=20, separacioV=20; // Separació entre cartes
var nFiles=2, nColumnes=2; // Files i columnes
var numCartesJugar = 0; // Numero que escull l'usuari per jugar cartes
var numCartesMa = 52; // Mà "deck" per defecte
var guanyat=false;

// Mà amb la que es genera el joc
var ampladaCarta = 80, alcadaCarta = 120; // Se li assigna l'alçada i l'amplada del taulell dinàmicament
var barallaMa = [];
var maTriada = 'carta';
var maDavant = 'davant';
var maDarrera = 'darrera';
var cartaWidth = 120;
var cartaHeigh = 160;

/**
 * Funció que executa el joc segons les dues modalitats en les que es pot iniciar:
 *      - Si es prem un botó de mode, entra directament al joc
 *      - Si tria el numero de cartes, es verifica que siguin correctes i inicia el joc
 */
function comprobarCartes (numCartes) {
    if (numCartes !== 0) {
        numCartesJugar = numCartes;
        comprobacio = true;
    } else {
        comprobacio = comprobarNumCorrecte();
    }
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
 * Funció que escolta als botons que trien cada mà i aplica les configuracions òptimes
 * @param jugaAmb Cartes amb les que es juga
 * @param carta Passa la carta seleccionada
 */
function numCartesDeMa (jugaAmb, carta, maTriadaHTML, maDavantHTML, maDarreraHTML) {
    numCartesMa = jugaAmb;
    $('.maTriadaJoc').css('filter', 'grayscale(90%)')
    $(carta).css('filter', 'none')
    maTriada = maTriadaHTML;
    maDavant = maDavantHTML;
    maDarrera = maDarreraHTML;
    if (maTriada == 'carta') {
        cartaWidth = 120;
        cartaHeigh = 160;
        ampladaCarta = 80;
        alcadaCarta = 120;
    } else if (maTriada == 'cartaP') {
        cartaWidth = 151;
        cartaHeigh = 151;
        ampladaCarta = 111;
        alcadaCarta = 111;
    } else {
        cartaWidth = 0; // FIXME: Emplenar
        cartaHeigh = 0; // FIXME: Emplenar
        ampladaCarta = 0; // FIXME: Emplenar
        alcadaCarta = 0; // FIXME: Emplenar
    }
    comprobarNumCorrecte();
}
/**
 * Funció que genera la mà i controla el numero de cartes
 */
function crearMa () {
    // S'afegeixen totes les cartes a l'array 'barallaMa'.
    for(let i = 1; i <= numCartesMa; i++){
        // Condició que controla que la mà no sigui "cartaP" i la carta no sigui la 8 (la part de darrera de les cartes)
        if (maTriada === 'cartaP' && i === 8) barallaMa.push(maTriada + i + 1); 
        else barallaMa.push(maTriada + i);
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
 * FIXME: Solucionar cálculos
 * Fa un càcul per tal de quadrar correctament les columnes i així tenir una bona distribució del taulell
 * @returns nColumnes
 */
function trobarFactor () {

    let divisors = [];

    // Iteració que controla que els divisors no siguin ni 1 ni el propi numero
    for (i = 1; i <= numCartesJugar; i++) {
        if (numCartesJugar%i === 0 && i !== 1 && i !== numCartesJugar) divisors.push(i);
    }

    if (divisors.length === 1) { // Retorna el divisor en cas de que només existeixi un
        return divisors[0];
    } else {
        let divisorMigGran = divisors[Math.round(divisors.length / 2)];
        let divisorMigPetit = divisors[Math.round(divisors.length / 2)-1];
        if (divisorMigPetit+1 != divisorMigGran) {
            let diferencia = (divisorMigGran - divisorMigPetit);
            return divisorMigGran-(Math.round(diferencia/2));
        }
        return divisorMigGran;
    }
}

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
        "width" : `${cartaWidth * nColumnes - totalRestarColumnes}px`,
        "height": `${cartaHeigh * nFiles - totalRestarFiles}px`
    });

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
    let cartaHTML = `<div class="${maTriada}" id="${cartaID}"><div class="cara ${maDarrera}"></div><div class="cara ${maDavant}"></div></div>`;
    $('#tauler').append(cartaHTML);

    let carta = $(`#${cartaID}`);
    carta.css({
        "top"  :  ((f-1)*(alcadaCarta+separacioV)+separacioV)+"px",
        "left" :  ((c-1)*(ampladaCarta+separacioH)+separacioH)+"px"
    });
    carta.find(`.${maDavant}`).addClass(barallaMa.pop());
}

/**
 * Funció que escolta als clicks del ratolí
 */
function controlarCartes () {
    // Funció que salta quan es fa click sobre alguna de les cartes
    let contadorClics = 0;
    let par1, par2;
    $(`.${maTriada}`).on("click", function() {
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
            let clasePar1 = par1.find(`.${maDavant}`).attr('class');
            let clasePar2 = par2.find(`.${maDavant}`).attr('class');
            $(`.${maTriada}`).addClass('noClick'); // Afegeix la classe noClick 
        
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
                console.log(maTriada)
                $(`.${maTriada}`).removeClass('noClick'); // Elimina la classe noClick que bloqueja els events
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
        if(!guanyat){
            tiempoRestante--;
            $("#temporitzador").animate({ value: tiempoRestante }, 1000);
            if(tiempoRestante<=5){ // Quan quedin 5 segons, es posa una música de tensió per advertir a l'usuari
                reproducirSonidoPocoTiempo();
            }
            if (tiempoRestante <= 0) { // Accions que es realitzen quan el temps s'acaba
                clearInterval(temporizador);
                setTimeout(function() {
                    //$(`.${maTriada}`).hide();
                    pausarSonidoPocoTiempo();
                    pausarSonidotaulell();
                    senseTemps();
                    verificarFinJuego(true);
                }, 1000);
            }    
        }
        
    }, 1000); 
}

/**
 * Funció que torna al menú principal
 */
function tornarAlMenu(){
    location.href="p100-memoria.html";
}

/**
 * Funcions de so
 */
function senseTemps(){
    let audio = document.getElementById("perdut");
    audio.play();
}
function pausarSonidoPocoTiempo(){
    let audio = document.getElementById("PocTemps");
    audio.pause();
}
function pausarSonidoMenu() {
    let audio = document.getElementById("menuSound");
    audio.pause();
}
function pausarSonidotaulell() {
    let audio = document.getElementById("taulerSound");
    audio.pause();
}
function reproducirSonidoPocoTiempo(){
    let audio = document.getElementById("PocTemps");
    audio.play();
}
function reproducirSonidoMenu() {
    let audio = document.getElementById("menuSound");
    audio.play();
}
function reproducirSonidotaulell() {
    let audio = document.getElementById("taulerSound");
    audio.play();
}

/**
 * Funció que finalitza el joc
 */
function verificarFinJuego(tiempoAgotado) {
    let cartas = $(`.${maTriada}`); 
    let todasOcultas = true;

    cartas.each(function() {
        if ($(this).css('display') !== 'none') {
            todasOcultas = false;
        }
    });

    if (todasOcultas) {
        guanyat=true;
        alert('¡Felicidades! Has completado el juego.');
        tornarAlMenu();
    } else if (tiempoAgotado) {
        guanyat = false;
        alert('¡Tiempo agotado! Has perdido.');
        tornarAlMenu();
    }
}