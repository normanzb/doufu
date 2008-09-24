/////////////////////////////////
// User Interact and Game Display Architecture of Doufu Framework
/////////////////////////////////
// Computer Screen
//		|
// Display Manager: render every display object which attached to it to the screen
// 		This manager owned a single cycle.
//		|
// PlayGround: Mapping every game object property to corresponding display object.
//
//		Since playground manager is inherited from display object,
//		It will attach itself to display manager while initializing so 
//		that it can be invoked at the first time when a render message
//		was dispatched into display manager.
//
//		Another importance is PlayGround manager also caculating the the displayed 
//		sprite offset in screen with its actual offset in game, for instance, says we
//		have a fake 3d interface at an angle of 45 degree, the player with the actual
//		world offset x = 20, y = 20 should mapped to screen offset x = 20 y = 10,
//		PlayGround manager handling that.
//
//		Playground manager share the same cycle with display manager.
// 
// Operation Retriever: Get operation events from message queue, and invoke 
//		corresponding the method of user controlled character.
// 

// Force IE to use cache.
if (doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Explorer)
{
	document.execCommand("BackgroundImageCache",false,true);
}

var __Global_MainLoop_Stop = false;

doufu.System.Logger.Debug("nscMain looping in.");

// Create a display manager (and its display area)
var GeneralDisplayManager = doufu.Display.Manager.Create(document.body, "__NSC_NONAME_SCREEN", 322, 200);
doufu.System.Logger.Debug("Display area is set");

var GeneralPlayGroundManager = new doufu.Game.PlayGround(GeneralDisplayManager);

var EmptyMessage = new doufu.System.Message();
var loopTimeout = 70;

// TODO: Abstract loop
function __nsc_MainLoop(){
	var startTime = new Date().getTime();
	
	if (doufu.System.MessageQueue.Length() > 0)
	{
		// bump out all messages
		while(doufu.System.MessageQueue.Length() > 0)
		{
			doufu.System.Logger.Verbose("__nsc_MainLoop(): Start Looper.");
			doufu.Cycling.Manager.Looper(doufu.System.MessageQueue.Shift());
			doufu.System.Logger.Verbose("__nsc_MainLoop(): Looper Ended.");
		}
	}
	else
	{
		//doufu.Cycling.Manager.Looper(EmptyMessage);
	}
	var lastTimeout = loopTimeout - new Date().getTime() + startTime;
	if (lastTimeout < 10)
	{
		lastTimeout = 10;
	}
	
	if (__Global_MainLoop_Stop == false) setTimeout(__nsc_MainLoop, lastTimeout);
}

__nsc_MainLoop();


//====================
// Test piece, should be removed when release


tmpMsg = new doufu.System.Message();
tmpMsg.Handle = doufu.System.Handle.Constants.BROADCAST;
tmpMsg.Message = doufu.System.MessageConstants.DISPLAY_RENDER;

doufu.System.MessageQueue.Push(tmpMsg);

doufu.SampleGame = new Object();
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
	
	fourDirectionSprite.Sharp = oRect;
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

doufu.SampleGame.Roles.Grandpa = function()
{
	$c(this);
	
	this.Inherit(doufu.Game.Sprites.FourDirectionSprite);
	
	// Set the image offset
	//this.ImageOffset.X = 24*3;
	//this.ImageOffset.Y = 0;
	
	this.Width = 24;
	this.Height = 32;
	
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
	
	this.Inherit(doufu.Game.Sprites.FourDirectionSprite);
	
	this.Width = 24;
	this.Height = 32;
	
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
	
	this.Inherit(doufu.Game.Sprites.FourDirectionSprite);
	
	this.Width = 24;
	this.Height = 32;
	
	this.ImagePath = CONFIG_CHARS_PATH + "char03.png";
	
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
	
	this.Sharps
	this.Sharps.AddArray([p1, p2, p3, p4]);
	
	// adding characters
	var myTrigger = new doufu.Game.EventTrigger();
	
	var grandma = new doufu.SampleGame.Roles.Grandma();
	grandma.X = 420;
	grandma.Y = 405;
	
	var triggerWhere = new doufu.Display.Drawing.Cube();
	triggerWhere.X = grandma.X - 20;
	triggerWhere.Y = grandma.Y - 20;
	triggerWhere.Width = grandma.Width + 40;
	triggerWhere.Height = grandma.Height + 40;
	
	myTrigger.Where(triggerWhere);
	myTrigger.OnTrigger.Attach(new doufu.Event.CallBack(function()
	{
		alert("Hi Honey!");
	}, this));
	
	var flower = new doufu.SampleGame.Items.Flower();
	flower.X = 247;
	flower.Y = 443;
	var c0 = new doufu.SampleGame.Items.GiantCloud();
	c0.X = 600;
	c0.Y = 340;
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
		myTrigger.Monitor(this.GoodGuy());
		_base_Initialize.call(this);
	});
}

mKiller = new doufu.SampleGame.Roles.MaskKiller();
mKiller.X = 480;
mKiller.Y = 300;
	
godFather = new doufu.SampleGame.Roles.Grandpa()

// TODO: Z index should be generated by something caculator, 
//			Maybe...we need to integrate it into playground? because playground is the interface between
//			Game object and display object. and ... in the pesudo 3d gaming.... the greater x is , the 
//			deeper z is, the z index is denpenden on x index, we can separate the z-index into 3 part:
//				1) Something not display (covered by playground). 0 - 2000
//				2) playground range. 2001 - 4000
//				3) object which standing on ground range. 4001 ~ 8000
//				4) object which flying on the sky range. 8001 ~ 12000

// In the meaning time, the Charas.Move just caculate the x and y because we conside them was standing on
// the ground which is a 2 dimension map, if the character want to fly, just set its z index to the flying
// on the sky range. the movement caculator just ignore the z index.

godFather.Z = 0;
godFather.X = 320;
godFather.Y = 350;

mapLonglyIsland = new doufu.SampleGame.Maps.LonglyIsland(GeneralPlayGroundManager);
mapLonglyIsland.GoodGuy(godFather);
mapLonglyIsland.Initialize();

GeneralPlayGroundManager.Camera().SmoothTracing = true;
GeneralPlayGroundManager.Camera().SkipFrame = 0;
GeneralPlayGroundManager.Camera().Trace(godFather);

GeneralPlayGroundManager.InsertObject(godFather);
GeneralPlayGroundManager.InsertObject(mKiller);

testLoop = function()
{
	var startTime = new Date().getTime();
	
	doufu.System.MessageQueue.Push(tmpMsg);
	
	var lastTimeout = loopTimeout - new Date().getTime() + startTime;
	if (lastTimeout < 10)
	{
		lastTimeout = 10;
	}
	
	setTimeout(testLoop, lastTimeout);
}
testLoop();
//godFather.StartMoving(new doufu.Game.Direction(16), 49)
//====================