///##########################
/// Javascript Static Method
/// Name: nsc.Event.CallBack
/// Description: 
/// 	A object which contained a reference to a specified function and 
///		a reference to the context which executing the function.
/// Parameters:
/// 	pReference: reference to the specified function
/// 	pContext: reference to the context which the function need to be executed under,
///					if this parameter does not exist, the context will be the caller 
///					which created the instance of CallBack.
///##########################
nsc.Event.CallBack = function(pReference, pContext)
{
	nsc.OOP.Class(this);
	
	this.Reference = pReference;
	if (pContext == null)
	{
		this.Context = nsc.Event.CallBack.caller;
	}
	else
	{
		this.Context = pContext;
	}
	
}