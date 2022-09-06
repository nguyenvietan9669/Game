const GLSprite = require('../core/modules/aurora/GLSprite');

class ScoreTexture extends PIXI.Container
{
    constructor()
    {
        super();

        //
        let n = 0;
        this.STATE = {};
        this.STATE.INACTIVE = n++;
        this.STATE.INIT = n++;
        this.STATE.ACTIVE = n++;

        //
        this.mArrObject = [];

        //
        this.mState;
    }

    Init()
    {
        this._SetState(this.STATE.INIT);
    }

    _SetState(value)
    {
        this.mState = value;
        switch(this.mState)
        {
            case this.STATE.INACTIVE:
                this.visible = false;
                break;

            case this.STATE.INIT:
                this.visible = false;
                break;

            case this.STATE.ACTIVE:
                this.visible = true;
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
    SetNumber(value, spriteId, arrNumberId)
    {
        let numberOffsetX = 45;

        this._HideAllObject(this.mArrObject);
        let arrNumber = Math.abs(Math.round(value)).toString().split('');
        let length = arrNumber.length;

        //sign
        let sign = this._GetObject(this.mArrObject, spriteId, this);
        sign.visible = true;
        sign.SetFrame(arrNumberId[value >= 0 ? 10 : 11]);
        sign.position.set(
            (-0.5*(length + 1 - 1) + 0)*numberOffsetX, 
            0
        );

        //number
        for(let i = 0; i < length; i++)
        {
            let spriteNumber = this._GetObject(this.mArrObject, spriteId, this);
            spriteNumber.visible = true;
            spriteNumber.SetFrame(arrNumberId[parseInt(arrNumber[i])]);
            spriteNumber.position.set(
                (-0.5*(length + 1 - 1) + i + 1)*numberOffsetX, 
                0
            )
        }

        //----
        this._SetState(this.STATE.ACTIVE);
    }

    //PRIVATE FUNCTION
    _HideAllObject(arr)
    {
        let length = arr.length;
        for(let i = 0; i < length; i++)
        {
            arr[i].visible = false;
        }
    }

    _GetObject(arr, spriteId, parent)
    {
        let length = arr.length;
        for(let i = 0; i < length; i++)
        {
            if(
                (!arr[i].visible) 
                && arr[i].spriteIndex == spriteId
            )
            {
                return arr[i];
            }
        }

        let newObject = new GLSprite(spriteId);
        arr.push(newObject);
        parent.addChild(newObject);

        return newObject;
    }


    


}
module.exports = ScoreTexture;
