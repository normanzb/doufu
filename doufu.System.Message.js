doufu.System.Message = function(oHandler, sMsg, wParam, lParam)
{
	if (oHandler == null)
		this.Handler = new doufu.System.Handler(0);
	else
		this.Handler = oHandler;
	
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