const _Camera = require('../game/Camera');
const _Scene = require('../game/Scene');
const _Player = require('../game/Player');
const _LevelDefine = require('../game/LevelDefine');
const _LevelMgr = require('../game/LevelMgr');
const _ObjectMgr = require('../game/ObjectMgr');
const _Debug = require('../game/Debug');
const _FrenzyMgr = require('../game/FrenzyMgr');
const _ParticleMgr = require('../game/ParticleMgr');
const _TutorialMgr = require('../game/TutorialMgr');
const _ObjectDefine = require('../game/ObjectDefine');
const GLAnimation = require('../core/modules/aurora/GLAnimation');

class StateIngame extends PIXI.Container {
	constructor() {
		super();
		this.interactive = true;
		this.hitArea = new PIXI.Rectangle(0, 0, 0, 0);

		//-----------------
		let n = 0;

		this.STATE = {};

		this.STATE.TUTORIAL = n++;
		this.STATE.PLAYING = n++;
		this.STATE.TIME_UP = n++;
		this.STATE.END = n++;

		//OBJECT
		this.btnExit;
		this.mTextScore;

		//--------------------------------
		this.isFirstLaunch = true;
		this.isGotReward = false;

		this.mState;
		this.mPercent;

		this.mTimer;
		this.mAlertTime;
		this.mScore;

		this.mCountDt;
		this.isRunning = false;

		this.mShadow;
		this.mShadowPosY = 0;
	}

	Load() {
		APP.AddChild(this);
		APP.Align(this);

		if (this.isFirstLaunch) {
			this.mGui = GuiManager.GetGui(GUI_INGAME_UI);

			this.btnExit = this.mGui.GetObject(GUI_OBJECT_INGAME_UI_EXIT);
			this.btnExit.SetTouchable(true);

			this.mTextScore = this.mGui.GetObject(GUI_OBJECT_INGAME_UI_SCORE);

			global.ObjectDefine = new _ObjectDefine();

			global.Scene = new _Scene();
			global.UIContainer = new PIXI.Container();

			global.Camera = new _Camera();
			global.Player = new _Player();

			global.LevelDefine = new _LevelDefine();

			global.LevelMgr = new _LevelMgr();
			global.ObjectMgr = new _ObjectMgr();

			global.Debug = new _Debug();

			global.FrenzyMgr = new _FrenzyMgr();
			global.ParticleMgr = new _ParticleMgr();

			global.TutorialMgr = new _TutorialMgr();

			if (GameDefine.IS_WIDTHER_DEVICE) {
				let offsetY = 0;
				this.mGui.GetObject(GUI_OBJECT_INGAME_UI_LOGO).y += 0;
				// this.mGui.GetObject(GUI_OBJECT_INGAME_UI_TIME).y += offsetY;
				// this.mGui.GetObject(GUI_OBJECT_INGAME_UI_TIMER_ICON).y += offsetY;
				// this.mGui.GetObject(GUI_OBJECT_INGAME_UI_SCORE).y += offsetY;
				// this.mGui.GetObject(GUI_OBJECT_INGAME_UI_SCORE_ICON).y += offsetY;

				let offsetX = 40;
				this.mGui.GetObject(GUI_OBJECT_INGAME_UI_LOGO).position.x = APP.GetWidth()/2;
				// this.mGui.GetObject(GUI_OBJECT_INGAME_UI_TIME).x += offsetX;
				// this.mGui.GetObject(GUI_OBJECT_INGAME_UI_TIMER_ICON).x += offsetX;
			}

			if(!!window.isOutfit7)
			{

				this.mGui.GetObject(GUI_OBJECT_INGAME_UI_ADS_TEXT).position.x -= 60;
				// this.mGui.GetObject(GUI_OBJECT_INGAME_UI_FRENZY_BAR).y += offset;
				// this.mGui.GetObject(GUI_OBJECT_INGAME_UI_FRENZY_GAUGE).y += offset;
				// this.mGui.GetObject(GUI_OBJECT_INGAME_UI_CONNECTION_BAR).y += offset;
				// this.mGui.GetObject(GUI_OBJECT_INGAME_UI_CONNECTION_GAUGE_1).y += offset;
				// this.mGui.GetObject(GUI_OBJECT_INGAME_UI_CONNECTION_GAUGE_2).y += offset;
				// this.mGui.GetObject(GUI_OBJECT_INGAME_UI_CONNECTION_GAUGE_3).y += offset;
				// this.mGui.GetObject(GUI_OBJECT_INGAME_UI_CONNECTION_GAUGE_4).y += offset;
			}

			this.mShadow = new GLAnimation(GUI_SPRITE_MC2);
			this.mShadow.SetAnim(SPRITE_MC2_ANIM_SHADOW);
			this.addChild(this.mShadow);	
		}

		this.mCountDt = 0;
		this.ResetScore();

		this.mTimer = GameDefine.GAME_TIMEOUT;
		this.mAlertTime = GameDefine.GAME_TIMER_WARNING;

		Scene.Init();
		Camera.Init();

		Player.SetInfor(ObjectDefine.CHARACTER_INFOR.ARR_INFOR[ObjectDefine.CHARACTER_INFOR.currentIndex]);
		Player.Init();
		this.InitShadow();

		ObjectMgr.Init();
		FrenzyMgr.Init();
		ParticleMgr.Init();

		TutorialMgr.Init();

		GameDefine.mVideoBg.show();
		GameDefine.mVideoBg.play();

		if (this.isFirstLaunch) {
			this.addChild(Scene);
			this.addChild(UIContainer);
			this.addChild(Debug);
			this.addChild(this.mGui);
			this.addChild(FrenzyMgr);
			this.addChild(TutorialMgr);
		}

		if (this.isFirstLaunch) {
			if (this.IsNewUser()) {
				this._SetState(this.STATE.TUTORIAL);
			}
			else {
				this._SetState(this.STATE.PLAYING);
			}
		}
		else {
			this._SetState(this.STATE.PLAYING);
		}

		//--
		this.Resize();
		SoundMgr.Play(M_LIC_UPM_BGM, true);
		this.isRunning = true;

		if (window.isOutfit7)
			this.btnExit.visible = false;
	}

	_SetState(value) {
		this.mState = value;
		switch (this.mState) {
			case this.STATE.TUTORIAL:
				this.btnExit.visible = false;

				TutorialMgr.Active();

				Scene.Active();
				Camera.Active();

				Player.Active();
				LevelMgr.AddModuleTutorial();
				ObjectMgr.Active();

				FrenzyMgr.Active();
				ParticleMgr.Active();
				break;

			case this.STATE.PLAYING:
				this._StartGame();

				Scene.Active();
				Camera.Active();
				Player.Active();

				LevelMgr.RemoveModuleTutorial();
				ObjectMgr.Active();

				FrenzyMgr.Active();
				ParticleMgr.Active();
				ParticleMgr.SetTextGo();
				break;

			case this.STATE.TIME_UP:
				this.mPercent = 0;
				ParticleMgr.SetTextTimeUp();
				SoundMgr.Play(SFX_TIMES_UP);
				break;

			case this.STATE.END:
				GameDefine.mVideoBg.pause();
				this._EndGame();
				break;
		}
	}

	Update(dt) {
		//TEST FPS ############################################

		// let testFPS = 10;
		// let testDt = 1/testFPS;
		// this.mCountDt += dt;
		// if(this.mCountDt >= testDt)
		// {
		// 	this.mCountDt -= testDt;
		// 	dt = testDt
		// }
		// else
		// {
		// 	return null;
		// }

		//#################################

		gIngameTimeSpent += dt;

		let length = Math.ceil(dt / (1 / 20));
		// console.log(length);
		let fixDt = dt / length;
		for (let i = 0; i < length; i++) {
			this._FixUpdate(fixDt);
		}
	}

	_FixUpdate(dt) {
		//debug graphic clear
		Debug.Clear();

		switch (this.mState) {
			case this.STATE.END:
				break;

			case this.STATE.TUTORIAL:
				TutorialMgr.Update(dt);

				this._UpdateTime(0);
				GuiManager.Update(GUI_INGAME_UI, dt);

				if (TutorialMgr.IsUpdateObject()) {
					Player.Update(dt);
				}

				ObjectMgr.Update(dt);
				Camera.Update(dt);
				Scene.Update(dt);

				FrenzyMgr.Update(dt);
				ParticleMgr.Update(dt);

				this.UpdateShadow(dt);

				if (TutorialMgr.IsFinish()) {
					this._SetState(this.STATE.PLAYING);
				}
				break;

			case this.STATE.PLAYING:
				this._UpdateTime(dt);
				GuiManager.Update(GUI_INGAME_UI, dt);

				Player.Update(dt);
				ObjectMgr.Update(dt);
				Camera.Update(dt);
				Scene.Update(dt);

				FrenzyMgr.Update(dt);
				ParticleMgr.Update(dt);

				this.UpdateShadow(dt);

				if (this.mTimer <= 0) {
					this._SetState(this.STATE.TIME_UP);
				}
				break;

			case this.STATE.TIME_UP:
				this.mPercent = GameDefine.MoveToTarget(this.mPercent, 1, 1 / 1.5, dt);

				// this._UpdateTime(dt);
				GuiManager.Update(GUI_INGAME_UI, dt);

				Player.Update(dt);
				ObjectMgr.Update(dt);
				Camera.Update(dt);
				Scene.Update(dt);

				FrenzyMgr.Update(dt);
				ParticleMgr.Update(dt);

				this.UpdateShadow(dt);
				

				if (this.mPercent >= 1) {
					this._SetState(this.STATE.END);
				}
				break;

			case this.STATE.END:
				break;
		}

		//debug graphic draw
		Debug.Update(dt);
	};

	TouchHandler(event) {
		switch (event.target) {
			case this.btnExit:
				if (Input.IsTouchUp(event)) {
					this.Back();
				}
				break;

			default:
				switch (this.mState) {
					case this.STATE.TUTORIAL:
						TutorialMgr.TouchHandler(event);
						break;

					case this.STATE.PLAYING:
						Player.TouchHandler(event);
						break;

					case this.STATE.TIME_UP:
						Player.TouchHandler(event);
						break;

					case this.STATE.END:
						break;
				}
				break;
		}
	}

	KeyHandler(event) {
		Player.KeyHandler(event);
	}

	Unload() {
		APP.RemoveChild(this);
	}

	Pause() {
		switch (this.mState) {
			case this.STATE.TUTORIAL:
				Player.Pause();
				FrenzyMgr.Pause();
				TutorialMgr.Pause();
				break;

			case this.STATE.PLAYING:
			case this.STATE.TIME_UP:
				Player.Pause();
				FrenzyMgr.Pause();
				if (FrenzyMgr.IsFrenzy()) {
					GameDefine.mVideoFrenzy.pause();
				}
				else {
					GameDefine.mVideoBg.pause();
				}

				break;

			case this.STATE.END:
				Player.Pause();
				FrenzyMgr.Pause();
				if (FrenzyMgr.IsFrenzy()) {
					GameDefine.mVideoFrenzy.pause();
				}
				else {
					GameDefine.mVideoBg.pause();
				}
				break;
		}
		SoundMgr.Pause(M_LIC_UPM_BGM);
		this.isRunning = false;
	}

	Resume() {
		switch (this.mState) {
			case this.STATE.TUTORIAL:
				Player.Resume();
				FrenzyMgr.Resume();
				TutorialMgr.Resume();
				break;

			case this.STATE.PLAYING:
			case this.STATE.TIME_UP:
				Player.Resume();
				FrenzyMgr.Resume();
				if (FrenzyMgr.IsFrenzy()) {
					GameDefine.mVideoFrenzy.play();
				}
				else {
					GameDefine.mVideoBg.play();
				}
				break;

			case this.STATE.END:
				break;
		}
		SoundMgr.Play(M_LIC_UPM_BGM, true);
		this.isRunning = true;
	}

	Back() {
		if (this.isFirstLaunch) {
			if (this.btnExit.visible) {
				this.Pause();
				const StateExitPopup = require('./StateExitPopup');
				StateManager.PushState(StateExitPopup);
			}
		}
		else {
			Utils.SendTrackingAndExit();
		}
	}

	Resize() {
		this.hitArea.x = 0;
		this.hitArea.y = 0;
		this.hitArea.width = APP.GetWidth();
		this.hitArea.height = APP.GetHeight();

		GameDefine.UpdateRotateVideo();
		GameDefine.UpdateParams();

		// this.mGui.UpdateAnchors();
		FrenzyMgr.Resize();
	}

	//PUBLIC FUNCTION --------------------------------------------
	GetScore() {
		return this.mScore;
	}

	ResetScore() {
		this.mScore = 0;
		this._UpdateTextScore(this.mScore);
	}

	AddScore(value) {
		this.mScore = Math.max(this.mScore + value, 0);
		this._UpdateTextScore(this.mScore);

		if (value > 0) {
			FrenzyMgr.AddFrenzyScore(value);
		}
	}

	GotReward() {
		this.isGotReward = true;
	};

	IsGotReward() {
		return this.isGotReward;
	};

	IsNewUser() {
		if (window.DEBUG || window.REVIEW) {
			return !GameDefine.IS_SKIP_TUTORIAL;
		}
		return GameConfig.isNewUser;
	};

	GetTime() {
		return this.mTimer;
	}

	InitShadow()
	{
		let shadowPos = Player.GetPosition();
		let drawPos = Camera.GetDrawPosition(shadowPos);
		
		this.mShadow.position.set(drawPos.x, drawPos.y);
		this.mShadowPosY = drawPos.y + 80;
	}

	UpdateShadow(dt)
	{
		let drawPos = Camera.GetDrawPosition(Player.GetPosition());
		this.mShadow.position.set(drawPos.x + 8, this.mShadowPosY);
	}

	//PRIVATE FUNCTION ------------------------------------------
	_UpdateTime(dt) {
		this.mTimer = Math.max(this.mTimer - dt, 0);

		if (
			this.mTimer <= this.mAlertTime
			&& this.mTimer > 0
		) {
			this.mAlertTime--;
			SoundMgr.Play(SFX_TIMER);
		}

		let timeString = "" + Math.ceil(this.mTimer);
		this.mGui.GetObject(GUI_OBJECT_INGAME_UI_TIME).text = timeString;
	}

	_EndGame() {
		if (!this.isGotReward) {
			try {
				saveReward();
				if (this.isFirstLaunch) {
					gIngameTimeSpent = gTotalTimeSpent;
				}
			}
			catch (e) {
				Utils.Log("ERROR!!!: save the reward fail: " + e.message);
			}
		}

		this.isFirstLaunch = false;
		StateManager.SwitchState(StateGameOver);
		TrackingManager.SetScoreParam(this.GetScore());

		// console.log(Player.GetCharacterName());
		TrackingManager.SendEventTracking(
			TrackingManager.TRACKING_ACTION_COMPLETE_ENGAGEMENTS,
			undefined,
			Player.GetCharacterName()
		);
	};

	_StartGame() {
		if (this.isFirstLaunch) {
			TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_CONFIRMED_ENGAGEMENTS);
		}

		if (this.IsNewUser()) {
			UserProfile.Save({ finishTutorial: true })
				.then(response => {

				})
				.catch(error => {

				})
		}
		
		if (!window.isOutfit7)
			this.btnExit.visible = true;
	};

	_UpdateTextScore(score) {
		this.mTextScore.text = '' + score;
	}




}
module.exports = new StateIngame();
