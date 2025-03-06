let config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6],
  parent: 'phaser-div',
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_VERTICALLY
  },
  dom: {
    createContainer: true
  },
  fontFamily: `minecraft`,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  }
};

// Nick
let nick = "";

// Plataforma
let plataforma = "";

// Pontuação
let pontuacao = 0;

// Nível
let nivel = 0;

// Começar Música
let start = false;

// Config Tiro
let fire = false;

// Fullscreen
let fullscreen = false;

// Config Scale
let configScale = null;

// Mobile
function checkMobile() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true; // está utilizando celular
  } else {
    return false; // não é celular
  }
}

// Mobile
let mobile = checkMobile();

// Atualizando Plataforma
if (mobile) {
  plataforma = "mobile";
} else {
  plataforma = "desktop";
}

// Recordes
let recordes = [];

// Firebase
const db = firebase.firestore();

// Função pesquisar e organizar coleção 'Player'
function pesquisar() {
  recordes = [];
  
  db.collection('Player').limit(10).get()
    
  .then(snapshot => {
    const players = snapshot.docs.reduce((acc, doc) => {
      acc = [doc.id, doc.data().Nick, doc.data().Plataform, doc.data().Score];

      recordes.push(acc);
    }, '');
    
    console.log('Pesquisa finalizada!');
    console.log(recordes);

    recordes.sort(function(a, b){
    
      if (a[3] > b[3]) return 1;
      
      if (a[3] < b[3]) return -1;
  
      return 0;
    });
  
    recordes.reverse();
  
    console.log('Organização finalizada!');
    console.log(recordes);
  })
  
  .catch(err => {
    console.log(err.message)
  })
}

// Função analisar novo recorde
function analisar(newScore) {
  if (recordes.length < 10) {
    
    return true;
  } else {
    for (var i = 0; i < 10; i++) {
      let score = recordes[i];

      if (newScore > score[3]) {

        return true;
      }
    }
  }

  return false;
}

// Função registrar recordes coleção 'Player'
function registrar() {
  var scoreRef = db.collection("Player");
  var lastScore = recordes[recordes.length - 1];

  if (recordes.length == 10) {
    console.log()
    db.collection('Player').doc(lastScore[0]).delete().then(() => {
      console.log("Pedido deletado");
      console.log(lastScore);
    })
      
    .catch(e => {
      console.error("Pedido não deletado ", e.message);
    });
  }

    db.collection('Player').add({
    Nick: nick,
    Plataform: plataforma,
    Score: pontuacao,
    Horario: firebase.firestore.FieldValue.serverTimestamp() // Pega o horário no ServerSide ao invés do ClientSide
  })
    
  .then(() => {
    analisar();
    pesquisar();
    console.log('Pedido adicionado');
  })
  
  .catch(e => {
    console.log('Pedido não adicionado ', e.message)
  })
}

// Pesquisando Recordes
pesquisar();

const game = new Phaser.Game(config);