const Particle = require('../game/Particle');

class ParticleUI extends Particle
{
    constructor()
    {
        super();
    }

    //OVERRIDE
    UpdateDrawPosition()
    {
        this.mDrawPosition = this.mPosition;
        //----------
        this.position.set(this.mDrawPosition.x, this.mDrawPosition.y);
        this.scale.set(this.mScale);
    }

    _UpdateInactive()
    {
        if(
            this.mPercent >= 1
            // || this.mPosition.z <= Camera.GetPosition().z
        )
        {
            this._SetState(this.STATE.INACTIVE);
        }
    }


}
module.exports = ParticleUI;