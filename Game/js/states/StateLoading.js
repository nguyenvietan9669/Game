const Gui = require('../core/modules/aurora/Gui');
const GLPack = require('../core/modules/aurora/GLPack');
const GLText = require('../core/modules/aurora/GLText');
const GLSpriteReader = require('../core/modules/aurora/GLSpriteReader');
const GLSpriteManager = require('../core/modules/aurora/GLSpriteManager');
const AudioElementManager = require('../core/modules/audio/AudioElementManager');

class StateLoading extends PIXI.Container {
	constructor() {
		super();

		let n = 0;
		this.STATE_LOAD_NONE = n++;
		this.STATE_LOAD_IMAGE = n++;
		this.STATE_LOAD_SPRITE = n++;
		this.STATE_LOAD_GUI = n++;
		this.STATE_LOAD_SOUND = n++;
		this.STATE_LOAD_VIDEO = n++;
		this.STATE_LOAD_FINISHED = n++;

		this.background = new PIXI.Container();
		this.foreground = new PIXI.Container();
		this.decoration = new PIXI.Container();
		this.txtTitle = null;
		this.txtLostConnect = null;
		this.loadingState = 0;
		this.loadingTime = 0;
		this.loadingTimeOut = 30;
		this.loadingBg = null;
		this.btnRetry = null;
		this.lostConnection_BG = null;
		this.btnExit = null;
		this.loadMask = null;
		this.errorLoading = false;
		
		this.loadCount 				= 0;
		this.loadProgressCount 		= 0;

		// this.mBlackBg = new PIXI.Graphics();

		// this.addChild(this.mBlackBg);
		this.addChild(this.background);
		this.addChild(this.foreground);
		this.addChild(this.decoration);
		APP.AddChild(this);

		this.interactive = true;
		this.loadingError = this.LoadingError.bind(this);
		document.addEventListener('LoadingError', this.loadingError);

		this.IsAligned = false;
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load() {
		let img = { loadType: PIXI.loaders.Resource.LOAD_TYPE.IMAGE };
		let xhr = { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR };
		this.errorLoading  			= false;
		APP.Align(this);

		if (gLoadingTimeSpent == 0) {
			gLoadingTimeSpent = gTotalTimeSpent;
		}

		PIXI.loader.removeAllListeners();
		PIXI.loader.reset();

		let assets = [
			{ name: "imgBg", url: Utils.OMSGetImage("bg.jpg"), options: xhr },
			{ name: "imgGame", url: Utils.OMSGetImage("game.png"), options: xhr },
			{ name: "MC", url: Utils.OMSGetImage("MC.png"), options: xhr },
			{ name: "MC2", url: Utils.OMSGetImage("MC2.png"), options: xhr },
			{ name: "imgGameover", url: Utils.OMSGetImage("gameover.jpg"), options: xhr },
		];

		// if (GameDefine.IsWindowVersion()) {
		// 	assets.push({ name: "imgGameover", url: Utils.OMSGetImage("gameover.jpg"), xhr });
		// 	assets.push({ name: "imgLoadingBg", url: Utils.OMSGetImage("preload_bg_portrait_win.jpg"), options: xhr });
		// }
		// else {
		// 	assets.push({ name: "imgGameover", url: Utils.OMSGetImage("gameover_intel.jpg"), xhr });
		// 	assets.push({ name: "imgLoadingBg", url: Utils.OMSGetImage("preload_bg_portrait_intel.jpg"), options: xhr });
		// }

		// if (GameDefine.IsWindowVersion()) {
		// 	GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_GIRL_WIN).visible = true;
		// 	GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_TEXT).SetFrame(SPRITE_PRELOAD_FRAME_TEXT);

		// 	if (GameDefine.IsIpadScreen()) {
		// 		GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_GIRL_WIN).position.x = GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_GIRL_WIN).width / 2;
		// 	}
		// }
		// else {
		// 	GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_GIRL_INTEL).visible = true;
		// 	GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_TEXT).SetFrame(SPRITE_PRELOAD_FRAME_TEXT2);
		// }

		if (GameDefine.IsWideScreen() && !this.IsAligned) {
			GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_TITLE).position.x -= 40;
			// GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_TEXT).position.x -= 40;
			//GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_ICON).position.x -= 40;
			//GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_GIRL_INTEL).position.x -= 40;
			GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_LOADING_ICON).position.x -= 40;
			//GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_LOADING_ICON_002).position.x -= 40;

			//GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_OMEN).position.y += 40;
			//GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_ICON).position.y += 40;			
			GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_EXIT).position.y += 40;

			//GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_ICON).scale.set(0.8);

			//GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_PRODUCT_LOGO).position.y += 34;
		}

		GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_LOADING_ICON).visible = true;
		//GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_LOADING_ICON_002).visible = true;

		this.IsAligned = true;

		Utils.LoadAssets(assets, this.LoadProgressHandler.bind(this), this.LoadCompleteHandler.bind(this), this.LoadErrorHandler.bind(this));

		this.btnExit = GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_EXIT);
		this.txtTitle = GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_TITLE);
		this.txtLostConnect = GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_LOST_CONNECTION);
		this.btnRetry = GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_RETRY);
		this.lostConnection_BG = GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_LOST_CONNECTION_BG);
		this.loadingIcon = GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_LOADING_ICON);

		this.txtTitle.style.fontFamily = GameConfig.fontList.MainFont;
		this.txtTitle.position.x = APP.GetWidth()/2;
		this.loadingIcon.position.set(APP.GetWidth() / 2, APP.GetHeight() / 2+122);
		this.txtLostConnect.style.fontFamily = GameConfig.fontList.MainFont;
		this.txtLostConnect.visible = false;
		this.btnRetry.visible = false;
		this.lostConnection_BG.visible = false;
		this.btnExit.visible = false;
		this.loadingTime = 0;
		this.loadingState = this.STATE_LOAD_IMAGE;

		this.btnRetry.SetTouchable(true);
		this.btnExit.SetTouchable(true);
		this.decoration.removeChildren(0, this.decoration.children.length);
		this.decoration.addChild(GuiManager.GetGui(GUI_LOADING));

		AudioElementManager.count = 0;
		AudioManager.Load(AudioManager.IsSupportAudioAPI() ? DataDefine.SOUNDS_INFO : DataDefine.SINGLE_SOUNDS_INFO);
		this._LoadVideo();

		// this.mBlackBg.visible = true;

		//---------------
		this.Resize();

		Utils.RemoveLoadingWheel();
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Unload() {
		APP.RemoveChild(this);

		this.foreground.removeChild(Utils.advertisement);
		// this.destroy({ children: true, texture: true, baseTexture: true });

		document.removeEventListener('LoadingError', this.loadingError);
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Back() {
		if (this.btnRetry.visible) {
			Utils.SendTrackingAndExit();
		}
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime) {
		if (!this.btnRetry.visible) {
			gLoadingTimeSpent += deltaTime;
		}

		if (this.loadingTime < this.loadingTimeOut) {
			this.loadingTime += deltaTime;
			if (this.loadingTime >= this.loadingTimeOut) {
				this.LoadErrorHandler();
				return;
			}
		}
		else {
			return;
		}

		switch (this.loadingState) {
			case this.STATE_LOAD_IMAGE:
				{
					break;
				}
			case this.STATE_LOAD_SPRITE:
				{
					break;
				}
			case this.STATE_LOAD_GUI:
				{
					break;
				}
			case this.STATE_LOAD_SOUND:
				{
					if (AudioManager.IsLoaded(deltaTime)) {
						if (window.iv_location_type === '1') {
							Utils.DispatchEvent("touchstart");
						}
						this.loadingState = this.STATE_LOAD_VIDEO;
					}
					break;
				}

			case this.STATE_LOAD_VIDEO:
				if (this._IsVideoLoaded()) {
					this.loadingState = this.STATE_LOAD_FINISHED;
				}
				break;

			case this.STATE_LOAD_FINISHED:
				{
					TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_ENDGAMENTS_LOADING_COMPLETE);
					StateManager.SwitchState(StateIngame);
					this.loadingState = this.STATE_LOAD_NONE;

					setInterval(this.CheckPlayVideo, 1000);
					break;
				}
		}
		this.UpdateloadingProgressFill(deltaTime);

		GuiManager.GetGui(GUI_LOADING).Update(deltaTime);
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	CheckPlayVideo() {
		if (!StateIngame.isRunning) {
			return;
		}
		if (FrenzyMgr.IsFrenzy()) {
			GameDefine.mVideoFrenzy.play();
		}
		else {
			if (!TutorialMgr.IsPauseAnimation()) {
				GameDefine.mVideoBg.play();
			}
		}
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadProgressHandler(loader, resource) {
		Utils.Log("StateLoading loading: " + resource.name);
		Utils.Log("StateLoading progress: " + loader.progress + "%");
		switch (resource.name) {
			case "imgBg":
				{
					this.loadingBg = new PIXI.Sprite(PIXI.loader.resources.imgBg.texture);
					this.loadingBg.anchor.set(0.5, 0.5);
					this.loadingBg.position.set(APP.GetWidth() / 2, APP.GetHeight() / 2);

					if (!this.loadingBg.parent) {
						this.background.addChild(this.loadingBg);
					}
					// this.mBlackBg.visible = false;

					// if (GameDefine.IsWideScreen()) {
					// 	let blackBG = new PIXI.Graphics();
					// 	blackBG.beginFill(0x000000);
					// 	blackBG.drawRect(0, 0, APP.GetWidth(), 125);
					// 	blackBG.endFill();

					// 	this.background.addChild(blackBG);
					// }

					break;
				}
		}
		this.loadCount++
		console.log(this.loadCount);
		Resource.RevokeObjectURL(resource.url);
	}
	
	UpdateloadingProgressFill(deltaTime){
		this.loadMask = new PIXI.Graphics();
		this.loadMask.lineStyle(17.5, 0xffffff, 1);
		const start = 0-(Math.PI/2),
		full = Math.PI*2,
		r = 45;
	
		if(this.loadCount > this.loadProgressCount){
		  this.loadProgressCount += (deltaTime*2*(this.loadCount - this.loadProgressCount));
		};
	
		let percentFill = this.loadProgressCount/5;
	
		this.loadMask.beginFill(0x7180B9, 0);
		this.loadMask.endFill();
		this.loadMask.position.set(APP.GetWidth()/2 ,APP.GetHeight()/2+121);
	
		this.loadMask.arc(0, 0, r, 0, full*percentFill, false);
	
		this.loadMask.rotation = -1.5;
		
		if(this.errorLoading){
		  if(this.decoration.children.length >= 2){
			this.decoration.removeChildren(1,this.decoration.children.length);
		  }
		}else{
		  this.decoration.addChild(this.loadMask);
		}
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadErrorHandler(error) {
		Utils.Log("LoadErrorHandler: " + error);

		this.txtTitle.visible = false;
		this.txtLostConnect.visible = true;
		this.btnRetry.visible = true;
		this.lostConnection_BG.visible = true;
		this.btnExit.visible = true;

		GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_LOADING_ICON).visible = false;
		this.loadCount = 0;
		//GuiManager.GetGui(GUI_LOADING).GetObject(GUI_OBJECT_LOADING_LOADING_ICON_002).visible = false;
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadCompleteHandler() {
		this.LoadSprite();
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadSprite() {
		Resource.GetAssetData(Utils.OMSGetGuiData(PACK_SPRITES))
			.then(response => {
				const resources = PIXI.loader.resources;
				GLPack.Load(response);

				let texture = [
					resources.imgBg.texture,
					resources.imgGame.texture,
					resources.MC.texture,
					resources.MC2.texture,
					resources.imgGameover.texture
				];
				for (let i = GUI_SPRITE_BG; i <= GUI_SPRITE_GAMEOVER; i++) {
					let data = GLSpriteReader.Load(GLPack.GetData(i - GUI_SPRITE_BG));
					GLSpriteManager.Add(i, texture[i - GUI_SPRITE_BG], data);
				}

				GLPack.Close();
				this.LoadGui();

			})
			.catch(error => this.LoadingError());

		this.loadingState = this.STATE_LOAD_SPRITE;
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadGui() {
		Resource.GetAssetData(Utils.OMSGetGuiData(PACK_GAMES))
			.then(response => {
				const resources = PIXI.loader.resources;

				GLPack.Load(response);

				for (let i = GUI_OBJECTS; i <= GUI_GAMEOVER; i++) {
					let gui = new Gui();
					gui.Load(GLPack.GetData(i - GUI_OBJECTS));
					GuiManager.Add(i, gui);
				}

				GLPack.Close();
				this.loadingState = this.STATE_LOAD_SOUND;

			})
			.catch(error => this.LoadingError());

		this.loadingState = this.STATE_LOAD_GUI;
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadingError() {
		this.LoadErrorHandler();
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	TouchHandler(event) {
		switch (event.target) {
			case this.btnRetry:
				{
					if (Input.IsTouchUp(event)) {
						this.errorLoading  			= false;
						this.txtTitle.visible = true;
						this.txtLostConnect.visible = false;
						this.btnRetry.visible = false;
						this.lostConnection_BG.visible = false;
						this.btnExit.visible = false;

						//this.background.removeChild(this.loadingBg);
						this.Load();
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
		}
	}

	Resize() {
		// if (
			// this.mBlackBg != undefined
			// && this.mBlackBg.visible
		// ) {
			// this.mBlackBg.clear();
			// this.mBlackBg.beginFill(0xffffff, 1);
			// this.mBlackBg.drawRect(0, 0, APP.GetWidth(), APP.GetHeight());
			// this.mBlackBg.endFill();
		// }
	}

	//PUBLIC FUNCTION

	//PRIVATE FUNCTION
	_LoadVideo() {
		
		Resource.GetAssetUrl('data/video/video1.mp4',"url")
			.then(
				(response) => {
					if (GameDefine.mVideoBg == undefined) {
						GameDefine.mVideoBg = document.createElement('video');
						GameDefine.mVideoBg.setAttribute('id', 'video_bg');
						document.body.appendChild(GameDefine.mVideoBg);
					}

					GameDefine.mVideoBg.src = response;
					GameDefine.mVideoBg.load();

					//----------------------------
					GameDefine.mVideoBg.setAttribute('webkit-playsinline', '');
					GameDefine.mVideoBg.setAttribute('playsinline', '');
					GameDefine.mVideoBg.setAttribute('muted', true);
					GameDefine.mVideoBg.setAttribute('autoplay', '');
					GameDefine.mVideoBg.setAttribute('loop', '');
					GameDefine.mVideoBg.muted = true;

					GameDefine.mVideoBg.type = "video/mp4";
					GameDefine.mVideoBg.playbackRate = GameDefine.VIDEO_SPEED;

					//-----------------------------
					GameDefine.mVideoBg.mIsLoadedData = false;
					GameDefine.mVideoBg.mIsCanPlayThrough = false;

					GameDefine.mVideoBg.onloadeddata = () => {
						GameDefine.mVideoBg.mIsLoadedData = true;
					};

					GameDefine.mVideoBg.oncanplaythrough = () => {
						GameDefine.mVideoBg.mIsCanPlayThrough = true;
					};

					GameDefine.mVideoBg.hide = () => {
						GameDefine.mVideoBg.style.visibility = "hidden";
					};
					GameDefine.mVideoBg.show = () => {
						GameDefine.mVideoBg.style.visibility = "";
					};

					GameDefine.mVideoBg.hide();
				}
			)
			.catch(
				(error) => {
					console.log(error);
					this.LoadingError();
				}
			);

			Resource.GetAssetUrl('data/video/video2.mp4',"url")
			.then(
				(response) => {
					if (GameDefine.mVideoFrenzy == undefined) {
						GameDefine.mVideoFrenzy = document.createElement('video');
						GameDefine.mVideoFrenzy.setAttribute('id', 'video_frenzy');
						document.body.appendChild(GameDefine.mVideoFrenzy);
					}

					GameDefine.mVideoFrenzy.src = response;
					GameDefine.mVideoFrenzy.load();

					//----------------------------
					GameDefine.mVideoFrenzy.setAttribute('webkit-playsinline', '');
					GameDefine.mVideoFrenzy.setAttribute('playsinline', '');
					GameDefine.mVideoFrenzy.setAttribute('muted', true);
					GameDefine.mVideoFrenzy.setAttribute('autoplay', '');
					GameDefine.mVideoFrenzy.setAttribute('loop', '');
					GameDefine.mVideoFrenzy.muted = true;

					GameDefine.mVideoFrenzy.type = "video/mp4";
					GameDefine.mVideoFrenzy.playbackRate = GameDefine.VIDEO_SPEED_FRENZY;

					//-----------------------------
					GameDefine.mVideoFrenzy.mIsLoadedData = false;
					GameDefine.mVideoFrenzy.mIsCanPlayThrough = false;

					GameDefine.mVideoFrenzy.onloadeddata = () => {
						GameDefine.mVideoFrenzy.mIsLoadedData = true;
					};

					GameDefine.mVideoFrenzy.oncanplaythrough = () => {
						GameDefine.mVideoFrenzy.mIsCanPlayThrough = true;
					};

					GameDefine.mVideoFrenzy.hide = () => {
						GameDefine.mVideoFrenzy.style.visibility = "hidden";
					};
					GameDefine.mVideoFrenzy.show = () => {
						GameDefine.mVideoFrenzy.style.visibility = "";
					};

					GameDefine.mVideoFrenzy.hide();
				}
			)
			.catch(
				(error) => {
					console.log(error);
					this.LoadingError();
				}
			);
	}

	_IsVideoLoaded() {
		return (
			GameDefine.mVideoBg != undefined
			&& GameDefine.mVideoBg.mIsLoadedData
			&& GameDefine.mVideoBg.mIsCanPlayThrough
			&& GameDefine.mVideoFrenzy != undefined
			&& GameDefine.mVideoFrenzy.mIsLoadedData
			&& GameDefine.mVideoFrenzy.mIsCanPlayThrough
		);
	}


}
module.exports = new StateLoading();
