// Criando as Variáveis
var fase = 0;
var test = 1;
var opacity = 1.0;

class Scene1 extends SimpleScene {
  constructor() {
    super("Scene1");
  }
  
  init() {
    this.scale.fullscreenTarget = document.getElementById("phaser-div");
  }

  preload() {    
    // Carregando as Logos
    this.load.image('DVD', 'assets/img/dvd_logo.png');
    this.load.image('Phaser', 'assets/img/phaser_logo.png');
  }
  
  create() {    
    // Criando os Timer(s)
    this.startTime = this.add.timer(1000);
    this.testTime = this.add.timer(200);
    this.testTime.pause();

    // Carregando as Fontes
    this.loading = this.add.text(450, 150, "", 0xFFFFFF);
    this.loading.setFontFamily('eight-bitIn');
    this.loading.setFontFamily('eight-bitOut');
    this.loading.setFontFamily('minecraft');
    this.loading.setFontFamily('super-Mario-Bros');
  }
  
  update() {
    switch (fase){
      case 0:
        if (this.startTime.isUp()) {
          this.testTime.unpause();
          this.startTime.pause();
        }

        if (this.testTime.isUp() && opacity >= -0.10) {
          switch (test){
            case 1:
              this.test1 = this.add.text(960, 460, "SCREEM   RAM   OK", 0xFFFFFF).setOrigin(0.5, 0.5).setFontSize(40);
              break;
            
            case 2:
              this.test2 = this.add.text(960, 500, "DESKTOP  RAM   OK", 0xFFFFFF).setOrigin(0.5, 0.5).setFontSize(40);
              break;

            case 3:
              this.test3 = this.add.text(960, 540, "MOBILE   RAM   OK", 0xFFFFFF).setOrigin(0.5, 0.5).setFontSize(40);
              break;

            case 4:
              this.test4 = this.add.text(960, 580, "CONTROLS  RAM   OK", 0xFFFFFF).setOrigin(0.5, 0.5).setFontSize(40);
              break;

            case 5:
              this.test5 = this.add.text(960, 620, "L-R SOUND RAM   OK", 0xFFFFFF).setOrigin(0.5, 0.5).setFontSize(40);
              break;

            default:
              opacity -= 0.20;
              this.test1.alpha = opacity;
              this.test2.alpha = opacity;
              this.test3.alpha = opacity;
              this.test4.alpha = opacity;
              this.test5.alpha = opacity;
              break;
          }
          test += 1;
        }

        if (opacity < 0) {
          fase += 1;
          this.testTime.pause();
          this.startTime.unpause();
          opacity = 1.75;
        }
      break;

      case 1:
        if (this.startTime.isUp()) {
          this.dvd = this.add.image(960, 540, 'DVD').setOrigin(0.5, 0.5).setScale(1.2);

          this.subTitle = this.add.text(960, 740, 'Games', 0xd4d4d4).setFontFamily('eight-bitIn').setOrigin(0.5, 0.5).setFontSize(120);

          this.madeWith = this.add.text(835, 1030, 'Made with').setOrigin(0.5, 1.0).setFontSize(40);

          this.phaser = this.add.image(1060, 1030, 'Phaser').setOrigin(0.5, 0.53).setScale(0.6);

          this.startTime.pause();
          this.testTime.unpause();
        }

        if (this.testTime.isUp()) {
          opacity -= 0.15;
          this.dvd.alpha = opacity; 
          this.subTitle.alpha = opacity;
          this.phaser.alpha = opacity;
          this.madeWith.alpha = opacity;
        }

        if (opacity < -0.15) {
          this.scene.start('Scene2');
        }
        break;
    }
  }
}