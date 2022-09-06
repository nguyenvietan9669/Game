const Config = require('./Config')

class CreativeLog
{
	constructor()
	{
		this.pid	= UserProfile.pid;
		this.phase	= UserProfile.phase;

		window.addEventListener("error", e =>
		{
			this.Post(e.message);
		});
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsError(error)
	{
		if (error.indexOf('Script error.') != -1 ||
			error.indexOf('Uncaught ReferenceError: mraid is not defined') != -1 ||
			error.indexOf('Uncaught ReferenceError: onVolumeChanged is not defined') != -1 ||
			error.indexOf('Uncaught ReferenceError: onWebViewFinishLoad is not defined') != -1)
		{
			return false;
		}

		return true;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Post(error)
	{
		let enableGoldLog = (Resource.GetParam("enable_gold_log") == 'true') ? true : false;
		if (!window.DEBUG && !window.REVIEW && window.omsPublish && this.IsError(error) && (this.phase == 'dev' || this.phase == 'qa' || (this.phase == 'gold' && enableGoldLog)))
		{
			let body = {
				os: Resource.args['os'] || 'N/A',
				device: Resource.args['device_model'] || 'N/A',
				firmware: Resource.args['firmware'] || 'N/A',
				gameid: Resource.args['game_id'] || 'N/A',
				gamever: Resource.args['game_ver'] || 'N/A',
				error: error,
			}

			Resource.Request('post', `${Config.REST_API_SERVER}/api/pub/federation/leaderboard/${this.pid}_${this.phase}_creative_log/log`, JSON.stringify(body));
		}
	}
}
module.exports = new CreativeLog();