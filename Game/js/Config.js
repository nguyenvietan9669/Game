class GameConfig
{
	constructor()
	{
		this.soundMax					= 50;
		this.scale						= 1;
		this.fontList					= {MainFont:'MainFont', TitleFont:'TitleFont'};
		this.fontInfo					= [this.fontList.MainFont, this.fontList.TitleFont];
		this.isMigGamePortrait			= true;
		this.isHostGamePortrait			= window.innerWidth < window.innerHeight;
		this.isSupportTwoScreenSize		= true;
		this.isReverseScaleRatio		= false;
		this.isSupportKeyboard			= true;
		this.isSmallVersion				= false;
		this.isNewUser					= false;
		this.isUseDetectRenderer		= true;
		this.isBackgroundTransparent	= true;
		this.isUseBanner				= false;

		this.CalculateScreenSize();

		//PIXI override function
		if(!console.warn) console.warn 	= console.log;
	}

	_OverrideGetSourceGameGGI()
	{
		return 0;
	}

	CalculateScreenSize()
	{
		let scale = this.isSmallVersion ? 0.5 : 1;
		if (this.isMigGamePortrait)
		{
			this.width	= 750 * scale;
			this.height	= 1334 * scale;
		}
		else
		{
			this.width	= 1334 * scale;
			this.height	= 750 * scale;
		}

		if (this.isUseBanner)
		{
			this.bannerWidth  = 640 * scale;
			this.bannerHeight = 100 * scale;
		}

		this.scale = scale;
	}

	Get3rdPartyImpression()
	{
		// if(GameDefine.IsWindowVersion()) {
		// 	return Resource.GetParam("impression_url_win");
		// }
		// else {
		// 	return Resource.GetParam("impression_url");
		// }

		return Resource.GetParam("impression_url");
	}
}
module.exports = new GameConfig();