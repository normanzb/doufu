/*
NameSpace: mapo
    
the root namespace for all mapo controls.
*/
var mapo = {};
(function(_namespace, $) {

    /*
    Function: ctor
    
    Create a mapo class
    */

    _namespace.ctor = function(ctor, base) {
        var hasBase = base != null;
        var ret = function() {
            if (ret.prototype._core.ctor == null) {
                ret.prototype._core.ctor = ctor;
            }
            if (hasBase) {
                base.apply(this, arguments);
            }
            ctor.apply(this, arguments);

        }

        if (hasBase) {
            var temp = function() { };
            temp.prototype = base.prototype;
            ret.prototype = new temp();
            ret.prototype._core = {};
            if (base.prototype._core != null &&
                base.prototype._core.ctor != null) {
                ret.prototype._core.base = base.prototype._core.ctor;
            }
            else {
                ret.prototype._core.base = base;
            }
        }
        else {
            ret.prototype._core = {};
            ret.prototype._core.ctor = ctor;
            ret.prototype._core.base = null;
        }

        ret.prototype.prop = _namespace.prop;

        return ret;
    }

    /*
    Function: isTypeof
        
    Test if specified object is specified type.
        
    Sample:
    $isTypeOf(obj, "Array");
    */
    _namespace.isTypeOf = function(testObject, typeName) {
        return Object.prototype.toString.call(testObject).toLowerCase() === '[object ' + typeName.toLowerCase() + ']';
    }

    /*
    Function:me
    Create a function that will be executed in specified context
    */
    _namespace.me = function(context, func) {
        var ret = function() {
            if (func != null) {
                return func.apply(context, arguments);
            }
            else {
                return context.apply(this, arguments);
            }
        };
        return ret;
    };

    /*
    Function: event
    Create a event-like delegate object
	    
    Sample - Create a event:
    var onMouseDown = $event()
	    
    Sample - Hook a function to the event:
    Obj.onMouseDown.hook(function(){});
	    
    Sample - Remove a function reference from the event:
    Obj.onMouseDown.unhook(funcVariable);
    */
    _namespace.event = function() {
        // empty fn
        var headFn = function() {
        }

        // link ds
        var newBox = function() {
            return new function() {
                this.ref = null;
                this.next = null;
            };
        }
        var cur = newBox();
        var head = newBox();
        // init head node
        cur.ref = headFn;
        head = cur;

        var result = null;
        var ret = function() {
            var c = head;
            var p = null;
            while (c.next != null) {
                p = c;
                c = c.next;
                if (c.ref != null) {

                    var tmp = null;
                    try {
                        tmp = c.ref.apply(this, arguments);
                    }
                    catch (ex) { }
                    if (tmp != null) {
                        result = tmp;
                    }
                }
            }

            return result;
        };
        // hook a func
        ret.hook = function(func) {
            cur.next = newBox();

            if (cur.next == null) {
                return false;
            }

            cur = cur.next;
            cur.ref = func;

            return true;
        }
        // unhook a func
        ret.unhook = function(func) {
            // traversing link ds
            var c = head;
            var p = null;
            while (c.next != null) {
                p = c;
                c = c.next;
                if (c.ref === func) {
                    p.next = c.next;
                    delete c;
                    return true;
                }
            }

            return false;
        }

        return ret;
    }

    _namespace.prop = function(defaultValue, setFunc, getFunc) {
        var value = defaultValue;
        return function(newValue) {


            if (typeof newValue == "undefined") {
                if (getFunc == null) {
                    return value;
                }

                return getFunc.call(this, value);
            } else {
                if (setFunc == null) {
                    value = newValue;
                    return;
                }
                value = setFunc.call(this, newValue);
                return;
            }
        }
    }


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

    _namespace.pattern = {};
    _namespace.pattern.attachable = (function() {
        var struct = function() {
        }
        struct.prototype = { value: null, next: null, prev: null };

        return function() {
            var root = new struct;
            // NaN !== NaN so this is prevent root to be deleted.
            root.value == NaN;
            var last = root;

            var removeNode = function(node) {
                if (node == root) {
                    throw "root node cannot be removed";
                }
                if (node.prev != null) {
                    node.prev.next = node.next;
                }
                if (node.next != null) {
                    node.next.prev = node.prev;
                }
                node.value = null;
                delete node;
            }

            this.onAttached = new _namespace.event();
            this.onDetached = new _namespace.event();
            this.attach = function(value) {
                var s = new struct();
                s.value = value;
                s.prev = root;
                last.next = s;
                last = s;
                this.onAttached(value);
                return true;
            }

            this.detach = function(value) {
                var cursor = root;
                while (cursor != null) {
                    if (cursor.value === value) {
                        cursor.prev.next = cursor.next;
                        if (cursor.next == null) {
                            last = cursor.prev;
                        }
                        else {
                            cursor.next.prev = cursor.prev;
                        }
                        cursor.prev = null;
                        cursor.next = null;
                        cursor.value = null;
                        delete cursor;
                        this.onDetached(value);
                        return true;
                    }
                    cursor = cursor.next;
                }
                return false;
            }

            this.detachAll = function() {
                while (root.next != null) {
                    var tmp = root.next;
                    var detachValue = tmp.value;
                    try {
                        removeNode(tmp);
                        this.onDetached(detachValue);
                    }
                    catch (ex) {
                    } finally {
                        delete detachValue;
                    }
                }
            }
        }
    })();

    /*
    Ctor: mapo.pattern.pool
    object pool, providing a machnism to create/buffer/reuse object.
    */
    (function(ns) {
        ns.pool = _namespace.ctor(function(produce, free, dispose) {
            this._buffer = [];
            this._inUse = [];
            this._freeFunc = free;
            this._disposeFunc = dispose;
            this.onFree = _namespace.event();
            this.onDispose = _namespace.event();
            this._dirty = false;
            this._working = false;

            if (produce != null) {
                this.produce = produce;
            }
            if (free != null) {
                this.onFree.hook(free);
            }
            if (dispose != null) {
                this.onDispose.hook(dispose);
            }
        });
        var proto = ns.pool.prototype;
        /*
        cleanup interval
        */
        proto._cleanupInterval = 1000 * 30;
        /*
        Method: _init
        initialization
        */
        proto._init = function() {

        }
        /*
        Property: count
        get the count of buffer
        */
        proto.count = function() {
            return this._buffer.length;
        }
        /*
        Property: inUse
        get the count of inUse item
        */
        proto.inUse = function() {
            return this._inUse.length;
        }
        /*
        Method: _worker
        private, the background worker which peridically 
        remove null item in this._inUse
        */
        proto._worker = function() {
            if (!this._dirty) {
                return;
            };
            if (this._working == true) {
                return;
            }
            this._working = true;
            setTimeout(_namespace.me(this, function() {
                if (!this._dirty) {
                    this._working = false;
                    return;
                };
                this._cleanup();
                this._working = false;
            }), this._cleanupInterval);
        };
        /*
        Method: _cleanup
        the method actually do the job of cleaning.
        */
        proto._cleanup = function() {
            var i = this._inUse.length;
            var emptyCount = 0;
            // move empty slot to the head of array
            while (i--) {
                if (this._inUse[i] == null) {
                    this._inUse[i] = this._inUse[emptyCount];
                    delete this._inUse[emptyCount];
                    emptyCount++;

                }
            }
            // shift the empty slot
            while (emptyCount--) {
                this._inUse.shift();
            }
            this._dirty = false;
        }
        /*
        Method: drop
        drop an object to the pool
        */
        proto.drop = function(obj) {
            // check if the item already in use
            var i = this._inUse.length;
            while (i--) {
                if (this._inUse[i] === obj) {
                    delete this._inUse[i];
                    this._dirty = true;
                    // start the worker
                    this._worker();
                    break;
                }
            }
            this._buffer.push(obj);
        };
        /*
        Method: pick
        pick an item from the pool, item picked will be deleted from buffer.
        and push into this._inUse 
        */
        proto.pick = function() {
            var ret = null;
            if (this._buffer.length <= 0) {
                ret = this.produce();
            }
            else {
                ret = this._buffer.shift();
            }

            this._inUse.push(ret);
            return ret;
        };
        /*
        Method: dump
        dump all buffer from the other pool to current pool
        */
        proto.dump = function(pool) {
            if (pool != null) {
                this._buffer = this._buffer.concat(pool._buffer);
                pool._buffer.length = 0;
            }
        };
        /*
        Callback: produce
        how new object was produce when there is no item in buffer.
        */
        proto.produce = function() {
            return null;
        };
        /*
        Method: free
        free all in used item, fire onFree event to set items to ready status,
        and push them back to buffer.
        */
        proto.free = function() {
            for (var index in this._inUse) {
                if (this._inUse.hasOwnProperty(index)) {
                    var tmp = this._inUse[index];
                    this.onFree(tmp);
                }
            }
            this._buffer = this._buffer.concat(this._inUse);
            this._inUse.length = 0;
        };
        /*
        Method: dispose
        */
        proto.dispose = function() {
            this.free();
            for (var index in this._buffer) {
                if (this._buffer.hasOwnProperty(index)) {
                    var tmp = this._buffer[index];
                    this.onDispose(tmp);
                }
            }
            this._freeFunc != null && this.onFree.unhook(this._freeFunc);
            this._disposeFunc != null && this.onDispose.unook(this._disposeFunc);
        }
    })(_namespace.pattern);

    // hacks
    (function() {
        String.empty || (String.empty = "");
        String.format || (String.format = function(text) {
            if (arguments.length <= 1)
            { return text; }
            var tokenCount = arguments.length - 2; for (var token = 0; token <= tokenCount; token++)
            { text = text.replace(new RegExp("\\{" + token + "\\}", "gi"), arguments[token + 1]); }
            return text;
        });
        String.prototype.trim || (String.prototype.trim = function() {
            return this.replace(/(^\s*)|(\s*$)/g, "");
        });
        String.isNoE || (String.isNoE = function(str) {
            if (str == null || str.trim() == String.empty) {
                return true;
            }
            return false;
        });
        Date.prototype.toUTCStandString || (Date.prototype.toUTCStandString = function() {
            var ret = [];
            function getWidthFixString(number, length) {
                var ret = number + "";
                if (ret.length < length) {
                    var i = length - ret.length;
                    while (i--) {
                        ret = "0" + ret;
                    }
                }
                return ret;

            }
            ret.push(getWidthFixString(this.getUTCFullYear(), 4));
            ret.push("-");
            ret.push(getWidthFixString(this.getUTCMonth() + 1, 2));
            ret.push("-");
            ret.push(getWidthFixString(this.getUTCDate(), 2));
            ret.push("T");
            ret.push(getWidthFixString(this.getUTCHours(), 2));
            ret.push(":");
            ret.push(getWidthFixString(this.getUTCMinutes(), 2));
            ret.push(":");
            ret.push(getWidthFixString(this.getUTCSeconds(), 2));
            ret.push("Z");
            return ret.join("");
        });
        Date.prototype.addDate || (Date.prototype.addDate = function(iNum) {
            var ret = new Date(this.toUTCStandString());
            ret.setTime(this.getTime() + 1000 * 60 * 60 * 24 * iNum);
            return ret;
        });
        Date.prototype.dateEqual || (Date.prototype.dateEqual = function(date) {
            return date.getDate() == this.getDate() &&
            date.getMonth() == this.getMonth() &&
            date.getFullYear() == this.getFullYear();
        });
    })();

})(mapo, jQuery);
