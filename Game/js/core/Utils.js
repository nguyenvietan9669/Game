const Gui			  = require('./modules/aurora/Gui')
const GLPack		  = require('./modules/aurora/GLPack')
const GLSpriteReader  = require('./modules/aurora/GLSpriteReader')
const GLSpriteManager = require('./modules/aurora/GLSpriteManager')

class Utils
{
    constructor()
    {
        this.token			= new PIXI.Container();
        this.advertisement	= new PIXI.Text();
        this.tokenIcon		= null;
        if(!GameConfig.isCustomInfoBtn)
        {
            this.infoBtn        = PIXI.Sprite.fromImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDgxMTExNzk0RUQ4MTFFOTk5NjNGMEZGMzQyOTNCMzIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDgxMTExN0E0RUQ4MTFFOTk5NjNGMEZGMzQyOTNCMzIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEODExMTE3NzRFRDgxMUU5OTk2M0YwRkYzNDI5M0IzMiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEODExMTE3ODRFRDgxMUU5OTk2M0YwRkYzNDI5M0IzMiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph3W7VMAAASJSURBVHjazFhNTGNVFH5taQsdeZgBbUKD0loEaWAjWELLnwJONJOwHBJcmXFMAHXPFtiRGAsb2Yn8RFYs0FHA8NOO1KYbQMTBgTKkICPOxCLlp4V6PnOfefPCDO92iniTrzn3tfd8X+/fO+doEomEwNmshLcJbsJrhJcJIvsuQtgg/EzwEr4lrHN5hyAV0BJuEOYIpwn17ZSNucF8nMulUTFDbxE+IxSjc3h4GJ+bm3swOzu76/f7IysrK9GdnZ0YvjObzfqioiKT0+kUq6urc6qqql5MT09PY36WCR8Rpp5G9jRB6YRPCbfQ2dra2u/r67vX29sbjkQiJ2pmXxRFXVtbm6W1tdWem5trYo8/J3yM/8YjKJvwDaE8FoudeDyeux0dHes0O6dCEo1mSdvV1WVtb29/Va/X6+hRgPAu4Xc1gl4gzBKKtre395ubm4MzMzMRIQWtpqZGHBoaKmOz9QuhSilKKQg//J7gXF1d/bOxsfHHUCh0JKSw5efnGycmJt6w2+1Z1PUT3iREnyQI63sT+6WiosK3ubl5LFxAy8vLM8zPz7topq5Qt5/wgfSdVnGabh4fH59gmS5KDBp8gwNc4GTcjwnC0fTAoFN0l4606j1jtVqNw8PDDgC22nHgABfrepiGf5fsPcIXWCqbzTZ9dHSk+vpeWFioLCkpuQp7cXHxYWlp6R21Y41Go2Ztba2ObXJo+FKaoVtsdu7xiEErLCzMktnP84wFF3H+yrofSkuGd1PlwcFBnC6+MO9+GB0d3ZDZId7x4AQ3NEBLGntRarxe747aG1jeWlpalknIb/F4PDE+Pv6Idzw4wd3Q0GCh7jUte2sL09PTfyR7arAPdTqdJtnxMm43BDlgBQKBpG7jgYGB4rGxsUoAdjI+gsGgxF2MUwZ1Vy0Wy3d0yrjvHtqY7xgMhn8OB90rp3Ryvub1QafMEA6HG8l8BEeZeLi7uxtL5t9JYpQ2T5NxP6cV/mcNgvZg5OTk6C9LhIz7Lwi6D8vhcJguS5CMewOCfoJVVlYmXpYgGfeylmUHQl1dXfZlCZJxe7UsVUm43W4zYuD/Wgw4wQ0NhNtaljf9kJGRkUbBuCWZW/pZGjjBTSaihHXp2PfigzKEVxAS8DhcWlp6KNkIP3jGgguc0ntWHqB9hWwTIWVnZ6eNx2lTU1NwZGQkNDg4uA6bZ2x3d7eNhbErTMNjMXU9YQJhZX19vY+SwchF7h1KIsXJyUkX3e7Ytw2ESWVMjQf9+AH949cRiF+UGPgGBxPTL4lRCkL7BKkJpnFqasqJlCXVYuATvtlS+Rmn8CRByI+uY00LCgqyfD5fJaY2VWIo3xfhE75ZonhdnpOdJUhgmWQ1QiQ2U66enh7u06c8TfCBPcNmJnBW1npesSGDpSfvo0Pxyj4CcoqBt/b29lSFupmZmTq6Z3LpaNsp3rryLMUGZTnGw4pTQjQajdG0P0DYiSjzrHJMeXm5WFtbm+1yucwmk0kqx6CI1X5eOYa3YHUniYKVL9UFq7NKetdkJb2XFCW9+7KS3m3ekt7fAgwA27bbtHTTq84AAAAASUVORK5CYII=");
        }
        this.isGameExit		= false;

        this.loadingImg     = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAAAWlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////9ZMre9AAAAHXRSTlMAbRoMdJEqMn06VrqFX0wSQ64jo8Nmm/Xu08vj2/8rOKIAAAJySURBVEjHldSL0rIgEIDhBQUSxfMx8/5v899dofzN1O8lZ2ymZxZqDA6TpVBV2vYG/lCSteOyNpe3lUuXTZMELrpS0/J/7g4z6bJP+XlnVIzLVxkZZr9k1C+fhnCTA3YGZbpTXEUmsCNYEBt2cuylZ0F/yWoZAuPmtsk67T8fFraDimfworvGFuDbsaLYMrcMGBN89Rp2ESNT4LWZWM/LOA6etga+8rM4+YENMoqYgsOIeSfBVyIJUMCPkElfOGI1zhQ5Zse9WRiYzKFBwUlvVq9QjS9uHlM4K/IKA0w+XxP3mhM4jRU5TSfMkXFzDxfVBMnRRrPX9KSmyVw5RMy0xvsKGbsGrop0cBGY9vlsqcnCZYQoI8ES4+prJ9Gwq0GsLG2r4q4zuOCBLsXaBm45huiyJ6G0bfsbrjA8DQOFjrrvOMj+4qQJQdyma39xiYEu9TXFDZcYXomGPK24tKqvnU6YkTOEGObXLrBSglQBqksmy2StLABE1XBVpa+cIcfRbHIM48tx3pWGfkvV+K4GJvkKSzwe1jU9hTA7ZTpHt7a+Z8bUnTCZY6xyDZzoFUWw/Mmi3HqY5wVwmpS3v2CRW4uQM+Bzq2FrD5m0zr5hBL4iUyrDxQn5zZKuI8fU1vDOsGCML7uT2onOOYK02QQ2WTahh9WbR8DFovOOaATbnHojLHvEjg5jrYtjIVZH1O33Ap1itCtGxi7APYPIqQ+LOY/YMewcsX2WXWAPREGhowROO8o8VkgGFV0hUqKM4DjpeGTMbDuPchp+pzvvmH6KuySC07SNSQpaHO3XJbf+7KyIN1+pK2u4WSRNyQ9AafTxpH9QqEZvVVNdCQAAAABJRU5ErkJggg==";
        this.loadingAngle   = 0;
        this.loadingWidth   = 0;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    PrintObject (obj)
    {
        var o = {}
        for (var key in obj)
        {
            o[key] = String(obj[key])
        }
        console.log(o)
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Log(...texts)
    {
        if (window.DEBUG)
        {
            console.log.apply(this, texts);
        }
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    IsOnDevie()
    {
        if (window.DEBUG || window.REVIEW)
        {
            return false;
        }

        return true;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    OMSGetRoot(filename)
    {
        return filename;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    OMSGetData(filename)
    {
        return "data/" + filename;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    OMSGetGuiData(filename)
    {
        return "data/gui/" + filename
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    OMSGetImage(filename)
    {
        return "data/image/" + filename;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    OMSGetToken()
    {
        return Resource.GetRewardIcon();
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    OMSGetProductLink(id)
    {
        /*if (window.ctarequest)
        {
            id = id || "CTA1";
            return resource.get_cta_link(id);
        }*/
		return Resource.GetParam("redirect_url");
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    RedirectInfo(custom_tracking)
    {
        if (window.DEBUG || window.REVIEW)
        {
            window.open('https://ingameads.gameloft.com/ads/adserver/ad_targeting_info.php?lang=en&data=%7B%22game%22%3A%22DAMA%22%2C%22device%22%3Atrue%7D');
        }
        else
        {
            if (typeof window.targetingInfoUrl === 'string')
            {
                window.targetingInfoUrl = window.targetingInfoUrl.startsWith('link:') ? window.targetingInfoUrl : 'link:'+ window.targetingInfoUrl;
            }
            else if (typeof window.migParams === 'object' && typeof window.migParams.targetingInfoUrl === 'string')
            {
                window.targetingInfoUrl = window.migParams.targetingInfoUrl.startsWith('link:') ? window.migParams.targetingInfoUrl : 'link:'+ window.migParams.targetingInfoUrl;
            }
            else
            {
                window.targetingInfoUrl = "";
            }
            if (window.mraid)
            {
                window.targetingInfoUrl = window.targetingInfoUrl.replace('link:', '');
            }

            TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_CLICK_INFO, function(){
                !!window.targetingInfoUrl && window.redirect(window.targetingInfoUrl);
            }, custom_tracking);
        }
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Rand(min, max)
    {
        return (Math.random() * (max - min)) + min;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    RandInt(min, max)
    {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    AddLogText(value) {
        if (this.mMainDivLogText == undefined) {
            var logStyle = document.createElement('style');
            logStyle.innerText = `
        .main_div_log_text{width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 99999; pointer-events: none; text-align: left; overflow: hidden; margin: 0; padding: 0;}
            .main_div_log_text div{width: 100%; height: 100%; padding: 0; margin: 0; text-align: left; overflow-x: hidden; overflow-y: auto; pointer-events: none;}
                .main_div_log_text div p{display: inline; margin: 0; padding: 0; font-family: 'Arial'; color: #00ff00; background-color: rgba(0, 0, 0, 0.3); font-size: 2vmax;}
    `;
            //
            this.mMainDivLogText = document.createElement('div');
            this.mMainDivLogText.classList.add('main_div_log_text')
            //
            this.mDivLogText = document.createElement('div');
            //
            document.head.appendChild(logStyle);
            document.body.appendChild(this.mMainDivLogText);
            this.mMainDivLogText.appendChild(this.mDivLogText);
        }
        var newP = document.createElement('p');
        newP.innerText = '' + value;
        newP.appendChild(document.createElement('br'));
        this.mDivLogText.appendChild(newP);
        this.mDivLogText.scrollTop = this.mDivLogText.scrollHeight;
        // //remove node
        while (
            this.mDivLogText.childNodes.length > 2
            && this.mDivLogText.lastChild.offsetTop >= 0.95 * this.mDivLogText.getBoundingClientRect().height
        ) {
            this.mDivLogText.removeChild(this.mDivLogText.firstChild);
        }
    }
    
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Normalized(x1, y1, x2, y2)
    {
        var x = x1 - x2;
        var y = y1 - y2;
        var length = Math.sqrt(x * x + y * y);

        return {x: x / length, y: y / length};
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Collision2Rect(rect1, rect2)
    {
        if (
            Math.max(rect1.x, rect1.x + rect1.width) < Math.min(rect2.x, rect2.x + rect2.width)
            || Math.min(rect1.x, rect1.x + rect1.width) > Math.max(rect2.x, rect2.x + rect2.width)
            || Math.max(rect1.y, rect1.y + rect1.height) < Math.min(rect2.y, rect2.y + rect2.height)
            || Math.min(rect1.y, rect1.y + rect1.height) > Math.max(rect2.y, rect2.y + rect2.height)
        )
        {
            return false;
        }

        return true;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    CollisionPointRect(px, py, rect)
    {
        if (px < rect.x || py < rect.y || px > rect.x + rect.width || py > rect.y + rect.height)
        {
            return false;
        }

        return true;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    InitInfo()
    {
        this.infoBtn.anchor.set(0.5);
        this.infoBtn.interactive = true;
        this.infoBtn.hitArea = new PIXI.Rectangle(-40, -40, 80, 80);

        return this.infoBtn;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    InitToken(texture, scale)
    {
        if (this.token.children.length == 0)
        {
            this.tokenIcon = new PIXI.Sprite(texture);
            this.tokenIcon.scale.set(scale, scale);
            this.token.addChild(new PIXI.Text(""));
            this.token.addChild(new PIXI.Text(""));
            this.token.addChild(this.tokenIcon);
        }
        else
        {
            this.tokenIcon.texture = texture;
            this.tokenIcon.scale.set(scale, scale);
        }

        return this.token;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    SetTokenInfo(text, style)
    {
        let x			= 0;
        let rewardText	= text.replace("%d", this.GetRewardAmount()).split("%token%");
        for (let i = 0; i < rewardText.length; i++)
        {
            let token			= this.token.getChildAt(i);
            token.text			= rewardText[i];
            token.style			= style;
            token.position.x	= x;

            if (i == 0)
            {
                x += token.width;
                this.tokenIcon.position.set(x, (token.height - this.tokenIcon.height) / 2);
                x += this.tokenIcon.width;
            }
        }
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    InitAdvertisement(text, style)
    {
        this.advertisement.text		= text;
        this.advertisement.style	= style;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    SendTrackingAndExit(customTrackingData)
    {
        if (!this.isGameExit)
        {
            this.Log("ExitGame")

            AudioManager.StopAll();

            this.isGameExit = true;
            TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_CLOSE, this.ExitGame.bind(this), customTrackingData);
            if (!window.REVIEW)
            {
                setTimeout(this.ExitGame, 1500);
            }
        }
    };

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    GetRewardAmount()
    {
        if ((typeof reward_amount) != 'undefined')
        {
            return reward_amount;
        }

        return 5;
    };

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    ExitGame()
    {
        if (typeof VPaid != 'undefined')
        {
            VPaid.skipAd();
        }
        else if (typeof mraid == 'undefined')
        {
            if (GameConfig.isUseBanner && window.REVIEW)
            {
                BANNER.Show();
                iView.setBanner(true);
                this.isGameExit = false;
            }
            else
            {
                redirect("exit:");
            }
        }
        else
        {
            if (GameConfig.isUseBanner)
            {
                window.location = "mraid://close";
            }
            else
            {
                if (typeof reward_currency !== 'undefined' && (window.creative_type_id != '18'))// mraid incentivized
                {
                    mraid.closeWithReward(reward_currency, true);
                }
                else
                {
                    mraid.close();
                }
            }
        }
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    DispatchEvent(eventName)
    {
        var evt;
        try
        {
            evt = new Event(eventName);
        }
        catch(e)
        {
            evt = document.createEvent('Event');
            evt.initEvent(eventName, true, true);
        }
        document.dispatchEvent(evt);
    };

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    PauseHostGameMusic()
    {
        if (window.can_pause_music && can_pause_music == 1)
        {
            window.location = "pauseusermusic:";
        }
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    LoadAssets(assets, progress, success, error, loader = PIXI.loader)
	{
		loader.on("progress", progress);
		loader.on("error", error);
		loader.on("complete", success);

		let count	= 0;
		let length	= assets.length;

		for (let asset of assets)
		{

			let options = asset.options || {};
			if (options.loadType == PIXI.loaders.Resource.LOAD_TYPE.IMAGE)
			{
				loader.add(asset.name, asset.url, options);
				count++;
				if(count >= length)
				{
					loader.load();
				}
			}
			else
			{
				Resource.GetAssetUrl(asset.url, 'blob')
				.then(response =>
				{
                    let url = response;
                    if (window.fromCache == '1')
                    {
                        loader.add(asset.name, url);
                    }
                    else
                    {
                        if (response instanceof Blob)
                        {
                            url = Resource.CreateObjectURL(response);
                            if (response.type == "image/jpeg" || response.type == "image/png")
                            {
                                options.loadType = PIXI.loaders.Resource.LOAD_TYPE.IMAGE;
                            }
                            else if (response.type == "application/json")
                            {
                                options.xhrType = PIXI.loaders.Resource.XHR_RESPONSE_TYPE.JSON;
                            }
                        }

                        try
                        {
                            loader.add(asset.name, url, options);
                        }
                        catch(e)
                        {
                            this.Log(e)
                        }
                    }

					count++;
					if(count >= length)
					{
						loader.load();
					}
                })
                .catch(err =>
                {
                    this.Log(err)
                    if (asset.name != "imgToken" && StateManager.GetCurrentState() == StatePreLoad)
                    {
                        this.SendTrackingAndExit();
                    }
                    else
                    {
                        if(error) error();
                        if(asset.name == "imgToken") count++;
                    }
                })
			}
		}
	}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    LoadPackage(id, success, error)
    {
        let assets = [];
        let pixiLoader = new PIXI.loaders.Loader();
        for (let index in CoreHeader[id])
        {
            let info = CoreHeader[id][index];
            if (info.alias)
            {
                assets.push(
                {
                    alias: info.alias,
                    url: this.OMSGetImage(info.image),
                    options: { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR }
                });
            }
        }

        let promises = [];
        for (let asset of assets)
        {
            let options = asset.options || {};
            if (pixiLoader.resources[asset.alias])
            {
                return;
            }

            promises.push(new Promise((resolve, reject) =>
            {
                Resource.GetAssetUrl(asset.url, 'blob')
                .then(response =>
                {
                    let url = response;
                    if (response instanceof Blob)
                    {
                        url = Resource.CreateObjectURL(response);
                        if (response.type == "image/jpeg" || response.type == "image/png")
                        {
                            options.loadType = PIXI.loaders.Resource.LOAD_TYPE.IMAGE;
                        }
                    }

                    pixiLoader.add(asset.alias, url, options);
                    resolve && resolve();
                })
                .catch(error =>
                {
                    reject && reject(error);
                })
            }))
        }

        Promise.all(promises).then(evt =>
        {
            pixiLoader.load()
            .once('error', error)
            .once('complete', evt =>
            {
                Resource.GetAssetData(this.OMSGetGuiData(id))
                .then(response =>
                {
                    GLPack.Load(response);
                    let itemId = -1;
                    for (let index in CoreHeader[id])
                    {
                        itemId++;
                        let info = CoreHeader[id][index];
                        if (info.type == CORE_SPRITE)
                        {
                            let spritedata = GLSpriteReader.Load(GLPack.GetData(itemId));
                            GLSpriteManager.Add(info.id, pixiLoader.resources[info.alias].texture, spritedata);
                        }
                        else
                        if (info.type == CORE_GUI)
                        {
                            let gui = new Gui();
                            gui.Load(GLPack.GetData(itemId));
                            GuiManager.Add(info.id, gui);
                        }
                    }
                    GLPack.Close();
                    success && success();
                })
                .catch(err =>
                {
                    error();
                })
            })
        })
        .catch(err =>
        {
            console.log(err);
            error();
        })
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    SendMoatEvent()
    {

    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    InitMoatEvent(video, v_duration)
    {
        let MoatApiReference = initMoatTracking(video, moatParameters, v_duration,'gameloftjsvideoint978229678926', video.src);
        this.SendMoatEvent = function(e)
        {
            try
            {
                MoatApiReference.dispatchEvent({
                    'type' : e,
                    'adVolume' : deviceVolume
                });
            }catch(e){};
        };
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    AddLoadingWheel()
    {
        let loading = document.getElementById('loading_wheel');
        if(loading != null && loading != undefined)
        {
            return;
        }
        let img = new Image();
        img.src = this.loadingImg;
        img.id = 'loading_wheel';
        img.style.position = 'absolute';
        img.onload = () =>
        {
            this.loadingWidth = img.width;
            img.style.left = (window.innerWidth - img.width)/2 + 'px';
            img.style.top = (window.innerHeight - img.height)/2 + 'px';
            document.body.appendChild(img);
        };
        img.style.transform = 'rotate(' + this.loadingAngle + 'deg)';

    }

    RemoveLoadingWheel()
    {
        let loading = document.getElementById('loading_wheel');
        if(loading != null && loading != undefined)
        {
            loading.parentNode.removeChild(loading);
        }
    }

    UpdateLoadingWheel(deltaTime)
    {
        var loading = document.getElementById("loading_wheel");
        if(loading)
        {
            this.loadingAngle = (this.loadingAngle + 240*deltaTime) % 360;
            loading.style.transform = "rotate(" + this.loadingAngle + "deg)";
            loading.style.left = (window.innerWidth - this.loadingWidth)/2 + 'px';
            loading.style.top = (window.innerHeight - this.loadingWidth)/2 + 'px';
        }
    }

    GetFontSize(heightTarget, fontName)
    {
        var obText = new PIXI.Text('0', {fontFamily : fontName});
        var count = 0;
        var fontSize = 100;
        obText.style.fontSize = fontSize;
        do{
            count ++;
            fontSize *= heightTarget/obText.height;
            obText.style.fontSize = fontSize;
        }while(Math.abs(heightTarget - obText.height) > 1 && count < 5)
        return Math.round(fontSize);
    }

    IsIVPointcut()
	{
		return typeof(window.iv_location_type) != 'undefined' && window.iv_location_type === '1';
	}
    CopyToClipboard(str) {
		const el = document.createElement('textarea');
		var isIOS = navigator.userAgent.search(/(iPad|iPhone|iphone|iPod)/) != -1
		el.value = str;
		document.body.appendChild(el);

		if (isIOS) {
			el.contentEditable = true;
			el.readOnly = false;

			var range = document.createRange();
			range.selectNodeContents(el);
			var sel = window.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
			el.setSelectionRange(0, 999999);
		}
		else {
			el.setAttribute('readonly', '');
			el.select();
		}
		document.execCommand('copy');
		document.body.removeChild(el);
	}

}
module.exports = new Utils();