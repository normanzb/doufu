(function(_m, $){
	var _namespace  = _m.helpers = {} ;
	/*
	    Namespace: QueryString
	*/
	_namespace.queryString = {};

	/*
	Function: build
	*/
	_namespace.queryString.build = function(obj, ignoredValues) {
	    var ignores = [];

	    for (var i = 1, argLength = arguments.length; i < argLength; i++) {
	        ignores.push(arguments[i]);
	    }

	    var checkIfContinue = function(value) {
	        var ret = false;
	        var i = ignores.length;
	        while (i--) {
	            if (value == ignores[i]) {
	                ret = true;
	                break;
	            }
	        }

	        return ret;
	    }

	    var ret = "";
	    if (_namespace.isTypeOf(obj, "String")) {
	        var expr = obj;
	        $(expr).serialize();

	        return ret;
	    }
	    else {
	        var strct = obj;
	        for (var name in strct) {
	            if (strct.hasOwnProperty(name) &&
	                strct[name] != null &&
	                strct[name] != '' &&
	                strct[name] != -1) {
	                if (_namespace.isTypeOf(strct[name], "Array")) {
	                    for (var i = 0, strctLength = strct[name].length; i < strctLength; i++) {
	                        if (checkIfContinue(strct[name][i])) {
	                            continue;
	                        }
	                        if (ret != '');
	                        ret += "&";
	                        ret += name + "=" + encodeURI(strct[name][i]);
	                    }
	                }
	                else {
	                    if (checkIfContinue(strct[name])) {
	                        continue;
	                    }
	                    if (ret != '');
	                    ret += "&";
	                    ret += name + "=" + encodeURI(strct[name]);
	                }
	            }

	        }
	    }
	    return ret;
	}
})(mapo, jQuery);