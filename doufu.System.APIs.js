doufu.System.APIs = new Object();

///##########################
/// Javascript Static Method
/// Name: doufu.System.APIs.FunctionHooker
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
doufu.System.APIs.FunctionHooker = function(sFuncName, fnCap, objFuncOwner)
{
	if (objFuncOwner == null)
	{
		objFuncOwner = window;
	}
	
	if (objFuncOwner.__nsc_FunctionHooker_Stack == null)
	{
		objFuncOwner.__nsc_FunctionHooker_Stack = new doufu.CustomTypes.Stack();
		
		// Add orignal function to stack
		objFuncOwner.__nsc_FunctionHooker_Stack.Push(objFuncOwner[sFuncName]);
		var temptest = objFuncOwner[sFuncName];
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
			// Invoke next none-original func in stack
			// this.LinkedStackElement.LinkedStackElement != null means it is the 2nd item backward in stack.
			// so next item must be a hooker
			if (i < (objFuncOwner.__nsc_FunctionHooker_Stack.Length() - 1) && 
				this.LinkedStackElement.LinkedStackElement != null)
			{
				return this.LinkedStackElement.RefObject(objFuncOwner, newArguments , i+1);
			}
			else
			{
				// Norman 8-28-2008: hanlde ie8 beta2 quirk, use appendChild.apply will cause code error. so check if it is unknown 
				// TODO: Remove this when ie8 release
				if (typeof(this.LinkedStackElement.RefObject.apply) != "unknown" && this.LinkedStackElement.RefObject.apply != null)
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
/// Name: doufu.System.APIs.GetIsNullMacro
/// Description: 
/// 	Return a string which can be executed by eval() and return if the specified variable is null
///
/// Parameters:
/// 	sObjName: variable name.
///
///##########################
doufu.System.APIs.GetIsNullMacro = function(sObjName)
{
	return "(function(){if (typeof " + sObjName + " == doufu.System.Constants.TYPE_UNDEFINED || " + sObjName + " == null){return true;}})();";
}

///##########################
/// Javascript Static Method
/// Name: doufu.System.APIs.Clone
/// Description: 
/// 	Helps to deeply copy object.
///		This function originally written by Jasno Claswson: http://www.jasonclawson.com/2008/07/01/javascript-operator-and-indexof-failure/
///
/// Parameters:
/// 	obj: the obj which needs to be cloned.
///
///##########################
doufu.System.APIs.Clone = function(obj, level){
	var seenObjects = [];
	var mappingArray = [];
	var	f = function(simpleObject, currentLevel) {
		if (simpleObject == null)
		{
			return null;
		}
		var indexOf = seenObjects.indexOf(simpleObject);
		if (indexOf == -1) {			
			switch ((typeof simpleObject).toLowerCase()) {
				case 'object':
					seenObjects.push(simpleObject);
					var newObject = {};
					mappingArray.push(newObject);
					for (var p in simpleObject) 
					{
						if (p != null)
						{
							if (currentLevel > 0)
							{
								newObject[p] = f(simpleObject[p], currentLevel - 1);
							}
							else
							{
								newObject[p] = simpleObject[p];
							}
						}
					}
					newObject.constructor = simpleObject.constructor;
					return newObject;
					
				case 'array':
					seenObjects.push(simpleObject);
					var newArray = [];
					mappingArray.push(newArray);
					for(var i=0,len=simpleObject.length; i<len; i++)
					newArray.push(f(simpleObject[i]));
				return newArray;
					
				default:	
				return simpleObject;
			}
		} else {
			return mappingArray[indexOf];
		}
	};
	return f(obj, level == null?0:level);		
}

/*
	Function: doufu.System.APIs.NumberOfType
*/
doufu.System.APIs.NumberOfType = function(type)
{
	var iRetCount = 0;
	for (var i = 1; i < arguments.length; i++)
	{
		if (arguments[i].InstanceOf(type))
		{
			iRetCount++;
		}
	}
		
	return iRetCount;
}