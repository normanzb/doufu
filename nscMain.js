var __Global_MainLoop_Stop = false;

nsc.System.Logger.Debug("nscMain looping in.");

//TODO: use create instead.
var GeneralDisplayManager = nsc.Display.Manager.Create(document.body, "__NSC_NONAME_SCREEN", 322, 242);
nsc.System.Logger.Debug("Display area is set");

var GeneralPlayGroundManager = new nsc.Game.PlayGround(GeneralDisplayManager);

// TODO: Abstract loop
function __nsc_MainLoop(){
	var EmptyMessage = new nsc.System.Message();
	if (nsc.System.MessageQueue.Length() > 0)
	{
		EmptyMessage = nsc.System.MessageQueue.Shift();
	}
	nsc.Cycling.Manager.Looper(EmptyMessage);
	if (__Global_MainLoop_Stop == false) setTimeout(__nsc_MainLoop,10);
}

__nsc_MainLoop();


//====================
// Test piece, should be removed when release


tmpMsg = new nsc.System.Message();
tmpMsg.Handle = nsc.System.Handle.Constants.BROADCAST;
tmpMsg.Message = nsc.System.MessageConstants.DISPLAY_RENDER;

GeneralPlayGroundManager.ImagePath = CONFIG_STAGES_DIR + "stage01.gif";
GeneralPlayGroundManager.Width = 454;
GeneralPlayGroundManager.Height = 340;
GeneralPlayGroundManager.Camera().Width = 322;
GeneralPlayGroundManager.Camera().Height = 242;

nsc.System.MessageQueue.Push(tmpMsg);

nsc.SampleGame = new Object();
nsc.SampleGame.Roles = new Object();
nsc.SampleGame.Roles.GodFather = function()
{
	nsc.OOP.Class(this);
	
	this.Inherit(nsc.Game.Sprite);
	
	this.Width = 24;
	this.Height = 32;
	
	this.ImagePath = CONFIG_CHARS_FULL_DIR + "char01.gif";
}

godFather = new nsc.SampleGame.Roles.GodFather();
// TODO: Z index should be generated by something caculator, 
//			Maybe...we need to integrate it into playground? because playground is the interface between
//			Game object and display object. and ... in the pesudo 3d gaming.... the greater x is , the 
//			deeper z is, the z index is denpenden on x index, we can separate the z-index into 3 part:
//				1) playground range. 1 - 4000
//				2) object which standing on ground range. 4001 ~ 8000
//				3) object which flying on the sky range. 8001 ~ 12000

// In the meaning time, the Charas.Move just caculate the x and y because we conside them was standing on
// the ground which is a 2 dimension map, if the character want to fly, just set its z index to the flying
// on the sky range. the movement caculator just ignore the z index.

godFather.Z = 4000;

GeneralPlayGroundManager.InsertObject(godFather);

testLoop = function()
{
	nsc.System.MessageQueue.Push(tmpMsg);
	setTimeout(testLoop, 10);
}
//testLoop();
//====================