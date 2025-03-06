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
  }

  create() {
    // Carrega as Fontes
    this.loading = this.add.text(450, 150, "", 0xFFFFFF);
    this.loading.setFontFamily('eight-bitIn');
    this.loading.setFontFamily('eight-bitOut');
    this.loading.setFontFamily('minecraft');
    this.loading.setFontFamily('super-Mario-Bros');

    /*
    // Pesquisando Dado - Recorde
    var score = recordes[0];

    // Criando Interface - Recorde
    this.titleRecord = this.add.text(960, 50, 'HI-SCORE').setOrigin(0.5, 0.0).setFontSize(35).setFontFamily('minecraft');
    this.record = this.add.text(960, 90, score[3]).setOrigin(0.5, 0.0).setFontSize(45).setFontFamily('minecraft');
    */

    // Botao FullScreen
    this.botaoFullscreen = this.add.image(1870, 50, 'Fullscreen').setScale(0.65, 0.65).setOrigin(1.0, 0.0);
    this.botaoFullscreen.enableClick();
  }

  update() {
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