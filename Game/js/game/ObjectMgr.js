const Item = require('../game/Item');
const Obstacle = require('../game/Obstacle');
const Obstacle2nd = require('./Obstacle2nd');

class ObjectMgr
{
    constructor()
    {
        let n = 0;
        this.STATE = {};
        this.STATE.INACTIVE = n++;
        this.STATE.INIT = n++;
        this.STATE.ACTIVE = n++;

        //
        this.mArrItem = [];
        this.mArrObstacle = [];
        this.mArrObstacle2 = [];

        //
        this.mState;
        this.mPositionZ;
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
                this._InactiveArrObject(this.mArrItem);
                this._InactiveArrObject(this.mArrObstacle);
                this._InactiveArrObject(this.mArrObstacle2);

                LevelMgr.RandomLevel();
                this.mPositionZ = GameDefine.OBJECT_MGR_START_Z;
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
                this._UpdateMakeObject(dt);

                this._UpdateArrObject(this.mArrItem, dt);
                this._UpdateArrObject(this.mArrObstacle, dt);
                this._UpdateArrObject(this.mArrObstacle2, dt);

                this._DrawDebugPath();
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

    GetArrItem()
    {
        return this.mArrItem;
    }

    GetArrObstacle()
    {
        return this.mArrObstacle;
    }

    GetArrObstacle2()
    {
        return this.mArrObstacle2;
    }

    //PRIVATE FUNCTION
    _InactiveArrObject(arr)
    {
        let length = arr.length;
        for(let i = 0; i < length; i++)
        {
            arr[i].SetStateInactive();
        }
    }

    _UpdateArrObject(arr, dt)
    {
        let length = arr.length;
        for(let i = 0; i < length; i++)
        {
            arr[i].Update(dt);
        }
    }

    _DrawDebugPath()
    {
        if(GameDefine.IS_DEBUG)
        {
            for(let i = 0; i < GameDefine.NUMBER_OF_LANE; i++)
            {
                let x = (i - (GameDefine.NUMBER_OF_LANE - 1)/2)*GameDefine.LANE_WIDTH;
                Debug.DrawLine(
                    {x: x, y: 0, z: Camera.GetPosition().z + 100},
                    {x: x, y: 0, z: Camera.GetPosition().z + 100000}
                );
            }
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

    _UpdateMakeObject(dt)
    {
        if(this.mPositionZ <= Player.GetPosition().z + GameDefine.OBJECT_MGR_OFFSET_Z_WITH_PLAYER)
        {
            let row = LevelMgr.GetNextRow();
            // console.log(row);

            let length = row.length;
            for(let i = 0; i < length; i++)
            {
                let object;
                let objectType = row[i];
                // console.log(object )
                switch(objectType)
                {
                    case ObjectDefine.OBJECT_TYPE.NO_THING:
                        //NO THING
                        break;

                    case ObjectDefine.OBJECT_TYPE.ITEM_01:
                        //ITEM
                        object = this._GetObject(this.mArrItem, Item, Scene);
                        break;

                    case ObjectDefine.OBJECT_TYPE.OBSTACLE_01:                    
                    // case ObjectDefine.OBJECT_TYPE.OBSTACLE_03:
                    // case ObjectDefine.OBJECT_TYPE.OBSTACLE_04:
                        //OBSTACLE
                        object = this._GetObject(this.mArrObstacle, Obstacle, Scene);
                        break;
                    case ObjectDefine.OBJECT_TYPE.OBSTACLE_02:
                        object = this._GetObject(this.mArrObstacle2, Obstacle2nd, Scene);
                        break;
                }
                if(object != undefined)
                {
                    object.Init();
                    object.SetStateActive();
                    object.SetPosition(
                        {
                            x: (i - (length - 1)/2)*GameDefine.LANE_WIDTH, 
                            y: 0, 
                            z: this.mPositionZ,
                        }
                    );
                    object.SetInfor(ObjectDefine.GetObjectInfor(objectType));
                    // console.log('');
                    // console.log(length);
                    // console.log(i);
                    // console.log(object.GetPosition().x);
                }
            }

            //----------
            this.mPositionZ += GameDefine.LEVEL_ROW_DISTANCE;

            // console.log(this.mPositionZ);
            // console.log(this.mArrItem.length);
        }
    }

}
module.exports = ObjectMgr;