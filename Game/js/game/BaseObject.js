class BaseObject extends PIXI.Container
{
    constructor()
    {
        super();

        //-------------------
        let n = 0;
        
        this.STATE = {};
        this.STATE.INACTIVE = n++;

        //--------------------
        this.mBody = {
            x: 0, 
            y: 0, 
            z: 0,

            width: 0, 
            height: 0, 
            depth: 0,

            offsetX: 0, 
            offsetY: 0, 
            offsetZ: 0,
        };

        this.mPosition = {x: 0, y: 0, z: 0};
        this.mDrawPosition;
  
        //--------------------
        this.mState;
        this.mScale = 1;


    }

    //PUBLIC FUNCTION
    SetStateInactive()
    {
        this._SetState(this.STATE.INACTIVE);
    }

    IsStateInactive()
    {
        return this.mState == this.STATE.INACTIVE;
    }

    SetPosition(position)
    {
        this.mPosition.x = position.x;
        this.mPosition.y = position.y;
        this.mPosition.z = position.z;

        this.mBody.x = position.x + this.mBody.offsetX;
        this.mBody.y = position.y + this.mBody.offsetY;
        this.mBody.z = position.z + this.mBody.offsetZ;
    }

    GetPosition()
    {
        return this.mPosition;
    }

    GetBody()
    {
        return this.mBody;
    }

    SetScale(value = 1)
    {
        this.mScale = value;
    }

    UpdateDrawPosition()
    {
        this.mDrawPosition = Camera.GetDrawPosition(this.mPosition);

        //----------
        this.position.set(this.mDrawPosition.x, this.mDrawPosition.y);
        this.scale.set(this.mDrawPosition.scale*this.mScale);
    }

    //PRIVATE FUNCTION
    _SetState(value)
    {
        this.mState = value;
    }
    

}
module.exports = BaseObject;