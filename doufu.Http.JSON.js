/*
	Class: doufu.Http.JSON
	
	JSON request implementation
	
	Sample:
		json = new doufu.Http.JSON();
		json.Open('http://jsondatatest.appjet.net/?keyword=mandelbrot_set','callback');
		json.OnSuccess.Attach(new doufu.Event.CallBack(function(s,o){alert(o.ResponseJSON.content)},this));
		json.Send();
		
	Note:
		The response context type of server should not be "application/x-javascript" otherwise user using IE will experience connection glitch.
		Especially on large network load.
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
	var timerCancel;
	
	// Unopen 0
	// Opened 1
	// Sending 2
	// Loading 3
	// Done 4
	// Closed 5
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
		Property: Timeout
		
		<doufu.Property>
		Get or set the timeout for the json request.
		If timeout was zero, than the request will never timed out.
		The default timeout is 1 minutes (60 * 1000);
	*/
	var timeout = 60 * 1000;
	this.NewProperty("Timeout");
	this.Timeout.Get = function()
	{
		return timeout;
	}
	this.Timeout.Set = function(value)
	{
		timeout = value;
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
		Event: OnCancel
	*/
	this.OnCancel = new doufu.Event.EventHandler(this);
	
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
		if (this.ReadyState == 0 || this.ReadyState == 5)
		{
			_url = sUrl;
			_callbackParameterName = sCallbackParameterName;
			
			// register this instance to callback manager.
			sGCallbackFunc = doufu.Http.JSON.CallbackManager.Register(this);
			
			this.ReadyState = 1;
		}
		else
		{
			throw doufu.System.Exception("Failed to open json request.");
		}
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
		
		this.ReadyState = 2;
		
		if (_callbackParameterName != null)
		{
			// Add a script tag to fetch json data
			
			var container = document.getElementById(CONTAINER_ID);
			// Check if json script tag container( a div element is existed),
			// if not create it.
			if (!container)
			{
				container = document.createElement('div');
				container.setAttribute('id',CONTAINER_ID);
				document.body.appendChild(container);
			}
			
			var tmpUrl = doufu.Http.AddStampToUrl(doufu.Http.AddParameterToUrl(this.Url(), _callbackParameterName, sGCallbackFunc));
			
			doufu.System.Logger.Verbose("doufu.Http.JSON::Send(): Actual url is " + tmpUrl);
			
			if (data != null)
			{
				// TODO: check data format
				tmpUrl = tmpUrl + "&" + encodeURI(data);
			}
			
			script = document.createElement('script');
			
			// for ie
			script.setAttribute("defer", "defer");
			
			script.setAttribute("id", CONTAINER_ID + "_script_" + this.Handle.ID)
			
			script.setAttribute("type", "text/javascript");
			
			// TODO: allow user to define charset
			script.setAttribute("charset", "utf-8");
			
			script.src = tmpUrl;
			
			container.appendChild(script);
			
		}
		else
		{
			// TODO: use xmlhttprequest to get json data
			var rq = new doufu.Http.Request();
			rq.OnSuccess.Attach(new doufu.Event.CallBack(function(sender, args)
			{
				this.OnSuccess.Invoke({
					"ResponseJSON": doufu.Http.JSON.Parse(args.ResponseText)
				});
			},this));
			rq.Open('GET', this.Url(), true);
			rq.Send();
			
		}
		
		// prevent the .js respond too fast.
		if (this.ReadyState < 4)
		{
			this.ReadyState = 3;
		}
		
		// Start timer, if timed out, close the request
		if (this.Timeout() > 0)
		{
			timerCancel = setTimeout(doufu.OOP._callBacker(function(){
				
				if (this.ReadyState == 3)
				{
					// Unregister this instance to callback manager.
					sGCallbackFunc = doufu.Http.JSON.CallbackManager.Unregister(this);
					this.ReadyState = 5;
					this.OnCancel.Invoke();
				}
				
			}, this), this.Timeout());
		}
	}
	
	/*
		Function: Dispose
		
		Garbage collect, dispose object no longer needed.
	*/
	this.Dispose = function()
	{
		
		this.Close();
		
		container = null;
		script = null
			
		delete container;
		delete script
	}
	
	this.Close = function()
	{
		if (_callbackParameterName != null)
		{
			doufu.Http.JSON.CallbackManager.Unregister(this);
		}
		
		// means .js is reponded too fast, we have to wait a sec
		// Updated 1/22/2009:
		// below line will never be executed as only one functon can be executed at a time in javascript
		// Let's set a alert in it see if it will be executed.
		if (this.ReadyState == 2)
		{
			var self = this;
			doufu.System.Logger.Error("doufu.Http.JSON::Close(): ReadyState = 2; Please report this error to homyu.shinn@gmail.com .");
			setTimeout(function()
			{
				this.Close.call(self);
			}, 500);
		}
		
		var container = document.getElementById(CONTAINER_ID);
		
		// Remove script node while the code in script node is executing will
		// cause IE 6, IE 7 crash, so the workaround is to delay the remove
		if (doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Explorer && 
			doufu.Browser.BrowserDetect.Version < 8)
		{
			var myScript = script;
			var paramName = _callbackParameterName;
			
			setTimeout(function()
			{
				if (container != null && paramName != null)
				{
					container.removeChild(myScript);
				}
			}, 5000);
		}
		else
		{
			if (container != null && _callbackParameterName != null)
			{
				container.removeChild(script);
			}
		}
		
		this.ReadyState = 5;
	}
	
	this.Ctor = function()
	{
		// set the ready state
		this.OnSuccess.Attach(new doufu.Event.CallBack(function()
		{
			// clear the timer.
			// if the cancel function still not stable, consider to add a request counter.
			try
			{
				clearTimeout(timerCancel);
			}
			catch(ex)
			{
				doufu.System.Logger.Error("doufu.Http.JSON::Ctor(): Clear timeout error: " + ex.toString() + ex.message);
			}
			
			if (this.ReadyState != 5)
			{
				this.ReadyState = 4;
			}
			
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
	var tmpobj = null;
	if (doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Explorer && 
			doufu.Browser.BrowserDetect.Version >= 8)
	{
		tmpobj = JSON.parse(sJSONStr);
	}
	else
	{
		eval("tmpobj = " + sJSONStr);
	}
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
			// if the json reqeust object is sending or loading
			if (oJSONRequst.ReadyState == 2 ||oJSONRequst.ReadyState == 3)
			{
				oJSONRequst.OnSuccess.Invoke({
					"ResponseJSON": oJData,
					"ResponseText": oJSONRequst.ResponseText()
				});
				oJSONRequst.ResponseJSON(oJData); 
			}
			else
			{
				doufu.System.Logger.Error(String.format("doufu.Http.JSON.CallbackManager:Register(): request handle id = {0}; ready state = {1}", oJSONRequst.Handle.ID, oJSONRequst.ReadyState));
			}
		}
		
		return "doufu.Http.JSON.CallbackManager.Callbacks[" + oJSONRequst.Handle.ID + "]";
	}
	
	this.Unregister = function(oJSONRequst)
	{
		if (!oJSONRequst.InstanceOf(doufu.Http.JSON))
		{
			throw doufu.System.Exception("doufu.Http.JSON.CallbackManager::Unregister() - The object specified was not a json request object.");
		}
		
		this.Callbacks[oJSONRequst.Handle.ID] = null;
	}
}