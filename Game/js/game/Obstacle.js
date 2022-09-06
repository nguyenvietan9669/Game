const BaseItem = require('../game/BaseItem');

class Obstacle extends BaseItem
{
    constructor()
    {
        super();
        //-----------------------------
        this.mBody = {
            width: 100, 
            height: -20, 
            depth: 100,

            offsetX: -50, 
            offsetY: -10, 
            offsetZ: -50,
        };

        //VARIABLE-------------------------------
        this.mIsFirstInitItem = true;
    }

    //OVERRIDE

}
module.exports = Obstacle;