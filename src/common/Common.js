/**
 * Created by wzm on 14/12/6.
 */
var com = {};
com.direction = {
    up: 0,
    right: 1,
    down: 2,
    left: 3
};
com.zorder = {
    bg: 0,
    person: 10,
    ui: 100
}
com.gameState = {
    stop: 0,
    pause: 1,
    start: 2,
    restart: 3,
    fail: 4
};
com.skillType = {
    cycle: 0,
    left: 1,
    right: 2,
    line: 3
}

com.arena = {
    xMin: 53,
    xMax: 750,
    yMin: 43,
    yMax: 405
};

/**
 * add sprite frame caches
 * @param plist
 * @param png
 */
com.addSpriteFrames = function (plist, png) {
    cc.spriteFrameCache.addSpriteFrames(plist, png);
}
com.dieAction = null;

com._makeDieAction = function () {
    if (com.dieAction == null) {
        var frames = [];
        for (var i = 1; i < 12; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame("bomb" + i + ".png");
            frames.push(frame);
        }
        com.dieAction = cc.animate(new cc.Animation(frames, 0.05));
    }
    return com.dieAction.clone();
}
com.createDieSprite = function (parent, pos, callback) {
    if (parent) {
        var action = com._makeDieAction();
        var sprite = new cc.Sprite("#bomb1.png");
        sprite.setPosition(pos);
        parent.addChild(sprite);
        sprite.runAction(cc.sequence(action, cc.callFunc(function () {
            sprite.removeFromParent(true);
            if (callback) callback();
        }, this)));
    }
}
