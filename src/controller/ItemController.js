/**
 * Created by joshua on 14/12/7.
 */
var ItemController = function(c){
    this.stage = c.getGameLayer();
    this.items = [];
};

ItemController.prototype.update = function(dt){

};

ItemController.prototype.addItem = function(pos){
    var item = new Item();
    item.runAction(cc.sequence(cc.fadeTo(0.3, 10), cc.fadeTo(0.3, 255.0), cc.callFunc(function(){
        item.protectd = false;
    })));
    this.stage.addChild(item);
    item.setPosition(pos);

    this.items.push(item);
};

ItemController.prototype.removeItem = function(item){
    item.removeFromParent();
    cc.arrayRemoveObject(this.items, item);
};

ItemController.prototype.getItems = function(){
    return this.items;
};