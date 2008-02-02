nsc.System.Logger.Debug("TEST: nscMain looping in.");

testWorkerProcess = function()
{
	//nsc.System.Logger.Debug("TEST: TWorker is doing sth.");
}

nsc.System.Logger.Debug("TEST: tWorker is defined");

testWorkerThread = new nsc.Threading.Thread(testWorkerProcess);

testWorkerThread.Start();

nsc.System.Logger.Debug("TEST: The worker func has been registered");

testPG = new nsc.Display.Manager("__NSC_NONAME_SCREEN");

nsc.System.Logger.Debug("TEST: Display area is set");

function __nsc_MainLoop(){
	var tMsg = new nsc.System.Message();
	nsc.Threading.Manager.Looper(tMsg);
	setTimeout(__nsc_MainLoop,10);
}

__nsc_MainLoop();
