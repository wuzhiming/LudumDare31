var EnemyGroup = function(stage){
    var enemy1 = new Enemy();
    enemy1.setCurrentDirection(com.direction.right);
    enemy1.stopAllActions();

    var enemy2 = new Enemy();
    enemy2.setCurrentDirection(com.direction.right);
    enemy2.stopAllActions();

    var list2 = [enemy1, enemy2];
    this._snap = new Snap(stage, list2);
    this._snap.direction = com.direction.right;

    this._time = 0;

};

EnemyGroup.prototype.update = function(dt){
    this._time += dt;
    if(this._time >= 8)
        this._time = 0;


    if(this._time >= 6)
        this._snap.up();
    else if(this._time >= 4)
        this._snap.left();
    else if(this._time >= 2)
        this._snap.down();
    else
        this._snap.right();

    //if(this._time > 2){
    //    this.changeDirection();
    //    this._time = 0;
    //}



    this._snap.update(dt);
};

EnemyGroup.prototype.changeDirection = function(){

}

EnemyGroup.prototype.setPosition = function(p){
    for(var i in this._snap.sprites){
        var sprite = this._snap.sprites[i];
        sprite.setCurrentDirection(com.direction.right);
        sprite.setPosition(p.x - i* sprite.width, p.y);
    }
}