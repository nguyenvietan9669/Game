class Video
{
    constructor(videoOption, extEvtHandler)
    {
        this.media = document.createElement('video')
        $(this.media).attr(
        {
            preload: 'auto',
            type: 'video/mp4',
            src: videoOption.url,
            'autobuffer' : '',
            'playsinline': '',
            'webkit-playsinline': '',
        })
        $(this.media).css(
        {
            position: 'fixed',
            'z-index': -15,
            top: '50%',
            left: '50%',
            transform: 'translateY(-50%) translateX(-50%)',
            webkitTransform: 'translateY(-50%) translateX(-50%)',
            transformOrigin: 'top left',
            webkitTransformOrigin: 'top left',
            visibility:'hidden',
        })

        if (DeviceInfo.DEVICE_INFO == 'Android')
        {
            $(this.media).attr('poster','http://interstatic06.gameloft.com/games/2093/resources/r_and_d/vban/vban_us_airforce/black.jpg')
        }

        $(this.media).appendTo(document.body)
        $(this.media).on(
        {
            loadedmetadata: evt =>
            {
                if (this.media.videoWidth / this.media.videoHeight < window.innerWidth / window.innerHeight)
                {
                    $(this.media).css(
                    {
                        width: 'auto', height: '100%'
                    })
                }
                else
                {
                    $(this.media).css(
                    {
                        width: '100%', height: 'auto'
                    })
                }

                if (APP.IsRotate())
                {
                    $(this.media).css(
                    {
                        width:  window.innerHeight, height: 'auto'
                    })
                    $(this.media).css(
                    {
                        transform: 'rotate(-90deg)',
                        webkitTransform: 'rotate(-90deg)',
                        left: (window.innerWidth - this.media.videoHeight*(window.innerHeight/this.media.videoWidth))/2,
                        top: window.innerHeight
                    })
                }
                //else
                //{
                //    $(this.media).css(
                //    {
                //        transform: 'rotate(0deg)',
                //        // webkitTransform: 'rotate(0deg)',
                //    })
                //}
                this.media.play()
            },
            canplaythrough: evt =>
            {
                this.media.pause()
                extEvtHandler.OnCanPlayThrough && extEvtHandler.OnCanPlayThrough()
                $(this.media).off('canplaythrough')
            },
            play: evt =>
            {
                $(this.media).css('z-index', -1) 
            },
            pause: evt =>
            {
            },
            ended: evt =>
            {
                $(this.media).css('z-index', -15)
                extEvtHandler.OnEnded && extEvtHandler.OnEnded()
            },
            timeupdate: evt =>
            {
                extEvtHandler.OnTimeUpdate && extEvtHandler.OnTimeUpdate(this.media)
            },
        })
    }

    Pause()
    {
        this.media.pause()
    }

    Play()
    {
        this.media.play()
    }

    IsPlaying()
    {
        return !!(this.media.currentTime > 0 && !this.media.paused && !this.media.ended && this.media.readyState > 2)
    }

    Replay()
    {
        //this.media.currentTime = 0.01
        $(this.media).css('visibility', 'visible')
        this.media.play()
    }
}

class VideoMgr
{
    constructor()
    {
        this.extEvtHandler = {}
        this.playlist = {}
        this.currentIndex = 0
    }

    Load(videoOption)
    {
        videoOption.index = this.currentIndex++ + 1
        this.playlist[videoOption.name || 'default'] = new Video(videoOption,
        {
            OnCanPlayThrough: this.OnCanPlayThrough.bind(this),
            OnTimeUpdate: this.OnTimeUpdate.bind(this),
            OnEnded: this.OnEnded.bind(this),
        })
    }

    Next(alias)
    {
    }

    SetExtEvtHandler(extEvtHandler)
    {
        this.extEvtHandler = extEvtHandler
    }

    OnLoadedMetaData()
    {
    }

    OnCanPlayThrough()
    {
        this.isCanPlayThrough = true
    }

    OnTimeUpdate(media)
    {
        this.extEvtHandler.OnTimeUpdate && this.extEvtHandler.OnTimeUpdate(media)
    }

    OnProgress()
    {
    }

    OnError()
    {
    }

    OnEnded(media)
    {
        this.extEvtHandler.OnEnded && this.extEvtHandler.OnEnded(media)
    }

    Resize(width, height)
    {
        console.log('Resize')
    }

    Pause(alias = 'default')
    {
        this.playlist[alias].Pause()
    }

    Play(alias = 'default')
    {
        this.playlist[alias].Play()
        TrackingManager.SendEventTracking(TrackingManager.TRACKING_ACTION_TYPE_VIDEO_STARTED);
    }

    Replay(alias = 'default')
    {
        this.playlist[alias].Replay()
    }
}
module.exports = new VideoMgr()
