const Config = require('./core/modules/federation/Config')
global.Fingerprint2 = require('./game/fingerprint2.min')
window.startTime    = new Date().getTime();
Resource.Init = function (callback) {
    if (!window.isDisableIFrameLoader) {
        if(!!window.isOutfit7){
            let options = {};
            Fingerprint2.get(options, function (components) {
               
                var values = components.map(function (component) { return component.value })
                let anonymous2 = Fingerprint2.x64hash128(values.join(''), 31)
                window.anonymous = anonymous2
                this.requesterCallback = {};
                this.DeliveryTagCreateRequester(callback);
            }.bind(this))
        }
        else
        {
            this.requesterCallback = {};
            this.DeliveryTagCreateRequester(callback);
        }        
    }
    else {
        callback && callback();
    }

    if (window.creative_id && window.omsPID && window.omsPhase && window.omsPhase != 'gold') {
        this.Request('post', `${Config.REST_API_SERVER}/api/pri/projects/cnumber/${window.omsPID}/${window.omsPhase}`, JSON.stringify({ number: window.creative_id }))
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            })
    }
}
