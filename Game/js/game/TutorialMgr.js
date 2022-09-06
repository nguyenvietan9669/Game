class TutorialMgr extends PIXI.Container
{
    constructor()
    {
        super();
        //

        let n = 0;
        this.STATE = {};
        this.STATE.INIT = n++;
        this.STATE.STEP_01_MOVE = n++;
        this.STATE.STEP_02_PAUSE_SHOW_TUTORIAL_01 = n++;
        this.STATE.STEP_03_MOVE = n++;
        this.STATE.STEP_04_PAUSE_SHOW_TUTORIAL_02 = n++;
        this.STATE.STEP_05_MOVE = n++;
        this.STATE.STEP_06_PAUSE_SHOW_TUTORIAL_03 = n++;
        this.STATE.STEP_07_MOVE_SHOW_TUTORIAL_03 = n++;
        this.STATE.STEP_08_MOVE = n++;
        this.STATE.STEP_09_END = n++;

        //
        this.mGui;

        //
        this.mIsFirstInit = true;
        this.mState;
        this.mPercent;
        this.mIsPauseAnimation;
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
            case this.STATE.INIT:
                this.visible = false;
                if(this.mIsFirstInit)
                {
                    this.mGui = GuiManager.GetGui(GUI_TUTORIAL);
                    this.addChild(this.mGui);
                }

                this.mIsPauseAnimation = false;
                //
                this.mIsFirstInit = false;
                break;

            case this.STATE.STEP_01_MOVE:
                this.visible = true;
                this.mGui.alpha = 0;
                this.mIsPauseAnimation = false;
                break;

            case this.STATE.STEP_02_PAUSE_SHOW_TUTORIAL_01:
                GameDefine.mVideoBg.pause();
                Player.ClearArrNextState();
                Player.StopSound();

                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_1).visible = true;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_2).visible = false;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_3).visible = false;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_BOARD_1).visible = true;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_BOARD_2).visible = false;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_BOARD_3).visible = false;

                this.mIsPauseAnimation = true;
                break;

            case this.STATE.STEP_03_MOVE:
                GameDefine.mVideoBg.play();
                Player.PlaySound();
                this.mIsPauseAnimation = false;
                break

            case this.STATE.STEP_04_PAUSE_SHOW_TUTORIAL_02:
                GameDefine.mVideoBg.pause();
                Player.ClearArrNextState();
                Player.StopSound();

                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_1).visible = false;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_2).visible = false;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_3).visible = true;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_BOARD_1).visible = false;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_BOARD_2).visible = true;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_BOARD_3).visible = false;

                this.mIsPauseAnimation = true;
                break;

            case this.STATE.STEP_05_MOVE:
                GameDefine.mVideoBg.play();
                Player.PlaySound();
                this.mIsPauseAnimation = false;
                break;

            case this.STATE.STEP_06_PAUSE_SHOW_TUTORIAL_03:
                GameDefine.mVideoBg.pause();
                Player.StopSound();

                this.mPercent = 0;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_1).visible = false;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_2).visible = false;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_3).visible = false;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_BOARD_1).visible = false;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_BOARD_2).visible = false;
                this.mGui.GetObject(GUI_OBJECT_TUTORIAL_TUT_BOARD_3).visible = true

                this.mIsPauseAnimation = true;
                break;

            case this.STATE.STEP_07_MOVE_SHOW_TUTORIAL_03:
                GameDefine.mVideoBg.play();
                Player.PlaySound();

                this.mIsPauseAnimation = false;
                break;

            case this.STATE.STEP_08_MOVE:
                this.mIsPauseAnimation = false;
                break;

            case this.STATE.STEP_09_END:
                this.visible = false;
                this.mIsPauseAnimation = false;
                break;
        }
    }

    Update(dt)
    {
        switch(this.mState)
        {
            case this.STATE.INIT:
                break;

            case this.STATE.STEP_01_MOVE:
                this.mGui.alpha = GameDefine.MoveToTarget(this.mGui.alpha, 0, 1/0.3, dt);
                this.mGui.Update(dt);
                if(Player.GetPosition().z >= 8*GameDefine.LEVEL_ROW_DISTANCE)
                {
                    this._SetState(this.STATE.STEP_02_PAUSE_SHOW_TUTORIAL_01);
                }
                break;

            case this.STATE.STEP_02_PAUSE_SHOW_TUTORIAL_01:
                this.mGui.alpha = GameDefine.MoveToTarget(this.mGui.alpha, 1, 1/0.3, dt);
                this.mGui.Update(dt);
                if(Player.NextStateIsTurnLeft())
                {
                    Player.ClearArrNextState();
                    Player.SetNextStateTurnLeft();
                    this._SetState(this.STATE.STEP_03_MOVE);
                }
                else if(Player.NextStateIsTurnRight())
                {
                    Player.ClearArrNextState();
                    Player.SetNextStateTurnRight();
                    this._SetState(this.STATE.STEP_03_MOVE);
                }
                else
                {
                    Player.ClearArrNextState();
                }
                break;

            case this.STATE.STEP_03_MOVE:
                this.mGui.alpha = GameDefine.MoveToTarget(this.mGui.alpha, 0, 1/0.3, dt);
                this.mGui.Update(dt);
                if(Player.GetPosition().z >= 14*GameDefine.LEVEL_ROW_DISTANCE)
                {
                    this._SetState(this.STATE.STEP_04_PAUSE_SHOW_TUTORIAL_02);
                }
                break;

            case this.STATE.STEP_04_PAUSE_SHOW_TUTORIAL_02:
                this.mGui.alpha = GameDefine.MoveToTarget(this.mGui.alpha, 1, 1/0.3, dt);
                this.mGui.Update(dt);
                if(Player.NextStateIsJump())
                {
                    Player.ClearArrNextState();
                    Player.SetNextStateJump();
                    this._SetState(this.STATE.STEP_05_MOVE);
                }
                else
                {
                    Player.ClearArrNextState();
                }
                break;

            case this.STATE.STEP_05_MOVE:
                this.mGui.alpha = GameDefine.MoveToTarget(this.mGui.alpha, 0, 1/0.3, dt);
                this.mGui.Update(dt);
                if(Player.GetPosition().z >= 20*GameDefine.LEVEL_ROW_DISTANCE)
                {
                    this._SetState(this.STATE.STEP_06_PAUSE_SHOW_TUTORIAL_03);
                }
                break;

            case this.STATE.STEP_06_PAUSE_SHOW_TUTORIAL_03:
                this.mPercent = GameDefine.MoveToTarget(this.mPercent, 1, 1/2, dt);
                this.mGui.alpha = GameDefine.MoveToTarget(this.mGui.alpha, 1, 1/0.3, dt);
                this.mGui.Update(dt);
                if(this.mPercent >= 1)
                {
                    this._SetState(this.STATE.STEP_07_MOVE_SHOW_TUTORIAL_03);
                }
                break;

            case this.STATE.STEP_07_MOVE_SHOW_TUTORIAL_03:
                this.mGui.alpha = GameDefine.MoveToTarget(this.mGui.alpha, 1, 1/0.3, dt);
                this.mGui.Update(dt);
                if(Player.GetPosition().z >= 27*GameDefine.LEVEL_ROW_DISTANCE)
                {
                    this._SetState(this.STATE.STEP_08_MOVE);
                }
                break;

            case this.STATE.STEP_08_MOVE:
                this.mGui.alpha = GameDefine.MoveToTarget(this.mGui.alpha, 0, 1/0.3, dt);
                this.mGui.Update(dt);
                if(Player.GetPosition().z >= 30*GameDefine.LEVEL_ROW_DISTANCE)
                {
                    this._SetState(this.STATE.STEP_09_END);
                }
                break;

            case this.STATE.STEP_09_END:
                break;
        }
    }

    TouchHandler(event)
    {
        switch(this.mState)
        {
            case this.STATE.STEP_02_PAUSE_SHOW_TUTORIAL_01:
            case this.STATE.STEP_04_PAUSE_SHOW_TUTORIAL_02:
            case this.STATE.STEP_05_MOVE:
            case this.STATE.STEP_07_MOVE_SHOW_TUTORIAL_03:
            case this.STATE.STEP_08_MOVE:
            case this.STATE.STEP_09_END:
                Player.TouchHandler(event);
                break;
        }
    }

    Pause()
    {
        switch(this.mState)
        {
            case this.STATE.STEP_01_MOVE:
            case this.STATE.STEP_03_MOVE:
            case this.STATE.STEP_05_MOVE:
            case this.STATE.STEP_07_MOVE_SHOW_TUTORIAL_03:
            case this.STATE.STEP_08_MOVE:
            case this.STATE.STEP_09_END:
                GameDefine.mVideoBg.pause();
                break;
        }
    }

    Resume()
    {
        switch(this.mState)
        {
            case this.STATE.STEP_01_MOVE:
            case this.STATE.STEP_03_MOVE:
            case this.STATE.STEP_05_MOVE:
            case this.STATE.STEP_07_MOVE_SHOW_TUTORIAL_03:
            case this.STATE.STEP_08_MOVE:
            case this.STATE.STEP_09_END:
                GameDefine.mVideoBg.play();
                break;
        }
    }



    //PUBLIC FUNCTION
    Active()
    {
        this._SetState(this.STATE.STEP_01_MOVE);
    }

    IsUpdateObject()
    {
        switch(this.mState)
        {
            case this.STATE.STEP_02_PAUSE_SHOW_TUTORIAL_01:
            case this.STATE.STEP_04_PAUSE_SHOW_TUTORIAL_02:
            case this.STATE.STEP_06_PAUSE_SHOW_TUTORIAL_03:
                return false;

            default:
                return true;
        }
    }

    IsFinish()
    {
        return this.mState == this.STATE.STEP_09_END;
    }

    IsPauseAnimation()
    {
        return this.mIsPauseAnimation;
    }

    //PRIVATE FUNCTION



}
module.exports = TutorialMgr;