class AudioElement
{
	constructor()
	{
		this.url		= "";
		this.ext		= "";
		this.player		= null;
		this.isLoaded	= false;
		this.isLoop		= false;
		this.callback	= null;
		this.onEndAudio	= null;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Init()
	{
		if (this.player)
		{
			delete this.player;
		}
		this.isLoaded = false;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetExtension(url)
	{
		return url.substr(url.lastIndexOf('.'), 4);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetSource(source)
	{
		if (this.player)
		{
			delete this.player;
		}

		this.player = new Audio();
		Resource.GetAssetUrl(source)
		.then(response =>
		{
			this.player.src = response;
			this.player.volume	= 1;
			this.player.preload = "auto";
			this.player.load();
		})
		.catch(error =>
		{
			Utils.DispatchEvent("LoadingError");
		})

	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Onload()
	{
		if (this.callback !== null)
		{
			this.callback();
		}
		this.isLoaded = true;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsLoaded()
	{
		return this.isLoaded;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load(url, callback)
	{
		if (url != "")
		{
			this.isLoaded	= false;
			this.url		= url;
			this.callback	= callback;
			this.ext		= this.GetExtension(url);

			this.SetSource(url);
			this.CheckStatus();
		}
		else
		{
			callback();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	OnEndAudio()
	{
		this.player.currentTime = 0.0;
		this.player.play();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	CheckStatus()
	{
		if (this.player && this.player.readyState == 4)
		{
			if (this.callback != null)
			{
				this.callback();
			}
			this.isLoaded = true;
		}
		else if (this.player && this.player.error)
		{
			Utils.DispatchEvent("LoadingError");
		}
		else
		{
			setTimeout(this.CheckStatus.bind(this), 50);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Stop()
	{
		if (this.player)
		{
			try
			{
				if(!this.player.paused)
				{
					this.player.pause();
					this.player.currentTime = 0.0;
					if (this.isLoop)
					{
						this.isLoop = false;
						this.player.removeEventListener("ended", this.onEndAudio);
					}
				}
			}
			catch(e)
			{
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Play(loop, volume)
	{
		if (this.player)
		{
			try
			{
				this.isLoop = loop;
				if (this.isLoop)
				{
					this.onEndAudio = this.OnEndAudio.bind(this);
					this.player.addEventListener("ended", this.onEndAudio);
				}
				this.player.volume = volume;
				this.player.play();
			}
			catch(e)
			{
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Pause()
	{
		if (this.player)
		{
			try
			{
				this.player.pause();
				this.player.removeEventListener("ended", this.onEndAudio);
			}
			catch(e)
			{
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetVolume(value)
	{
		if (this.player)
		{
			this.player.volume = value;
		}
	}
}
module.exports = AudioElement;