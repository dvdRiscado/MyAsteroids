class Scene6 extends SimpleScene {
    constructor() {
      super("Scene6");

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
      this.loading.setFontFamily('minecraft');

      // Criar Título
      this.titulo = this.add.text(960, 35, 'SCOREBOARD').setOrigin(0.5, 0.0).setFontSize(220).setFontFamily('eight-bitIn');
  
      // Carregando Recordes
      for (var i = 0; i < recordes.length; i++) {
        var score = recordes[i];
        this.add.text(960, 270 + (60 * i), score[1] + ' - ' + score[3] + ' - ' + score[2]).setFontSize(45).setOrigin(0.5,0.5);
      }
      
      // Botao Lobby
      this.botaoBordaLobby = this.add.rectangle(960, 965, 400, 90, 0xFFFFFF);
      this.botaoLobby = this.add.rectangle(960, 965, 390, 80, 0x000000);
      this.botaoTextoLobby = this.add.text(960, 965, 'Lobby').setFontSize(50).setOrigin(0.5, 0.5);
    
      this.botaoLobby.enableClick();

      // Botao FullScreen
      this.botaoFullscreen = this.add.image(1870, 50, 'Fullscreen').setScale(0.65, 0.65).setOrigin(1.0, 0.0);
      this.botaoFullscreen.enableClick();

      // Criando Objetos para Armazenamento
    this.arrayAsteroidPeq = [];
    this.arrayAsteroidMed = [];
    this.arrayAsteroidGra = [];

    // Criando Objetos para Execução
    this.tempoAsteroidPeq = this.add.timer(800);
    this.tempoAsteroidMed = this.add.timer(16000);
    this.tempoAsteroidGra = this.add.timer(32000);
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

      // Executando Luncao - Botao Lobby
      if(this.botaoLobby.wasClicked()){
        this.scene.start('Scene2');
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