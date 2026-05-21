class Scene4 extends SimpleScene {
    constructor() {
      super("Scene4");

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

      // Carregando arquivo HTML
      this.load.html("form", "form.html");
    }
  
    create() {

      // this.drawGrid();

      // Carrega as Fontes
      this.loading = this.add.text(450, 150, "", 0xFFFFFF);
      this.loading.setFontFamily('eight-bitIn');
      this.loading.setFontFamily('minecraft');

      // Pesquisando Dado - Recorde
      var score = recordes[0];
      
      // Criando Interface - Recorde
      this.titleRecord = this.add.text(960, 50, 'HI-SCORE').setOrigin(0.5, 0.0).setFontSize(40).setFontFamily('minecraft');
      this.record = this.add.text(960, 90, score[3]).setOrigin(0.5, 0.0).setFontSize(45).setFontFamily('minecraft');

      this.analise = analisar(pontuacao);
      console.log(this.analise);
      
      if (this.analise) {
        // Criando Interface - Titulo
        this.titulo = this.add.text(960, 480, 'NEW RECORD').setOrigin(0.5, 1.0).setFontSize(330).setFontFamily('eight-bitIn');

        // Criando Interface - Adicionar Nick
        this.nameInput = this.add.dom(960, 480).createFromCache("form").setOrigin(0.5, 0.5);

        // Criando Interface - Recorde
        this.recorde = this.add.text(960, 590, pontuacao).setOrigin(0.5, 0.5).setFontSize(60);

        // Criando Interface - Nivel
        this.nivel = this.add.text(960, 650, 'STAGE ' + (nivel + 1)).setOrigin(0.5, 0.5).setFontSize(45);
    
      } else {
        // Criando Interface - Titulo
        this.titulo = this.add.text(960, 480, 'GAME OVER').setOrigin(0.5, 1.0).setFontSize(330).setFontFamily('eight-bitIn');

        // Criando Interface - Recorde
        this.recorde = this.add.text(960, 540, pontuacao).setOrigin(0.5, 0.5).setFontSize(60);

        // Criando Interface - Nivel
        this.nivel = this.add.text(960, 600, 'STAGE ' + (nivel + 1)).setOrigin(0.5, 0.5).setFontSize(45);
      }

      // Botao Play Again
      this.botaoBordaPlayAgain = this.add.rectangle(960, 750, 450, 110, 0xFFFFFF);
      this.botaoPlayAgain = this.add.rectangle(960, 750, 440, 100, 0x000000);
      this.botaoTextoPlayAgain = this.add.text(960, 755, "PLAY AGAIN").setFontSize(65).setOrigin(0.5, 0.5);
      this.botaoPlayAgain.enableClick();

      // Botao Scoreboard
      this.botaoBordaScoreboard = this.add.rectangle(960, 870, 400, 90, 0xFFFFFF);
      this.botaoScoreboard = this.add.rectangle(960, 870, 390, 80, 0x000000);
      this.botaoTextoScoreboard = this.add.text(960, 875, 'Scoreboard').setFontSize(50).setOrigin(0.5, 0.5);
      this.botaoScoreboard.enableClick();

      // Botao Lobby
      this.botaoBordaLobby = this.add.rectangle(960, 985, 400, 90, 0xFFFFFF);
      this.botaoLobby = this.add.rectangle(960, 985, 390, 80, 0x000000);
      this.botaoTextoLobby = this.add.text(960, 990, 'Lobby').setFontSize(50).setOrigin(0.5, 0.5);  
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

      if (this.analise){
        let input = this.nameInput.getChildByName("textarea");

        if (input != null) {
          nick = input.value;
          // Executando Funcao - Recomecar Jogo
          if (this.botaoPlayAgain.wasClicked() && nick.length == 3){
            console.log(nick);
            registrar();
            
            if (mobile){
              this.scene.start('Scene5');
            } else {
              this.scene.start('Scene3');
            }
          }
    
          // Executando Funcao - Acessar Scoreboard
          if (this.botaoScoreboard.wasClicked() && nick.length == 3){
            console.log(nick);
            registrar();
            
            this.scene.start('Scene6');
          }
      
          // Executando Funcao - Voltar Lobby
          if (this.botaoLobby.wasClicked() && nick.length == 3){
            console.log(nick);
            registrar();
            
            this.scene.start('Scene2');
          }
        }
        
      } else {
        // Executando Funcao - Recomecar Jogo
        if (this.botaoPlayAgain.wasClicked()){
          if (mobile){
            this.scene.start('Scene5');
          } else {
            this.scene.start('Scene3');
          }
        }
  
        // Executando Funcao - Acessar Scoreboard
        if (this.botaoScoreboard.wasClicked()){
          this.scene.start('Scene6');
        }
    
        // Executando Funcao - Voltar Lobby
        if (this.botaoLobby.wasClicked()){
          this.scene.start('Scene2');
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