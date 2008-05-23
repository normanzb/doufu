nsc.System.APIs = new Object();

///##########################
/// Javascript Static Method
/// Name: nsc.System.APIs.FunctionHooker
/// Description: 
/// 	Hook a function, make every call to the original function pass its parameters to specified function first.
///		This hook is un-cancelale.
///
/// Parameters:
/// 	sFuncName: string, the orignal function name which need to be hooked.
/// 	fnCap: function, a specified cap function which will be call first.
///		objFuncOwner: specified who own the function.
///
///##########################
nsc.System.APIs.FunctionHooker = function(sFuncName, fnCap, objFuncOwner)
{
	if (objFuncOwner == null)
	{
		objFuncOwner = window;
	}
	
	if (objFuncOwner.__nsc_FunctionHooker_Stack == null)
	{
		objFuncOwner.__nsc_FunctionHooker_Stack = new nsc.CustomTypes.Stack();
		
		// Add orignal function to stack
		objFuncOwner.__nsc_FunctionHooker_Stack.Push(objFuncOwner[sFuncName]);
		
		// Add initializer 
		objFuncOwner[sFuncName] = function()
		{
			return objFuncOwner.__nsc_FunctionHooker_Stack.Top().RefObject(objFuncOwner, arguments, 1);
			
		}
	}
	
	// Add fnCap to stack to be invoked.
	objFuncOwner.__nsc_FunctionHooker_Stack.Push(function(objFuncOwner, newArguments, i)
		{
			fnCap.apply(objFuncOwner, newArguments);
			// Invoke next func in stack
			if (i < (objFuncOwner.__nsc_FunctionHooker_Stack.Length() - 1) && 
				this.LinkedStackElement.LinkedStackElement != null)
			{
				return this.LinkedStackElement.RefObject(objFuncOwner, newArguments , i+1);
			}
			else
			{
				if (this.LinkedStackElement.RefObject.apply)
				{
					return this.LinkedStackElement.RefObject.apply(objFuncOwner, newArguments);
				}
				// Handle if it is a native function and don't have apply method.
				else
				{
					var sParameters = "";
					for(var i = 0; i < newArguments.length; i++)
					{
						sParameters = sParameters + "newArguments[" + i.toString() + "]";
						if ( (i + 1) < newArguments.length)
						{
							sParameters = sParameters + ", ";
						}
					}
					
					return eval("this.LinkedStackElement.RefObject(" + sParameters + ")");
				}
			}
			
		}
	);
	
}

///##########################
/// Javascript Static Method
/// Name: nsc.System.APIs.GetIsNullMacro
/// Description: 
/// 	Return a string which can be executed by eval() and return if the specified variable is null
///
/// Parameters:
/// 	sObjName: variable name.
///
///##########################
nsc.System.APIs.GetIsNullMacro = function(sObjName)
{
	return "(function(){if (typeof " + sObjName + " == nsc.System.Constants.TYPE_UNDEFINED || " + sObjName + " == null){return true;}})();";
}