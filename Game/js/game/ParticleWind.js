const Particle = require('../game/Particle');

class ParticleWind extends Particle
{
    constructor()
    {
        super();

        //
        this.mGraphic;

        //
        this.mIsFirstInitWind = true;

        this.mWindSize;
        this.mWindColor;
    }

    //OVERRIDE
    _SetState(value)
    {
        super._SetState(value);
        
        //---
        switch(this.mState)
        {
            case this.STATE.INIT:
                if(this.mIsFirstInitWind)
                {
                    this.mGraphic = new PIXI.Graphics();
                    //
                    this.addChild(this.mGraphic);
                }

                this.mWindSize = 0;
                this.mWindColor = 0xffffff;

                //
                this.mIsFirstInitWind = false;
                break;
        }
    }

    Update(dt)
    {
        super.Update(dt);

        //---
        switch(this.mState)
        {
            case this.STATE.ACTIVE:
                this._UpdateDrawWind();
                break;
        }
    }

    UpdateDrawPosition()
    {
        this.mDrawPosition = {x: 0, y: 0, z: 0};

        //----------
        this.position.set(this.mDrawPosition.x, this.mDrawPosition.y);
        this.scale.set(1);
    }

    _UpdateInactive()
    {
        if(
            this.mPercent >= 1
            || this.mPosition.z <= Camera.GetPosition().z - this.mWindSize
        )
        {
            this._SetState(this.STATE.INACTIVE);
        }
    }

    //PUBLIC FUNCTION
    SetWindSize(value)
    {
        this.mWindSize = value;
    }

    SetWindColor(value)
    {
        this.mWindColor = value;
    }

    //PRIVATE FUNCTION
    _UpdateDrawWind()
    {
        this.mGraphic.clear();
        this.mGraphic.beginFill(this.mWindColor, 1);

        let h = GameDefine.WIND_SIZE_HEIGHT;
        let l = this.mWindSize;
        let p1 = Camera.GetDrawPosition({x: this.mPosition.x, y: this.mPosition.y + 0.5*h, z: Math.max(Camera.GetPosition().z + 1, this.mPosition.z)});
        let p2 = Camera.GetDrawPosition({x: this.mPosition.x, y: this.mPosition.y - 0.5*h, z: Math.max(Camera.GetPosition().z + 1, this.mPosition.z)});
        let p3 = Camera.GetDrawPosition({x: this.mPosition.x, y: this.mPosition.y - 0.5*h, z: Math.max(Camera.GetPosition().z + 1, this.mPosition.z + l)});
        let p4 = Camera.GetDrawPosition({x: this.mPosition.x, y: this.mPosition.y + 0.5*h, z: Math.max(Camera.GetPosition().z + 1, this.mPosition.z + l)});

        this.mGraphic.moveTo(p1.x, p1.y);
        this.mGraphic.lineTo(p2.x, p2.y);
        this.mGraphic.lineTo(p3.x, p3.y);
        this.mGraphic.lineTo(p4.x, p4.y);

        this.mGraphic.endFill();
    }
}
module.exports = ParticleWind;