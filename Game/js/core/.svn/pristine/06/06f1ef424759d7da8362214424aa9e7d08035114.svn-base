const Config = require('./modules/federation/Config');

class TrackingManager
{
	constructor()
	{
		this.TRACKING_ACTION_IMPRESSIONS					= 210628; // ad is displayed.
		this.TRACKING_ACTION_TYPE_PLAYER_EXPAND				= 224025; // When the user expand the video player(like on VWRAP/Buddy Pack/(3R))
		this.TRACKING_ACTION_TYPE_PLAYER_COLLAPSE			= 224026; // When the user un-expand the video player (like on VWRAP/Buddy pack(3R))
		this.TRACKING_ACTION_ADS_EXPAND						= 211307; // user click on the banner
		this.TRACKING_ACTION_ADS_COLLAPSE					= 218749; // user collapse the ads back to banner
		this.TRACKING_ACTION_ENGAGEMENTS					= 218009; // MIG starts (user click on the play button)
		this.TRACKING_ACTION_ENDGAMENTS_LOADING_COMPLETE	= 238558; // This action is called right before the AP is displayed completely to users.
		this.TRACKING_ACTION_CONFIRMED_ENGAGEMENTS			= 191963; // User click on the tap to continue button
		this.TRACKING_ACTION_TYPE_FIRST_QUARTILE			= 224028; // When video reaches 25% of its total.
		this.TRACKING_ACTION_TYPE_MIDPOINT					= 224029; // When video reaches 50% of its total.
		this.TRACKING_ACTION_TYPE_THIRD_QUARTILE			= 224030; // When video reaches 75% of its total.
		this.TRACKING_ACTION_TYPE_END_QUARTILE				= 234554; // When video reaches 100% of its total.
		this.TRACKING_ACTION_COMPLETE_ENGAGEMENTS			= 191968; // MIG fully completed
		this.TRACKING_ACTION_FIRST_COMPLETE_ENGAGEMENTS 	= 289812; // Number of times the video played to its completion (ie 100%). Counted only once, meaning if an user replays the video, it is not counted again.
		this.TRACKING_ACTION_REPLAY							= 191964; // user tap on replay button
		this.TRACKING_ACTION_TYPE_REPLAY_VIDEO				= 234555; // When the user taps on a "replay" video button
		this.TRACKING_ACTION_TYPE_VIDEO_STARTED				= 228364; // When the video loaded & played
		this.TRACKING_ACTION_CLICK_THROUGHTS				= 191967; // when user already click on a link in the ad (browser was opened)
		this.TRACKING_ACTION_CLICK_THROUGHTS_START			= 328898; // when user start to click on a link in the ad (if available)
		this.TRACKING_ACTION_CLOSE							= 191969; // when user tap on close button before complete MIG. If user have fully completed the MIG, this event will not be triggered.
		this.TRACKING_ACTION_CLICK_ON_SHARE					= 201586; // when user tap on the share button (if available)
		this.TRACKING_ACTION_CLICK_TO_CALL					= 216624; // when user tap on call button (if available)
		this.TRACKING_ACTION_FORM_IMPRESSION				= 237213; // when form display
		this.TRACKING_ACTION_FORM_LEAD						= 221840; // when submit form successfully
		this.TRACKING_ACTION_FACEBOOK_CLICK_SHARE			= 235566; // User clicks on the FB SHARE button
		this.TRACKING_ACTION_FACEBOOK_SHARE_FAIL			= 235568; // User clicks on the FB SHARE button and fails to share the post to his Facebook wall
		this.TRACKING_ACTION_FACEBOOK_SHARE_SUCCESS			= 235567; // User clicks on the FB SHARE button and successfully share the post to his Facebook wall
		this.TRACKING_ACTION_VK_CLICK_SHARE					= 280857; // User clicks on the VK SHARE button
		this.TRACKING_ACTION_VK_SHARE_FAIL					= 280869; // User clicks on the VK SHARE button and fails to share the post to his VKontakte wall
		this.TRACKING_ACTION_VK_SHARE_SUCCESS				= 280858; // User clicks on the VK SHARE button and successfully share the post to his VKontakte wall
		this.TRACKING_ACTION_VK_CLICK_LOGOUT 				= 280870; // User clicks on the VK LOGOUT button
		this.TRACKING_ACTION_AD_LOADED						= 276761; // The ad unit has been loaded -> time_spent_loading: calculate loading times in millisecnd.
		this.TRACKING_ACTION_AD_PAUSED						= 276762; // Ads pauses because of interrupt;
		this.TRACKING_ACTION_AD_PLAYING						= 276763; // Ads resumed after interrupt.
		this.TRACKING_ACTION_LEADERBOARD_IMPRESSION			= 310924; // Click to Leaderboard
		this.TRACKING_ACTION_TYPE_QTE_SUCCESSFUL            = 253201; // The player successfully pass the QTE
		this.TRACKING_ACTION_TYPE_QTE_FAILED                = 253202; // The player fails the QTE
		this.TRACKING_ACTION_AGREED_VIEW 					= 241229; // User watched video with an accepted amount of time
		this.TRACKING_ACTION_TYPE_PAGE_VISITED       		= 223611; // When user change page: using 'page' param (custom_tracking of collection will be for the products)
		this.TRACKING_ACTION_SAVE_SCREENSHOT				= 286351; // When user save a screenshot/pucture. The custom_tracking contains the background ID which is used.
		this.ACTION_TYPE_TWITTER_CLICK_SHARE                = 280159; // when user tap on the share button (if available)
		this.TRACKING_ACTION_CLICK_INFO                     = 343224; // when user tap on the info button
		this.TRACKING_ACTION_DECLINE_CALL                   = 285722; // when user decline the call
		this.TRACKING_ACTION_END_CALL                    	= 285723; // when user endcall
		this.TRACKING_ACTION_AD_VIEWABLE					= 362818; // Calculate the ads loading times from black screen to fully display
		this.TRACKING_ACTION_TYPE_PAGE_IMPRESSION      		= 381397; // Detecting if users enter any page. The "page" parameter will return the name of the page.
		this.TRACKING_ACTION_CLICK_ON_BUTTON     		= 384856; // Detecting if users enter any page. The "page" parameter will return the name of the page.
		this.TRACKING_ACTION_REWARD_RECEIVED				= 361338; // When user received reward from server. The custom_tracking is the code from server if available.

		// NEW TRACKING
		this.TRACKING_ACTION_FACEBOOK_LOGIN					= 332475; // When user login to Facebook.
		this.TRACKING_ACTION_FACEBOOK_LOGIN_SUCCESS			= 332476; // When user login to Facebook successful.
		this.TRACKING_ACTION_UNLOCK							= 332477; //When user unlock something.
		this.TRACKING_ACTION_UNLOCK_SUCCESS					= 332478; //When user unlock something successful
		this.TRACKING_ACTION_TUTORIAL_INTERACTION			= 382835; //Tracks the progress made during tutorial phase; 'custom_tracking': name of tutorial step.
		this.TRACKING_AP_START								= 387428; //When Action Phase begin
		this.TRACKING_AP_END								= 387429; //When Action Phase end

		this.TRACKING_LEVEL_COMPLETION						= 387427; //The event with this action ID will be triggered every time user completes stage

		this.TRACKING_EVENT_TYPE_ID							= 200116;
		this.TRACKING_API_URL								= `${Config.REST_API_SERVER}/api/pub/tracking`;

		this.TRCKING_FORMAT_MIG								= 0;
		this.TRCKING_FORMAT_HYBRID							= 1;
		this.TRCKING_FORMAT_MINT_MIG						= 2;
		this.TRCKING_FORMAT_BLS								= 3;
		this.TRCKING_FORMAT_VIDEO_FORM						= 4;
		this.TRCKING_FORMAT_VHERO						    = 5;
		this.TRCKING_FORMAT_VINT						    = 6;
		this.TRCKING_FORMAT_SITE							= 7;
		this.TRCKING_FORMAT_VBAN						    = 8;
		this.TRCKING_FORMAT_VSCORE							= 9;
		this.TRCKING_FORMAT_FAKE_CALL						= 10;
		this.TRCKING_FORMAT_VSTORY							= 11;
		this.TRCKING_FORMAT_FAKE_CALL_VIDEO					= 12;
		this.TRCKING_FORMAT_FORM_INTERACTIONS				= 13;
		this.TRCKING_FORMAT_WELCOME_SCREEN					= 14;
		this.TRCKING_FORMAT_STANDALONE_WEBSITE				= 15;
		this.TRCKING_FORMAT_VINTER_MULTI					= 16;
		this.TRCKING_FORMAT_INTERACTIVE_VIDEO_SWITCH		= 17;
		this.TRCKING_FORMAT_BLS_INTERACTIONS				= 18;

		this.token				= 1;
		this.score				= 0;
		this.page			= 1;
		this.timeSpentOnPage	= 0;
		this.format				= this.TRCKING_FORMAT_MIG;
		this.startLoadingTime	= 0; //ai.nguyentien add variable to record time player tap play game (hybrid project)
		this.evTrack			=
		{
			210628:{ //TRACKING_ACTION_IMPRESSIONS
				send_one:true,
				count:0
			},
			224025:{ //TRACKING_ACTION_TYPE_PLAYER_EXPAND
				send_one:false,
				count:0
			},
			224026:{ //TRACKING_ACTION_TYPE_PLAYER_COLLAPSE
				send_one:false,
				count:0
			},
			211307:{ //TRACKING_ACTION_ADS_EXPAND
				send_one:true,
				count:0
			},
			218749:{ //TRACKING_ACTION_ADS_COLLAPSE
				send_one:true,
				count:0
			},
			218009:{ //TRACKING_ACTION_ENGAGEMENTS
				send_one:true,
				count:0
			},
			191963:{ //TRACKING_ACTION_CONFIRMED_ENGAGEMENTS
				send_one:true,
				count:0
			},
			224028:{ //TRACKING_ACTION_TYPE_FIRST_QUARTILE
				send_one:true,
				count:0
			},
			224029:{ //TRACKING_ACTION_TYPE_MIDPOINT
				send_one:true,
				count:0
			},
			224030:{ //TRACKING_ACTION_TYPE_THIRD_QUARTILE
				send_one:true,
				count:0
			},
			234554:{ //TRACKING_ACTION_TYPE_END_QUARTILE
				send_one:true,
				count:0
			},
			191968:{ //TRACKING_ACTION_COMPLETE_ENGAGEMENTS
				send_one:false,
				send_score:true,
				send_time_spent:true,
				count:0
			},
			191964:{ //TRACKING_ACTION_REPLAY
				send_one:false,
				count:0
			},
			234555:{ //TRACKING_ACTION_REPLAY_VIDEO
				send_one:false,
				count:0
			},
			228364:{ //TRACKING_ACTION_TYPE_VIDEO_STARTED
				send_one:false,
				count:0
			},
			191967:{ //TRACKING_ACTION_CLICK_THROUGHTS
				send_one:false,
				count:0
			},
			328898:{ //TRACKING_ACTION_CLICK_THROUGHTS_START
				send_one:false,
				count:0
			},
			191969:{ //TRACKING_ACTION_CLOSE
				send_one:true,
				count:0
			},
			201586:{ //TRACKING_ACTION_CLICK_ON_SHARE
				send_one:false,
				count:0
			},
			216624:{ //TRACKING_ACTION_CLICK_TO_CALL
				send_one:false,
				count:0
			},
			237213:{ //TRACKING_ACTION_FORM_IMPRESSION
				send_one:false,
				count:0
			},
			221840:{ //TRACKING_ACTION_FORM_LEAD
				send_one:false,
				count:0
			},
			235566:{ //TRACKING_ACTION_FACEBOOK_CLICK_SHARE
				send_one:false,
				count:0
			},
			235568:{ //TRACKING_ACTION_FACEBOOK_SHARE_FAIL
				send_one:false,
				count:0
			},
			235567:{ //TRACKING_ACTION_FACEBOOK_SHARE_SUCCESS
				send_one:false,
				count:0
			},
			280857:{ //TRACKING_ACTION_VK_CLICK_SHARE
				send_one:false,
				count:0
			},
			280869:{ //TRACKING_ACTION_VK_SHARE_FAIL
				send_one:false,
				count:0
			},
			280858:{ //TRACKING_ACTION_VK_SHARE_SUCCESS
				send_one:false,
				count:0
			},
			280870:{ //TRACKING_ACTION_VK_CLICK_LOGOUT
				send_one:false,
				count:0
			},
			238558:{ //TRACKING_ACTION_ENDGAMENTS_LOADING_COMPLETE
				send_one:true,
				count:0
			},
			289812:{ //TRACKING_ACTION_FIRST_COMPLETE_ENGAGEMENTS
				send_one:true,
				count:0
			},
			286351: { //TRACKING_ACTION_SAVE_SCREENSHOT
				send_one:false,
				send_score:true,
				count:0
			},
			276761:{ //TRACKING_ACTION_AD_LOADED
				send_one:true,
				count:0
			},
			276762:{ //TRACKING_ACTION_AD_PAUSED
				send_one:false,
				count:0
			},
			276763:{ //TRACKING_ACTION_AD_PLAYING
				send_one:false,
				count:0
			},
			310924:{ //TRACKING_ACTION_LEADERBOARD_IMPRESSION
				send_one:false,
				count:0
			},
			253201: { //TRACKING_ACTION_TYPE_QTE_SUCCESSFUL
				send_one:false,
				count:0
			},
			253202: { //TRACKING_ACTION_TYPE_QTE_FAILED
				send_one:false,
				count:0
			},
			241229: {//TRACKING_ACTION_AGREED_VIEW
				send_one:true,
				count:0
			},
			381397:{//TRACKING_ACTION_TYPE_PAGE_IMPRESSION
				send_one:false,
				send_page:true,
				count:0
			},
			223611:{ //TRACKING_ACTION_TYPE_PAGE_VISITED
				send_one:false,
				send_page:true,
				count:0
			},
			280159:{ //ACTION_TYPE_TWITTER_CLICK_SHARE
				send_one:false,
				count:0
			},
			343224:{ //TRACKING_ACTION_CLICK_INFO
				send_one:false,
				count:0
			},
			332475:{ //TRACKING_ACTION_FACEBOOK_LOGIN
				send_one:true,
				count:0
			},
			332476:{ //TRACKING_ACTION_FACEBOOK_LOGIN_SUCCESS
				send_one:true,
				count:0
			},
			332477:{ //TRACKING_ACTION_UNLOCK
				send_one:false,
				count:0
			},
			332478:{ //TRACKING_ACTION_UNLOCK_SUCCESS
				send_one:false,
				count:0
			},
			285722:{ //TRACKING_ACTION_DECLINE_CALL
				send_one:true,
				count:0
			},
			285723:{ //TRACKING_ACTION_END_CALL
				send_one:true,
				count:0
			},
			362818:{ //TRACKING_ACTION_AD_VIEWABLE
				send_one:true,
				count:0
			},
			382835:{ //TRACKING_ACTION_TUTORIAL_INTERACTION
				send_one:false,
				count:0
			},
			384856:{ //TRACKING_ACTION_CLICK_ON_BUTTON
				send_one:false,
				count:0
			},
			361338:{ //TRACKING_ACTION_REWARD_RECEIVED
            	send_one:false,
            	count:0
			},
			387428:{ //TRACKING_AP_START
            	send_one:false,
            	count:0
			},
			387429:{ //TRACKING_AP_END
            	send_one:false,
            	count:0
			},
			387427:{ //TRACKING_LEVEL_COMPLETION
            	send_one:false,
            	count:0
			}
		}

		this.SaveStatsOld();

		//MNH Fixed default value problem for anon_id
		window.anonymous = window.anonymous === "ANONYMOUS_ACCOUNT" ? "" : window.anonymous;
		Resource.args["anonymous"] = Resource.args["anonymous"] === "ANONYMOUS_ACCOUNT" ? "" : Resource.args["anonymous"];
		Resource.args["fbid"] = Resource.args["fbid"] === "FACEBOOK_ID" ? "" : Resource.args["fbid"];
		Resource.args["gliveusername"] = Resource.args["gliveusername"] === "GLIVE_USERNAME" ? "" : Resource.args["gliveusername"];
		Resource.args["gcid"] = Resource.args["gcid"] === "GAMECENTER_UID" ? "" : Resource.args["gcid"];
		window.anonymous = window.anonymous || Resource.args["anonymous"] || Resource.args["fbid"] || Resource.args["gliveusername"] || Resource.args["gcid"] || Resource.args["hdidfv"] || Resource.args["udid"];

		if (typeof(window.anonymous) != 'undefined' && window.anonymous != null)
		{
			if (window.anonymous.indexOf("anonymous") == -1
				&& window.anonymous.indexOf("iphone") == -1
				&& window.anonymous.indexOf("android") == -1
				&& window.anonymous.indexOf("google") == -1) // in case anonymous didn't have full anon_id
			{
				window.anonymous = "anonymous:" + window.anonymous;
			}
		}

		if (this.IsTrackingBeta())
		{
			if (!window.omsAws)
			{
				if (GameConfig.isTrackingETS)
				{
					this.TRACKING_API_URL = `https://etsv2-beta.gameloft.com/gs_web?ggi={ggi}`;
				}
				else
				{
					this.TRACKING_API_URL = `${Config.REST_API_SERVER}/api/pub/tracking/beta`;
				}
			}
			else
			{
				if (GameConfig.isTrackingETS)
				{
					this.TRACKING_API_URL = `https://etsv2-beta.gameloft.com/gs_web?ggi={ggi}`;
				}
				else
				{
					this.TRACKING_API_URL = `https://tracking.alpha.g4b.gameloft.com`;
				}
			}
		}
		else if (window.omsAws)
		{
			if (GameConfig.isTrackingETS)
			{
				this.TRACKING_API_URL = `https://etsv2.gameloft.com/gs_web?ggi={ggi}`
			}
			else
			{
				this.TRACKING_API_URL = `https://tracking.gold.g4b.gameloft.com`;
			}
		}
		else
		{
			if (GameConfig.isTrackingETS)
			{
				this.TRACKING_API_URL = `https://etsv2.gameloft.com/gs_web?ggi={ggi}`
			}
		}
	}

	IsTrackingBeta()
	{
		return (!window.omsPhase || window.omsPhase == 'dev' || window.omsPhase == 'qa');
	}

	SaveStatsOld()
	{
		//NMH override to send redirect tracking at same page
		if (!window.saveStatsOld)
		{
			let saveStatsOld = window.saveStats;
			window.saveStats = (query, urlRedirect) =>
			{
				if (urlRedirect)
				{

					let track		= window.strStatsUrl + query;
					let redir		= urlRedirect.replace(/link:/i, "");
					let payload		= {track:track, redir:redir};
					if (window.ets_redirect_data)
					{
						payload["ets"] = window.ets_redirect_data;
					}

					let trackingPortal = "https://game-portal.gameloft.com/2093/redirect.php?track_redir=base64";
					if (this.IsTrackingBeta())
					{
						trackingPortal = "https://game-portal.gameloft.com/2093/redirect_beta.php?track_redir=base64";
					}
					let link = ((typeof mraid === 'undefined') ? "link:" : "") + trackingPortal + window.btoa(JSON.stringify(payload));
					if (window.redirect)
					{
						redirect(link);
					}
					else if (window.REVIEW)
					{
						window.open(link.replace("link:", ""), "_blank");
					}
				}
				else
				{
					return saveStatsOld(query, urlRedirect);
				}
			};
		}
	}

	SetFormat(value)
	{
		if (value == this.TRCKING_FORMAT_MINT_MIG)
		{
			this.TRACKING_EVENT_TYPE_ID = 226759;
		}
		else if (value == this.TRCKING_FORMAT_HYBRID)
		{
			this.TRACKING_EVENT_TYPE_ID = 234553;
		}
		else if (value == this.TRCKING_FORMAT_SITE)
		{
			this.TRACKING_EVENT_TYPE_ID = 222996;
		}
		else if (value == this.TRCKING_FORMAT_BLS)
		{
			this.TRACKING_EVENT_TYPE_ID = 363611;
		}
		else if (value == this.TRCKING_FORMAT_VIDEO_FORM)
		{
			this.TRACKING_EVENT_TYPE_ID = 316786;
		}
		else if (value == this.TRCKING_FORMAT_VINT)
		{
			this.TRACKING_EVENT_TYPE_ID = 226760;
		}
		else if (value == this.TRCKING_FORMAT_VSCORE)
		{
			this.TRACKING_EVENT_TYPE_ID = 327869;
		}
		else if (value == this.TRCKING_FORMAT_FAKE_CALL)
		{
			this.TRACKING_EVENT_TYPE_ID = 285721;
		}
		else if (value == this.TRCKING_FORMAT_FAKE_CALL_VIDEO)
		{
			this.TRACKING_EVENT_TYPE_ID = 363616;
		}
		else if (value == this.TRCKING_FORMAT_VSTORY)
		{
			this.TRACKING_EVENT_TYPE_ID = 327870;
		}
		else if (value == this.TRCKING_FORMAT_FORM_INTERACTIONS)
		{
			this.TRACKING_EVENT_TYPE_ID = 226757;
		}
		else if (value == this.TRCKING_FORMAT_WELCOME_SCREEN)
		{
			this.TRACKING_EVENT_TYPE_ID = 301759;
		}
		else if (value == this.TRCKING_FORMAT_VINTER_MULTI)
		{
			this.TRACKING_EVENT_TYPE_ID = 234548;
		}
		else if (value == this.TRCKING_FORMAT_INTERACTIVE_VIDEO_SWITCH)
		{
			this.TRACKING_EVENT_TYPE_ID = 363608;
		}
		else if (value == this.TRCKING_FORMAT_BLS_INTERACTIONS)
		{
			this.TRACKING_EVENT_TYPE_ID = 405099;	
		}
		else
		{
			this.TRACKING_EVENT_TYPE_ID = 200116;
		}
		this.format = value;
	}

	SetScoreParam(score)
	{
		this.score = score;
	}

	SetPageInfo(page, timeSpent)
	{
		this.page = page;
		this.timeSpentOnPage = timeSpent;
	}

	SetPixelTracking(action, url)
	{
		if (this.evTrack[action])
		{
			this.evTrack[action].pixel_tracking = url;
		}
	}

	GetSourceGameGGI()
	{
		let hostGameGGI = Resource.args["ggi"];
		if (typeof hostGameGGI === 'undefined')
		{
			let hostgame_clientid	= decodeURIComponent(window.client_id || Resource.args["clientid"] || "");
			let clientid_parts		= hostgame_clientid.split(":");
			if (clientid_parts.length >= 4)
			{
				hostGameGGI = isNaN(clientid_parts[0]) ? clientid_parts[2] : clientid_parts[1];
			}

		}
		return parseInt(hostGameGGI);
	}

	SendEventTracking(actions, callback, custom_tracking, redirect_url)
	{
		if (typeof global.FBPixelTrackCustomEvents === 'function') FBPixelTrackCustomEvents(actions);
		if ((window.DEBUG || !window.campaign_id || !window.creative_id || !window.anonymous) && (typeof window.mraid === 'undefined') && !window.VPaid)
		{
			if (callback)
			{
				callback(false);
			}
			return false;
		}

		if (typeof custom_tracking == 'undefined')
		{
			custom_tracking = "N/A";
		}
		else
		{
			custom_tracking = "" + custom_tracking;
		}

		if (!(actions instanceof Array))
		{
			actions = [actions];
		}

		let trackdata = {
			ggi: parseInt(Resource.GetParam("tracking_ggi")),
			entity_type: window.omsPhase === "gold" ? "GAMELOFT_MINIGAME_GOLD" : "GAMELOFT_MINIGAME_BETA",
			entity_id: `3402:${Resource.GetParam("tracking_ggi")}:${window.omsVersion}:HTML5:Ads`,
			proto_ver: `${window.omsVersion}`,
			events: []
		}

		actions.forEach(action =>
		{
			if (this.evTrack[action])
			{
				if (this.evTrack[action].send_one && this.evTrack[action].count > 0)
				{
					if (callback)
					{
						callback(false);
					}
					return false;
				}
				this.evTrack[action].count++;
			}

			if (action === this.TRACKING_ACTION_CLOSE)
			{
				if (custom_tracking == "N/A")
				{
					if (this.format == this.TRCKING_FORMAT_MIG || this.format == this.TRCKING_FORMAT_VHERO ||
						this.format == this.TRCKING_FORMAT_FAKE_CALL || this.format == this.TRCKING_FORMAT_FAKE_CALL_VIDEO ||
						this.format == this.TRCKING_FORMAT_HYBRID || this.format == this.TRCKING_FORMAT_WELCOME_SCREEN ||
						this.format == this.TRCKING_FORMAT_INTERACTIVE_VIDEO_SWITCH)
					{
						if (this.evTrack[this.TRACKING_ACTION_COMPLETE_ENGAGEMENTS].count == 0)
						{
							custom_tracking = "before_completed_engagement";
						}
					}
					else if (this.format == this.TRCKING_FORMAT_VIDEO_FORM)
					{
						if (this.evTrack[this.TRACKING_ACTION_TYPE_END_QUARTILE].count == 0)
						{
							custom_tracking = "before_ad_video_complete";
						}
					}
					else if (this.format == this.TRCKING_FORMAT_SITE)
					{
						if (this.evTrack[this.TRACKING_ACTION_TYPE_END_QUARTILE].count == 0)
						{
							custom_tracking = "before_completed_engagement";
						}
					}
				}

				if (this.format == this.TRCKING_FORMAT_VSCORE)
				{
					if (this.evTrack[this.TRACKING_ACTION_COMPLETE_ENGAGEMENTS].count > 0)
					{
						if (callback)
						{
							callback(false); //Don't send CLOSE event if user have to complete engagement
						}
						return false;
					}
				}
			}

			let loading_time = 0;
			if (action === this.TRACKING_ACTION_IMPRESSIONS || action === this.TRACKING_ACTION_AD_LOADED || action === this.TRACKING_ACTION_AD_VIEWABLE)
			{
				if (window.startTime)
				{
					loading_time = (new Date()).getTime() - window.startTime;
				}
			}
			else if (action === this.TRACKING_ACTION_ENGAGEMENTS)
			{
				this.startLoadingTime = gTotalTimeSpent;
			}
			else if (action === this.TRACKING_ACTION_ENDGAMENTS_LOADING_COMPLETE || action === this.TRACKING_ACTION_TYPE_VIDEO_STARTED)
			{
				loading_time = Math.ceil((gLoadingTimeSpent > 0 ? gLoadingTimeSpent : gTotalTimeSpent) * 1000);
			}

			if (this.format == this.TRCKING_FORMAT_MIG)
			{
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "N/A",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:window.campaign_id || "",
						creative_id:window.creative_id || "",
						custom_tracking: custom_tracking || "N/A",
						d_country:  window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						score: this.evTrack[action].send_score ? this.score : 0,
						source_game:this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						time_spent_loading: (action === this.TRACKING_ACTION_IMPRESSIONS) ? 0 : loading_time,
						total_time_spent_ads: Math.ceil(gTotalTimeSpent || 0),
						total_time_spent_playing: this.evTrack[action].send_time_spent ? Math.ceil(gIngameTimeSpent || 0) : 0,
						ver: `${window.omsVersion}`,
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A"
					}
				})
			}
			else if (this.format == this.TRCKING_FORMAT_STANDALONE_WEBSITE)
			{
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type: action,
						ad_type: Resource.args["ad"] || "N/A",
						anon_id: decodeURIComponent(window.anonymous) || "",
						content: window.tracking_content || "N/A",
						campaign_id: window.campaign_id || "",
						creative_id: window.creative_id || "",
						custom_tracking:custom_tracking || "N/A",
						d_country: window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						score: this.evTrack[action].send_score ? this.score : 0,
						time_spent_loading: (action === this.TRACKING_ACTION_IMPRESSIONS) ? 0 : loading_time,
						total_time_spent_ads: Math.ceil(gTotalTimeSpent || 0),
						total_time_spent_playing: this.evTrack[action].send_time_spent ? Math.ceil(gIngameTimeSpent || 0) : 0,
						ver: `${window.omsVersion}`
					}
				})
			}
			else if (this.format == this.TRCKING_FORMAT_HYBRID)
			{
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "N/A",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:window.campaign_id || "",
						creative_id:window.creative_id || "",
						custom_tracking: custom_tracking || "N/A",
						d_country:  window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						score: this.evTrack[action].send_score ? this.score : 0,
						source_game:this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A",
						time_spent_loading: (action === this.TRACKING_ACTION_IMPRESSIONS) ? 0 : loading_time,
						total_time_spent_ads: Math.ceil(gTotalTimeSpent || 0),
						total_time_spent_playing: this.evTrack[action].send_time_spent ? Math.ceil(gIngameTimeSpent || 0) : 0,
						ver: `${window.omsVersion}`
					}
				})
			}
			else if (this.format == this.TRCKING_FORMAT_SITE)
			{
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:window.campaign_id || "",
						creative_id:window.creative_id || "",
						custom_tracking: custom_tracking || "N/A",
						custom_tracking_video_position: 0,
						d_country:  window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						page: this.evTrack[action].send_page ? ( "Page_"+ this.page) : "N/A" ,
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A",
						source_game:this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						time_spent_loading:(action === this.TRACKING_ACTION_ENDGAMENTS_LOADING_COMPLETE) ?Math.ceil((gTotalTimeSpent - this.startLoadingTime) * 1000) : loading_time,
						total_time_spent_ads: Math.ceil(window.gTotalTimeSpent || 0),
						total_time_spent_on_page: this.evTrack[action].send_page ? Math.ceil(this.timeSpentOnPage) : 0,
						ver: `${window.omsVersion}`
					}
				})
			}
			else if (this.format == this.TRCKING_FORMAT_MINT_MIG)
			{
				let qte_number = ((action === this.TRACKING_ACTION_TYPE_QTE_SUCCESSFUL) || (action === this.TRACKING_ACTION_TYPE_QTE_FAILED) || (action === this.TRACKING_ACTION_ENGAGEMENTS)) ? window.QTE_number : 0
				let video_position = 0;
				if (custom_tracking.indexOf('video_position') != -1)
				{
					video_position = +custom_tracking.split(':')[1];
					custom_tracking = "N/A";

					// if (action === this.TRACKING_ACTION_TYPE_VIDEO_STARTED)
					// {
					// 	loading_time = global.video_loading_time[video_position-1];
					// }
				}
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:window.campaign_id || "",
						creative_id:window.creative_id || "",
						custom_tracking: custom_tracking || "N/A",
						custom_tracking_video_position: video_position,
						d_country:  window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						qte_number: qte_number,
						source_game:this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						time_spent_loading: (action === this.TRACKING_ACTION_AD_LOADED || action === this.TRACKING_ACTION_TYPE_VIDEO_STARTED || action === this.TRACKING_ACTION_AD_VIEWABLE) ? loading_time : 0,
						total_time_spent_ads: Math.ceil(gTotalTimeSpent || 0),
						ver: `${window.omsVersion}`,
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A"
					}
				})
			}
			else if (this.format == this.TRCKING_FORMAT_BLS)
			{
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:window.campaign_id || "",
						creative_id:window.creative_id || "",
						custom_tracking: custom_tracking || "N/A",
						d_country:  window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						source_game:this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						time_spent_loading: (action === this.TRACKING_ACTION_IMPRESSIONS) ? 0 : loading_time,
						total_time_spent_ads: Math.ceil(gTotalTimeSpent || 0),
						ver: `${window.omsVersion}`,
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A"
					}
				})
			}
			else if (this.format == this.TRCKING_FORMAT_FORM_INTERACTIONS)
			{
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:window.campaign_id || "",
						creative_id:window.creative_id || "",
						custom_tracking: custom_tracking || "N/A",
						d_country:  window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						source_game:this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						time_spent_loading: (action === this.TRACKING_ACTION_IMPRESSIONS) ? 0 : loading_time,
						total_time_spent_ads: Math.ceil(gTotalTimeSpent || 0),
						ver: `${window.omsVersion}`,
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A"
					}
				})
			}
			else if (this.format == this.TRCKING_FORMAT_VIDEO_FORM)
			{
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:window.campaign_id || "",
						creative_id:window.creative_id || "",
						custom_tracking: custom_tracking || "N/A",
						d_country:  window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						source_game:this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						time_spent_loading: loading_time,
						total_time_spent_ads: Math.ceil(gTotalTimeSpent || 0),
						ver: `${window.omsVersion}`,
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A"
					}
				})
			}
			else if(this.format == this.TRCKING_FORMAT_VHERO)
			{
				let qte_number = ((action === this.TRACKING_ACTION_TYPE_QTE_SUCCESSFUL) || (action === this.TRACKING_ACTION_TYPE_QTE_FAILED) || (action === this.TRACKING_ACTION_ENGAGEMENTS)) ? window.QTE_number : 0
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:parseInt(window.campaign_id || 0),
						creative_id:parseInt(window.creative_id || 0),
						custom_tracking: custom_tracking || "N/A",
						d_country:  window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						qte_number: qte_number,
						source_game:this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						time_spent_loading: (action === this.TRACKING_ACTION_IMPRESSIONS) ? 0 : loading_time,
						total_time_spent_ads: Math.ceil(gTotalTimeSpent || 0),
						ver: `${window.omsVersion}`,
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A"
					}
				})
			}
			else if (this.format == this.TRCKING_FORMAT_VINT)
			{
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:window.campaign_id || "",
						creative_id:window.creative_id || "",
						custom_tracking: custom_tracking || "N/A",
						d_country:  window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A",
						source_game:this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						time_spent_loading:(action === this.TRACKING_ACTION_ENDGAMENTS_LOADING_COMPLETE) ?Math.ceil((gTotalTimeSpent - this.startLoadingTime) * 1000) : loading_time,
						total_time_spent_ads: Math.ceil(window.gTotalTimeSpent || 0),
						ver: `${window.omsVersion}`
					}
				})
			}
			else if (this.format == this.TRCKING_FORMAT_VBAN)
			{
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:window.campaign_id || "",
						creative_id:window.creative_id || "",
						custom_tracking: custom_tracking || "N/A",
						d_country:  window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id: Resource.args["location"] || "N/A",
						source_game: this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						time_spent_loading: (action === this.TRACKING_ACTION_IMPRESSIONS) ? 0 : loading_time,
						total_time_spent_ads: ((action === this.TRACKING_ACTION_ADS_EXPAND)&&(this.evTrack[action].count == 1)) ? 0 : Math.ceil(window.gTotalTimeSpent || 0),
						ver:`${window.omsVersion}`
					}
				});
			}
			else if(this.format == this.TRCKING_FORMAT_VSCORE)
			{
				let qte_number = ((action === this.TRACKING_ACTION_TYPE_QTE_SUCCESSFUL) || (action === this.TRACKING_ACTION_TYPE_QTE_FAILED)) ? window.QTE_number : 0
				let send_score = (action === this.TRACKING_ACTION_COMPLETE_ENGAGEMENTS) || (action === this.TRACKING_ACTION_FIRST_COMPLETE_ENGAGEMENTS);

				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:parseInt(window.campaign_id || 0),
						creative_id:parseInt(window.creative_id || 0),
						custom_tracking: custom_tracking || "N/A",
						d_country:  window.deviceCountry || "N/A",
						ip_country: window.ipCountry || "N/A",
						qte_number: qte_number,
						score: send_score ? this.score : 0,
						source_game:this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						time_spent_loading: (action === this.TRACKING_ACTION_IMPRESSIONS) ? 0 : loading_time,
						total_time_spent_ads: Math.ceil(gTotalTimeSpent || 0),
						ver:`${window.omsVersion}`,
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A"
					}
				});
			}
			else if (this.format == this.TRCKING_FORMAT_FAKE_CALL || this.format == this.TRCKING_FORMAT_FAKE_CALL_VIDEO)
			{
				let video_position = 0;
				if (custom_tracking.indexOf('video_position') != -1)
				{
					video_position = +custom_tracking.split(':')[1];
					custom_tracking = "N/A";

					if (action === this.TRACKING_ACTION_TYPE_VIDEO_STARTED)
					{
						loading_time = global.video_loading_time[video_position-1];
					}
				}

				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:window.campaign_id || "",
						creative_id:window.creative_id || "",
						custom_tracking: custom_tracking || "N/A",
						custom_tracking_video_position: video_position || 0,
						d_country:  window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A",
						source_game:this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						time_spent_loading: (action === this.TRACKING_ACTION_AD_LOADED || action === this.TRACKING_ACTION_ENDGAMENTS_LOADING_COMPLETE || action === this.TRACKING_ACTION_TYPE_VIDEO_STARTED || action === this.TRACKING_ACTION_AD_VIEWABLE) ? loading_time : 0,
						total_time_spent_ads: Math.ceil(window.gTotalTimeSpent || 0),
						ver: `${window.omsVersion}`
					}
				})
			}
			else if(this.format == this.TRCKING_FORMAT_VSTORY)
			{
				let qte_number = ((action === this.TRACKING_ACTION_TYPE_QTE_SUCCESSFUL) || (action === this.TRACKING_ACTION_TYPE_QTE_FAILED) || (action === this.TRACKING_ACTION_ENGAGEMENTS)) ? window.QTE_number : 0
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:parseInt(window.campaign_id || 0),
						creative_id:parseInt(window.creative_id || 0),
						custom_tracking: custom_tracking || "N/A",
						d_country:  window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						qte_number: qte_number,
						rim_pointcut_id:Resource.args["location"] || "N/A",
						source_game:this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						time_spent_loading: (action === this.TRACKING_ACTION_AD_LOADED || action === this.TRACKING_ACTION_TYPE_VIDEO_STARTED || action === this.TRACKING_ACTION_AD_VIEWABLE) ? loading_time : 0,
						total_time_spent_ads: Math.ceil(gTotalTimeSpent || 0),
						ver: `${window.omsVersion}`
					}
				})
			}
			else if (this.format == this.TRCKING_FORMAT_WELCOME_SCREEN)
			{
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "N/A",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:window.campaign_id || "",
						creative_id:window.creative_id || "",
						custom_tracking: custom_tracking || "N/A",
						d_country:  window.deviceCountry || "",
						game_igp_code:window.game_igp_code || "N/A",
						ip_country: window.ipCountry || "",
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A",
						source_game:this.GetSourceGameGGI() || 0,
						time_spent_loading: (action === this.TRACKING_ACTION_IMPRESSIONS) ? 0 : loading_time,
						total_time_spent_ads: Math.ceil(gTotalTimeSpent || 0),
						ver: `${window.omsVersion}`
					}
				})
			}
			else if (this.format == this.TRCKING_FORMAT_VINTER_MULTI)
			{
				let vinter_number = (
						(action === this.TRACKING_ACTION_TYPE_VIDEO_STARTED) ||
						(action === this.TRACKING_ACTION_TYPE_REPLAY_VIDEO) ||
						(action === this.TRACKING_ACTION_TYPE_FIRST_QUARTILE) ||
						(action === this.TRACKING_ACTION_TYPE_MIDPOINT) ||
						(action === this.TRACKING_ACTION_TYPE_THIRD_QUARTILE) ||
						(action === this.TRACKING_ACTION_FIRST_COMPLETE_ENGAGEMENTS) ||
						(action === this.TRACKING_ACTION_COMPLETE_ENGAGEMENTS) ||
						(action === this.TRACKING_ACTION_REPLAY)
					) ? window.VINTER_number : 0
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "N/A",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:window.campaign_id || "",
						creative_id:window.creative_id || "",
						custom_tracking: custom_tracking || "N/A",
						custom_tracking_video_position: vinter_number,
						d_country:  window.deviceCountry || "",
						game_igp_code:window.game_igp_code || "N/A",
						ip_country: window.ipCountry || "",
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A",
						source_game:this.GetSourceGameGGI() || 0,
						time_spent_loading: (action === this.TRACKING_ACTION_IMPRESSIONS) ? 0 : loading_time,
						total_time_spent_ads: Math.ceil(gTotalTimeSpent || 0),
						ver: `${window.omsVersion}`
					}
				})
			}
			else if (this.format == this.TRCKING_FORMAT_INTERACTIVE_VIDEO_SWITCH)
			{
				trackdata.events.push({
					gdid:0,
					type: this.TRACKING_EVENT_TYPE_ID,
					token:this.token++,
					data:{
						action_type:action,
						ad:Resource.args["ad"] || "N/A",
						anon_id:decodeURIComponent(window.anonymous) || "",
						campaign_id:window.campaign_id || "",
						creative_id:window.creative_id || "",
						custom_tracking: custom_tracking || "N/A",
						d_country:  window.deviceCountry || "",
						ip_country: window.ipCountry || "",
						score: this.evTrack[action].send_score ? this.score : 0,
						source_game:this.GetSourceGameGGI() || 0,
						game_igp_code:window.game_igp_code || "N/A",
						time_spent_loading: (action === this.TRACKING_ACTION_IMPRESSIONS) ? 0 : loading_time,
						total_time_spent_ads: Math.ceil(gTotalTimeSpent || 0),
						total_time_spent_playing: this.evTrack[action].send_time_spent ? Math.ceil(gIngameTimeSpent || 0) : 0,
						ver: `${window.omsVersion}`,
						iv_location_type: Utils.IsIVPointcut() ? 'IV' : 'non-IV',
						rim_pointcut_id:Resource.args["location"] || "N/A"
					}
				})
			}

			if (this.evTrack[action].pixel_tracking)
			{
				let url = this.evTrack[action].pixel_tracking;

				// incase user want to update timestamp at runtime
				{
					url = url.replace("{[timestamp]}", "[timestamp]");
					url = url.replace("[timestamp]", Date.now());
				}

				let img = new Image();
				img.src = url;
				img.style.width = 0;
				img.style.height = 0;
				document.body.appendChild(img);
			}

			this.GLADSSendTracking(action);
		});

		if (this.IsTrackingBeta())
		{
			trackdata.events.forEach(event =>
			{
				event["anon_id"] = decodeURIComponent(window.anonymous) || "";
			});
		}

		if (redirect_url)
		{
			if(window.call_client)
			{
				if (
					typeof mraid !== 'undefined'/* || this.format=== this.TRCKING_FORMAT_MINT_MIG*/
					|| (GameConfig.isUseMraidCallClient)
				)
				{
					window.ets_redirect_data = trackdata;
					window.call_client(window.creative_id, 'click', redirect_url);
				}
				else
				{
					window.ets_redirect_data = trackdata;
					window.call_client(window.creative_id, "GLADS_CLICK_INTERSTITIAL", "click", 0, 0, "", 'link:' + redirect_url);
					if (callback)
					{
						callback(true);
					}
				}
			}
			else if(window.redirect)
			{
				window.redirect(redirect_url);
			}
			else
			{
				window.open(redirect_url, "_blank");
			}
		}
		else
		{
			if (trackdata.events.length > 0)
			{
				// Fixed: dispite of send_one = true, tracking can send empty data to server
				if (GameConfig.isTrackingETS)
				{
					let time = Math.floor(Date.now() / 1000);
					trackdata["ts"] = time + (new Date().getTimezoneOffset() * 60);
					trackdata["uuid"] = this.GetUDID();
					trackdata.events.forEach(event =>
					{
						let evdata = event["data"];

						event["ts"] = time;
						evdata["campaign_id"] = parseInt(evdata["campaign_id"]);
						evdata["creative_id"] = parseInt(evdata["creative_id"]);

						if (evdata["d_country"] == "")
						{
							evdata["d_country"] = "N/A";
						}

						if (evdata["ip_country"] == "")
						{
							evdata["ip_country"] = "N/A";
						}
					});

					this.TRACKING_API_URL = this.TRACKING_API_URL.replace("{ggi}", trackdata["ggi"]);
				}
				let http = this.SendPayload(this.TRACKING_API_URL, actions, trackdata, callback, false);
				return http;
			}

			return false
		}
	};

	SendPayload(url, actions, payload, callback, isRetry)
	{
		let http = new XMLHttpRequest();
		if (!isRetry)
		{
			http.onload = (e) =>
			{
				if (callback)
				{
					callback(true);
					callback = null;
				}
			};

			http.onerror = (e) =>
			{
				if (callback)
				{
					callback(false);
					callback = null;
				}
				actions.forEach(action =>
				{
					if (this.evTrack[action])
					{
						this.evTrack[action].count--;
					}
				});
				this.SendPayload(url, actions, payload, callback, true)
			};
		}
		else
		{
			http.onload = (e) =>
			{
				//retry sucess
				actions.forEach(action =>
				{
					if (this.evTrack[action])
					{
						this.evTrack[action].count++;
					}
				})
			};

			http.onerror = (e) =>
			{
				//retry fail
				setTimeout( () =>
				{
					this.SendPayload(url, actions, payload, callback, true)
				}, 1000)
			};
		}

		// timeout callback : 2s
		if (callback)
		{
			setTimeout( () => {
				if (callback)
				{
					callback(false)
					callback = null
				}
			}, 2000)
		}

		http.open("POST", url, true);
		http.setRequestHeader("Content-type", "application/json");
		http.send(JSON.stringify(payload));

		return http;
	}

	FormatNum(num, min = 4)
	{
		num = num.toString(16);
		return `${'0'.repeat(min - num.length)}${num}`;
	}

	RandInRange(min, max)
	{
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	GetUDID()
	{
		let udid = `
			${this.FormatNum(this.RandInRange(0, 0xffff))}${this.FormatNum(this.RandInRange(0, 0xffff))}-
			${this.FormatNum(this.RandInRange(0, 0xffff))}-
			${this.FormatNum(this.RandInRange(0, 0xffff) | 0x4000)}-
			${this.FormatNum(this.RandInRange(0, 0xffff) | 0x8000)}-
			${this.FormatNum(this.RandInRange(0, 0xffff))}${this.FormatNum(this.RandInRange(0, 0xffff))}${this.FormatNum(this.RandInRange(0, 0xffff))}
        `;

		return udid.replace(/[\t\n\r]/gm, '').trim();
	}

	GLADSSendTracking(action)
	{
		switch (action)
		{
			case this.TRACKING_ACTION_ADS_EXPAND:
				if (window.notifyAdExpand) notifyAdExpand()
				break;

			case this.TRACKING_ACTION_ADS_COLLAPSE:
				if (window.notifyAdCollapse) notifyAdCollapse()
				break;

			case this.TRACKING_ACTION_ENGAGEMENTS:
				if (window.notifyEngagement) notifyEngagement()
				break;

			case this.TRACKING_ACTION_CONFIRMED_ENGAGEMENTS:
				if (window.notifyConfirmedEngagement) notifyConfirmedEngagement()
				break;

			case this.TRACKING_ACTION_REPLAY:
				if (window.notifyReplay) notifyReplay()
				break;

			case this.TRACKING_ACTION_CLOSE:
				if (window.notifyClose) notifyClose()
				break;

			case this.TRACKING_ACTION_TYPE_PLAYER_EXPAND:
				if (window.notifyPlayerExpand) notifyPlayerExpand()
				break;

			case this.TRACKING_ACTION_TYPE_PLAYER_COLLAPSE:
				if (window.notifyPlayerCollapse) notifyPlayerCollapse()
				break;
		}
	}
}
module.exports = new TrackingManager();