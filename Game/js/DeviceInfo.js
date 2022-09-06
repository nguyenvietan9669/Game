class DeviceInfo
{
	constructor()
	{
		this.DEVICE_MODEL	= this.GetStatsUrlInfo("device_model");
		this.iOSDevice		= 'iOS';
		this.AndroidDevice	= 'Android';
		this.DEVICE_INFO	= this.GetOS();
	}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

GetOS()
{
	var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false
	if (iOS)
	{
		return this.iOSDevice;
	}

	var android = navigator.userAgent.match(/(a|A)ndroid\s([0-9\.]*)/) ? true : false
	if (android)
	{
		return this.AndroidDevice;
	}

	return '';
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	DetectDevice(width, height)
	{
		console.log("User Agent: " + navigator.userAgent);
		console.log("Device Model: " + this.DEVICE_MODEL);

		/*var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
		if (iOS)
		{
			if (this.DEVICE_MODEL.indexOf('iPad2%2C5') != -1)//ipad mini
			{
				GameConfig.isSmallVersion = true;
			}
			else if (navigator.userAgent.indexOf('iPad') != -1)
			{
				GameConfig.isSmallVersion = false;
			}
			else
			{
				if (width * height <= 512 * 320)//iphone 4, ipod 4
				{
					GameConfig.isSmallVersion = true;
				}
				else
				{
					GameConfig.isSmallVersion = false;
					console.log("IOS device: > iphone 4");
				}
			}
			this.DEVICE_INFO = "iOS";
		}
		else if (navigator.userAgent.indexOf('Mac OS X') != -1)//ipad intel cpu
		{
			GameConfig.isSmallVersion = false;
			this.DEVICE_INFO = "iOS";
		}
		else if (navigator.userAgent.indexOf('Android') != -1)
		{
			GameConfig.isSmallVersion = false;
			var value = navigator.userAgent.match(/Android\s([0-9\.]*)/);
			if (value.length > 0)
			{
				if (value[1] < '5.0')
				{
					GameConfig.isSmallVersion = true;
				}
			}
			this.DEVICE_INFO = "Android";
		}
		else
		{
			GameConfig.isSmallVersion = false;
			this.DEVICE_INFO = "unknown";
		}*/

		GameConfig.CalculateScreenSize();
		console.log("Small Version: " + GameConfig.isSmallVersion);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetStatsUrlInfo(mask)
	{
		let result = '';
		if (typeof strStatsUrl != 'undefined')
		{
			let ii = strStatsUrl.indexOf(mask + '=');
			if (ii != -1)
			{
				ii += mask.length + 1;
				let iii = strStatsUrl.indexOf('&', ii);
				result 	= strStatsUrl.substring(ii, iii);
			}
		}

		return result;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetLanguagePack()
	{
		// return PACK_TEXT_EN;
		// return PACK_TEXT_BR;
		return PACK_TEXT_EN;
	}
}
module.exports = new DeviceInfo();