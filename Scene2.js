class Scene2 extends SimpleScene {
  constructor() {
    super("Scene2");

    // Largura e Altura - Mínima e Máxima
    this.minX = -50;
    this.minY = -50;
    this.maxX = 1970;
    this.maxY = 1130;
  }
  init() {

  }

  preload() {
    // Carregando imagens
    this.load.image('Fullscreen', 'assets/img/Icon - Fullscreen.png');
    this.load.image('Asteroid-1-Pq', 'assets/img/asteroid-sprite-1-small.png');
    this.load.image('Asteroid-1-Md', 'assets/img/asteroid-sprite-1-medium.png');
    this.load.image('Asteroid-1-Gr', 'assets/img/asteroid-sprite-1-big.png');

    
    this.load.image('Asteroid-2-Pq', 'assets/img/asteroid-sprite-2-small.png');
    this.load.image('Asteroid-2-Md', 'assets/img/asteroid-sprite-2-medium.png');
    this.load.image('Asteroid-2-Gr', 'assets/img/asteroid-sprite-2-big.png');

    
    this.load.image('Asteroid-3-Pq', 'assets/img/asteroid-sprite-3-small.png');
    this.load.image('Asteroid-3-Md', 'assets/img/asteroid-sprite-3-medium.png');
    this.load.image('Asteroid-3-Gr', 'assets/img/asteroid-sprite-3-big.png');
  }

  create() {    
    // Carrega as Fontes
    this.loading = this.add.text(450, 150, "", 0xFFFFFF);
    this.loading.setFontFamily('eight-bitIn');
    this.loading.setFontFamily('eight-bitOut');
    this.loading.setFontFamily('minecraft');
    this.loading.setFontFamily('super-Mario-Bros');

    // Criar Título
    this.titulo = this.add.text(960, 510, 'Asteroids').setOrigin(0.5, 0.5).setFontSize(240).setFontFamily('eight-bitIn');
    // Criar Sub-título
    this.subtitulo = this.add.text(560, 440, 'New').setOrigin(0.5, 0.5).setFontSize(140).setFontFamily('eight-bitIn');

    // Pesquisando Dado - Recorde
    var score = recordes[0];
    
    // Criando Interface - Recorde
    this.titleRecord = this.add.text(960, 50, 'HI-SCORE').setOrigin(0.5, 0.0).setFontSize(40).setFontFamily('minecraft');
    this.record = this.add.text(960, 90, score[3]).setOrigin(0.5, 0.0).setFontSize(45).setFontFamily('minecraft');

    // Criar Autoria
    this.autoria = this.add.text(960, 1030, 'NEW ASTEROIDS by DVD GAMES').setOrigin(0.5, 1.0).setFontSize(35).setFontFamily('minecraft');

    // Criando Objetos para Armazenamento
    this.arrayAsteroidPeq = [];
    this.arrayAsteroidMed = [];
    this.arrayAsteroidGra = [];

    // Criando Objetos para Execução
    this.tempoAsteroidPeq = this.add.timer(800);
    this.tempoAsteroidMed = this.add.timer(16000);
    this.tempoAsteroidGra = this.add.timer(32000);

    // Start the Game
    this.botaoBordaStart = this.add.rectangle(960, 700, 390, 110, 0xFFFFFF);
    this.botaoStart = this.add.rectangle(960, 700, 380, 100, 0x000000);
    this.botaoTextoStart = this.add.text(960, 705, 'PLAY').setFontSize(70).setOrigin(0.5, 0.5);

    this.botaoStart.enableClick();

    // Botao Começar
    this.botaoBordaPC = this.add.rectangle(960, 520, 450, 110, 0xFFFFFF);
    this.botaoPC = this.add.rectangle(960, 520, 440, 100, 0x000000);
    this.botaoTextoPC = this.add.text(960, 525, "Start").setFontSize(70).setOrigin(0.5, 0.5);

    this.botaoPC.enableClick();

    this.botaoBordaPC.visible = false;
    this.botaoPC.visible = false;
    this.botaoTextoPC.visible = false;

    // Botao Scoreboard
    this.botaoBordaScoreboard = this.add.rectangle(960, 640, 425, 90, 0xFFFFFF);
    this.botaoScoreboard = this.add.rectangle(960, 640, 415, 80, 0x000000);
    this.botaoTextoScoreboard = this.add.text(960, 645, 'Scoreboard').setFontSize(50).setOrigin(0.5, 0.5);

    this.botaoScoreboard.enableClick();

    this.botaoBordaScoreboard.visible = false;
    this.botaoScoreboard.visible = false;
    this.botaoTextoScoreboard.visible = false;

    // Botao Options
    this.botaoBordaOptions = this.add.rectangle(960, 750, 400, 90, 0xFFFFFF);
    this.botaoOptions = this.add.rectangle(960, 750, 390, 80, 0x000000);
    this.botaoTextoOptions = this.add.text(960, 755, 'Options').setFontSize(50).setOrigin(0.5, 0.5);

    this.botaoOptions.enableClick();

    this.botaoBordaOptions.visible = false;
    this.botaoOptions.visible = false;
    this.botaoTextoOptions.visible = false;

    // Botao Credits
    this.botaoBordaCredits = this.add.rectangle(960, 860, 400, 90, 0xFFFFFF);
    this.botaoCredits = this.add.rectangle(960, 860, 390, 80, 0x000000);
    this.botaoTextoCredits = this.add.text(960, 865, 'Credits').setFontSize(50).setOrigin(0.5, 0.5);

    this.botaoCredits.enableClick();

    this.botaoBordaCredits.visible = false;
    this.botaoCredits.visible = false;
    this.botaoTextoCredits.visible = false;

    // Botao FullScreen
    this.botaoFullscreen = this.add.image(1870, 50, 'Fullscreen').setScale(0.65, 0.65).setOrigin(1.0, 0.0);
    this.botaoFullscreen.enableClick();
  }
  
  update() {
    // Criando um Asteroide Pequeno
    if(this.tempoAsteroidPeq.isUp()){
      if(this.arrayAsteroidPeq.length <= 10){
        this.asteroidPequeno();
        this.tempoAsteroiePeq = this.add.timer(random(2000, 3000));
      }
    }

    // Criando um Asteroide Medio
    if(this.tempoAsteroidMed.isUp()){
      if(this.arrayAsteroidMed.length <= 5){
        this.asteroidMedio();
        this.tempoAsteroidMed = this.add.timer(random(20000, 30000)); 
      }
    }

    // Criando um Asteroide Grande
    if(this.tempoAsteroidGra.isUp()){
      if(this.arrayAsteroidGra.length <= 2){
        this.asteroidGrande();
        this.tempoAsteroidGra = this.add.timer(random(50000, 70000)); 
      }
    }

    // Definindo limites - Asteroid Pequeno
    for(let ast of this.arrayAsteroidPeq) {
      if (ast.x < this.minX) {
        ast.x = this.maxX;
      }
      if (ast.y < this.minY) {
        ast.y = this.maxY;
      }
      if (ast.x > this.maxX) {
        ast.x = this.minX;
      }
      if (ast.y > this.maxY) {
        ast.y = this.minY;
      }
    }

    // Definindo limites - Asteroid Medio
    for(let ast of this.arrayAsteroidMed) {
      if (ast.x < this.minX) {
        ast.x = this.maxX;
      }
      if (ast.y < this.minY) {
        ast.y = this.maxY;
      }
      if (ast.x > this.maxX) {
        ast.x = this.minX;
      }
      if (ast.y > this.maxY) {
        ast.y = this.minY;
      }
    }

    // Definindo limites - Asteroid Grande
    for(let ast of this.arrayAsteroidGra) {
      if (ast.x < this.minX) {
        ast.x = this.maxX;
      }
      if (ast.y < this.minY) {
        ast.y = this.maxY;
      }
      if (ast.x > this.maxX) {
        ast.x = this.minX;
      }
      if (ast.y > this.maxY) {
        ast.y = this.minY;
      }
    }

    // Executando Funcao - Tela Cheia
    if(this.botaoFullscreen.wasClicked()){
      if(!fullscreen){
        
        this.scale.startFullscreen();
        fullscreen = true;
      } else if(fullscreen){

        this.scale.stopFullscreen();
        fullscreen = false;
      }
    }

    // Executando Funcao - Botao Start
    if(this.botaoStart.wasClicked()){

      this.titulo.y -= 200;
      this.subtitulo.y -= 200;

      this.botaoBordaStart.visible = false;
      this.botaoStart.visible = false;
      this.botaoTextoStart.visible = false;

      this.botaoBordaPC.visible = true;
      this.botaoPC.visible = true;
      this.botaoTextoPC.visible = true;

      this.botaoBordaScoreboard.visible = true;
      this.botaoScoreboard.visible = true;
      this.botaoTextoScoreboard.visible = true;

      this.botaoBordaOptions.visible = true;
      this.botaoOptions.visible = true;
      this.botaoTextoOptions.visible = true;

      this.botaoBordaCredits.visible = true;
      this.botaoCredits.visible = true;
      this.botaoTextoCredits.visible = true;
    }

    // Executando Funcao - Botao PC
    if (this.botaoPC.wasClicked()){
      if(mobile){
        this.scene.start('Scene5');
      } else {
        this.scene.start('Scene3');
      }
    }

    // Executando Funcao - Botao Scoreboard
    if (this.botaoScoreboard.wasClicked()){
      this.scene.start('Scene6');
    }
  }

  // Criando uma nova função - Asteroide Pequeno
  asteroidPequeno(){
    let y = random(0, 500); // Criando variáveis
    let sprite = random(1, 3);
    let pequeno = this.physics.add.sprite(this.minX, y, 'Asteroid-' + sprite + '-Pq').setScale(1.0); // Criando o Asteroide
    this.arrayAsteroidPeq.push(pequeno); // Colocando Asteroide em uma Matriz
    pequeno.angle += random(0, 360); // Editando propriedades do Asteroide
    this.physics.velocityFromRotation(pequeno.rotation, random(50, 150), pequeno.body.velocity); // Criando movimentação do Asteroide
  }

  // Criando uma nova função - Asteroide Medio
  asteroidMedio(){
    let y = random(0, 500);
    let sprite = random(1, 3);
    let medio = this.physics.add.sprite(this.maxX, y, 'Asteroid-' + sprite + '-Md').setScale(1.0);
    this.arrayAsteroidMed.push(medio);
    medio.angle += random(0, 360);
    this.physics.velocityFromRotation(medio.rotation, random(50, 100), medio.body.velocity);
  }

  // Criando uma nova função - Asteroide Grande
  asteroidGrande(){
    let y = random(0, 500);
    let sprite = random(1, 3);
    let grande = this.physics.add.sprite(this.maxX, y, 'Asteroid-' + sprite + '-Gr').setScale(1.0);
    this.arrayAsteroidGra.push(grande);
    grande.angle += random(0, 360);
    this.physics.velocityFromRotation(grande.rotation, random(50, 75), grande.body.velocity);
  }
}