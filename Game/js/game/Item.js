const BaseItem = require('../game/BaseItem');

class Item extends BaseItem
{
    constructor()
    {
        super();

        //-----------------------------
        this.mBody = {
            width: 100, 
            height: 100, 
            depth: 100,

            offsetX: -50, 
            offsetY: -100, 
            offsetZ: -50,
        };

        //VARIABLE-------------------------------
        this.mIsFirstInitItem = true;
    }

    //OVERRIDE
    Update(dt)
    {
        super.Update(dt);
        switch(this.mState)
        {
            case this.STATE.COLLISION_WITH_PLAYER:
                if(this.mAnimation.isFinish)
                {
                    this._SetState(this.STATE.INACTIVE);
                    return null;
                }
                break;
        }
    }


}
module.exports = Item;