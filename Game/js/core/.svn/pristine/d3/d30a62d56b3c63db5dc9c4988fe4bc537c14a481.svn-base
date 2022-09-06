const Config = require('./Config')

class UserProfile
{
	constructor()
	{
		this.pid	= window.omsPID || "255";
		this.userid	= Resource.args["gl_device_id"] || Resource.args["idfa"] || Resource.args["hdidfv"] || "window"
		this.phase	= window.omsPhase || "dev";
		this.name	= `${this.pid}.${this.userid}`
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Load()
	{
		return Resource.Request('get', `${Config.REST_API_SERVER}/api/pub/federation/profile/${this.name}/${this.phase}`, null);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Save(data)
	{
		return Resource.Request('post', `${Config.REST_API_SERVER}/api/pub/federation/profile/${this.name}/${this.phase}`, JSON.stringify(data));
	}
}
module.exports = new UserProfile();