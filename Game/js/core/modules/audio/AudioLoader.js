class AudioLoader
{
	constructor(context, urlList, callback, onError)
	{
		this.context	= context;
		this.urlList	= urlList;
		this.onLoad		= callback;
		this.bufferList = new Array();
		this.count		= 0;
		this.onError	= onError;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	LoadBuffer(url, index)
	{
		let loader = this;
		if(url == '')
		{
			if (++loader.count == loader.urlList.length)
			{
				loader.onLoad(loader.bufferList);
			}
			return;
		}

		Resource.GetAssetData(url)
		.then(response =>
		{
			loader.context.decodeAudioData(response,
				function(buffer)
				{
					if (!buffer)
					{
						loader.onError();
						return;
					}

					loader.bufferList[index] = buffer;
					if (++loader.count == loader.urlList.length)
					{
						loader.onLoad(loader.bufferList);
					}
				},
				function(error)
				{
					loader.onError();
				}
			);
		})
		.catch(error => loader.onError());
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load()
	{
		for (let i = 0; i < this.urlList.length; ++i)
		{
			this.LoadBuffer(Utils.OMSGetRoot(this.urlList[i].file), i);
		}
	}
}
module.exports = AudioLoader;