class Config
{
    constructor()
    {
        this.REST_API_SERVER        = 'https://oms.gameloft.com'
        this.ASSET_URL              = 'https://bob-iris.gameloft.com/ucdn/3402/{name}/url?{time}';
        this.AWS_ASSET_URL          = 'https://cdn.gold.g4b.gameloft.com/{name}';

        if (window.override_ip_geolocation && window.override_ip_geolocation != 'WW')
        {
            this.ASSET_URL = `https://bob-iris.gameloft.com/ucdn/3402/{name}/url?override_ip_geolocation=${override_ip_geolocation.toUpperCase()}`;
        }
    }
}
module.exports = new Config();