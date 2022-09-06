class StateManager
{
	constructor()
	{
		this.stateDeep	= -1;
		this.stateStack	= [];
		this.stateNext	= null;
		this.isFadeIn	= false;

		this.timerFade	= new Timer();
		this.timerFade.SetDuration(0.5);
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	PushState(state)
	{
		state.Load();
		this.stateStack[++this.stateDeep] = state;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	PopState()
	{
		if (this.stateDeep > 0)
		{
			this.stateStack[this.stateDeep].Unload();
			this.stateDeep--;
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	SwitchState(state, isUseFadeEffect = true)
	{
		if (isUseFadeEffect)
		{
			if (this.stateNext != state)
			{
				this.stateNext 	= state;
				this.isFadeIn	= true;

				this.timerFade.Reset();
				APP.BeginFade();

				return;
			}
		}

		this.stateStack[this.stateDeep].Unload();
		this.stateStack[this.stateDeep] = state;
		state.Load();
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Pause()
	{
		if (this.IsEmpty())
		{
			return;
		}

		if (this.stateStack[this.stateDeep].Pause)
		{
			this.stateStack[this.stateDeep].Pause();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Resume()
	{
		if (this.IsEmpty())
		{
			return;
		}

		if (this.stateStack[this.stateDeep].Resume)
		{
			this.stateStack[this.stateDeep].Resume();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Shake()
	{
		if (this.IsEmpty())
		{
			return;
		}

		if (this.stateStack[this.stateDeep].Shake)
		{
			this.stateStack[this.stateDeep].Shake();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Tilt()
	{
		if (this.IsEmpty())
		{
			return;
		}

		if (this.stateStack[this.stateDeep].Tilt)
		{
			this.stateStack[this.stateDeep].Tilt();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Resize()
	{
		if (this.IsEmpty())
		{
			return;
		}

		for (let i = 0; i <= this.stateDeep; i++)
		{
			APP.Align(this.stateStack[i]);
		}

		if (this.stateStack[this.stateDeep].Resize)
		{
			this.stateStack[this.stateDeep].Resize();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Back()
	{
		if (this.IsEmpty())
		{
			return;
		}

		if (this.stateStack[this.stateDeep].Back)
		{
			this.stateStack[this.stateDeep].Back();
		}
		else
		{
			Utils.SendTrackingAndExit();
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	TouchHandler(event)
	{
		if (this.IsEmpty())
		{
			return;
		}

		if (this.stateStack[this.stateDeep].TouchHandler)
		{
			this.stateStack[this.stateDeep].TouchHandler(event);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	KeyHandler(event)
	{
		if (this.IsEmpty())
		{
			return;
		}

		if (this.stateStack[this.stateDeep].KeyHandler)
		{
			this.stateStack[this.stateDeep].KeyHandler(event);
		}
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	IsEmpty()
	{
		return this.stateDeep == -1;
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	GetCurrentState()
	{
		return this.stateStack[this.stateDeep];
	}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	Update(deltaTime)
	{
		if (this.stateNext != null)
		{
			this.timerFade.Update(deltaTime);

			const percent = this.timerFade.GetTimePercent();
			APP.fadeEffect.alpha = this.isFadeIn ? 1 - percent : percent;

			if (this.isFadeIn)
			{
				if (this.timerFade.IsDone())
				{
					this.isFadeIn = false;
					this.timerFade.Reset();
					this.SwitchState(this.stateNext);
					APP.EndFade();
					APP.BeginFade();
				}
			}
			else
			{
				if (this.timerFade.IsDone())
				{
					this.stateNext = null;
					APP.EndFade();
				}
			}
		}

		if (!this.IsEmpty())
		{
			this.stateStack[this.stateDeep].Update(deltaTime);
		}
	}
}
module.exports = new StateManager();
