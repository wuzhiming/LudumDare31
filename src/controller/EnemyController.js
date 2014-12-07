/**
 * Created by joshua on 14/12/6.
 */
var EnemyController = function (c) {
    this.stage = c.getGameLayer();
    //this.enemy_lt = null;
    //this.enemy_rt = null;
    //this.enemy_rb = null;
    //this.enemy_lb = null;
    this.enemy = [];
    //this._needAddEnemy = false;
    this._time = 0;
    this.add1 = false;
    this.add3 = false;
    this.add6 = false;
    this.add10 = false;
    this.init();
};
EnemyController.prototype.getEnemies = function () {
    //var ret = [];
    //if(this.enemy_lb && this.enemy_lb.parent)
    //    ret.push(this.enemy_lb);
    //if(this.enemy_rb && this.enemy_rb.parent)
    //    ret.push(this.enemy_rb);
    //if(this.enemy_lt && this.enemy_lt.parent)
    //    ret.push(this.enemy_lt);
    //if(this.enemy_rt && this.enemy_rt.parent)
    //    ret.push(this.enemy_rt);
    return this.enemy;
};

EnemyController.prototype.init = function () {
    //this.enemy_lt = new Enemy();
    //var point = cc.p(com.arena.xMin + 100 + Math.random() * cc.winSize.width / 2 * 0.7, cc.winSize.height/2 + Math.random() * cc.winSize.height/2 - 145);
    //this.enemy_lt.setPosition(point);
    //this.stage.addChild(this.enemy_lt);
    //
    //this.stage.scheduleOnce(this.addEnemy.bind(this), 3);
    //this.stage.scheduleOnce(this.addEnemy.bind(this), 6);
};

EnemyController.prototype.update = function (dt) {
    this._time += dt;
    //if(this.enemy_lb && this.enemy_lb.parent)
    //    this.enemy_lb.update(dt);
    //if(this.enemy_rt && this.enemy_rt.parent)
    //    this.enemy_rt.update(dt);
    //if(this.enemy_lt && this.enemy_lt.parent)
    //    this.enemy_lt.update(dt);
    //if(this.enemy_rb && this.enemy_rb.parent)
    //    this.enemy_rb.update(dt);
    //
    //if(this._needAddEnemy){
    //    this.stage.scheduleOnce(this.addEnemy.bind(this), 3);
    //    this._needAddEnemy = false;
    //}

    for (var i = 0; i < this.enemy.length; ++i) {
        this.enemy[i].update(dt);
    }
    if (this._time > 11) {
        this.add6 = false;
        this.add3 = false;
        this.add1 = false;
        this.add10 = false
        this._time = 0;
    }
    else if(this._time > 10){
        if(!this.add10){

            this.addEnemy();
            this.addEnemy();
            this.add10 = true;
        }
    }
    else if (this._time > 7) {
        if (!this.add6) {
            this.addEnemy();
            this.addEnemy();
            this.addEnemy();
            this.add6 = true;
            cc.log(this.enemy.length)
        }

    } else if (this._time > 3) {
        if (!this.add3) {
            this.addEnemy();
            this.addEnemy();
            this.add3 = true;
            cc.log(this.enemy.length)
        }
    } else if (this._time > 1) {
        if (!this.add1) {
            this.addEnemy();
            cc.log(this.enemy.length)
            this.add1 = true;
        }

    }


};

EnemyController.prototype.addEnemy = function () {
    var r = Math.random();
    var e = null;
    e = new Enemy();
    this.stage.addChild(e);
    this.enemy.push(e);
    if (r < 0.25) {
        e.setPosition(cc.p(com.arena.xMin + 100 + Math.random() * cc.winSize.width / 2 * 0.7, cc.winSize.height / 2 + Math.random() * cc.winSize.height / 2 - 145));
    } else if (r < 0.5) {
        e.setPosition(cc.p(com.arena.xMin + 100 + 0.7 * Math.random() * cc.winSize.width / 2, 143 + Math.random() * (cc.winSize.height / 2 - 143)));
    } else if (r < 0.75) {
        e.setPosition(cc.p(cc.winSize.width / 2 + Math.random() * ( cc.winSize.width / 2 - 250), cc.winSize.height / 2 + Math.random() * cc.winSize.height / 2 - 145));
    } else {
        e.setPosition(cc.p(cc.winSize.width / 2 + Math.random() * ( cc.winSize.width / 2 - 250), 143 + Math.random() * (cc.winSize.height / 2 - 143)));
    }

    //var r2 = Math.random();
    //if (r2 < 0.5){
    //
    //    if(!this.enemy_lt || !this.enemy_lt){
    //        enemy.setPosition(cc.p(com.arena.xMin + 100 + Math.random() * cc.winSize.width / 2 * 0.7, cc.winSize.height/2 + Math.random() * cc.winSize.height/2 - 145));
    //        this.enemy_lt = enemy;
    //    }
    //    else if(!this.enemy_lb || !this.enemy_lb.parent){
    //        enemy.setPosition(cc.p( com.arena.xMin + 100 + 0.7 * Math.random() * cc.winSize.width / 2,  143 + Math.random() * (cc.winSize.height/2 -143)));
    //        this.enemy_lb = enemy;
    //    }
    //
    //    else if(!this.enemy_rt || !this.enemy_rt){
    //        enemy.setPosition(cc.p(cc.winSize.width / 2 + Math.random() *( cc.winSize.width / 2-250), cc.winSize.height/2 + Math.random() * cc.winSize.height/2 - 145));
    //        this.enemy_rt = enemy;
    //    }
    //    else  if(!this.enemy_rb || !this.enemy_rb){
    //        enemy.setPosition(cc.p(cc.winSize.width / 2 + Math.random() *( cc.winSize.width / 2-250), 143 + Math.random() * (cc.winSize.height/2 -143)));
    //        this.enemy_rb = enemy;
    //    }


    //}else{
    //
    //    if(!this.enemy_rb || !this.enemy_rb){
    //        enemy.setPosition(cc.p(cc.winSize.width / 2 + Math.random() *( cc.winSize.width / 2-250), 143 + Math.random() * (cc.winSize.height/2 -143)));
    //        this.enemy_rb = enemy;
    //    }
    //    else if(!this.enemy_rt || !this.enemy_rt){
    //        enemy.setPosition(cc.p(cc.winSize.width / 2 + Math.random() *( cc.winSize.width / 2-250), cc.winSize.height/2 + Math.random() * cc.winSize.height/2 - 145));
    //        this.enemy_rt = enemy;
    //    }
    //    else if(!this.enemy_lb || !this.enemy_lb.parent){
    //        enemy.setPosition(cc.p( com.arena.xMin + 100 + 0.7 * Math.random() * cc.winSize.width / 2,  143 + Math.random() * (cc.winSize.height/2 -143)));
    //        this.enemy_lb = enemy;
    //    }
    //    else if(!this.enemy_lt || !this.enemy_lt){
    //        enemy.setPosition(cc.p(com.arena.xMin + 100 + Math.random() * cc.winSize.width / 2 * 0.7, cc.winSize.height/2 + Math.random() * cc.winSize.height/2 - 145));
    //        this.enemy_lt = enemy;
    //    }
    //}

};

EnemyController.prototype.removeEnemy = function (e) {
    cc.log("******")
    cc.log(this.enemy.length)
    cc.arrayRemoveObject(this.enemy, e);
    cc.log(this.enemy.length)
    cc.log("******")
}
