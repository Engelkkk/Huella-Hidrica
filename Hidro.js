const tipo = document.getElementById("tipoFibra");
const kilo = document.getElementById("kilosTela");
const btn = document.getElementById("btnCalcular");
const agua = document.getElementById("aguaTotal");
const historial = document.getElementById("historialLotes");

//Crear una clase para almacenar los datos
class LoteTela {
    constructor(id, tipo, kilogramos){
    this.id = id;
    this.tipo = tipo;
    this.kilogramos = kilogramos;
    }
// Calcular el total de agua que se necesita para procesar algodon y poliester
    calcularAgua(){
        if(this.tipo == "algodon") {
            return 10000 * this.kilogramos;
        }
        else if(this.tipo == "poliester"){
            return 300 * this.kilogramos;
        }
    }    
}

//Recuperar los lotes guardados
let lotes = JSON.parse(localStorage.getItem("lotes")) || [];

//Boton para el click
btn.addEventListener("click", agregarLote);

//Para agregar un lote
function agregarLote(){
    const fibra = tipo.value;
    const cantidad = parseFloat(kilo.value);
    if(kilo.value == "" || isNaN(cantidad) || cantidad <= 0) {
        alert("Ingresa una cantidad valida");
        return;
    };
    //Se crea un nuevo lote con el tipo de fibra y la cantidad de la misma
    const nuevoLote = new LoteTela(lotes.length + 1, fibra, cantidad);
    const consumo = nuevoLote.calcularAgua();
    nuevoLote.agua = consumo;
    lotes.push(nuevoLote);
    localStorage.setItem("lotes", JSON.stringify(lotes));
    ActualizarAguaTotal();
    mostrarHistorial();
}

//Para agregar el agua total
function ActualizarAguaTotal(){
    let total = 0;
    for( let i = 0; i < lotes.length; i++){
        total = total + lotes[i].agua; 
    }
    agua.textContent = total;
}

function mostrarHistorial(){
    historial.innerHTML = "";
    for(let i = 0; i < lotes.length; i++){
        const li = document.createElement("li");
        li.textContent = "Lote: " + lotes[i].id +
    " | Fibra: " + lotes[i].tipo +
    " | Kilogramos: " + lotes[i].kilogramos +
    " | Agua: " + lotes[i].agua + " litros";
    historial.appendChild(li);
    }
}
ActualizarAguaTotal();
mostrarHistorial();
