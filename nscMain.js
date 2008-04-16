nsc.System.Logger.Debug("nscMain looping in.");

//TODO: use create instead.
var GeneralDisplayManager = new nsc.Display.Manager("__NSC_NONAME_SCREEN");
nsc.System.Logger.Debug("Display area is set");

var GeneralPlayGroundManager = new nsc.Game.PlayGround(GeneralDisplayManager);

function __nsc_MainLoop(){
	var tMsg = new nsc.System.Message();
	if (nsc.System.MessageQueue.Length() > 0)
	{
		tMsg = nsc.System.MessageQueue.Shift();
	}
	nsc.Cycling.Manager.Looper(tMsg);
	setTimeout(__nsc_MainLoop,10);
}

__nsc_MainLoop();


//====================
// Test piece, should be removed when release


tmpMsg = new nsc.System.Message();
tmpMsg.Message = nsc.System.MessageConstants.DISPLAY_RENDER;


//====================