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

nsc.System.MessageQueue.Push(tmpMsg);
//====================