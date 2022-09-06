const BaseObject = require('./BaseObject');
const GLAnimation = require('../core/modules/aurora/GLAnimation');

class BaseItem extends BaseObject
{
    constructor()
    {
        super();

        //-----
        let n = Object.keys(this.STATE).length;
        this.STATE.INIT = n++;
        this.STATE.ACTIVE = n++;
        this.STATE.COLLISION_WITH_PLAYER = n++;

        //OBJECT
        this.INFOR;
        this.mAnimation = new GLAnimation(GUI_SPRITE_GAME);

        //--------
        this.mIsFirstInitBaseItem = true;

    }

    Init()
    {
        this._SetState(this.STATE.INIT);
    }

    _SetState(value)
    {
        super._SetState(value);
        //----
        switch(this.mState)
        {
            case this.STATE.INACTIVE:
                this.visible = false;
                break;

            case this.STATE.INIT:
                this.visible = false;
                if(this.mIsFirstInitBaseItem)
                {
                    this.addChild(this.mAnimation);
                }
                this._SetAnimation();

                //----
                this.mIsFirstInitBaseItem = false;
                break;

            case this.STATE.ACTIVE:
                this.visible = true;
                this.alpha = 0;
                this._SetAnimation();
                break;

            case this.STATE.COLLISION_WITH_PLAYER:
                this.visible = true;
                this._SetAnimation();

                let score = FrenzyMgr.IsFrenzy() ? this.INFOR.FRENZY_SCORE : this.INFOR.SCORE;
                StateIngame.AddScore(score);
                ParticleMgr.SetScoreParticle(score, this.mPosition);

                SoundMgr.Play(this.INFOR.SOUND);
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
                this._UpdateInactive();
                break;

            case this.STATE.ACTIVE:
                this.alpha = GameDefine.MoveToTarget(this.alpha, 1, 1/0.3, dt);
                this.mAnimation.Update(dt);
                this._UpdateInactive();
                Debug.DrawBody(this.mBody);
                break;

            case this.STATE.COLLISION_WITH_PLAYER:
                this.mAnimation.Update(dt);
                this._UpdateInactive();
                break;
        }
    }

    //PUBLIC FUNCTION
    SetStateActive()
    {
        this._SetState(this.STATE.ACTIVE);
    }

    IsCheckCollision()
    {
        switch(this.mState)
        {
            case this.STATE.ACTIVE:
                return true;
            default:
                return false;
        }
    }

    SetStateCollisionWithPlayer()
    {
        this._SetState(this.STATE.COLLISION_WITH_PLAYER);
    }

    SetInfor(value)
    {
        this.INFOR = value;
        this._SetAnimation();
    }

    //PRIVATE FUNCTION
    _UpdateInactive()
    {
        if(this.mPosition.z <= Camera.GetPosition().z)
        {
            this._SetState(this.STATE.INACTIVE);
        }
    }

    _SetAnimation()
    {
        if(this.INFOR != undefined)
        {
            switch(this.mState)
            {
                case this.STATE.INACTIVE:
                    break;

                case this.STATE.INIT:
                    this.mAnimation.SetAnim(
                        (this.mPosition.x == 0) ? 
                            (this.INFOR.ANIM_INIT_CENTER) 
                            : (this.mPosition.x > 0 ? this.INFOR.ANIM_INIT_RIGHT : this.INFOR.ANIM_INIT_LEFT)
                        , 
                        this.INFOR.ANIM_INIT_IS_LOOP
                    );
                    break;

                case this.STATE.ACTIVE:
                    this.mAnimation.SetAnim(
                        (this.mPosition.x == 0) ? 
                            (this.INFOR.ANIM_ACTIVE_CENTER) 
                            : (this.mPosition.x > 0 ? this.INFOR.ANIM_ACTIVE_RIGHT : this.INFOR.ANIM_ACTIVE_LEFT)
                        , 
                        this.INFOR.ANIM_ACTIVE_IS_LOOP
                    );
                    break;

                case this.STATE.COLLISION_WITH_PLAYER:
                    this.mAnimation.SetAnim(
                        (this.mPosition.x == 0) ? 
                            (this.INFOR.ANIM_COLLISION_CENTER) 
                            : (this.mPosition.x > 0 ? this.INFOR.ANIM_COLLISION_RIGHT : this.INFOR.ANIM_COLLISION_LEFT)
                        , 
                        this.INFOR.ANIM_COLLISION_LOOP
                    );
                    break;
            }
        }
    }
}
module.exports = BaseItem;