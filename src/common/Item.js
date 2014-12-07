/**
 * Created by joshua on 14/12/7.
 */

var Item = cc.Sprite.extend({
    _type: null,
    _shadow: null,
    protectd: true,
    ctor: function () {
        this._super();
        this.initWithFile(res.item_png);
        var r = Math.random();
        if (r < 0.66)
            this._type = Item.type.hero;
        else if (r < 0.9)
            this._type = Item.type.boom;
        else
            this._type = Item.type.inverse;
        //this.addBottomShadow();
        this.initAnimation();
    },
    initAnimation: function () {
        var action = cc.sequence(cc.scaleTo(0.3, 0.95, 1), cc.delayTime(0.1), cc.scaleTo(0.3, 1, 0.95)).repeatForever();
        this.runAction(action);
    },
    addBottomShadow: function () {
        this._shadow = new cc.Sprite("#shadow.png");
        this.addChild(this._shadow, com.zorder.bg);
        this._shadow.x = this.width / 2;
    },
    getType: function () {
        return this._type;
    }
});

Item.type = {
    hero: 0,
    inverse: 1,
    boom: 2
};