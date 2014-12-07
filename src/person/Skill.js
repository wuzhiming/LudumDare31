/**
 * Created by wzm on 14/12/6.
 */
var Skill = cc.Sprite.extend({
    _action: null,
    ctor: function (reslist) {
        this._super();
        this.init(reslist);
    },
    init: function (reslist) {
        this.initWithSpriteFrame(reslist[0]);
        this._action = cc.sequence(cc.animate(new cc.Animation(reslist, 0.04)));
    },
    showAttack: function (direciton) {
        this.setRotation(90 * direciton);
        this.runAction(this._action.clone());
    }
});
var Bullet = cc.Sprite.extend({
    _direction: null,
    _speed: 300,
    ctor: function (direction) {
        this._super();
        this.initWithFile(res.bullet_png);
        this._direction = direction;
        this.setRotation(direction * 90);
    },
    update: function (dt) {
        if (this._direction == com.direction.up) {
            this.y += this._speed * dt;
        } else if (this._direction == com.direction.right) {
            this.x += this._speed * dt;
        } else if (this._direction == com.direction.down) {
            this.y -= this._speed * dt;
        } else {
            this.x -= this._speed * dt;
        }
    }
})