class InternetPopup extends PIXI.Container
{
	constructor()
	{
		super();
		this.btnLeft = null;
		this.btnRight = null;

        this.txtTitle = null;
        this.txtContent = null;
        this.txtClose = null;
        this.txtResume = null;

		this.internetStatus = 0;
		this.internetConnected = true;
		this.cnnCheckTimer = new Timer();
		this.cnnCheckTimer.SetDuration(5);
		this.cnnCheckTimer.Reset();

		this.checkedAgain = false;
		this.dataName = null;
		this.visible = false;
        this.isInited = false;
	}

	Init(options)
	{
        try
        {
            this.dataName = 'https://oms.gameloft.com/ping'
            
            let gui = GuiManager.GetGui(options.gui);
            this.addChild(gui);

            gui.visible = true;

            this.txtTitle = gui.GetObject(options.title)
            this.txtTitle.style['fontWeight'] = 'bold'
            this.txtTitle.style['fontFamily'] = 'Arial'

            this.txtContent = gui.GetObject(options.content)
            this.txtContent.style['fontWeight'] = 'bold'
            this.txtContent.style['fontFamily'] = 'Arial'

            this.txtClose = gui.GetObject(options.txtClose)
            this.txtClose.style['fontWeight'] = 'bold'
            this.txtClose.style['fontFamily'] = 'Arial'
            this.txtClose.interactive = false

            this.txtResume = gui.GetObject(options.txtResume)
            this.txtResume.style['fontWeight'] = 'bold'
            this.txtResume.style['fontFamily'] = 'Arial'
            this.txtResume.interactive = false

            this.btnLeft = gui.GetObject(options.btnClose);
            this.btnLeft.SetTouchable(true);

            this.btnRight = gui.GetObject(options.btnResume);
            this.btnRight.SetTouchable(true);

            this.isInited = true;
        }
        catch(exception)
        {
            this.isInited = false;
        }
	}

	Show()
	{
		this.visible = true;
	}

	Hide()
	{
		this.visible = false;
	}

	IsVisible()
	{
		return this.visible;
	}

	Update(deltaTime)
	{
		this.cnnCheckTimer.Update(deltaTime);
		if(this.cnnCheckTimer.IsDone())
		{
			this.CheckInternet();
			this.cnnCheckTimer.Reset();
		}
	}

	Check(parent)
	{
		parent.addChild(this);
		this.cnnCheckTimer.Reset();
	}

	UnCheck(parent)
	{
		parent.removeChild(this);
	}

	CheckInternet()
	{
        if (this.dataName == null)
        {
            return;
        }

        try
        {
			if(!this.cnnCheckTimer.IsDone() || !this.isInited) return;

            this.internetStatus = 0; //CHECKING

            let dataNow = this.dataName + "?time=" + new Date().getTime();
            var xhr = new XMLHttpRequest();
            xhr.open('get', dataNow, true);
            xhr.timeout = 5000;

			xhr.onreadystatechange = () =>
			{
				if (xhr.readyState >= 2)
				{
					if (xhr.status == 200 || window.fromCache == '1')
					{
						if (this.checkedAgain)
                        {
                            this.internetStatus = 2;
                            xhr.abort();
                            this.Hide();
                            this.internetConnected = true;
                            StateManager.Resume()
                            this.checkedAgain = false
                        }
					}
					else
					{
						this.internetStatus = -2;
                        this.internetConnected = false;
                        this.Show();
                        StateManager.Pause();
					}
				}
            }

            // xhr.onerror = () =>
            // {
            //     this.internetStatus = -1;
            //     this.internetConnected = false;
            //     this.Show();
            //     StateManager.GetCurrentState().Pause();
            // };

            // xhr.ontimeout = () =>
            // {
            //     this.internetStatus = -2;
            //     this.internetConnected = false;
            //     this.Show();
            //     StateManager.GetCurrentState().Pause();
            // };

			xhr.send();
        }
        catch(err)
        {
			this.internetStatus = -1;
			this.internetConnected = false;
		}
	}

	TouchHandler(evt)
	{
		if (!this.IsVisible())
			return false;

		switch(evt.target)
		{
			case this.btnLeft:
			{
				if (Input.IsTouchUp(evt))
				{
					Utils.SendTrackingAndExit("no_internet");
				}
				break;
			}
			case this.btnRight:
			{
				if (Input.IsTouchUp(evt))
				{
					this.Hide();
					this.checkedAgain = true;
					this.CheckInternet();
				}
				break;
			}
		}

		return true;
	}

	IsInternetConnected()
	{
		return this.internetConnected;
	}

    SetTitleText(text)
    {
        if (this.isInited)
        {
            this.txtTitle.text = text;
        }
    }

    SetContentText(text)
    {
        if (this.isInited)
        {
            this.txtContent.text = text;
        }
    }

    SetCloseText(text)
    {
        if (this.isInited)
        {
            this.txtClose.text = text;
        }
    }

    SetResumeText(text)
    {
        if (this.isInited)
        {
            this.txtResume.text = text;
        }
    }
}
module.exports = new InternetPopup()