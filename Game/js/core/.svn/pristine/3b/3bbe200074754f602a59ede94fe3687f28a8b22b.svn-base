class Application extends PIXI.Container
{
	constructor()
	{
		super();

		this.fadeEffect		= new PIXI.Graphics();
		this.fadeEffect.alpha = 0;
		this.debugLayer		= new PIXI.Graphics();
		this.ticker			= PIXI.ticker.shared;
		this.offsetX		= 0;
		this.offsetY		= 0;

		if (GameConfig.isUseDetectRenderer)
		{
			this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, GameConfig.contextAttributesWebgl || {transparent: GameConfig.isBackgroundTransparent});
		}
		else
		{
			this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, GameConfig.contextAttributes2d || {transparent: GameConfig.isBackgroundTransparent}, true);
		}

		DeviceInfo.DetectDevice(window.innerWidth, window.innerHeight);
		this.Resize();

		this.interactive = true;
		this.on("pointerup", this.TouchHandler);
		this.on("pointerdown", this.TouchHandler);
		this.on("pointermove", this.TouchHandler);

		if (GameConfig.isSupportKeyboard)
		{
			window.addEventListener("keydown", this.KeyHandler, false);
			window.addEventListener("keyup", this.KeyHandler, false);
		}

		document.body.appendChild(this.renderer.view);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Init(gameLoop)
	{
		this.ticker.add(gameLoop);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetWidth()
	{
		if (this.rotation == 0)
		{
			return this.renderer.width;
		}
		else
		{
			return this.renderer.height;
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetHeight()
	{
		if (this.rotation == 0)
		{
			return this.renderer.height;
		}
		else
		{
			return this.renderer.width;
		}
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

	BeginFade()
	{
		this.addChild(this.fadeEffect)
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	EndFade()
	{
		this.removeChild(this.fadeEffect);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	EnableDebugLayer(align = false)
	{
		this.addChild(this.debugLayer);
		if (align)
		{
			if (this.IsRotate())
			{
				this.Align(this.debugLayer);
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	DisableDebugLayer()
	{
		this.removeChild(this.debugLayer);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Show()
	{
		document.body.appendChild(this.renderer.view);
		StateManager.Resume();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Hide()
	{
		document.body.removeChild(this.renderer.view);
		StateManager.Pause();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Resize()
	{
		DeviceInfo.DetectDevice(window.innerWidth, window.innerHeight);
		GameConfig.isHostGamePortrait = window.innerWidth < window.innerHeight;

		if (!GameConfig.isReverseScaleRatio)
		{
			if (GameConfig.isMigGamePortrait)
			{
				if (GameConfig.isHostGamePortrait)
				{
					this.ratio = window.innerWidth / window.innerHeight;
					this.renderer.resize(GameConfig.height * this.ratio, GameConfig.height);

					this.offsetX = (this.renderer.width - GameConfig.width) / 2;
					this.offsetY = 0;
				}
				else
				{
					this.ratio = window.innerHeight / window.innerWidth;
					this.renderer.resize(GameConfig.height, GameConfig.height * this.ratio);

					this.offsetX = (this.renderer.height - GameConfig.width) / 2;
					this.offsetY = 0;
				}
			}
			else
			{
				if (GameConfig.isHostGamePortrait)
				{
					this.ratio = window.innerWidth / window.innerHeight;
					this.renderer.resize(GameConfig.width * this.ratio, GameConfig.width);

					this.offsetX = 0;
					this.offsetY = (this.renderer.width - GameConfig.height) / 2;
				}
				else
				{
					this.ratio = window.innerHeight / window.innerWidth;
					this.renderer.resize(GameConfig.width, GameConfig.width * this.ratio);

					this.offsetX = 0;
					this.offsetY = (this.renderer.height - GameConfig.height) / 2;
				}
			}
		}
		else
		{
			if (GameConfig.isMigGamePortrait)
			{
				if (GameConfig.isHostGamePortrait)
				{
					this.ratio = window.innerHeight / window.innerWidth;
					this.renderer.resize(GameConfig.width, GameConfig.width * this.ratio);

					this.offsetX = 0;
					this.offsetY = (this.renderer.height - GameConfig.height) / 2;
				}
				else
				{
					this.ratio = window.innerWidth / window.innerHeight;
					this.renderer.resize(GameConfig.width * this.ratio, GameConfig.width);

					this.offsetX = 0;
					this.offsetY = (this.renderer.width - GameConfig.height) / 2;
				}
			}
			else
			{
				if (GameConfig.isHostGamePortrait)
				{
					this.ratio = window.innerHeight / window.innerWidth;
					this.renderer.resize(GameConfig.height, GameConfig.height * this.ratio);

					this.offsetX = (this.renderer.height - GameConfig.width) / 2;
					this.offsetY = 0;
				}
				else
				{
					this.ratio = window.innerWidth / window.innerHeight;
					this.renderer.resize(GameConfig.height * this.ratio, GameConfig.height);

					this.offsetX = (this.renderer.width - GameConfig.width) / 2;
					this.offsetY = 0;
				}
			}
		}
		
		this.renderer.view.style.width = window.innerWidth + 'px';
		this.renderer.view.style.height = window.innerHeight + 'px';

		if (window.VPaid)
		{
			this.renderer.view.style.width = window.innerWidth;
			this.renderer.view.style.height = window.innerHeight;
			this.renderer.view.style.zIndex = 999999;
		}

		this.Rotate(this.IsRotate());
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Align(stage)
	{
		stage.position.set(this.renderer.width / 2, this.renderer.height / 2);
		stage.pivot.set(this.GetWidth() / 2, this.GetHeight() / 2);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Rotate(isRotate)
	{
		if (isRotate)
		{
			this.position.set(this.renderer.width / 2, this.renderer.height / 2);
			this.pivot.set(this.renderer.width / 2, this.renderer.height / 2);
			this.rotation = GameConfig.appRotateAngle || -90/180*Math.PI;
		}
		else
		{
			this.pivot.set(0, 0);
			this.position.set(0, 0);
			this.rotation = 0;
		}

		this.fadeEffect.beginFill();
		this.fadeEffect.clear();
		this.fadeEffect.drawRect(0, 0, this.GetWidth(), this.GetHeight());
		this.fadeEffect.endFill();

		this.Align(this.fadeEffect);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsRotate()
	{
		return GameConfig.isMigGamePortrait != GameConfig.isHostGamePortrait;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime)
	{
		StateManager.Update(deltaTime);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Render()
	{
		this.renderer.render(this);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	TouchHandler(event)
	{
		if (gIsInterrupt)
		{
			return;
		}
		if (StateManager.stateNext == null)
		{
			Input.Update(event);
			StateManager.TouchHandler(event);
			Input.Reset(event);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	KeyHandler(event)
	{
		if (gIsInterrupt)
		{
			return;
		}

		StateManager.KeyHandler(event);
		if (event.target === document.body)
		{
			event.preventDefault();
		}
	}
}
module.exports = new Application();
