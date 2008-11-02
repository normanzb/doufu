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
		
		Parameters:
			sUrl - The url the get json data
			sCallbackParameterName - Specified callback function parameter.
				Common json server require client provide its name of callback function into the API,
				So that server can append the function name at the beginning of json string as below
				format:
					functionName({jsonString})
				This make life easier to pass json to client code.
	*/
	this.Open = function(sUrl, sCallbackParameterName)
	{
		_url = sUrl;
		_callbackParameterName = sCallbackParameterName;
		
		// register this instance to callback manager.
		sGCallbackFunc = doufu.Http.JSON.CallbackManager.Register(this);
		
		this.ReadyState = 1;
	}
	
	/*
		Function: Send
		
		Send data to remote json server, and get respond json object.
		
		Parameters:
			data - Must be a standard url key value pair formatted string.
				(e.g. "name=value&name2=value2")
	*/
	this.Send = function(data)
	{
		if (this.ReadyState != 1)
		{
			throw doufu.System.Exception('doufu.Http.JSON::Send() - Conneciton was not opened.');
		}
		
		if (_callbackParameterName != null)
		{
			// Add a script tag to fetch json data
			
			var container = document.getElementById(CONTAINER_ID)
			// Check if json script tag container( a div element is existed),
			// if not create it.
			if (!container)
			{
				container = document.createElement('div');
				container.setAttribute('id',CONTAINER_ID);
				document.body.appendChild(container);
			}
			
			script = document.createElement('script');
			script.type = "text/javascript";
			var tmpUrl = doufu.Http.AddStampToUrl(doufu.Http.AddParameterToUrl(this.Url(), _callbackParameterName, sGCallbackFunc));
			
			if (data != null)
			{
				// TODO: check data format
				tmpUrl = tmpUrl + "&" + encodeURI(data);
			}
			
			script.src = tmpUrl;
			
			container.appendChild(script);
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
	
	/*
		Function: Dispose
		
		Garbage collect, dispose object no longer needed.
	*/
	this.Dispose = function()
	{
		var container = document.getElementById(CONTAINER_ID);
		
		if (container != null && _callbackParameterName != null)
		{
			container.removeChild(script);
		}
	}
	
	this.Close = function()
	{
		if (_callbackParameterName != null)
		{
			doufu.Http.JSON.CallbackManager.Unregister(this);
		}
		
		this.Dispose();
	}
	
	this.Ctor = function()
	{
		// attach a garbage collection callback
		this.OnSuccess.Attach(new doufu.Event.CallBack(function()
		{
			this.Dispose();
		},this));
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