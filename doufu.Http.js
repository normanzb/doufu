/*
	Namespace: doufu.Http
	
	The root namespace of doufu http/ajax/comet relevant classes.
*/
doufu.Http = {}

/*
	Function: doufu.Http.CreateTimeStamp
	
	Create a time stamp
*/
doufu.Http.CreateTimeStamp = function()
{
	var tDate = new Date();
	return (new String(tDate.getSeconds()+tDate.getMinutes()*60 + tDate.getHours()*3600) + "-" + tDate.getDate().toString() + (tDate.getMonth() + 1).toString() + tDate.getYear().toString());
}

/*
	Function: doufu.Http.AddParameterToUrl
	
	Add a get method style parameter to the end of url.
	
	Parameters:
		sUrl - Specify the url.
		sParameterName - Specify the parameter name.
		sValue - Spcify the value of the parameter, must be a string.
*/
doufu.Http.AddParameterToUrl = function(sUrl, sParameterName, sValue)
{
	if (sUrl.lastIndexOf("?") + 1 == sUrl.length)
	{
    	sUrl = sUrl + sValue;
    }
    else if (sUrl.lastIndexOf("?") != -1)
    {
    	sUrl = sUrl + "&" + sParameterName + "=" + sValue;
    }
     else
    {
		sUrl = sUrl + "?" + sParameterName + "=" + sValue;
    }
   	return sUrl
}

/*
	Function: doufu.Http.AddStampToUrl
	
	Paste a time stamp at the end of url string.
*/
doufu.Http.AddStampToUrl = function(sUrl)
{
    return doufu.Http.AddParameterToUrl(sUrl, "DoufuUrlTimeStamp", doufu.Http.CreateTimeStamp());
}

