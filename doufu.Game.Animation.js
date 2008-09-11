doufu.Game.Animation = function(oGameObj)
{
	doufu.OOP.Class(this);
	
	this.RefToGameObj;
	
	this.AnimationInfo;
	
	// indicate the current frame
	var frameCursor = 0;
	// counting for frame skipping
	var frameSkipCount = 0;
	// counting for repeat times.
	var repeatCount = 0;
	// indicate whether we should play backward
	var backwardPlay = false;
		
	var _isPlaying = false;
	this.NewProperty("IsPlaying");
	this.IsPlaying.Get = function()
	{
		return _isPlaying;
	}
	this.IsPlaying.Set = function(value)
	{
		if (value == true)
		{
			frameCursor = 0;
			repeatCount = 0;
			frameSkipCount = this.AnimationInfo.FrameSkip;
			backwardPlay = false;
		}
		_isPlaying = value;
	}
	
	// Play the animation which in the tile set 
	// with specifed start column
	this.Play = function(oAnimationInfo)
	{
		if (!oAnimationInfo.InstanceOf(doufu.Game.Animation.Info))
		{
			throw doufu.System.Exception("doufu.Game.Animation::Play(): oAnimationInfo must be an instance of doufu.Game.Animation.Info.");
		}
		
		doufu.System.Logger.Verbose("doufu.Game.Animation::Play(): Was invoked with following parameters, oAnimationInfo.Row = " + oAnimationInfo.Row.toString());
		
		if (this.IsPlaying() == true)
		{
			this.Stop();
		}
		
		this.AnimationInfo = oAnimationInfo;
		
		this.IsPlaying(true);
		
		
	}
	
	this.Stop = function()
	{
		this.IsPlaying(false);
	}
	
	this.Pacer = function(oMsg)
	{
		// Check if the repeat number is reached.
		if (this.IsPlaying() != true || (this.AnimationInfo.RepeatNumber != -1 && repeatCount > this.AnimationInfo.RepeatNumber))
		{
			if (this.IsPlaying() == true)
			{
				this.IsPlaying(false);
			}
			return;
		}
		
		// Check whether the skip frame number is reached.
		if (this.AnimationInfo.FrameSkip == frameSkipCount)
		{
			frameSkipCount = 0;
		}
		else
		{
			frameSkipCount++;
			return;
		}
		
		// Start to play next frame
		
		doufu.System.Logger.Verbose("doufu.Game.Animation::Pacer():");
		doufu.System.Logger.Verbose("\tColumn: " + this.AnimationInfo.Column.toString());
		doufu.System.Logger.Verbose("\tRefToGameObj.Width: " + this.RefToGameObj.Width.toString());
		doufu.System.Logger.Verbose("\tframeCursor: " + frameCursor.toString());
		
		this.RefToGameObj.ImageOffset.X = this.AnimationInfo.Column * this.RefToGameObj.Width + this.RefToGameObj.Width * frameCursor;
		this.RefToGameObj.ImageOffset.Y = this.AnimationInfo.Row * this.RefToGameObj.Height;
		
		// frameCursor == 0 means the repeat count should add 1.
		if (frameCursor == 0)
		{
			repeatCount++;
		}
		
		if (!backwardPlay)
		{
			frameCursor++;
		}
		else
		{
			frameCursor--;
		}
		
		if (frameCursor >= this.AnimationInfo.FrameNumber)
		{
			if (!this.AnimationInfo.PlayReboundly)
			{
				frameCursor = 0;
			}
			else
			{
				backwardPlay = true;
				// fix the last frame is playing twice.
				frameCursor -=2 ;
			}
		}
		
		// disable backwardPlay if the frameCursor reached 0 and play reboundly is enabled.
		if (frameCursor <= 0 && this.AnimationInfo.PlayReboundly)
		{
			backwardPlay = false;
		}
	}
	
	// Initialize Animation class
	this.Ctor = function()
	{
		if (!oGameObj.InstanceOf(doufu.Game.BaseObject))
		{
			throw doufu.System.Exception("doufu.Game.Animation::Ctor(): oGameObj must be a instance of doufu.Game.BaseObject.");
		}
		this.RefToGameObj = oGameObj;
		
	}
	
	this.Ctor();
}

// This is a animation info class which containing all information needed while playing an animation.
doufu.Game.Animation.Info = function()
{
	doufu.OOP.Class(this);
	
	// Start column
	this.Column;
	// Start row.
	this.Row;
	// Indicate how many frames in this animation.
	this.FrameNumber;
	// Indicate how many times should be played, -0 for infinite
	this.RepeatNumber;
	// Skip how many cycles when play a single frame.
	this.FrameSkip = 0;
	// Specified whether to play backward when forward play is completed.
	this.PlayReboundly = false;
}