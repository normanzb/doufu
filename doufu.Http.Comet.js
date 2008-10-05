doufu.Http.Comet = function()
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.Http.Request);
	
	var bCheckResponse = false;
	
	/*
		Property: ResponseCheckInterval
		
		The interval of every response check
	*/
	this.ResponseCheckInterval = 1000;
	
	/*
		Event: OnMessageArrive
	*/
	this.OnMessageArrive = new doufu.Event.EventHandler(this);
	
	var checkResponse = function()
	{
		// TODO: check response and trigger onmessage arrive event
		
		if (bCheckResponse)
		{
			setTimeout(checkResponse, this.ResponseCheckInterval);
		}
	}
	
	var _base_Close = this.OverrideMethod("Close", function()
	{
		bCheckResponse = false;
		
		_base_Close.call(this);
	});
	
	var _base_Send = this.OverrideMethod("Send", function()
	{
		_base_Send.call(this);
		
		bCheckResponse = true;
		checkResponse();
	});
}