/**
 * Created by wzm on 14/12/6.
 */

var BasePerson = cc.Sprite.extend({
    _life: 2,//生命
    _attack: 1,//攻击力
    _attackSpeed: 1,//攻击间隔
    _attackRadius: 10,//攻击距离
    _currentDirection: com.direction.down,//当前方向
    _textureList: null,
    _flag: "BasePerson",//tag标签，调试方便
    _action: null,
    _mdt: 0,
    _canAttack: false,
    _skillType: null,
    _beingAttack: false,
    _dieAction: null,
    _mainSprite: null,
    _shadow: null,
    ctor: function () {
        this._super();
    },
    init: function (imagelist, dir) {
        this._textureList = imagelist;
        this._currentDirection = dir;
        this._mainSprite = new cc.Sprite(this._textureList[dir]);
        this.setTextureRect(cc.rect(this.x, this.y, this._mainSprite.width, this._mainSprite.height));
        this._mainSprite.x = this.width / 2;
        this._mainSprite.y = this.height / 2;
        this.addChild(this._mainSprite, com.zorder.person);
        this.setOpacity(0);
        this.addBottomShadow();
        this.initAnimation();
    },
    initAnimation: function () {
        var action = cc.sequence(
            cc.spawn(cc.moveTo(0.4, cc.p(this._mainSprite.x, this._mainSprite.y + 6)).easing(cc.easeIn(0.5)), cc.scaleTo(0.4, 0.95, 1.05).easing(cc.easeIn(0.5))),
            cc.delayTime(0.08),
            cc.spawn(cc.moveTo(0.4, cc.p(this._mainSprite.x, this._mainSprite.y)).easing(cc.easeOut(0.5)), cc.scaleTo(0.4, 1.05, 0.95).easing(cc.easeOut(0.5)))
        ).repeatForever();
        this._mainSprite.runAction(action);
        var shadowAction = cc.sequence(cc.scaleTo(0.4, 0.7).easing(cc.easeIn(0.5)), cc.delayTime(0.08), cc.scaleTo(0.4, 1).easing(cc.easeOut(0.5))).repeatForever();
        this._shadow.runAction(shadowAction);
    },
    addBottomShadow: function () {
        this._shadow = new cc.Sprite("#shadow.png");
        this.addChild(this._shadow, com.zorder.bg);
        this._shadow.x = this.width / 2;
    },
    setCurrentDirection: function (dir) {
        if (dir != this._currentDirection) {
            this._mainSprite.initWithSpriteFrame(this._textureList[dir]);
            this.setTextureRect(cc.rect(this.x, this.y, this._mainSprite.width, this._mainSprite.height));
            this._currentDirection = dir;
        }
    },
    update: function (dt) {
        this._mdt += dt;
        if (this._mdt > this._attackSpeed) {
            this._canAttack = true;
        }
    },
    checkAttackTime: function () {
        return this._canAttack;
    },
    checkAttackRadius: function (enemy) {

    },
    getCurrentDirection: function () {
        return this._currentDirection;
    },
    /**
     * 打人
     */
    attack: function () {
        this._canAttack = false;
        this._mdt = 0;
    },

    /**
     *被打
     * @param enemy
     * @returns {boolean} 判断是否挂了
     */
    beAttack: function (enemy) {
        var nowLife = enemy.getAttack() - this._life;
        this._life = nowLife >= 0 ? nowLife : 0;
        if (this._life > 0) {
            if (!this._beingAttack) {
                this._beingAttack = true;
                var action = cc.sequence(cc.fadeTo(0.15, 100), cc.fadeTo(0.15, 255), cc.callFunc(function () {
                    this._beingAttack = false;
                }, this));
                this.runAction(action);

                //todo 这个action有bug
                //this.runAction(cc.sequence(cc.delayTime(0.2),cc.sequence(cc.fadeOut(0.1), cc.fadeIn(0.1)).repeat(3) , cc.callFunc(function () {
                //    this._beingAttack = false;
                //}, this)));
            }
            return false;
        } else {
            return true;
        }
    },
    /**
     * 挂
     */
    die: function (cb) {
        var parent = this.getParent();
        var pos = this.getPosition();
        this.removeFromParent(true);
        com.createDieSprite(parent, pos, cb);
    },
    getAttackSpeed: function () {
        return this._attackSpeed;
    },
    setAttackSpeed: function (speed) {
        this._attackSpeed = speed;
    },
    getAttackRaidus: function () {
        return this._attackRadius;
    },
    getAttack: function () {
        return this._attack;
    },
    setAttack: function (attack) {
        this._attack = attack;
    },
    getSkillType: function () {
        return this._skillType;
    },
    setSkillType: function (type) {
        this._skillType = type;
    },
    getLife: function () {
        return this._life;
    },
    setLife: function (life) {
        this._life = life
    },
    setFlag: function (flag) {
        this._flag = flag;
    },
    getFlag: function () {
        return this._flag;
    }
});