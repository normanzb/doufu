/*
	Class: doufu.Http.Ajax
	
	Cross browser ajax implementation
*/
doufu.Http.Request = function()
{
	doufu.OOP.Class(this);
	
	var nativeRequest;
	var _disableCache = true;
	var _timeout;
	
	/* 
		Event: OnSuccess
	*/
	this.OnSuccess = new doufu.Event.EventHandler(this);
	
	/*
		Event: OnFail
	*/
	this.OnFail = new doufu.Event.EventHandler(this);
	
	/*
		Event: OnOpened
	*/
	this.OnOpened = new doufu.Event.EventHandler(this);
	
	/*
		Event: OnSend
	*/
	this.OnSend = new doufu.Event.EventHandler(this);
	
	/*
		Property: NativeRequest
		
		<doufu.Property>
		Get the native xml http request object
	*/
	this.NewProperty("NativeRequest");
	this.NativeRequest.Get = function()
	{
		return nativeRequest;
	}
	
	/*
		Property: Timeout
		
		<doufu.Property>
		The timeout of connection.
	*/
	this.NewProperty("Timeout");
	this.Timeout.Get = function()
	{
		return _timeout;
	}
	this.Timeout.Set = function(value)
	{
		_timeout = value;
		
	}
	
	/*
		Property: DisableCache
		
		<doufu.Property>
		True to disable cache, will add a time stamp to the url when using get method.
	*/
	this.NewProperty("DisableCache");
	this.DisableCache.Get = function()
	{
		return _disableCache;
	}
	this.DisableCache.Set = function(value)
	{
		_disableCache = value;
	}
	
	/*
		Property: ResponseText
		
		<doufu.Property>
		Get the response Text
	*/
	this.NewProperty("ResponseText");
	this.ResponseText.Get = function()
	{
		return nativeRequest.responseText;
	}
	
	/*
		Property: ResponseXML
		
		<doufu.Property>
		Get the response XML
	*/
	this.NewProperty("ResponseXML");
	this.ResponseXML.Get = function()
	{
		return nativeRequest.responseXML;
	}
	
	var GetNativeRequestObj = function()
	{
		// IE7+, Mozilla, Safari,...
		if (window.XMLHttpRequest) 
		{ 
            nativeRequest = new XMLHttpRequest();
        }
        // IE6-
        else if (window.ActiveXObject) 
        { 
            try 
            {
                nativeRequest = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) 
            {
                try 
                {
                    nativeRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) 
                {
                }
            }
        }
		if (!nativeRequest) 
		{
            alert('native XmlhttpRequest object could not be created. This may caused by not using a modern browser.');
            return false;
        }
        
        return true;
	}
	
	/*
		Function: SetRequestHeader
		
		Set the request header
	*/
	this.SetRequestHeader = function(sName, sValue)
	{
		nativeRequest.setRequestHeader(sName, sValue);
	}
	
	/*
		Function: GetResponseHeader
		
		Get the response header
	*/
	this.GetResponseHeader = function(sName)
	{
		return nativeRequest.getResponseHeader(sName);
	}
	
	/*
		Function: GetAllResponseHeaders
		
		Get all response header list.
	*/
	this.GetAllResponseHeaders = function()
	{
		return nativeRequest.getAllResponseHeaders();
	}
	
	/*
		Function: Open
		
		Open a http request connection
		
		Parameters:
			sMethod - The method of http request, can be "POST" or "GET".
			sUrl - The request url.
			bSync - [Optional] True to use asynchronization request.
			sUser - [Optional] The user name to connect
			sPassword - [Optional] The password of the user.
	*/
	this.Open = function(sMethod, sUrl, bAsync, sUser, sPassword)
	{
		var sActualUrl = sUrl;
		
		if (this.DisableCache() && sMethod == "GET")
		{
			sActualUrl = doufu.Http.AddStampToUrl(sUrl);
		}
		
		nativeRequest.open(sMethod, sActualUrl, bAsync, sUser, sPassword);
		
		if (!(doufu.Browser.BrowserDetect.Browser == doufu.Browser.BrowserDetect.BrowserEnum.Explorer && 
			doufu.Browser.BrowserDetect.Version <= 6))
		{
			nativeRequest.timeout = _timeout;
		}
		
		this.OnOpened.Invoke();
	}
	
	/*
		Function: Abort
		
		Abort current connection
	*/
	this.Abort = function()
	{
		nativeRequest.abort();
	}
	
	/*
		Function: Close
		
		Close a http request connection, and dispose created xml http request object.
	*/
	this.Close = function()
	{
		this.Abort();
		delete nativeRequest;
	}
	
	/*
		Function: Send
		
		Start to send the request
		
		Parameters:
			sPostBody - The body message when using POST method, string or a object.
	*/
	this.Send = function(sPostBody)
	{
		var sActualBody = "";
		if ((typeof sPostBody).toLowerCase() == "string")
		{
			sActualBody = sPostBody;
		}
		else
		{
			var bFirstParam = true;
			for(var o in sPostBody)
			{
				if (!bFirstParam)
				{
					sActualBody += '&';
				}
				sActualBody += o;
				sActualBody += "=";
				sActualBody += sPostBody[o];
				bFirstParam = false;
			}
			
			this.SetRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		
		this.OnSend.Invoke();
		
		nativeRequest.send(sActualBody);
	}
	
	this.Ctor = function()
	{
		if (!GetNativeRequestObj())
		{
			throw doufu.System.Exception("doufu.Http.Request::Ctor() - Could not create native xmlhttprequest.");
		}
		
		this.Timeout(50000);
		// A timeout to abort the connection
		this.OnSend.Attach(new doufu.Event.CallBack(function(sender, args)
		{
			var self = this;
			setTimeout(function()
			{
				self.Abort();
			}, this.Timeout());
		},this));
		
		var self = this;
		nativeRequest.onreadystatechange=function()
		{
    		if (nativeRequest.readyState == 4)
    		{
    			// If success
    			if(nativeRequest.status == 200 || nativeRequest.status == 0)
    			{
    				self.OnSuccess.Invoke(
					{
						Native:nativeRequest,
						ResponseXML: nativeRequest.responseXML,
						ResponseText: nativeRequest.responseText
					});
    			}
    			else
    			{
    				self.OnFail.Invoke(
    				{
						Native:nativeRequest,
						ResponseXML: nativeRequest.responseXML,
						ResponseText: nativeRequest.responseText
					});
    			}
    		}
	    }
		
	}
	
	this.Ctor();
}