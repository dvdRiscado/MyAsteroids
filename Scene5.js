class Scene5 extends SimpleScene {
  constructor() {
    super("Scene5");

    // Largura e Altura - Mínima e Máxima
    this.minX = -150;
    this.minY = -150;
    this.maxX = 2070;
    this.maxY = 1230;
  }

  init() {

  }

  preload() {

    // Carregando imagens
    this.load.image('Nave', 'assets/img/Pixel - Nave.png');
    this.load.image('Shoot', 'assets/img/Pixel - Tiro.png');
    this.load.audio('musica', 'assets/audio/8Bit - We Will Rock You.mp3');

    this.load.image('AsteroidPq', 'assets/img/Esboco - AsteroidPq.png');
    this.load.image('AsteroidMd', 'assets/img/Esboco - AsteroidMd.png');
    this.load.image('AsteroidGr', 'assets/img/Esboco - AsteroidGr.png');

    this.load.image('MeteorPq', 'assets/img/Esboco - MeteorPq.png');
    this.load.image('MeteorMd', 'assets/img/Esboco - MeteorMd.png');
    this.load.image('MeteorGr', 'assets/img/Esboco - MeteorGr.png');

    this.load.image('CometPq', 'assets/img/Esboco - CometPq.png');
    this.load.image('CometMd', 'assets/img/Esboco - CometMd.png');
    this.load.image('CometGr', 'assets/img/Esboco - CometGr.png');

    this.load.image('AlienPq', 'assets/img/Esboco - AlienPq.png');
    this.load.image('AlienShoot', 'assets/img/Esboco - AlienTiro.png')
  }

  create() {

    // Carrega as Fontes
    this.loading = this.add.text(450, 150, "", 0xFFFFFF);
    this.loading.setFontFamily('minecraft');

    this.carga = 100;

    pontuacao = 0;
    nivel = 0;

    // Criando objetos para armazenamento e execução

    // Tiro
    this.arrayShoot = [];

    // Asteroids
    this.arrayAsteroidPeq = [];
    this.arrayAsteroidMed = [];
    this.arrayAsteroidGra = [];

    // Asteroid Mega
    this.arrayAsteroidMega = [];

    // Meteors
    this.arrayMeteorPeq = [];
    this.arrayMeteorMed = [];
    this.arrayMeteorGra = [];

    // Comet
    this.arrayCometPeq = [];
    this.arrayCometMed = [];
    this.arrayCometGra = [];

    // Alien
    this.arrayAlienPeq = [];

    // Alien Tiro
    this.arrayAlienShoot = [];

    // Criando as colisões com os Aliens
    this.physics.add.collider(this.arrayAsteroidPeq, this.arrayAlienPeq);
    this.physics.add.collider(this.arrayAsteroidMed, this.arrayAlienPeq);
    this.physics.add.collider(this.arrayAsteroidGra, this.arrayAlienPeq);
    this.physics.add.collider(this.arrayAlienPeq, this.arrayAlienPeq);

    // Criando Objetos para Execução
    this.tempoAsteroidPeq = this.add.timer(500);
    this.tempoAsteroidMed = this.add.timer(1500);
    this.tempoAsteroidGra = this.add.timer(2500);

    this.tempoMeteorPeq = this.add.timer(4000);
    this.tempoMeteorMed = this.add.timer(8000);
    this.tempoMeteorGra = this.add.timer(12000);

    this.tempoMeteorPeq.pause();
    this.tempoMeteorMed.pause();
    this.tempoMeteorGra.pause();

    this.tempoCometPeq = this.add.timer(1000);
    this.tempoCometMed = this.add.timer(2000);
    this.tempoCometGra = this.add.timer(3000);

    this.tempoCometPeq.pause();
    this.tempoCometMed.pause();
    this.tempoCometGra.pause();

    this.reajusteCometPeq = this.add.timer(25);
    this.reajusteCometMed = this.add.timer(50);

    this.reajusteCometPeq.pause();
    this.reajusteCometMed.pause();

    this.spawnCometPeq = this.add.timer(15000);
    this.spawnCometMed = this.add.timer(20000);

    this.spawnCometPeq.pause();
    this.spawnCometMed.pause();

    this.tempoAlienPeq = this.add.timer(30000);

    this.tempoSpawnAlienShoot = this.add.timer(3000);

    this.tempoAsteroidMega = this.add.timer(7000, 1);
 
    /* EM PAUSE
    // Criando objetos para adicionar música 
    this.musica = this.sound.add('musica');
    */

    this.scale.fullscreenTarget = document.getElementById('phaser-div');

    // Criando a Nave
    this.nave = this.physics.add.image(960, 510, 'Nave').setOrigin(0.5, 0.5).setScale(2.0);
    this.nave.angle -= 90;

    // Criando Touch da Tela
    this.input.addPointer(1);

    // Editando propriedades da Nave
    this.nave.setDamping(true);
    this.nave.setDrag(0.99);
    this.nave.setData('life', 3);
    this.nave.setData('status', 0);
    this.nave.setMaxVelocity(200);

    // Criando função nos botões - Movimentação
    this.botaoAvancar = this.add.rectangle(0, 580, 850, 250, 0xFFFFFF).setOrigin(0, 0);
    this.botaoAvancar.alpha = 0.1;
    this.botaoAvancar.enableClick();
    this.botaoEsquerda = this.add.rectangle(0, 830, 425, 250, 0x00FF00).setOrigin(0, 0);
    this.botaoEsquerda.alpha = 0.1;
    this.botaoEsquerda.enableClick();
    this.botaoDireita = this.add.rectangle(425, 830, 425, 250, 0x0000FF).setOrigin(0, 0);
    this.botaoDireita.alpha = 0.1;
    this.botaoDireita.enableClick();

    // Teste Joystick
    // this.joystickArea = this.add.circle(200, 225, 180, 0xFFFFFF);
    // this.joystickArea.alpha = 0.1;

    this.botaoAtirar = this.add.rectangle(1070, 580, 850, 500, 0x00FF00).setOrigin(0, 0);
    this.botaoAtirar.alpha = 0.1;
    this.botaoAtirar.enableClick();

    // Criando Interface - Pontuação
    this.pontuacao = this.add.text(55, 50, pontuacao, 0xFFFFFF).setOrigin(0.0, 0.0).setFontSize(40);

    // Criando Interface - Nível
    this.stage = this.add.text(960, 50, 'STAGE ' + (nivel + 1), 0xFFFFFF).setOrigin(0.5, 0.0).setFontSize(40);

    // Criando Interface - Alerta
    this.alert = this.add.text(960, 90, '').setOrigin(0.5, 0.0).setFontSize(25);
    this.alert.alpha = 0.0;

    this.tempoAlert = this.add.timer(10000);
    this.tempoAlert.pause();

    // Criando Interface - Vidas
    this.vidas = [];
    for (var i = 0; i < 3; i++) {
      let vida;

      vida = this.add.sprite(((this.vidas.length * 45) + 50), 130, 'Nave').setOrigin(0.0, 0.0).setScale(1.5);
      vida.angle -= 90;

      this.vidas.push(vida);
    }

    // Criando Tempo de Invulnerabilidade
    this.tempoNaveImortal = this.add.timer(3000);
    this.tempoNaveImortal.pause();
  }

  // Criando uma nova função - Tiro
  fire() {
    let shoot = this.physics.add.sprite(this.nave.x, this.nave.y, 'Shoot');
    this.arrayShoot.push(shoot);
    shoot.setScale(0.5);
    shoot.setCircle(10);
    shoot.rotation = this.nave.rotation;
    shoot.velocity = 220;
    this.physics.velocityFromRotation(shoot.rotation, shoot.velocity, shoot.body.velocity);
  }

  // Criando uma nova função - Asteroide Pequeno
  asteroidPequeno() {
    let y = random(0, 500); // Criando variáveis
    let pequeno;

    if (random(0, 1) == 0) { // Escolhendo qual lado irá aparecer
      pequeno = this.physics.add.sprite(this.minX, y, 'AsteroidPq').setScale(1.0); // Criando o Asteroide
    } else {
      pequeno = this.physics.add.sprite(this.maxX, y, 'AsteroidPq').setScale(1.0); // Criando o Asteroide
    }

    this.arrayAsteroidPeq.push(pequeno); // Colocando Asteroide em uma Matriz
    pequeno.setBounce(1, 1);
    pequeno.angle += random(0, 360); // Editando o ângulo do Asteroide
    pequeno.velocity = random(50, 150); // Editando a velocidade do Asteroide
    pequeno.setCircle(17.5); // Editando a hitbox circular do Asteroide
    this.physics.velocityFromRotation(pequeno.rotation, pequeno.velocity, pequeno.body.velocity); // Criando movimentação do Asteroide
  }

  // Criando uma nova função - Asteroide Medio
  asteroidMedio() {
    let y = random(0, 500);
    let medio;

    if (random(0, 1) == 0) {
      medio = this.physics.add.sprite(this.minX, y, 'AsteroidMd').setScale(1.0);
    } else {
      medio = this.physics.add.sprite(this.maxX, y, 'AsteroidMd').setScale(1.0);
    }
    this.arrayAsteroidMed.push(medio);
    medio.setBounce(1, 1);
    medio.setImmovable();
    medio.angle += random(0, 360);
    medio.velocity = random(50, 100);
    medio.setCircle(35);
    this.physics.velocityFromRotation(medio.rotation, medio.velocity, medio.body.velocity);
  }

  // Criando uma nova função - Asteroide Grande
  asteroidGrande() {
    let y = random(0, 500);
    let grande;

    if (random(0, 1) == 0) {
      grande = this.physics.add.sprite(this.minX, y, 'AsteroidGr').setScale(1.0);
    } else {
      grande = this.physics.add.sprite(this.maxX, y, 'AsteroidGr').setScale(1.0);
    }
    this.arrayAsteroidGra.push(grande);
    grande.setBounce(1, 1);
    grande.setImmovable();
    grande.angle += random(0, 360);
    grande.velocity = random(50, 75);
    grande.setCircle(70);
    this.physics.velocityFromRotation(grande.rotation, grande.velocity, grande.body.velocity);
  }

  // Criando uma nova função - Meteoro Pequeno
  meteorPequeno() {
    let y = random(0, 500);
    let pequeno;

    if (random(0, 1) == 0) {
      pequeno = this.physics.add.sprite(this.minX, y, 'MeteorPq');
    } else {
      pequeno = this.physics.add.sprite(this.maxX, y, 'MeteorPq');
    }

    pequeno.setData('life', random(2, 3));

    this.arrayMeteorPeq.push(pequeno);
    pequeno.angle += random(0, 360);
    pequeno.velocity = random(75, 175);
    pequeno.setCircle(20);
    this.physics.velocityFromRotation(pequeno.rotation, pequeno.velocity, pequeno.body.velocity);
  }

  // Criando uma nova função - Meteoro Medio
  meteorMedio() {
    let y = random(0, 500);
    let medio;

    if (random(0, 1) == 0) {
      medio = this.physics.add.sprite(this.minX, y, 'MeteorMd');
    } else {
      medio = this.physics.add.sprite(this.maxX, y, 'MeteorMd');
    }

    medio.setData('life', random(4, 5));

    this.arrayMeteorMed.push(medio);
    medio.angle += random(0, 360);
    medio.velocity = random(75, 150);
    medio.setCircle(40);
    this.physics.velocityFromRotation(medio.rotation, medio.velocity, medio.body.velocity);
  }

  // Criando uma nova função - Meteoro Grande
  meteorGrande() {
    let y = random(0, 500);
    let grande;

    if (random(0, 1) == 0) {
      grande = this.physics.add.sprite(this.minX, y, 'MeteorGr');
    } else {
      grande = this.physics.add.sprite(this.maxX, y, 'MeteorGr');
    }

    grande.setData('life', random(6, 7));

    this.arrayMeteorGra.push(grande);
    grande.angle += random(0, 360);
    grande.velocity = random(75, 125);
    grande.setCircle(80);
    this.physics.velocityFromRotation(grande.rotation, grande.velocity, grande.body.velocity);
  }

  // Criando uma nova função - Cometa Pequeno
  cometPequeno() {
    let y = random(0, 500);
    let pequeno;

    if (random(0, 1) == 0) {
      pequeno = this.physics.add.sprite(this.minX, y, 'CometPq');
    } else {
      pequeno = this.physics.add.sprite(this.maxX, y, 'CometPq');
    }

    this.arrayCometPeq.push(pequeno);
    pequeno.body.setBounce(1, 1).setMaxSpeed(240);
    pequeno.angle += random(0, 360);
    pequeno.setCircle(15);
    this.physics.velocityFromRotation(pequeno.rotation, 120, pequeno.body.velocity);
  }

  // Criando uma nova função - Cometa Medio
  cometMedio() {
    let y = random(0, 500);
    let medio;

    if (random(0, 1) == 0) {
      medio = this.physics.add.sprite(this.minX, y, 'CometMd');
    } else {
      medio = this.physics.add.sprite(this.maxX, y, 'CometMd');
    }

    this.arrayCometMed.push(medio);
    medio.body.setBounce(1, 1).setMaxSpeed(120);
    medio.angle += random(0, 360);
    medio.setCircle(30);
    this.physics.velocityFromRotation(medio.rotation, 60, medio.body.velocity);
  }

  // Criando uma nova função - Cometa Grande
  cometGrande() {
    let y = random(0, 500);
    let grande;

    if (random(0, 1) == 0) {
      grande = this.physics.add.sprite(this.minX, y, 'CometGr');
    } else {
      grande = this.physics.add.sprite(this.maxX, y, 'CometGr');
    }

    this.arrayCometGra.push(grande);
    grande.angle += random(0, 360);
    grande.velocity = random(30, 60);
    grande.setData('life', 5);
    grande.setCircle(60);
    this.physics.velocityFromRotation(grande.rotation, grande.velocity, grande.body.velocity);
  }

  // Criando uma nova função - Alien Tiro
  alienFire() {
    for (let nav of this.arrayAlienPeq) {
      let shoot = this.physics.add.sprite(nav.x, nav.y, 'AlienShoot');
      this.arrayAlienShoot.push(shoot);
      shoot.setCircle(5);
      shoot.velocity = 220;

      this.physics.moveToObject(shoot, this.nave, shoot.velocity);

      /*
      this.velocity = shoot.velocity * 0.0001;
      this.target = Phaser.Math.Angle.BetweenPoints(shoot, this.nave);
      this.current = Phaser.Math.Angle.RotateTo(shoot.rotation, this.target, this.velocity);
      shoot.rotation = this.current;
 
      this.physics.velocityFromRotation(shoot.rotation, shoot.velocity, shoot.body.velocity);
      */
    }
  }

  // Criando uma nova função - Alien Pequeno
  alienPequeno() {
    let y = random(0, 500);
    let pequeno;

    if (random(0, 1) == 0) {
      pequeno = this.physics.add.sprite(this.minX, y, 'AlienPq').setOrigin(0.5, 0.5).setScale(2.0);
    } else {
      pequeno = this.physics.add.sprite(this.maxX, y, 'AlienPq').setOrigin(0.5, 0.5).setScale(2.0);
    }

    this.arrayAlienPeq.push(pequeno);
    pequeno.body.setBounce(1, 1).setMaxSpeed(125);
    pequeno.angle += random(0, 360);
    pequeno.velocity = 125;
    this.physics.moveTo(pequeno, random(0, 1950), random(0, 1080), pequeno.velocity);
    // this.physics.velocityFromRotation(pequeno.rotation, pequeno.velocity, pequeno.body.velocity);
  }

  // Criando uma nova função - Asteroide Mega
  asteroidMega() {
    let y = random(0, 500);
    let mega;

    if (random(0, 1) == 0) {
      mega = this.physics.add.sprite((this.minX - 350), y, 'AsteroidGr').setScale(1.5);
    } else {
      mega = this.physics.add.sprite((this.maxX + 350), y, 'AsteroidGr').setScale(1.5);
    }

    mega.setData('life', 65);

    this.arrayAsteroidMega.push(mega);
    mega.velocity = 70;
    this.physics.moveToObject(mega, this.nave, mega.velocity);
  }

  update() {

    if (pontuacao / this.carga >= 1.0) {
      this.carga += 100;

      if (this.vidas.length < 3) {
        this.nave.data.values.life += 1;
        let vida;

        vida = this.add.sprite(((this.vidas.length * 45) + 50), 130, 'Nave').setOrigin(0.0, 0.0).setScale(1.5);
        vida.angle -= 90;

        this.vidas.push(vida);
      }
    }

    // Passando de Nível
    if (pontuacao >= 150 && pontuacao < 500) {
      nivel = 1;
      this.stage.setText('STAGE ' + (nivel + 1));

      this.tempoMeteorPeq.unpause();
      this.tempoMeteorMed.unpause();
      this.tempoMeteorGra.unpause();

    } else if (pontuacao >= 500 && pontuacao < 750) {
      nivel = 2;
      this.stage.setText('STAGE ' + (nivel + 1));

      this.tempoCometPeq.unpause();
      this.tempoCometMed.unpause();
      this.tempoCometGra.unpause();

      this.reajusteCometPeq.unpause();
      this.reajusteCometMed.unpause();

      this.spawnCometPeq.unpause();
      this.spawnCometMed.unpause();

    } else if (pontuacao >= 750) {
      nivel = 3;
      this.stage.setText('STAGE ' + (nivel + 1));
    }

    if (this.reajusteCometPeq.isUp()) {
      for (let ast of this.arrayCometPeq) {
        this.physics.accelerateToObject(ast, this.nave, 200);
      }
    }

    if (this.reajusteCometMed.isUp()) {
      for (let ast of this.arrayCometMed) {
        this.physics.accelerateToObject(ast, this.nave, 100);
      }
    }

    if (this.spawnCometPeq.isUp()) {
      for (let ast of this.arrayCometGra) {
        let pequeno = this.physics.add.sprite(ast.x, ast.y, 'CometPq').setScale(1.0);
        pequeno.body.setBounce(1, 1).setMaxSpeed(200);

        this.arrayCometPeq.push(pequeno);
        pequeno.body.setBounce(1, 1).setMaxSpeed(240);
        pequeno.angle += random(0, 360);
        pequeno.setCircle(15);
        this.physics.velocityFromRotation(pequeno.rotation, 120, pequeno.body.velocity);
      }
    }

    if (this.spawnCometMed.isUp()) {
      for (let ast of this.arrayCometGra) {
        let medio = this.physics.add.sprite(ast.x, ast.y, 'CometMd').setScale(1.0);

        this.arrayCometMed.push(medio);
        medio.body.setBounce(1, 1).setMaxSpeed(120);
        medio.angle += random(0, 360);
        medio.setCircle(30);
        this.physics.velocityFromRotation(medio.rotation, 60, medio.body.velocity);
      }
    }

    if (this.tempoNaveImortal.isUp()) {
      this.tempoNaveImortal.pause();
      this.nave.data.values.status = 0;
      this.nave.alpha = 1.0;
    }

    if (this.tempoAlert.isUp()) {
      this.alert.alpha = 0.0;
      this.tempoAlert.pause();
    }

    // angle

    /* EM PAUSE
    if(start){
      start = false;
      this.musica.setLoop(true);
      this.musica.setVolume(0.05);
      this.musica.play();
    }
    */

    /*
      if (this.input.pointer1.isDown) {
        if (this.input.pointer1.x > 0 && this.input.pointer1.x < 850 && 
            this.input.pointer1.y > 580 && this.input.pointer1.y < 830) {
          this.physics.velocityFromRotation(this.nave.rotation, 100, this.nave.body.acceleration);
        } else {
          this.nave.setAcceleration(0);
        }

        if (this.input.pointer1.x > 0 && this.input.pointer1.x < 425 &&
            this.input.pointer1.y > 830 && this.input.pointer1.y < 1080) {
          this.nave.setAngularVelocity(-300);
        } else if (this.input.pointer1.x > 425 && this.input.pointer1.x < 850 &&
            this.input.pointer1.y > 830 && this.input.pointer1.y < 1080) {
          this.nave.setAngularVelocity(300);
        } else {
          this.nave.setAngularVelocity(0);
        }

        if (this.input.pointer1.x > 1070 && this.input.pointer1.x < 1920 &&
            this.input.pointer1.y > 580 && this.input.pointer1.y < 1080) {
          if (!fire) {
            this.fire();
            fire = true;
    
          } else {
            this.tempoTiro.unpause();
          }
          if (this.tempoTiro.isUp()) {
            this.fire();
          }
        } else {
          this.tempoTiro = this.add.timer(200);
          this.tempoTiro.pause();
          fire = false;
        }
      }
    */

    // Executando o spawn do Tiro
    if (this.botaoAtirar.isClicked()) {
      if (!fire) {
        this.fire();
        fire = true;

      } else {
        this.tempoTiro.unpause();
      }
      if (this.tempoTiro.isUp()) {
        this.fire();
      }
    } else {
      this.tempoTiro = this.add.timer(200);
      this.tempoTiro.pause();
      fire = false;
    }

    // Executando a movimentação da Nave - Frente
    if (this.botaoAvancar.isClicked()) {
      this.physics.velocityFromRotation(this.nave.rotation, 100, this.nave.body.acceleration);
    } else {
      this.nave.setAcceleration(0);
    }

    // Executando a movimentação da Nave - Direita e Esquerda
    if (this.botaoEsquerda.isClicked()) {
      this.nave.setAngularVelocity(-300);
    } else if (this.botaoDireita.isClicked()) {
      this.nave.setAngularVelocity(300);
    } else {
      this.nave.setAngularVelocity(0);
    }

    /*
    if (this.botaoAtirar.isClicked() && this.botaoAvancar.isClicked()) {
      this.physics.velocityFromRotation(this.nave.rotation, 100, this.nave.body.acceleration);
      
      if (!fire) {
        this.fire();
        fire = true;

      } else {
        this.tempoTiro.unpause();
      }
      if (this.tempoTiro.isUp()) {
        this.fire();
      }
    } else if (this.botaoAtirar.isClicked() && this.botaoEsquerda.isClicked()) {
      this.nave.setAngularVelocity(-300);

      if (!fire) {
        this.fire();
        fire = true;

      } else {
        this.tempoTiro.unpause();
      }
      if (this.tempoTiro.isUp()) {
        this.fire();
      }
    } else if (this.botaoAtirar.isClicked() && this.botaoDireita.isClicked()) {
      this.nave.setAngularVelocity(300);

      if (!fire) {
        this.fire();
        fire = true;

      } else {
        this.tempoTiro.unpause();
      }
      if (this.tempoTiro.isUp()) {
        this.fire();
      }
    } if (this.botaoAtirar.isClicked()) {
      
      if (!fire) {
        this.fire();
        fire = true;

      } else {
        this.tempoTiro.unpause();
      }
      if (this.tempoTiro.isUp()) {
        this.fire();
      }
    } else {
      this.nave.setAcceleration(0);
      this.nave.setAngularVelocity(0);

      this.tempoTiro = this.add.timer(200);
      this.tempoTiro.pause();
      fire = false;
    }
    */

    /*
    if (this.botaoAtirar.isClicked()) {
      if (!fire) {
        this.fire();
        fire = true;

      } else {
        this.tempoTiro.unpause();
      }
      if (this.tempoTiro.isUp()) {
        this.fire();
      }

      if (this.botaoAvancar.isClicked()) {
        this.physics.velocityFromRotation(this.nave.rotation, 100, this.nave.body.acceleration);
      } else {
        this.nave.setAcceleration(0);
      }

      if (this.botaoEsquerda.isClicked()) {
        this.nave.setAngularVelocity(-300);
      } else if (this.botaoDireita.isClicked()) {
        this.nave.setAngularVelocity(300);
      } else {
        this.nave.setAngularVelocity(0);
      }
    } else {
      this.nave.setAcceleration(0);
      this.nave.setAngularVelocity(0);
      
      this.tempoTiro = this.add.timer(200);
      this.tempoTiro.pause();
      fire = false;
    }
    */

    // Definindo limites - Nave
    if (this.nave.x < -50) {
      this.nave.x = 1970;
    }
    if (this.nave.y < -50) {
      this.nave.y = 1130;
    }
    if (this.nave.x > 1970) {
      this.nave.x = -50;
    }
    if (this.nave.y > 1130) {
      this.nave.y = -50;
    }

    // Definindo limites - Asteroid Pequeno
    for (let ast of this.arrayAsteroidPeq) {
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
    for (let ast of this.arrayAsteroidMed) {
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
    for (let ast of this.arrayAsteroidGra) {
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

    // Definindo limites - Asteroid Mega
    for (let ast of this.arrayAsteroidMega) {
      if (ast.x < (this.minX - 350)) {
        ast.destroy();
      }
      if (ast.y < (this.minY - 350)) {
        ast.destroy();
      }
      if (ast.x > (this.maxX + 350)) {
        ast.destroy();
      }
      if (ast.y > (this.maxY + 350)) {
        ast.destroy();
      }
    }

    // Definindo limites - Tiro
    for (let fir of this.arrayShoot) {
      if (fir.x < this.minX) {
        fir.destroy();
      }
      if (fir.y < this.minY) {
        fir.destroy();
      }
      if (fir.x > this.maxX) {
        fir.destroy();
      }
      if (fir.y > this.maxY) {
        fir.destroy();
      }
    }

    // Definindo Colisão - Tiro e Asteroide Pequeno
    for (let fir of this.arrayShoot) {
      for (let ast of this.arrayAsteroidPeq) {
        if (fir.intersects(ast, 0.8)) {
          ast.destroy();
          fir.destroy();

          clean(this.arrayAsteroidPeq);
          clean(this.arrayShoot);

          pontuacao += 1;

          this.pontuacao.setText(pontuacao);
        }
      }
    }

    // Definindo Colisão - Tiro e Asteroide Medio
    for (let fir of this.arrayShoot) {
      for (let ast of this.arrayAsteroidMed) {
        if (fir.intersects(ast, 0.8)) {
          let astNum = random(2, 3);

          for (let met = 0; met <= astNum; met++) {
            let pequeno = this.physics.add.sprite(ast.x, ast.y, 'AsteroidPq').setScale(1.0);

            this.arrayAsteroidPeq.push(pequeno); // Colocando Asteroide em uma Matriz
            pequeno.angle += random(0, 360); // Editando o ângulo do Asteroide
            pequeno.velocity = random(50, 150); // Editando a velocidade do Asteroide
            pequeno.setCircle(17.5); // Editando a hitbox circular do Asteroide
            this.physics.velocityFromRotation(pequeno.rotation, pequeno.velocity, pequeno.body.velocity); // Criando movimentação do Asteroide
          }

          ast.destroy();
          fir.destroy();

          clean(this.arrayAsteroidMed);
          clean(this.arrayShoot);

          pontuacao += 2;
          this.pontuacao.setText(pontuacao);
        }
      }
    }

    // Definindo Colisão - Tiro e Asteroide Grande
    for (let fir of this.arrayShoot) {
      for (let ast of this.arrayAsteroidGra) {
        if (fir.intersects(ast, 0.8)) {
          let astNum = random(1, 2);

          for (let met = 0; met <= astNum; met++) {
            let medio = this.physics.add.sprite(ast.x, ast.y, 'AsteroidMd').setScale(1.0);

            this.arrayAsteroidMed.push(medio);
            medio.angle += random(0, 360);
            medio.velocity = random(50, 100);
            medio.setCircle(35);
            this.physics.velocityFromRotation(medio.rotation, medio.velocity, medio.body.velocity);
          }

          ast.destroy();
          fir.destroy();

          clean(this.arrayAsteroidGra);
          clean(this.arrayShoot);

          pontuacao += 5;
          this.pontuacao.setText(pontuacao);
        }
      }
    }

    // Definindo Colisão - Tiro e Asteroide Mega
    for (let fir of this.arrayShoot) {
      for (let ast of this.arrayAsteroidMega) {
        if (fir.intersects(ast, 0.8)) {
          ast.data.values.life -= 1;

          fir.destroy();
          clean(this.arrayShoot);


          if (ast.data.values.life == 0) {
            let astNum = random(4, 5);

            for (let met = 0; met <= astNum; met++) {
              let grande = this.physics.add.sprite(ast.x, ast.y, 'AsteroidGr');

              this.arrayAsteroidGra.push(grande);
              grande.angle += random(0, 360);
              this.physics.velocityFromRotation(grande.rotation, random(50, 150), grande.body.velocity);
            }

            pontuacao += 100;
            this.pontuacao.setText(pontuacao);

            ast.destroy();
            clean(this.arrayAsteroidMega);

            this.nave.data.values.life += 1;
            let vida;

            vida = this.add.sprite(((this.vidas.length * 40) + 100), 130, 'Nave').setScale(1.5);
            vida.angle -= 90;

            this.vidas.push(vida);
          }
        }
      }
    }

    // Criando um Asteroide Pequeno
    if (this.tempoAsteroidPeq.isUp()) {
      this.nivel(nivel, "Apq");
      // this.tempoAsteroidPeq = this.add.timer(random(1500, 3000));
    }

    // Criando um Asteroide Medio
    if (this.tempoAsteroidMed.isUp()) {
      this.nivel(nivel, "Amd");
      // this.tempoAsteroidMed = this.add.timer(random(3500, 7000));
    }

    // Criando um Asteroide Grande
    if (this.tempoAsteroidGra.isUp()) {
      this.nivel(nivel, "Agr");
      // this.tempoAsteroidGra = this.add.timer(random(7500, 15000)); 
    }

    // Criando um Asteroide Mega
    if (this.tempoAsteroidMega.isUp()) {
      if (this.nave.x == 960 && this.nave.y == 510) {
        this.alert.setText('MEGA ASTEROID');
        this.alert.alpha = 1.0;
        this.tempoAlert.unpause();

        this.asteroidMega();
      }
    }

    // Definindo Colisão - Nave e Asteroide Pequeno
    for (let ast of this.arrayAsteroidPeq) {
      if (this.nave.intersects(ast, 0.8)) {
        if (this.nave.data.values.status == 0) {
          this.nave.data.values.life -= 1;

          if (this.nave.data.values.life == 0) {
            // this.musica.stop();
            this.scene.start('Scene4');
          } else {
            this.nave.data.values.status = 1;
            this.tempoNaveImortal.unpause();
            this.nave.alpha = 0.5;

            let qtdVidas = this.vidas.length - 1;
            this.vidas[qtdVidas].destroy();
            clean(this.vidas);

            ast.destroy();
            clean(this.arrayAsteroidPeq);
          }
        }
      }
    }

    // Definindo Colisão - Nave e Asteroide Medio
    for (let ast of this.arrayAsteroidMed) {
      if (this.nave.intersects(ast, 0.8)) {
        if (this.nave.data.values.status == 0) {
          this.nave.data.values.life -= 1;

          if (this.nave.data.values.life == 0) {
            // this.musica.stop();
            this.scene.start('Scene4');
          } else {
            let astNum = random(2, 3);

            for (let met = 0; met <= astNum; met++) {
              let pequeno = this.physics.add.sprite(ast.x, ast.y, 'AsteroidPq').setScale(1.0);

              this.arrayAsteroidPeq.push(pequeno); // Colocando Asteroide em uma Matriz
              pequeno.angle += random(0, 360); // Editando o ângulo do Asteroide
              pequeno.velocity = random(50, 150); // Editando a velocidade do Asteroide
              pequeno.setCircle(17.5); // Editando a hitbox circular do Asteroide
              this.physics.velocityFromRotation(pequeno.rotation, pequeno.velocity, pequeno.body.velocity); // Criando movimentação do Asteroide
            }

            this.nave.data.values.status = 1;
            this.tempoNaveImortal.unpause();
            this.nave.alpha = 0.5;

            let qtdVidas = this.vidas.length - 1;
            this.vidas[qtdVidas].destroy();
            clean(this.vidas);

            ast.destroy();
            clean(this.arrayAsteroidMed);
          }
        }
      }
    }

    // Definindo Colisão - Nave e Asteroide Grande
    for (let ast of this.arrayAsteroidGra) {
      if (this.nave.intersects(ast, 0.8)) {
        if (this.nave.data.values.status == 0) {
          this.nave.data.values.life -= 1;

          if (this.nave.data.values.life == 0) {
            // this.musica.stop();
            this.scene.start('Scene4');
          } else {
            let astNum = random(1, 2);

            for (let met = 0; met <= astNum; met++) {
              let medio = this.physics.add.sprite(ast.x, ast.y, 'AsteroidMd').setScale(1.0);

              this.arrayAsteroidMed.push(medio);
              medio.angle += random(0, 360);
              medio.velocity = random(50, 100);
              medio.setCircle(35);
              this.physics.velocityFromRotation(medio.rotation, medio.velocity, medio.body.velocity);
            }

            this.nave.data.values.status = 1;
            this.tempoNaveImortal.unpause();
            this.nave.alpha = 0.5;

            let qtdVidas = this.vidas.length - 1;
            this.vidas[qtdVidas].destroy();
            clean(this.vidas);

            ast.destroy();
            clean(this.arrayAsteroidGra);
          }
        }
      }
    }

    // Definindo Colisão - Nave e Asteroide Mega
    for (let ast of this.arrayAsteroidMega) {
      if (this.nave.intersects(ast, 0.8)) {
        if (this.nave.data.values.status == 0) {
          this.nave.data.values.life -= 1;

          if (this.nave.data.values.life == 0) {
            // this.musica.stop();
            this.scene.start('Scene4');
          } else {
            this.nave.data.values.status = 1;
            this.tempoNaveImortal.unpause();
            this.nave.alpha = 0.5;

            let qtdVidas = this.vidas.length - 1;
            this.vidas[qtdVidas].destroy();
            clean(this.vidas);

            ast.data.values.life -= 1;

            if (ast.data.values.life == 0) {
              let astNum = random(4, 5);

              for (let met = 0; met <= astNum; met++) {
                let grande = this.physics.add.sprite(ast.x, ast.y, 'AsteroidGr');

                this.arrayAsteroidGra.push(grande);
                grande.angle += random(0, 360);

                this.physics.velocityFromRotation(grande.rotation, random(50, 150), grande.body.velocity);

                ast.destroy();
                clean(this.arrayAsteroidMega);
              }
            }
          }
        }
      }
    }

    // Teste - Criando Meteoros

    // Definindo limites - Meteor Pequeno
    for (let ast of this.arrayMeteorPeq) {
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

    // Criando um Meteoro Pequeno
    if (this.tempoMeteorPeq.isUp()) {
      this.nivel(nivel, "Mpq");
      // this.tempoMeteorPeq = this.add.timer(random(2500, 5000)); 
    }

    // Definindo Colisão - Tiro e Meteor Pequeno
    for (let fir of this.arrayShoot) {
      for (let ast of this.arrayMeteorPeq) {
        if (fir.intersects(ast, 0.8)) {
          ast.data.values.life -= 1;

          if (ast.data.values.life == 0) {
            ast.destroy();
            clean(this.arrayMeteorPeq);

            pontuacao += 2;
            this.pontuacao.setText(pontuacao);
          }

          fir.destroy();
          clean(this.arrayShoot);

          /*
          if(random(0,1) == 1){
            ast.destroy(); 
            clean(this.arrayMeteorPeq);
 
            pontuacao += 2;
            this.pontuacao.setText(pontuacao);
          }
          */
        }
      }
    }

    // Definindo Colisão - Tiro Alien e Meteor Pequeno
    for (let fir of this.arrayAlienShoot) {
      for (let ast of this.arrayMeteorPeq) {
        if (fir.intersects(ast, 0.8)) {
          ast.data.values.life -= 1;

          if (ast.data.values.life == 0) {
            ast.destroy();
            clean(this.arrayMeteorPeq);
          }

          fir.destroy();
          clean(this.arrayShoot);

          /*
          if(random(0,1) == 1){
            ast.destroy(); 
            clean(this.arrayMeteorPeq);
 
            pontuacao += 2;
            this.pontuacao.setText(pontuacao);
          }
          
          fir.destroy();
          clean(this.arrayShoot);
          */
        }
      }
    }

    // Definindo Colisão - Nave e Meteor Pequeno
    for (let ast of this.arrayMeteorPeq) {
      if (this.nave.intersects(ast, 0.8)) {
        if (this.nave.data.values.status == 0) {
          this.nave.data.values.life -= 1;

          if (this.nave.data.values.life == 0) {
            // this.musica.stop();
            this.scene.start('Scene4');
          } else {
            this.nave.data.values.status = 1;
            this.tempoNaveImortal.unpause();
            this.nave.alpha = 0.5;

            let qtdVidas = this.vidas.length - 1;
            this.vidas[qtdVidas].destroy();
            clean(this.vidas);

            ast.destroy();
            clean(this.arrayMeteorPeq);
          }
        }
      }
    }

    // Definindo limites - Meteor Medio
    for (let ast of this.arrayMeteorMed) {
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

    // Criando um Meteoro Medio
    if (this.tempoMeteorMed.isUp()) {
      this.nivel(nivel, "Mmd");
      // this.tempoMeteorPeq = this.add.timer(random(2500, 5000)); 
    }

    // Definindo Colisão - Tiro e Meteor Medio
    for (let fir of this.arrayShoot) {
      for (let ast of this.arrayMeteorMed) {
        if (fir.intersects(ast, 0.8)) {
          ast.data.values.life -= 1;

          if (ast.data.values.life == 0) {
            let astNum = random(1, 3);

            for (let met = 0; met <= astNum; met++) {
              let pequeno = this.physics.add.sprite(ast.x, ast.y, 'MeteorPq').setScale(1.0);

              pequeno.setData('life', random(2, 3));

              this.arrayMeteorPeq.push(pequeno);
              pequeno.angle += random(0, 360);
              pequeno.velocity = random(75, 175);
              pequeno.setCircle(20);
              this.physics.velocityFromRotation(pequeno.rotation, pequeno.velocity, pequeno.body.velocity);
            }

            ast.destroy();
            clean(this.arrayMeteorMed);

            pontuacao += 4;
            this.pontuacao.setText(pontuacao);
          }
          /*
          if (random(1,2) == 1) {
            let astNum = random(1, 3);
 
            for (let met = 0; met <= astNum; met++) {
              let pequeno = this.physics.add.sprite(ast.x, ast.y, 'MeteorPq').setScale(1.0);
 
              this.arrayMeteorPeq.push(pequeno);
              pequeno.angle += random(0, 360);
              pequeno.velocity = random(75, 175);
              pequeno.setCircle(20);
              this.physics.velocityFromRotation(pequeno.rotation, pequeno.velocity, pequeno.body.velocity);
            }
 
            ast.destroy();
            clean(this.arrayMeteorMed);
 
            pontuacao += 10;
            this.pontuacao.setText(pontuacao);
          }
          */

          fir.destroy();
          clean(this.arrayShoot);
        }
      }
    }

    // Definindo Colisão - Tiro Alien e Meteor Medio
    for (let fir of this.arrayAlienShoot) {
      for (let ast of this.arrayMeteorMed) {
        if (fir.intersects(ast, 0.8)) {
          ast.data.values.life -= 1;

          if (ast.data.values.life == 0) {
            let astNum = random(1, 3);

            for (let met = 0; met <= astNum; met++) {
              let pequeno = this.physics.add.sprite(ast.x, ast.y, 'MeteorPq').setScale(1.0);

              pequeno.setData('life', random(2, 3));

              this.arrayMeteorPeq.push(pequeno);
              pequeno.angle += random(0, 360);
              pequeno.velocity = random(75, 175);
              pequeno.setCircle(20);
              this.physics.velocityFromRotation(pequeno.rotation, pequeno.velocity, pequeno.body.velocity);
            }

            ast.destroy();
            clean(this.arrayMeteorMed);
          }
          /*
          if (random(1,2) == 1) {
            let astNum = random(1, 3);
 
            for (let met = 0; met <= astNum; met++) {
              let pequeno = this.physics.add.sprite(ast.x, ast.y, 'MeteorPq').setScale(1.0);
 
              this.arrayMeteorPeq.push(pequeno);
              pequeno.angle += random(0, 360);
              pequeno.velocity = random(75, 175);
              pequeno.setCircle(20);
              this.physics.velocityFromRotation(pequeno.rotation, pequeno.velocity, pequeno.body.velocity);
            }
 
            ast.destroy();
            clean(this.arrayMeteorMed);
 
            pontuacao += 10;
            this.pontuacao.setText(pontuacao);
          }
          */

          fir.destroy();
          clean(this.arrayShoot);
        }
      }
    }

    // Definindo Colisão - Nave e Meteor Medio
    for (let ast of this.arrayMeteorMed) {
      if (this.nave.intersects(ast, 0.8)) {
        if (this.nave.data.values.status == 0) {
          this.nave.data.values.life -= 1;

          if (this.nave.data.values.life == 0) {
            // this.musica.stop();
            this.scene.start('Scene4');
          } else {
            this.nave.data.values.status = 1;
            this.tempoNaveImortal.unpause();
            this.nave.alpha = 0.5;

            let qtdVidas = this.vidas.length - 1;
            this.vidas[qtdVidas].destroy();
            clean(this.vidas);

            ast.data.values.life -= 1;

            if (ast.data.values.life == 0) {
              let astNum = random(1, 3);

              for (let met = 0; met <= astNum; met++) {
                let pequeno = this.physics.add.sprite(ast.x, ast.y, 'MeteorPq').setScale(1.0);

                pequeno.setData('life', random(2, 3));

                this.arrayMeteorPeq.push(pequeno);
                pequeno.angle += random(0, 360);
                pequeno.velocity = random(75, 175);
                pequeno.setCircle(20);
                this.physics.velocityFromRotation(pequeno.rotation, pequeno.velocity, pequeno.body.velocity);
              }

              ast.destroy();
              clean(this.arrayMeteorMed);
            }
          }
        }
      }
    }

    // Definindo limites - Meteor Grande
    for (let ast of this.arrayMeteorGra) {
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

    // Criando um Meteoro Grande
    if (this.tempoMeteorGra.isUp()) {
      this.nivel(nivel, "Mgr");
      // this.tempoMeteorPeq = this.add.timer(random(2500, 5000)); 
    }

    // Definindo Colisão - Tiro e Meteor Grande
    for (let fir of this.arrayShoot) {
      for (let ast of this.arrayMeteorGra) {
        if (fir.intersects(ast, 0.8)) {
          ast.data.values.life -= 1;

          if (ast.data.values.life == 0) {
            let astNum = random(1, 2);

            for (let met = 0; met <= astNum; met++) {
              let medio = this.physics.add.sprite(ast.x, ast.y, 'MeteorMd').setScale(1.0);

              medio.setData('life', random(4, 5));

              this.arrayMeteorMed.push(medio);
              medio.angle += random(0, 360);
              medio.velocity = random(75, 150);
              medio.setCircle(40);
              this.physics.velocityFromRotation(medio.rotation, medio.velocity, medio.body.velocity);
            }

            ast.destroy();
            clean(this.arrayMeteorGra);

            pontuacao += 10;
            this.pontuacao.setText(pontuacao);
          }
          /*
          if (random(1,4) == 1) {
            let astNum = random(1, 2);
 
            for (let met = 0; met <= astNum; met++) {
              let medio = this.physics.add.sprite(ast.x, ast.y, 'MeteorMd').setScale(1.0);
 
              this.arrayMeteorMed.push(medio);
              medio.angle += random(0, 360);
              medio.velocity = random(75, 150);
              medio.setCircle(40);
              this.physics.velocityFromRotation(medio.rotation, medio.velocity, medio.body.velocity);
            }
 
            ast.destroy();
            clean(this.arrayMeteorGra);
 
            pontuacao += 20;
            this.pontuacao.setText(pontuacao);
          }
          */

          fir.destroy();
          clean(this.arrayShoot);
        }
      }
    }

    // Definindo Colisão - Tiro Alien e Meteor Grande
    for (let fir of this.arrayAlienShoot) {
      for (let ast of this.arrayMeteorGra) {
        if (fir.intersects(ast, 0.8)) {
          ast.data.values.life -= 1;

          if (ast.data.values.life == 0) {
            let astNum = random(1, 2);

            for (let met = 0; met <= astNum; met++) {
              let medio = this.physics.add.sprite(ast.x, ast.y, 'MeteorMd').setScale(1.0);

              medio.setData('life', random(4, 5));

              this.arrayMeteorMed.push(medio);
              medio.angle += random(0, 360);
              medio.velocity = random(75, 150);
              medio.setCircle(40);
              this.physics.velocityFromRotation(medio.rotation, medio.velocity, medio.body.velocity);
            }

            ast.destroy();
            clean(this.arrayMeteorGra);
          }
          /*
          if (random(1,4) == 1) {
            let astNum = random(1, 2);
 
            for (let met = 0; met <= astNum; met++) {
              let medio = this.physics.add.sprite(ast.x, ast.y, 'MeteorMd').setScale(1.0);
 
              this.arrayMeteorMed.push(medio);
              medio.angle += random(0, 360);
              medio.velocity = random(75, 150);
              medio.setCircle(40);
              this.physics.velocityFromRotation(medio.rotation, medio.velocity, medio.body.velocity);
            }
 
            ast.destroy();
            clean(this.arrayMeteorGra);
 
            pontuacao += 20;
            this.pontuacao.setText(pontuacao);
          }
          */

          fir.destroy();
          clean(this.arrayShoot);
        }
      }
    }

    // Definindo Colisão - Nave e Meteor Grande
    for (let ast of this.arrayMeteorGra) {
      if (this.nave.intersects(ast, 0.8)) {
        if (this.nave.data.values.status == 0) {
          this.nave.data.values.life -= 1;

          if (this.nave.data.values.life == 0) {
            // this.musica.stop();
            this.scene.start('Scene4');
          } else {
            this.nave.data.values.status = 1;
            this.tempoNaveImortal.unpause();
            this.nave.alpha = 0.5;

            let qtdVidas = this.vidas.length - 1;
            this.vidas[qtdVidas].destroy();
            clean(this.vidas);
            ast.data.values.life -= 1;

            if (ast.data.values.life == 0) {
              let astNum = random(1, 2);

              for (let met = 0; met <= astNum; met++) {
                let medio = this.physics.add.sprite(ast.x, ast.y, 'MeteorMd').setScale(1.0);

                medio.setData('life', random(4, 5));

                this.arrayMeteorMed.push(medio);
                medio.angle += random(0, 360);
                medio.velocity = random(75, 150);
                medio.setCircle(40);
                this.physics.velocityFromRotation(medio.rotation, medio.velocity, medio.body.velocity);
              }

              ast.destroy();
              clean(this.arrayMeteorGra);
            }
          }
        }
      }
    }

    // Teste - Criando Cometas

    // Definindo limites - Comet Pequeno
    for (let ast of this.arrayCometPeq) {
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

    // Criando um Comet Pequeno
    if (this.tempoCometPeq.isUp()) {
      this.nivel(nivel, "Cpq");
      // this.tempoMeteorPeq = this.add.timer(random(2500, 5000)); 
    }

    // Definindo Colisão - Tiro e Comet Pequeno
    for (let fir of this.arrayShoot) {
      for (let ast of this.arrayCometPeq) {
        if (fir.intersects(ast, 0.8)) {
          ast.destroy();
          clean(this.arrayCometPeq);

          pontuacao += 5;
          this.pontuacao.setText(pontuacao);

          fir.destroy();
          clean(this.arrayShoot);
        }
      }
    }

    // Definindo Colisão - Tiro Alien e Comet Pequeno
    for (let fir of this.arrayAlienShoot) {
      for (let ast of this.arrayCometPeq) {
        if (fir.intersects(ast, 0.8)) {
          ast.destroy();
          clean(this.arrayCometPeq);

          fir.destroy();
          clean(this.arrayAlienShoot);
        }
      }
    }

    // Definindo Colisão - Nave e Comet Pequeno
    for (let ast of this.arrayCometPeq) {
      if (this.nave.intersects(ast, 0.8)) {
        if (this.nave.data.values.status == 0) {
          this.nave.data.values.life -= 1;

          if (this.nave.data.values.life == 0) {
            // this.musica.stop();
            this.scene.start('Scene4');
          } else {
            this.nave.data.values.status = 1;
            this.tempoNaveImortal.unpause();
            this.nave.alpha = 0.5;

            let qtdVidas = this.vidas.length - 1;
            this.vidas[qtdVidas].destroy();
            clean(this.vidas);

            ast.destroy();
            clean(this.arrayCometPeq);
          }
        }
      }
    }

    // Definindo limites - Comet Medio
    for (let ast of this.arrayCometMed) {
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

    // Criando um Comet Medio
    if (this.tempoCometMed.isUp()) {
      this.nivel(nivel, "Cmd");
      // this.tempoMeteorPeq = this.add.timer(random(2500, 5000)); 
    }

    // Definindo Colisão - Tiro e Comet Medio
    for (let fir of this.arrayShoot) {
      for (let ast of this.arrayCometMed) {
        if (fir.intersects(ast, 0.8)) {
          let astNum = random(1, 2);

          for (let met = 0; met <= astNum; met++) {
            let pequeno = this.physics.add.sprite(ast.x, ast.y, 'CometPq').setScale(1.0);

            pequeno.body.setBounce(1, 1).setMaxSpeed(200);

            this.arrayCometPeq.push(pequeno);
            pequeno.body.setBounce(1, 1).setMaxSpeed(240);
            pequeno.angle += random(0, 360);
            pequeno.setCircle(15);
            this.physics.velocityFromRotation(pequeno.rotation, 120, pequeno.body.velocity);
          }

          ast.destroy();
          clean(this.arrayCometMed);

          pontuacao += 10;
          this.pontuacao.setText(pontuacao);

          fir.destroy();
          clean(this.arrayShoot);
        }
      }
    }

    // Definindo Colisão - Tiro Alien e Comet Medio
    for (let fir of this.arrayAlienShoot) {
      for (let ast of this.arrayCometMed) {
        if (fir.intersects(ast, 0.8)) {
          let astNum = random(1, 2);

          for (let met = 0; met <= astNum; met++) {
            let pequeno = this.physics.add.sprite(ast.x, ast.y, 'CometPq').setScale(1.0);

            pequeno.body.setBounce(1, 1).setMaxSpeed(200);

            this.arrayCometPeq.push(pequeno);
            pequeno.body.setBounce(1, 1).setMaxSpeed(240);
            pequeno.angle += random(0, 360);
            pequeno.setCircle(15);
            this.physics.velocityFromRotation(pequeno.rotation, 120, pequeno.body.velocity);
          }

          ast.destroy();
          clean(this.arrayCometMed);

          fir.destroy();
          clean(this.arrayAlienShoot);
        }
      }
    }

    // Definindo Colisão - Nave e Comet Medio
    for (let ast of this.arrayCometMed) {
      if (this.nave.intersects(ast, 0.8)) {
        if (this.nave.data.values.status == 0) {
          this.nave.data.values.life -= 1;

          if (this.nave.data.values.life == 0) {
            // this.musica.stop();
            this.scene.start('Scene4');
          } else {
            this.nave.data.values.status = 1;
            this.tempoNaveImortal.unpause();
            this.nave.alpha = 0.5;

            let qtdVidas = this.vidas.length - 1;
            this.vidas[qtdVidas].destroy();
            clean(this.vidas);

            let astNum = random(1, 2);

            for (let met = 0; met <= astNum; met++) {
              let pequeno = this.physics.add.sprite(ast.x, ast.y, 'CometPq').setScale(1.0);

              pequeno.body.setBounce(1, 1).setMaxSpeed(200);

              this.arrayCometPeq.push(pequeno);
              pequeno.body.setBounce(1, 1).setMaxSpeed(240);
              pequeno.angle += random(0, 360);
              pequeno.setCircle(15);
              this.physics.velocityFromRotation(pequeno.rotation, 120, pequeno.body.velocity);
            }

            ast.destroy();
            clean(this.arrayCometMed);
          }
        }
      }
    }

    // Definindo limites - Comet Grande
    for (let ast of this.arrayCometGra) {
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

    // Criando um Comet Grande
    if (this.tempoCometGra.isUp()) {
      this.nivel(nivel, "Cgr");
      // this.tempoMeteorPeq = this.add.timer(random(2500, 5000)); 
    }

    // Definindo Colisão - Tiro e Comet Grande
    for (let fir of this.arrayShoot) {
      for (let ast of this.arrayCometGra) {
        if (fir.intersects(ast, 0.8)) {
          ast.data.values.life -= 1;

          if (ast.data.values.life == 0) {
            let astNum = random(1, 2);

            for (let met = 0; met <= astNum; met++) {
              let medio = this.physics.add.sprite(ast.x, ast.y, 'CometMd').setScale(1.0);

              this.arrayCometMed.push(medio);
              medio.body.setBounce(1, 1).setMaxSpeed(120);
              medio.angle += random(0, 360);
              medio.setCircle(30);
              this.physics.velocityFromRotation(medio.rotation, 60, medio.body.velocity);
            }

            ast.destroy();
            clean(this.arrayCometGra);

            pontuacao += 15;
            this.pontuacao.setText(pontuacao);
          }

          fir.destroy();
          clean(this.arrayShoot);
        }
      }
    }

    // Definindo Colisão - Tiro Alien e Comet Grande
    for (let fir of this.arrayAlienShoot) {
      for (let ast of this.arrayCometGra) {
        if (fir.intersects(ast, 0.8)) {
          ast.data.values.life -= 1;

          if (ast.data.values.life == 0) {
            let astNum = random(1, 2);

            for (let met = 0; met <= astNum; met++) {
              let medio = this.physics.add.sprite(ast.x, ast.y, 'CometMd').setScale(1.0);

              this.arrayCometMed.push(medio);
              medio.body.setBounce(1, 1).setMaxSpeed(120);
              medio.angle += random(0, 360);
              medio.setCircle(30);
              this.physics.velocityFromRotation(medio.rotation, 60, medio.body.velocity);
            }

            ast.destroy();
            clean(this.arrayCometGra);

            pontuacao += 15;
            this.pontuacao.setText(pontuacao);
          }

          fir.destroy();
          clean(this.arrayAlienShoot);
        }
      }
    }

    // Definindo Colisão - Nave e Comet Grande
    for (let ast of this.arrayCometGra) {
      if (this.nave.intersects(ast, 0.8)) {
        if (this.nave.data.values.status == 0) {
          this.nave.data.values.life -= 1;

          if (this.nave.data.values.life == 0) {
            // this.musica.stop();
            this.scene.start('Scene4');
          } else {
            this.nave.data.values.status = 1;
            this.tempoNaveImortal.unpause();
            this.nave.alpha = 0.5;

            let qtdVidas = this.vidas.length - 1;
            this.vidas[qtdVidas].destroy();
            clean(this.vidas);

            ast.data.values.life -= 1;

            if (ast.data.values.life == 0) {
              let astNum = random(1, 2);

              for (let met = 0; met <= astNum; met++) {
                let medio = this.physics.add.sprite(ast.x, ast.y, 'CometMd').setScale(1.0);

                this.arrayCometMed.push(medio);
                medio.body.setBounce(1, 1).setMaxSpeed(120);
                medio.angle += random(0, 360);
                medio.setCircle(30);
                this.physics.velocityFromRotation(medio.rotation, 60, medio.body.velocity);
              }

              ast.destroy();
              clean(this.arrayCometGra);
            }
          }
        }
      }
    }

    // Definindo limites - Alien Pequeno
    for (let ast of this.arrayAlienPeq) {
      // ast.angle += 5;

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

    // Criando um Alien Pequeno
    if (this.tempoAlienPeq.isUp()) {
      this.nivel(nivel, "Alpq");
    }

    // Definindo Colisão - Tiro e Alien Pequeno
    for (let fir of this.arrayShoot) {
      for (let ast of this.arrayAlienPeq) {
        if (fir.intersects(ast, 0.8)) {
          ast.destroy();
          clean(this.arrayAlienPeq);

          pontuacao += 5;
          this.pontuacao.setText(pontuacao);

          fir.destroy();
          clean(this.arrayShoot);
        }
      }
    }

    // Definindo Colisão - Nave e Alien Pequeno
    for (let ast of this.arrayAlienPeq) {
      if (this.nave.intersects(ast, 0.8)) {
        if (this.nave.data.values.status == 0) {
          this.nave.data.values.life -= 1;

          if (this.nave.data.values.life == 0) {
            // this.musica.stop();
            this.scene.start('Scene4');
          } else {
            this.nave.data.values.status = 1;
            this.tempoNaveImortal.unpause();
            this.nave.alpha = 0.5;

            let qtdVidas = this.vidas.length - 1;
            this.vidas[qtdVidas].destroy();
            clean(this.vidas);

            ast.destroy();
            clean(this.arrayAlienPeq);
          }
        }
      }
    }

    // Rotação Alien Pequeno
    for (let nav of this.arrayAlienPeq) {
      nav.angle += 5;
    }

    // Criando um Tiro Alien
    if (this.tempoSpawnAlienShoot.isUp()) {
      this.alienFire();
    }

    // Definindo limites - Tiro
    for (let fir of this.arrayAlienShoot) {
      if (fir.x < this.minX) {
        fir.destroy();
      }
      if (fir.y < this.minY) {
        fir.destroy();
      }
      if (fir.x > this.maxX) {
        fir.destroy();
      }
      if (fir.y > this.maxY) {
        fir.destroy();
      }
    }

    // Definindo Colisão - Tiro e Asteroide Pequeno
    for (let fir of this.arrayAlienShoot) {
      for (let ast of this.arrayAsteroidPeq) {
        if (fir.intersects(ast, 0.8)) {
          ast.destroy();
          fir.destroy();

          clean(this.arrayAsteroidPeq);
          clean(this.arrayAlienShoot);
        }
      }
    }

    // Definindo Colisão - Tiro e Asteroide Medio
    for (let fir of this.arrayAlienShoot) {
      for (let ast of this.arrayAsteroidMed) {
        if (fir.intersects(ast, 0.8)) {
          let astNum = random(2, 3);

          for (let met = 0; met <= astNum; met++) {
            let pequeno = this.physics.add.sprite(ast.x, ast.y, 'AsteroidPq').setScale(1.0);

            this.arrayAsteroidPeq.push(pequeno); // Colocando Asteroide em uma Matriz
            pequeno.angle += random(0, 360); // Editando o ângulo do Asteroide
            pequeno.velocity = random(50, 150); // Editando a velocidade do Asteroide
            pequeno.setCircle(17.5); // Editando a hitbox circular do Asteroide
            this.physics.velocityFromRotation(pequeno.rotation, pequeno.velocity, pequeno.body.velocity); // Criando movimentação do Asteroide
          }

          ast.destroy();
          fir.destroy();

          clean(this.arrayAsteroidMed);
          clean(this.arrayAlienShoot);
        }
      }
    }

    // Definindo Colisão - Tiro e Asteroide Grande
    for (let fir of this.arrayAlienShoot) {
      for (let ast of this.arrayAsteroidGra) {
        if (fir.intersects(ast, 0.8)) {
          let astNum = random(1, 2);

          for (let met = 0; met <= astNum; met++) {
            let medio = this.physics.add.sprite(ast.x, ast.y, 'AsteroidMd').setScale(1.0);

            this.arrayAsteroidMed.push(medio);
            medio.angle += random(0, 360);
            medio.velocity = random(50, 100);
            medio.setCircle(35);
            this.physics.velocityFromRotation(medio.rotation, medio.velocity, medio.body.velocity);
          }

          ast.destroy();
          fir.destroy();

          clean(this.arrayAsteroidGra);
          clean(this.arrayAlienShoot);
        }
      }
    }

    // Definindo Colisão - Tiro e Asteroide Mega
    for (let fir of this.arrayAlienShoot) {
      for (let ast of this.arrayAsteroidMega) {
        if (fir.intersects(ast, 0.8)) {
          ast.data.values.life -= 1;

          fir.destroy();
          clean(this.arrayAlienShoot);


          if (ast.data.values.life == 0) {
            let astNum = random(4, 5);

            for (let met = 0; met <= astNum; met++) {
              let grande = this.physics.add.sprite(ast.x, ast.y, 'AsteroidGr');

              this.arrayAsteroidGra.push(grande);
              grande.angle += random(0, 360);

              this.physics.velocityFromRotation(grande.rotation, random(50, 150), grande.body.velocity);

              ast.destroy();
              clean(this.arrayAsteroidMega);
            }
          }
        }
      }
    }

    // Definindo Colisão - Tiro e Nave
    for (let fir of this.arrayAlienShoot) {
      if (this.nave.intersects(fir, 0.8)) {
        if (this.nave.data.values.status == 0) {
          this.nave.data.values.life -= 1;

          if (this.nave.data.values.life == 0) {
            // this.musica.stop();
            this.scene.start('Scene4');
          } else {
            this.nave.data.values.status = 1;
            this.tempoNaveImortal.unpause();
            this.nave.alpha = 0.5;

            let qtdVidas = this.vidas.length - 1;
            this.vidas[qtdVidas].destroy();
            clean(this.vidas);

            fir.destroy();
            clean(this.arrayAlienShoot);
          }
        }
      }
    }
  }

  // Criando uma nova função - Niveis
  nivel(lvl, ast) {
    switch (lvl) {
      case 0:
        switch (ast) {
          case "Apq":
            if (this.arrayAsteroidPeq.length < 10) {
              this.tempoAsteroidPeq = this.add.timer(random(1500, 3000));
              this.asteroidPequeno();
            }
            break;

          case "Amd":
            if (this.arrayAsteroidMed.length < 5) {
              this.tempoAsteroidMed = this.add.timer(random(3500, 7000));
              this.asteroidMedio();
            }
            break;

          case "Agr":
            if (this.arrayAsteroidGra.length < 2) {
              this.tempoAsteroidGra = this.add.timer(random(7500, 15000));
              this.asteroidGrande();
            }
            break;

          case "Alpq":
            if (this.arrayAlienPeq.length < 5) {
              this.tempoAlienPeq = this.add.timer(60000);
              this.alienPequeno();
            }
            break;
        }
        break;

      case 1:
        switch (ast) {
          case "Apq":
            if (this.arrayAsteroidPeq.length < 10) {
              this.tempoAsteroidPeq = this.add.timer(random(1500, 3000));
              this.asteroidPequeno();
            }
            break;

          case "Amd":
            if (this.arrayAsteroidMed.length < 5) {
              this.tempoAsteroidMed = this.add.timer(random(3500, 7000));
              this.asteroidMedio();
            }
            break;

          case "Agr":
            if (this.arrayAsteroidGra.length < 2) {
              this.tempoAsteroidGra = this.add.timer(random(7500, 15000));
              this.asteroidGrande();
            }
            break;

          case "Mpq":
            if (this.arrayMeteorPeq.length < 5) {
              this.tempoMeteorPeq = this.add.timer(random(3000, 6000));
              this.meteorPequeno();
              break;
            }
            break;

          case "Mmd":
            if (this.arrayMeteorMed.length < 2) {
              this.tempoMeteorMed = this.add.timer(random(6000, 12000));
              this.meteorMedio();
            }
            break;

          case "Mgr":
            if (this.arrayMeteorGra.length < 1) {
              this.tempoMeteorGra = this.add.timer(random(12000, 24000));
              this.meteorGrande();
            }
            break;

          case "Alpq":
            if (this.arrayAlienPeq.length < 5) {
              this.tempoAlienPeq = this.add.timer(60000);
              this.alienPequeno();
            }
            break;
        }
        break;

      case 2:
        switch (ast) {
          case "Apq":
            if (this.arrayAsteroidPeq.length < 10) {
              this.tempoAsteroidPeq = this.add.timer(random(1500, 3000));
              this.asteroidPequeno();
            }
            break;

          case "Amd":
            if (this.arrayAsteroidMed.length < 5) {
              this.tempoAsteroidMed = this.add.timer(random(3500, 7000));
              this.asteroidMedio();
            }
            break;

          case "Agr":
            if (this.arrayAsteroidGra.length < 2) {
              this.tempoAsteroidGra = this.add.timer(random(7500, 15000));
              this.asteroidGrande();
            }
            break;

          case "Mpq":
            if (this.arrayMeteorPeq.length < 5) {
              this.tempoMeteorPeq = this.add.timer(random(3000, 6000));
              this.meteorPequeno();
              break;
            }
            break;

          case "Mmd":
            if (this.arrayMeteorMed.length < 2) {
              this.tempoMeteorMed = this.add.timer(random(6000, 12000));
              this.meteorMedio();
            }
            break;

          case "Mgr":
            if (this.arrayMeteorGra.length < 1) {
              this.tempoMeteorGra = this.add.timer(random(12000, 24000));
              this.meteorGrande();
            }
            break;

          case "Cpq":
            if (this.arrayCometPeq.length < 3) {
              this.tempoCometPeq = this.add.timer(random(16000, 32000));
              this.cometPequeno();
            }
            break;

          case "Cmd":
            if (this.arrayCometMed.length < 2) {
              this.tempoCometMed = this.add.timer(random(20000, 40000));
              this.cometMedio();
            }
            break;

          case "Cgr":
            if (this.arrayCometGra.length < 1) {
              this.tempoCometGra = this.add.timer(random(24000, 48000));
              this.cometGrande();
            }
            break;

          case "Alpq":
            if (this.arrayAlienPeq.length < 5) {
              this.tempoAlienPeq = this.add.timer(60000);
              this.alienPequeno();
            }
            break;
        }
        break;

      case 3:
        switch (ast) {
          case "Apq":
            if (this.arrayAsteroidPeq.length < 10) {
              this.tempoAsteroidPeq = this.add.timer(random(1300, 2800));
              this.asteroidPequeno();
            }
            break;

          case "Amd":
            if (this.arrayAsteroidMed.length < 5) {
              this.tempoAsteroidMed = this.add.timer(random(3300, 6800));
              this.asteroidMedio();
            }
            break;

          case "Agr":
            if (this.arrayAsteroidGra.length < 2) {
              this.tempoAsteroidGra = this.add.timer(random(7300, 14800));
              this.asteroidGrande();
            }
            break;

          case "Mpq":
            if (this.arrayMeteorPeq.length < 5) {
              this.tempoMeteorPeq = this.add.timer(random(2800, 5800));
              this.meteorPequeno();
              break;
            }
            break;

          case "Mmd":
            if (this.arrayMeteorMed.length < 2) {
              this.tempoMeteorMed = this.add.timer(random(5800, 11800));
              this.meteorMedio();
            }
            break;

          case "Mgr":
            if (this.arrayMeteorGra.length < 1) {
              this.tempoMeteorGra = this.add.timer(random(11800, 23800));
              this.meteorGrande();
            }
            break;

          case "Cpq":
            if (this.arrayCometPeq.length < 3) {
              this.tempoCometPeq = this.add.timer(random(15800, 31800));
              this.cometPequeno();
            }
            break;

          case "Cmd":
            if (this.arrayCometMed.length < 2) {
              this.tempoCometMed = this.add.timer(random(19800, 39800));
              this.cometMedio();
            }
            break;

          case "Cgr":
            if (this.arrayCometGra.length < 1) {
              this.tempoCometGra = this.add.timer(random(23800, 47800));
              this.cometGrande();
            }
            break;

          case "Alpq":
            if (this.arrayAlienPeq.length < 5) {
              this.tempoAlienPeq = this.add.timer(59800);
              this.alienPequeno();
            }
            break;
        }
        break;
    }

    console.clear();
    console.log("Asteroid Pequeno: " + this.arrayAsteroidPeq.length);
    console.log("Asteroid Medio: " + this.arrayAsteroidMed.length);
    console.log("Asteroid Grande: " + this.arrayAsteroidGra.length);

    console.log("Meteoro Pequeno: " + this.arrayMeteorPeq.length);
    console.log("Meteoro Medio: " + this.arrayMeteorMed.length);
    console.log("Meteoro Grande: " + this.arrayMeteorGra.length);

    console.log("Cometa Pequeno: " + this.arrayCometPeq.length);
    console.log("Cometa Medio: " + this.arrayCometMed.length);
    console.log("Cometa Grande: " + this.arrayCometGra.length);

    console.log("Alien Pequeno: " + this.arrayAlienPeq.length);
  }
}