class Debug extends PIXI.Graphics
{
    constructor()
    {
        super();

        //-----------
        this.mArrLine = [];
    }

    Update(dt)
    {
        if(GameDefine.IS_DEBUG)
        {
            this.lineStyle(2, 0x00ff00, 1, 0.5);

            //----------------
            for(let i = 0; i <this.mArrLine.length; i += 2)
            {
                if(
                    this.mArrLine[i].z > Camera.GetPosition().z
                    && this.mArrLine[i+1].z > Camera.GetPosition().z
                )
                {
                    let position1 = Camera.GetDrawPosition(this.mArrLine[i]);
                    let position2 = Camera.GetDrawPosition(this.mArrLine[i+1]);
                    this.moveTo(position1.x, position1.y);
                    this.lineTo(position2.x, position2.y);
                    this.closePath();
                }
            }
        }
    }

    //PUBLIC FUNCTION
    Clear()
    {
        if(GameDefine.IS_DEBUG)
        {
            this.clear();
            this.mArrLine = [];
        }
    }

    DrawLine(p1, p2)
    {
        if(GameDefine.IS_DEBUG)
        {
            this._AddLinePoint(p1);
            this._AddLinePoint(p2);
        }
    }

    DrawBody(body)
    {
        if(GameDefine.IS_DEBUG)
        {
            let p;

            p = {x: body.x, y: body.y, z: body.z}; this._AddLinePoint(p); p.x += body.width; this._AddLinePoint(p);
            this._AddLinePoint(p); p.z += body.depth; this._AddLinePoint(p);
            this._AddLinePoint(p); p.x -= body.width; this._AddLinePoint(p);
            this._AddLinePoint(p); p.z -= body.depth; this._AddLinePoint(p);

            p = {x: body.x, y: body.y + body.height, z: body.z}; this._AddLinePoint(p); p.x += body.width; this._AddLinePoint(p);
            this._AddLinePoint(p); p.z += body.depth; this._AddLinePoint(p);
            this._AddLinePoint(p); p.x -= body.width; this._AddLinePoint(p);
            this._AddLinePoint(p); p.z -= body.depth; this._AddLinePoint(p);

            p = {x: body.x, y: body.y, z: body.z}; this._AddLinePoint(p); p.y += body.height; this._AddLinePoint(p);
            p = {x: body.x + body.width, y: body.y, z: body.z}; this._AddLinePoint(p); p.y += body.height; this._AddLinePoint(p);
            p = {x: body.x + body.width, y: body.y, z: body.z + body.depth}; this._AddLinePoint(p); p.y += body.height; this._AddLinePoint(p);
            p = {x: body.x, y: body.y, z: body.z + body.depth}; this._AddLinePoint(p); p.y += body.height; this._AddLinePoint(p);
        }
    }

    //PRIVATE FUNCTION
    _AddLinePoint(point)
    {
        this.mArrLine.push({x: point.x, y: point.y, z: point.z});
    }

}
module.exports = Debug;
