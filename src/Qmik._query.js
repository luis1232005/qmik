/**
 * @author:leo
 * @email:cwq0312@163.com
 * @version:1.00.100
 */
(function(Q) {
	var win = Q.global, doc = win.document, _in = Q._in;
	var SE = _in.isSE, isNull = Q.isNull, isDom = Q.isDom, each = Q.each, likeArray = Q.likeArray, isArray = Q.isArray, //
	isString = Q.isString, isFun = Q.isFun, isPlainObject = Q.isPlainObject, trim = Q.trim, //
	toLower = Q.toLower, toUpper = Q.toUpper, replace = function(value, str1, str2) {
		return value.replace(str1, str2)
	};
	var rNode = /^\s*(<.+>.*<\/.+>)+|(<.+\/\s*>)+\s*$/, match = {
		ID : /^#[\w-_\u00c0-\uFFFF]+/,
		ATTR : /^([\w-_]+)\[\s*[\w-_]+\s*!?=\s*('|")?(.*)('|")?\s*\]/,
		CT : /^([\w-_]+)?\.[\w-_]+/,
		TAG : /^[\w-_]+/
	}, addUints = "height width top right bottom left".split(" ");
	function Query(selector, context) {
		var me = this, r;
		me.context = context = context || doc;
		me.selector = selector;
		me.length = 0;
		if (isString(selector)) {
			if (rNode.test(selector)) {
				var t = doc.createElement('div');
				t.innerHTML = selector;
				r = t.childNodes
			} else {
				each(selector.split(","), function(i, val) {
					each(find(val, context), function(j, dom) {
						dom && me.push(dom)
					})
				});
				return me
			}
		} else {
			r = likeArray(selector) ? selector : [
				selector
			];
			r = (r + "" == "[object Text]") ? [] : r
		}
		each(r || [], function(i, dom) {
			dom && me.push(dom)
		});
		return me
	}
	Q.extend(Query.prototype, {
		push : function(v) {
			this[this.length++] = v
		}
	});
	// Q.inherit(Query, Array);
	function init(selector, context) {
		context = context || doc;
		if (isFun(selector)) { return Q(doc).ready(selector) }
		return isQmik(selector) ? selector : new Query(selector, context)
	}
	function isQmik(v) {
		return v instanceof Query
	}
	//查找元素节点
	function find(selector, context, childs) {
		try {
			return context.querySelectorAll(selector)
		} catch (e) {
			var nselector = trim(selector), r = [], length;
			if (isQmik(context)) {
				each(context, function(i, v) {
					isDom(v) && (r = r.concat(muchToArray(find(selector, v))))
				});
			} else {
				childs = childs || compile(nselector);// 编译查询条件，返回[{type,query,isChild}...]
				length = childs.length;
				if (length >= 1) {
					r = findHandle(context, childs[0]);
					if (isNull(r) || length < 2) return r;
					nselector = childs[1].query;
					if (nselector != '') {
						var rs = [];
						childs.shift();
						each(r, function(k, x) {
							each(find(nselector, x, childs), function(o, p) {
								Q.inArray(p, rs) < 0 && rs.push(p)
							})
						});
						r = rs
					}
				}
			}
			return r
		}
	}
	function execObject(v, target) {
		return isFun(v) ? v() : v
	}
	// As much as possible to Array
	function muchToArray(a) {
		//return isArray(a) ? a : Array.prototype.slice.call(a, 0)
		return isArray(a) ? a : (function() {
			var r = [], i = 0;
			try {
				r = [].slice.call(a, 0)
			} catch (e) {
				while (i < a.length)
					r.push(a[i++])
			}
			return r
		})()
	}
	// 具体的实现查找
	function findHandle(context, qa) {
		var q = qa.query, r = [];
		if (qa.isChild) {
			var cs = muchToArray(context.childNodes);
			each(cs, function(i, dom) {
				if (isDom(dom)) {
					switch (qa.type) {
					case 'ID':
						at(dom, "id") == q && r.push(dom);
						break;
					case 'ATTR':
						var ds = getTagAttr(q), k = ds[1], v = ds[2], bi;
						if (ds[3] == 1) bi = at(dom, k) == v;
						else bi = at(dom, k) != v;
						dom.tagName == toUpper(ds[0]) && bi && r.push(dom);
						break;
					case 'CT':
						var ds = getTagClass(q), tn = ds[0], cn = ds[1];
						tn ? dom.tagName == toUpper(tn) && hasClass(dom, cn) && r.push(dom) : hasClass(dom, cn) && r.push(dom)
						break;
					case 'TAG':
						dom.tagName == toUpper(q) && r.push(dom);
						break;
					}
				}
			})
		} else {
			switch (qa.type) {
			case 'ID':
				r = byId(context, q);
				break
			case 'ATTR':
				r = byAttr(context, q);
				break
			case 'CT':
				var sq = getTagClass(q), tag = sq[0] || "", className = sq[1];
				r = SE() ? function() {
					var a = muchToArray(context.getElementsByClassName(className) || []), g = toUpper(tag);
					tag != "" && each(a, function(i, dom) {
						if (dom.tagName != g) a.splice(i, 1)
					});
					return a
				}() : byAttr(context, tag + "[class=" + className + "]");
				break
			case 'TAG':
				r = muchToArray(context.getElementsByTagName(q));
				break
			}
		}
		return r
	}
	function at(target, name) {
		return !SE() ? target[name] : target.getAttribute(name) || target[name]
	}
	//找匹配的属性和对应值
	function findMath(array, name, value, isEqual) {
		var exist, attribute, ret = [], isClass = name == "class";
		each(array, function(i, dom) {
			if (isDom(dom)) {
				attribute = at(dom, name);
				attribute = isClass ? dom.className : attribute;
				exist = isClass ? new RegExp(replace(value, /[ ]/g, "|")).test(attribute) : attribute == value;
				isEqual ? exist && ret.push(dom) : !exist && ret.push(dom)
			}
		});
		return ret
	}
	function byId(dom, selector) {
		return [
			doc.getElementById(replace(selector, /^#/, ""))
		]
	}
	function byAttr(dom, selector) {
		var st = getTagAttr(selector);
		return findMath(muchToArray(dom.getElementsByTagName(st[0] || "*")), st[1], st[2], selector.indexOf('!=') == -1)
	}
	// /////////////////////////////////////////////////
	function hasClass(dom, className) {
		if (!isDom(dom)) return !1;
		var cs = dom.className.split(" "), i = 0;
		className = trim(className);
		for (; i < cs.length; i++)
			if (cs[i] == className) return !0;
		return !1
	}
	function formateClassName(v) {
		return replace(v, /[A-Z]/g, function(v) {
			return "-" + toLower(v)
		})
	}
	function formateClassNameValue(name, value) {
		var tmp = (value + "").toLower();
		for ( var i in addUints) {
			if (name.indexOf(addUints[i]) >= 0) {
				value = parseFloat(tmp || 0) + "px";
				break
			}
		}
		return value
	}
	function muchValue2Qmik(c) {
		c = execObject(c);
		return isString(c) && rNode.test(c) ? Q(c) : c
	}
	function append(o, child) {
		child = muchValue2Qmik(child);
		if (likeArray(o)) {
			each(o, function(k, v) {
				append(v, child)
			})
		} else if (isDom(o)) {
			likeArray(child) ? each(child, function(k, v) {
				append(o, v)
			}) : o.appendChild(isDom(child) ? child : doc.createTextNode(child))
		}
	}
	function before(o, child) {
		child = muchValue2Qmik(child);
		if (likeArray(o)) {
			each(o, function(k, v) {
				before(v, child)
			})
		} else if (isDom(o)) {
			likeArray(child) ? each(child, function(k, v) {
				before(o, v)
			}) : o.parentNode.insertBefore(isDom(child) ? child.cloneNode(!0) : doc.createTextNode(child), o)
		}
	}
	function after(o, child) {
		if (isDom(o)) {
			var n = GN(o);
			n ? before(n, child) : append(o.parentNode, child)
		} else if (likeArray(o)) {
			each(o, function(i, v) {
				after(v, child)
			})
		}
	}
	function setValue(obj, key, val) {
		obj[key] = val;
		return obj
	}
	function css(o, k, v) {
		//k = isString(k) && !isNull(v) ? Q.parseJSON('{"' + k + '":"' + execObject(v) + '"}') : k;
		k = isString(k) && !isNull(v) ? setValue({}, k, execObject(v)) : k;
		if (likeArray(o)) {
			if (isString(k)) return css(o[0], k);
			each(o, function(i, j) {
				css(j, k)
			})
		} else if (isDom(o)) {
			if (isString(k)) return o.style[formateClassName(k)];
			v = "";
			each(k, function(i, j) {
				v += formateClassName(i) + ':' + formateClassNameValue(i, j) + ';'
			});
			o.style.cssText += ';' + v
		}
	}
	function attr(target, name, val, isSetValue) {
		if (likeArray(target)) {
			if (isString(name) && isNull(val)) return attr(target[0], name, val, isSetValue);
			each(target, function(i, j) {
				attr(j, name, val, isSetValue)
			})
		} else if (!isNull(target)) {
			//if (isString(name) && isNull(val)) return target[name] ? target[name] : target.getAttribute(name);
			//if (isString(name) && isNull(val)) return (isSetValue || !SE()) ? target[name] : target.getAttribute(name) || target[name];
			if (isString(name) && isNull(val)) return at(target, name);
			if (isPlainObject(name)) {
				each(name, function(i, j) {
					attr(target, i, j, isSetValue)
				})
			} else {
				if (isDom(val)) {
					attr(target, name, "", isSetValue);
					Q(target).append(val)
				} else {
					var val = execObject(val);
					(isSetValue || !SE()) ? target[name] = val : target.setAttribute(name, val);
				}
			}
		}
	}
	function clone(o, isDeep) {
		if (isDom(o)) { return Q(o.cloneNode(isDeep == !0)) }
		var r = [];
		each(o, function(k, v) {
			isDom(v) && r.push(clone(v, isDeep))
		})
		return Q(r)
	}
	var dn = "$Qmikdata:";
	function data(o, k, v) {
		if (likeArray(o)) {
			if (isString(k) && isNull(v)) return data(o[0], k, v);
			each(o, function(i, j) {
				data(j, k, v)
			})
		} else if (!isNull(o)) {
			if (isNull(o[dn])) o[dn] = {};
			if (isNull(v) && isString(k)) return o[dn][k];
			isString(k) ? o[dn][k] = v : each(k, function(i, j) {
				o[dn][i] = j
			})
		}
	}
	var rK = /[\S-_]+=/, rC = /[.][\S-_]+/;
	function getTagAttr(select) { // div[name=aa] get div name aa
		var s = select, tags = match.TAG.exec(s), tag = "", k, v, type = 1;
		if (tags) tag = tags[0];
		s = replace(replace(replace(s, tag, ""), /^\s*\[/, ""), /\]\s*$/, "");
		k = trim(rK.exec(s)[0]);
		if (k.match(/!\s*=$/)) type = 2;
		k = replace(k, /!?=$/, "");
		v = replace(replace(trim(replace(s, rK, "")), /"$/, ""), /^"/, "");
		v = v || "true";
		return [
			tag, k, v, type
		]
	}
	function getTagClass(select) { // div.cc get div cc
		var s = select, tags = match.TAG.exec(s), tag = "", cn;
		if (tags) tag = tags[0];
		s = replace(s, tag, "");
		cn = rC.exec(s);
		cn = cn ? replace(trim(cn[0]), /^\s*[.]/, "") : "";
		return [
			tag, cn
		]
	}
	// selector 选择语句,parentList 父结果列表("div a.aa p" p的父结果列表就是 div a.aa)
	function compile(selector, parentList) { // 编译查询条件，返回[{type,query,isChild}...]
		var st, n, isChild = /^\s*>\s*/.test(selector);
		selector = replace(selector, /^\s*>?\s*/, "");
		parentList = parentList || [];
		for (st in match) {
			n = match[st].exec(selector);
			if (n) break
		}
		if (!n) return parentList;
		n = trim(n[0]);
		selector = replace(selector, n, "");
		parentList.push({
			type : st,
			query : n,
			isChild : isChild
		});
		return compile(selector, parentList)
	}
	// 找compile()解析出的对象,判断当前的查找条件是否满足其对应的父查询条件 isCycle:是否遍历父节点,默认true
	function adapRule(dom, parentQuery, isCycle, context) {
		if (!isDom(dom)) return !1;
		context = context || doc;
		// isCycle = isNull(isCycle) ? !0 : isCycle;
		isCycle = isCycle != !1;
		var query = parentQuery.query, isGP = !parentQuery.isChild && (isCycle != !1), p = dom.parentNode;
		if (!isDom(p)) return !1;
		if (!Q.contains(context, dom)) return !1;
		switch (parentQuery.type) {
		case 'ID':
			return (at(p, "id") == trim(replace(query, /^#/, ""))) ? !0 : isGP ? adapRule(p, parentQuery, isCycle, context) : !1;
		case 'ATTR':
			var ds = getTagAttr(query), tag = ds[0], k = ds[1], v = ds[2];
			return (toLower(p.tagName) == tag && at(p, k) == v) ? !0 : isGP ? adapRule(p, parentQuery, isCycle, context) : !1;
		case 'CT':
			var ds = getTagClass(query), tag = ds[0], className = ds[1];
			if (tag) {
				return (toLower(p.tagName) == tag && hasClass(p, className)) ? !0 : isGP ? adapRule(p, parentQuery, isCycle, context) : !1
			} else {
				return hasClass(p, className) ? !0 : isGP ? adapRule(p, parentQuery, isCycle, context) : !1
			}
		case 'TAG':
			return (toLower(p.tagName) == query) ? !0 : isGP ? adapRule(p, parentQuery, isCycle, context) : !1;
		}
		return !1
	}
	// function find(s, c) {
	// if (s == "") return [];
	// return muchToArray(c.querySelectorAll(s))
	// }
	function GN(dom, type) {
		if (dom) {
			dom = type == "prev" ? dom.previousSibling : dom.nextSibling;
			return isDom(dom) ? dom : GN(dom, type)
		}
	}
	function uponSelector(dom, selector, type, ret) {
		var list = Q(">" + selector, dom.parentNode), i, zdom;
		if (type == "prev") {
			for (i = list.length - 1; i >= 0; i--) {
				for (zdom = dom; (zdom = GN(zdom, type)) && zdom == list[i];) {
					ret.push(zdom);
					break
				}
			}
		} else {
			for (i = 0; i < list.length; i++) {
				for (zdom = dom; (zdom = GN(zdom, type)) && zdom == list[i];) {
					ret.push(zdom);
					break
				}
			}
		}
	}
	function upon(qmik, selector, type) {
		var ret = [];
		each(qmik, function(i, dom) {
			isNull(selector) ? ret.push(GN(dom, type)) : uponSelector(dom, selector, type, ret)
		});
		return new Query(ret, qmik)
	}
	/**
	 * selector:选择器 qmik:qmik查询对象 isAllP:是否包含所有父及祖父节点 默认true
	 * isOnlyParent:往上查找的层级是否只到直接父节点 默认false
	 */
	function parents(selector, qmik, isAllP, isOnlyParent) {
		var array = [], qa = isString(selector) ? compile(selector) : null;
		isAllP = isAllP != !1;
		isOnlyParent = isOnlyParent == !0;
		each(qmik, function(i, v) {
			while (v) {
				if (v.parentNode == doc.body) break;
				if (isNull(qa) || adapRule(v, qa[0], false)) {
					array.push(v.parentNode);
					if (!isAllP) break
				}
				if (isOnlyParent) break;
				v = v.parentNode;
			}
		});
		return Q(array)
	}
	Q.init = init;
	var fn = Q.fn = Query.prototype;
	fn.extend = function(o) {
		each(o, function(k, v) {
			Query.prototype[k] = v
		})
	}
	fn.extend({
		last : function() {
			return Q(this[this.length - 1])
		},
		eq : function(i) {
			return Q(this[i])
		},
		first : function() {
			return Q(this[0])
		},
		filter : function(f) {
			var r = new Query();
			each(this, function(i, v) {
				if (f(i, v)) r.push(v)
			});
			return r
		},
		even : function() {
			return this.filter(function(i, v) {
				return i % 2 == 0
			})
		},
		odd : function() {
			return this.filter(function(i, v) {
				return i % 2 != 0
			})
		},
		gt : function(i) {
			var r = new Query(), j = i;
			for (; j < this.length; j++) {
				r.push(this[j])
			}
			return r
		},
		lt : function(i) {
			var r = new Query(), j = 0;
			for (; j <= i && j < this.length; j++) {
				r.push(this[j])
			}
			return r
		},
		find : function(s) {
			return new Query(s, this)
		},
		each : function(f) {
			each(this, f);
			return this
		},
		append : function(c) {
			append(this, c);
			return this
		},
		remove : function() {
			each(this, function(i, v) {
				isDom(v.parentNode) && v.parentNode.removeChild(v)
			});
			return this
		},
		before : function(c) {
			before(this, c);
			return this
		},
		after : function(c) {
			after(this, c);
			return this
		},
		html : function(v) {
			var me = this;
			if (arguments.length < 1) return attr(me, "innerHTML")
			else {
				attr(me, "innerHTML", isQmik(v) ? v.html() : v, !0);
				Q("script", me).each(function(i, dom) {
					Q.likeNull(dom.text) || eval(dom.text)
				})
			}
			return this
		},
		empty : function() {
			this.html("");
			return this
		},
		text : function(v) {
			var r = attr(this, "innerText", isQmik(v) ? v.text() : v, !0);
			return isNull(v) ? r : this
		},
		addClass : function(n) {
			each(this, function(i, v) {
				if (isDom(v) && !hasClass(v, n)) v.className += ' ' + trim(execObject(n))
			});
			return this
		},
		rmClass : function(n) {
			var r = new RegExp(replace(execObject(n), /\s+/g, "|"), 'g');
			each(this, function(i, v) {
				v.className = replace(trim(replace(v.className, r, '')), /[\s]+/g, ' ')
			});
			return this
		},
		show : function() {
			css(this, 'display', 'block');
			return this
		},
		hide : function() {
			css(this, 'display', 'none');
			return this
		},
		toggle : function() {
			each(this, function(i, v) {
				css(v, 'display') == 'none' ? Q(v).show() : Q(v).hide()
			});
			return this
		},
		toggleClass : function(className) {
			this.each(function(i, dom) {
				hasClass(dom, className) ? Q(dom).rmClass(className) : Q(dom).addClass(className)
			})
		},
		map : function(callback) {
			return Q.map(this, callback)
		},
		css : function(k, v) {
			var r = css(this, k, v);
			return isPlainObject(k) || (isString(k) && !isNull(v)) ? this : r
		},
		attr : function(k, v) {
			var r = attr(this, k, v);
			return (arguments.length > 1 || isPlainObject(k)) ? this : r
		},
		rmAttr : function(k) {
			each(this, function(i, v) {
				isDom(v) && v.removeAttribute(k)
			})
		},
		data : function(k, v) {
			return data(this, k, v)
		},
		rmData : function(k) {
			each(this, function(i, v) {
				if (v.$Qmikdata) delete v.$Qmikdata[k]
			})
		},
		val : function(v) {
			if (isNull(v)) return this.attr("value") || "";
			each(this, function(i, u) {
				u.value = execObject(v)
			})
		},
		next : function(s) {
			return upon(this, s, "next")
		},
		prev : function(s) {
			return upon(this, s, "prev")
		},
		clone : function(t) {
			return clone(this, t)
		},
		hover : function(fin, fout) {
			this.bind("mouseover", fin).bind("mouseout", fout).bind("touchstart", function() {
				fin();
				Q.delay(fout, 500)
			})
		},
		hasClass : function(c) {
			return hasClass(this[0], c)
		},
		closest : function(selector) {// 查找最近的匹配的父(祖父)节点
			var me = this, q = new Query();
			me.each(function(i, dom) {
				Q(">" + selector, dom.parentNode).each(function(j, dom1) {
					dom === dom1 && q.push(dom)
				})
			});
			/**
			* selector:选择器 qmik:qmik查询对象 isAllP:是否包含所有父及祖父节点 默认true
			* isOnlyParent:往上查找的层级是否只到直接父节点 默认false
			*/
			return q.length > 0 ? q : parents(selector, me, !1)
		},
		parents : function(selector) {// 查找所有的匹配的父(祖父)节点
			return parents(selector, this, true)
		},
		parent : function(selector) {// 查找匹配的父节点
			return parents(selector, this, true, true)
		},
		children : function(selector) {//查找直接子节点
			var me = this;
			if (selector) return Q((/^\s*\>/.test(selector) ? selector : (">" + selector)), me);
			var r = new Query();
			me.each(function(i, dom) {
				each(dom.children, function(j, d1) {
					isDom(d1) && r.push(d1)
				})
			})
			return r
		}
	});
	fn.extend({
		removeClass : fn.rmClass,
		removeData : fn.rmData,
		removeAttr : fn.rmAttr
	});
	Q.isQmik = isQmik;
})(Qmik);
