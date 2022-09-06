const BaseObject = require('../game/BaseObject');
const GLAnimation= require('../core/modules/aurora/GLAnimation');

class Player extends BaseObject
{
    constructor()
    {
        super();

        //
        this.mBody = {
            width: 100, 
            height: 100, 
            depth: 100,

            offsetX: -50, 
            offsetY: -100, 
            offsetZ: 100,
        };

        //----
        let n = Object.keys(this.STATE).length;

        this.STATE.INIT = n++;

        this.STATE.RUN = n++;
        this.STATE.JUMP = n++;
        this.STATE.TURN_LEFT = n++;
        this.STATE.TURN_RIGHT = n++;


        //-----------------
        n = 0;
        this.EFFECT_STATE = {};
        this.EFFECT_STATE.NORMAL = n++;
        this.EFFECT_STATE.IMMORTAL = n++;
        this.EFFECT_STATE.FRENZY = n++;

        //-----------------
        n = 0;
        this.LANE = {};
        this.LANE.LEFT = n++;
        this.LANE.MID = n++;
        this.LANE.RIGHT = n++;
        this.mLane = this.LANE.MID;

        this.PARTICLE_POS = [
            {x: 78, y: -190}, // left
            {x: 0, y: -200}, // mid
            {x: -100, y: -190}  // right
        ]

        //OBJECT
        this.INFOR;

        this.mAnimation1;
        this.mAnimation2;
        this.mFrenzyEffect01;
        this.mFrenzyEffect02;

        //VARIABLE
        this.mIsFirstInit = true;
        this.mEffectState;
        this.mSpeed = {};

        this.mTouchDownPosition;
        this.mTouchUpPosition;

        this.mTouchDownTime;
        this.mTouchUpTime;

        this.mArrNextState;
        this.mEffectPercent;
    }

    Init()
    {
        this._SetState(this.STATE.INIT);
    }

    _SetState(value)
    {
        //SET FOR OLD STATE
        switch(this.mState)
        {
            case this.STATE.JUMP:
                break;

            case this.STATE.RUN:
                break;
        }

        //SET FOR NEW STATE
        super._SetState(value);
        //------------------------
        switch(this.mState)
        {
            case this.STATE.INACTIVE:
                this.visible = false;
                break;

            case this.STATE.INIT:
                this.visible = false;

                if(this.mIsFirstInit)
                {
                    //-----
                    Scene.addChild(this);
                }
                
                this.SetPosition(GameDefine.PLAYER_START_POSITION);

                this.mFrenzyEffect01.SetAnim(this.INFOR.FRENZY_EFFECT_01, true);
                this.mFrenzyEffect02.SetAnim(this.INFOR.FRENZY_EFFECT_02, true);

                this.mTouchDownPosition = null;
                this.mTouchUpPosition = null;

                this.ClearArrNextState();

                this._SetEffectState(this.EFFECT_STATE.NORMAL);
                this._SetAnim(this.INFOR.ANIM_INIT, false);
                this._SetSpeed({x: 0, y: 0, z: GameDefine.PLAYER_SPEED_Z});
                //------------
                this.mIsFirstInit = false;
                this._SetLane(this.LANE.MID);
                this.PlaySound();
                break;

            case this.STATE.RUN:
                // console.log('PLAYER RUN');
                this.visible = true;
                let anim = this.INFOR.ANIM_RUN;
                if (this.mPosition.x >= GameDefine.LANE_X_MAX)
                {
                    anim = this.INFOR.ANIM_RUN_RIGHT;
                    this._SetLane(this.LANE.RIGHT);
                }
                else if (this.mPosition.x <= GameDefine.LANE_X_MIN)
                {
                    anim = this.INFOR.ANIM_RUN_LEFT;
                    this._SetLane(this.LANE.LEFT);
                }
                else
                {
                    this._SetLane(this.LANE.MID);
                }
                this._SetAnim(anim, true);
                break;

            case this.STATE.JUMP:
                this.visible = true;
                this._SetAnim(this.INFOR.ANIM_JUMP);
                this._Jump();
                SoundMgr.Play(SFX_JUMP);
                break;

            case this.STATE.TURN_LEFT:
                if(this.mPosition.x > GameDefine.LANE_X_MIN)
                {
                    this.visible = true;

                    if (this.mLane == this.LANE.RIGHT)
                    {
                        this._SetAnim(this.INFOR.ANIM_TURN_RIGHT_TO_CENTER);
                    }
                    else
                    {
                        this._SetAnim(this.INFOR.ANIM_TURN_CENTER_TO_LEFT);
                    }

                    this.mTargetX = Math.max(this.mPosition.x - GameDefine.LANE_WIDTH, GameDefine.LANE_X_MIN);
                    SoundMgr.Play(SFX_SWITCH_LANES_1);
                }
                else
                {
                    this._SetState(this.STATE.RUN);
                }
                break;

            case this.STATE.TURN_RIGHT:
                if(this.mPosition.x < GameDefine.LANE_X_MAX)
                {
                    this.visible = true;

                    if (this.mLane == this.LANE.LEFT)
                    {
                        this._SetAnim(this.INFOR.ANIM_TURN_LEFT_TO_CENTER);
                    }
                    else
                    {
                        this._SetAnim(this.INFOR.ANIM_TURN_CENTER_TO_RIGHT);
                    }

                    this.mTargetX = Math.min(this.mPosition.x + GameDefine.LANE_WIDTH, GameDefine.LANE_X_MAX);
                    SoundMgr.Play(SFX_SWITCH_LANES_1);
                }
                else
                {
                    this._SetState(this.STATE.RUN);
                }
                break;
        }
    }

    _SetAnim(anim, loop = false)
    {
        if (anim.MC1)
        {
            if (!this.mAnimation1.visible || !this.mAnimation1.isLoop)
            {
                this.mAnimation1.SetAnim(anim.ID, loop);
            }
        }
        else
        {
            if (!this.mAnimation2.visible || !this.mAnimation2.isLoop)
            {
                this.mAnimation2.SetAnim(anim.ID, loop);
            }
        }
        this.mAnimation1.visible  = anim.MC1;
        this.mAnimation2.visible = !anim.MC1;
    }

    _SetLane (lane)
    {
        this.mLane = lane;
    }

    Update(dt)
    {
        switch(this.mState)
        {
            case this.STATE.INACTIVE:
                break;

            case this.STATE.INIT:
                break;

            case this.STATE.RUN:
                this._UpdateSpeed(dt);
                this._UpdatePosition(dt);
                Camera.UpdatePosition(dt);
                this._UpdateEffectState(dt);
                this._UpdateCheckCollision();

                this.mAnimation1.Update(dt);
                this.mAnimation2.Update(dt);
                Debug.DrawBody(this.mBody);

                if(this.mArrNextState.length > 0)
                {
                    this._SetState(this.mArrNextState.shift());
                }
                break;

            case this.STATE.JUMP:
                this._UpdateSpeed(dt);
                this._UpdatePosition(dt);
                Camera.UpdatePosition(dt);
                this._UpdateEffectState(dt);
                this._UpdateCheckCollision();

                this.mAnimation1.Update(dt);
                this.mAnimation2.Update(dt);
                Debug.DrawBody(this.mBody);

                if(this.mPosition.y >= 0)
                {
                    this._SetState(this.STATE.RUN);
                }
                break;

            case this.STATE.TURN_LEFT:
            case this.STATE.TURN_RIGHT:
                this._UpdateSpeed(dt);
                this._UpdatePosition(dt);
                Camera.UpdatePosition(dt);
                this._UpdateEffectState(dt);
                this._UpdateCheckCollision();

                this.mAnimation1.Update(dt);
                this.mAnimation2.Update(dt);
                Debug.DrawBody(this.mBody);

                if(this.mPosition.x == this.mTargetX)
                {
                    this._SetState(this.STATE.RUN);
                }
                break;
        }
    }

    _SetEffectState(value)
    {
        this.mEffectState = value;
        switch(this.mEffectState)
        {
            case this.EFFECT_STATE.NORMAL:
                // console.log('EFFECT_STATE.NORMAL');
                this.mFrenzyEffect01.visible = false;
                this.mFrenzyEffect02.visible = false;
                this.alpha = 1;
                break;

            case this.EFFECT_STATE.IMMORTAL:
                // console.log('EFFECT_STATE.IMMORTAL');
                this.mFrenzyEffect01.visible = false;
                this.mFrenzyEffect02.visible = false;
                this.alpha = 1;
                this.mEffectPercent = 0;
                break;

            case this.EFFECT_STATE.FRENZY:
                // console.log('EFFECT_STATE.FRENZY');
                this.mFrenzyEffect01.visible = true;
                this.mFrenzyEffect02.visible = true;
                this.alpha = 1;
                break;

        }
    }

    _UpdateEffectState(dt)
    {
        switch(this.mEffectState)
        {
            case this.EFFECT_STATE.NORMAL:
                if(FrenzyMgr.IsFrenzy())
                {
                    this._SetEffectState(this.EFFECT_STATE.FRENZY);
                }
                break;

            case this.EFFECT_STATE.IMMORTAL:
                this.mEffectPercent = GameDefine.MoveToTarget(
                    this.mEffectPercent, 
                    1, 1/GameDefine.IMMORTAL_LONG_TIME, dt
                );
                //this.alpha = ((Math.sin(10*this.mEffectPercent*(2*Math.PI) + 0.5*Math.PI) + 1)/2)*0.7 + 0.3;
                this.alpha = this.mEffectPercent * 1000 % 200 < 100;

                if(FrenzyMgr.IsFrenzy())
                {
                    this._SetEffectState(this.EFFECT_STATE.FRENZY);
                }
                else if(this.mEffectPercent >= 1)
                {
                    this._SetEffectState(this.EFFECT_STATE.NORMAL);
                }
                break;

            case this.EFFECT_STATE.FRENZY:
                this.mFrenzyEffect01.Update(dt);
                this.mFrenzyEffect02.Update(dt);

                if(!FrenzyMgr.IsFrenzy())
                {
                    this._SetEffectState(this.EFFECT_STATE.NORMAL);
                }
                break;
        }
    }

    TouchHandler(event)
    {
        if(GameDefine.IsSingleTouch(event))
        {
            switch(this.mState)
            {
                case this.STATE.RUN:
                case this.STATE.JUMP:
                case this.STATE.TURN_LEFT:
                case this.STATE.TURN_RIGHT:

                    if(Input.IsTouchDown(event))
                    {
                        this.mTouchDownTime = Date.now();
                        this.mTouchDownPosition = {
                            x: Input.touchX,
                            y: Input.touchY,
                        };
                        // console.log('TOUCH DOWN');
                        // console.log(this.mTouchDownPosition);
                    }
                    else if(Input.IsTouchUp(event))
                    {
                        this.mTouchUpTime = Date.now();
                        this.mTouchUpPosition = {
                            x: Input.touchX + Input.touchDX,
                            y: Input.touchY + Input.touchDY,
                        };
                        // console.log('TOUCH UP');
                        // console.log(this.mTouchUpPosition);

                        if(this.mTouchDownPosition != null)
                        {
                            let distance = GameDefine.GetDistance(this.mTouchDownPosition, this.mTouchUpPosition);
                            let time = (this.mTouchUpTime - this.mTouchDownTime)/1000;
                            let speed = distance/time;
                            // console.log(speed);
                            // console.log(time);

                            if(speed > 500)
                            {
                                let angle = (GameDefine.GetAngle(this.mTouchDownPosition, this.mTouchUpPosition) + 360) % 360;
                                let deltaAngle = 30;

                                if(
                                    GameDefine.CheckValueInRange(angle, 0 - deltaAngle, 0 + deltaAngle)
                                    || GameDefine.CheckValueInRange(angle, 360 - deltaAngle, 360 + deltaAngle)
                                )
                                {
                                    this.mArrNextState.push(this.STATE.TURN_RIGHT);
                                }
                                else if(GameDefine.CheckValueInRange(angle, 180 - deltaAngle, 180 + deltaAngle))
                                {
                                    this.mArrNextState.push(this.STATE.TURN_LEFT);
                                }
                                else if(
                                    GameDefine.CheckValueInRange(angle, 90 - deltaAngle, 90 + deltaAngle)
                                    || GameDefine.CheckValueInRange(angle, 270 - deltaAngle, 270 + deltaAngle)
                                )
                                {
                                    this.mArrNextState.push(this.STATE.JUMP);
                                }
                            }
                        }

                        if(this.mArrNextState.length > 2 )
                        {
                            this.ClearArrNextState();
                        }

                        this.mTouchDownPosition = null;
                    }
                    break;
            }
        }
        else
        {
            this.mTouchDownPosition = null;
        }
    }

    KeyHandler(event)
    {
        if (event.type != "keyup")
        {
            return;
        }
        switch(event.keyCode)
        {
            case 37: //<-
            {
                this.mArrNextState.push(this.STATE.TURN_LEFT);
                break;
            }
            case 38: //<-
            {
                this.mArrNextState.push(this.STATE.JUMP);
                break;
            }
            case 39: //->
            {
                this.mArrNextState.push(this.STATE.TURN_RIGHT);
                break;
            }
        }
    }

    //PUBLIC FUNCTION
    SetInfor(infor)
    {
        this.INFOR = infor;

        //--------------
        if(this.mAnimation1 != undefined && this.mAnimation1.parent != undefined)
        {
            this.mAnimation1.parent.removeChild(this.mAnimation1);
        }
        this.mAnimation1 = new GLAnimation(this.INFOR.SPRITE_MC1);
        this.mAnimation1.visible = false;
        this.addChild(this.mAnimation1);

        if(this.mAnimation2 != undefined && this.mAnimation2.parent != undefined)
        {
            this.mAnimation2.parent.removeChild(this.mAnimation2);
        }
        this.mAnimation2 = new GLAnimation(this.INFOR.SPRITE_MC2);
        this.mAnimation2.visible = false;
        this.addChild(this.mAnimation2);

        //
        if(this.mFrenzyEffect01 != undefined && this.mFrenzyEffect01.parent != undefined)
        {
            this.mFrenzyEffect01.parent.removeChild(this.mFrenzyEffect01);
        }
        this.mFrenzyEffect01 = new GLAnimation(this.INFOR.FRENZY_SPRITE_ID);
        this.addChild(this.mFrenzyEffect01);

        //
        if(this.mFrenzyEffect02 != undefined && this.mFrenzyEffect02.parent != undefined)
        {
            this.mFrenzyEffect02.parent.removeChild(this.mFrenzyEffect02);
        }
        this.mFrenzyEffect02 = new GLAnimation(this.INFOR.FRENZY_SPRITE_ID);
        this.addChild(this.mFrenzyEffect02);
    }

    GetCharacterName()
    {
        return GLText.GetText(this.INFOR.CHAR_TEXT);
    }

    Pause()
    {
        this.StopSound();
    }

    Resume()
	{
        if (this.mState != this.STATE.INACTIVE &&
            !TutorialMgr.IsPauseAnimation())
        {
            this.PlaySound();
        }
    }
    
    PlaySound ()
    {
        //SoundMgr.Play(SFX_JET_LOOP, true);
    }

    StopSound ()
    {
        //SoundMgr.Stop(SFX_JET_LOOP);
    }

    Active()
    {
        switch(this.mState)
        {
            case this.STATE.INIT:
                this._SetState(this.STATE.RUN);
                break;
        }
    }

    ClearArrNextState()
    {
        this.mArrNextState = [];
    }

    NextStateIsTurnLeft()
    {
        return (this.mArrNextState.length > 0 && this.mArrNextState[0] == this.STATE.TURN_LEFT);
    }

    NextStateIsTurnRight()
    {
        return (this.mArrNextState.length > 0 && this.mArrNextState[0] == this.STATE.TURN_RIGHT);
    }

    NextStateIsJump()
    {
        return (this.mArrNextState.length > 0 && this.mArrNextState[0] == this.STATE.JUMP);
    }

    SetNextStateTurnLeft()
    {
        this.mArrNextState.push(this.STATE.TURN_LEFT);
    }

    SetNextStateTurnRight()
    {
        this.mArrNextState.push(this.STATE.TURN_RIGHT);
    }

    SetNextStateJump()
    {
        this.mArrNextState.push(this.STATE.JUMP);
    }

    GetSpeed()
    {
        return this.mSpeed;
    }

    //PRIVATE FUNCTION
    _SetSpeed(speed)
    {
        this.mSpeed.x = speed.x;
        this.mSpeed.y = speed.y;
        this.mSpeed.z = speed.z;
    }

    _Jump()
    {
        switch(this.mEffectState)
        {
            case this.EFFECT_STATE.FRENZY:
                this.mSpeed.y = GameDefine.PLAYER_SPEED_Y_FRENZY;
                break;
            default:
                this.mSpeed.y = GameDefine.PLAYER_SPEED_Y;
                break;
        }
    }

    _UpdateSpeed(dt)
    {
        //speed X
        switch(this.mState)
        {
            case this.STATE.TURN_LEFT:
                switch(this.mEffectState)
                {
                    case this.EFFECT_STATE.FRENZY:
                        this.mSpeed.x = -GameDefine.PLAYER_SPEED_X_FRENZY;
                        break;
                    default:
                        this.mSpeed.x = -GameDefine.PLAYER_SPEED_X;
                        break;
                }
                break;
            case this.STATE.TURN_RIGHT:
                switch(this.mEffectState)
                {
                    case this.EFFECT_STATE.FRENZY:
                        this.mSpeed.x = GameDefine.PLAYER_SPEED_X_FRENZY;
                        break;
                    default:
                        this.mSpeed.x = GameDefine.PLAYER_SPEED_X;
                        break;
                }
                break;
            default:
                this.mSpeed.x = 0;
                break;
        }

        //speed Y
        switch(this.mState)
        {
            case this.STATE.JUMP:
                switch(this.mEffectState)
                {
                    case this.EFFECT_STATE.FRENZY:
                        this.mSpeed.y += GameDefine.ACCELE_Y_FRENZY*dt;
                        break;
                    default:
                        this.mSpeed.y += GameDefine.ACCELE_Y*dt;
                        break;
                }
                break;
            default:
                this.mSpeed.y = 0;
                break;
        }

        //speed Z
        switch(this.mEffectState)
        {
            case this.EFFECT_STATE.FRENZY:
                this.mSpeed.z = GameDefine.MoveToTarget(this.mSpeed.z, GameDefine.PLAYER_SPEED_Z_FRENZY, 3000, dt);                
                break;
            default:
                this.mSpeed.z = GameDefine.MoveToTarget(this.mSpeed.z, GameDefine.PLAYER_SPEED_Z, 3000, dt);                
                break;
        }
    }

    _UpdatePosition(dt)
    {
        switch(this.mState)
        {
            case this.STATE.RUN:
                this.SetPosition(
                    {
                        x: this.mPosition.x + this.mSpeed.x*dt,
                        y: this.mPosition.y + this.mSpeed.y*dt,
                        z: this.mPosition.z + this.mSpeed.z*dt,
                    }
                );
                break;

            case this.STATE.JUMP:
                this.SetPosition(
                    {
                        x: this.mPosition.x + this.mSpeed.x*dt,
                        y: Math.min(this.mPosition.y + this.mSpeed.y*dt, 0),
                        z: this.mPosition.z + this.mSpeed.z*dt,
                    }
                );
                break;

            case this.STATE.TURN_LEFT:
            case this.STATE.TURN_RIGHT:
                this.SetPosition(
                    {
                        x: GameDefine.MoveToTarget(this.mPosition.x, this.mTargetX, this.mSpeed.x, dt),
                        y: this.mPosition.y + this.mSpeed.y*dt,
                        z: this.mPosition.z + this.mSpeed.z*dt,
                    }
                );
                break;

            default:
                break;
        }
    }

    _UpdateCheckCollision(dt)
    {
        switch(this.mEffectState)
        {
            case this.EFFECT_STATE.NORMAL:
                this._CheckCollisionWithItem();
                this._CheckCollisionWithObstacle();
                break;

            case this.EFFECT_STATE.IMMORTAL:
                this._CheckCollisionWithItem();
                // this._CheckCollisionWithObstacle();
                break;

            case this.EFFECT_STATE.FRENZY:
                this._CheckCollisionWithItem();
                this._CheckCollisionWithObstacle();
                break;
        }
    }

    _CheckCollisionWithItem()
    {
        let arrObject = ObjectMgr.GetArrItem();
        let length = arrObject.length;
        for(let i = 0; i < length; i++)
        {
            let object = arrObject[i];
            if(
                object.IsCheckCollision()
                && GameDefine.CheckCollisionTwoBody(this.GetBody(), object.GetBody())
            )
            {
                //COLLISION WITH ITEM
                object.SetStateCollisionWithPlayer();
            }
        }
    }

    _CheckCollisionWithObstacle()
    {
        let arrObject = ObjectMgr.GetArrObstacle().concat(ObjectMgr.GetArrObstacle2());
        let length = arrObject.length;
        for(let i = 0; i < length; i++)
        {
            let object = arrObject[i];
            if(
                object.IsCheckCollision()
                && GameDefine.CheckCollisionTwoBody(this.GetBody(), object.GetBody())
            )
            {
                //COLLISION WITH OBSTACLE
                object.SetStateCollisionWithPlayer();
                this._SetEffectState(this.EFFECT_STATE.IMMORTAL);

                //Stop frenzy
                if(FrenzyMgr.IsFrenzy())
                {
                    FrenzyMgr.StopFrenzy();
                }
            }
        }
    }
}
module.exports = Player;