import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const Game = () => {
  const gameRef = useRef(null);
  const gameInstance = useRef(null);

  useEffect(() => {
    let isGameOver = false;
    let score = 0;
    let scoreText;
    let isRefresh = false;
    let hitPlayed = false;
    let diePlayed = false;
    let character;
    let base;
    let point;
    let hit;
    let wing;
    let die;
    let gameStart = false;

    const config = {
      type: Phaser.AUTO,
      width: 288,
      height: 512,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 600 },
          debug: false,
        },
      },
      scene: {
        preload,
        create,
        update,
      },
      parent: gameRef.current,
      canvasStyle: 'border-radius: 15px; box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.7);',
    };

    function preload() {
      this.load.image('background', '/assets/GameObjects/background-day.png');
      this.load.image('character1', '/assets/GameObjects/yellowbird-midflap.png');
      this.load.image('character2', '/assets/GameObjects/yellowbird-downflap.png');
      this.load.image('character3', '/assets/GameObjects/yellowbird-upflap.png');
      this.load.image('character4', '/assets/GameObjects/yellowbird-fall.png');
      this.load.image('pillar', '/assets/GameObjects/pipe-green.png');
      this.load.image('base', '/assets/GameObjects/base.png');
      this.load.image('gameover', '/assets/GameObjects/gameover.png');
      this.load.image('score', '/assets/GameObjects/score.png');
      this.load.image('retry', '/assets/GameObjects/retry.png');
      this.load.image('startGame', '/assets/GameObjects/message.png');
      this.load.audio('score', '/assets/SoundEffects/point.wav');
      this.load.audio('hit', '/assets/SoundEffects/hit.wav');
      this.load.audio('wing', '/assets/SoundEffects/wing.wav');
      this.load.audio('die', '/assets/SoundEffects/die.wav');
    }

    function create() {
      let background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
      background.setOrigin(0, 0);
      background.displayWidth = this.sys.game.config.width;
      background.displayHeight = this.sys.game.config.height;

      let baseImage = this.textures.get('base');
      let baseHeight = baseImage.getSourceImage().height;
      let baseWidth = baseImage.getSourceImage().width;
      base = this.add.tileSprite(config.width / 2, config.height - baseHeight / 2, baseWidth, baseHeight, 'base');
      this.physics.add.existing(base, true);
      base.setDepth(1);

      let startGameImage = this.add.image(config.width / 2, config.height / 3, 'startGame');
      startGameImage.setOrigin(0.5, 0.5);

      character = this.physics.add.sprite(config.width / 4, config.height / 2, 'character1');
      character.setDepth(1);
      character.setCollideWorldBounds(true);
      character.body.allowGravity = false;
      gameStart = false;

      this.anims.create({
        key: 'fly',
        frames: [
          { key: 'character1' },
          { key: 'character2' },
          { key: 'character3' },
        ],
        frameRate: 9,
        repeat: -1,
      });

      this.anims.create({
        key: 'fall',
        frames: [{ key: 'character4' }],
        frameRate: 9,
        repeat: -1,
      });

      character.anims.play('fly', true);

      this.input.on('pointerdown', () => {
        if (gameStart) return;
        gameStart = true;
        startGameImage.setVisible(false);
        character.body.allowGravity = true;
        this.upperPillars = this.physics.add.group();
        this.lowerPillars = this.physics.add.group();
        this.spawnPillarPair();
        this.physics.add.collider(character, this.upperPillars, hitPillar, null, this);
        this.physics.add.collider(character, this.lowerPillars, hitPillar, null, this);
        this.physics.add.collider(character, base, hitBase, null, this);

        // Resume audio context
        if (this.sound.context.state === 'suspended') {
          this.sound.context.resume();
        }

        scoreText = this.add.text(config.width / 2, 30, '0', {
          fontSize: '32px',
          fontFamily: 'Fantasy',
          fill: 'white',
        });
        scoreText.setOrigin(0.5, 0.5);
        scoreText.setDepth(1);

        point = this.sound.add('score');
        hit = this.sound.add('hit');
        wing = this.sound.add('wing');
        die = this.sound.add('die');

        this.input.on('pointerdown', () => {
          if (!isRefresh && !isGameOver) {
            wing.play();
            character.setVelocityY(-230);
          }
          isRefresh = false;
        }, this);
      }, this);
    }

    function update() {
      if (!isGameOver) base.tilePositionX += 1;
      if (!gameStart) return;

      let scoreIncremented = false;
      [this.upperPillars, this.lowerPillars].forEach((group) => {
        group.children.iterate((pillar) => {
          if (!pillar) return;

          if (!pillar.hasPassed && pillar.x + pillar.width < character.x) {
            pillar.hasPassed = true;
            if (!scoreIncremented) {
              score++;
              scoreText.setText(score);
              point.play();
              scoreIncremented = true;
            }
          }
          if (pillar.x + pillar.width < 0) {
            pillar.destroy();
          }
        });
      });
      scoreIncremented = false;

      if (this.pillarSpawnTime < this.time.now && !isGameOver) {
        this.spawnPillarPair();
      }
    }

    Phaser.Scene.prototype.spawnPillarPair = function () {
      const baseImage = this.textures.get('base');
      const baseHeight = baseImage.getSourceImage().height;
      const pillarImage = this.textures.get('pillar');
      const pillarHeight = pillarImage.getSourceImage().height;
      const Offset = (Math.random() * pillarHeight) / 2;
      const k = Math.floor(Math.random() * 3) - 1;
      const gapHeight = (1 / 3) * (config.height - baseHeight);
      const lowerY = 2 * gapHeight + pillarHeight / 2 + Offset * k;
      const upperY = gapHeight - pillarHeight / 2 + Offset * k;

      const upperPillar = this.upperPillars.create(config.width, upperY, 'pillar');
      upperPillar.setAngle(180);
      const lowerPillar = this.lowerPillars.create(config.width, lowerY, 'pillar');
      upperPillar.body.allowGravity = false;
      lowerPillar.body.allowGravity = false;
      upperPillar.setVelocityX(-150);
      lowerPillar.setVelocityX(-150);
      this.pillarSpawnTime = this.time.now + 1500;
    };

    function hitBase(character, base) {
      if (!hitPlayed) hit.play();
      character.anims.play('fall', true);
      base.body.enable = false;
      character.setVelocityX(0);
      character.setVelocityY(0);
      character.body.allowGravity = false;
      [this.upperPillars, this.lowerPillars].forEach((group) =>
        group.children.iterate((pillar) => (pillar.body.velocity.x = 0))
      );
      isGameOver = true;

      const gameOverImage = this.add.image(config.width / 2, config.height / 4, 'gameover');
      gameOverImage.setOrigin(0.5, 0.5);
      const scoreImage = this.add.image(config.width / 2, config.height, 'score');
      scoreImage.setOrigin(0.5, 0.5);
      const finalScoreText = this.add.text(config.width / 2, config.height, score, {
        fontSize: '32px',
        fontFamily: 'Fantasy',
        fill: 'white',
      });
      finalScoreText.setOrigin(0.5, 0.5);

      this.tweens.add({
        targets: [scoreImage, finalScoreText],
        y: (target) => (target === scoreImage ? config.height / 2.2 : config.height / 2.1),
        ease: 'Power1',
        duration: 500,
        repeat: 0,
        yoyo: false,
      });

      scoreText.destroy();
      const retryImage = this.add.image(config.width / 2, config.height / 1.5, 'retry');
      retryImage.setOrigin(0.5, 0.5);
      retryImage.setScale(0.25);
      retryImage.setInteractive();
      retryImage.on('pointerdown', () => {
        isGameOver = false;
        score = 0;
        gameStart = false;
        hitPlayed = false;
        diePlayed = false;
        isRefresh = true;
        this.scene.restart();
      }, this);
    }

    function hitPillar(character, pillar) {
      if (!hitPlayed && !diePlayed) {
        hit.play();
        die.play();
        hitPlayed = true;
        diePlayed = true;
      }
      character.anims.play('fall', true);
      pillar.body.enable = false;
      character.setVelocityX(0);
      [this.upperPillars, this.lowerPillars].forEach((group) =>
        group.children.iterate((pillar) => (pillar.body.velocity.x = 0))
      );
      isGameOver = true;
    }

    gameInstance.current = new Phaser.Game(config);

    return () => {
      if (gameInstance.current) {
        gameInstance.current.destroy(true);
      }
    };
  }, []);

  return <div ref={gameRef} className="max-w-[288px] max-h-[512px] mx-auto" />;
};

export default Game;