/**
 * Created by wzm on 14/12/6.
 */
var GameController = function (layer) {
    this.init(layer);
}
GameController.prototype = {
    _gameLayer: null,
    _enemyController: null,
    _heroController: null,
    _itemController: null,
    _gameState: com.gameState.stop,
    init: function (layer) {
        this._gameLayer = layer;
        this._heroController = new HeroController(this);
        this._enemyController = new EnemyController(this);
        this._itemController = new ItemController(this);
    },
    getGameLayer: function () {
        return this._gameLayer;
    },
    update: function (dt) {
        if (this._gameState == com.gameState.start) {
            this._enemyController.update(dt);
            this._heroController.update(dt);
            this._itemController.update(dt);
        } else {
        }
    },
    gamePause: function () {

    },
    getGameState: function () {
        return this._gameState;
    },
    setGameState: function (state) {
        this._gameState = state;
    },
    gameLost: function () {
        this._gameState = com.gameState.fail;
        this._gameLayer.toggleUI(true);
    },
    getHeroController: function () {
        return this._heroController;
    },
    getEnemyController: function () {
        return this._enemyController;
    },
    onTouchBegan: function (touch, event) {
        if (this._gameState == com.gameState.start) {
            this._heroController.onTouchBegan(touch, event);
        }
    },
    onTouchMoved: function (touch, event) {
        if (this._gameState == com.gameState.start) {
            this._heroController.onTouchMoved(touch, event);
        }
    },
    onTouchEnded: function (touch, event) {
        if (this._gameState == com.gameState.start) {
            this._heroController.onTouchEnded(touch, event);
        }
    }
}