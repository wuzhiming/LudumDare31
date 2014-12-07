/**
 * Created by wzm on 14/12/6.
 */
var GameScene = cc.Scene.extend({
    isRestart: false,
    ctor: function (restart) {
        this._super();
        this.isRestart = restart || false;
    },
    onEnter: function () {
        this._super();
        this.preloadSource();
        var layer = new GameLayer();
        this.addChild(layer);
        if (this.isRestart) {
            layer.ui.setVisible(false);
            layer.gameController.setGameState(com.gameState.start);
        }
    },
    preloadSource: function () {
        com.addSpriteFrames(res.hero_plist, res.hero_png);
        com.addSpriteFrames(res.bomb_plist, res.bomb_png);
        com.addSpriteFrames(res.attack_plist, res.attack_png);
    }
});
var GameLayer = cc.Layer.extend({
    touchListener: null,
    gameController: null,
    ui: null,
    scoreBoard: null,
    score: 0,
    scoreLabel: null,
    ctor: function () {
        this._super();
    },
    onEnter: function () {
        this._super();
        this.initUI();
        this.initData();
        mmm = this;
    },
    initUI: function () {
        var bg = new cc.Sprite(res.mainbg_jpg);
        bg.anchorX = 0;
        bg.anchorY = 0;
        this.addChild(bg, com.zorder.bg);

        this.ui = new cc.Sprite(res.ui_bg);
        this.ui.x = cc.winSize.width / 2;
        this.ui.y = cc.winSize.height / 2;
        this.ui.scale = 0;

        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.loadTextures(res.button1, res.button2, "");
        this.ui.addChild(button);
        button.x = this.ui.width / 2;
        button.y = this.ui.height / 2 - 30;
        var that = this;
        button.addTouchEventListener(function () {
            var stat = that.gameController.getGameState();
            if (stat == com.gameState.stop) {
                //开始游戏
                that.toggleUI(false);
            } else if (stat == com.gameState.fail) {
                //重启游戏
                cc.director.runScene(new GameScene(true));
            }
        });

        var txt = new cc.Sprite(res.button_txt);
        button.addChild(txt);
        txt.x = button.width / 2;
        txt.y = button.height / 2;

        var title_bg = new cc.Sprite(res.title_bg);
        this.ui.addChild(title_bg);
        title_bg.x = this.ui.width / 2;
        title_bg.y = this.ui.height / 2 + 40;

        var title = new cc.LabelTTF("Cocos Snake", "Arial", 20);
        title.x = title_bg.width/2;
        title.y = title_bg.height/2;
        title_bg.addChild(title);

        this.addChild(this.ui, com.zorder.ui);

        //记分牌
        this.scoreBoard = new cc.Sprite(res.score_bg);
        this.addChild(this.scoreBoard);
        this.scoreBoard.x = cc.winSize.width - this.scoreBoard.width / 2;
        this.scoreBoard.y = cc.winSize.height - this.scoreBoard.height / 2;

        var txt1 = new cc.LabelTTF("Score : ", "Arial", 15);
        txt1.x = 40;
        txt1.y = this.scoreBoard.height - 25;
        this.scoreBoard.addChild(txt1);

        this.scoreLabel = new cc.LabelTTF("", "Arial", 15);
        this.scoreLabel.x = 40 + txt1.width;
        this.scoreLabel.y = txt1.y;
        this.scoreLabel.setString(this.score);
        this.scoreBoard.addChild(this.scoreLabel);
        this.toggleUI(true);
    },
    toggleUI: function (status) {
        if (status) {
            this.ui.setVisible(true);
            var fadeIn = cc.sequence(cc.scaleTo(0.3, 1.05), cc.scaleTo(0.2, 1));
            this.ui.runAction(fadeIn);
        } else {
            var fadeOut = cc.sequence(cc.scaleTo(0.2, 0.4), cc.callFunc(function () {
                this.ui.setVisible(false);
                this.gameController.setGameState(com.gameState.start);
            }, this));
            this.ui.runAction(fadeOut);
        }
    },
    initData: function () {
        this.gameController = new GameController(this);
        this.initTouch();
        this.scheduleUpdate();
        audioManager.playMusic(res.mainbb_mp3, true);
    },
    update: function (dt) {
        this.gameController.update(dt);
    },
    initTouch: function () {
        var that = this;
        if (this.touchListener == null) {
            that.touchListener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    that.gameController.onTouchBegan(touch, event);
                    return true;
                },
                onTouchMoved: function (touch, event) {
                    that.gameController.onTouchMoved(touch, event);
                },
                onTouchEnded: function (touch, event) {
                    that.gameController.onTouchEnded(touch, event);
                }
            });
            cc.eventManager.addListener(that.touchListener, that);
        }
    },
    pauseGame: function () {

    },
    resumeGame: function () {

    },
    restartGame: function () {

    },
    showInverseTimer: function () {
        this.timer = new cc.Node();

        var bg = new cc.Sprite(res.timer_bg);
        this.timer.addChild(bg);
        bg.x = 70;
        bg.y = 15;

        var progress = new cc.ProgressTimer(new cc.Sprite(res.timer));
        progress.type = cc.ProgressTimer.TYPE_BAR;
        progress.x = bg.x;
        progress.y = bg.y;
        //progres
        progress.runAction(cc.progressFromTo(3, 100, 0));
        progress.setMidpoint(cc.p(0, 0.5));
        this.timer.addChild(progress);
        var txt = new cc.LabelTTF("Direction inversed!", "Arial", 15);
        var act = cc.sequence(cc.scaleTo(0.2, 1.2), cc.callFunc(function () {
            //txt.setColor(cc.color(255, 0, 0));
        }, this),cc.scaleTo(0.3,1.0),cc.callFunc(function () {
            txt.setColor(cc.color(255, 255, 255));
        },this)).repeatForever();
        txt.runAction(act);
        this.timer.addChild(txt);
        txt.x = 80;
        txt.y = 30;
        this.scoreBoard.addChild(this.timer);
    },
    closeInverseTimer: function () {
        this.scoreBoard.removeChild(this.timer);
    }
});