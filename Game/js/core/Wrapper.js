
class Wrapper
{
    constructor()
    {
        window.resource = {};

        let request = {
            callbackSuccess: null,
            callbackError: null,
            success: function(fn)
            {
                this.callbackSuccess = fn;
                return this;
            },
            error: function(fn)
            {
                this.callbackError = fn;
                return this;
            }
        };

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        UserProfile.load_my_profile = function()
        {
            let req = Object.assign({}, request);

            this.Load().
            then(response =>
            {
                let jsonString = `{"data":${response}}`;
                req.callbackSuccess(JSON.parse(jsonString));
            })
            .catch(error =>
            {
                req.callbackError(error);
            })

            return req;
        }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        UserProfile.save_my_profile = function(profile)
        {
            let req = Object.assign({}, request);

            this.Save(profile).
            then(response =>
            {
                req.callbackSuccess(response);
            })
            .catch(error =>
            {
                req.callbackError(error);
            })

            return req;
        }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        resource.load_font = function(name, path, success, error)
        {
            Resource.LoadFont(name, path)
            .then(response =>
            {
                success(response);
            })
            .catch(err =>
            {
                error(err);
            })
        }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        resource.get_param = function(key)
        {
            return Resource.GetParam(key);
        }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        resource.get_args = function(key)
        {
            return Resource.args[key];
        }

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

        Utils.GetArrayBuffer = function(path, success, error)
        {
            Resource.GetAssetData(path)
            .then(response =>
            {
                success(response);
            })
            .catch(err =>
            {
                error(err);
            })
        }
    }
}
module.exports = new Wrapper()
