const Config = require('./Config')

class Resource
{
    constructor()
    {
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //--DEBUG DIALOG---------------------------------------------------------------------------------------------------------------------------------------------------------
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        (function(resource) {
            if (window.omsPhase !== "gold")
            {
                document.addEventListener("document_ready", function()
                {
                    window._show_touchzone = !1;

                    var Units = {
                        vw: function(val)
                        {
                            return window.innerWidth * val / 100;
                        },
                        vh: function(val)
                        {
                            return window.innerHeight * val / 100;
                        },
                        vmax: function(val)
                        {
                            return Math.max(window.innerHeight, window.innerWidth) * val / 100;
                        },
                        vmin: function(val)
                        {
                            return Math.min(window.innerHeight, window.innerWidth) * val / 100;
                        }
                    };

                    var ShowInfos = function()
                    {
                        var a = document.createElement("div");
                        a.innerHTML = `<style> 
                            .info-close { 
                                position: absolute; 
                                padding: 15px; 
                                cursor: pointer; 
                                right: 0px; 
                                top: 0px; 
                                background-color: red; 
                                color: white; 
                                border: solid 1px lightcoral; 
                                font-size: 20px;
                            } 
                            .info-context {
                                position: absolute;     
                                left: 50%;     
                                top: 50%;     
                                padding: 10px;     
                                padding-top: 30px;     
                                background-color: white;     
                                z-index: 999999999;     
                                border: solid 1px lightslategray;     
                                transform: translate(-50%,-50%);     
                                -webkit-transform: translate(-50%,-50%);     
                                font-size: 14px;     
                                font-family: monospace; 
                                max-height: 80%;
                                min-width: max(280px, 50%);
                                max-width: 80%;
                                display: flex;
                                flex-direction: column;
                            } 
                            .show-cta { 
                                padding: 5px; 
                                cursor: pointer; 
                                background-color: red; 
                                color: white; 
                                border: solid 1px lightcoral; 
                                margin: 5px; 
                                border-radius: 5px; 
                                text-align:center; 
                            } 
                            .info-scroll {
                                overflow-y: auto;
                                overflow-x: hidden;
                                white-space: break-spaces;
                                word-wrap: break-word;
                            } 
                            .info-spacing {
                                height: 20px;
                            }
                        </style>`;
                        var e = document.createElement("div");
                        e.innerHTML = "X";
                        e.className = "info-close";
                        a.appendChild(e);
                        var b = document.createElement("div");
                        b.style.color = 'red';
                        b.className = "info-scroll";

                        b.innerHTML = "<div> MID: " + (window.omsPID || "N/A") + "</div>";
                        b.innerHTML += "<div> Phase: " + window.omsPhase + "</div>";
                        b.innerHTML += "<div> Version: " + window.omsVersion + "</div>";
                        b.innerHTML += "<div> Creative ID: " + (window.creative_id || "N/A") + "</div>";
                        b.innerHTML += "<div> Campaign ID: " + (window.campaign_id || "N/A") + "</div>";
                        b.innerHTML += "<div> Anonymous: " + (window.anonymous || "n/a") + "</div>";
                        b.innerHTML += "<div> FromCache: " + (window.fromCache || "n/a") + "</div>";

                        b.innerHTML += "<div class='info-spacing' />";
                        
                        b.innerHTML += "<div> isOutfit7: " + (window.isOutfit7 || "n/a") + "</div>";
                        b.innerHTML += "<div> isViewabilityMoat: " + (window.isViewabilityMoat || "n/a") + "</div>";
                        b.innerHTML += "<div> creative_type_id: " + (window.creative_type_id || "n/a") + "</div>";
                        b.innerHTML += "<div> location_id: " + (window.location_id || "n/a") + "</div>";
                        b.innerHTML += "<div> ad_type: " + (window.ad_type || "n/a") + "</div>";
                        b.innerHTML += "<div> mraid_ad_id: " + (window.mraid_ad_id || "n/a") + "</div>";
                        b.innerHTML += "<div> moatParameters: " + (JSON.stringify(window.moatParameters, null, 2) || "n/a") + "</div>";

                        b.innerHTML += "<div class='info-spacing' />";

                        b.innerHTML += "<div> isMraidTTD: " + (window.isMraidTTD || "n/a") + "</div>";
                        // in LOCAL, GetParam always return "key"
                        // in OMS, GetParam return "undefined" if key does not exist
                        var use_mraid_ttd = resource.GetParam('use_mraid_ttd') || "use_mraid_ttd";
                        b.innerHTML += "<div> use_mraid_ttd: " + (use_mraid_ttd === "use_mraid_ttd" ? "n/a" : use_mraid_ttd) + "</div>";
                        b.innerHTML += "<div> cta_link: " + (window.cta_link || "n/a") + "</div>";
                        b.innerHTML += "<div> cta_link_esc: " + (window.cta_link_esc || "n/a") + "</div>";
                        b.innerHTML += "<div> type of mraid: " + (typeof window.mraid) + "</div>";

                        b.innerHTML += "<div class='info-spacing' />";
                        
                        b.innerHTML += "<div> strStatsUrl: " + (window.aa || "n/a") + "</div>";
                        b.innerHTML += "<div> os: " + (window.os || "n/a") + "</div>";
                        b.innerHTML += "<div> is_tablet: " + (window.is_tablet || "n/a") + "</div>";
                        b.innerHTML += "<div> deviceCountry: " + (window.deviceCountry || "n/a") + "</div>";
                        b.innerHTML += "<div> ipCountry: " + (window.ipCountry || "n/a") + "</div>";
                        b.innerHTML += "<div> clickID: " + (window.clickID || "n/a") + "</div>";
                        
                        b.innerHTML += "<div class='info-spacing' />";
                        
                        b.innerHTML += "<div> strRewardUrl: " + (window.strRewardUrl || "n/a") + "</div>";
                        b.innerHTML += "<div> rewarded: " + (window.rewarded || "n/a") + "</div>";
                        b.innerHTML += "<div> reward_delivered: " + (window.reward_delivered || "n/a") + "</div>";
                        b.innerHTML += "<div> reward_currency: " + (window.reward_currency || "n/a") + "</div>";
                        b.innerHTML += "<div> reward_amount: " + (window.reward_amount || "n/a") + "</div>";
                        b.innerHTML += "<div> signalRewardToClient: " + (window.signalRewardToClient || "n/a") + "</div>";
                        b.innerHTML += "<div> type of saveReward: " + (typeof window.saveReward) + "</div>";

                        b.innerHTML += "<div class='info-spacing' />";
                        
                        b.innerHTML += "<div> migParams: " + (JSON.stringify(window.migParams, null, 2 || "n/a")) + "</div>";

                        b.innerHTML += "<div class='info-spacing' />";

                        b.innerHTML += "<div> notifyrd: " + (window.notifyrd || "n/a") + "</div>";
                        b.innerHTML += "<div> allowOrientationChange: " + (window.allowOrientationChange || "n/a") + "</div>";
                        b.innerHTML += "<div> forceOrientation: " + (window.forceOrientation || "n/a") + "</div>";
                        b.innerHTML += "<div> useCustomClose: " + (window.useCustomClose || "n/a") + "</div>";
                        b.innerHTML += "<div> can_pause_music: " + (window.can_pause_music || "n/a") + "</div>";
                        b.innerHTML += "<div> ctarequest: " + (window.ctarequest || "n/a") + "</div>";
                        b.innerHTML += "<div> video_ptrackers: " + (window.video_ptrackers || "n/a") + "</div>";
                        b.innerHTML += "<div> token_api: " + (window.token_api || "n/a") + "</div>";
                        b.innerHTML += "<div> gl_device_id: " + (window.gl_device_id || "n/a") + "</div>";
                        b.innerHTML += "<div> targetingInfoUrl: " + (window.targetingInfoUrl || "n/a") + "</div>";
                        b.innerHTML += "<div> game_igp_code: " + (window.game_igp_code || "n/a") + "</div>";
                        b.innerHTML += "<div> iv_location_type: " + (window.iv_location_type || "n/a") + "</div>";
                        b.innerHTML += "<div> game_fullname: " + (window.game_fullname || "n/a") + "</div>";
                        b.innerHTML += "<div> deviceSoundVolume: " + (window.deviceSoundVolume || "n/a") + "</div>";

                        a.appendChild(b);
                        var d = document.createElement("div");
                        d.className = "show-cta";
                        d.innerHTML = window._show_touchzone ? "Hide touch zones" : "Show touch zones";
                        a.appendChild(d);

                        var clearLB = document.createElement("div");
                        clearLB.className = "show-cta";
                        clearLB.innerHTML = "Clear my LB entry";
                        clearLB.onclick = function()
                        {
                            Leaderboard.DeleteMyEntry()
                            .then(response =>
                            {
                                alert("Your LB entry was deleted!");
                            })
                            .catch(error =>
                            {
                                alert(error);
                            })
                        };
                        a.appendChild(clearLB);

                        var clearProfile = document.createElement("div");
                        clearProfile.className = "show-cta";
                        clearProfile.innerHTML = "Clear my profile";
                        clearProfile.onclick = function()
                        {
                            UserProfile.Save({})
                            .then(response =>
                            {
                                alert("Your profile was deleted!");
                            })
                            .catch(error =>
                            {
                                alert(error);
                            })
                        };
                        a.appendChild(clearProfile);

                        e.onclick = function()
                        {
                            try
                            {
                                document.body.removeChild(a)
                            }
                            catch(b){}
                        };
                        d.onclick = function(a)
                        {
                            a.preventDefault();
                            window._show_touchzone = !window._show_touchzone;
                            window._show_touchzone ? window.showTouchZone && setTimeout(window.showTouchZone, 1) : window.hideTouchZone && setTimeout(window.hideTouchZone, 1);
                            d.innerHTML = window._show_touchzone ? "Hide touch zones" : "Show touch zones";
                            return !1
                        };
                        a.className = "info-context";
                        document.body.appendChild(a)
                    },

                    c = !1,
                    start_touch = function(a)
                    {
                        c = !1;
                        a = a.touches ? a.touches[0] : a;
                        a.clientX < Units.vw(10) && a.clientY > Units.vh(90) && (c = !0)
                    },
                    end_touch = function(a)
                    {
                        a = a.changedTouches ? a.changedTouches[0] : a;
                        c && a.clientX > Units.vw(90) && a.clientY > Units.vh(90) && ShowInfos();
                        c = !1
                    };

                    document.body.addEventListener("touchstart", start_touch);
                    document.body.addEventListener("touchend", end_touch);
                    document.body.addEventListener("mousedown", start_touch);
                    document.body.addEventListener("mouseup", end_touch);
                });
            }
        })(this);

        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------

        this.args	= {};

        let params	= decodeURI((window.strStatsUrl || '').split('?').pop()).split('&');

		params.forEach(param =>
		{
            let data = param.split('=');

            this.args[data[0]] = decodeURIComponent(data[1]);
        });

        if (window.omsAws)
        {
            window.isDisableIFrameLoader = true;
        }
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Init(callback)
    {
        if (!window.isDisableIFrameLoader)
        {
            this.requesterCallback = {};
            this.DeliveryTagCreateRequester(callback);
        }
        else
        {
            callback && callback();
        }

        if (window.creative_id && window.omsPID && window.omsPhase && window.omsPhase != 'gold')
        {
            this.Request('post', `${Config.REST_API_SERVER}/api/pri/projects/cnumber/${window.omsPID}/${window.omsPhase}`, JSON.stringify({number: window.creative_id}))
            .then(response =>
            {
            })
            .catch(error =>
            {
                console.log(error);
            })
        }
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Request(method, url, body, responseType)
	{
		return new Promise((resolve, reject) =>
		{
			var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            if (method == 'post')
            {
                xhr.setRequestHeader("Content-type", "application/json");
            }

            if (responseType)
            {
                xhr.responseType = responseType;
            }

			xhr.onreadystatechange = () =>
			{
				if (xhr.readyState == 4)
				{
					if(xhr.status == 200 || window.fromCache == '1')
					{
						resolve(xhr.response);
					}
					else
					{
						reject("error");
					}
				}
			}
			xhr.send(body);
		})
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    CreateObjectURL(blob)
    {
        const Url = window.URL || window.webkitURL;
        return Url.createObjectURL(blob);
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    RevokeObjectURL(link)
    {
        if (link.startsWith('blob:'))
        {
            const Url = window.URL || window.webkitURL;
            Url.revokeObjectURL(link);
        }
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    LoadCSS(name)
    {
        this.GetAssetData(name, 'text')
        .then(response =>
        {
            let style = document.createElement("style");
            style.innerHTML = response;
            document.head.appendChild(style);
        })
        .catch(error => {})
    }

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    LoadFont(name, path)
    {
        return new Promise((resolve, reject) =>
        {
            let style = document.createElement("style");
            document.head.appendChild(style);

            this.GetAssetUrl(path, 'arraybuffer')
            .then(response =>
            {
                if (response instanceof ArrayBuffer)
                {
                    let arr = new Uint8Array(response);
                    let fontData = arr.reduce((result, currentValue) => {
                        return result + String.fromCharCode(currentValue);
                    }, '');

                    response = `data:;base64,${window.btoa(fontData)}`;
                }
                style.innerHTML = "@font-face{font-family: " + name + ";src: url(" + response + ");}";

                let checker = document.createElement("span");
                checker.style.position      = "absolute";
                checker.style.visibility    = "hidden";
                checker.style.opacity       = "0";
                checker.style.top           = "-9999px";
                checker.style.left          = "-9999px";
                checker.style.fontSize      = "250px";
                checker.style.fontFamily    = "monospace";
                checker.innerHTML           = 'qwertyuiopasdfghjklzxcvbnm1234567890';
                document.body.appendChild(checker);

                let initWidth = checker.offsetWidth;
                checker.style.fontFamily = name;

                let checkTime = (new Date()).getTime();
                let checkFont = function()
                {
                    let fontWidth = checker.offsetWidth;
                    if (initWidth !== fontWidth)
                    {
                        resolve();
                    }
                    else if (new Date().getTime() - checkTime > 1000)
                    {
                        reject();
                    }
                    else
                    {
                        setTimeout(checkFont, 30);
                    }
                };
                checkFont();
            })
            .catch(error => reject(error));
        })
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    SaveForm(deviceid, data)
    {
        let payload = {
            token: window.token || 'browser',
            campaign_id: window.campaign_id || 'NA',
            creative_id: window.creative_id || 'NA',
            device_identificator: deviceid,
            data: data
        }

        return this.Request('post', `${Config.REST_API_SERVER}/acq/save_form`, JSON.stringify(payload));
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    CheckConstraints(deviceid, data)
    {
        let payload = {
            token: window.token || 'browser',
            campaign_id: window.campaign_id || 'NA',
            creative_id: window.creative_id || 'NA',
            device_identificator: deviceid,
            data: data
        }

        return this.Request('post', `${Config.REST_API_SERVER}/acq/check_constraints`, JSON.stringify(payload));
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetCTALink(id)
    {
        id = id || "CTA1";
        let ctas = JSON.parse(window.ctarequest || "{}");
        let cta = ctas[id] || "https://cta_link_" + encodeURIComponent(id) + "_does_not_configured_in_the_acq.com";
        cta = cta.replace("link:", "");

        return cta;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    Base64ToArrayBuffer(data)
    {
        let binaryString = window.atob(data.split('base64,')[1].replace(/\s/g, ""));
        let bytes        = new Uint8Array(binaryString.length);

        for (let i = 0; i < binaryString.length; i++)
        {
            bytes[i] = binaryString.charCodeAt(i);
        }

        return bytes.buffer;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    GetAssetName(path)
    {
        if (window.omsPublish)
        {
            let key = path.replace(/(\.|\/)/g, '_').toLowerCase();
            if (omsEmbeds[key])
            {
                return omsEmbeds[key];
            }
            return omsAssets[key];
        }
        return path;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    GetAssetUrl(path, responseType)
    {
        let assetName = this.GetAssetName(path);

        if (window.fromCache == '1')
        {
            if (!assetName)
            {
                return this.Request('get', Config.ASSET_URL.replace("{name}", path), null);
            }
            else if (assetName.startsWith("data:"))
            {
                return new Promise((resolve, reject) =>
                {
                    if (responseType == 'arraybuffer')
                    {
                        resolve(this.Base64ToArrayBuffer(assetName));
                    }
                    else
                    {
                        resolve(assetName);
                    }
                });
            }
            else
            {
                return new Promise((resolve, reject) =>
                {
                    resolve(assetName);
                });
            }
        }

        if (!window.omsPublish)
        {
            if (path != "reward.121.default.png")
            {
                return new Promise((resolve, reject) =>
                {
                    resolve(path);
                });
            }
        }

        if (!assetName) //Reward Icon
        {
            // return this.Request('get', Config.ASSET_URL.replace("{name}", path), null);
            assetName = path;
        }
        if (assetName.startsWith("data:"))
        {
            return new Promise((resolve, reject) =>
            {
                if (responseType == 'arraybuffer')
                {
                    resolve(this.Base64ToArrayBuffer(assetName));
                }
                else
                {
                    resolve(assetName);
                }
            });
        }
        else if (!window.isDisableIFrameLoader && responseType != 'url')
        {
            return new Promise((resolve, reject) =>
            {
                this.DeliveryTagGetAssetData(assetName, responseType)
                .then(response =>
                {
                    resolve(response);
                })
                .catch(error =>
                {
                    reject(error);
                });
            });
        }

        if (!window.omsAws)
        {
            if (gIsUseURLTimestamp)
            {
                return this.Request('get', Config.ASSET_URL.replace("{name}", assetName).replace("{time}", (new Date().getTime())), null);
            }
            else
            {
                return this.Request('get', Config.ASSET_URL.replace("{name}", assetName).replace("?{time}", ""), null);
            }
        }
        return Promise.resolve(Config.AWS_ASSET_URL.replace("{name}", assetName));
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    GetAssetData(path, responseType = 'arraybuffer')
    {
        return new Promise((resolve, reject) =>
        {
            this.GetAssetUrl(path, responseType)
            .then(response =>
            {
                if (window.isDisableIFrameLoader)
                {
                    if (response instanceof ArrayBuffer)
                    {
                        resolve(response);
                    }
                    else
                    {
                        this.Request('get', response, null, responseType)
                        .then(response =>
                        {
                            resolve(response);
                        })
                        .catch(error => reject(error));
                    }
                }
                else
                {
                   resolve(response);
                }
            })
            .catch(error => reject(error));
        })
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    IsSupportReward()
    {
        return window.reward_currency && window.reward_currency != '{[rewardCurrency]}';
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    GetRewardIcon()
    {
        // WKWebkit test app
        if (`${this.args['game_id']}` == "649")
        {
            return 'reward.121.default.png';
        }

        let currency = this.IsSupportReward() ? window.reward_currency : 'default';
        return `reward.${this.args['game_id'] || '121'}.${currency}.png`;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    GetParam(key)
    {
        if (window.omsPublish)
        {
            return omsParams[key];
        }
        return key;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//-- DELIVERY TAG ---------------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    DeliveryTagCreateRequester(callback)
    {
        let loader = "loader_without_timestamp.html";
        if (gIsUseURLTimestamp)
        {
            loader = "loader.html"
        }

        this.Request('get', `${Config.ASSET_URL.replace("{name}", loader).replace("?{time}", "")}`, null, 'text')
        .then(response =>
        {
            let iframe           = document.createElement('iframe');
            iframe.src           = response;
            iframe.id            = 'requester'
            iframe.style.display = 'none';
            document.body.appendChild(iframe);

            iframe.onload = () =>
            {
                callback && callback();
            }
        })
        .catch(error =>
        {

        });

        window.onmessage = (event =>
        {
            let data = event.data
            if (data.key)
            {
                this.requesterCallback[data.key](data);
            }
        })
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    DeliveryTagSendRequest(name, responseType, callback)
    {
        let key = name.replace(/(\.|\/)/g, '_').toLowerCase();
        let request =
        {
            "key": key,
            "name": name,
            "type": responseType,
        }

        var iframe = document.getElementById('requester');
        iframe.contentWindow.postMessage(request, "*");

        this.requesterCallback[key] = callback;
    }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    DeliveryTagGetAssetData(name, responseType)
    {
        return new Promise((resolve, reject) =>
        {
            this.DeliveryTagSendRequest(name, responseType, (data) =>
            {
                if (data.response)
                {
                    resolve(data.response);
                }
                else
                {
                    reject(data.error);
                }
            })
        })
    }
}
module.exports = new Resource();