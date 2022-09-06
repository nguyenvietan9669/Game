const Particle = require('../game/Particle');
const ParticleUI = require('../game/ParticleUI');
const ParticleWind = require('../game/ParticleWind');

class ParticleMgr
{
    constructor()
    {
        let n = 0;
        this.STATE = {};
        this.STATE.INACTIVE = n++;
        this.STATE.INIT = n++;
        this.STATE.ACTIVE = n++;

        //
        this.mArrParticle = [];
        this.mArrParticleUI = [];
        this.mArrParticleWind = [];

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
                break;

            case this.STATE.INIT:
                this._ResetArrParticle(this.mArrParticle);
                this._ResetArrParticle(this.mArrParticleUI);
                this._ResetArrParticle(this.mArrParticleWind);
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
                this._UpdateArrParticle(this.mArrParticle, dt);
                this._UpdateArrParticle(this.mArrParticleUI, dt);
                this._UpdateArrParticle(this.mArrParticleWind, dt);
                break;
        }

        // console.log(this.mArrParticle.length);
        // console.log(this.mArrParticleUI.length);
        // console.log(this.mArrParticleWind.length);
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

    SetScoreParticle(score, position)
    {
        let ratio = APP.GetHeight() > APP.GetWidth() ? APP.GetHeight() / APP.GetWidth() : APP.GetWidth() / APP.GetHeight();
        let normalizedRatio = Math.round((ratio) * 100) / 100;
        if (normalizedRatio >= 2.0) {
            if(position.x > 100) {
                position.x -= 40; 
            }
            if(position.x < 100) {
                position.x += 40; 
            }
        }

        if(score != 0)
        {
            let particle = this._GetObject(this.mArrParticle, Particle, Scene);
            particle.Init();

            let lifeTime = 1;
            particle.SetLifeTime(lifeTime);

            // particle.SetText(
            //     (score >= 0 ? '+' : '-') + Math.abs(score), 
            //     {
            //         fontFamily: GameConfig.fontList.MainFont,
            //         // fontFamily: 'Arial',
            //         fontSize: 40,
            //         fill: score >= 0 ? '#00FF00' : '#ff0000',
            //     }
            // );

            let arrTexture = (
                FrenzyMgr.IsFrenzy() ?
                    GameDefine.SCORE_TEXTURE_ARR_NUMBER_ID_STYLE_03
                    : score >= 0 ? 
                        GameDefine.SCORE_TEXTURE_ARR_NUMBER_ID_STYLE_01 
                        : GameDefine.SCORE_TEXTURE_ARR_NUMBER_ID_STYLE_02
            );

            particle.SetScoreTexture(score, GUI_SPRITE_GAME, arrTexture);

            let positionZ = Player.GetPosition().z - 1;
            particle.SetArrPosition(
                [[0, position.x], [1, position.x]],
                [[0, position.y - 380], [1, position.y - 700*(FrenzyMgr.IsFrenzy()? 1.3 : 1)]],
                [[0, positionZ], [1, positionZ + 1*Player.GetSpeed().z*lifeTime]]
            );

            particle.SetArrAlpha([[0, 0], [0.2, 1], [0.4, 1], [1, 0]]);
            particle.SetArrScale([[0, 0], [0.2, 2], [0.3, 1], [1, 1]]);

            particle.SetStateActive();
        }
    }

    SetTextTimeUp()
    {
        let particle = this._GetObject(this.mArrParticleUI, ParticleUI, UIContainer);
        particle.Init();

        particle.SetLifeTime(10);
        particle.SetAnimation(GUI_SPRITE_GAME, SPRITE_GAME_ANIM_TIME_OUT, true);

        particle.SetArrPosition(
            [[0, 0.5*APP.GetWidth()], [1, 0.5*APP.GetWidth()]],
            [[0, 0.28*APP.GetHeight()], [1, 0.28*APP.GetHeight()]],
            []
        );

        particle.SetArrAlpha([[0, 0], [0.03, 1], [1, 1]]);
        let scale = 0.8;
        particle.SetArrScale(
            [
                [0, 0], 
                [0.03, 1.3*scale], 
                [0.04, 0.8*scale], 
                [0.05, scale], 
                [1, scale]
            ]
        );

        particle.SetStateActive();
    }

    SetTextFrenzy()
    {
        let particle = this._GetObject(this.mArrParticleUI, ParticleUI, UIContainer);
        particle.Init();

        particle.SetLifeTime(1.5);
        particle.SetAnimation(GUI_SPRITE_GAME, SPRITE_GAME_ANIM_FRENZY, false);

        particle.SetArrPosition(
            [[0, 0.5*APP.GetWidth()], [1, 0.5*APP.GetWidth()]],
            [[0, 0.5*APP.GetHeight()], [1, 0.5*APP.GetHeight()]],
            []
        );

        particle.SetArrAlpha([[0, 0], [0.2, 1], [0.8, 1], [1, 0]]);
        particle.SetArrScale([[0, 0], [0.13, 1.3], [0.20, 0.8], [0.25, 1], [1, 1]]);

        particle.SetStateActive();
    }

    SetTextGo()
    {
        let particle = this._GetObject(this.mArrParticleUI, ParticleUI, UIContainer);
        particle.Init();

        particle.SetLifeTime(1);
        particle.SetAnimation(GUI_SPRITE_GAME, SPRITE_GAME_ANIM_GO_TXT, false);

        particle.SetArrPosition(
            [[0, 0.5*APP.GetWidth()], [1, 0.5*APP.GetWidth()]],
            [[0, 0.28*APP.GetHeight()], [1, 0.28*APP.GetHeight()]],
            []
        );

        particle.SetArrAlpha([[0, 0], [0.2, 1], [0.8, 1], [1, 0]]);
        particle.SetArrScale([[0, 0], [0.13, 1.3], [0.20, 0.8], [0.25, 1], [1, 1]]);

        particle.SetStateActive();

        SoundMgr.Play(SFX_GO);
    }

    SetWindParticle(position)
    {
        let particle = this._GetObject(this.mArrParticleWind, ParticleWind, Scene);
        particle.Init();

        particle.SetWindSize(GameDefine.WIND_SIZE_LENGTH*GameDefine.GetRandomInRange(0.8, 1.2));
        let arrColor = GameDefine.WIND_ARR_COLOR;
        particle.SetWindColor(arrColor[Math.floor(arrColor.length*Math.random())]);

        let lifeTime = 5;
        particle.SetLifeTime(GameDefine.GetRandomInRange(2, 3));
        particle.SetArrPosition(
            [[0, position.x], [1, position.x]], 
            [[0, position.y], [1, position.y]], 
            [[0, position.z], [1, position.z + GameDefine.WIND_SPEED_Z*lifeTime*GameDefine.GetRandomInRange(0.7, 1)]] 
        );

        let alpha = GameDefine.WIND_ALPHA + GameDefine.GetRandomInRange(-0.1, 0.1);
        particle.SetArrAlpha([[0, 0], [0.05, alpha], [0.9, alpha], [1, 0]]);
        particle.SetArrScale([[0, 1], [1, 1]]);

        particle.SetStateActive();
    }

    //PRIVATE FUNCTION
    _ResetArrParticle(arr)
    {
        let length = arr.length;
        for(let i = 0; i < length; i++)
        {
            arr[i].SetStateInactive();
        }
    }

    _UpdateArrParticle(arr, dt)
    {
        let length = arr.length;
        for(let i = 0; i < length; i++)
        {
            arr[i].Update(dt);
        }
    }

    _GetObject(arr, Object, parent)
    {
        let length = arr.length;
        for(let i = 0; i < length; i++)
        {
            if(arr[i].IsStateInactive())
            {
                return arr[i];
            }
        }

        let newObject = new Object();
        arr.push(newObject);
        parent.addChild(newObject);
        return newObject;
    }


}
module.exports = ParticleMgr;