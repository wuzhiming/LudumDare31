/**
 * Created by joshua on 14/12/6.
 */
var Snake = function (parent, heroList) {
    this.stage = parent;

    this.sprites = [];

    this._speed = 1.5;

    this.direction = 0;

    this._pointsWhereChangeDirection = [];

    this.inverse = false;

    this.init(heroList);
};
Snake.prototype.sprites = null;
Snake.prototype.init = function (heroList) {
    this.sprites = heroList;
    var winSize = cc.winSize;
    for (var i = 0; i < heroList.length; ++i) {
        var hero = heroList[i];
        hero.x = winSize.width / 2;
        hero.y = winSize.height / 2 - hero.height * i;
        //初始方向都设为up
        hero.setCurrentDirection(com.direction.up);
        this.stage.addChild(hero, com.zorder.person);
    }
    this.updateZOrder();
};
Snake.prototype.updateZOrder = function(){
    for(var i = 0 ; i< this.sprites.length; ++i){
        this.sprites[i].setLocalZOrder(com.zorder.person + this.sprites.length -i);
    }
};
Snake.prototype.addHero = function (hero) {
    var lastSprite = this.sprites[this.sprites.length - 1];
    var direction = lastSprite.getCurrentDirection();
    hero.setCurrentDirection(direction);
    this.sprites.push(hero);
    this.stage.addChild(hero, com.zorder.person);
    //set posistion
    if(direction == com.direction.up){
        hero.setPosition(lastSprite.x, lastSprite.y - lastSprite.height);
    }else if(direction == com.direction.right){
        hero.setPosition(lastSprite.x - lastSprite.width, lastSprite.y);
    }else if(direction == com.direction.down){
        hero.setPosition(lastSprite.x, lastSprite.y + lastSprite.height);
    }else if(direction == com.direction.left){
        hero.setPosition(lastSprite.x + lastSprite.width, lastSprite.y);
    }
    this.updateZOrder();
};

Snake.prototype.setInverse = function(b){
    this.inverse = b;
};

Snake.prototype.getHeroList = function () {
    return this.sprites;
}
Snake.prototype._hasChange = false;
Snake.prototype.onTouchBegan = function (touch, event) {

}
Snake.prototype.onTouchMoved = function (touch, event) {
    var delta = touch.getDelta();
    if (!this._hasChange) {
        if (Math.abs(delta.x) > Math.abs(delta.y)) {
            if (delta.x > 0) {
                this.inverse? this.left() : this.right();
            } else {
                this.inverse? this.right() : this.left();
            }
        } else {
            if (delta.y > 0) {
                this.inverse ? this.down() : this.up();
            } else {
                this.inverse ? this.up() : this.down();
            }
        }
        this._hasChange = true;
    }
}
Snake.prototype.onTouchEnded = function (touch, event) {
    this._hasChange = false;
}
Snake.prototype.update = function (dt) {
    //cc.log(this.direction);
    for (var i in this.sprites) {
        var sprite = this.sprites[i];

        //check whether to change sprite's direction
        for (var j in this._pointsWhereChangeDirection) {
            var point = this._pointsWhereChangeDirection[j];

            //distance < 2
            if (Math.pow(sprite.x - point.x, 2) + Math.pow(sprite.y - point.y, 2) < 1) {
                sprite.setCurrentDirection(point.changeTo);
                point.count++;
            }
        }


        //move it
        if (sprite.getCurrentDirection() == com.direction.up) {
            sprite.y += this._speed;
        } else if (sprite.getCurrentDirection() == com.direction.right) {
            sprite.x += this._speed;
        } else if (sprite.getCurrentDirection() == com.direction.down) {
            sprite.y -= this._speed;
        } else if (sprite.getCurrentDirection() == com.direction.left) {
            sprite.x -= this._speed;
        }

    }

    //删掉所有Sprite都经过的point
    if (this._pointsWhereChangeDirection.length > 0) {
        var point = this._pointsWhereChangeDirection[0];
        if (point.count >= this.sprites.length) {
            this._pointsWhereChangeDirection.shift();
        }
    }

};

Snake.prototype._changeDirection = function (direction) {
    if (this.direction !== direction) {
        this.direction = direction;

        //第一个sprite的位置
        var point = this.sprites[0].getPosition();
        //当point.count == this.sprites.length,把它剔除掉
        point.count = 0;
        point.changeTo = direction;
        this._pointsWhereChangeDirection.push(point);
    }
};

Snake.prototype.up = function () {
    if (this.direction == com.direction.up || this.direction == com.direction.down)
        return;
    this._changeDirection(com.direction.up);
};

Snake.prototype.right = function () {
    if (this.direction == com.direction.right || this.direction == com.direction.left)
        return;
    this._changeDirection(com.direction.right);
};

Snake.prototype.left = function () {
    if (this.direction == com.direction.left || this.direction == com.direction.right)
        return;
    this._changeDirection(com.direction.left);
};

Snake.prototype.down = function () {
    if (this.direction == com.direction.up || this.direction == com.direction.down)
        return;
    this._changeDirection(com.direction.down);
};