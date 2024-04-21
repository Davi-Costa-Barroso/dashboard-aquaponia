import { getDatabase, ref, onValue } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.17.1/firebase-database.min.js";
const db = getDatabase();

// Elements for sensor readings
const bombaAquarioElement = document.getElementById("bomba-aquario");
const bombaCisternaElement = document.getElementById("bomba-cisterna");
const valvulaHidroponiaElement = document.getElementById("valvula-hidroponia");
const nivelAltoAquarioElement = document.getElementById("nivel-alto-aquario")
const nivelBaixoAquarioElement = document.getElementById("nivel-baixo-aquario")

const rotinaRegagemElement = document.getElementById("rotina-regagem")
const horaUltimaRotinaElement = document.getElementById("ultima-rotina")
const horaProximaRotinaElement = document.getElementById("proxima-rotina")
const contagemRegressivaElement = document.getElementById("contagem-proxima-rotina")

const nivelAltoCisternaElement = document.getElementById("nivel-alto-cisterna")
const nivelBaixoCisternaElement = document.getElementById("nivel-baixo-cisterna")

const phElement = document.getElementById("ph")
const temperaturaElement = document.getElementById("temp");
const greenColor = "invert(47%) sepia(42%) saturate(4542%) hue-rotate(123deg) brightness(93%) contrast(97%)"
const redColor = "invert(13%) sepia(100%) saturate(4542%) hue-rotate(-0.25deg) brightness(93%) contrast(97%)"

// Database paths (with user UID)
var dbPathBombaAquario = ref(db, '/Aquario/bombaAquario');
var dbPathValvulaHidroponia = ref(db, '/Tubulacao/valvulaHidroponia');

var dbPathNivelAltoAquario = ref(db, '/Aquario/sensorNivelAltoAquario')
var dbPathNivelBaixoAquario = ref(db, '/Aquario/sensorNivelBaixoAquario')

var dbPathBombaCisterna = ref(db, '/Cisterna/bombaCisterna');
var dbPathNivelAltoCisterna = ref(db, '/Cisterna/sensorNivelAltoCisterna')
var dbPathNivelBaixoCisterna = ref(db, '/Cisterna/sensorNivelBaixoCisterna')

var dbPathPH = ref(db, '/Aquario/ph')

var dbPathRotinaRegagem = ref(db, '/RotinaRegaPlantas/valor')
var dbPathHoraUltimaRotina = ref(db, '/RotinaRegaPlantas/fimRotinaHora')

var dbPathTemperatura = ref(db, '/Aquario/temperatura')

// Update page with new readings

onValue(dbPathBombaAquario, (snapshot) => {
  const data = snapshot.val()

  if (data == true) {
    bombaAquarioElement.style.filter = greenColor
  }
  if (data == false) {
    bombaAquarioElement.style.filter = redColor
  }

});

onValue(dbPathBombaCisterna, (snapshot) => {
  const data = snapshot.val()
  if (data == true) {
    bombaCisternaElement.style.filter = greenColor
  }
  if (data == false) {
    bombaCisternaElement.style.filter = redColor
  }
});

onValue(dbPathValvulaHidroponia, (snapshot) => {
  const data = snapshot.val()

  if (data == true) {
    valvulaHidroponiaElement.style.filter = greenColor
  }
  if (data == false) {
    valvulaHidroponiaElement.style.filter = redColor
  }

});

onValue(dbPathNivelAltoAquario, (snapshot) => {
  const data = snapshot.val()

  if (data == true) {
    nivelAltoAquarioElement.style.filter = greenColor
  }
  if (data == false) {
    nivelAltoAquarioElement.style.filter = redColor
  }

});

onValue(dbPathNivelBaixoAquario, (snapshot) => {
  const data = snapshot.val()

  if (data == true) {
    nivelBaixoAquarioElement.style.filter = greenColor
  }
  if (data == false) {
    nivelBaixoAquarioElement.style.filter = redColor
  }

});


onValue(dbPathNivelAltoCisterna, (snapshot) => {
  const data = snapshot.val()

  if (data == true) {
    nivelAltoCisternaElement.style.filter = greenColor
  }
  if (data == false) {
    nivelAltoCisternaElement.style.filter = redColor
  }

});

onValue(dbPathNivelBaixoCisterna, (snapshot) => {
  const data = snapshot.val()

  if (data == true) {
    nivelBaixoCisternaElement.style.filter = greenColor
  }
  if (data == false) {
    nivelBaixoCisternaElement.style.filter = redColor
  }

});

onValue(dbPathPH, (snapshot) => {
  const data = snapshot.val().toFixed(2)
  phElement.textContent = data;

  var x = (new Date()).getTime(),
    y = parseFloat(data);
  console.log(y)
  // y = parseFloat(this.responseText);
  //console.log(this.responseText);
  if (chartPH.series[0].data.length > 10) {
    chartPh.series[0].addPoint([x, y], true, true, true);

  } else {
    chartPH.series[0].addPoint([x, y], true, false, true);

  }

  if (data < 6) {
    // pH ácido (vermelho)
    phElement.style.color = "red";
  } else if (data >= 6 && data <= 8) {
    // pH neutro (preto)
    phElement.style.color = "black";
  } else {
    // pH alcalino (azul)
    phElement.style.color = "blue";
  }

});


onValue(dbPathTemperatura, (snapshot) => {
  const data = snapshot.val().toFixed(2)
  temperaturaElement.textContent = data;

  var x = (new Date()).getTime(),
    y = parseFloat(data);
  console.log(y)
  // y = parseFloat(this.responseText);
  //console.log(this.responseText);
  if (chartT.series[0].data.length > 10) {
    chartT.series[0].addPoint([x, y], true, true, true);

  } else {
    chartT.series[0].addPoint([x, y], true, false, true);

  }

  

});


onValue(dbPathRotinaRegagem, (snapshot) => {
  const data = snapshot.val()

  if (data == true) {
    rotinaRegagemElement.style.filter = greenColor
    document.getElementById('start-som').play();
    alert("Rotina iniciada!");
  }
  if (data == false) {
    rotinaRegagemElement.style.filter = ""

  }
});

let ultimaHoraRotina;

onValue(dbPathHoraUltimaRotina, (snapshot) => {
  const data = snapshot.val()
  horaUltimaRotinaElement.innerText = data
  ultimaHoraRotina = data
  horaProximaRotinaElement.innerText = adicionarMinutos(data, 15)
  
  atualizarHoraUltimaRotina(ultimaHoraRotina);
});


function adicionarMinutos(hora, minutos) {
  const data = new Date();
  const partesHora = hora.split(":");
  data.setHours(partesHora[0]);
  data.setMinutes(partesHora[1]);
  data.setSeconds(0);
  data.setMilliseconds(0);
  
  const novaHora = new Date(data.getTime() + minutos * 60000);
  const novaHoraFormatada = `${novaHora.getHours()}:${novaHora.getMinutes().toString().padStart(2, '0')}:${novaHora.getSeconds()}`;
  
  return novaHoraFormatada;
}

function atualizarHoraUltimaRotina(data) {
  ultimaHoraRotina = data;
  horaUltimaRotinaElement.innerText = data;
  
  // Adicionar 40 minutos à última hora da rotina
  const proximaHoraRotina = adicionarMinutos(ultimaHoraRotina, 40);
  
  // Realizar a contagem regressiva até a próxima rotina
  //contagemRegressiva(proximaHoraRotina);
}

// Função para realizar a contagem regressiva
function contagemRegressiva(hora) {
  const dataAtual = new Date();
  const partesHora = hora.split(":");
  const horaProximaRotina = new Date();
  horaProximaRotina.setHours(partesHora[0]);
  horaProximaRotina.setMinutes(partesHora[1]);
  horaProximaRotina.setSeconds(0);
  horaProximaRotina.setMilliseconds(0);
  
  const diferenca = horaProximaRotina - dataAtual;
  
  if (diferenca > 0) {
    const minutos = Math.floor((diferenca / 1000 / 60) % 60);
    const segundos = Math.floor((diferenca / 1000) % 60);
    //console.log(`Próxima rotina em ${minutos} minutos e ${segundos} segundos.`);
    contagemRegressivaElement.innerText = (minutos+":"+segundos)
    setTimeout(() => {
      contagemRegressiva(hora);
    }, 1000);
  } else {
    //console.log('Hora da próxima rotina!');
  }
}