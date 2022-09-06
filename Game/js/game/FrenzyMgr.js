const GLAnimation = require('../core/modules/aurora/GLAnimation');
const GLSprite    = require('../core/modules/aurora/GLSprite');
const GLSpriteManager = require('../core/modules/aurora/GLSpriteManager');

class FrenzyMgr extends PIXI.Container
{
    constructor()
    {
        super();

        //
        
        //
        let n = 0;
        this.STATE = {};
        this.STATE.INACTIVE = n++;
        this.STATE.INIT = n++;
        this.STATE.NORMAL = n++;
        this.STATE.FRENZY = n++;

        //
        this.mFrenzyBar;
        this.mFrenzyBarMask= new PIXI.Graphics();
        GuiManager.GetGui(GUI_INGAME_UI).GetObject(GUI_OBJECT_INGAME_UI_FRENZY_GAUGE).mask = this.mFrenzyBarMask;
        this.mFrenzyLight;
        this.mFrenzyBg;
        this.mFrenzyFx;

        this.moduleTextures = [];

        //
        this.mIsFirstInit = true;
        this.mState;
        this.mPercent;
        this.mFrenzyScore;

        this.mCountTimeMakeWind;

        this.mFrenzyCount = 0;
        this.mConnectionBarGauge = [];
    }

    Init()
    {
        this._SetState(this.STATE.INIT);
    }

    _SetState(value)
    {
        //END OLD STATE
        switch(this.mState)
        {
            case this.STATE.NORMAL:
                break;

            case this.STATE.FRENZY:
                break;
        }

        //START NEW STATE ------------------------------------
        this.mState = value;
        switch(this.mState)
        {
            case this.STATE.INACTIVE:
                this.visible = false;
                break;

            case this.STATE.INIT:
                this.visible = false;
                if(this.mIsFirstInit)
                {                    
                    // this.mFrenzyBar = GuiManager.GetGui(GUI_INGAME_UI).GetObject(GUI_OBJECT_INGAME_UI_FRENZY_BAR)
                    
                    let gaugeBarStart = GUI_OBJECT_INGAME_UI_CONNECTION_GAUGE_1;
                    let gaugeBarEnd = GUI_OBJECT_INGAME_UI_CONNECTION_GAUGE_4;
                    
                    for(let i = gaugeBarStart; i <= gaugeBarEnd ; i++)
                    {
                        let gaugeBar = GuiManager.GetGui(GUI_INGAME_UI).GetObject(i);
                        this.mConnectionBarGauge.push(gaugeBar);
                    }

                    // this.mFrenzyBar.position.set(GameDefine.FRENZY_BAR_POS.x, GameDefine.FRENZY_BAR_POS.y);
                    // this.mFrenzyBarMask = this._CreatePIXISprite(GUI_SPRITE_GAME, SPRITE_GAME_FRAME_FRENZY_GAUGE);
                    // this.mFrenzyBarMask = this._CreateMaskBar();
                    // this.mFrenzyBarMask.position.set(GameDefine.FRENZY_BAR_POS.x + 22, GameDefine.FRENZY_BAR_POS.y);
                    // this.mFrenzyBar.mask = this.mFrenzyBarMask;

                    // this.mFrenzyLight = new GLAnimation(GUI_SPRITE_GAME);
                    // this.mFrenzyLight.SetAnim(SPRITE_GAME_ANIM_FRENZY_LIGHT);
                    // this.mFrenzyFx = new GLAnimation(GUI_SPRITE_GAME);
                    // this.mFrenzyFx.SetAnim(SPRITE_GAME_ANIM_FRENZY_FX, true);
                    // this.mFrenzyFx.position.set(GameDefine.FRENZY_BAR_POS.x + this.mFrenzyBar.width/2, GameDefine.FRENZY_BAR_POS.y);

                    // this.mFrenzyBg = new GLSprite(GUI_SPRITE_GAME);
                    // this.mFrenzyBg.SetFrame(SPRITE_GAME_FRAME_FRENZY_BAR);
                    // this.mFrenzyBg.position.set(GameDefine.FRENZY_BAR_POS.x + this.mFrenzyBar.width/2, GameDefine.FRENZY_BAR_POS.y);

                    // this.addChild(this.mFrenzyFx);
                    // this.addChild(this.mFrenzyBar);
                    this.addChild(this.mFrenzyBarMask);
                    // this.addChild(this.mFrenzyLight);
                    // this.addChild(this.mFrenzyBg);
                }

                // this.mFrenzyBar.y = GameDefine.FRENZY_BAR_POS.y + this.mFrenzyBar.height;
                // this.mFrenzyLight.x = this.mFrenzyBar.x + this.mFrenzyBar.width/2;

                this.mIsFirstInit = false;
                this.Resize();
                break;

            case this.STATE.NORMAL:
                this.visible = true;

                this._ResetFrenzyScore();
                GameDefine.mVideoBg.show();
                GameDefine.mVideoBg.play();
                break;

            case this.STATE.FRENZY:
                // console.log('STATE FRENZY');
                this.visible = true;

                this.mPercent = 0;
                this.mCountTimeMakeWind = 0;
                ParticleMgr.SetTextFrenzy();

                GameDefine.mVideoBg.hide();
                GameDefine.mVideoFrenzy.show();
                GameDefine.mVideoFrenzy.play();

                this.mFrenzyCount++;

                SoundMgr.Play(SFX_FRENZY);
                break;
        }
    }

    Update(dt)
    {
        // this.mFrenzyFx.Update(dt);
        // this.mFrenzyLight.Update(dt);
        // this.mFrenzyLight.y = this.mFrenzyBar.y;
        // this.mFrenzyLight.visible = this.mFrenzyLight.y < (this.mFrenzyBg.y + this.mFrenzyBg.height - 10);
        // this.mFrenzyFx.visible = this.IsFrenzy();

        switch(this.mState)
        {
            case this.STATE.INACTIVE:
                break;

            case this.STATE.INIT:
                break;

            case this.STATE.NORMAL:
                this._UpdateMask(dt);

                if(
                    this.mFrenzyScore>=GameDefine.FRENZY_SCORE_MAX
                    && StateIngame.GetTime() >= 2
                )
                {
                    this._SetState(this.STATE.FRENZY);
                }
                break;

            case this.STATE.FRENZY:
                this.mPercent = GameDefine.MoveToTarget(this.mPercent, 1, 1/GameDefine.FRENZY_LONG_TIME, dt);
                // console.log(this.mPercent);
                this._UpdateMask(dt);
                this._UpdateConnectionBar();

                if(this.mPercent >= 1)
                {
                    this._SetState(this.STATE.NORMAL);
                }
                break;
        }
    }

    Resize()
    {
        
    }

    Pause()
    {
        switch(this.mState)
        {
            case this.STATE.NORMAL:
                break;
            case this.STATE.FRENZY:
                SoundMgr.Pause(SFX_FRENZY);
                break;
        }
    }

    Resume()
    {
        switch(this.mState)
        {
            case this.STATE.NORMAL:
                SoundMgr.Stop(SFX_FRENZY);
                break;
            case this.STATE.FRENZY:
                SoundMgr.Play(SFX_FRENZY);
                break;
        }
    }

    //PUBLIC FUNCTION
    Active()
    {
        switch(this.mState)
        {
            case this.STATE.INIT:
                this._SetState(this.STATE.NORMAL);
                break;
        }
    }

    AddFrenzyScore(value)
    {
        switch(this.mState)
        {
            case this.STATE.NORMAL:
                this.mFrenzyScore = Math.min(this.mFrenzyScore + value, GameDefine.FRENZY_SCORE_MAX);
                // console.log(this.mFrenzyScore);
                break;
        }
        
    }

    IsFrenzy()
    {
        return this.mState == this.STATE.FRENZY;
    }

    StopFrenzy()
    {
        SoundMgr.Stop(SFX_FRENZY);
        this._SetState(this.STATE.NORMAL);
    }

    Reset()
    {
        this.mFrenzyCount = 0;

        for(let i = 0; i < this.mConnectionBarGauge.length; i++)
        {
            this.mConnectionBarGauge[i].visible = false;
        }
    }

    //PRIVATE FUNCTION
    _ResetFrenzyScore()
    {
        this.mFrenzyScore = 0;
    }

    _UpdateConnectionBar()
    {
        let count = this.mFrenzyCount;
        let length = this.mConnectionBarGauge.length;

        if(count <= length)
        {
            for(let i = 0; i < count ; i++)
            {
                this.mConnectionBarGauge[i].visible = true;
            }
        }
    }
    
    _UpdateMask(dt)
    {
        let mFrenzyBar = GuiManager.GetGui(GUI_INGAME_UI).GetObject(GUI_OBJECT_INGAME_UI_FRENZY_BAR) 
        let bar_rect = mFrenzyBar.GetTransformRect();
        let widthFrenzy      
        widthFrenzy = bar_rect.width 

        switch(this.mState)
        {
            case this.STATE.NORMAL:
                let ratio = this.mFrenzyScore/GameDefine.FRENZY_SCORE_MAX;
                // let targetY = GameDefine.FRENZY_BAR_POS.y + this.mFrenzyBar.height * (1-ratio);
                // this.mFrenzyBar.y = GameDefine.MoveToTarget(
                //     this.mFrenzyBar.y,
                //     targetY,
                //     Math.max(3*Math.abs(targetY - this.mFrenzyBar.y), 0.2), 
                //     dt
                // );
                // if (ratio > 0.1)
                // {
                //     ratio;
                // }
                this.mFrenzyBarMask.clear();
                this.mFrenzyBarMask.beginFill(0x000000, 1);
                this.mFrenzyBarMask.drawRect(bar_rect.x, bar_rect.y,widthFrenzy * ratio, bar_rect.height);
                break;

            case this.STATE.FRENZY:
                this.mFrenzyBarMask.clear();
                this.mFrenzyBarMask.beginFill(0x000000, 1);
                this.mFrenzyBarMask.drawRect(bar_rect.x, bar_rect.y, widthFrenzy *(1- this.mPercent), bar_rect.height);
                break;
        }
    }

    _UpdateMakeWind(dt)
    {
        this.mCountTimeMakeWind -= dt;
        if(this.mCountTimeMakeWind <= 0 && this.mPercent <= (1 - 1/GameDefine.FRENZY_LONG_TIME)) 
        {
            this.mCountTimeMakeWind = GameDefine.GetRandomInRange(1/50, 1/30);
            for(let i = 0; i < 2; i++)
            {
                this._MakeWind(GameDefine.WIND_DISTANCE_MAKE_WIND);
            }
        }
    }

    _MakeWind(deltaZ)
    {
        let playerPosition = Player.GetPosition();
        ParticleMgr.SetWindParticle(
            {
                x: playerPosition.x + GameDefine.GetRandomInRange(-700, 700),
                y: playerPosition.y + GameDefine.GetRandomInRange(-100, -1500),
                z: playerPosition.z + deltaZ,
            }
        );
    }

    _CreatePIXISprite(spriteId, frameId)
    {
        let texture = new PIXI.Texture(GLSpriteManager.spriteInfo[spriteId].texture.baseTexture);
        let data = GLSpriteManager.spriteInfo[spriteId].data;
        let fmStart = data.frames[frameId].fmstartIndex;
        let fm = data.fmodule[fmStart];
        let md = data.modules[fm.fmodulesID];
        this.moduleTextures.push(texture);
        this.moduleTextures[this.moduleTextures.length - 1].frame = new PIXI.Rectangle(md.x, md.y, md.w, md.h);
     
        let sprite = new PIXI.Sprite(texture);
        sprite.scale.set(fm.fmodulesScaleX, fm.fmodulesScaleY);
        sprite.rotation	= fm.fmodulesRotation * Math.PI / 180;
        sprite.visible	= true;
        return sprite;
    }

    _CreateMaskBar()
    {
        let maskBar = new PIXI.Graphics();

        // maskBar.lineStyle(2, 0x0000ff, 1, 1);
        maskBar.beginFill(0x0000ff, 0);
        maskBar.moveTo(0, 0);
        maskBar.lineTo(21, 23);
        maskBar.lineTo(21, 273);
        maskBar.lineTo(0, 296);
        maskBar.lineTo(-21, 273);
        maskBar.lineTo(-21, 23);        
        maskBar.closePath();
        maskBar.endFill();

        return maskBar;
    }

}
module.exports = FrenzyMgr;