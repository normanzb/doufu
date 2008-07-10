doufu.System.Convert = new Object();

doufu.System.Convert.ToString = function(obj)
{
	var sRet = new String("");
	if (obj.toString)
	{
		sRet = obj.toString();
	}
	else
	{
		sRet = obj + "";
	}
	
	return sRet;
}

doufu.System.Convert.ToInt = function(obj)
{
	var iRet = new String("");
	if (obj.valueOf)
	{
		iRet = obj.valueOf();
	}
	else
	{
		iRet = obj * 1
	}
	
	return iRet;
}