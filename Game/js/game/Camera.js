const BaseObject = require('../game/BaseObject');

class Camera extends BaseObject
{
    constructor()
    {
        super();

        //--
        let n = Object.keys(this.STATE).length;

        this.STATE.INIT = n++;
        this.STATE.ACTIVE = n++;

        //


    }

    Init()
    {
        this._SetState(this.STATE.INIT);
    }

    _SetState(value)
    {
        super._SetState(value);
        //-------------------
        switch(this.mState)
        {
            case this.STATE.INACTIVE:
                break;

            case this.STATE.INIT:
                this.SetPosition(
                    {
                        x: GameDefine.CAMERA_START_POSITION.x,
                        y: GameDefine.CAMERA_START_POSITION.y,
                        z: GameDefine.CAMERA_START_POSITION.z,
                    }
                );
                break;

            case this.STATE.ACTIVE:
                break;
        }
    }

    Update(dt)
    {
        switch(this.mState)
        {
            case this.STATE.INACTIVE:
                break;

            case this.STATE.INIT:
                break;

            case this.STATE.ACTIVE:
                break;
        }
    }

    //PUBLIC FUNCTION
    Active()
    {
        switch(this.mState)
        {
            case this.STATE.INIT:
                this._SetState(this.STATE.ACTIVE);
                break;
        }
    }

    GetDrawScale(position)
    {
        return GameDefine.CAMERA_Z_SCALE_ORIGIN/(position.z - this.mPosition.z);
    }

    GetDrawPosition(position)
    {
        let drawScale = this.GetDrawScale(position);

        return {
            scale: drawScale,
            x: GameDefine.CAMERA_POSITION_ON_SCREEN.x + (position.x - this.mPosition.x)*drawScale,
            y: GameDefine.CAMERA_POSITION_ON_SCREEN.y + (position.y - this.mPosition.y)*drawScale,
        };
    }

    UpdatePosition(dt)
    {
        this.SetPosition(
            {
                x: this.mPosition.x,
                y: this.mPosition.y,
                z: Player.GetPosition().z + GameDefine.CAMERA_OFFSET_POSITION_WITH_PLAYER.z,
            }
        );
    }

    //PRIVATE FUNCTION
    


    

}
module.exports = Camera;