/*
	Class: doufu.Http.JSON
	
	JSON request implementation
*/
doufu.Http.JSON = function()
{
	doufu.OOP.Class(this);
	
	var CONTAINER_ID = 'doufu_Http_JSON_Container';
	var _url;
	
	// Unopen 0
	// Opened 1
	// Sent 2
	// Loading 3
	// Done 4
	this.ReadyState = 0;
	
	/*
		Property: Url
		
		Get the json data url
	*/
	this.NewProperty("Url");
	this.Url.Get = function()
	{
		return _url;
	}
	
	/*
		Function: Open
		
		Open a connection
	*/
	this.Open = function(sUrl)
	{
		_url = sUrl;
		
		this.ReadyState = 1;
	}
	
	this.Send = function()
	{
		if (this.ReadyState != 1)
		{
			throw doufu.System.Exception('doufu.Http.JSON::Send() - Conneciton was not opened.');
		}
		
		// Add a script tag to fetch json data
		
		
		var container = doufu.Browser.DOM.$s(CONTAINER_ID)
		// Check if json script tag container( a div element is existed),
		// if not create it.
		if (!container)
		{
			container = doufu.Browser.DOM.CreateElement('div');
			container.SetAttribute('id',CONTAINER_ID);
			doufu.Browser.DOM.Select('$body').AppendChild(container);
		}
		
		var script = doufu.Browser.DOM.CreateElement('script');
		script.Native().type = "text/javascript";
		script.Native().src = doufu.Http.Request.AddStampToUrl(this.Url());
		
		container.AppendChild(script);
	}
	
	this.Close = function()
	{
		
	}
};

/*
	Function: doufu.Http.JSON.GetJSONObject
	
	Get javascript object from a json string
	
	Return:
		javascript object which build from json string
*/
doufu.Http.JSON.GetObject = function(sJSONStr)
{
	eval("var tmpobj = " + sJSONStr);
	return tmpobj;
}