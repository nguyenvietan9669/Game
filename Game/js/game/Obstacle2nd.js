const BaseItem = require('../game/BaseItem');

class Obstacle2nd extends BaseItem
{
    constructor()
    {
        super();

        //-----------------------------

        this.mBody = {
            width: 200, 
            height: -300, 
            depth: 20,

            offsetX: -100, 
            offsetY: 100, 
            offsetZ: -50,
        };

        //VARIABLE-------------------------------
        this.mIsFirstInitItem = true;
    }

    //OVERRIDE

}
module.exports = Obstacle2nd;