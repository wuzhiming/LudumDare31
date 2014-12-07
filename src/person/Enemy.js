/**
 * Created by wzm on 14/12/6.
 */
var Enemy = BasePerson.extend({
    _speed: 1.5,
    _time: 0,
    _changed: false,
    _canAttack: false,
    ctor: function () {
        this._super();
        this.setFlag("Enemy");
        var substr = "m";
        if (Math.random() > 0.5) {
            substr = "b";
        }
        var list = [
            cc.spriteFrameCache.getSpriteFrame(substr + "dir0.png"),
            cc.spriteFrameCache.getSpriteFrame(substr + "dir1.png"),
            cc.spriteFrameCache.getSpriteFrame(substr + "dir2.png"),
            cc.spriteFrameCache.getSpriteFrame(substr + "dir3.png")
        ];
        var direction = Math.random() * 3 + 0.99;

        this.init(list, Math.floor(direction));
        this._mainSprite.opacity = 0;
        this._shadow.opacity = 0;
        this.initAppear();

        //this.scheduleOnce(this.die, 2);
    },
    initAppear: function () {
        var action = cc.sequence(cc.fadeTo(1, 255), cc.callFunc(function () {
            this._canAttack = true;
        }, this));
        this._mainSprite.runAction(action.clone());
        this._shadow.runAction(action);
    },
    getAttackStatus: function () {
        return this._canAttack;
    },
    update: function (dt) {
        this._time += dt;

        if (this._time > 1 + Math.random()) {
            this.setCurrentDirection(Math.abs((this.getCurrentDirection() + (Math.random() < 0.5 ? 1 : -1)) % 4));
            this._time = 0;
        }

        if (this.x < com.arena.xMin + 5) {
            this.y > com.arena.yMin - 5 ? this.setCurrentDirection(com.direction.right) : this.setCurrentDirection(com.direction.down);
            this._time = 0;
        }
        else if (this.y < com.arena.yMin + 5) {
            this.x > com.arena.xMax - 5 ? this.setCurrentDirection(com.direction.up) : this.setCurrentDirection(com.direction.right);
            this._time = 0;
        }
        else if (this.x > com.arena.xMax - 5) {
            this.y < com.arena.yMax - 5 ? this.setCurrentDirection(com.direction.left) : this.setCurrentDirection(com.direction.up);
            this._time = 0;
        }

        else if (this.y > com.arena.yMax - 5) {
            this.x < com.arena.xMin + 5 ? this.setCurrentDirection(com.direction.down) : this.setCurrentDirection(com.direction.left);
            this._time = 0;
        }

        if (cc.pDistance(this.getPosition(), cc.p(0, 480)) < 100) {
            this.setCurrentDirection(com.direction.down);
        }

        if (this.getCurrentDirection() == com.direction.up) {
            this.y += this._speed;
        } else if (this.getCurrentDirection() == com.direction.right) {
            this.x += this._speed;
        } else if (this.getCurrentDirection() == com.direction.down) {
            this.y -= this._speed;
        } else if (this.getCurrentDirection() == com.direction.left) {
            this.x -= this._speed;
        }
    },

    die: function () {
        var p = this.getPosition();
        var layer = this.parent;
        if (layer) {
            var r = Math.random();
            if (r < 0.33)
                layer.gameController._itemController.addItem(p);
            this.removeFromParent(true);
        }
    }
});