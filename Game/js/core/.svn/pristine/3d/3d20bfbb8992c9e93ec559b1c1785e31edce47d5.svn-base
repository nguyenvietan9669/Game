const AudioElementManager	= require('./AudioElementManager');
const AudioLoader			= require('./AudioLoader');

class AudioManager
{
	constructor()
	{
		this.context			= null;
		this.gain				= [];
		this.source				= [];
		this.audioBuffer		= [];
		this.audioBufferLoader	= null;
		this.count				= 0;
		this.isSupportAudioAPI	= true;
		this.isLoaded			= false;
		this.audioStartOffset	= [];
		this.audioStartTime		= [];
		this.shouldCheckSound	= null;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	CreateAudioGain()
	{
		let gainNode = null;
		if (!this.context.createGain)
		{
			this.context.createGain = this.context.createGainNode;
		}
		gainNode = this.context.createGain();
		gainNode.connect(this.context.destination);

		return gainNode;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsSupportAudioAPI()
	{
		return this.isSupportAudioAPI;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	AudioCallback(cb)
	{
		if (this.isSupportAudioAPI)
		{
			// console.log('AudioCallback', this.context.state)
			if (this.context.state === 'running')
			{
				cb && cb();
			}
			else
			{
				this.context.resume().then(() => {
					cb && cb();
				})
			}
		}
		else
		{
			cb && cb();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	InitMute()
	{
		let buffer = this.context.createBuffer(2, 4410, 44100);
		for (let i = 0; i < GameConfig.soundMax; i++)
		{
			this.audioBuffer[i]			= buffer;
			this.gain[i]				= this.CreateAudioGain();
			this.audioStartOffset[i]	= 0;
			this.audioStartTime[i]		= 0;
		}

		this.shouldCheckSound = this.AudioCallback.bind(this, this.ShouldCheckSound.bind(this)) 
		// for mobile browser
		document.addEventListener("touchstart", this.shouldCheckSound);
		// for PC browser
		document.addEventListener("click", this.shouldCheckSound);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ShouldCheckSound()
	{
		// for mobile browser
		document.removeEventListener("touchstart", this.shouldCheckSound);
		// for PC browser
		document.removeEventListener("click", this.shouldCheckSound);
		for (let i = 0; i < this.audioBuffer.length; i++)
		{
			this.PlaySound(i, false);
			this.StopSound(i);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load(audioFiles)
	{
		this.count		= audioFiles.length;
		this.isLoaded	= false;

		if (!this.isSupportAudioAPI)
		{
			this.LoadSimpleSound(audioFiles);
		}
		else
		{
			for (let i = 0; i < this.count; i++)
			{
				this.audioStartOffset[i]	= 0;
				this.audioStartTime[i]		= 0;
			}

			this.audioBufferLoader = new AudioLoader(this.context, audioFiles, this.SoundLoadFinished.bind(this), this.SoundLoadError.bind(this));
			this.audioBufferLoader.Load();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SoundLoadError()
	{
		Utils.DispatchEvent("LoadingError");
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadSimpleSound(audioFiles)
	{
		this.isSupportAudioAPI = false;
		AudioElementManager.Load(audioFiles);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Init()
	{
		window.AudioContext		= window.AudioContext ||window.webkitAudioContext;
		this.isLoaded			= false;
		this.isSupportAudioAPI	= (typeof (window.AudioContext || window.webkitAudioContext)) != 'undefined';

		if (this.isSupportAudioAPI)
		{
			this.context = new AudioContext();
			// for debug
			// this.context.onstatechange = () => {
			// 	console.log(`audio context state ${this.context.state}`);
			// }
			this.InitMute();
		}
		else
		{
			console.log('Web Audio API is not supported');
			AudioElementManager.Init();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SoundLoadFinished(bufferList)
	{
		for (let i = 0; i < bufferList.length; i++)
		{
			this.audioBuffer[i] = bufferList[i];
		}
		this.isLoaded = true;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsLoaded(time)
	{
		if (this.isSupportAudioAPI)
		{
			return this.isLoaded;
		}
		else
		{
			return AudioElementManager.IsLoaded(time);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetVolume(index, value)
	{
		if (this.isSupportAudioAPI)
		{
			this.GetAudioGain(index).gain.value = value;
		}
		else
		{
			AudioElementManager.SetVolume(index, value);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetAudioGain(index)
	{
		return this.gain[index];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetCurrentTimeMS(index)
	{
		if (this.isSupportAudioAPI)
		{
			return this.context.currentTime;
		}
		else
		{
			return AudioElementManager.GetCurrentTimeMS(index);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	PlaySound(index, loop)
	{
		if (this.isSupportAudioAPI)
		{
			this.PlaySoundContext(index, loop);
		}
		else
		{
			AudioElementManager.Play(index, loop);
		}
	}

	PlaySoundContext(index, loop)
	{
		if (this.audioBuffer[index])
		{
			if (this.source[index] != null && this.audioStartOffset[index] == 0)
			{
				this.StopSound(index);
			}

			this.audioStartTime[index]	= this.context.currentTime;
			this.source[index]			= this.context.createBufferSource();

			this.source[index].connect(this.GetAudioGain(index));

			this.source[index].buffer 	= this.audioBuffer[index];
			this.source[index].loop 	= loop;

			if (!this.source[index].start)
			{
				this.source[index].start = this.source[index].noteOn;
			}
			this.source[index].start(0, this.audioStartOffset[index] % this.audioBuffer[index].duration);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	StopSound(index)
	{
		if (this.isSupportAudioAPI)
		{
			try
			{
				if (this.source[index] != null)
				{
					if (!this.source[index].stop)
					{
						this.source[index].stop = this.source[index].noteOff;
					}
					this.source[index].stop(0);
					this.audioStartOffset[index] = 0;
					this.source[index]			 = null;
				}
			}
			catch(e)
			{
			}
		}
		else
		{
			AudioElementManager.Stop(index);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsSoundPlaying(index)
	{
		if(this.source[index]
			&& (this.context.currentTime - this.audioStartTime[index]) < this.audioBuffer[index].duration)
		{
			if(this.source[index].loop)
			{
				throw "Not support for loop sound."
			}

			return true
		}

		return false
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Play(index, loop)
	{
		this.AudioCallback(this.PlaySound.bind(this, index, loop))
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Stop(index)
	{
		this.StopSound(index);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Pause(index)
	{
		if (this.isSupportAudioAPI)
		{
			if (this.source[index] != null)
			{
				try
				{
					this.source[index].stop(0);
				}
				catch(e)
				{

				}
				this.audioStartOffset[index] += this.context.currentTime - this.audioStartTime[index];
			}
		}
		else
		{
			AudioElementManager.Pause(index);
		}

	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	StopAll()
	{
		for (let i = 0; i < this.count; i++)
		{
			this.StopSound(i);
		}
	}
}
module.exports = new AudioManager();