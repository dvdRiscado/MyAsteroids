class Scene6 extends SimpleScene {
    constructor() {
      super("Scene6");
    }
    init() {
    
    }
  
    preload() {      
      // Carregando imagens
      this.load.image('Fullscreen', 'assets/img/Icon - Fullscreen.png');
      this.load.image('AsteroidPq', 'assets/img/Esboco - AsteroidPq.png');
      this.load.image('AsteroidMd', 'assets/img/Esboco - AsteroidMd.png');
      this.load.image('AsteroidGr', 'assets/img/Esboco - AsteroidGr.png');
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
    }
  
    update() {
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
  }