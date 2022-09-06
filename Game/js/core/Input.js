class Input
{
	constructor()
	{
		this.touchX			= -1;
		this.touchY			= -1;
		this.touchDX		= 0;
		this.touchDY		= 0;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(event)
	{
		let x = event.data.global.x;
		let y = event.data.global.y;

		if (APP.IsRotate())
		{
			if(APP.rotation == -90/180*Math.PI)
			{
				x = APP.GetWidth() - event.data.global.y;
				y = event.data.global.x;
			}
			else if(APP.rotation == 90/180*Math.PI)
			{
				x = event.data.global.y;
				y = APP.GetHeight() - event.data.global.x;
			}
		}

		switch (event.type)
		{
			case "pointerdown":
			{
				this.touchX		= x;
				this.touchY		= y;
				break;
			}
			case "pointermove":
			{
				this.touchDX	= x - this.touchX;
				this.touchDY	= y - this.touchY;
				break;
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Reset(event)
	{
		if (event == null || event.type == "pointerup")
		{
			this.touchX		= -1;
			this.touchY		= -1;
			this.touchDX	= 0;
			this.touchDY	= 0;
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsTouchUp(event)
	{
		return event.type == "pointerup";
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsTouchDown(event)
	{
		return event.type == "pointerdown";
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsTouchMove(event)
	{
		return (event.type == "pointermove" && (this.touchX != -1 || this.touchY != -1) && (this.touchDX != 0 || this.touchDY != 0));
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsKeyUp(event)
	{
		return event.type == "keyup";
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsKeyDown(event)
	{
		return event.type == "keydown";
	}
}
module.exports = new Input();
