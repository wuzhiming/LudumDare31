/**
 * Created by wzm on 14/12/6.
 */
var Hero = BasePerson.extend({
    _skill: null,
    ctor: function () {
        this._super();
        this.setFlag("Hero");
    },

    checkAttackRadius: function (enemy) {
        var position = this.getPosition();
        if (this._skillType == com.skillType.cycle) {
            if (cc.pDistance(position, enemy.getPosition()) < this.width / 2 + this._attackRadius + enemy.width / 2) {
                return true;
            }
        }
        return false;
    },
    checkItem: function (item) {
        if (cc.rectIntersectsRect(this.getBoundingBox(), item.getBoundingBox())) {
            return true;
        }
        return false;
    }
});
var CycleHero = Hero.extend({
    _attackAnim: null,
    ctor: function () {
        this._super();
        var list = [
            cc.spriteFrameCache.getSpriteFrame("dir0.png"),
            cc.spriteFrameCache.getSpriteFrame("dir1.png"),
            cc.spriteFrameCache.getSpriteFrame("dir2.png"),
            cc.spriteFrameCache.getSpriteFrame("dir3.png")
        ];
        this.init(list, com.direction.down);
        this.setSkillType(com.skillType.cycle);
        this.initSkill();
    },
    initSkill: function () {
        var frames = [];
        for (var i = 1; i < 11; i++) {
            var frame = cc.spriteFrameCache.getSpriteFrame(i + ".png");
            frames.push(frame);
        }
        this._skill = new Skill(frames);
        //this._skill.setRotation(180);
        this._skill.x = this.width / 2;
        this._skill.y = (this._skill.height - this.height) / 2;
        this.addChild(this._skill);
        //this._skill.showAttack(this._currentDirection);
        this._skill.opacity = 0;
    },
    attack: function () {
        this._super();
        audioManager.playEffect(res.attack_wav);
        this._skill.opacity = 255;
        this._skill.showAttack(this._currentDirection);
        if (this._currentDirection == com.direction.down) {
            this._skill.x = this.width / 2;
            this._skill.y = (this._skill.height - this.height) / 2;
        } else if (this._currentDirection == com.direction.left) {
            this._skill.x = this._skill.width / 2 - this.width / 2;
            this._skill.y = this.height / 2;
        } else if (this._currentDirection == com.direction.right) {
            this._skill.x = this.width / 2;
            this._skill.y = this.height / 2;
        }
        this._skill.runAction(cc.sequence(cc.delayTime(0.3), cc.callFunc(function () {
            this._skill.opacity = 0;
            this._skill.x = this.width / 2;
            this._skill.y = this._skill.height / 2;
        }, this)));
    }
});
var LineHero = Hero.extend({
    _bulletArray: null,
    ctor: function () {
        this._super();
        var list = [
            cc.spriteFrameCache.getSpriteFrame("gdir0.png"),
            cc.spriteFrameCache.getSpriteFrame("gdir1.png"),
            cc.spriteFrameCache.getSpriteFrame("gdir2.png"),
            cc.spriteFrameCache.getSpriteFrame("gdir3.png")
        ];
        this.init(list, com.direction.down);
        this._bulletArray = [];
        this.setSkillType(com.skillType.line);
        this.setAttackSpeed(3);
    },
    addBulletArray: function (bullet) {
        this._bulletArray.push(bullet);
    },
    getBulletArray: function () {
        return this._bulletArray;
    },
    attack: function (parent) {
        this._super();
        audioManager.playEffect(res.shoot_wav);
        var bullet = new Bullet(this._currentDirection);
        bullet.setPosition(this.getPosition());
        parent.addChild(bullet, com.zorder.person);
        this.addBulletArray(bullet);
    },
    update: function (dt) {
        this._super(dt);
        for (var i = 0; i < this._bulletArray.length; i++) {
            var bullet = this._bulletArray[i];
            bullet.update(dt);
            var pos = bullet.getPosition();
            var hfWidth = bullet.width / 2;
            var hfHeight = bullet.height / 2;
            if (pos.x + hfWidth > com.arena.xMax || pos.x - hfWidth < com.arena.xMin || pos.y + hfHeight > com.arena.yMax || pos.y - hfHeight < com.arena.yMin) {
                bullet.removeFromParent(true);
                this._bulletArray.splice(i, 1);
                i--;
            }
        }
    }
});