doufu.System.Message = function(oHandle, sMsg, wParam, lParam)
{
	if (oHandle == null)
		this.Handle = new doufu.System.Handle(0);
	else
		this.Handle = oHandle;
	
	if (sMsg == null)
		this.Message = new Number();
	else
		this.Message = sMsg;
	
	if (wParam == null)
		this.wParam = new Number();
	else
		this.wParam = wParam;
	
	if (lParam == null)
		this.lParam = new Number();
	else
		this.lParam = lParam;
}