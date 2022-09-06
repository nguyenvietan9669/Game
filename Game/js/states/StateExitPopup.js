class StateExitPopup extends PIXI.Container
{
	constructor()
	{
		super();

		this.background	= null;
		this.gui		= GuiManager.GetGui(GUI_EXITPOPUP);
		this.btnOk		= this.gui.GetObject(GUI_OBJECT_EXITPOPUP_OK);
		this.btnCancel	= this.gui.GetObject(GUI_OBJECT_EXITPOPUP_CANCEL);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load()
	{
		APP.AddChild(this);
		APP.Align(this);

		this.btnOk.SetTouchable(true);
		this.btnCancel.SetTouchable(true);

		if (this.background == null)
		{
			this.background = new PIXI.Graphics();
			this.background.beginFill(0x000000, 1);
			this.background.drawRect(0, 0, APP.GetWidth(), APP.GetHeight());
			this.background.endFill();
			this.background.alpha = 0.8;

			this.addChild(this.background);
			this.addChild(this.gui);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Unload()
	{
		APP.RemoveChild(this);
	}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Back()
	{
		StateManager.PopState();
		StateIngame.Resume();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime)
	{
		gIngameTimeSpent += deltaTime;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	TouchHandler(event)
	{
		switch (event.target)
		{
			case this.btnOk:
			{
				if (Input.IsTouchUp(event))
				{
					Utils.SendTrackingAndExit();
					this.btnOk.interactive = false;
				}
				break;
			}
			case this.btnCancel:
			{
				if (Input.IsTouchUp(event))
				{
					StateManager.PopState();
					StateIngame.Resume();
					this.btnCancel.interactive = false;
				}
				break;
			}
		}
	}
}
module.exports = new StateExitPopup();