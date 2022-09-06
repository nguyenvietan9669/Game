const BaseObject = require('../game/BaseObject');
const GLAnimation = require('../core/modules/aurora/GLAnimation');
const ScoreTexture = require('../game/ScoreTexture');

class Particle extends BaseObject
{
    constructor()
    {
        super();

        //
        let n = Object.keys(this.STATE).length;
        this.STATE.INIT = n++;
        this.STATE.ACTIVE = n++;

        //
        this.mText;
        this.mAnimation;
        this.mScoreTexture;

        //
        this.mIsFirstInit = true;
        this.mPercent;
        this.mLifeTime;

        this.mArrPositionX = [];
        this.mArrPositionY = [];
        this.mArrPositionZ = [];

        this.mArrAlpha = [];
        this.mArrScale = [];
    }

    Init()
    {
        this._SetState(this.STATE.INIT);
    }

    _SetState(value)
    {
        super._SetState(value);
        switch(this.mState)
        {
            case this.STATE.INACTIVE:
                this.visible = false;
                break;

            case this.STATE.INIT:
                this.visible = false;
                if(this.mIsFirstInit)
                {
                    this.mText = new PIXI.Text('', {});
                    this.mText.anchor.set(0.5, 0.5);


                    this.mScoreTexture = new ScoreTexture();
                    //
                    this.addChild(this.mText);
                    this.addChild(this.mScoreTexture);
                }

                this.mText.visible = false;
                this.mScoreTexture.Init();

                if(this.mAnimation != undefined)
                {
                    this.mAnimation.visible = false;
                }
                //---
                this.mIsFirstInit = false;
                break;

            case this.STATE.ACTIVE:
                this.visible = true;
                this.mPercent = 0;
                this.alpha = 0;
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
                this.mPercent = GameDefine.MoveToTarget(this.mPercent, 1, 1/this.mLifeTime, dt);

                this.SetPosition(
                    {
                        x: GameDefine.GetValueInArray(this.mPercent, this.mArrPositionX),
                        y: GameDefine.GetValueInArray(this.mPercent, this.mArrPositionY),
                        z: GameDefine.GetValueInArray(this.mPercent, this.mArrPositionZ),
                    }
                );

                this.alpha = GameDefine.GetValueInArray(this.mPercent, this.mArrAlpha);
                this.SetScale(GameDefine.GetValueInArray(this.mPercent, this.mArrScale));

                this.UpdateDrawPosition();
                if(
                    this.mAnimation != undefined
                    && this.mAnimation.visible
                )
                {
                    this.mAnimation.Update(dt);
                }

                //---------
                this._UpdateInactive();
                break;
        }
    }

    //PUBLIC FUNCTION
    SetStateActive()
    {
        this._SetState(this.STATE.ACTIVE);
    }

    SetLifeTime(value)
    {
        this.mLifeTime = value;
    }

    SetText(text, style)
    {
        this.mText.visible = true;
        this.mText.text = text;
        this.mText.style = style;
    }

    SetScoreTexture(value, spriteId, arrNumberId)
    {
        this.mScoreTexture.SetNumber(value, spriteId, arrNumberId);
    }

    SetAnimation(spriteId, animId, isLoop = true)
    {
        if(this.mAnimation == undefined)
        {
            this.mAnimation = new GLAnimation(spriteId);
        }
        else
        {
            if(this.mAnimation.spriteIndex != spriteId)
            {
                this.mAnimation.parent.removeChild(this.mAnimation);
                this.mAnimation = new GLAnimation(spriteId);
            }
        }

        this.mAnimation.visible = true;
        this.mAnimation.SetAnim(animId, isLoop);
        this.addChild(this.mAnimation);
    }

    SetArrPosition(arrPositionX, arrPositionY, arrPositionZ)
    {
        this.mArrPositionX = arrPositionX;
        this.mArrPositionY = arrPositionY;
        this.mArrPositionZ = arrPositionZ;
    }

    SetArrAlpha(value)
    {
        this.mArrAlpha = value;
    }

    SetArrScale(value)
    {
        this.mArrScale = value
    }

    //PRIVATE FUNCTION
    _UpdateInactive()
    {
        if(
            this.mPercent >= 1
            || this.mPosition.z <= Camera.GetPosition().z
        )
        {
            this._SetState(this.STATE.INACTIVE);
        }
    }

}
module.exports = Particle;