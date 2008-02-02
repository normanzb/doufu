var nsc = new Object();

nsc.PseudoCompiler = function(){
	
}

nsc.PseudoCompiler.BaseHeader = function(){
	
}

//an alias for BaseHeader
nsc.h = nsc.PseudoCompiler.BaseHeader;

///##########################
/// Javascript Namespace
/// Name: OOP
/// Description: Object-orented implementation.
///##########################

nsc.OOP = new Object();

///##########################
/// Javascript Method
/// Name: _callBacker
/// Description: .
///##########################

nsc.OOP._callBacker=function(_m,_c){
	var method = _m;
	var context = _c;
	return function(_args){
		return method.call(context,_args);
	}
}

nsc.OOP._baseClassFunctions = function(__nsc_OOP_baseClassFunc_oContext)
{
	this.NewProperty = function(sPropertyName)
	{
		return nsc.OOP.Property(sPropertyName, __nsc_OOP_baseClassFunc_oContext);
	}
	
	this.Inherit = function(baseClass)
	{
		return nsc.OOP.Inherit(__nsc_OOP_baseClassFunc_oContext,baseClass);
	}
	
	this.InstanceOf = function(type)
	{
		return nsc.OOP.InstanceOf(__nsc_OOP_baseClassFunc_oContext, type);
	}
	
	this.OverloadMethod = function(sMethodName, pFunc)
	{
		return nsc.OOP.OverloadMethod(__nsc_OOP_baseClassFunc_oContext, sMethodName, pFunc)
	}
}

nsc.OOP.Class = function(oContext)
{
	nsc.OOP.Inherit(oContext, nsc.OOP._baseClassFunctions, oContext);
}
nsc.c = nsc.OOP.Class;

// this class will be used as a member of the inheritance stack.
nsc.OOP._inheritance = function()
{
	this.Ref = null;
	this.__nsc_OOP_Inherit_Stack = null;
}

nsc.OOP.Inherit = function(obj,baseClass,args)
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
		this["_base_" + methodName] = this[methodName];
		this[methodName]=fn;
	}

	// TO DO: this line might be removed.
	// v-hoxu - 1/31/2008 Removed
	//var temp = obj.constructor;
	//obj.constructor.prototype = new baseClass();
	//obj.constructor = temp;
	//delete temp;
	
	// Create __nsc_OOP_Inherit_Parent stack for inheritance tracing.
	var oTemp = new nsc.OOP._inheritance();

	if (obj.__nsc_OOP_Inherit_Stack != null)
	{
		oTemp.__nsc_OOP_Inherit_Stack = obj.__nsc_OOP_Inherit_Stack;
	}
	
	obj.__nsc_OOP_Inherit_Stack = oTemp;
	obj.__nsc_OOP_Inherit_Stack.Ref = baseClass;


	if (args != null)
		baseClass.call(obj,args);
	else
		baseClass.apply(obj);
	
}

nsc.i = nsc.OOP.Inherit;

///##########################
/// Javascript Static Method
/// Name: nsc.OOP.OverloadMethod
/// Description: 
/// An overload implementation.
/// By John Resig (MIT Licensed)
/// Sample:
///	  function Users(){
///	  addMethod(this, "find", function(){
///	    // Find all users...
///	  });
///	  addMethod(this, "find", function(name){
///	    // Find a user by name
///	  });
///	  addMethod(this, "find", function(first, last){
///	    // Find a user by first and last name
///	  });
///	}
///##########################
nsc.OOP.OverloadMethod = function(object, name, fn){
    var old = object[ name ];
    object[ name ] = function(){
    if ( fn.length == arguments.length )
       return fn.apply( this, arguments );
    else if ( typeof old == 'function' )
       return old.apply( this, arguments );
   };
}


//Property toString redirector
nsc.OOP._propertyRedirector=function(){
	return function(){
		return this.call();
	}
}

//Property Builder
nsc.OOP.Property = function(sPropertyName, oContext){
	
	// If no context specified, make pFunc as property directly.
	if (oContext == null)
	{
		if (typeof sPropertyName == "function")
		{
			sPropertyName.toString = nsc.OOP._propertyRedirector();
			sPropertyName.valueOf = nsc.OOP._propertyRedirector();
		}
		else
		{
			throw nsc.System.Exception("if the oContext is not specified, the sPorpertyName must be a function pointer.");
		}
	}
	else
	{
		
		oContext[sPropertyName] = function(value)
		{
			if (
				value != null &&
				typeof value != "undefined"
				)
			{
				oContext[sPropertyName].Set.call(oContext, value);
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

		
		oContext[sPropertyName].toString = nsc.OOP._propertyRedirector();
		oContext[sPropertyName].valueOf = nsc.OOP._propertyRedirector();
	}
	
}

nsc.OOP.InstanceOf = function(rInstance, type)
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
