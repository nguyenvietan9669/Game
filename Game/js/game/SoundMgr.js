
class SoundMgr
{
	constructor()
	{
        /*
        {
            currentIndex: -1,
            list:[
            ]
        }
        */
		this.SOUNDS = [
			{
				currentIndex: -1,
				list:[
					SFX_COLLECT_1,
					SFX_COLLECT_2,
					SFX_COLLECT_3
				]
			},
			{
				currentIndex: -1,
				list:[
					SFX_SWITCH_LANES_1,
					SFX_SWITCH_LANES_2
				]
			}
		];
	}
	
	GetId(id)
	{
		let sound = null;
		let result = null;
		for(var i = 0; i < this.SOUNDS.length; ++i)
		{
			sound = this.SOUNDS[i];
			if (!sound.list.length)
			{
				continue;
			}
			if (id >= sound.list[0] && id <= sound.list[sound.list.length - 1])
			{
				result = sound;
				break;
			}
		}
		
		if (!result)
		{
			return id;
		}
		result.currentIndex++;
		if (result.currentIndex >= result.list.length)
		{
			result.currentIndex = 0;
		}
		
		return result.list[result.currentIndex];
	}
	
	Play(id, loop = false)
	{
		let result = this.GetId(id);
		AudioManager.Play(result, loop);
	}
	
	Stop(id)
	{
		AudioManager.Stop(id);
	}
	
	Pause(id)
	{
		AudioManager.Pause(id);
	}
}

module.exports = new SoundMgr();