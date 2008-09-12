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
var GeneralDisplayManager = doufu.Display.Manager.Create(document.body, "__NSC_NONAME_SCREEN", 322, 242);
doufu.System.Logger.Debug("Display area is set");

var GeneralPlayGroundManager = new doufu.Game.PlayGround(GeneralDisplayManager);

var EmptyMessage = new doufu.System.Message();
// TODO: Abstract loop
function __nsc_MainLoop(){
	
	
	if (doufu.System.MessageQueue.Length() > 0)
	{
		// bump out all messages
		while(doufu.System.MessageQueue.Length() > 0)
		{
			doufu.Cycling.Manager.Looper(doufu.System.MessageQueue.Shift());
		}
	}
	else
	{
		//doufu.Cycling.Manager.Looper(EmptyMessage);
	}
	
	if (__Global_MainLoop_Stop == false) setTimeout(__nsc_MainLoop,10);
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
	var point1 = new doufu.Display.Drawing.Point(6, 28);
	var point2 = new doufu.Display.Drawing.Point(18, 28);
	var point3 = new doufu.Display.Drawing.Point(18, 36);
	var point4 = new doufu.Display.Drawing.Point(6, 36);
	
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
doufu.SampleGame.Roles.Grandpa = function()
{
	$c(this);
	
	this.Inherit(doufu.Game.Sprites.FourDirectionSprite);
	
	// Set the image offset
	//this.ImageOffset.X = 24*3;
	//this.ImageOffset.Y = 0;
	
	this.Width = 24;
	this.Height = 32;
	
	this.ImagePath = CONFIG_CHARS_FULL_DIR + "char01.gif";
	
	doufu.SampleGame.Roles.Helpers.SetPolygon(this);
	
	this.AnimationInfos.Init = new doufu.Game.Animation.Info();
	this.AnimationInfos.Init.Row = 2;
	this.AnimationInfos.Init.Column = 1;
	this.AnimationInfos.Init.FrameNumber = 1;
	this.AnimationInfos.Init.RepeatNumber = 1;
	this.AnimationInfos.Init.FrameSkip = 5;
	
	this.AnimationInfos.MoveRight = new doufu.Game.Animation.Info();
	this.AnimationInfos.MoveRight.Row = 1;
	this.AnimationInfos.MoveRight.Column = 0;
	this.AnimationInfos.MoveRight.FrameNumber = 3;
	this.AnimationInfos.MoveRight.RepeatNumber = -1;
	this.AnimationInfos.MoveRight.FrameSkip = 12;
	this.AnimationInfos.MoveRight.PlayReboundly = true;
	
	this.AnimationInfos.MoveLeft = new doufu.Game.Animation.Info();
	this.AnimationInfos.MoveLeft.Row = 3;
	this.AnimationInfos.MoveLeft.Column = 0;
	this.AnimationInfos.MoveLeft.FrameNumber = 3;
	this.AnimationInfos.MoveLeft.RepeatNumber = -1;
	this.AnimationInfos.MoveLeft.FrameSkip = 12;
	this.AnimationInfos.MoveLeft.PlayReboundly = true;
	
	this.AnimationInfos.MoveUp = new doufu.Game.Animation.Info();
	this.AnimationInfos.MoveUp.Row = 0;
	this.AnimationInfos.MoveUp.Column = 0;
	this.AnimationInfos.MoveUp.FrameNumber = 3;
	this.AnimationInfos.MoveUp.RepeatNumber = -1;
	this.AnimationInfos.MoveUp.FrameSkip = 12;
	this.AnimationInfos.MoveUp.PlayReboundly = true;
	
	this.AnimationInfos.MoveDown = new doufu.Game.Animation.Info();
	this.AnimationInfos.MoveDown.Row = 2;
	this.AnimationInfos.MoveDown.Column = 0;
	this.AnimationInfos.MoveDown.FrameNumber = 3;
	this.AnimationInfos.MoveDown.RepeatNumber = -1;
	this.AnimationInfos.MoveDown.FrameSkip = 12;
	this.AnimationInfos.MoveDown.PlayReboundly = true;
	
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
	
	this.ImagePath = CONFIG_CHARS_FULL_DIR + "char01.gif";
	
	doufu.SampleGame.Roles.Helpers.SetPolygon(this);
	
	this.AnimationInfos.Init = new doufu.Game.Animation.Info();
	this.AnimationInfos.Init.Row = 2;
	this.AnimationInfos.Init.Column = 4;
	this.AnimationInfos.Init.FrameNumber = 1;
	this.AnimationInfos.Init.RepeatNumber = 1;
	this.AnimationInfos.Init.FrameSkip = 5;
	
	this.AnimationInfos.MoveRight = new doufu.Game.Animation.Info();
	this.AnimationInfos.MoveRight.Row = 1;
	this.AnimationInfos.MoveRight.Column = 3;
	this.AnimationInfos.MoveRight.FrameNumber = 3;
	this.AnimationInfos.MoveRight.RepeatNumber = -1;
	this.AnimationInfos.MoveRight.FrameSkip = 12;
	this.AnimationInfos.MoveRight.PlayReboundly = true;
	
	this.AnimationInfos.MoveLeft = new doufu.Game.Animation.Info();
	this.AnimationInfos.MoveLeft.Row = 3;
	this.AnimationInfos.MoveLeft.Column = 3;
	this.AnimationInfos.MoveLeft.FrameNumber = 3;
	this.AnimationInfos.MoveLeft.RepeatNumber = -1;
	this.AnimationInfos.MoveLeft.FrameSkip = 12;
	this.AnimationInfos.MoveLeft.PlayReboundly = true;
	
	this.AnimationInfos.MoveUp = new doufu.Game.Animation.Info();
	this.AnimationInfos.MoveUp.Row = 0;
	this.AnimationInfos.MoveUp.Column = 3;
	this.AnimationInfos.MoveUp.FrameNumber = 3;
	this.AnimationInfos.MoveUp.RepeatNumber = -1;
	this.AnimationInfos.MoveUp.FrameSkip = 12;
	this.AnimationInfos.MoveUp.PlayReboundly = true;
	
	this.AnimationInfos.MoveDown = new doufu.Game.Animation.Info();
	this.AnimationInfos.MoveDown.Row = 2;
	this.AnimationInfos.MoveDown.Column = 3;
	this.AnimationInfos.MoveDown.FrameNumber = 3;
	this.AnimationInfos.MoveDown.RepeatNumber = -1;
	this.AnimationInfos.MoveDown.FrameSkip = 12;
	this.AnimationInfos.MoveDown.PlayReboundly = true;
	
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

doufu.SampleGame.Maps = new Object();
doufu.SampleGame.Maps.LonglyIsland = function(oPlayGround)
{
	$c(this);
	this.Inherit(doufu.Game.Map, [oPlayGround]);
	
	this.ImagePath = CONFIG_STAGES_DIR + "stage01.gif";
	this.Width = 454;
	this.Height = 340;
	this.Camera().X = 100;
	this.Camera().Width = 322;
	this.Camera().Height = 242;
	
	grandma = new doufu.SampleGame.Roles.Grandma();
	grandma.X = 220;
	grandma.Y = 180;
	
	this.InitSprites.Add(grandma);
}

mapLonglyIsland = new doufu.SampleGame.Maps.LonglyIsland(GeneralPlayGroundManager);
mapLonglyIsland.Initialize();

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
godFather.X = 220;
godFather.Y = 150;

GeneralPlayGroundManager.Camera().Trace(godFather);

GeneralPlayGroundManager.InsertObject(godFather);

testLoop = function()
{
	doufu.System.MessageQueue.Push(tmpMsg);
	setTimeout(testLoop, 10);
}
testLoop();
//godFather.StartMoving(new doufu.Game.Direction(16), 49)
//====================