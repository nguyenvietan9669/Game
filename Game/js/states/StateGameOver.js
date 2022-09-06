const TweenMgr = require('../core/modules/tween/TweenMgr');
const TweenDefine = require('../core/modules/tween/TweenDefine');

class StateGameOver extends PIXI.Container {
	constructor() {
		super();

		this.GAMEOVER_STATE_REWARD_NONE = -1;
		this.GAMEOVER_STATE_REWARD_WAITING = 0;
		this.GAMEOVER_STATE_REWARD_DELIVERED = 1;
		this.GAMEOVER_STATE_REWARD_FAILED = 2;

		this.rewardTimeout = 4;
		this.btnRetry = null;
		this.btnClose = null;
		this.btnCheckNow = null;
		this.tfReward = null;
		this.info = null;
		this.rewardState = 0;
		this.isSendingTracking = false;
		this.redirectLink = '';
		this.tweenMgr = new TweenMgr();
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load() {
		APP.AddChild(this);
		APP.Align(this);

		if (!Utils.IsOnDevie()) {
			APP.EnableDebugLayer(true);
		}

		this.rewardTimeout = 4;
		this.isSendingTracking = false;
		this.btnRetry = GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_RETRY);
		this.btnClose = GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_CLOSE);
		this.btnCheckNow = GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_CHECKNOW);
		this.btnCheckNow.position.x = APP.GetWidth()/2;
		this.adv = GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_ADS_TEXT);
		//this.adv.position.x = APP.GetWidth() - this.adv.width/2 +50;

		//this.tfReward			= GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_TF_REWARD);

		this.btnRetry.SetTouchable(true);
		this.btnClose.SetTouchable(true);
		this.btnCheckNow.SetTouchable(true);

		let scale = 0.8, scaleBig = 1;
		this.tweenMgr.RemoveAll()
		this.tweenMgr.Create(this.btnCheckNow, TweenDefine.LINEAR_EASE, { scale: scale }, { scale: scaleBig }, 0.5, 0);
		this.tweenMgr.Create(this.btnCheckNow, TweenDefine.LINEAR_EASE, { scale: scaleBig }, { scale: scale }, 0.5, 0);
		this.tweenMgr.SetLoop(this.btnCheckNow, -1);

		// var score = GLText.GetText(TEXT_CONTENTS_YOUR_SCORE).replace("%d", StateIngame.GetScore());
		var score = StateIngame.GetScore() + '';
		GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_TF_SCORE).text = score;

		this.info = GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_INFO);
		//this.info.position.x = APP.GetWidth() - this.info.width/2 - 20;
		this.info.SetTouchable(true);

		if(!!window.isOutfit7){
			this.SetRewardState(this.GAMEOVER_STATE_REWARD_NONE);
		}else {
			if (!StateIngame.IsGotReward()) {
				this.SetRewardState(this.GAMEOVER_STATE_REWARD_WAITING);
			}
			else {
				this.SetRewardState(this.GAMEOVER_STATE_REWARD_NONE);
			}
		}

		if (window.notifyGameComplete) {
			window.notifyGameComplete();
		}

		this.addChild(GuiManager.GetGui(GUI_GAMEOVER));
		AudioManager.StopAll();
		SoundMgr.Play(M_LIC_UPM_STINGER);

		// if (GameDefine.IsWindowVersion()) {
		// 	GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_GIRL_WIN).visible = true;
		// 	GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_TEXT).SetFrame(SPRITE_PRELOAD_FRAME_TEXT);

		// 	if (GameDefine.IsIpadScreen()) {
		// 		GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_GIRL_WIN).position.x = GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_GIRL_WIN).width / 2;
		// 	}
		// }
		// else {
		// 	GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_GIRL_INTEL).visible = true;
		// 	GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_TEXT).SetFrame(SPRITE_PRELOAD_FRAME_TEXT2);
		// }

		// if (GameDefine.IsWideScreen() && !this.IsAligned) {
			// GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_CHECKNOW).position.x -= 70;
			// GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_TEXT).position.x -= 70;
			// GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_TXT_TITLE).position.x -= 70;	

			// GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_OMEN).position.y += 40;
			// GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_ICON).position.y += 40;
			// GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_CLOSE).position.y += 40;
			// GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_RETRY).position.y += 40;

			// GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_PRODUCT_LOGO).position.y += 34;

			// let blackBG = new PIXI.Graphics();
			// blackBG.beginFill(0x000000);
			// blackBG.drawRect(0, 0, APP.GetWidth() * 2, 125);
			// blackBG.endFill();

			// GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_BG).children[0].addChild(blackBG);

			// GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_ICON).scale.set(0.8);
		// }

		if(!!window.isOutfit7 && !this.IsAligned) {
			GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_INFO).position.x -= 70;
			GuiManager.GetGui(GUI_GAMEOVER).GetObject(GUI_OBJECT_GAMEOVER_ADS_TEXT).position.x -= 70;
		}

		if(!!window.isOutfit7)
			this.btnClose.visible = false;

		this.IsAligned = true;
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Unload() {
		this.btnRetry.interactive = false;
		this.btnClose.interactive = false;
		this.btnCheckNow.interactive = false;
		this.removeChildren(0, this.children.length);
		APP.RemoveChild(this);
		if (!Utils.IsOnDevie()) {
			APP.DisableDebugLayer()
		}
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Resume() {
		if (this.isSendingTracking) {
			this.isSendingTracking = false;
			this.btnCheckNow.interactive = true;
		}
		this.info.interactive = true;
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Pause() {
		AudioManager.StopAll();
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime) {
		if (!Utils.IsOnDevie()) {
			let debugLayer = APP.debugLayer;

			debugLayer.clear();
			debugLayer.lineStyle(2, 0xff0000, 1);

			if (window._show_touchzone) {
				// Close button
				let rect = this.btnClose.GetTransformRect();
				debugLayer.drawRect(rect.x, rect.y, rect.width, rect.height);

				// Retry button
				rect = this.btnRetry.GetTransformRect();
				debugLayer.drawRect(rect.x, rect.y, rect.width, rect.height);

				// Cta button
				rect = this.btnCheckNow.GetTransformRect();
				debugLayer.drawRect(rect.x, rect.y, rect.width, rect.height);

				rect = this.info.GetTransformRect();
				debugLayer.drawRect(rect.x, rect.y, rect.width, rect.height);
			}
		}
		this.tweenMgr.Update(deltaTime);
		this.UpdateReward(deltaTime);
	}

	OMSGetProductLink() {
		// if (GameDefine.IsWindowVersion()) {
		// 	return Resource.GetParam("redirect_url_win");
		// }
		// else {
		// 	return Resource.GetParam("redirect_url");
		// }

		return Resource.GetParam("redirect_url");
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	OpenProductLink() {
		try {
			if (window.DEBUG || window.REVIEW) {
				window.open(this.OMSGetProductLink());
			}
			else {
				if (!this.isSendingTracking) {
					this.redirectLink = this.OMSGetProductLink();
					if (this.redirectLink) {
						this.redirectLink = this.redirectLink.replace("[timestamp]", Date.now());
					}
					this.isSendingTracking = true;

					if (!!window.isOutfit7){
						TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_CLICK_THROUGHTS_START, () => {
							TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_CLICK_THROUGHTS, null, "N/A", this.redirectLink);
						});
					} else {
						TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_CLICK_THROUGHTS_START);
						TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_CLICK_THROUGHTS, null, "N/A", this.redirectLink);
					}
				}
			}
		}
		catch (e) {
			Utils.Log("Error: " + e.message);
		}
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetRewardState(state) {
		switch (state) {
			case this.GAMEOVER_STATE_REWARD_NONE:
				{
					break;
				}
			case this.GAMEOVER_STATE_REWARD_WAITING:
				{
					break;
				}
			case this.GAMEOVER_STATE_REWARD_DELIVERED:
				{
					StateIngame.GotReward();
					break;
				}
			case this.GAMEOVER_STATE_REWARD_FAILED:
				{
					const StateLostConnectPopup = require('./StateLostConnectPopup');
					StateManager.PushState(StateLostConnectPopup);
					break;
				}
		}

		this.rewardState = state;
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	UpdateReward(deltaTime) {
		if (this.rewardState == this.GAMEOVER_STATE_REWARD_WAITING) {
			if (this.rewardTimeout > 0) {
				// Reset delta time because the saveReward function stopped main thread
				if (deltaTime > 1.0) {
					deltaTime = 0;
				}

				this.rewardTimeout -= deltaTime;
				if (this.rewardTimeout < 0) {
					this.SetRewardState(this.GAMEOVER_STATE_REWARD_FAILED);
				}
				else if ((typeof reward_delivered) != 'undefined') {
					if (reward_delivered == 1) {
						this.SetRewardState(this.GAMEOVER_STATE_REWARD_DELIVERED);
					}
				}
			}
		}
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Exit() {
		if (window.call_client) {
			var url = this.OMSGetProductLink();
			if (url) {
				url = url.replace("[timestamp]", Date.now());
			}
			call_client(window.creative_id, "GLADS_CLICK_INTERSTITIAL", "click", 0, 0, "", 'link:' + url);
		}
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	TouchHandler(event) {
		switch (event.target) {
			case this.btnRetry:
				{
					if (Input.IsTouchUp(event)) {
						if (!this.isSendingTracking) {
							TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_REPLAY);
							FrenzyMgr.Reset();
							gIngameTimeSpent = 0;
							StateManager.SwitchState(StateIngame);
							this.btnRetry.interactive = false;
							SoundMgr.Play(SFX_START);
						}
					}
					break;
				}
			case this.btnClose:
				{
					if (Input.IsTouchUp(event)) {
						Utils.SendTrackingAndExit();
						this.btnClose.interactive = false;
					}
					break;
				}
			case this.btnCheckNow:
				{
					if (Input.IsTouchUp(event)) {
						this.OpenProductLink();
						this.btnCheckNow.interactive = false;
					}
					break;
				}
			case this.info:
				{
					if (Input.IsTouchUp(event)) {
						this.info.interactive = false;
						Utils.RedirectInfo("Endscreen");
					}
					break;
				}
		}
	}
}
module.exports = new StateGameOver();
