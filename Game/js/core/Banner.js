class Banner extends PIXI.Container
{
	constructor()
	{
		super();

		this.renderer 		= PIXI.autoDetectRenderer(GameConfig.bannerWidth, GameConfig.bannerHeight, {backgroundColor: 0xff0000}, true);
		this.hitArea		= new PIXI.Rectangle(0, 0, GameConfig.bannerWidth, GameConfig.bannerHeight);
		this.interactive	= true;

		this.on("pointerup", this.TouchHandler);
		this.on("pointerdown", this.TouchHandler);
		this.on("pointermove", this.TouchHandler);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	AddChild(stage)
	{
		this.addChild(stage);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	RemoveChild(stage)
	{
		this.removeChild(stage);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Show()
	{
		document.body.appendChild(this.renderer.view);

		gIsShowBanner = true;
		APP.Hide();

		// if (typeof reward_delivered != 'undefined' && reward_delivered)
		// {
		// 	closeWithReward();
		// 	StateIngame.GotReward();
		// }

		setTimeout(function()
		{
			StateManager.Pause();
			clearTimeout(this);
		}, 100);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Hide()
	{
		Utils.PauseHostGameMusic();

		document.body.removeChild(this.renderer.view);

		if (StateManager.IsEmpty())
		{
			StateManager.PushState(StatePreLoad);
		}

		gIsShowBanner = false;
		APP.Show();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Resize()
	{
		this.ratio = window.innerHeight / window.innerWidth;
		this.renderer.resize(GameConfig.bannerWidth, GameConfig.bannerWidth * this.ratio);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime)
	{
		for (let view of this.children)
		{
			if (view.Update)
			{
				view.Update(deltaTime);
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Render()
	{
		this.renderer.render(this);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	TouchHandler(event)
	{
		for (let view of this.children)
		{
			if (view.TouchHandler)
			{
				view.TouchHandler(event);
			}
		}
	}
}
module.exports = new Banner();