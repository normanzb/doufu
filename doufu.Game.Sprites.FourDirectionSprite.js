/*
	Class: doufu.Game.Sprites.FourDirectionSprite
	
	An 4 way moving sprite implementation which provide functionalities allow sprite moving in 4 direction.
	
	Inherit:
		<doufu.Game.Sprites.Sprite>
*/
doufu.Game.Sprites.FourDirectionSprite = function(oInfoSet)
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Game.Sprites.Sprite);
	
	var aniDirection = null;
	
	this.AnimationInfos = {};
	
	var startToPlay = function()
	{
		if (aniDirection.X() == -1 &&
			this.Animation.AnimationInfo != this.AnimationInfos.MoveLeft)
		{
			this.Animation.Play(this.AnimationInfos.MoveLeft);
			
		}
		else if (aniDirection.X() == 1 &&
			this.Animation.AnimationInfo != this.AnimationInfos.MoveRight)
		{
			this.Animation.Play(this.AnimationInfos.MoveRight);
			
		}
		else if (aniDirection.Y() == 1 &&
			this.Animation.AnimationInfo != this.AnimationInfos.MoveDown)
		{
			this.Animation.Play(this.AnimationInfos.MoveDown);
			
		}
		else if (aniDirection.Y() == -1 &&
			this.Animation.AnimationInfo != this.AnimationInfos.MoveUp)
		{
			this.Animation.Play(this.AnimationInfos.MoveUp);
			
		}
	}
	
	var _base_MoveToDest = this.OverrideMethod("MoveToDest", function()
	{
	
		var bRet = _base_MoveToDest();

		// play corresponding animation when direction changed
		if (aniDirection != null &&
			aniDirection.XAxis() != this.Direction.XAxis() &&
			aniDirection.YAxis() != this.Direction.YAxis())
		{
			startToPlay.call(this);
		}

		return bRet;
	});
	
	var _base_StartMoving = this.OverrideMethod("StartMoving", function(oDirection, iSpeed)
	{
		doufu.System.Logger.Verbose("doufu.Game.Sprites.FourDirectionSprite::StartMoving(): Was invoked with following parameters, oDirection = " + oDirection.toString());
		
		aniDirection = oDirection;
		
		startToPlay.call(this);

		_base_StartMoving(oDirection, iSpeed);
	});
	
	var _base_StartMovingToDest = this.OverrideMethod("StartMovingToDest", function(cubeDest, iSpeed)
	{
		if (_base_StartMovingToDest(cubeDest, iSpeed))
		{
		
			aniDirection = this.Direction;
			
			// only the first call 
			if (iSpeed != null)
			{
				startToPlay.call(this);
			}
			
			return true;
		}
		
		return false;
		
	});
	
	var _base_StopMoving = this.OverrideMethod("StopMoving", function()
	{
		// Play the stopAnimation and then it will stop itself automatically.
		if (this.Direction.X() == -1 && this.AnimationInfos.StopLeft != null)
		{
			this.Animation.Play(this.AnimationInfos.StopLeft);
			
		}
		else if (this.Direction.X() == 1 && this.AnimationInfos.StopRight != null)
		{
			this.Animation.Play(this.AnimationInfos.StopRight);
			
		}
		else if (this.Direction.Y() == 1 && this.AnimationInfos.StopDown != null)
		{
			this.Animation.Play(this.AnimationInfos.StopDown);
			
		}
		else if (this.Direction.Y() == -1 && this.AnimationInfos.StopUp != null)
		{
			this.Animation.Play(this.AnimationInfos.StopUp);
			
		}
		
		_base_StopMoving();
	});
	
	this.Ctor = function()
	{
		if (oInfoSet != null)
		{
			if (!oInfoSet.InstanceOf(doufu.Game.Sprites.FourDirectionSprite.InfoSet))
			{
				throw doufu.System.Exception("doufu.Game.Sprites.FourDirectionSprite::Ctor(): oInfoSet must be an instance of doufu.Game.Sprites.FourDirectionSprite.InfoSet.");
			}
			
			this.ImagePath = oInfoSet.ImagePath;
			this.ImageOffset = oInfoSet.ImageOffset;
			this.AnimationInfos = oInfoSet.AnimationInfos;
			this.Animation.Play(this.AnimationInfos.Init);
		}
	}
	
	this.Ctor();
}

doufu.Game.Sprites.FourDirectionSprite.InfoSet = function(){
	
	doufu.OOP.Class(this);
	
	ImagePath = "";
	ImageOffset = new doufu.Display.Drawing.Point();
	AnimationInfos = {
		Init : new doufu.Game.Animation.Info(),
		MoveUp : new doufu.Game.Animation.Info(),
		MoveDown : new doufu.Game.Animation.Info(),
		MoveLeft : new doufu.Game.Animation.Info(),
		MoveRight : new doufu.Game.Animation.Info(),
		StopUp : new doufu.Game.Animation.Info(),
		StopDown : new doufu.Game.Animation.Info(),
		StopLeft : new doufu.Game.Animation.Info(),
		StopRight : new doufu.Game.Animation.Info()
	}
}