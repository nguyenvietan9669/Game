const GLPack 			= require('../core/modules/aurora/GLPack');
const GLText 			= require('../core/modules/aurora/GLText');
const GLSpriteReader	= require('../core/modules/aurora/GLSpriteReader');
const GLSpriteManager	= require('../core/modules/aurora/GLSpriteManager');
const Gui				= require('../core/modules/aurora/Gui');

class StateBanner extends PIXI.Container
{
	constructor()
	{
		super();

		this.hitArea	 	= new PIXI.Rectangle(0, 0, GameConfig.bannerWidth, GameConfig.bannerHeight);
		this.isFirstClick	= false;
		this.interactive 	= true;

		BANNER.AddChild(this);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load()
	{
		let xhr = {loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR};
		let assets = [
			{name: "imgBanner", url: Utils.OMSGetImage('banner.png'), options: xhr},
		];

		Utils.LoadAssets(assets, this.LoadProgressHandler.bind(this), this.LoadCompleteHandler.bind(this), this.LoadErrorHandler.bind(this));
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Unload()
	{
		PIXI.loader.removeAllListeners();
		PIXI.loader.reset();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime)
	{
		let banner = GuiManager.GetGui(GUI_BANNER);
		if (banner)
		{
			banner.Update(deltaTime);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadProgressHandler(loader, resource)
	{
		Utils.Log("StateBanner loading: " + resource.name);
		Utils.Log("StateBanner progress: " + loader.progress + "%");
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadErrorHandler(error)
	{
		Utils.Log("StateBanner LoadErrorHandler: " + error);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadCompleteHandler()
	{
		Resource.GetAssetData(Utils.OMSGetGuiData(PACK_BANNER))
		.then(response =>
		{
			GLPack.Load(response);
			GLSpriteManager.Add(GUI_SPRITE_BANNER, PIXI.loader.resources.imgBanner.texture, GLSpriteReader.Load(GLPack.GetData(0)));

			let gui = new Gui();
			gui.Load(GLPack.GetData(1));
			GuiManager.Add(GUI_BANNER, gui);

			GLPack.Close();

			this.addChild(GuiManager.GetGui(GUI_BANNER));
		})
		.catch(error =>
		{
			Utils.Log("Preload load error");
		})

		if (window.mraid)
		{
			mraid.addEventListener('sizeChange', function(w, h)
			{
				if (!gIsShowBanner)
				{
					BANNER.Show();
				}
				else
				{
					BANNER.Hide();
				}
			});
		}

		if (!gIsShowBanner)
		{
			BANNER.Show();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	TouchHandler(event)
	{
		switch (event.target)
		{
			case this:
			{
				if (event.type == "pointerup")
				{
					if (StateManager.IsEmpty())
					{
						this.Unload();
					}

					if (window.mraid)
					{
						mraid.setOrientationProperties({"allowOrientationChange": false, "forceOrientation": "portrait"});
						mraid.expand();
					}
					else
					{
						if (window.REVIEW)
						{
							iView.setBanner(false);
						}
						BANNER.Hide();
					}

					if (!this.isFirstClick)
					{
						var pixelUrl = GameConfig.Get3rdPartyImpression();
						if (pixelUrl && pixelUrl.startsWith("http"))
						{
							pixelUrl = pixelUrl.replace("[timestamp]", Date.now());
							TrackingManager.SetPixelTracking(TrackingManager.TRACKING_ACTION_IMPRESSIONS, pixelUrl);
						}
						TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_IMPRESSIONS);

						this.isFirstClick = true;
					}
				}
			}
		}
	}
}
module.exports = new StateBanner();