const GLPack = require('../core/modules/aurora/GLPack');
const GLText = require('../core/modules/aurora/GLText');
const GLSpriteReader = require('../core/modules/aurora/GLSpriteReader');
const GLSpriteManager = require('../core/modules/aurora/GLSpriteManager');
const Gui = require('../core/modules/aurora/Gui');
const GLSprite = require('../core/modules/aurora/GLSprite');
const GLAnimation = require('../core/modules/aurora/GLAnimation');

const TweenDefine = require('../core/modules/tween/TweenDefine');
const TweenMgr = require('../core/modules/tween/TweenMgr');

//window.iv_location_type = '1';

global.SoundMgr = require('../game/SoundMgr');

class StatePreLoad extends PIXI.Container {
	constructor() {
		super();

		this.background = new PIXI.Container();
		this.foreground = new PIXI.Container();
		this.decoration = new PIXI.Container();
		this.splash = null;
		this.btnExit = null;
		this.token = null;
		this.info = null;
		this.btnPlay = null;
		this.infoClicked = false;
		this.isLoaded = false;
		this.interactive = true;
		this.tokenIsLoaded = false;

		this.addChild(this.background);
		this.addChild(this.foreground);
		this.addChild(this.decoration);
		APP.AddChild(this);

		if (!Utils.IsOnDevie()) {
			APP.EnableDebugLayer()
		}

		UserProfile.Load()
			.then(response => {
				let profile = JSON.parse(response);
				if (profile.finishTutorial) {
					GameConfig.isNewUser = false;
				}
				else {
					GameConfig.isNewUser = true;
				}
			})
			.catch(error => {
				GameConfig.isNewUser = true;
			})

		Resource.GetAssetData(`data/gui/${(DeviceInfo.GetLanguagePack())}`)
			.then(response => {
				GLPack.Load(response);
				GLText.Load(GLPack.GetData(0));
			})
			.catch(error => {
				Utils.SendTrackingAndExit("LoadError: LanguagePack");
			});

		Resource.LoadFont("MainFont", Utils.OMSGetData('font/din-bold-webfont.ttf'))
			.then(response => {
				console.log('font loaded');
			})
			.catch(error => {
				console.log('font error');
			})
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load() {
		if (!this.IsResizeCompleted()) {
			return;
		}

		let xhr = { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR };

		this.tweenMgr = new TweenMgr();

		this.isLoaded = false;
		GameDefine.UpdateParams();
		
		//if(!!window.isOutfit7)
		this.RegisterVisibilityChange()
		
		if (APP.IsRotate() && GameConfig.isSupportTwoScreenSize) {
			APP.Rotate(false);
		}
		APP.Align(this);

		if (typeof (window.iv_location_type) != 'undefined' && window.iv_location_type === '1') {
			let assets = [
				{ name: "imgPreload", url: Utils.OMSGetImage("preload.png"), options: xhr }
			];
			Utils.LoadAssets(assets, this.LoadProgressHandler.bind(this), this.LoadCompleteHandler.bind(this), this.LoadErrorHandler.bind(this));
			Utils.RemoveLoadingWheel();

			return;
		}
		let assets = [
			{ name: "imgSplash", url: Utils.OMSGetImage(this.GetSplashName()), options: xhr },
			{ name: "imgPreload", url: Utils.OMSGetImage("preload.png"), options: xhr },
			{ name: "imgToken", url: Utils.OMSGetToken(), options: xhr }
		];
		Utils.LoadAssets(assets, this.LoadProgressHandler.bind(this), this.LoadCompleteHandler.bind(this), this.LoadErrorHandler.bind(this));

		this.tokenIsLoaded = false;

		AudioManager.Load([{ file: "data/sound/M4A/sfx_start.m4a", volume: 1 }]);
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	RegisterVisibilityChange()
	{
		var hidden, visibilityChange; 
		if (typeof document.hidden !== "undefined") 
		{ // Opera 12.10 and Firefox 18 and later support 
			hidden = "hidden";
			visibilityChange = "visibilitychange";
		} 
		else if (typeof document.msHidden !== "undefined") 
		{
			hidden = "msHidden";
			visibilityChange = "msvisibilitychange";
		} 
		else if (typeof document.webkitHidden !== "undefined") 
		{
			hidden = "webkitHidden";
			visibilityChange = "webkitvisibilitychange";
		}
	
		function handleVisibilityChange() {
			if (document[hidden]) {
				window.onGamePause();
			} else {
				window.onGameResume();
			}
		}
	
		// Warn if the browser doesn't support addEventListener or the Page Visibility API
		if (typeof document.addEventListener === "undefined" || hidden === undefined) 
		{
			console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
		} 
		else 
		{
			// Handle page visibility change   
			document.addEventListener(visibilityChange, handleVisibilityChange, false);
		}
	}
	
	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Unload() {
		if (APP.IsRotate() && GameConfig.isSupportTwoScreenSize) {
			APP.Rotate(true);
			APP.Align(this);
		}

		APP.RemoveChild(this);
		if (!Utils.IsOnDevie()) {
			APP.DisableDebugLayer();
		}

		this.removeChild(this.foreground);
		this.removeChild(this.decoration);
		// this.destroy({ children: true, texture: true, baseTexture: true });
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Resize() {
		if (!this.isLoaded || window.fromCache == '1') {
			if (this.IsResizeCompleted()) {
				PIXI.loader.removeAllListeners();
				PIXI.loader.reset();

				this.background.removeChildren(0, this.background.children.length);
				this.foreground.removeChildren(0, this.foreground.children.length);
				this.Load();
			}
		}
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Resume() {
		this.infoClicked = false;
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime) {
		Utils.UpdateLoadingWheel(deltaTime);
		this.UpdatePreload(deltaTime);

		if (!Utils.IsOnDevie()) {
			let debugLayer = APP.debugLayer;

			debugLayer.clear();
			debugLayer.lineStyle(2, 0xff0000, 1);

			if (window._show_touchzone) {
				// Exit button
				if (this.btnExit != null) {
					let rect = this.btnExit.GetTransformRect();
					debugLayer.drawRect(rect.x, rect.y, rect.width, rect.height);
				}

				if (this.info != null) {
					let rect = this.info.GetTransformRect();
					debugLayer.drawRect(rect.x, rect.y, rect.width, rect.height);
				}

				if (this.btnPlay != null) {
					let rect = this.btnPlay.GetTransformRect();
					debugLayer.drawRect(rect.x, rect.y, rect.width, rect.height);
				}
			}
		}
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadProgressHandler(loader, resource) {
		Utils.Log("StatePreload loading: " + resource.name);
		Utils.Log("StatePreload progress: " + loader.progress + "%");
		switch (resource.name) {
			case "imgSplash":
				{
					Utils.RemoveLoadingWheel();

					this.splash = new PIXI.Sprite(PIXI.loader.resources.imgSplash.texture);
					this.splash.anchor.set(0.5, 0.5);
					this.splash.position.set(APP.GetWidth() / 2, APP.GetHeight() / 2);

					this.background.addChild(this.splash);

					// if (GameDefine.IsWideScreen() && this.IsUseLandscape() == false) {
					// 	let blackBG = new PIXI.Graphics();
					// 	blackBG.beginFill(0x000000);
					// 	blackBG.drawRect(0, 0, APP.GetWidth(), 125);
					// 	blackBG.endFill();

					// 	this.background.addChild(blackBG);
					// }
					break;
				}
			case "imgPreload":
				{
					this.LoadPreloadSprite(PIXI.loader.resources.imgPreload.texture);
					break;
				}
			case "imgToken":
				{
					this.token = Utils.InitToken(PIXI.loader.resources.imgToken.texture, 0.5);
					break;
				}
		}

		Resource.RevokeObjectURL(resource.url);
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadErrorHandler(error, loader, resource) {
		Utils.Log("LoadErrorHandler: " + error);
		if (resource && resource.name) {
			Utils.SendTrackingAndExit(`LoadError: ${resource.name}`);
		}
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadCompleteHandler() {
		Utils.Log("LoadCompleteHandler");

		this.isLoaded = true;
		gIsSizeChanged = true;

		Utils.InitAdvertisement(GLText.GetText(TEXT_CONTENTS_AD_TEXT), {
			fontFamily: GameConfig.fontList.MainFont,
			fontSize: Utils.GetFontSize(30, GameConfig.fontList.MainFont),
			fill: "#ffffff",
			dropShadow: true,
			dropShadowColor: '#333333',
			dropShadowBlur: 4
		});

		TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_AD_VIEWABLE);

		if (typeof (window.iv_location_type) != 'undefined' && window.iv_location_type === '1') {
			Utils.InitInfo();
			this.NextState();
			return;
		}

		this.Alignment();
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetSplashName() {
		if (this.IsUseLandscape()) {
			return "preload_bg_landscape.jpg";
		}
		else {
			return "bg.jpg";
		}

	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Alignment() {
		let style = new PIXI.TextStyle(
			{
				align: "center",
				fontFamily: GameConfig.fontList.MainFont,
				fontSize: Utils.GetFontSize(40, GameConfig.fontList.MainFont),
				fill: "#FFFFFF",
				fontWeight: "bolder",
				stroke: "#492831",
    			strokeThickness: 2,
				dropShadow: true,
				dropShadowColor: "#492831",
				dropShadowDistance: 1,

			});
		Utils.SetTokenInfo(GLText.GetText(TEXT_CONTENTS_PLAY_NOW_2), style);
		if(this.IsUseLandscape())
		{
			this.token.x = APP.GetWidth()/4 - 45; 
			this.token.y = APP.GetHeight()/2 + 60;
		}
		else
		{
			this.token.x = APP.GetWidth()/2 - this.token.width/2 + 30;
			this.token.y = APP.GetHeight()/2 + 250;
		}
		this.addChild(this.token);
		this.tokenIsLoaded = false;
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadPreloadSprite(texture) {
		Resource.GetAssetData(Utils.OMSGetGuiData(PACK_PRELOAD))
			.then(response => {
				GLPack.Load(response);
				GLSpriteManager.Add(GUI_SPRITE_PRELOAD, texture, GLSpriteReader.Load(GLPack.GetData(0)));

				for (let i = GUI_PRELOAD_LANDSCAPE; i <= GUI_LOADING; i++) {
					let gui = new Gui();
					gui.Load(GLPack.GetData(i + 1));
					GuiManager.Add(i, gui);
				}

				GLPack.Close();
				this.SetupPreload();
			})
		// .catch(error => {
		// 	Utils.Log("Preload load error");
		// })
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetupPreload() {
		if (typeof (window.iv_location_type) != 'undefined' && window.iv_location_type === '1') {
			return;
		}

		let style = new PIXI.TextStyle(
			{
				align: "center",
				fontFamily: GameConfig.fontList.MainFont,
				fontSize: Utils.GetFontSize(40, GameConfig.fontList.MainFont),
				fill: "#FFFFFF",
				fontWeight: "bolder",
				stroke: "#492831",
    			strokeThickness: 2,
				dropShadow: true,
				dropShadowColor: "#492831",
				dropShadowDistance: 1,

			});

		this.decoration.removeChildren(0, this.decoration.children.length);

		if (this.IsUseLandscape()) {
			GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_PLAY_TEXT).style = style;
			GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_PLAY_TEXT_002).visible = false;
			
			this.btnExit = GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_EXIT);
			this.decoration.addChild(GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE));

			this.btnPlay = GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_PLAY_BTN);
			this.info = GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_INFO);

			// if (GameDefine.IsWindowVersion()) {
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_TEXT).SetFrame(SPRITE_PRELOAD_FRAME_TEXT);
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_GIRL_WIN).visible = true;
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_PC_WIN).visible = true;
			// }
			// else {
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_TEXT).SetFrame(SPRITE_PRELOAD_FRAME_TEXT2);
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_GIRL_INTEL).visible = true;
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_PC_INTEL).visible = true;
			// }

			GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).UpdateAnchorRotate();

			if (GameDefine.IS_WIDTHER_DEVICE) {
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_PC_INTEL).scale.set(0.8);
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_PC_WIN).scale.set(0.8);
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_GIRL_INTEL).y -= 40;
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_GIRL_WIN).y -= 40;

				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_BLACK_BAR).x += 40;
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_OMEN).x += 40;
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_PRODUCT_LOGO).x += 40;
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_GIRL_INTEL).x += 40;
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_GIRL_WIN).x += 40;

				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_ICON).scale.set(0.8);
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_ICON).x -= 50;

				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_PLAY_BTN).x += 40;
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_LOGO_WIN10).x += 40;
				// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_TEXT1).x += 40;
			}

			// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_TEXT).y = this.info.y - this.info.height / 2 - GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_TEXT).height / 2 - 15;
			// GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_OMEN).y = APP.GetHeight() - GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_OMEN).height / 2 - 25;
		}
		else {
			GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_PLAY_TEXT).style = style;
			GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_PLAY_TEXT).x = APP.GetWidth()/2;
			GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_PLAY_TEXT_002).visible = false;
			GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_PLAY_BTN).x = APP.GetWidth()/2;

			this.btnExit = GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_EXIT);
			this.decoration.addChild(GuiManager.GetGui(GUI_PRELOAD_PORTRAIT));

			this.btnPlay = GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_PLAY_BTN);
			this.info = GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_INFO);

			// if (GameDefine.IsWindowVersion()) {
			// 	GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_TEXT).SetFrame(SPRITE_PRELOAD_FRAME_TEXT);

			// 	GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_GIRL_WIN).visible = true;

			// 	if (GameDefine.IsIpadScreen()) {
			// 		GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_GIRL_WIN).position.x = GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_GIRL_WIN).width / 2;
			// 	}
			// }
			// else {
			// 	GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_TEXT).SetFrame(SPRITE_PRELOAD_FRAME_TEXT2);

			// 	GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_GIRL_INTEL).visible = true;
			// }

			if (GameDefine.IsWideScreen()) {
				// GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_PLAY_BTN).position.x -= 40;
				// GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_TEXT).position.x -= 40;
				// GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_GIRL_INTEL).position.x -= 50;

				// GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_OMEN).position.y += 40;
				// GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_ICON).position.y += 40;
				// GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_EXIT).position.y += 40;

				// GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_ICON).scale.set(0.8);
				// GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_ICON).position.x -= 50;

				// GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_PRODUCT_LOGO).position.y += 34;
			}
		}
		this.btnExit.SetTouchable(true);
		this.btnPlay.SetTouchable(true);
		this.info.SetTouchable(true);
		
		if (!!window.isOutfit7){
			GuiManager.GetGui(GUI_PRELOAD_LANDSCAPE).GetObject(GUI_OBJECT_PRELOAD_LANDSCAPE_EXIT).position.set(3000,3000)
			GuiManager.GetGui(GUI_PRELOAD_PORTRAIT).GetObject(GUI_OBJECT_PRELOAD_PORTRAIT_EXIT).position.set(3000,3000)
			GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_EXIT).position.set(3000,3000)
		}
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	UpdatePreload(deltaTime) {
		if (this.decoration.children.length > 0) {
			if (this.tweenMgr.objList.length > 0) {
				this.tweenMgr.Update(deltaTime);
			}
			else {
				if (this.btnPlay) {
					this.tweenMgr.Create(this.btnPlay, TweenDefine.EXPONENTIAL_IN, { scale: 1 }, { scale: 0.8 }, 1, 0);
					this.tweenMgr.Create(this.btnPlay, TweenDefine.EXPONENTIAL_OUT, { scale: 0.8 }, { scale: 1 }, 1, 0);
					this.tweenMgr.SetLoop(this.btnPlay, -1);
				}
			}

			let guiIndex = GUI_PRELOAD_PORTRAIT;
			if (this.IsUseLandscape()) {
				guiIndex = GUI_PRELOAD_LANDSCAPE;
			}

			GuiManager.GetGui(guiIndex).Update(deltaTime);
		}
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsResizeCompleted() {
		return window.innerWidth > 0 && window.innerHeight > 0;
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	NextState() {
		if (this.isLoaded) {
			TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_ENGAGEMENTS);

			gTotalTimeSpent = 0.01;
			gIngameTimeSpent = 0.01;
			this.interactive = false;

			StateManager.SwitchState(StateLoading);
		}
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsUseLandscape() {
		return GameConfig.isMigGamePortrait && APP.IsRotate() || !GameConfig.isMigGamePortrait && !APP.IsRotate();
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	TouchHandler(event) {
		switch (event.target) {
			case this.btnPlay:
				{
					if (Input.IsTouchUp(event) && this.isLoaded) {
						this.NextState();
						AudioManager.Play(0);
					}
					break;
				}
			case this.btnExit:
				{
					if (Input.IsTouchUp(event)) {
						Utils.SendTrackingAndExit();
					}
					break;
				}
			case this.info:
				{
					if (Input.IsTouchUp(event) && !this.infoClicked) {
						this.infoClicked = true;
						Utils.RedirectInfo("Interstitial");
					}
					break;
				}

		}
	}
}
module.exports = new StatePreLoad();