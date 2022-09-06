class VPaid
{
	constructor()
	{
		console.log('Vpaid Init');

		this.slot 			= null;
		this.videoSlot		= null;
		this.video			= null;
		this.events			= {};
		this.parameters		= {};
		this.attributes 	= {
			companions: '',
			desiredBitrate: 256,
			duration: 15,
			remainingTime: -1,
			expanded: false,
			icons: false,
			linear: true,
			adSkippableState: true,
			viewMode: 'normal',
			width: 0,
			height: 0,
			volume: 1.0
		};
		this.isDMTouchInteractionsZoneHidden = true;
		this.isDMVpaidFrameShow = false;
		this.isSkipped = false;

		global.DeviceInfo	= require('../../../DeviceInfo');
		global.GameConfig	= require('../../../Config');
		global.APP			= require('../../Application');
		global.Timer		= require('../../Timer');
		global.Input		= require('../../Input');
		global.StateManager	= require('../../StateManager');
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	DispatchEvent(event)
	{
		if (event in this.events)
		{
			this.events[event]();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ADMobileAndTabletcheck()
	{
		let check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);

		return check;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	DMShowDmpVpaidFrame()
	{
		if(!this.ADMobileAndTabletcheck() || this.isDMVpaidFrameShow)
		{
			return;
		}

		try
		{
			let parentWindow = window;
			while (parentWindow.document.getElementById('dmp_vpaid-frame') === null && parentWindow !== parentWindow.parent)
			{
				parentWindow = parentWindow.parent;
			}

			let vpaidFrame = parentWindow.document.getElementById('dmp_vpaid-frame')
			if (vpaidFrame)
			{
				vpaidFrame.style.pointerEvents = 'auto';
				this.isDMVpaidFrameShow = true;

				let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
				let element = parentWindow.document.getElementById('dmp_vpaid-frame');
				let observer = new MutationObserver(mutations =>
				{
					mutations.forEach(mutation =>
					{
						if (mutation.type === "attributes" && mutation.target && mutation.target.style && mutation.target.style.pointerEvents === 'none')
						{
							mutation.target.style.pointerEvents = 'auto';
						}
					});
				});

				observer.observe(element,
				{
					attributes: true
				});
			}
		}
		catch (e)
		{
			console.log('DMShowDmpVpaidFrame ' + e);
		}
	};

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	DMShowTouchInteractionsZone()
	{
		if (!this.ADMobileAndTabletcheck() || this.isDMTouchInteractionsZoneHidden)
		{
			return;
		}

		try
		{
			let parentWindow = window;
			while (parentWindow.document.getElementsByClassName("np_TouchInteractionsZone").length < 1 && parentWindow !== parentWindow.parent)
			{
				parentWindow = parentWindow.parent;
			}

			let interactionsZone = parentWindow.document.getElementsByClassName("np_TouchInteractionsZone")[0]
			if (interactionsZone)
			{
				interactionsZone.style.pointerEvents = 'auto';
				this.isDMTouchInteractionsZoneHidden = true;
			}
		}
		catch(e)
		{
			console.log('DMShowTouchInteractionsZone ' + e);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	DMHideTouchInteractionsZone()
	{
		if (!this.ADMobileAndTabletcheck() || !this.isDMTouchInteractionsZoneHidden)
		{
			return;
		}

		try
		{
			let parentWindow = window;
			while (parentWindow.document.getElementsByClassName("np_TouchInteractionsZone").length < 1 && parentWindow !== parentWindow.parent)
			{
				parentWindow = parentWindow.parent;
			}

			let interactionsZone = parentWindow.document.getElementsByClassName("np_TouchInteractionsZone")[0]
			if (interactionsZone)
			{
				interactionsZone.style.pointerEvents = 'none';
				this.isDMTouchInteractionsZoneHidden = false;
			}
		}
		catch(e)
		{
			console.log('DMHideTouchInteractionsZone ' + e);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	OnVideoTimeChange()
	{
		if (!this.isSkipped)
		{
			this.DispatchEvent('AdDurationChange');
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	OnVideoCanPlayThrough()
	{
		this.DispatchEvent('AdVideoStart');
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	handshakeVersion(playerVPAIDVersion)
	{
		console.log('handshakeVersion');
		return playerVPAIDVersion;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	initAd(width, height, viewMode, desiredBitrate, creativeData, environmentVars)
	{
		console.log('initAd');

		this.slot		= environmentVars.slot;
		this.videoSlot	= environmentVars.videoSlot;
		this.video		= this.videoSlot.videoElement || this.videoSlot.style && this.videoSlot || document.createElement('video');

		this.video.addEventListener('timeupdate', this.OnVideoTimeChange.bind(this), false);
		this.video.addEventListener('canplaythrough', this.OnVideoCanPlayThrough.bind(this), false);

		if (this.slot)
		{
			window.innerWidth	= width;
			window.innerHeight	= height;

			this.slot.appendChild(APP.renderer.view);
			APP.Resize();
		}

		if (creativeData['AdParameters'])
		{
			const parameters = JSON.parse(creativeData['AdParameters']);
			const attributes = parameters['attributes'] || {};

			Object.keys(attributes).forEach(key =>
			{
				this.attributes[key] = attributes[key];
			});

			this.parameters = parameters;
		}

		this.attributes['width'] = width;
		this.attributes['height'] = height;
		this.attributes['viewMode'] = viewMode;
		this.attributes['desiredBitrate'] = desiredBitrate;

		// Canal Plus Bug
		setTimeout(() =>
		{
			this.DispatchEvent('AdLoaded');
		}, 100);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	resizeAd(width, height, viewMode)
	{
		console.log('resizeAd');

		this.attributes['width']	= width;
		this.attributes['height']	= height;
		this.attributes['viewMode']	= viewMode;

		window.innerWidth	= width;
		window.innerHeight	= height;
		APP.Resize();

		this.DispatchEvent('AdSizeChange');
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	startAd()
	{
		console.log('startAd');

		this.startTime = (new Date()).getTime();
		this.DMShowDmpVpaidFrame();
		this.DispatchEvent('AdStarted');
		this.DispatchEvent('AdImpression');

	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	stopAd()
	{
		console.log('stopAd');

		this.isSkipped = true;
		this.DispatchEvent('AdStopped');
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	pauseAd()
	{
		console.log('pauseAd');

		onGamePause();
		this.DMShowTouchInteractionsZone();
		this.DispatchEvent('AdPaused');
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	resumeAd()
	{
		console.log('resumeAd');

		onGameResume();
		this.DMHideTouchInteractionsZone();
		this.DispatchEvent('AdPlaying');
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	expandAd()
	{
		console.log('expandAd');
		this.DispatchEvent('AdExpandedChange');
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	getAdExpanded(value)
	{
		console.log('getAdExpanded');
		this.DispatchEvent('AdExpandedChange');
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	collapseAd()
	{
		console.log('collapseAd');
		this.DispatchEvent('AdExpandedChange');
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	skipAd()
	{
		this.isSkipped = true;
		console.log('skipAd');
		this.DispatchEvent('AdSkipped');
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	getAdSkippableState()
	{
		console.log('getAdSkippableState');
		return this.attributes['adSkippableState'];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	setAdVolume(value)
	{
		console.log('setAdVolume');

		this.video.volume = value;
		this.video.muted = (value == 0);
		this.attributes['volume'] = value;
		this.DispatchEvent('AdVolumeChanged');
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	getAdVolume()
	{
		console.log('getAdVolume');
		return this.attributes['volume'];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	subscribe(fn, event, listenerScope)
	{
		console.log('subscribe ' + event);
  		this.events[event] = fn.bind(listenerScope);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	unsubscribe(fn, event)
	{
		console.log('unsubscribe ' + event);
		this.events[event] = null;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	getAdWidth()
	{
		return this.attributes['width'];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	getAdHeight()
	{
		return this.attributes['height'];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	getAdRemainingTime()
	{
		return Math.floor(this.getAdDuration() - this.video.currentTime);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	getAdDuration()
	{
		if (isNaN(this.video.duration) || this.video.duration < 1)
		{
			return this.attributes['duration'];
		}
		return this.video.duration;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	getAdCompanions()
	{
		return this.attributes['companions'];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	getAdIcons()
	{
		return this.attributes['icons'];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	onAdImpression()
	{
		this.DispatchEvent('AdImpression');
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	getAdLinear()
	{
		return true;
	}
}
module.exports = new VPaid();