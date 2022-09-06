const Config = require('./Config')

class Leaderboard
{
	constructor()
	{
		this.pid	= UserProfile.pid;
		this.userid	= UserProfile.userid;
		this.phase	= UserProfile.phase;
		this.name	= 'default';
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Get(offset = 0, limit = 50)
	{
		return Resource.Request('get', `${Config.REST_API_SERVER}/api/pub/federation/leaderboard/${this.pid}_${this.phase}_${this.name}/${offset}/${limit}`);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Post(score, name, attrs = {})
	{
		let body = {
			userid: this.userid,
			score: score,
			name: name,
			attrs: attrs
		}
		return Resource.Request('post', `${Config.REST_API_SERVER}/api/pub/federation/leaderboard/${this.pid}_${this.phase}_${this.name}`, JSON.stringify(body));
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	MyEntry()
	{
		return Resource.Request('get', `${Config.REST_API_SERVER}/api/pub/federation/leaderboard/${this.pid}_${this.phase}_${this.name}/${this.userid}`);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	DeleteMyEntry()
	{
		let body = {
			userid: this.userid,
		}
		return Resource.Request('post', `${Config.REST_API_SERVER}/api/pri/federation/leaderboard/${this.pid}_${this.phase}_${this.name}/delete`, JSON.stringify(body));
	}
}
module.exports = new Leaderboard();