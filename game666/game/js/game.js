/******************** 連結資料庫的變數 **********************/

//*************************** 可調整設定  *******************************/

// 常數

// 我方起始生命
var MY_LIFE = 5;
// 我方生命上限
var MY_LIFE_LIM = 10;
// 我方一次補血量
var GET_LIFE = 1;
// 受傷耗損血量
var HURT_LIFE = 2;
// 我方移動速度
var MY_MAX_SPEED = {
    LV0: 200,
    LV1: 220,
    LV2: 250,
    LV3: 280,
    LV4: 350,
    LV5: 400,
};
// 我方撿樹枝速度
var MY_ACTION_SPEED = {
    LV0: 12,
    LV1: 15,
    LV2: 19,
    LV3: 24,
    LV4: 36,
    LV5: 48,
};
// 敵方生成間格時間
var ENEMY_INTERVAL_MIN = {
    LV0: 1500,
    LV1: 1000,
    LV2: 800,
    LV3: 500,
    LV4: 300,
    LV5: 100,
};
var ENEMY_INTERVAL_MAX = {
    LV0: 2000,
    LV1: 1200,
    LV2: 1000,
    LV3: 800,
    LV4: 500,
    LV5: 150,
};

// 敵方移動速度
var ENEMY_VEL = {
    LV0: 450,
    LV1: 470,
    LV2: 500,
    LV3: 550,
    LV4: 600,
    LV5: 800
};

// 樹枝生成間格時間
var AWARD_INTERVAL = 3; //秒

// 關卡難度門檻(分數)
var LEVEL = {
    A: 0,
    B: 3,
    C: 6,
    D: 8,
    E: 12,
    F: 14
};

// 玩家等級門檻(分數)
var PLAYER_LV = {
    A: 0,
    B: 3,
    C: 6,
    D: 8,
    E: 12,
    F: 14
};
var PLAYER_LV_LIMIT = 666;
var TWIG_COUNT_LIMIT = 8888;

// 一根樹枝倍數
var PLAYER_LV_MULTIPLE = 6;
var TWIG_MULTIPLE = 8;
var KING_TWIG_MULTIPLE = 666;
// 起始樹枝
var ORIGIN_SCORE = 0;

// 原生js鍵盤鍵值
var KEYBOARD_KEY = {
    SPACE_BAR: 32
};
/*****************************************************************************/
// 我方起始生命
var myLife = MY_LIFE;
// 我方生命上限
var myLifeLim = MY_LIFE_LIM;
// 我方一次補血量
var getLife = GET_LIFE;
// 受傷耗損血量
var hurtLife = HURT_LIFE;
// 我方移動速度
var myMaxSpeed = MY_MAX_SPEED.LV0;
var myActionSpeed = MY_ACTION_SPEED.LV0;
// 敵方生成間格時間
var enemyIntervalMin = ENEMY_INTERVAL_MIN.LV0; //豪秒
var enemyIntervalMax = ENEMY_INTERVAL_MAX.LV0; //豪秒
// 敵方移動速度
var enemySpeed = ENEMY_VEL.LV0;
// 樹枝生成間格時間
var awardInterval = AWARD_INTERVAL; //秒

var twigMultiple = TWIG_MULTIPLE;

/*******************************************************/
// 玩家可再次受傷條件
var canHit = true;
// 玩家可移動條件
var canMove = true;
// 玩家可遊玩條件
var canPlay = false;
// 玩家可移動動作條件
var canRunAction = true;
// 無敵條件
var canInvincible = false;
// 韓霸條件
var can666 = false;

/*******************************************************/
// 鍵盤操作鍵物件
var keyboard;
// 計時器
var timer;
var invincibleTimer;
var startEnemyTimer;
var textTimer;
var textTimer2;
var endingTimer;

// UI字型
var scoreText;
var lifeText;
var LVText;
// 文字樣式
var styleA = {fill: '#0088ff', font: "22px BLACKJACK"};
var styleB = {fill: '#0088ff', font: "48px BLACKJACK"};
var styleC = {fill: '#0088ff', font: "30px BLACKJACK"};
var styleD = {fill: '#0088ff', font: "56px BLACKJACK"};
/*********************************************************************************/

/******* 創建 Phaser 遊戲 ********/
var game = new Phaser.Game(500, 750, Phaser.CANVAS, 'game');
/******* 遊戲階段 ********/
game.State = {};
game.score = ORIGIN_SCORE;

/**
 * boot state 對遊戲進行設置
 * @type {{create: Phaser.Game.State.boot.create, preload: Phaser.Game.State.boot.preload}}
 */
game.State.boot = {
    preload: function () {
        game.load.image('loading', '../game/assets/preloader.gif');
        //行動平台螢幕適應
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = '#000000';
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.forcePortrait = false;
        this.scale.refresh();
    },
    create: function () {
        game.state.start('load');
    }
}

/**
 * load state 加載資源
 * @type {{create: Phaser.Game.State.load.create, preload: Phaser.Game.State.load.preload}}
 */
game.State.load = {
    preload: function () {
        var preloadSprite = game.add.sprite(game.width / 2 - 220 / 2, game.height / 2 - 19 / 2, 'loading');
        game.load.setPreloadSprite(preloadSprite);

        game.load.image('bg', '../game/assets/background.jpg');
        game.load.image('ep01', '../game/assets/ep01.jpg');
        game.load.image('ep02', '../game/assets/ep02.jpg');
        game.load.image('ep03', '../game/assets/ep03.jpg');
        game.load.image('ep04', '../game/assets/ep04.jpg');
        game.load.image('ep05', '../game/assets/ep05.jpg');
        game.load.image('666', '../game/assets/666.jpg');
        game.load.image('title', '../game/assets/title.jpg');
        game.load.image('loss', '../game/assets/loss.jpg');
        game.load.image('loss_text', '../game/assets/loss_text.png');
        game.load.image('ending', '../game/assets/ending.jpg');
        game.load.spritesheet('player', '../game/assets/player.png', 105, 110, 13);
        game.load.spritesheet('avatar', '../game/assets/avatar.png', 100, 100, 2);
        game.load.spritesheet('icons', '../game/assets/icons.png', 80, 50, 8);
        game.load.spritesheet('startBtn', '../game/assets/startBtn.png', 278, 100, 1);
        game.load.spritesheet('urlBtn', '../game/assets/urlBtn.png', 150, 150, 2);
        game.load.spritesheet('explode', '../game/assets/explode.png', 80, 80, 3);
        game.load.image('twig', '../game/assets/twig.png');
        game.load.image('light', '../game/assets/light.png');
        game.load.atlas('dpad', '../game/assets/dpad.png', '../game/assets/dpad.json');

        /*****************************************************************/
        game.load.image('enemy', '../game/assets/enemy.png');
        /*****************************************************************/

        game.load.audio('start_bgm', '../game/sounds/start_bgm.mp3');
        game.load.audio('play_bgm', '../game/sounds/play_bgm.mp3');
        game.load.audio('boss_bgm', '../game/sounds/boss_bgm.mp3');
        game.load.audio('end_bgm', '../game/sounds/end_bgm.mp3');
        game.load.audio('type', '../game/sounds/type.mp3');
        game.load.audio('yes_I_do', '../game/sounds/yes_I_do.mp3');
        game.load.audio('level_up', '../game/sounds/level_up.mp3');
        game.load.audio('loss_bgm', '../game/sounds/loss_bgm.mp3');
        game.load.audio('get', '../game/sounds/get.mp3');
        game.load.audio('hurt', '../game/sounds/hurt.mp3');
        game.load.audio('die', '../game/sounds/die.mp3');
        game.load.audio('jump', '../game/sounds/jump.mp3');
        game.load.audio('explodeSFX', '../game/sounds/explode.mp3');


    },
    create: function () {
        game.state.start('start');
    }
}

/**
 * start state 遊戲開始介面
 * @type {{create: Phaser.Game.State.start.create, onStartClick: Phaser.Game.State.start.onStartClick}}
 */
game.State.start = {

    create: function () {
        scoreText = game.add.text(game.width - 45, 60, "000", styleB);
        scoreText.anchor.setTo(1, 0);
        lifeText = game.add.text(170, 78, myLife, styleA);
        lifeText.anchor.setTo(1, 0);
        LVText = game.add.text(178, 38, "LV:" + 1, styleC);
        LVText.anchor.setTo(1, 0);
        game.add.image(0, 0, 'title');
        this.startBtn = game.add.sprite(game.width / 2, game.height / 2 + 100, 'startBtn');
        this.startBtn.alpha = 0;
        this.startBtn.anchor.setTo(0.5, 0.5);
        this.urlBtn = game.add.button(10, 10, 'urlBtn', function () {
            window.open('https://www.youtube.com/channel/UC9wo_WgYUgCZOJIZ-hD5-mA?view_as=subscriber', '_blank');
        }, this, 1, 0, 1,0);
        this.urlBtn.alpha = 0;
        this.urlBtn.inputEnabled = false;
        game.add.tween(this.urlBtn).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false).onComplete.addOnce(() => {
            this.urlBtn.inputEnabled = true;
        });
        var tween = game.add.tween(this.startBtn).to({alpha: 1}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        tween.onComplete.addOnce(function () {
            this.startBtn.inputEnabled = true;
        }, this);
        // 回調
        var callback = () => {
            var tween = game.add.tween(this.startBtn.scale).to({
                x: 0.8,
                y: 0.8
            }, 100, Phaser.Easing.Circular.InOut, true, 0, 0, false);
            tween.onComplete.addOnce(function () {
                this.onStartClick();
            }, this);
        };
        // 鍵盤
        this.keyboardJsOriginalFuncToSpaceBar(KEYBOARD_KEY.SPACE_BAR, () => {
            if (this.startBtn.inputEnabled) {
                this.startBtn.inputEnabled = false;
                callback();
            }
        }, this);
        // 點擊
        this.startBtn.events.onInputDown.add(function () {
            callback();
        }, this);
    },

    /**
     * 點擊開始按鈕回調
     */
    onStartClick: function () {
        game.state.start('play');
    },

    /**
     * 原生鍵盤監聽(空白鍵)
     * @param cb
     * @param target
     */
    keyboardJsOriginalFuncToSpaceBar: function (key, cb, target) {
        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == key) {
                !!cb && cb();
            }
        }.bind(target);
    }
}

/**
 * play state 遊戲主邏輯
 * @type {{damage: Phaser.Game.State.play.damage, saveCarIndex: number, addTwigAndLvMgr: Phaser.Game.State.play.addTwigAndLvMgr, actionGetTwig: Phaser.Game.State.play.actionGetTwig, invincible: Phaser.Game.State.play.invincible, update: Phaser.Game.State.play.update, playerLVChang: Phaser.Game.State.play.playerLVChang, preload: Phaser.Game.State.play.preload, generateEnemy: Phaser.Game.State.play.generateEnemy, joystickController: Phaser.Game.State.play.joystickController, keyboardJsOriginalFuncToSpaceBar: Phaser.Game.State.play.keyboardJsOriginalFuncToSpaceBar, onStart: Phaser.Game.State.play.onStart, twigLVColor: Phaser.Game.State.play.twigLVColor, generateTwig: Phaser.Game.State.play.generateTwig, create: Phaser.Game.State.play.create, render: Phaser.Game.State.play.render, init: Phaser.Game.State.play.init, onCreate: Phaser.Game.State.play.onCreate, keyboardControllerPlay: Phaser.Game.State.play.keyboardControllerPlay, actionRun: Phaser.Game.State.play.actionRun, checkCollision: Phaser.Game.State.play.checkCollision, levelChange: Phaser.Game.State.play.levelChange, showEnding: Phaser.Game.State.play.showEnding, debugTest: Phaser.Game.State.play.debugTest, playLevelUp: Phaser.Game.State.play.playLevelUp, gameOver: Phaser.Game.State.play.gameOver, textEffect: Phaser.Game.State.play.textEffect, debugCollider: Phaser.Game.State.play.debugCollider, infosChange: (function(): *[]), story: Phaser.Game.State.play.story, destroyOutEnemies: Phaser.Game.State.play.destroyOutEnemies}}
 */
game.State.play = {

    init: function () {
        //像素顯示在整數位置 (round pixel: 整數位置)，避免 Phaser 使用子像素位置 (Sub-pixel) 顯示，以免模糊
        // this.game.renderer.renderSession.roundPixels = true;
        /********************** 重置鍵盤訊號 **********************/
        keyboard = game.input.keyboard.addKeys({
            'up': Phaser.Keyboard.UP,
            'down': Phaser.Keyboard.DOWN,
            'left': Phaser.Keyboard.LEFT,
            'right': Phaser.Keyboard.RIGHT,
            'w': Phaser.Keyboard.W,
            'a': Phaser.Keyboard.A,
            's': Phaser.Keyboard.S,
            'd': Phaser.Keyboard.D,
            'lv0': Phaser.Keyboard.NUMPAD_0,
            'lv1': Phaser.Keyboard.NUMPAD_1,
            'lv2': Phaser.Keyboard.NUMPAD_2,
            'lv3': Phaser.Keyboard.NUMPAD_3,
            'lv4': Phaser.Keyboard.NUMPAD_4,
            'lv5': Phaser.Keyboard.NUMPAD_5,
            'end': Phaser.Keyboard.NUMPAD_9,
            'add': Phaser.Keyboard.NUMPAD_ADD,
        });

        keyboard.right.isDown = false;
        keyboard.left.isDown = false;
        keyboard.up.isDown = false;
        keyboard.down.isDown = false;
        keyboard.a.isDown = false;
        keyboard.d.isDown = false;
        keyboard.w.isDown = false;
        keyboard.s.isDown = false;
        //重置條件設定
        canHit = true;
        canMove = true;
        canRunAction = true;
        canInvincible = false;
        can666 = false;
        game.score = ORIGIN_SCORE;
    },

    preload: function () {
    },

    create: function () {
        /** 前提故事 > 創建遊戲 > 遊戲開始 **/
        this.story(this.onCreate.bind(this, this.onStart.bind(this)));
    },

    update: function () {
        if (canPlay) {
            /********************* 控制器 ******************************/
            if (canMove) {
                this.keyboardControllerPlay();
                this.debugTest();
                !!!game.device.desktop && this.joystickController();
            }
            /**************************** 碰撞與設置 *******************************/

            if (this.player.ok) {
                /*** 延遲1秒開始生怪 ***/
                startEnemyTimer = setTimeout(function () {
                    this.generateEnemy();
                }.bind(this), 1000);
                /** 檢查碰撞 **/
                this.checkCollision();
                /*** 消除出界敵方 ***/
                this.destroyOutEnemies();
                /*** 樹枝顏色 ***/
                this.twigLVColor();
            }
        }

    },

    render: function () {
        // this.debugCollider();
    },

    /**
     * debug顯示碰撞框
     */
    debugCollider: function () {
        // 顯示碰撞框
        if (canPlay && this.player.ok) {
            // console.log('敵方組長度: ' + this.enemies.length, '樹枝組長度: ' + this.twigs.length);
            game.debug.body(this.player);
            this.enemies.forEach((node) => {
                game.debug.body(node);
            });
            this.twigs.forEach((node) => {
                game.debug.body(node);
            });
        }
    },

    /**
     * debug切關卡難度
     */
    debugTest: function () {
        var resetBgm = () => {
            this.bossBgm.stop();
            try {
                this.playBgm.resume();
            } catch (e) {
            }
        };
        if (keyboard.lv0.isDown) {
            resetBgm();
            this.player.tint = 0xffffff;
            console.log('keyboard.lv0.isDown');
            game.score = PLAYER_LV.A;
            this.infosChange();
            this.levelChange(game.score);
            this.playerLVChang(game.score);
            LVText.setText("LV:" + 1);
        } else if (keyboard.lv1.isDown) {
            resetBgm();
            this.player.tint = 0xffffff;
            console.log('keyboard.lv1.isDown');
            game.score = PLAYER_LV.B;
            this.infosChange();
            this.levelChange(game.score);
            this.playerLVChang(game.score);
        } else if (keyboard.lv2.isDown) {
            resetBgm();
            this.player.tint = 0xffffff;
            console.log('keyboard.lv1.isDown');
            game.score = PLAYER_LV.C;
            this.infosChange();
            this.levelChange(game.score);
            this.playerLVChang(game.score);
        } else if (keyboard.lv3.isDown) {
            resetBgm();
            this.player.tint = 0xffffff;
            console.log('keyboard.lv1.isDown');
            game.score = PLAYER_LV.D;
            this.infosChange();
            this.levelChange(game.score);
            this.playerLVChang(game.score);
        } else if (keyboard.lv4.isDown) {
            resetBgm();
            this.player.tint = 0xffffff;
            console.log('keyboard.lv1.isDown');
            game.score = PLAYER_LV.E;
            this.infosChange();
            this.levelChange(game.score);
            this.playerLVChang(game.score);
        } else if (keyboard.lv5.isDown) {
            this.player.tint = 0xffffff;
            console.log('keyboard.lv1.isDown');
            game.score = PLAYER_LV.F;
            this.infosChange();
            this.levelChange(game.score);
            this.playerLVChang(game.score);
        } else if (keyboard.add.isDown) {
            if (this.player.life <= myLifeLim) {
                this.player.life++;
                try {
                    this.getSFX.play();
                } catch (e) {
                }
                lifeText.setText(this.player.life > 0 ? this.player.life : 0);
            }
        } else if (keyboard.end.isDown) {
            this.showEnding();
        }
    },

    /**
     * 前提故事
     */
    story: function (cb) {
        this.startBgm = game.add.audio('start_bgm', 1, true);
        this.yesIdoSFX = game.add.audio('yes_I_do', 1, false);
        this.typeSFX = game.add.audio('type', 1, false);
        var sfx = () => {
            try {
                this.typeSFX.stop();
                this.typeSFX.play();
            } catch (e) {
            }
        };
        try {
            this.startBgm.play();
        } catch (e) {
        }

        var ep01 = () => {
            sfx();
            game.ep01 = game.add.sprite(0, 0, 'ep01');
            game.ep01.inputEnabled = true;
            game.ep01.events.onInputDown.addOnce(ep02);

            this.keyboardJsOriginalFuncToSpaceBar(KEYBOARD_KEY.SPACE_BAR, () => {
                if (game.ep01.inputEnabled) {
                    game.ep01.inputEnabled = false;
                    ep02();
                }
            }, this);

        };
        var ep02 = () => {
            sfx();
            game.ep01.inputEnabled = false;
            game.ep02 = game.add.sprite(0, 0, 'ep02');
            game.ep02.inputEnabled = true;
            game.ep02.events.onInputDown.addOnce(ep03);
            this.keyboardJsOriginalFuncToSpaceBar(KEYBOARD_KEY.SPACE_BAR, () => {
                if (game.ep02.inputEnabled) {
                    game.ep02.inputEnabled = false;
                    ep03();
                }
            }, this);
        };
        var ep03 = () => {
            sfx();
            game.ep02.inputEnabled = false;
            game.ep03 = game.add.sprite(0, 0, 'ep03');
            game.ep03.inputEnabled = true;
            game.ep03.events.onInputDown.addOnce(ep04);
            this.keyboardJsOriginalFuncToSpaceBar(KEYBOARD_KEY.SPACE_BAR, () => {
                if (game.ep03.inputEnabled) {
                    game.ep03.inputEnabled = false;
                    ep04();
                }
            }, this);
        };
        var ep04 = () => {
            sfx();
            game.ep03.inputEnabled = false;
            game.ep04 = game.add.sprite(0, 0, 'ep04');
            game.ep04.inputEnabled = true;
            game.ep04.events.onInputDown.addOnce(ep05);
            this.keyboardJsOriginalFuncToSpaceBar(KEYBOARD_KEY.SPACE_BAR, () => {
                if (game.ep04.inputEnabled) {
                    game.ep04.inputEnabled = false;
                    ep05();
                }
            }, this);
        };
        var ep05 = () => {
            try {
                this.typeSFX.stop();
                this.yesIdoSFX.play();
            } catch (e) {
            }
            game.ep04.inputEnabled = false;
            game.ep05 = game.add.sprite(0, 0, 'ep05');
            game.ep05.inputEnabled = true;
            game.ep05.events.onInputDown.addOnce(end);
            this.keyboardJsOriginalFuncToSpaceBar(KEYBOARD_KEY.SPACE_BAR, () => {
                if (game.ep05.inputEnabled) {
                    game.ep05.inputEnabled = false;
                    end();
                }
            }, this);
        };
        var end = () => {
            game.ep01.destroy();
            game.ep02.destroy();
            game.ep03.destroy();
            game.ep04.destroy();
            this.startBgm.fadeOut(3000);
            var tween = game.add.tween(game.ep05).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true, 1, 0, false);
            tween.onComplete.addOnce(function () {
                game.ep05.destroy();
                !!cb && cb();
                canPlay = true;
            }, this);
        };
        ep01();
    },

    /**
     * 創建遊戲場景與物件級設定等
     */
    onCreate: function (cb) {
        /***************************** 聲音 **********************************/
        this.playBgm = game.add.audio('play_bgm', 1, true);
        this.bossBgm = game.add.audio('boss_bgm', 1, true);
        this.endBgm = game.add.audio('end_bgm', 1, true);
        this.lossBgm = game.add.audio('loss_bgm', 1, false);
        //受擊音效
        this.hurtSFX = game.add.audio('hurt', 2, false);
        //死亡音效
        this.dieSFX = game.add.audio('die', 1, false);
        //得到獎勵音效
        this.getSFX = game.add.audio('get', 1, false);
        this.yesIdoSFX = game.add.audio('yes_I_do', 1, false);
        this.levelUpSFX = game.add.audio('level_up', 1, false);
        this.jumpSFX = game.add.audio('jump', 1, false);
        this.explodeSFX = game.add.audio('explodeSFX', 1, false);
        try {
            this.playBgm.fadeIn(500);
        } catch (e) {
        }
        /********************************* end ***********************************/

        //開啟ARCADE物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //捲動背景
        var bg = game.add.sprite(0, 0, 'bg');
        this.twigs = game.add.group();//樹枝對象池
        this.lights = game.add.group();//敵方對象池
        // 我方
        this.player = game.add.sprite(game.width / 2 + 15, game.height / 2, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('idle', [0]);
        this.player.animations.add('run', [0, 1, 2, 3, 4]);
        this.player.animations.add('catch', [5, 6, 7, 8, 9, 10, 11, 12]);
        this.player.animations.play('idle', 8, true);
        //設定碰撞框尺寸
        game.physics.arcade.enable(this.player);
        this.player.body.setSize(45, 50, 15, 50);
        this.enemies = game.add.group();//敵方對象池
        this.enemies.lastEnemyTime = 0;
        //讓我方物件會碰撞世界邊界
        this.player.body.collideWorldBounds = true;
        //虛擬手把設置
        if (!game.device.desktop) {
            this.pad = this.game.plugins.add(Phaser.VirtualJoystick);
            this.stick = this.pad.addDPad(0, 0, 200, 'dpad');
            // this.stick.alignBottomLeft(0);
            this.stick.showOnTouch = true;
            this.stick.visible = true;
            this.stick.scale = 0.8;
            this.stick.alpha = 0.25;
        }
        //分數
        twigMultiple = TWIG_MULTIPLE;
        var twigCount = () => {
            var twig = game.score * twigMultiple;
            if (twig < 10) {
                return '00' + twig;
            } else if (twig >= 10 && twig < 100) {
                return '0' + twig;
            } else if (twig >= TWIG_COUNT_LIMIT) {
                return TWIG_COUNT_LIMIT;
            } else {
                return twig;
            }
        };
        scoreText = game.add.text(game.width - 45, 60, twigCount(), styleB);
        scoreText.anchor.setTo(1, 0);

        //生命文字
        lifeText = game.add.text(155, 75, myLife, styleA);
        lifeText.anchor.setTo(0, 0);

        //等級文字
        LVText = game.add.text(128, 42, "LV:" + 1, styleC);
        LVText.anchor.setTo(0, 0);

        //樹枝文字
        this.twigText = game.add.sprite(game.width - 80, 40, 'icons');
        this.twigText.anchor.setTo(0.5, 0.5);
        this.twigText.frame = 0;

        //韓頭像
        this.avatar = game.add.sprite(30, 5, 'avatar');
        this.avatar.animations.add('normal', [0]);
        this.avatar.animations.add('hurt', [1]);
        this.avatar.animations.play('normal', 8, true);

        // 生命愛心
        this.lifeHeart = game.add.sprite(142, 85, 'icons');
        this.lifeHeart.anchor.setTo(0.5, 0.5);
        this.lifeHeart.frame = 7;

        // 稱號
        this.name = game.add.sprite(125, 30, 'icons');
        this.name.anchor.setTo(0, 0.5);
        this.name.scale.setTo(0.7, 0.7);
        this.name.frame = 1;

        // 韓霸圖
        this.end666 = game.add.sprite(0, 0, '666');
        this.end666.alpha = 0;

        this.title = game.add.image(0, 0, 'title');
        this.title.alpha = 0;
        // 失敗畫面
        this.loss = game.add.sprite(0, 0, 'loss');
        this.loss.inputEnabled = false;
        this.loss.alpha = 0;
        this.lossText = game.add.sprite(game.width / 2, game.height / 2, 'loss_text');
        this.lossText.anchor.setTo(0.5, 0.5);
        this.lossText.alpha = 0;

        // 結局動畫長條圖
        this.ending = game.add.sprite(0, 0, 'ending');
        this.ending.inputEnabled = false;
        this.ending.alpha = 0;

        /**********************  開始  ***************************/
        !!cb && cb();
    },

    /**
     * 遊戲開始
     */
    onStart: function () {
        this.player.ok = true;// 玩家存在了
        this.player.life = myLife;
        this.player.lastBulletTime = 0;
        //每隔一段時間生成樹枝
        game.time.events.loop(Phaser.Timer.SECOND * awardInterval, this.generateTwig, this);
    },

    /**
     * 前進動作
     */
    actionRun: function () {
        if (canRunAction) {
            canRunAction = false;
            try {
                this.jumpSFX.play();
            } catch (e) {
            }
            var run = this.player.animations.play('run', myActionSpeed, false);
            run.onComplete.addOnce(() => {
                canRunAction = true;
            })
        }

    },

    /**
     * 撿樹枝動作
     */
    actionGetTwig: function (cb) {
        canInvincible = true;
        var tintTween = game.add.tween(this.player).to({tint: 0x0000ff}, 100, Phaser.Easing.Cubic.Out, true, 50, 4, true);
        tintTween.onComplete.addOnce(() => {
            this.player.tint = 0xffffff;
        });
        this.player.body.velocity.set(0);
        // 撿樹枝
        var catchTwgi = this.player.animations.play('catch', myActionSpeed, false);
        catchTwgi.onComplete.addOnce(function () {
            this.player.animations.play('idle', 8, true);
            canMove = true;
            canRunAction = true;
            invincibleTimer = setTimeout(function () {
                if (game.score < LEVEL.F) {
                    canInvincible = false;
                }
                !!cb && cb();
            }, 666);
        }, this);
    },

    /**
     * 受傷
     * @param player
     */
    damage: function (player, enemy) {
        if (canHit) {
            this.avatar.animations.play('hurt', 8, true);
            this.avatar.alpha = 0;
            game.add.tween(this.avatar).to({alpha: 1}, 200, Phaser.Easing.Bounce.InOut, true).repeat(5, 20);
            canHit = false;
            player.life = player.life - hurtLife;//扣血
            player.alpha = 0;
            var tween = game.add.tween(player).to({alpha: 1}, 200, Phaser.Easing.Bounce.InOut, true);
            var anim = tween.repeat(5, 20);
            anim.onComplete.addOnce(function () {
                if (this.player.life > 0) {
                    this.avatar.animations.play('normal', 8, true);
                    canHit = true;
                }
            }, this);
            try {
                this.hurtSFX.play();
            } catch (e) {
            }
            game.camera.flash(0xff0000, 300);//畫面閃紅

            if (this.player.life <= 0) {
                if (!game.device.desktop) {
                    this.player.life = 0;
                    this.stick.visible = false;
                }
                this.avatar.animations.play('hurt', 8, true);
                this.avatar.alpha = 0;
                game.add.tween(this.avatar).to({alpha: 1}, 100, Phaser.Easing.Bounce.InOut, true).repeat(10, 20);
                player.kill();
                try {
                    this.dieSFX.play();
                } catch (e) {
                }
                var explode = game.add.sprite(player.x, player.y, 'explode');
                explode.anchor.setTo(0.5, 0.5);
                var anim = explode.animations.add('exploeAdnim');
                anim.play(8, false, false);
                anim.onComplete.addOnce(function () {
                    explode.destroy();
                    //延遲3.5秒
                    timer = setTimeout(this.gameOver.bind(this), 3500);
                }.bind(this));
            }
            lifeText.setText(player.life > 0 ? player.life : 0);
        }
    },

    /**
     * 無敵
     */
    invincible: function (player, enemy) {
        try {
            this.explodeSFX.play();
        } catch (e) {
        }
        var explode = game.add.sprite(enemy.x, enemy.y, 'explode');
        enemy.destroy();
        explode.anchor.setTo(0.5, 0.5);
        explode.scale.setTo(1.5, 1.5);
        var anim = explode.animations.add('exploeAdnim');
        anim.play(20, false, false);
        anim.onComplete.addOnce(function () {
            explode.destroy();
        });
    },

    /**
     * 玩家升等特效
     */
    playLevelUp: function () {
        canInvincible = true;
        try {
            this.levelUpSFX.play();
        } catch (e) {
        }
        var tintTween = game.add.tween(this.player).to({tint: 0xffbb00}, 100, Phaser.Easing.Cubic.Out, true, 0, 0, true);
        tintTween.repeat(8, 50).onComplete.addOnce(() => {
            this.player.tint = 0xffffff;
            canInvincible = false;
        });
    },

    /**
     * 韓霸模式金樹枝
     */
    twigLVColor: function () {
        if (game.score >= LEVEL.F && can666) {
            this.twigs.forEach((twig) => {
                twig.tint = 0xffff00;
            });
        } else {
            this.twigs.forEach((twig) => {
                twig.tint = 0xffffff;
            });
        }
    },

    /**
     * 結束遊戲
     */
    gameOver: function () {
        this.playBgm.fadeOut(2000);
        this.bossBgm.fadeOut(2000);
        clearTimeout(timer);//清除計時器
        clearTimeout(invincibleTimer);//清除計時器
        clearTimeout(startEnemyTimer);//清除計時器
        clearTimeout(textTimer);//清除計時器
        clearTimeout(textTimer2);//清除計時器
        // 玩家可再次受傷條件
        canHit = true;
        // 玩家可移動條件
        canMove = true;
        // 玩家可遊玩條件
        canPlay = false;
        // 玩家可移動動作條件
        canRunAction = true;
        // 玩家無敵條件
        canInvincible = false;
        game.score = ORIGIN_SCORE;
        this.playerLVChang(game.score);
        this.levelChange(game.score);
        var lossTween = game.add.tween(this.loss).to({alpha: 1}, 2000, Phaser.Easing.Quartic.InOut, true, 1, 0, false);
        lossTween.onComplete.addOnce(() => {
            try {
                this.lossBgm.play();
            } catch (e) {
            }
            var lossTextTween = game.add.tween(this.lossText).to({alpha: 1}, 2000, Phaser.Easing.Quartic.InOut, true, 0, 0, false);
            lossTextTween.onComplete.addOnce(() => {
                this.title.alpha = 1;
                this.loss.inputEnabled = true;
                // 回調
                var callback = () => {
                    this.playBgm.stop();
                    this.bossBgm.stop();
                    game.add.tween(this.loss).to({alpha: 0}, 2000, Phaser.Easing.Quartic.InOut, true, 0, 0, false);
                    game.add.tween(this.lossText).to({alpha: 0}, 2000, Phaser.Easing.Quartic.InOut, true, 0, 0, false).onComplete.addOnce(() => {
                        game.state.start('start');
                    });
                };
                // 鍵盤
                this.keyboardJsOriginalFuncToSpaceBar(KEYBOARD_KEY.SPACE_BAR, () => {
                    if (this.loss.inputEnabled) {
                        this.loss.inputEnabled = false;
                        callback();
                    }
                }, this);
                // 點擊
                this.loss.events.onInputDown.addOnce(() => {
                    callback();
                });
            });
        });
    },

    /**
     * 播放結局動畫
     */
    showEnding: function () {
        canHit = false;
        canInvincible = false;
        this.player.ok = false;
        this.playBgm.fadeOut(2000);
        this.bossBgm.fadeOut(2000);
        clearTimeout(timer);//清除計時器
        clearTimeout(invincibleTimer);//清除計時器
        clearTimeout(startEnemyTimer);//清除計時器
        clearTimeout(textTimer);//清除計時器
        clearTimeout(textTimer2);//清除計時器
        endingTimer = setTimeout(() => {
            var endingTween = game.add.tween(this.ending).to({alpha: 1}, 2000, Phaser.Easing.Quartic.InOut, true, 1, 0, false);
            endingTween.onComplete.addOnce(() => {
                this.title.alpha = 1;
                canPlay = false;
                try {
                    this.endBgm.fadeIn(1000);
                } catch (e) {
                }
                var endingTween = game.add.tween(this.ending).to({y: -4850}, 103000, Phaser.Easing.Linear.None, true);
                endingTween.onComplete.addOnce(() => {
                    game.score = ORIGIN_SCORE;
                    this.playerLVChang(game.score);
                    this.levelChange(game.score);
                    this.ending.inputEnabled = true;
                    // 回調
                    var callback = () => {
                        clearTimeout(endingTimer);//清除計時器
                        this.playBgm.stop();
                        this.bossBgm.stop();
                        this.endBgm.fadeOut(5000);
                        var endingTween = game.add.tween(this.ending).to({alpha: 0}, 2000, Phaser.Easing.Quartic.InOut, true, 1, 0, false);
                        endingTween.onComplete.addOnce(() => {
                            game.state.start('start');
                        });
                    };
                    // 鍵盤
                    this.keyboardJsOriginalFuncToSpaceBar(KEYBOARD_KEY.SPACE_BAR, () => {
                        if (this.ending.inputEnabled) {
                            this.ending.inputEnabled = false;
                            callback();
                        }
                    }, this);
                    // 點擊
                    this.ending.events.onInputDown.addOnce(() => {
                        callback();
                    });

                });
            });
        }, 3000);
    },

    /**
     * 加分特效
     * @param text
     * @param value
     * @param nod
     */
    textEffect: function (text, value, node, offectX, offectY, duration, style) {
        var t = game.add.text(node.x + offectX, node.y + offectY, text + value, style);
        var tween = game.add.tween(t).to({y: node.y - 50}, duration, Phaser.Easing.Sinusoidal.InOut, true);
        textTimer = setTimeout(function () {
            game.add.tween(t).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        }, 500);
        textTimer2 = setTimeout(function () {
            t.kill()
        }, 1500);
    },

    /**
     * 撿到樹枝與關卡能力切換
     * @param player
     * @param award
     */
    addTwigAndLvMgr: function (player, twig) {
        canMove = false;
        twig.kill();
        try {
            this.yesIdoSFX.play();
            this.getSFX.play();
        } catch (e) {
        }
        game.score = game.score + 1;
        // 補血
        if (player.life <= myLifeLim) {
            player.life = player.life + getLife;
            if (player.life > myLifeLim) {
                player.life = myLifeLim;
            }
        }
        this.textEffect('+', twigMultiple, twig, 0, 0, 1000, styleD);
        //撿樹枝動作回調
        this.actionGetTwig(() => {
            var lvAndTwig = this.infosChange();
            this.levelChange(game.score);
            this.playerLVChang(game.score);
            if (lvAndTwig[0] < PLAYER_LV_LIMIT) {
                this.textEffect('LV+', twigMultiple * PLAYER_LV_MULTIPLE, this.avatar, 20, 50, 2000, styleC);
            } else if (lvAndTwig[1] >= TWIG_COUNT_LIMIT) {
                // 播放結局
                this.showEnding();
            }
        });
    },

    /**
     *  UI資訊替換
     * @returns {[number, *|number]} 回傳玩家等級，樹枝數量
     */
    infosChange: function () {
        if (this.player.life <= myLifeLim) {
            lifeText.setText(this.player.life > 0 ? this.player.life : 0);
        }
        var addCount = game.score > LEVEL.F ? game.score - LEVEL.F : game.score;
        var twigCount = () => {
            var twig = game.score > LEVEL.F ? addCount * twigMultiple + LEVEL.F * TWIG_MULTIPLE : addCount * twigMultiple;
            if (twig < 10) {
                return '00' + twig;
            } else if (twig >= 10 && twig < 100) {
                return '0' + twig;
            } else if (twig >= TWIG_COUNT_LIMIT) {
                return TWIG_COUNT_LIMIT;
            } else {
                return twig;
            }
        };

        // (拾獲次數*8根樹枝)*6 = 目前 LV
        var playerLV = () => {
            var lv = game.score * twigMultiple * PLAYER_LV_MULTIPLE;
            if (lv >= PLAYER_LV_LIMIT) {
                return PLAYER_LV_LIMIT;
            } else {
                return lv;
            }

        };
        scoreText.setText(twigCount());
        LVText.setText("LV:" + playerLV());

        return [playerLV(), twigCount()];
    },

    /**
     * 隨著LV更換稱號
     * @param score 分數
     */
    playerLVChang: function (score) {
        switch (score) {
            case PLAYER_LV.A:
                twigMultiple = TWIG_MULTIPLE;
                myMaxSpeed = MY_MAX_SPEED.LV0;
                myActionSpeed = MY_ACTION_SPEED.LV0;
                this.name.frame = 1;
                break;
            case PLAYER_LV.B:
                this.playLevelUp();
                twigMultiple = TWIG_MULTIPLE;
                myMaxSpeed = MY_MAX_SPEED.LV1;
                myActionSpeed = MY_ACTION_SPEED.LV1;
                this.name.frame = 2;
                break;
            case PLAYER_LV.C:
                this.playLevelUp();
                twigMultiple = TWIG_MULTIPLE;
                myMaxSpeed = MY_MAX_SPEED.LV2;
                myActionSpeed = MY_ACTION_SPEED.LV2;
                this.name.frame = 3;
                break;
            case PLAYER_LV.D:
                this.playLevelUp();
                twigMultiple = TWIG_MULTIPLE;
                myMaxSpeed = MY_MAX_SPEED.LV3;
                myActionSpeed = MY_ACTION_SPEED.LV3;
                this.name.frame = 4;
                break;
            case PLAYER_LV.E:
                this.playLevelUp();
                twigMultiple = TWIG_MULTIPLE;
                myMaxSpeed = MY_MAX_SPEED.LV4;
                myActionSpeed = MY_ACTION_SPEED.LV4;
                this.name.frame = 5;
                break;
            case PLAYER_LV.F:
                this.player.ok = false;
                this.playBgm.pause();
                try {
                    this.bossBgm.play();
                } catch (e) {
                }
                var tween = game.add.tween(this.end666).to({alpha: 1}, 1500, Phaser.Easing.Linear.None, true, 1, 0, false);
                tween.onComplete.addOnce(() => {
                    this.end666.inputEnabled = true;
                    // 回調
                    var callback = () => {
                        var tween = game.add.tween(this.end666).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true, 0, 0, false);
                        tween.onComplete.addOnce(() => {
                            this.player.ok = true;
                            this.playLevelUp();
                            can666 = true;
                            myMaxSpeed = MY_MAX_SPEED.LV5;
                            myActionSpeed = MY_ACTION_SPEED.LV5;
                            twigMultiple = KING_TWIG_MULTIPLE;
                            this.name.frame = 6;
                        });
                    };
                    // 鍵盤
                    this.keyboardJsOriginalFuncToSpaceBar(KEYBOARD_KEY.SPACE_BAR, () => {
                        if (this.end666.inputEnabled) {
                            this.end666.inputEnabled = false;
                            callback();
                        }
                    }, this);
                    // 點籍
                    this.end666.events.onInputDown.addOnce(() => {
                        callback();
                    });
                });
                break;
            default:
                break
        }
    },

    /**
     * 關卡難度切換
     * @param score 分數
     */
    levelChange: function (score) {
        switch (score) {
            case LEVEL.A:
                enemyIntervalMin = ENEMY_INTERVAL_MIN.LV0;
                enemyIntervalMax = ENEMY_INTERVAL_MAX.LV0;
                enemySpeed = ENEMY_VEL.LV0;
                break;
            case LEVEL.B:
                enemyIntervalMin = ENEMY_INTERVAL_MIN.LV1;
                enemyIntervalMax = ENEMY_INTERVAL_MAX.LV1;
                enemySpeed = ENEMY_VEL.LV1;
                break;
            case LEVEL.C:
                enemyIntervalMin = ENEMY_INTERVAL_MIN.LV2;
                enemyIntervalMax = ENEMY_INTERVAL_MAX.LV2;
                enemySpeed = ENEMY_VEL.LV2;
                break;
            case LEVEL.D:
                enemyIntervalMin = ENEMY_INTERVAL_MIN.LV3;
                enemyIntervalMax = ENEMY_INTERVAL_MAX.LV3;
                enemySpeed = ENEMY_VEL.LV3;
                break;
            case LEVEL.E:
                enemyIntervalMin = ENEMY_INTERVAL_MIN.LV4;
                enemyIntervalMax = ENEMY_INTERVAL_MAX.LV4;
                enemySpeed = ENEMY_VEL.LV4;
                break;
            case LEVEL.F:
                enemyIntervalMin = ENEMY_INTERVAL_MIN.LV5;
                enemyIntervalMax = ENEMY_INTERVAL_MAX.LV5;
                enemySpeed = ENEMY_VEL.LV5;
                break;
            default:
                break;
        }
    },

    /**
     * 生成樹枝
     */
    generateTwig: function () {
        var x = game.rnd.integerInRange(50, 450);
        var y = game.rnd.integerInRange(150, 720);
        var rect = 40;
        if ((x > this.player.x - rect && x < this.player.x + rect) || (y > this.player.y - rect && y < this.player.y + rect)) {
            this.generateTwig();
            return;
        }
        var twig = this.twigs.getFirstExists(false, true, x, y, 'twig');
        game.physics.arcade.enable(twig);
    },

    /**
     * 檢查碰撞框
     */
    checkCollision: function () {
        if (game.score >= LEVEL.F) {
            canInvincible = true;
        }
        /*** 敵方我方碰撞 ***/
        canInvincible ? game.physics.arcade.overlap(this.enemies, this.player, this.invincible, null, this) : game.physics.arcade.overlap(this.enemies, this.player, this.damage, null, this);
        /*** 樹枝我方碰撞 ***/
        game.physics.arcade.overlap(this.twigs, this.player, this.addTwigAndLvMgr, null, this);
    },

    /**
     * 紀錄生成當前的位置目錄
     */
    saveCarIndex: 0,

    /**
     * 敵方生成
     */
    generateEnemy: function () {
        var now = game.time.now;//抓取當下時間 phaser函式庫
        var time = game.rnd.integerInRange(enemyIntervalMin, enemyIntervalMax);
        // var enemyVel = game.rnd.integerInRange(enemyVelMin, enemyVelMax);
        var enemyVel = enemySpeed;
        if (now - this.enemies.lastEnemyTime > time) {
            /************************** 敵方生成 ******************************/
            var enemyWidth = game.cache.getImage('enemy').width;
            var enemyHeight = game.cache.getImage('enemy').height;
            var index = game.rnd.integerInRange(1, 4);
            if (index === this.saveCarIndex) {
                this.generateEnemy();
                return;
            }
            var x;
            var y;
            switch (index) {
                case 1:
                    x = 70;
                    y = -300;
                    break;
                case 2:
                    x = 160;
                    y = -300;
                    break;
                case 3:
                    x = 350;
                    y = 1050;
                    break;
                case 4:
                    x = 440;
                    y = 1050;
                    break;
            }
            var enemy = this.enemies.getFirstExists(false, true, x, y, 'enemy');
            var light = this.lights.getFirstExists(false, true, -60, -250, 'light');
            light.alpha = 0.3;
            enemy.addChild(light);
            enemy.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable(enemy);
            enemy.body.setSize(enemyWidth, enemyHeight);//設定碰撞框尺寸
            if (index === 1 || index === 2) {
                enemy.scale.y = -1;
                enemy.body.velocity.y = enemyVel;
            }
            if (index === 3 || index === 4) {
                enemy.scale.y = 1;
                enemy.body.velocity.y = -enemyVel;
            }
            enemy.lastFireTime = 0;
            // enemy.checkWorldBounds = true;//檢查邊界
            // enemy.outOfBoundsKill = true;//敵方飛出邊界消除
            this.enemies.lastEnemyTime = now;
            this.saveCarIndex = index;
        }
    },

    /**
     * 移除出界敵方
     */
    destroyOutEnemies: function () {
        this.enemies.forEach((enemy) => {
            if (enemy.y > 1200 || enemy.y < -400) {
                enemy.destroy();
            }
        });
    },

    /**
     * 鍵盤控制器
     */
    keyboardControllerPlay: function () {
        if (keyboard.left.isDown || keyboard.a.isDown) {
            this.player.scale.x = -1;
            this.player.body.velocity.x = -myMaxSpeed;
            this.actionRun();
        } else if (keyboard.right.isDown || keyboard.d.isDown) {
            this.player.scale.x = 1;
            this.player.body.velocity.x = myMaxSpeed;
            this.actionRun();
        } else if (keyboard.up.isDown || keyboard.w.isDown) {
            this.player.body.velocity.y = -myMaxSpeed;
            this.actionRun();
        } else if (keyboard.down.isDown || keyboard.s.isDown) {
            this.player.body.velocity.y = myMaxSpeed;
            this.actionRun();
        } else {
            this.player.body.velocity.set(0);
        }
    },

    /**
     * 虛擬手把控制器
     */
    joystickController: function () {
        if (this.stick.isDown) {
            this.player.body.velocity.set(0);
            this.actionRun();
            if (this.stick.direction === Phaser.LEFT) {
                this.player.scale.x = -1;
                this.player.body.velocity.x = -myMaxSpeed;
            } else if (this.stick.direction === Phaser.RIGHT) {
                this.player.scale.x = 1;
                this.player.body.velocity.x = myMaxSpeed;
            } else if (this.stick.direction === Phaser.UP) {
                this.player.body.velocity.y = -myMaxSpeed;
            } else if (this.stick.direction === Phaser.DOWN) {
                this.player.body.velocity.y = myMaxSpeed;
            } else {
                this.player.body.velocity.set(0);
            }
        }
    },

    /**
     * 原生鍵盤監聽
     * @param cb
     * @param target
     */
    keyboardJsOriginalFuncToSpaceBar: function (key, cb, target) {
        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == key) {
                !!cb && cb();
            }
        }.bind(target);
    }
}


/*************** 加入state ******************/

game.state.add('boot', game.State.boot);
game.state.add('load', game.State.load);
game.state.add('start', game.State.start);
game.state.add('play', game.State.play);
game.state.start('boot');

/*******************************************/