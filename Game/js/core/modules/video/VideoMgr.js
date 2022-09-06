const GLSprite	= require('../aurora/GLSprite');

class VideoMgr
{
	constructor()
	{
		this.video				= null;
		this.videoW				= 0;
		this.videoH				= 1;

		this.videoDiv			= null;
		this.videoDivW			= 0;
		this.videoDivH			= 1;


		this.audioFilter		= null;

		this.isVideoLoaded		= false;
		this.isVideoPlaying		= false;
		this.isVideoEnded		= false;
		this.isCanPlayThrough	= false;

		this.isVideoError		= false;
		this.videoPauseTime		= 0;

		this.DetuneTimeout		= 0;
		this.kDetuneTimeout		= 2000;
		this.useDetuneFallback	= false;

		this.source				= null;
		this.audioFilter		= null;
		this.gainNode			= null;
		this.options			= {};

		//Timer
		this.timerSign = null;
		this.progress = null;
		this.timerText = null;
		this.timerInited = false;

		// Loading
		this.useInternalLoading = false;
		this.loaderStyle = null;

        this.isMoatInit         = false;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	InitTimer(options)
	{
		if (window.VPaid)
		{
			return;
		}

		try
		{
			this.timerSign = new GLSprite(options.sprite);

			this.timerSign.SetFrame(options.frame);
			this.timerSign.position.set(options.x, options.y);
			this.timerSign.visible = false;

			this.progress = new PIXI.Graphics();
			this.progressWidth = options.width;
			this.progressColor = options.color;
			this.progressRadius = options.radius;

			this.timerSign.addChild(this.progress);
			this.timerText = new PIXI.Text('', options.font);

			this.timerSign.addChild(this.timerText);
			options.parent.addChild(this.timerSign);

			this.timerInited = true;
		}
		catch(exception)
		{
			this.timerInited = false;
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Init(x, y, w, h, useInternalLoading)
	{
		this.useInternalLoading = (useInternalLoading !== undefined && typeof (useInternalLoading) === 'boolean') ? useInternalLoading : this.useInternalLoading;
		if (this.useInternalLoading)
		{
			if (this.loaderStyle == null)
			{
				this.loaderStyle = document.createElement('style');

				var loadingSize = 120;
				var loadingBorder = 16;
				if (GameConfig.isSmallVersion)
				{
					loadingSize = parseInt(loadingSize/2);
					loadingBorder = parseInt(loadingBorder/2);
				}
				var loadingMargin = parseInt(loadingSize / 2 + loadingBorder);

				this.loaderStyle.innerHTML = '.videoloader:before{content:"";position:absolute;left:50%;top:50%;margin-top:-' + loadingMargin + 'px; margin-left: -' + loadingMargin + 'px;border:' + loadingBorder + 'px solid #f3f3f3;border-radius:50%;border-top:' + loadingBorder + 'px solid #d580ff;width:' + loadingSize + 'px;height:' + loadingSize + 'px;-webkit-animation:spinning 2s linear infinite;animation:spinning 2s linear infinite}'
					+'@-webkit-keyframes spinning{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}'
					+'@keyframes spinning{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}';

				document.body.appendChild(this.loaderStyle);
			}
		}

		if (this.video == null)
		{
			if (window.VPaid)
			{
				this.video = VPaid.video;
			}
			else
			{
				this.video = document.createElement('video');
				this.video.style.zIndex = -1;
				this.video.style.visibility = 'hidden';
			}
		}

		if (!window.VPaid || this.IsGoogleVpaidTest())
		{
			if (this.videoDiv == null)
			{
				this.videoDiv = document.createElement('div');
				this.videoDiv.setAttribute("id", "videoDiv");
				this.videoDiv.appendChild(this.video);
			}

			this.videoDiv.style.transformOrigin = "top left";
			this.videoDiv.style.webkitTransformOrigin = "top left";
			if (APP.IsRotate())
			{
				let temp = w;
				w = h;
				h = temp;

				this.videoDiv.style.transform = "rotate(-90deg)";
				this.videoDiv.style.webkitTransform = "rotate(-90deg)";


				this.videoDiv.style.left		= parseInt(x) + "px";
				this.videoDiv.style.top			= parseInt(y + w) + "px";
			}
			else
			{
				this.videoDiv.style.transform = "rotate(0deg)";
				this.videoDiv.style.webkitTransform = "rotate(0deg)";

				this.videoDiv.style.left		= parseInt(x) + "px";
				this.videoDiv.style.top			= parseInt(y) + "px";
			}

			this.videoDiv.style.position	= "fixed";
			this.videoDivW					= parseInt(w);
			this.videoDivH					= parseInt(h);
			this.videoDiv.style.width		= this.videoDivW + "px";
			this.videoDiv.style.height 		= this.videoDivH + "px";
			this.videoDiv.style.backgroundColor = 'black';
			this.videoDiv.style.overflow 	= 'hidden';
			this.videoDiv.style.zIndex 		= -1;

			if (this.isVideoLoaded)
			{
				this.FullscreenVideo();
			}
			else
			{
				// incase re-init, we don't show loading wheel, just resize video
				this.ShowLoading();
			}

			// this.video.style.width					= "100%";
			// this.video.style.height					= "100%";
			this.video.style.position				= "absolute";
			this.video.style.top					= "50%";
			this.video.style.left					= "50%";
			this.video.style.transform				= "translateY(-50%) translateX(-50%)";
			this.video.style.webkitTransform 		= "translateY(-50%) translateX(-50%)";

			var resize = function(pw, ph)
			{
				var r = this.videoDiv.getBoundingClientRect();
				if(r.width <=0  || r.height <= 0 ||r.width != pw || r.height != ph)
				{
					this.videoDiv.style.width		= parseInt(pw) + "px";
					this.videoDiv.style.height 		= parseInt(ph) + "px";
					this.checkSizeTimer = setTimeout(resize.bind(this), 17, parseInt(pw) == 0 ? window.innerWidth : parseInt(pw), parseInt(ph) == 0 ? window.innerHeight : parseInt(ph));
				}
			};

			resize.call(this, w, h);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Destroy()
	{
		// * Bug Fixed ['9681439']: '[IOS][A8][1.1][All screens]: Host game crashes when tapping Close button
		// https://webaudio.github.io/web-audio-api/#widl-AudioContext-createMediaElementSource-MediaElementAudioSourceNode-HTMLMediaElement-mediaElement

		// init: source -> audioFilter -> gainNode
		// destroy: source <- audioFilter <- gainNode
		if (this.gainNode)
		{
			this.gainNode.disconnect();
			this.gainNode = null;
		}

		if (this.audioFilter)
		{
			this.audioFilter.disconnect();
			this.audioFilter = null;
		}

		if (this.source)
		{
			this.source.disconnect();
			this.source = null;
		}

		this.Pause();
	}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load(opt)
	{
		if(typeof opt.url === 'undefined') throw "Error: No video found";
		if (!this.isVideoLoaded)
		{
			this.video.style.visibility = 'hidden';
			this.video.setAttribute('preload', 'auto');
			this.video.setAttribute('type', 'video/mp4');
			this.video.setAttribute('webkit-playsinline', '');
			this.video.setAttribute('playsinline', 'playsinline');
			// this.video.setAttribute('autoplay', '');
			this.video.setAttribute('autobuffer', '');
			// this.video.setAttribute('crossOrigin', 'anonymous');

			if(!opt.xhrPreload && !opt.pixiPreload)
			{
				this.isVideoLoaded = false;
				this.isCanPlayThrough = false;
				this.isVideoError = false;
				this.video.setAttribute('src', opt.url);
			}

			this.video.addEventListener('canplaythrough', this.OnVideoCanPlayThrough.bind(this), false);
			this.video.addEventListener('ended', this.OnVideoFinished.bind(this), false);
			if (!window.VPaid || this.IsGoogleVpaidTest())
			{
				this.video.addEventListener('loadedmetadata', this.OnLoadedMetaData.bind(this), false);
			}
			this.video.addEventListener('timeupdate',this.OnTimeUpdate.bind(this), false);
			this.video.addEventListener('progress', this.OnProgress.bind(this), false);
			this.video.addEventListener("error", this.OnError.bind(this), false);

			this.Reset(opt);

			if(!!this.video.load) this.video.load();
		}
	}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Play()
	{
		var promise;

		if (!this.isVideoError && this.isCanPlayThrough && this.isVideoLoaded)
		{
			if (window.VPaid)
			{
				this.video.style.width = '100%';
				this.video.style.height = 'auto';
			}

			this.Show();
			promise = this.video.play();
			this.isVideoPlaying = true;

			if (!this.evtracks["video_started"] && this.evtracks.enabled)
			{
				this.evtracks["video_started"] = true;
				TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_TYPE_VIDEO_STARTED);
                Utils.SendMoatEvent("AdVideoStart");
			}

			if (this.timerInited)
			{
				this.timerSign.visible = true;
			}
		}

		return promise;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Pause()
	{
		if (!this.isVideoError && this.isCanPlayThrough && this.isVideoLoaded)
		{
			this.video.pause();
			// should update current time while video playing in OnTimeUpdate function
			//this.videoPauseTime = this.video.currentTime;
			this.isVideoPlaying = false;

			if (this.timerInited)
			{
				this.timerSign.visible = false;
			}
		}
	}

        Stop()
        {
            this.isVideoPlaying = false;
            this.isVideoEnded = true;
            this.Pause();
            this.video.currentTime = 0;
        }

        SeekToEndVideo()
        {
            this.isVideoPlaying = false;
            this.isVideoEnded = true;
            this.video.currentTime = Math.floor(this.video.duration);
        }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Replay(seconds)
	{
		if (!this.isVideoError && this.isCanPlayThrough)
		{
			this.Pause();
			this.video.currentTime = (seconds !== undefined) ? seconds : 0;
			this.isVideoEnded = false;

			return this.Play();
		}
	}

	Resume()
	{
		var resumeTasks = function(){
			if (this.video)
			{
				if (this.video.paused && ! this.video.ended)
				{
					if (!this.video.onseeked)
					{
						this.video.onseeked = this.video.play;
					}
					else
					{
						this.video.currentTime = this.videoPauseTime;
					}

					return true;
				}
				this.isVideoPlaying = true;
				return false;
			}
		}.bind(this);

		setTimeout(function doResumeTasks(){
			if(!this.isVideoError && this.isVideoLoaded && this.isCanPlayThrough){
				if (resumeTasks())
				{
					setTimeout(doResumeTasks.bind(this), 50);
				}
			}
		}.bind(this), 50);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Reset(opt)
	{
		if(this.isVideoPlaying)
		{
			this.Pause();
		}

		this.volume = this.volume || 1.0;

		this.isVideoPlaying = false;

		var options = opt || {};
		this.options = options;

		this.evtracks = this.evtracks || {};

		this.evtracks.enabled = (typeof options.hasTracking === 'undefined' ? false : options.hasTracking);

		this.extEvtHandler = null;
		if(options.externalEventHandler)
		{
			this.extEvtHandler = options.externalEventHandler;
		}

		this.video.removeAttribute('loop');
		if(options.loop) {
			this.video.setAttribute('loop', true);
			this.video.loop = true;
		}
		else {
			this.video.loop = false;
		}

		this.video.removeAttribute('muted');
		if(options.mute) {
			this.video.setAttribute('muted', true);
			this.video.muted = true;
			this.video.volume = 0.0;
			this.volume = 0.0;
		}
		else {
			this.video.muted = false;
			this.video.volume = 1.0;
			this.volume = 1.0;
		}

		if(options.xhrPreload){
			this.isVideoLoaded = false;
			this.isCanPlayThrough = false;
			this.isVideoError = false;

			//* Bug Fixed ['9670067']: '[ANMP][A8][1.1][Interstitial screen]: The background cannot be loaded
			let dest_src = options.url ;

			var xhr = new XMLHttpRequest();
			xhr.open('GET', dest_src, true);
			xhr.responseType = 'blob';
			xhr.targetVideo = this.video;
			xhr.target = this;
			xhr.onload = function(e) {
				if(this.status == 200){
					var vid = (window.URL ? URL : webkitURL).createObjectURL(this.response);
					this.targetVideo.src = vid;
				} else {
					this.target.OnError(e);
				}
			}

			xhr.onerror = function(e){
				this.target.OnError(e);
			}

			xhr.send();
		} else if (options.pixiPreload) {
			this.isVideoLoaded = false;
			this.isCanPlayThrough = false;
			this.isVideoError = false;

			let dest_src = options.url;

			if (PIXI.loader.resources['VideoMgr'])
			{
				this.OnPixiXhrFinished(PIXI.loader.resources['VideoMgr']);
			}
			else
			{
				if (PIXI.loader.loading)
				{
					// fixed: PIXI.loader exception 'Cannot add resources while the loader is running.'
					for (var key in PIXI.loader.resources) {
						if (PIXI.loader.resources.hasOwnProperty(key)) {
							PIXI.loader.add('VideoMgr', dest_src, { parentResource: PIXI.loader.resources[key], loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR, xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BLOB }, this.OnPixiXhrFinished.bind(this));
							break;
						}
					}
				}
				else
				{
					PIXI.loader.add('VideoMgr', dest_src, { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR, xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BLOB }, this.OnPixiXhrFinished.bind(this));
				}

				PIXI.loader.load();
			}
		}

		//if(options.useDetune)
		//if(options.useDetune && DeviceInfo.DEVICE_INFO.toUpperCase().indexOf('IOS') == -1) // * Bug Fixed ['9681439']: '[IOS][A8][1.1][All screens]: Host game crashes when tapping Close button
		if (false) // * Bug Fixed ['9698805']: '[ANMP][A8][2.3]: VJAY do not play Thunder song.
		{
			var deferedTasks = function(){
				if (AudioManager.IsSupportAudioAPI()){
					if(!this.source){
						let context 		= AudioManager.context;
						this.gainNode 		= context.createGain();
						this.source 		= context.createMediaElementSource(this.video);
						this.audioFilter	= context.createBiquadFilter();

						this.gainNode.gain.value = this.volume;

						this.source.connect(this.audioFilter);
						this.audioFilter.connect(this.gainNode);
						this.gainNode.connect(context.destination);
					} else {
						this.gainNode.gain.value = this.volume;
					}
					this.SetDetune(GameDefine.VIDEO_DETUNE_HIGH);
				}
			}.bind(this);

			setTimeout(function doDeferredTasks(){
				if(!this.isVideoError && this.isVideoLoaded && this.isCanPlayThrough){
					deferedTasks();
				}
				else {
					setTimeout(doDeferredTasks.bind(this), 17);
				}
			}.bind(this), 17);
		}
	}

	OnPixiXhrFinished(resouce)
	{
		if (resouce.error)
		{
			this.OnError(resouce.error);
		}
		else
		{
			var vid = (window.URL ? URL : webkitURL).createObjectURL(resouce.data);
			this.video.src = vid;
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	GetDuration()
	{
		return this.video.duration;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	GetRemainTime()
	{
		return this.video.duration - this.video.currentTime;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetCurrentTime()
	{
		return this.video.currentTime;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	GetTimePercent()
	{
		return this.video.currentTime / this.video.duration;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetDetune(value)
	{
		if (AudioManager.IsSupportAudioAPI() && this.source !== null)
		{
			this.audioFilter.detune.value = value;
		}
		else
		{
			this.useDetuneFallback = true;
			this.SetDetuneFallback(value);
		}
	}

	SetDetuneFallback(value)
	{
		var oldVolume = this.GetVolume();

		if (DeviceInfo.DEVICE_INFO.toUpperCase().indexOf('IOS') != -1)
		{
			if (value == GameDefine.VIDEO_DETUNE_LOW)
			{
				this.SetVolume(0);
			}
			else
			{
				this.SetVolume(1.0);
			}
		}
		else
		{
			if (value == GameDefine.VIDEO_DETUNE_LOW)
			{
				this.SetVolume(0.25);
			}
			else
			{
				this.SetVolume(1.0);
			}
		}

		this.DetuneTimeout += this.kDetuneTimeout;
		setTimeout(function()
		{
			this.DetuneTimeout -= this.kDetuneTimeout;
			if (this.DetuneTimeout <= 0)
			{
				this.DetuneTimeout = 0;
				if (this.options.useDetune)
				{
					this.SetVolume(oldVolume);
				}
				else
				{
					Utils.Log("dont reset volume on SetDetuneFallback");
				}
			}
		}.bind(this), this.kDetuneTimeout);
	}

	SetExtEvtHandler(extEvtHandler)
	{
		this.extEvtHandler = extEvtHandler
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	SetVolume(v)
	{
		if (this.options.mute)
		{
			this.volume = 0;
		}
		else
		{
			this.volume = Math.min(1.0, Math.max(v, 0.0));
		}
		if (AudioManager.IsSupportAudioAPI() && this.source !== null)
		{
			this.gainNode.gain.value = this.volume;
		}

		this.video.volume = this.volume;

		// iOS: doesn't support set volume
		// https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html
		// read: Volume Control in JavaScript
		if (this.useDetuneFallback && DeviceInfo.DEVICE_INFO.toUpperCase().indexOf('IOS') != -1)
		{
			this.video.muted = (this.volume == 0);
		}
	}

	GetVolume()
	{
		return this.volume;
	}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Show()
	{
		this.video.style.visibility = "visible";
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Hide()
	{
		this.Pause();
		this.video.style.visibility = "hidden";
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsVideoPlaying()
	{
		return this.isVideoPlaying && !this.video.paused;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	OnVideoCanPlayThrough()
	{
		// * Bug Fixed ['9664719']: '[IOS][A8][2.3]: Sound still play randomly in end screen
		if(this.video.muted || this.options.mute){
			this.video.volume = 0.0;
			this.volume = 0.0;
		} else {
			this.video.volume = 1.0;
			this.volume = 1.0;
		}

		// Note: Must reset volume before turn on flags due to deferedTasks
		this.isCanPlayThrough = true;
		this.isVideoLoaded = true;

		this.HideLoading();

        if (GameConfig.isUseVHeroMOATTracking && !this.isMoatInit)
        {
            this.isMoatInit = true;
            if(window.isViewabilityMoat && window.isViewabilityMoat == "1")
            {
                Utils.InitMoatEvent(this.video, this.video.duration);
            }
        }
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	OnVideoFinished()
	{
		this.isVideoPlaying = false;
		this.isVideoEnded = true;

		if (this.timerInited)
		{
			this.timerSign.visible = false;
		}
		// On device, there is not enough time for video end event to be called
		/*
		if(typeof window.notifyVideoComplete !== 'undefined' && this.evtracks.enabled){
			this.evtracks.enabled = false; // avoid duplicate when reset
			window.notifyVideoComplete();
		}
		*/
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	OnLoadedMetaData()
	{
		this.isVideoLoaded = true;

		this.videoW = this.video.videoWidth;
		this.videoH = this.video.videoHeight;
		Utils.Log("videoW x videoH " + this.videoW + " x " + this.videoH);
		document.body.appendChild(this.videoDiv);
		this.FullscreenVideo();
	}

	FullscreenVideo()
	{
		if (this.options.forceFullScreen == true)
		{
			console.log("FullscreenVideo forceFullScreen");
			this.video.style.width					= "100%";
			this.video.style.height					= "100%";
			return;
		}

		if (this.options.forceFullHeight == true)
		{
			console.log("FullscreenVideo forceFullHeight");
			this.video.style.width					= "auto";
			this.video.style.height					= "100%";
			return;
		}

		if (this.options.forceFullWidth == true)
		{
			console.log("FullscreenVideo forceFullWidth");
			this.video.style.width					= "100%";
			this.video.style.height					= "auto";
			return;
		}

		console.log("FullscreenVideo");
		// * Bug Fixed ['9705543']: '[ANMP][1.1][A8][compat]: background is not fit with screen langscape
		let ratioVideo = this.videoW / this.videoH;
		let ratioScreen = this.videoDivW / this.videoDivH;

		if (ratioVideo > ratioScreen)
		{
			this.video.style.width					= "auto";
			this.video.style.height					= "100%";
		}
		else
		{
			this.video.style.width					= "100%";
			this.video.style.height					= "auto";
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	OnTimeUpdate(){
		// move to OnVideoCanPlayThrough instead
		// if(this.video.muted){
			// this.video.volume = 0.0;
			// this.volume = 0.0;
		// }

		if (this.timerInited)
		{
			this.timerText.text = parseInt(this.GetDuration() - this.GetCurrentTime());
			this.timerText.x = -this.timerText.width / 2;
			this.timerText.y = -this.timerText.height / 2;
			this.progress.clear();
			this.progress.lineStyle(this.progressWidth, this.progressColor);
			this.progress.arc(0, 0, this.progressRadius, - Math.PI * 0.5, Math.PI * (this.GetTimePercent() * 2 - 0.5));
		}

		this.videoPauseTime = this.video.currentTime;

		if(this.extEvtHandler ? this.extEvtHandler.OnTimeUpdate : false){
			this.extEvtHandler.OnTimeUpdate(this.video);
		}

		var percent = this.video.currentTime * 100 / this.video.duration;
		if (percent >= 25 && !this.evtracks["first_quartile"] && this.evtracks.enabled )
		{
			this.evtracks["first_quartile"] = true;
			TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_TYPE_FIRST_QUARTILE);
			Utils.SendMoatEvent("AdVideoFirstQuartile");

			if (window.VPaid)
			{
				VPaid.DispatchEvent('AdVideoFirstQuartile');
			}
		}
		if (percent >= 50 && !this.evtracks["midpoint"] && this.evtracks.enabled)
		{
			this.evtracks["midpoint"] = true;
			TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_TYPE_MIDPOINT);
			Utils.SendMoatEvent("AdVideoMidpoint");

			if (window.VPaid)
			{
				VPaid.DispatchEvent('AdVideoMidpoint');
			}
		}
		if (percent >= 75 && !this.evtracks["third_quartile"] && this.evtracks.enabled)
		{
			this.evtracks["third_quartile"] = true;
			TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_TYPE_THIRD_QUARTILE);
			Utils.SendMoatEvent("AdVideoThirdQuartile");

			if (window.VPaid)
			{
				VPaid.DispatchEvent('AdVideoThirdQuartile');
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	OnProgress(){
		if(this.video.buffered && this.video.buffered.length > 0){
			var percentage = this.video.buffered.end(0) / this.video.duration;
			if(percentage >= 1.0){
				if(!this.isCanPlayThrough) this.OnVideoCanPlayThrough();
			}
		}
	}

	OnError(error) {
		this.isVideoPlaying = false;
		this.isVideoError = true;
		this.HideLoading();

		/*
		// for debug
		if (true)
		{
			if (error)
			{
				alert('error ' + error.code);
				this.videoDiv.style.backgroundColor = error.type === 'error' ? 'red' : 'blue';
			}
			else
			{
				this.videoDiv.style.backgroundColor = 'yellow';
			}
		}
		*/
	}

	ShowLoading()
	{
		if (this.useInternalLoading && !window.VPaid)
		{
			this.videoDiv.className = 'videoloader';
		}
	}

	HideLoading()
	{
		if (!window.VPaid)
		{
			this.videoDiv.className = '';
		}
	}

	IsVideoEnded()
	{
		return this.isVideoEnded;
	}

	SetZindex(options)
	{
		if (options.video)
		{
			this.video.style.zIndex = options.video;
		}

		if (options.videoDiv && !window.VPaid)
		{
			this.videoDiv.style.zIndex = options.videoDiv;
		}
	}

	IsGoogleVpaidTest()
	{
		return window.VPaid && !VPaid.videoSlot.videoElement && !VPaid.videoSlot.style;
	}
}
module.exports = new VideoMgr();