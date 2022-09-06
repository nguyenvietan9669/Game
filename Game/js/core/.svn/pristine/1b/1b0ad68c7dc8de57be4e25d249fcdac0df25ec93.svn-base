require('pixi.js');

global.gIsInterrupt			= false;
global.gTotalTimeSpent 		= 0;
global.gIngameTimeSpent		= 0;
global.gLoadingTimeSpent	= 0;
global.gIsShowBanner		= false;
global.gIsSizeChanged		= false;
global.gIsUseURLTimestamp	= true;
global.Resource				= require('./modules/federation/Resource');

if (USE_OVERRIDE)
{
	require('../Override.js');
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Resource.Init(() =>
{
	global.UserProfile		= require('./modules/federation/UserProfile');
	global.Leaderboard		= require('./modules/federation/Leaderboard');
	global.CreativeLog		= require('./modules/federation/CreativeLog');
	global.DeviceInfo		= require('../DeviceInfo');
	global.GameConfig		= require('../Config');
	global.APP				= require('./Application');
	global.Timer			= require('./Timer');
	global.Input			= require('./Input');
	global.StateManager		= require('./StateManager');
	global.TrackingManager	= require('./TrackingManager');
	global.Utils			= require('./Utils');
	global.AudioManager		= require('./modules/audio/AudioManager');
	global.GLText			= require('./modules/aurora/GLText');
	global.GuiManager		= require('./modules/aurora/GuiManager');
	global.DataDefine		= require('../game/DataDefine');
	global.GameDefine		= require('../game/GameDefine');
	global.StatePreLoad		= require('../states/StatePreLoad');
	global.StateLoading		= require('../states/StateLoading');
	global.StateIngame		= require('../states/StateIngame');
	global.StateGameOver	= require('../states/StateGameOver');

	if (GameConfig.isUseBanner)
	{
		global.BANNER 		= require('./Banner');
	}

	if (!window.isDisableIFrameLoader)
	{
		main();
	}

	Utils.DispatchEvent('document_ready');
})

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function GameLoop(deltaTime)
{
	deltaTime = deltaTime / (60 * APP.ticker.speed);
	if (!gIsInterrupt)
	{
		if (!gIsShowBanner)
		{
			if (gTotalTimeSpent > 0)
			{
				gTotalTimeSpent += deltaTime;
			}

			APP.Update(deltaTime);
			APP.Render();
		}
		else
		{
			BANNER.Update(deltaTime);
			BANNER.Render();
		}
	}
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function PageShow()
{
	StateManager.Resume();
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function PageHide()
{
	StateManager.Pause();
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function Pause()
{
	if (!gIsInterrupt)
	{
		gIsInterrupt = true;
		StateManager.Pause();
	}
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function Resume()
{
	if (gIsInterrupt)
	{
		gIsInterrupt = false;
		StateManager.Resume();
	}
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

window.onBackPressed = function()
{
	StateManager.Back();
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// namvt - add handler for controller
var GLADS_CONTROLLER_EVENT_BUTTON_B = 16;// value is 1 when pressed, 0 when released
window.onControllerEvent = function(button, value)
{
	// only support B button from controller for now
	if (button === GLADS_CONTROLLER_EVENT_BUTTON_B)
	{
		if (value === 0)
		{
			onBackPressed();
		}
	}
};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

window.onGamePause = function()
{
	Pause();
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

window.onGameResume = function()
{
	Resume();
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

window.onShake = function()
{
	StateManager.Shake();
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

window.onTilt = function()
{
	StateManager.Tilt();
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

window.onresize = function()
{
	if (!gIsSizeChanged)
	{
		APP.Resize();
		StateManager.Resize();
	}
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

window.main = function()
{
	Utils.AddLoadingWheel();

	Resource.LoadCSS(Utils.OMSGetRoot("css/style.css"));

	AudioManager.Init();
	if (!GameConfig.isUseBanner)
	{
		Utils.PauseHostGameMusic();
		StateManager.PushState(StatePreLoad);
	}
	else
	{
		try
		{
			if (window.REVIEW)
			{
				iView.setBanner(true);
			}
			global.StateBanner = require('../states/StateBanner');
			StateBanner.Load();
		}
		catch(e)
		{

		}
	}
	APP.Init(GameLoop);

	if (!GameConfig.isUseBanner)
	{
		var pixelUrl = GameConfig.Get3rdPartyImpression();
		if (pixelUrl && pixelUrl.startsWith("http") && !window.isOutfit7)
		{
			pixelUrl = pixelUrl.replace("{[timestamp]}","[timestamp]");
			pixelUrl = pixelUrl.replace("[timestamp]", Date.now());
			TrackingManager.SetPixelTracking(TrackingManager.TRACKING_ACTION_IMPRESSIONS, pixelUrl);
		}

		TrackingManager.SendEventTracking([TrackingManager.TRACKING_ACTION_AD_LOADED, TrackingManager.TRACKING_ACTION_IMPRESSIONS]);
	}
	else
	{
		TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_AD_LOADED);
	}

	if (TrackingManager.format == TrackingManager.TRCKING_FORMAT_BLS ||
		TrackingManager.format == TrackingManager.TRCKING_FORMAT_VHERO ||
		TrackingManager.format == TrackingManager.TRCKING_FORMAT_VSCORE ||
		TrackingManager.format == TrackingManager.TRCKING_FORMAT_VIDEO_FORM ||
		TrackingManager.format == TrackingManager.TRCKING_FORMAT_VINT ||
		TrackingManager.format == TrackingManager.TRCKING_FORMAT_FAKE_CALL ||
		TrackingManager.format == TrackingManager.TRCKING_FORMAT_FAKE_CALL_VIDEO ||
		TrackingManager.format == TrackingManager.TRCKING_FORMAT_MINT_MIG ||
		TrackingManager.format == TrackingManager.TRCKING_FORMAT_VSTORY ||
		TrackingManager.format == TrackingManager.TRCKING_FORMAT_HYBRID ||
		TrackingManager.format == TrackingManager.TRCKING_FORMAT_FORM_INTERACTIONS
		)
	{
		gTotalTimeSpent	= 0.01;
	}
}

window.getVPAIDAd = function()
{
	global.VPaid = require('./modules/programmatic/VPaid');
	return VPaid;
}
