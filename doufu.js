/*
	namespace: doufu
	
	The root namespace of doufu game developing framework.
*/
var doufu = new Object();

/*
	namespace: doufu.OOP
	A object-orentied programming helper namespace.
*/
doufu.OOP = new Object();

/*
   Function: doufu.OOP._callBacker

   Create and return a callback function which run specified function under specified context.

   Parameters:

      _m - The function to be ran.
      _c - The context.

   Returns:

      A new function which will run specified function and pass all its arguments to the specified function.

*/
doufu.OOP._callBacker=function(_m,_c){
	var method = _m;
	var context = _c;
	return function(){
		return method.apply(context,arguments);
	}
}

/*
	Function: doufu.OOP.Class

	Making current javascript function as a doufu class.

	Parameters:

      oContext - The instance of current class.
      
	Sample:
	
		oopClass = function()
		{
			doufu.OOP.Class(this);
		}
		
		new oopClass();

*/
doufu.OOP.Class = function(oContext)
{
	if (typeof oContext.__nsc__OOP_IsClass == typeof undefined)
	{
		oContext.__nsc__OOP_IsClass = true;
		doufu.OOP.Inherit(oContext, doufu.OOP._baseClassFunctions,  [oContext]);
	}
}

/*
	Function: doufu.OOP.Inherit

	Inherit a doufu class from the other.
	
	Parameters:
		obj - Specify the derived class.
		baseClass - Specify the base class.
		args - A object array which containing the arguments which required by base class constructor.

*/
doufu.OOP.Inherit = function(obj,baseClass,args)
{
	
	// Check if the baseClass already in the inheritance stacks
	var oCurr = obj;
	while (oCurr.__nsc_OOP_Inherit_Stack != null)
	{
		// If already existed in stack, exit;
		if (oCurr.__nsc_OOP_Inherit_Stack.Ref == baseClass)
		{
			return;
		}
		oCurr = oCurr.__nsc_OOP_Inherit_Stack;
	}
	
	obj.OverrideMethod = function(methodName, fn){
		var retMethod = this[methodName];
		this[methodName]=fn;
		return doufu.OOP._callBacker(retMethod, this);
	}

	// TO DO: this line might be removed.
	// v-hoxu - 1/31/2008 Removed
	//var temp = obj.constructor;
	//obj.constructor.prototype = new baseClass();
	//obj.constructor = temp;
	//delete temp;
	
	// Create __nsc_OOP_Inherit_Parent stack for inheritance tracing.
	var oTemp = new doufu.OOP._inheritance();

	if (obj.__nsc_OOP_Inherit_Stack != null)
	{
		oTemp.__nsc_OOP_Inherit_Stack = obj.__nsc_OOP_Inherit_Stack;
	}
	
	obj.__nsc_OOP_Inherit_Stack = oTemp;
	obj.__nsc_OOP_Inherit_Stack.Ref = baseClass;


	if (args != null)
	{
		baseClass.apply(obj,args);
	}
	else
		baseClass.apply(obj);
	
}

/*
	Function: doufu.OOP.OverloadMethod

	An overload implementation.
	
	Parameters:
		object - Specify the context/owner.
		name - Specify the function name.
		fn - Specify a overload function.
		
	Sample:
		function Users(){
			doufu.OOP.OverloadMethod(this, "find", function(){
				// Find all users...
			});
			doufu.OOP.OverloadMethod(this, "find", function(name){
				// Find a user by name
			});
			doufu.OOP.OverloadMethod(this, "find", function(first, last){
				// Find a user by first and last name
			});
		}

*/
doufu.OOP.OverloadMethod = function(object, name, fn){
    var old = object[ name ];
    object[ name ] = function(){
    if ( fn.length == arguments.length )
       return fn.apply( this, arguments );
    else if ( typeof old == 'function' )
       return old.apply( this, arguments );
   };
}


//Property toString redirector
doufu.OOP._propertyRedirector=function(){
	return function(){
		return this.call();
	}
}

/*
   Function: doufu.OOP.Property

   Javascript property builder

   Parameters:

      sPropertyName - Specify the property name.
      oContext - The property owner.

*/
doufu.OOP.Property = function(sPropertyName, oContext){
	
	// If no context specified, make pFunc as property directly.
	if (oContext == null)
	{
		if (typeof sPropertyName == "function")
		{
			sPropertyName.toString = doufu.OOP._propertyRedirector();
			sPropertyName.valueOf = doufu.OOP._propertyRedirector();
		}
		else
		{
			throw doufu.System.Exception("if the oContext is not specified, the sPorpertyName must be a function pointer.");
		}
	}
	else
	{
		
		oContext[sPropertyName] = function(value)
		{
			if (
				value != null &&
				typeof value != undefined //don't use doufu.System.Constants.TYPE_UNDEFINED, so that doufu.js can be used indivdually
				)
			{
				// return directly, if user want to get the value, them can call it themself.
				return oContext[sPropertyName].Set.call(oContext, value);
			}
			
			return oContext[sPropertyName].Get.call(oContext);
		}
		
		oContext[sPropertyName].Get = function()
		{
			return value;
		};
		oContext[sPropertyName].Set = function(value)
		{
			
		};

		
		oContext[sPropertyName].toString = doufu.OOP._propertyRedirector();
		oContext[sPropertyName].valueOf = doufu.OOP._propertyRedirector();
	}
	
}

/*
   Function: doufu.OOP.InstanceOf

   Check whether specified object is a instance of specified class.

   Parameters:

      rInstance - The instance to check.
      type - The specified class.

*/
doufu.OOP.InstanceOf = function(rInstance, type)
{
	// Use native keyword to exam if it is a instance of specified type.
	if (rInstance instanceof type)
	{
		return true;
	}
	
	if (rInstance.constructor == type)
	{
		return true;
	}

	var currentInstance;

	currentInstance = rInstance;

	// Looping __nsc_OOP_Inherit_Parent stacks which constructed by nsc framework
	// to see if instance is a specified type
	while (currentInstance.__nsc_OOP_Inherit_Stack != null)
	{
		if (currentInstance.__nsc_OOP_Inherit_Stack.Ref == type)
		{
			return true;
		}
		currentInstance = currentInstance.__nsc_OOP_Inherit_Stack;
	}
	
	// If still not matched type found, looping the javascript native constructor.prototype stacks
	var bRet = false;
	
	var previousType ;
	var currentType;
	
	var StackUp = function(rInstance)
	{
		return rInstance.constructor.prototype;
	}
	
	currentInstance = rInstance;
	
	currentType = currentInstance.constructor;
	
	while(previousType != currentType)
	{
		previousType = currentType;
		currentInstance = StackUp(currentInstance);
		currentType = currentInstance.constructor;
		if (currentType == type)
		{
			bRet = true;
			break;
		}
	}
	
	return bRet;
}

/*
   Function: doufu.OOP.Implement

   Implement specified interface

   Parameters:

      oContext - Current context.
      oBaseInterface - Specify which inteface to be implemented.

*/
doufu.OOP.Implement = function(oContext, oBaseInterface)
{
	// Initialize all Declare array value.
	new oBaseInterface();
	
	if (typeof oBaseInterface.__nsc_OOP_DeclareArray == typeof undefined)
	{
		throw new Error("doufu.OOP.Implement: " + oBaseInterface + "is not a interface!");
	}
	
	for (var i = 0; i < oBaseInterface.__nsc_OOP_DeclareArray.length; i++)
	{
		// if the implementation was not found in direct constructor, dig into the inheritance stack.
		if (oContext.constructor.toString().indexOf(
			oBaseInterface.__nsc_OOP_DeclareArray[i]) == -1)
		{
			var currentInstance;
			var bFound = false;

			currentInstance = oContext;

			while (currentInstance.__nsc_OOP_Inherit_Stack != null)
			{
				if (currentInstance.__nsc_OOP_Inherit_Stack.Ref.toString().indexOf(
					oBaseInterface.__nsc_OOP_DeclareArray[i]) != -1)
				{
					bFound = true;
					break;
				}
				currentInstance = currentInstance.__nsc_OOP_Inherit_Stack;
			}
			
			if (!bFound)
			{
				throw new Error("doufu.OOP.Implement: Method " + oBaseInterface.__nsc_OOP_DeclareArray[i] + " must be implemented!");
			}
		}
	}
		
	if (typeof oContext.__nsc_OOP_BaseInterface == typeof undefined)
	{
		oContext.__nsc_OOP_BaseInterface = new Array();
	}
	oContext.__nsc_OOP_BaseInterface.push(oBaseInterface);

}

/*
	Function: doufu.OOP.IsImplemented

	Check to if specifed instance implemented the specifed interface

	Parameters:

      oContext - The instance of current class.
      oBaseInterface - Specify the interface which to be implemented.

*/
doufu.OOP.IsImplemented = function(oContext, oBaseInterface)
{
	// Check if the specified interface is existed in the internal interface array
	for (var i = 0; i < oContext.__nsc_OOP_BaseInterface.length; i++)
	{
		if (oContext.__nsc_OOP_BaseInterface[i] == oBaseInterface)
		{
			return true;
		}
	}
	
	return false;
}

/*
	Function: doufu.OOP.Declare

	Declare a function in specified interface.
	The function should be implemented by classes which implement specified interface.

	Parameters:

      sMethodName - The method name.
      oContext - Specify the interface which to be implemented.

*/
doufu.OOP.Declare = function(sMethodName, oContext)
{
	// add the method name to Declare array
	if (typeof oContext.constructor.__nsc_OOP_DeclareArray == typeof undefined)
	{
		oContext.constructor.__nsc_OOP_DeclareArray = new Array();
	}
	
	var bFound = false;
	// if the method was not added, then add it into array.
	for (var i = 0; i < oContext.constructor.__nsc_OOP_DeclareArray.length; i++)
	{
		if (oContext.constructor.__nsc_OOP_DeclareArray[i] == sMethodName)
		{
			bFound = true;
		}
	}
	if (!bFound)
	{
		oContext.constructor.__nsc_OOP_DeclareArray.push(sMethodName);
	}
}

/*
	Function: doufu.OOP.Interface

	Making javascript function as a doufu interface.

	Parameters:

      oContext - The instance of a function.
      
	Sample:
	
		oopInterface = function()
		{
			doufu.OOP.Interface(this);
		}

*/
doufu.OOP.Interface = function(oContext)
{
	doufu.OOP.Inherit(oContext, doufu.OOP._baseInterfaceFunctions,  [oContext]);
}

/*
   Class: doufu.OOP._baseClassFunctions

   All doufu class will automatically inherit from this class

   Constructor:

      __nsc_OOP_baseClassFunc_oContext - The instance of derived class.

*/
doufu.OOP._baseClassFunctions = function(__nsc_OOP_baseClassFunc_oContext)
{
	/*
	   Function: NewProperty

	   Create a new property for current class.

	   Parameters:

	      sPropertyName - Specify the property name.

	*/
	this.NewProperty = function(sPropertyName)
	{
		return doufu.OOP.Property(sPropertyName, __nsc_OOP_baseClassFunc_oContext);
	}
	
	/*
	   Function: Inherit

	   Inherit from a specified base class

	   Parameters:

	      baseClass - Specify the base class.
	      args - An object array which containing arguments to pass to base class constructor.

	*/
	this.Inherit = function(baseClass, args)
	{
		return doufu.OOP.Inherit(__nsc_OOP_baseClassFunc_oContext, baseClass, args);
	}
	
	/*
	   Function: InstanceOf

	   Check whether current instance is a instance of specified base class

	   Parameters:

	      type - Specify the base class.

	*/
	this.InstanceOf = function(type)
	{
		return doufu.OOP.InstanceOf(__nsc_OOP_baseClassFunc_oContext, type);
	}
	
	/*
		Function: OverloadMethod

		An overload implementation.
		
		Parameters:
			name - Specify the function name.
			fn - Specify a overload function.
			
		Sample:
			function Users(){
				
				$c(this);
				
				this.OverloadMethod("find", function(){
					// Find all users...
				});
				this.OverloadMethod("find", function(name){
					// Find a user by name
				});
				this.OverloadMethod("find", function(first, last){
					// Find a user by first and last name
				});
			}

	*/
	this.OverloadMethod = function(sMethodName, pFunc)
	{
		return doufu.OOP.OverloadMethod(__nsc_OOP_baseClassFunc_oContext, sMethodName, pFunc)
	}
	
	/*
	   Function: Implement

	   Implement specified interface

	   Parameters:

	      oBaseInterface - Specify which inteface to be implemented.

	*/
	this.Implement = function(baseInterface)
	{
		return doufu.OOP.Implement(__nsc_OOP_baseClassFunc_oContext, baseInterface)
	}
	
	/*
		Function: IsImplemented

		Check to if specifed instance implemented the specifed interface

		Parameters:

	      oBaseInterface - Specify the interface which to be implemented.

	*/
	this.IsImplemented = function(baseInterface)
	{
		return doufu.OOP.IsImplemented(__nsc_OOP_baseClassFunc_oContext, baseInterface);
	}
}

/*
   Class: doufu.OOP._baseInterfaceFunctions

   All doufu interface will automatically inherit from this class

   Constructor:

      __nsc_OOP_baseInterfaceFunc_oContext - The instance of context function.

*/
doufu.OOP._baseInterfaceFunctions = function(__nsc_OOP_baseInterfaceFunc_oContext)
{
	/*
		Function: Declare

		Declare a function in current interface.
		The function should be implemented by classes which implement current interface.

		Parameters:

	      sMethodName - The method name.

	*/
	this.Declare = function(sMethodName)
	{
		return doufu.OOP.Declare(sMethodName, __nsc_OOP_baseInterfaceFunc_oContext);
	}
}

/*
	Class: doufu.OOP._inheritance

	This class will be used as a member of the inheritance stack.

*/
doufu.OOP._inheritance = function()
{
	this.Ref = null;
	this.__nsc_OOP_Inherit_Stack = null;
}
 
/*
	Section: Aliases
	
	short cut to use oop functions.
	this pollute the global environment but we have to do this to reduce workload.
*/

/*
	Function: $c
	
	An alias of doufu.OOP.Class

	See Also:
	<doufu.OOP.Class>

*/
$c = doufu.OOP.Class;

/*
	Function: $i
	
	An alias of doufu.OOP.Interface

	See Also:
	<doufu.OOP.Interface>

*/
$i = doufu.OOP.Interface;