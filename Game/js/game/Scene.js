class Scene extends PIXI.Container
{
    constructor()
    {
        super();

        //---
        let n = 0;

        this.STATE = {};

        this.STATE.INACTIVE = n++;
        this.STATE.INIT = n++;
        this.STATE.ACTIVE = n++;

        //---
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
                this._UpdateDrawPositionOfChildren();
                this._SortChildren();
                break;

        }
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

    //PRIVATE FUNCTION
    _UpdateDrawPositionOfChildren()
    {
        let length = this.children.length;
        for(let i = 0; i < length; i++)
        {
            this.children[i].UpdateDrawPosition();
        }
    }

    _SortChildren()
    {
        for(let a = 0; a < this.children.length - 1; a++)
        {
            if(!this.children[a].IsStateInactive())
            {
                for(let b = a + 1; b < this.children.length; b++)
                {
                    if(!this.children[b].IsStateInactive())
                    {
                        if(this.children[a].GetPosition().z <= this.children[b].GetPosition().z)
                        {
                            let obA = this.children[a];
                            this.children[a] = this.children[b];
                            this.children[b] = obA;
                        }
                    }
                }
            }
        }
    }


}
module.exports = Scene;