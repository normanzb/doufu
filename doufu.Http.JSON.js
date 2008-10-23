/*
	Class: doufu.Http.JSON
	
	JSON request implementation
	
	Sample
		json = new doufu.Http.JSON();
		json.Open('http://jsondatatest.appjet.net/?keyword=mandelbrot_set','callback');
		json.OnSuccess.Attach(new doufu.Event.CallBack(function(s,o){alert(o.ResponseJSON.content)},this));
		json.Send();
*/
doufu.Http.JSON = function()
{
	doufu.OOP.Class(this);
	
	this.Inherit(doufu.System.Handle.Handlable);
	
	this.Handle = doufu.System.Handle.Generate();
	
	var CONTAINER_ID = 'doufu_Http_JSON_Container';
	var _url;
	var _callbackParameterName;
	var sGCallbackFunc;
	
	// Unopen 0
	// Opened 1
	// Sent 2
	// Loading 3
	// Done 4
	this.ReadyState = 0;
	
	/*
		Property: Url
		
		<doufu.Property>
		Get the json data url
	*/
	this.NewProperty("Url");
	this.Url.Get = function()
	{
		return _url;
	}
	
	/*
		Property: CallbackParameterName
		
		<doufu.Property>
		Get the CallbackParameterName
	*/
	this.NewProperty("CallbackParameterName");
	this.CallbackParameterName.Get = function()
	{
		return _callbackParameterName;
	}
	
	/*
		Property: ScriptElement
		
		<doufu.Property>
		Get the script element which used for getting the remote json data.
	*/
	var script;
	this.NewProperty("ScriptElement");
	this.ScriptElement.Get = function()
	{
		return script;
	}
	
	/*
		Property: ResponseJSON
		
		<doufu.Property>
		Get the responded json object
	*/
	var responseJSON;
	this.NewProperty("ResponseJSON");
	this.ResponseJSON.Get = function()
	{
		return responseJSON;
	}
	this.ResponseJSON.Set = function(value)
	{
		responseJSON = value;
	}
	
	/*
		Property: ResponseText
		
		<doufu.Property>
		Get the responded stringified json text.
	*/
	this.NewProperty("ResponseText");
	this.ResponseText.Get = function()
	{
		return this.ScriptElement().innerHTML;
	}
	
	/*
		Event: OnSuccess
	*/
	this.OnSuccess = new doufu.Event.EventHandler(this);
	
	/*
		Function: Open
		
		Open a connection
	*/
	this.Open = function(sUrl, sCallbackParameterName)
	{
		_url = sUrl;
		_callbackParameterName = sCallbackParameterName;
		
		// register this instance to callback manager.
		sGCallbackFunc = doufu.Http.JSON.CallbackManager.Register(this);
		
		this.ReadyState = 1;
	}
	
	this.Send = function()
	{
		if (this.ReadyState != 1)
		{
			throw doufu.System.Exception('doufu.Http.JSON::Send() - Conneciton was not opened.');
		}
		
		if (_callbackParameterName != null)
		{
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
			
			script = doufu.Browser.DOM.CreateElement('script');
			script.Native().type = "text/javascript";
			script.Native().src = doufu.Http.AddStampToUrl(doufu.Http.AddParameterToUrl(this.Url(), _callbackParameterName, sGCallbackFunc));
			
			container.AppendChild(script);
		}
		else
		{
			// TODO: use xmlhttprequest to get json data
			var rq = new doufu.Http.Request();
			rq.OnSuccess.Attach(new doufu.Event.CallBack(function(sender, args)
			{
				alert(this == a);
				this.OnSuccess.Invoke({
					"ResponseJSON": doufu.Http.JSON.Parse(args.ResponseText)
				});
			},this));
			rq.Open('GET', this.Url(), true);
			rq.Send();
		}
	}
	
	this.Close = function()
	{
		if (_callbackParameterName != null)
		{
			doufu.Http.JSON.CallbackManager.Unregister(this);
		}
	}
	
	this.Ctor = function()
	{
		
	}
	
	this.Ctor();
};

/*
	Function: doufu.Http.JSON.GetJSONObject
	
	Get javascript object from a json string
	
	Return:
		javascript object which build from json string
*/
doufu.Http.JSON.Parse = function(sJSONStr)
{
	eval("var tmpobj = " + sJSONStr);
	return tmpobj;
}

/*
	Class: doufu.Http.JSON.CallbackManager
	
	callback manage singleton
*/
doufu.Http.JSON.CallbackManager = new function()
{
	doufu.OOP.Class(this);
	
	this.Callbacks = {};

	this.Register = function(oJSONRequst)
	{
		if (!oJSONRequst.InstanceOf(doufu.Http.JSON))
		{
			throw doufu.System.Exception("doufu.Http.JSON.CallbackManager::Register() - The object specified was not a json request object.");
		}
		
		this.Callbacks[oJSONRequst.Handle.ID] = function(oJData)
		{
			oJSONRequst.OnSuccess.Invoke({
				"ResponseJSON": oJData,
				"ResponseText": oJSONRequst.ResponseText()
			});
			oJSONRequst.ResponseJSON(oJData); 
		}
		
		return "doufu.Http.JSON.CallbackManager.Callbacks[" + oJSONRequst.Handle.ID + "]";
	}
	
	this.Unregister = function(oJSONRequst)
	{
		if (!oJSONRequst.InstanceOf(doufu.Http.JSON))
		{
			throw doufu.System.Exception("doufu.Http.JSON.CallbackManager::Register() - The object specified was not a json request object.");
		}
		
		this.Callbacks[oJSONRequst.Handle.ID] = null;
	}
}