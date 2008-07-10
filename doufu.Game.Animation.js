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
		
		doufu.System.Logger.Debug("doufu.Game.Animation::Play(): Was invoked with following parameters, oAnimationInfo.Row = " + oAnimationInfo.Row.toString());
		
		this.AnimationInfo = oAnimationInfo;
		
		this.IsPlaying(true);
		
		
	}
	
	this.Stop = function()
	{
		
	}
	
	this.Pacer = function(oMsg)
	{
		if (this.IsPlaying() != true || (this.AnimationInfo.RepeatNumber != -1 && repeatCount > this.AnimationInfo.RepeatNumber))
		{
			return;
		}
		
		if (this.AnimationInfo.FrameSkip == frameSkipCount)
		{
			frameSkipCount = 0;
		}
		else
		{
			frameSkipCount++;
			return;
		}
		
		this.RefToGameObj.ImageOffset.X = this.AnimationInfo.Column * this.RefToGameObj.Width + this.RefToGameObj.Width * frameCursor;
		this.RefToGameObj.ImageOffset.Y = this.AnimationInfo.Row * this.RefToGameObj.Height;
		
		frameCursor++;
		
		if (frameCursor >= this.AnimationInfo.FrameNumber)
		{
			frameCursor = 0;
			repeatCount++;
		}
	}
	
	// Initialize Animation class
	this.Init = function()
	{
		if (!oGameObj.InstanceOf(doufu.Game.BaseObject))
		{
			throw doufu.System.Exception("doufu.Game.Animation::Init(): oGameObj must be a instance of doufu.Game.BaseObject.");
		}
		this.RefToGameObj = oGameObj;
		
	}
	
	this.Init();
}

doufu.Game.Animation.Info = function()
{
	doufu.OOP.Class(this);
	
	this.Column;
	this.Row;
	this.FrameNumber;
	this.RepeatNumber;
	this.FrameSkip = 0;
}