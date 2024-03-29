/*
	Namespace: doufu.SampleGame
*/
doufu.SampleGame = {};

doufu.SampleGame.Name = "Sample of Doufu Framework";

/*
	Namespace: doufu.SampleGame.Roles
*/
doufu.SampleGame.Roles = new Object();
doufu.SampleGame.Roles.Helpers = new Object();
doufu.SampleGame.Roles.Helpers.SetPolygon = function(fourDirectionSprite)
{
	if (fourDirectionSprite == null || !fourDirectionSprite.InstanceOf(doufu.Game.Sprites.FourDirectionSprite))
	{
		throw doufu.System.Exception("doufu.SampleGame.Roles.Helpers.SetPolygon(): fourDirectionSprite must be an instance of doufu.Game.Sprites.FourDirectionSprite.");
	}
	
	// use polygon, slower
	var point1 = new doufu.Display.Drawing.Vector(6, 28);
	var point2 = new doufu.Display.Drawing.Vector(18, 28);
	var point3 = new doufu.Display.Drawing.Vector(18, 36);
	var point4 = new doufu.Display.Drawing.Vector(6, 36);
	
	var polygon = new doufu.Display.Drawing.Polygon();
	
	polygon.AddArray([point1, point2, point3, point4]);
		
	// use rectangle, faster
	var oRect = new doufu.Display.Drawing.Rectangle();
	oRect.X = 6;
	oRect.Y = 28;
	oRect.Width = 12;
	oRect.Height = 8;
	if (fourDirectionSprite.InstanceOf(doufu.SampleGame.Roles.MaskKillerGiant))
	{
		oRect.X = 12;
		oRect.Y = 56;
		oRect.Width = 24;
		oRect.Height = 16;
	}

	
	fourDirectionSprite.Shape = oRect;
}

doufu.SampleGame.Roles.Helpers.SetAnimation = function(fourDirectionSprite)
{
	if (fourDirectionSprite == null || !fourDirectionSprite.InstanceOf(doufu.Game.Sprites.FourDirectionSprite))
	{
		throw doufu.System.Exception("doufu.SampleGame.Roles.Helpers.SetPolygon(): fourDirectionSprite must be an instance of doufu.Game.Sprites.FourDirectionSprite.");
	}
	
	var frameNumber = 3;
	var repeatNumber = -1;
	var frameSkip = 1;
	var playreboundly = true;
	
	fourDirectionSprite.AnimationInfos.MoveRight = new doufu.Game.Animation.Info();
	fourDirectionSprite.AnimationInfos.MoveRight.FrameNumber = frameNumber;
	fourDirectionSprite.AnimationInfos.MoveRight.RepeatNumber = repeatNumber;
	fourDirectionSprite.AnimationInfos.MoveRight.FrameSkip = frameSkip;
	fourDirectionSprite.AnimationInfos.MoveRight.PlayReboundly = playreboundly;
	
	fourDirectionSprite.AnimationInfos.MoveLeft = new doufu.Game.Animation.Info();
	fourDirectionSprite.AnimationInfos.MoveLeft.FrameNumber = frameNumber;
	fourDirectionSprite.AnimationInfos.MoveLeft.RepeatNumber = repeatNumber;
	fourDirectionSprite.AnimationInfos.MoveLeft.FrameSkip = frameSkip;
	fourDirectionSprite.AnimationInfos.MoveLeft.PlayReboundly = playreboundly;
	
	fourDirectionSprite.AnimationInfos.MoveUp = new doufu.Game.Animation.Info();
	fourDirectionSprite.AnimationInfos.MoveUp.FrameNumber = frameNumber;
	fourDirectionSprite.AnimationInfos.MoveUp.RepeatNumber = repeatNumber;
	fourDirectionSprite.AnimationInfos.MoveUp.FrameSkip = frameSkip;
	fourDirectionSprite.AnimationInfos.MoveUp.PlayReboundly = playreboundly;
	
	fourDirectionSprite.AnimationInfos.MoveDown = new doufu.Game.Animation.Info();
	fourDirectionSprite.AnimationInfos.MoveDown.FrameNumber = frameNumber;
	fourDirectionSprite.AnimationInfos.MoveDown.RepeatNumber = repeatNumber;
	fourDirectionSprite.AnimationInfos.MoveDown.FrameSkip = frameSkip;
	fourDirectionSprite.AnimationInfos.MoveDown.PlayReboundly = playreboundly;
}

doufu.SampleGame.Roles.Base = function()
{
	$c(this);
	
	this.Inherit(doufu.Game.Sprites.FourDirectionSprite);
	
	this.WalkSpeed = 249;
	this.RunSpeed = 549;
	
	var drctWest = new doufu.Game.Direction(48);
	var drctEast = new doufu.Game.Direction(16);
	var drctNorth = new doufu.Game.Direction(12);
	var drctSouth = new doufu.Game.Direction(4);
		
	var bubbles = new doufu.SpeechBubbles.GameBubble(this);
	
	this.Name = "";
	
	this.WalkNorth = function()
	{
		this.StartMoving(drctNorth, this.WalkSpeed);
	}
	
	this.WalkSouth = function()
	{
		this.StartMoving(drctSouth, this.WalkSpeed);
	}
	
	this.WalkEast = function()
	{
		this.StartMoving(drctEast, this.WalkSpeed);
	}
	
	this.WalkWest = function()
	{
		this.StartMoving(drctWest, this.WalkSpeed);
	}
	
	this.RunNorth = function()
	{
		this.StartMoving(drctNorth, this.RunSpeed);
	}
	
	this.RunSouth = function()
	{
		this.StartMoving(drctSouth, this.RunSpeed);
	}
	
	this.RunEast = function()
	{
		this.StartMoving(drctEast, this.RunSpeed);
	}
	
	this.RunWest = function()
	{
		this.StartMoving(drctWest, this.RunSpeed);
	}
	
	this.Say = function(sMsg)
	{
		bubbles.Popup(sMsg);
	}
}

doufu.SampleGame.Roles.Grandpa = function()
{
	$c(this);
	
	this.Inherit(doufu.SampleGame.Roles.Base);
	
	// Set the image offset
	//this.ImageOffset.X = 24*3;
	//this.ImageOffset.Y = 0;
	
	this.Width = 24;
	this.Height = 32;
	
	this.StandingOffset.X = 12;
	this.StandingOffset.Y = 30;
	
	this.ImagePath = CONFIG_CHARS_PATH + "char01.gif";
	
	doufu.SampleGame.Roles.Helpers.SetPolygon(this);
	
	this.AnimationInfos.Init = new doufu.Game.Animation.Info();
	this.AnimationInfos.Init.Row = 2;
	this.AnimationInfos.Init.Column = 1;
	this.AnimationInfos.Init.FrameNumber = 1;
	this.AnimationInfos.Init.RepeatNumber = 1;
	this.AnimationInfos.Init.FrameSkip = 5;
	
	doufu.SampleGame.Roles.Helpers.SetAnimation(this);
	
	this.AnimationInfos.MoveRight.Row = 1;
	this.AnimationInfos.MoveRight.Column = 0;
	
	this.AnimationInfos.MoveLeft.Row = 3;
	this.AnimationInfos.MoveLeft.Column = 0;
	
	this.AnimationInfos.MoveUp.Row = 0;
	this.AnimationInfos.MoveUp.Column = 0;
	
	this.AnimationInfos.MoveDown.Row = 2;
	this.AnimationInfos.MoveDown.Column = 0;
	
	this.AnimationInfos.StopRight = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopRight.Row = 1;
	this.AnimationInfos.StopRight.Column = 1;
	this.AnimationInfos.StopRight.FrameNumber = 1;
	this.AnimationInfos.StopRight.RepeatNumber = 1;
	
	this.AnimationInfos.StopLeft = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopLeft.Row = 3;
	this.AnimationInfos.StopLeft.Column = 1;
	this.AnimationInfos.StopLeft.FrameNumber = 1;
	this.AnimationInfos.StopLeft.RepeatNumber = 1;
	
	this.AnimationInfos.StopUp = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopUp.Row = 0;
	this.AnimationInfos.StopUp.Column = 1;
	this.AnimationInfos.StopUp.FrameNumber = 1;
	this.AnimationInfos.StopUp.RepeatNumber = 1;
	
	this.AnimationInfos.StopDown = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopDown.Row = 2;
	this.AnimationInfos.StopDown.Column = 1;
	this.AnimationInfos.StopDown.FrameNumber = 1;
	this.AnimationInfos.StopDown.RepeatNumber = 1;
	
	this.Animation.Play(this.AnimationInfos.Init);
	
}
doufu.SampleGame.Roles.Grandma = function()
{
	$c(this);
	
	this.Inherit(doufu.SampleGame.Roles.Base);
	
	this.Width = 24;
	this.Height = 32;
	
	this.StandingOffset.X = 12;
	this.StandingOffset.Y = 30;
	
	this.ImagePath = CONFIG_CHARS_PATH + "char01.gif";
	
	doufu.SampleGame.Roles.Helpers.SetPolygon(this);
	
	this.AnimationInfos.Init = new doufu.Game.Animation.Info();
	this.AnimationInfos.Init.Row = 2;
	this.AnimationInfos.Init.Column = 4;
	this.AnimationInfos.Init.FrameNumber = 1;
	this.AnimationInfos.Init.RepeatNumber = 1;
	this.AnimationInfos.Init.FrameSkip = 5;
	
	doufu.SampleGame.Roles.Helpers.SetAnimation(this);
	
	this.AnimationInfos.MoveRight.Row = 1;
	this.AnimationInfos.MoveRight.Column = 3;
	
	this.AnimationInfos.MoveLeft.Row = 3;
	this.AnimationInfos.MoveLeft.Column = 3;
	
	this.AnimationInfos.MoveUp.Row = 0;
	this.AnimationInfos.MoveUp.Column = 3;
	
	this.AnimationInfos.MoveDown.Row = 2;
	this.AnimationInfos.MoveDown.Column = 3;
	
	this.AnimationInfos.StopRight = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopRight.Row = 1;
	this.AnimationInfos.StopRight.Column = 4;
	this.AnimationInfos.StopRight.FrameNumber = 1;
	this.AnimationInfos.StopRight.RepeatNumber = 1;
	
	this.AnimationInfos.StopLeft = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopLeft.Row = 3;
	this.AnimationInfos.StopLeft.Column = 4;
	this.AnimationInfos.StopLeft.FrameNumber = 1;
	this.AnimationInfos.StopLeft.RepeatNumber = 1;
	
	this.AnimationInfos.StopUp = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopUp.Row = 0;
	this.AnimationInfos.StopUp.Column = 4;
	this.AnimationInfos.StopUp.FrameNumber = 1;
	this.AnimationInfos.StopUp.RepeatNumber = 1;
	
	this.AnimationInfos.StopDown = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopDown.Row = 2;
	this.AnimationInfos.StopDown.Column = 4;
	this.AnimationInfos.StopDown.FrameNumber = 1;
	this.AnimationInfos.StopDown.RepeatNumber = 1;
	
	this.Animation.Play(this.AnimationInfos.Init);
	
}

doufu.SampleGame.Roles.MaskKiller = function()
{
	$c(this);
	
	this.Inherit(doufu.SampleGame.Roles.Base);
	
	this.Width = 24;
	this.Height = 32;
	
	this.StandingOffset.X = 12;
	this.StandingOffset.Y = 30;
	
	this.ImagePath = CONFIG_CHARS_PATH + "char03.gif";
	
	doufu.SampleGame.Roles.Helpers.SetPolygon(this);
	
	this.Giantize = function()
	{
		this.ImagePath = CONFIG_CHARS_PATH + "char04.png";
		
		this.Y = this.Y + this.Height - 64;
		this.X = this.X + this.Width / 2 - 48 / 2;
		
		this.Width = 48;
		this.Height = 64;
		
		this.StandingOffset.X = 24;
		this.StandingOffset.Y = 60;
		
		var oRect = new doufu.Display.Drawing.Rectangle();
		oRect.X = 12;
		oRect.Y = 56;
		oRect.Width = 24;
		oRect.Height = 16;
		this.Shape = oRect;
		
		this.Animation.Play(this.AnimationInfos.Init);
	}
	
	this.AnimationInfos.Init = new doufu.Game.Animation.Info();
	this.AnimationInfos.Init.Row = 2;
	this.AnimationInfos.Init.Column = 1;
	this.AnimationInfos.Init.FrameNumber = 1;
	this.AnimationInfos.Init.RepeatNumber = 1;
	this.AnimationInfos.Init.FrameSkip = 5;
	
	doufu.SampleGame.Roles.Helpers.SetAnimation(this);
	
	this.AnimationInfos.MoveRight.Row = 1;
	this.AnimationInfos.MoveRight.Column = 0;
	
	this.AnimationInfos.MoveLeft.Row = 3;
	this.AnimationInfos.MoveLeft.Column = 0;
	
	this.AnimationInfos.MoveUp.Row = 0;
	this.AnimationInfos.MoveUp.Column = 0;
	
	this.AnimationInfos.MoveDown.Row = 2;
	this.AnimationInfos.MoveDown.Column = 0;
	
	this.AnimationInfos.StopRight = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopRight.Row = 1;
	this.AnimationInfos.StopRight.Column = 1;
	this.AnimationInfos.StopRight.FrameNumber = 1;
	this.AnimationInfos.StopRight.RepeatNumber = 1;
	
	this.AnimationInfos.StopLeft = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopLeft.Row = 3;
	this.AnimationInfos.StopLeft.Column = 1;
	this.AnimationInfos.StopLeft.FrameNumber = 1;
	this.AnimationInfos.StopLeft.RepeatNumber = 1;
	
	this.AnimationInfos.StopUp = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopUp.Row = 0;
	this.AnimationInfos.StopUp.Column = 1;
	this.AnimationInfos.StopUp.FrameNumber = 1;
	this.AnimationInfos.StopUp.RepeatNumber = 1;
	
	this.AnimationInfos.StopDown = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopDown.Row = 2;
	this.AnimationInfos.StopDown.Column = 1;
	this.AnimationInfos.StopDown.FrameNumber = 1;
	this.AnimationInfos.StopDown.RepeatNumber = 1;
	
	this.Animation.Play(this.AnimationInfos.Init);
	
}
doufu.SampleGame.Roles.MaskKillerGiant = function()
{
	$c(this);
	
	this.Inherit(doufu.SampleGame.Roles.Base);
	
	this.Width = 48;
	this.Height = 64;
	
	this.StandingOffset.X = 24;
	this.StandingOffset.Y = 60;
	
	this.ImagePath = CONFIG_CHARS_PATH + "char04.png";
	
	doufu.SampleGame.Roles.Helpers.SetPolygon(this);
	
	this.AnimationInfos.Init = new doufu.Game.Animation.Info();
	this.AnimationInfos.Init.Row = 2;
	this.AnimationInfos.Init.Column = 1;
	this.AnimationInfos.Init.FrameNumber = 1;
	this.AnimationInfos.Init.RepeatNumber = 1;
	this.AnimationInfos.Init.FrameSkip = 5;
	
	doufu.SampleGame.Roles.Helpers.SetAnimation(this);
	
	this.AnimationInfos.MoveRight.Row = 1;
	this.AnimationInfos.MoveRight.Column = 0;
	
	this.AnimationInfos.MoveLeft.Row = 3;
	this.AnimationInfos.MoveLeft.Column = 0;
	
	this.AnimationInfos.MoveUp.Row = 0;
	this.AnimationInfos.MoveUp.Column = 0;
	
	this.AnimationInfos.MoveDown.Row = 2;
	this.AnimationInfos.MoveDown.Column = 0;
	
	this.AnimationInfos.StopRight = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopRight.Row = 1;
	this.AnimationInfos.StopRight.Column = 1;
	this.AnimationInfos.StopRight.FrameNumber = 1;
	this.AnimationInfos.StopRight.RepeatNumber = 1;
	
	this.AnimationInfos.StopLeft = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopLeft.Row = 3;
	this.AnimationInfos.StopLeft.Column = 1;
	this.AnimationInfos.StopLeft.FrameNumber = 1;
	this.AnimationInfos.StopLeft.RepeatNumber = 1;
	
	this.AnimationInfos.StopUp = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopUp.Row = 0;
	this.AnimationInfos.StopUp.Column = 1;
	this.AnimationInfos.StopUp.FrameNumber = 1;
	this.AnimationInfos.StopUp.RepeatNumber = 1;
	
	this.AnimationInfos.StopDown = new doufu.Game.Animation.Info();
	this.AnimationInfos.StopDown.Row = 2;
	this.AnimationInfos.StopDown.Column = 1;
	this.AnimationInfos.StopDown.FrameNumber = 1;
	this.AnimationInfos.StopDown.RepeatNumber = 1;
	
	this.Animation.Play(this.AnimationInfos.Init);
	
}
doufu.SampleGame.Items = {};
doufu.SampleGame.Items.Flower = function()
{
	$c(this);
	
	this.Inherit(doufu.Game.Sprites.Sprite);
	
	this.Width = 23;
	this.Height = 33;
	
	this.StandingOffset.X = 12;
	this.StandingOffset.Y = 28;
	
	this.ImagePath = CONFIG_PLANTS_PATH + "flower01.gif";
	
	this.AnimationInfos = {};
	
	this.AnimationInfos.Init = new doufu.Game.Animation.Info();
	this.AnimationInfos.Init.Row = 0;
	this.AnimationInfos.Init.Column = 0;
	this.AnimationInfos.Init.FrameNumber = 1;
	this.AnimationInfos.Init.RepeatNumber = 1;
	
	this.Animation.Play(this.AnimationInfos.Init);
	
}

doufu.SampleGame.Items.GiantCloud = function()
{
	$c(this);
	
	this.Inherit(doufu.Game.Sprites.Sprite);
	
	this.Width = 532;
	this.Height = 282;
	
	this.ImagePath = CONFIG_OTHERS_PATH + "CloudG.png";
	
	this.AnimationInfos = {};
	
	this.AnimationInfos.Init = new doufu.Game.Animation.Info();
	this.AnimationInfos.Init.Row = 0;
	this.AnimationInfos.Init.Column = 0;
	this.AnimationInfos.Init.FrameNumber = 1;
	this.AnimationInfos.Init.RepeatNumber = 1;
	
	this.Animation.Play(this.AnimationInfos.Init);
	
}

doufu.SampleGame.Items.BigCloud = function()
{
	$c(this);
	
	this.Inherit(doufu.Game.Sprites.Sprite);
	
	this.Width = 72;
	this.Height = 35;
	
	this.ImagePath = CONFIG_OTHERS_PATH + "CloudB.png";
	
	this.AnimationInfos = {};
	
	this.AnimationInfos.Init = new doufu.Game.Animation.Info();
	this.AnimationInfos.Init.Row = 0;
	this.AnimationInfos.Init.Column = 0;
	this.AnimationInfos.Init.FrameNumber = 1;
	this.AnimationInfos.Init.RepeatNumber = 1;
	
	this.Animation.Play(this.AnimationInfos.Init);
	
}

doufu.SampleGame.Items.MediumCloud = function()
{
	$c(this);
	
	this.Inherit(doufu.Game.Sprites.Sprite);
	
	this.Width = 33;
	this.Height = 16;
	
	this.ImagePath = CONFIG_OTHERS_PATH + "CloudM.png";
	
	this.AnimationInfos = {};
	
	this.AnimationInfos.Init = new doufu.Game.Animation.Info();
	this.AnimationInfos.Init.Row = 0;
	this.AnimationInfos.Init.Column = 0;
	this.AnimationInfos.Init.FrameNumber = 1;
	this.AnimationInfos.Init.RepeatNumber = 1;
	
	this.Animation.Play(this.AnimationInfos.Init);
	
}

doufu.SampleGame.Items.SmallCloud = function()
{
	$c(this);
	
	this.Inherit(doufu.Game.Sprites.Sprite);
	
	this.Width = 45;
	this.Height = 22;
	
	this.ImagePath = CONFIG_OTHERS_PATH + "CloudS.png";
	
	this.AnimationInfos = {};
	
	this.AnimationInfos.Init = new doufu.Game.Animation.Info();
	this.AnimationInfos.Init.Row = 0;
	this.AnimationInfos.Init.Column = 0;
	this.AnimationInfos.Init.FrameNumber = 1;
	this.AnimationInfos.Init.RepeatNumber = 1;
	
	this.Animation.Play(this.AnimationInfos.Init);
	
}

doufu.SampleGame.Maps = new Object();
doufu.SampleGame.Maps.MyIsland = function(oPlayGround)
{
	$c(this);
	this.Inherit(doufu.Game.Map, [oPlayGround]);
	
	this.ImagePath = CONFIG_STAGES_PATH + "Stage01.gif";
	//this.BackgroundImagePath(CONFIG_STAGES_PATH + "Stage02_bg.gif");
	
	var _playgroundOnly = false;
	this.NewProperty("PlaygroundOnly");
	this.PlaygroundOnly.Get = function()
	{
		return _playgroundOnly;
	}
	this.PlaygroundOnly.Set = function(value)
	{
		_playgroundOnly = value;
	}
	
	this.Width = 454;
	this.Height = 340;
	
	// todo add helper to create walls
	v1 = new doufu.Display.Drawing.Vector(170, 475);
	v2 = new doufu.Display.Drawing.Vector(405, 605);
	v3 = new doufu.Display.Drawing.Vector(610, 385);
	v4 = new doufu.Display.Drawing.Vector(380, 245);
		
		
	var p1 = new doufu.Display.Drawing.Polygon();
	p1.AddArray([v1, v2]);
	var p2 = new doufu.Display.Drawing.Polygon();
	p2.AddArray([v2, v3]);
	var p3 = new doufu.Display.Drawing.Polygon();
	p3.AddArray([v3, v4]);
	var p4 = new doufu.Display.Drawing.Polygon();
	p4.AddArray([v4, v1]);
	
	this.Shapes.AddArray([p1, p2, p3, p4]);

	
	var flower = new doufu.SampleGame.Items.Flower();
	flower.X = 227;
	flower.Y = 193;
	var c0 = new doufu.SampleGame.Items.GiantCloud();
	c0.X = 600;
	c0.Y = 300;
	c0.Z = 1;
	c0.StartMoving(new doufu.Game.Direction(48), 99);
	var c1 = new doufu.SampleGame.Items.BigCloud();
	c1.X = 690;
	c1.Y = 90;
	c1.Z = 1;
	c1.StartMoving(new doufu.Game.Direction(48), 48);
	var c2 = new doufu.SampleGame.Items.MediumCloud();
	c2.X = 720;
	c2.Y = 280;
	c2.Z = -1;
	c2.StartMoving(new doufu.Game.Direction(48), 47);
	var c3 = new doufu.SampleGame.Items.SmallCloud();
	c3.X = 780;
	c3.Y = 100;
	c3.Z = -1;
	c3.StartMoving(new doufu.Game.Direction(48), 46);
	
	
	var _base_Initialize = this.OverrideMethod("Initialize", function()
	{
		if (!this.PlaygroundOnly())
		{
			this.InitSprites.Add(flower);
			this.InitSprites.Add(c0);
			this.InitSprites.Add(c1);
			this.InitSprites.Add(c2);
			this.InitSprites.Add(c3);
		}
		_base_Initialize.call(this);
	});
}
doufu.SampleGame.Maps.LonglyIsland = function(oPlayGround)
{
	$c(this);
	this.Inherit(doufu.Game.Map, [oPlayGround]);
	
	this.ImagePath = CONFIG_STAGES_PATH + "Stage02.gif";
	this.BackgroundImagePath(CONFIG_STAGES_PATH + "Stage02_bg.gif");
	
	this.Width = 800;
	this.Height = 600;
	//this.Camera().X = 100;
	//this.Camera().Width = 322;
	//this.Camera().Height = 242;
	
	var goodGuy;
	this.NewProperty("GoodGuy");
	this.GoodGuy.Get = function()
	{
		return goodGuy;
	}
	this.GoodGuy.Set = function(value)
	{
		goodGuy = value;
	}
	
	var badGuy;
	this.NewProperty("BadGuy");
	this.BadGuy.Get = function()
	{
		return badGuy;
	}
	this.BadGuy.Set = function(value)
	{
		badGuy = value;
	}
	
	
	// todo add helper to create walls
	v1 = new doufu.Display.Drawing.Vector(170, 475);
	v2 = new doufu.Display.Drawing.Vector(405, 605);
	v3 = new doufu.Display.Drawing.Vector(610, 385);
	v4 = new doufu.Display.Drawing.Vector(380, 245);
		
		
	var p1 = new doufu.Display.Drawing.Polygon();
	p1.AddArray([v1, v2]);
	var p2 = new doufu.Display.Drawing.Polygon();
	p2.AddArray([v2, v3]);
	var p3 = new doufu.Display.Drawing.Polygon();
	p3.AddArray([v3, v4]);
	var p4 = new doufu.Display.Drawing.Polygon();
	p4.AddArray([v4, v1]);
	
	this.Shapes.AddArray([p1, p2, p3, p4]);
	
	// adding characters
	var myTrigger = new doufu.Game.EventTrigger();
	
	var grandma = new doufu.SampleGame.Roles.Grandma();
	grandma.X = 420;
	grandma.Y = 405;
	
	var triggerWhere = new doufu.Display.Drawing.Cube();
	triggerWhere.X = grandma.X - 10;
	triggerWhere.Y = grandma.Y - 10;
	triggerWhere.Width = grandma.Width + 20;
	triggerWhere.Height = grandma.Height + 20;
	
	myTrigger.Where(triggerWhere);
	myTrigger.OnTrigger.Attach(new doufu.Event.CallBack(function(sender, args)
	{
		if (args.Who.Attributes.GoodGuy == true)
		{
			grandma.Say("Hi Honey!");
		}
		else
		{
			grandma.Say("ahhhhhh!!!!!!! Leave me alone!");
		}
		
		//args.Who.StopMoving();
	}, this));
	
	
	var flower = new doufu.SampleGame.Items.Flower();
	flower.X = 247;
	flower.Y = 443;
	var c0 = new doufu.SampleGame.Items.GiantCloud();
	c0.X = 600;
	c0.Y = 500;
	c0.Z = 1;
	c0.StartMoving(new doufu.Game.Direction(48), 99);
	var c1 = new doufu.SampleGame.Items.BigCloud();
	c1.X = 690;
	c1.Y = 290;
	c1.Z = 1;
	c1.StartMoving(new doufu.Game.Direction(48), 48);
	var c2 = new doufu.SampleGame.Items.MediumCloud();
	c2.X = 720;
	c2.Y = 480;
	c2.Z = -1;
	c2.StartMoving(new doufu.Game.Direction(48), 47);
	var c3 = new doufu.SampleGame.Items.SmallCloud();
	c3.X = 780;
	c3.Y = 300;
	c3.Z = -1;
	c3.StartMoving(new doufu.Game.Direction(48), 46);
	
	this.InitSprites.Add(grandma);
	this.InitSprites.Add(flower);
	this.InitSprites.Add(c0);
	this.InitSprites.Add(c1);
	this.InitSprites.Add(c2);
	this.InitSprites.Add(c3);
	
	var _base_Initialize = this.OverrideMethod("Initialize", function()
	{
		if (this.GoodGuy() != null)
		{
			myTrigger.Monitor(this.GoodGuy());
		}
		if (this.BadGuy() != null)
		{
			myTrigger.Monitor(this.BadGuy());
		}
		_base_Initialize.call(this);
	});
}