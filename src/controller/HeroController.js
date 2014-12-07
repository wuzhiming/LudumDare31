/**
 * Created by wzm on 14/12/6.
 * about hero
 */
var HeroController = function (controller) {
    this.init(controller);
}
HeroController.prototype = {
    _snake: null,
    _heroList: null,
    _runLayer: null,
    _enemyList: null,
    _controller: null,
    init: function (controller) {
        this._controller = controller;
        this._runLayer = controller.getGameLayer();
        var list = [new CycleHero()];
        this._snake = new Snake(this._runLayer, list);
        this._heroList = this._snake.getHeroList();
        this._enemyList = [];
    },
    addHero: function (hero) {
        this._snake.addHero(hero);
    },
    update: function (dt) {
        this._snake.update(dt);
        this.updateHero(dt);
        this.checkEatSelf();
    },
    /**
     *更新英雄的update
     * @param dt
     */
    updateHero: function (dt) {
        var herolist = this._heroList;
        for (var i = 0; i < herolist.length; i++) {
            var hero = herolist[i];
            hero.update(dt);
            this.checkCrash(hero);
            this.checkAttack(hero);
            this.checkItem(hero);
        }
    },
    checkEatSelf: function () {
        var snake = this._snake;
        var sp1 = snake.sprites[0];
        for (var i = 1; i < snake.sprites.length; ++i) {
            if (cc.pDistance(sp1.getPosition(), snake.sprites[i].getPosition()) < 10) {
                this._controller.gameLost();
            }
        }
    },
    /**
     * 判断英雄的攻击
     * @param hero
     */
    checkAttack: function (hero) {
        //var enemyList = this._enemyList;
        var enemyList = this._controller.getEnemyController().getEnemies();
        var skillType = hero.getSkillType();
        for (var i = 0; i < enemyList.length; i++) {
            var enemy = enemyList[i];
            if (!enemy.getAttackStatus()) continue;
            if (cc.pDistance(enemy.getPosition(), hero.getPosition()) < enemy.width / 2 + hero.width / 2) {
                this.makAllHeroDie();
                return;
            }
            if (skillType == com.skillType.cycle) {//圆形攻击
                if (hero.checkAttackTime()) {
                    if (hero.checkAttackRadius(enemy)) {
                        hero.attack();
                        if (enemy.beAttack(hero)) {//挂了
                            this.addDieSprite(enemy);
                            enemyList.splice(i, 1);
                            i--;
                        }
                    }
                }
            } else if (skillType == com.skillType.line) {//直线
                if (hero.checkAttackTime()) {
                    hero.attack(this._runLayer);
                }
                var bulletArray = hero.getBulletArray();
                for (var j = 0; j < bulletArray.length; j++) {
                    var bullet = bulletArray[j];
                    if (cc.rectIntersectsRect(bullet.getBoundingBox(), enemy.getBoundingBox())) {
                        if (enemy.beAttack(hero)) {//挂了
                            bullet.removeFromParent(true);
                            this.addDieSprite(enemy);
                            bulletArray.splice(j, 1);
                            j--;
                            enemyList.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
        }
    },
    addDieSprite: function (enemy) {
        var pos = enemy.getPosition();
        enemy.die();
        this._runLayer.scoreLabel.setString(++this._runLayer.score);
        //com.createDieSprite(this._runLayer, pos);
    },
    makAllHeroDie: function () {
        var self = this;
        for (var i = 0; i < this._heroList.length; i++) {
            var hero = this._heroList[i];
            if (i == this._heroList.length - 1) {
                hero.die(function () {
                    self._controller.gameLost();
                });
            } else {
                hero.die();
            }
        }
    },
    /**
     * 判断是否撞墙
     * @param hero
     */
    checkCrash: function (hero) {
        var pos = hero.getPosition();
        var hfWidth = hero.width / 2;
        var hfHeight = hero.height / 2;
        if (pos.x + hfWidth > com.arena.xMax || pos.x - hfWidth < com.arena.xMin || pos.y + hfHeight > com.arena.yMax || pos.y - hfHeight < com.arena.yMin) {
            this.makAllHeroDie();
        }
    },
    onTouchBegan: function (touch, event) {
        this._snake.onTouchBegan(touch, event);
    },
    onTouchMoved: function (touch, event) {
        this._snake.onTouchMoved(touch, event);
    },
    onTouchEnded: function (touch, event) {
        this._snake.onTouchEnded(touch, event);
    },
    checkItem: function (hero) {
        var itemlist = this._controller._itemController.getItems();
        for (var i = 0; i < itemlist.length; ++i) {
            var item = itemlist[i];
            if (hero.checkItem(item) && item.protectd == false) {
                var type = item.getType();
                if (type == Item.type.hero) {
                    var random = Math.random();
                    var hero;
                    if (random > 0.8) {
                        hero = new LineHero();
                    } else {
                        hero = new CycleHero();
                    }
                    this.addHero(hero);
                }
                else if (type == Item.type.inverse) {
                    var layer = this._runLayer;

                    var snake = this._snake;
                    if (!snake.inverse) {
                        layer.runAction(cc.sequence(cc.callFunc(function () {
                                snake.setInverse(true);
                                layer.showInverseTimer();
                            }), cc.delayTime(3), cc.callFunc(function () {
                                snake.setInverse(false);
                                layer.closeInverseTimer();
                            })
                        ));
                    }

                } else if (type == Item.type.boom) {
                    var layer = this._runLayer;
                    var enemies = this._controller._enemyController.getEnemies();
                    for (var i in enemies) {
                        com.createDieSprite(layer, enemies[i].getPosition());
                        enemies[i].die();
                    }
                    layer.score += enemies.length;
                    layer.scoreLabel.setString(layer.score);
                }

                this._controller._itemController.removeItem(item);
            }
        }
    }
}