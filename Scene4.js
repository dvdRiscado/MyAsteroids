class Scene4 extends SimpleScene {
    constructor() {
      super("Scene4");
    }
    init() {
      
    }
  
    preload() {
      // Carregando imagens
      this.load.image('Fullscreen', 'assets/img/Icon - Fullscreen.png');
      this.load.image('AsteroidPq', 'assets/img/Esboco - AsteroidPq.png');
      this.load.image('AsteroidMd', 'assets/img/Esboco - AsteroidMd.png');
      this.load.image('AsteroidGr', 'assets/img/Esboco - AsteroidGr.png');

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
    }
  
    update() {

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
    }
  }