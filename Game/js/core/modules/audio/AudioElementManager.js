const AudioElement	= require('./AudioElement');

class AudioElementManager
{
	constructor()
	{
		this.audioElement		= null;
		this.audioFiles			= null;
		this.count				= 0;
		this.isMuteSoundPlayed	= false;
		this.isLoad				= false;
		this.shouldCheckSound	= null;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Init()
	{
		this.audioElement	= [];
		this.isLoad			= false;
		for (let i=0; i < GameConfig.soundMax; i++)
		{
			this.audioElement[i] = new AudioElement();
			this.audioElement[i].Init(Utils.OMSGetData("sound/mute.m4a"));
		}

		this.InitMute();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load(audioFiles)
	{
		this.audioFiles = audioFiles;
		this.SequentiallyLoad();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SequentiallyLoad()
	{
		if (this.count >= this.audioFiles.length)
		{
			this.isLoad = true;
			return;
		}
		this.audioElement[this.count].Load(this.audioFiles[this.count++].file, this.SequentiallyLoad.bind(this));
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetCurrentTimeMS(index)
	{
		if (this.audioElement[index])
		{
			return this.audioElement[index].currentTime * 1000;
		}
		return 0;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsLoaded()
	{
		return this.isLoad;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	InitMute()
	{
		this.shouldCheckSound = this.ShouldCheckSound.bind(this);
		document.addEventListener('touchstart', this.shouldCheckSound);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	ShouldCheckSound()
	{
		if (!this.isMuteSoundPlayed)
		{
			this.isMuteSoundPlayed = true;
			document.removeEventListener('touchstart', this.shouldCheckSound);

			for (let i = 0; i < this.audioElement.length; i++)
			{
				this.audioElement[i].Play(false, 0);
				this.audioElement[i].Stop();
			}
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SetVolume(index, value)
	{
		if (index < this.audioFiles.length)
		{
			this.audioElement[index].SetVolume(value);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Play(index, loop)
	{
		if (index < this.audioFiles.length)
		{
			this.audioElement[index].Play(loop, 1);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Stop(index)
	{
		if (index < this.audioFiles.length)
		{
			this.audioElement[index].Stop();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Pause(index)
	{
		if (index < this.audioFiles.length)
		{
			this.audioElement[index].Pause();
		}
	}
}
module.exports = new AudioElementManager();