define(["jquery", "bootstrap"], function() {
	Date.prototype.Format = function(fmt) { //author: meizz
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};
	String.prototype.trim = function() {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	};
	String.prototype.ltrim = function() {
		return this.replace(/(^\s*)/g, "");
	};
	String.prototype.rtrim = function() {
		return this.replace(/(\s*$)/g, "");
	};
	(function(jQuery) {
		if(jQuery.browser) return;

		jQuery.browser = {};
		jQuery.browser.mozilla = false;
		jQuery.browser.webkit = false;
		jQuery.browser.opera = false;
		jQuery.browser.msie = false;

		var nAgt = navigator.userAgent;
		jQuery.browser.name = navigator.appName;
		jQuery.browser.fullVersion = '' + parseFloat(navigator.appVersion);
		jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
		var nameOffset, verOffset, ix;

		// In Opera, the true version is after "Opera" or after "Version"
		if((verOffset = nAgt.indexOf("Opera")) != -1) {
			jQuery.browser.opera = true;
			jQuery.browser.name = "Opera";
			jQuery.browser.fullVersion = nAgt.substring(verOffset + 6);
			if((verOffset = nAgt.indexOf("Version")) != -1)
				jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
		}
		// In MSIE, the true version is after "MSIE" in userAgent
		else if((verOffset = nAgt.indexOf("MSIE")) != -1) {
			jQuery.browser.msie = true;
			jQuery.browser.name = "Microsoft Internet Explorer";
			jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
		}
		// In Chrome, the true version is after "Chrome"
		else if((verOffset = nAgt.indexOf("Chrome")) != -1) {
			jQuery.browser.webkit = true;
			jQuery.browser.name = "Chrome";
			jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
		}
		// In Safari, the true version is after "Safari" or after "Version"
		else if((verOffset = nAgt.indexOf("Safari")) != -1) {
			jQuery.browser.webkit = true;
			jQuery.browser.name = "Safari";
			jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
			if((verOffset = nAgt.indexOf("Version")) != -1)
				jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
		}
		// In Firefox, the true version is after "Firefox"
		else if((verOffset = nAgt.indexOf("Firefox")) != -1) {
			jQuery.browser.mozilla = true;
			jQuery.browser.name = "Firefox";
			jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
		}
		// In most other browsers, "name/version" is at the end of userAgent
		else if((nameOffset = nAgt.lastIndexOf(' ') + 1) <
			(verOffset = nAgt.lastIndexOf('/'))) {
			jQuery.browser.name = nAgt.substring(nameOffset, verOffset);
			jQuery.browser.fullVersion = nAgt.substring(verOffset + 1);
			if(jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase()) {
				jQuery.browser.name = navigator.appName;
			}
		}
		// trim the fullVersion string at semicolon/space if present
		if((ix = jQuery.browser.fullVersion.indexOf(";")) != -1)
			jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix);
		if((ix = jQuery.browser.fullVersion.indexOf(" ")) != -1)
			jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix);

		jQuery.browser.majorVersion = parseInt('' + jQuery.browser.fullVersion, 10);
		if(isNaN(jQuery.browser.majorVersion)) {
			jQuery.browser.fullVersion = '' + parseFloat(navigator.appVersion);
			jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
		}
		jQuery.browser.version = jQuery.browser.majorVersion;
	})(jQuery);

	var base = {};
	base.$scope = {};
	/**是否是ie8**/
	base.IE8 = function() {
		if(!$.support.opacity) {
			return true;
		} else {
			return false;
		}
	};
	/**获取ie版本**/
	base.IE = function() {
		if(!$.support.opacity && !$.support.style && window.XMLHttpRequest == undefined) {
			return 6;
		} else {
			if(!$.support.opacity && !$.support.style && window.window.XMLHttpRequest != undefined) {
				return 7;
			} else {
				if(!$.support.opacity) {
					return 8;
				} else {
					return 9;
				}
			}
		}
	}();
	/**是否是ie**/
	base.isIE = function() {
		if(document.all) {
			return true;
		} else {
			return false;
		}
	}();
	/**设置对象基本属性，后续很多组件会调用**/
	base.setProperty = function(element, option) {
		if(option) {
			if(option.cls) {
				$(element).addClass(option.cls.replace(/,/g, " "));
			}
			if(option.style) {
				$(element).attr("style", option.style.replace(/,/g, ";"));
			}
			if(option.id) {
				$(element).attr("id", option.id);
			}
			if(option.name) {
				$(element).attr("name", option.name);
			}
			if(self.attr) {
				$(self.attr).each(function(i, o) {
					$(element).attr(o.name, o.value);
				});
			}
		}

	};
	/**随机整数**/
	base.getRandom = function(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	};

	/**随机字符串**/
	base.getRandomString = function(len){
		len = len?len:32;
		var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
		var maxPos = $chars.length;
		var s = "";
		for(i = 0; i < len; i++) {
			s += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return s;
	};
	/**封装ajax**/
	base.ajax = function(option, isConnect) {
		var self = {};
		isConnect = isConnect ? isConnect : true;

		if(option) {
			self.params = option.params ? option.params : {};
			self.url = option.url ? option.url : "";
			self.async = option.async == false ? false : true;
			self.type = option.type ? option.type : "post";
			self.dataType = option.dataType ? option.dataType : "json";
			self.success = option.success ? option.success : null;
			self.error = option.error ? option.error : null;
			self.beforeSend = option.beforeSend ? option.beforeSend : null;
			self.complete = option.complete ? option.complete : null;
			self.timeout = option.timeout ? option.timeout : -1;
			self.ajaxObj = null;
			self.isConnect = self.isConnect == false ? false : true;
			self.contentType = option.contentType ? option.contentType : "application/json; charset=utf-8";
			if(self.dataType == "text") {
				self.type = "get";
			}

			self.connect = function() {

				self.ajaxObj = $.ajax({
					type: self.type,
					async: self.async,
					url: self.url,

					contentType: self.contentType,
					data: function() {
						if(self.type.toLowerCase() == "post") {
							return JSON.stringify(self.params);
						} else {
							return self.params;
						}
					}(),
					dataType: self.dataType,
					timeout: self.timeout,
					success: function(data, textStatus, request) {

						if(self.success) {
							self.success(data, textStatus, request);
						}

					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						if(self.error) {
							self.error();
						}
					},
					beforeSend: function(XMLHttpRequest) {
						if(self.beforeSend) {
							self.beforeSend(XMLHttpRequest);
						}
					},
					xhrFields: {
						withCredentials: true
					},
					complete: function(XMLHttpRequest, textStatus) {
						if(self.complete) {
							self.complete();

						}
					}
				});
				return self;
			};
			self.stop = function() {
				self.ajaxObj.abort();
			};
			self.run = function() {
				self.connect();
			};

			if(isConnect) {
				if(self.url) {
					self.connect();
				}

			}

			return self;
		}
	};
	base.ajax.load = function(option) {
		var self = base.ajax(option, false);
		self.dataType = "text";
		self.type = "get";
		self.errorText = option.errorText ? option.errorText : "资源加载出错,请联系管理员!";
		self.container = option.container ? option.container : null;

		self.error = function() {
			if(self.container) {
				base.bulletin(self.container, self.errorText);
			}
		};
		self.beforeSend = function() {
			if(self.container) {
				base.loading($(self.container));
			}
		};

		if(!self.url) {
			base.bulletin(self.container, self.errorText);
		} else {
			self.connect();
		}

		return self;
	};
	/**提示组件**/
	base.bulletin = function(container, text) {
		$(container).html("<div style='display:table;width:100%;height:100%;text-align:center;'><div class='theme-bulletin'>" + text + "</div></div>");
	};
	/**loading(读取中)组件**/
	base.loading = function(container) {
		$(container).html("<div class='ui-loading' style='display:table;width:100%;height:100%;text-align:center;'>" +
			"<i class='fa fa-spinner fa-pulse fa-3x fa-fw' style='font-size:24px;text-align:center;display: table-cell;vertical-align: middle;width:24px;height:24px;color:#aaa'></i></div>");
	};

	/**基于handlebars模板组件**/
	base.template = function(option) {
		var self = {};
		self.data = option.data ? option.data : null;
		self.container = option.container ? option.container : null;
		self.templateId = option.templateId ? option.templateId : null;
		self.callback = option.callback ? option.callback : null;
		self.loading = option.loading ? option.loading : false;
		self.helper = option.helper ? option.helper : null;
		if(self.data && self.container && self.templateId) {
			if(self.loading) {
				base.loading(self.container);
			}
			require(["template"], function(template) {
				var myTemplate = template.compile($("#" + self.templateId).html());
				/**注册基本判断条件**/

				template.registerHelper("null", function(v1, options) {
					if(!v1 || v1 == "") {
						//满足添加继续执行
						return options.fn(this);
					} else {
						//不满足条件执行{{else}}部分
						return options.inverse(this);
					}
				});

				template.registerHelper("ne", function(v1, v2, options) {
					if(v1 != v2) {
						//满足添加继续执行
						return options.fn(this);
					} else {
						//不满足条件执行{{else}}部分
						return options.inverse(this);
					}
				});
				template.registerHelper("e", function(v1, v2, options) {
					if(v1 == v2) {
						//满足添加继续执行
						return options.fn(this);
					} else {
						//不满足条件执行{{else}}部分
						return options.inverse(this);
					}
				});
				template.registerHelper("g", function(v1, v2, options) {
					if(v1 > v2) {
						//满足添加继续执行
						return options.fn(this);
					} else {
						//不满足条件执行{{else}}部分
						return options.inverse(this);
					}
				});

				template.registerHelper("ge", function(v1, v2, options) {
					if(v1 >= v2) {
						//满足添加继续执行
						return options.fn(this);
					} else {
						//不满足条件执行{{else}}部分
						return options.inverse(this);
					}
				});
				template.registerHelper("le", function(v1, v2, options) {
					if(v1 <= v2) {
						//满足添加继续执行
						return options.fn(this);
					} else {
						//不满足条件执行{{else}}部分
						return options.inverse(this);
					}
				});
				template.registerHelper("l", function(v1, v2, options) {
					if(v1 < v2) {
						//满足添加继续执行
						return options.fn(this);
					} else {
						//不满足条件执行{{else}}部分
						return options.inverse(this);
					}
				});

				if(self.helper && self.helper.length > 0) {
					$(self.helper).each(function(i, o) {
						template.registerHelper(o.name, o.event);
					});
				}

				var html = myTemplate(self.data);
				$(self.container).html(html);
				if(self.callback) {
					self.callback(self);
				}
			});
		}
	};
	/**封装bootstrap3的模态窗组件**/
	base.modal = function(option) {
		if(!option) {
			option = {};
		}
		var self = {};
		self.container = option.container ? option.container : $("body");
		self.modalId = option.id ? option.id : "m" + base.getRandom(1000, 9999);
		self.label = option.label ? option.label : "新窗口";
		//self.labelColor = option.labelColor?option.labelColor:"#222";
		self.background = option.background ? option.background : "#fff";
		self.modalLabelId = option.id + "label";
		self.style = option.style ? option.style : "";
		self.width = option.width ? option.width : null;
		self.visible = option.visible ? option.visible : false;
		self.center = option.center ? option.center : true;
		self.drag = option.drag ? option.drag : false;
		self.url = option.url ? option.url : null;
		self.height = option.height ? option.height : null;
		self.radius = option.radius ? option.radius : 5;
		self.contentStyle = option.contentStyle ? option.contentStyle : "";
		self.labelStyle = option.labelStyle ? option.labelStyle : "";
		self.modalEntity = {};
		self.modal = null;
		self.modalBody = null;
		self.modalDialog = null;
		self.modalContent = null;
		self.modalHeader = null;
		self.modalFooter = null;
		self.modalOption = option.modalOption ? option.modalOption : {};
		self.callback = option.callback ? option.callback : null;
		self.customScroll = option.customScroll ? option.customScroll : true;
		self.context = option.context ? option.context : "";
		self.drag = option.drag ? option.drag : false;
		self.rebuilding = option.rebuilding ? option.rebuilding : false;

		self.create = function() {
			if($("#" + self.modalId).length > 0) {
				if(self.rebuilding) {
					$("#" + self.modalId).remove();
					self.createModal();
				} else {
					self.modal = $("#" + self.modalId);
					self.setModal();
					self.modalDialog = $("#" + self.modalId).find(".modal-dialog");
					self.setModalDialog();
					self.modalContent = $("#" + self.modalId).find(".modal-content");
					self.setModalContent();
					self.modalHeader = $("#" + self.modalId).find(".modal-header");
					self.setModalHeader();
					self.modalBody = $("#" + self.modalId).find(".modal-body");
					self.setModalBody();
					self.modalFooter = $("#" + self.modalId).find(".modal-footer");
					self.setModalFooter();

				}
			} else {
				self.createModal();

			}
			if(!self.visible) {
				self.show();
			}
		};

		self.createModal = function() {
			self.modal = document.createElement("div");
			$(self.container).append(self.modal);
			self.setModal();
			self.modalDialog = document.createElement("div");
			$(self.modal).append(self.modalDialog);
			self.setModalDialog();
			self.modalContent = document.createElement("div");
			$(self.modalDialog).append(self.modalContent);
			self.setModalContent();
			self.modalHeader = document.createElement("div");
			$(self.modalContent).append(self.modalHeader);
			self.setModalHeader();
			self.modalBody = document.createElement("div");
			$(self.modalContent).append(self.modalBody);
			self.setModalBody();
			self.modalFooter = document.createElement("div");
			$(self.modalContent).append(self.modalFooter);
			self.setModalFooter();
		};
		self.setModal = function() {
			$(self.modal).attr("id", self.modalId);
			$(self.modal).attr("class", "modal fade");

			$(self.modal).attr("role", "dialog");
			$(self.modal).attr("tabindex", "-1");
			$(self.modal).attr("aria-labelledby", self.modalId + "Label");
			if(self.visible) {
				$(self.modal).attr("aria-hidden", "true");
			} else {
				$(self.modal).attr("aria-hidden", "false");
			}
			if(self.cls) {
				$(self.modal).attr("class", option.cls.replace(/,/g, " "));
			}
			if(self.style) {
				$(self.modal).attr("style", option.style.replace(/,/g, ";"));
			}

		};
		self.setModalDialog = function() {
			$(self.modalDialog).attr("class", "modal-dialog");
			if(self.width) {
				$(self.modalDialog).css("width", self.width);
			}
			if(self.background) {
				$(self.modalDialog).css("background", self.background);
			}
			$(self.modalDialog).css("border-radius", self.radius);
		};
		self.setModalContent = function() {
			$(self.modalContent).attr("class", "modal-content");
			//$(self.modalContent).css("background-color","transparent");
			$(self.modalContent).css("border", "1px solid #ccc");
			$(self.modalContent).css("border-radius", self.radius);
		};
		self.setModalHeader = function() {
			$(self.modalHeader).attr("class", "modal-header");

			if(self.drag) {
				require(["jqueryUI"], function() {
					$(self.modalDialog).draggable({
						handle: ".modal-header",
						cursor: 'move',
						refreshPositions: false
					});
					$(self.modalHeader).css("cursor", "move");
				});

			}
			$(self.modalHeader).html("<button class='close' data-dismiss='modal' aria-hidden='true'><i class='fa fa-remove' style='font-weight:normal;font-size:16px;'></i></button><h4 class='modal-title'  id='" + self.modalId + "Label'>" + self.label + "</h4>");
			if(self.labelStyle) {
				$(self.modalHeader).find("h4").attr("style", self.labelStyle.replace(/,/g, ";"));
			}
		};
		self.setModalBody = function() {
			$(self.modalBody).attr("class", "modal-body");
			if(self.height && self.height > 0) {
				$(self.modalBody).css("height", self.height);
				$(self.modalBody).css("overflow", "auto");
			}
			if(self.contentStyle) {
				$(self.modalBody).attr("style", self.contentStyle.replace(/,/g, ";"));
			}

		};

		self.setModalFooter = function() {
			$(self.modalFooter).attr("class", "modal-footer");

			$(self.modalFooter).html("");
			if(option.buttons && option.buttons.length > 0) {
				$(option.buttons).each(function(i, o) {
					o.container = $(self.modalFooter);
					base.form.button(o);
				});
			}
			/*base.form.button({
				container: $(self.modalFooter),
				label: "关闭",
				cls:"btn btn-default",
				clickEvent: function() {
					self.hide();
				}
			});*/
		};

		self.show = function() {
			$(self.modal).on('show.bs.modal', function() {
				self.loadContext();
				if(self.showEvent) {
					self.showEvent();
				}
			});
			$(self.modal).on('shown.bs.modal', function() {

				if(self.shownEvent) {
					self.shownEvent();
				}
			});
			$(self.modal).on('hidden.bs.modal', function() {
				$(self.modal).remove();
			});
			self.modalOption.show = true;
			self.modalOption.center = self.center;
			$(self.modal).modal(self.modalOption);

		};
		self.hide = function() {
			$(self.modal).on('hide.bs.modal', function() {
				if(self.hideEvent) {
					self.hideEvent();
				}
			})

			$(self.modal).on('hidden.bs.modal', function() {
				if(self.hiddenEvent) {
					self.hiddenEvent();
				}
				$(self.modal).remove();
			});
			$(self.modal).modal("hide");
		};

		self.loadContext = function(opt) {
			if(!opt) {
				opt = option;
			}
			$(self.modalBody).html("");

			if(opt.context) {
				$(self.modalBody).html(opt.context);
				if(self.callback) {
					self.callback(self);
				}
			} else if(opt.url) {
				base.ajax({
					url: opt.url,
					dataType: "text",
					success: function(text) {
						$(self.modalBody).html(text);
						if(self.callback) {
							self.callback(self);
						}
						if(self.customScroll) {
							base.scroll({
								container: $(self.modalBody)
							});
						}

					},
					beforeSend: function() {
						base.loading(self.modalBody);
					}

				});
			}
		};
		self.create();
		return self;
	};
	/**模糊玻璃特效组件**/
	base.glass = function(option) {
		if(base.isIE) {
			if(base.IE <= 8) {
				return;
			}
		}

		var self = {};
		self.radius = option.radius ? option.radius : 15;
		self.element = option.element ? option.element : null;
		self.canvas = null;
		self.img = option.img ? option.img : null;
		var tmpImg = new Image();
		$(tmpImg).attr("src", $(self.img).attr("src"));
		self.fixHeight = option.fixHeight ? option.fixHeight : 0;
		self.width = tmpImg.width ? tmpImg.width : $(self.element).width();
		self.height = tmpImg.height ? tmpImg.height : $(self.element).height();
		self.top = option.top ? option.top : $(self.element).offset().top;
		self.left = option.left ? option.left : $(self.element).offset().left;
		self.x = option.x ? option.x : 0;
		self.y = option.y ? option.y : 0;
		self.cls = option.cls ? option.cls : null;
		self.Mu = [
			512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512,
			454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512,
			482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456,
			437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512,
			497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328,
			320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456,
			446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335,
			329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512,
			505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405,
			399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328,
			324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271,
			268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456,
			451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
			385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335,
			332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
			289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259
		];
		self.Sh = [
			9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
			17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
			19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
			20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
			21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
			21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
			22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
			22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
			23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
			23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
			23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
			23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
			24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
			24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
			24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
			24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24
		];
		self.BlurStack = function() {
			this.r = 0;
			this.g = 0;
			this.b = 0;
			this.a = 0;
			this.next = null;
		};
		self.draw = function() {
			var w = $(self.element).width();
			var h = $(self.element).height();
			$(self.canvas).css("width", w);
			$(self.canvas).css("height", h);
			$(self.canvas).css("left", self.left);
			$(self.canvas).css("top", self.top);
			$(self.canvas).attr("width", w);
			$(self.canvas).attr("height", h);
			$(self.canvas).css("position", "absolute");
			if(self.cls) {
				$(self.canvas).addClass(self.cls);
			}
			var zix = 0;
			if($(self.element).css('z-index')) {
				zix = Number($(self.element).css('z-index').split("px")[0]);
			}
			$(self.canvas).css("zIndex", zix + 1);
			var context = self.canvas.getContext("2d");
			context.clearRect(0, 0, w, h);
			var fixh = 0;
			if($(window).height() < document.documentElement.scrollHeight) {
				fixh = h + Math.floor(window.screen.availHeight / self.height * h) + 10;
			} else {
				fixh = h + Math.floor(window.screen.availHeight / self.height * h);
			}
			var fixw = self.width;
			context.drawImage($(self.img)[0], self.left, self.top, fixw, fixh, self.x, self.y, w, h);
			self.stackBlurCanvasRGBA(0, 0, w, h);
		};
		self.create = function() {
			self.canvas = document.createElement("canvas");
			$(self.element).parent().append(self.canvas);
			self.draw();
		};
		self.stackBlurCanvasRGBA = function(top_x, top_y, width, height) {
			var context = self.canvas.getContext("2d");
			var imageData;

			try {
				try {
					imageData = context.getImageData(top_x, top_y, width, height);
				} catch(e) {
					try {
						netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
						imageData = context.getImageData(top_x, top_y, width, height);
					} catch(e) {

						throw new Error("unable to access local image data: " + e);
						return;
					}
				}
			} catch(e) {

				throw new Error("unable to access image data: " + e);
			}

			var pixels = imageData.data;

			var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum,
				r_out_sum, g_out_sum, b_out_sum, a_out_sum,
				r_in_sum, g_in_sum, b_in_sum, a_in_sum,
				pr, pg, pb, pa, rbs;

			var div = self.radius + self.radius + 1;
			var w4 = width << 2;
			var widthMinus1 = width - 1;
			var heightMinus1 = height - 1;
			var radiusPlus1 = self.radius + 1;
			var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

			var stackStart = new BlurStack();
			var stack = stackStart;
			for(i = 1; i < div; i++) {
				stack = stack.next = new BlurStack();
				if(i == radiusPlus1) var stackEnd = stack;
			}
			stack.next = stackStart;
			var stackIn = null;
			var stackOut = null;

			yw = yi = 0;

			var mul_sum = mul_table[self.radius];
			var shg_sum = shg_table[self.radius];

			for(y = 0; y < height; y++) {
				r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

				r_out_sum = radiusPlus1 * (pr = pixels[yi]);
				g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
				b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
				a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

				r_sum += sumFactor * pr;
				g_sum += sumFactor * pg;
				b_sum += sumFactor * pb;
				a_sum += sumFactor * pa;

				stack = stackStart;

				for(i = 0; i < radiusPlus1; i++) {
					stack.r = pr;
					stack.g = pg;
					stack.b = pb;
					stack.a = pa;
					stack = stack.next;
				}

				for(i = 1; i < radiusPlus1; i++) {
					p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
					r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
					g_sum += (stack.g = (pg = pixels[p + 1])) * rbs;
					b_sum += (stack.b = (pb = pixels[p + 2])) * rbs;
					a_sum += (stack.a = (pa = pixels[p + 3])) * rbs;

					r_in_sum += pr;
					g_in_sum += pg;
					b_in_sum += pb;
					a_in_sum += pa;

					stack = stack.next;
				}

				stackIn = stackStart;
				stackOut = stackEnd;
				for(x = 0; x < width; x++) {
					pixels[yi + 3] = pa = (a_sum * mul_sum) >> shg_sum;
					if(pa != 0) {
						pa = 255 / pa;
						pixels[yi] = ((r_sum * mul_sum) >> shg_sum) * pa;
						pixels[yi + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
						pixels[yi + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
					} else {
						pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
					}

					r_sum -= r_out_sum;
					g_sum -= g_out_sum;
					b_sum -= b_out_sum;
					a_sum -= a_out_sum;

					r_out_sum -= stackIn.r;
					g_out_sum -= stackIn.g;
					b_out_sum -= stackIn.b;
					a_out_sum -= stackIn.a;

					p = (yw + ((p = x + self.radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

					r_in_sum += (stackIn.r = pixels[p]);
					g_in_sum += (stackIn.g = pixels[p + 1]);
					b_in_sum += (stackIn.b = pixels[p + 2]);
					a_in_sum += (stackIn.a = pixels[p + 3]);

					r_sum += r_in_sum;
					g_sum += g_in_sum;
					b_sum += b_in_sum;
					a_sum += a_in_sum;

					stackIn = stackIn.next;

					r_out_sum += (pr = stackOut.r);
					g_out_sum += (pg = stackOut.g);
					b_out_sum += (pb = stackOut.b);
					a_out_sum += (pa = stackOut.a);

					r_in_sum -= pr;
					g_in_sum -= pg;
					b_in_sum -= pb;
					a_in_sum -= pa;

					stackOut = stackOut.next;

					yi += 4;
				}
				yw += width;
			}

			for(x = 0; x < width; x++) {
				g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

				yi = x << 2;
				r_out_sum = radiusPlus1 * (pr = pixels[yi]);
				g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
				b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
				a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

				r_sum += sumFactor * pr;
				g_sum += sumFactor * pg;
				b_sum += sumFactor * pb;
				a_sum += sumFactor * pa;

				stack = stackStart;

				for(i = 0; i < radiusPlus1; i++) {
					stack.r = pr;
					stack.g = pg;
					stack.b = pb;
					stack.a = pa;
					stack = stack.next;
				}

				yp = width;

				for(i = 1; i <= self.radius; i++) {
					yi = (yp + x) << 2;

					r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
					g_sum += (stack.g = (pg = pixels[yi + 1])) * rbs;
					b_sum += (stack.b = (pb = pixels[yi + 2])) * rbs;
					a_sum += (stack.a = (pa = pixels[yi + 3])) * rbs;

					r_in_sum += pr;
					g_in_sum += pg;
					b_in_sum += pb;
					a_in_sum += pa;

					stack = stack.next;

					if(i < heightMinus1) {
						yp += width;
					}
				}

				yi = x;
				stackIn = stackStart;
				stackOut = stackEnd;
				for(y = 0; y < height; y++) {
					p = yi << 2;
					pixels[p + 3] = pa = (a_sum * mul_sum) >> shg_sum;
					if(pa > 0) {
						pa = 255 / pa;
						pixels[p] = ((r_sum * mul_sum) >> shg_sum) * pa;
						pixels[p + 1] = ((g_sum * mul_sum) >> shg_sum) * pa;
						pixels[p + 2] = ((b_sum * mul_sum) >> shg_sum) * pa;
					} else {
						pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
					}

					r_sum -= r_out_sum;
					g_sum -= g_out_sum;
					b_sum -= b_out_sum;
					a_sum -= a_out_sum;

					r_out_sum -= stackIn.r;
					g_out_sum -= stackIn.g;
					b_out_sum -= stackIn.b;
					a_out_sum -= stackIn.a;

					p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

					r_sum += (r_in_sum += (stackIn.r = pixels[p]));
					g_sum += (g_in_sum += (stackIn.g = pixels[p + 1]));
					b_sum += (b_in_sum += (stackIn.b = pixels[p + 2]));
					a_sum += (a_in_sum += (stackIn.a = pixels[p + 3]));

					stackIn = stackIn.next;

					r_out_sum += (pr = stackOut.r);
					g_out_sum += (pg = stackOut.g);
					b_out_sum += (pb = stackOut.b);
					a_out_sum += (pa = stackOut.a);

					r_in_sum -= pr;
					g_in_sum -= pg;
					b_in_sum -= pb;
					a_in_sum -= pa;

					stackOut = stackOut.next;

					yi += width;
				}
			}

			context.putImageData(imageData, top_x, top_y);
		}
		self.create();
		return self;
	};

	/**旋转的地图**/
	base.spreader = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.data = option.data ? option.data : null;
		self.step = option.step ? option.step : 0;
		self.mapOption = option.mapOption ? option.mapOption : null;
		self.radius = option.radius ? option.radius : 0.05;
		self.offset = option.offset ? option.offset : 10;
		self.origin = option.origin ? option.origin : [0, 0];
		self.mapData = {
			"type": "FeatureCollection",
			"features": [],
			"UTF8Encoding": true
		};
		self.markLineData = [];
		self.markPointData = [];
		self.geoCoord = {};
		self.originId = null;
		self.element = null;
		self.isMain = option.isMain ? option.isMain : true;
		self.create = function() {
			if(self.data && self.data.length > 0) {
				if(self.isMain) {
					self.element = self.container;
				} else {
					self.element = document.createElement("div");
					$(self.container).append(self.element);
				}
				self.setData(self.data);

				self.draw();
			}
			return self;
		};

		self.draw = function() {
			if(self.mapOption) {
				var echartEntity = base.echartsOld({
					container: self.element,

					type: "map",
					style: "width:100%;height:100%",
					option: self.mapOption,
					mapData: self.mapData,
					mapName: "service",
					clickEvent: option.clickEvent ? option.clickEvent : null,
					hoverEvent: option.hoverEvent ? option.hoverEvent : null

				});
			}

		};
		self.getPosition = function(x, y, angle, radius) {
			if(!x || !y || !angle) {
				return [];
			}
			var radius = radius ? radius : self.radius;
			var x1 = (Number(x) + Math.sin(2 * Math.PI / 360 * angle) * radius);
			var y1 = (Number(y) + Math.cos(2 * Math.PI / 360 * angle) * radius);
			var cp = [x1, y1];
			return cp;
		};
		self.setData = function(data, parentData) {
			$(data).each(function(i, o) {
				var id = o.id
				var cp = [];
				var angle = 0;
				var radius = 0;
				if(parentData) {

					if(parentData.cp[0] == self.origin[0] && parentData.cp[1] == self.origin[1]) {
						angle = self.step > 0 ? (360 / self.step) * (i + 1) : (360 / data.length) * (i + 1);
						radius = self.radius;
					} else {
						var fw = parentData.angle;
						angle = fw / 1.5 + (10) * (i + 1);
						radius = self.radius;
					}
					cp = self.getPosition(parentData.cp[0], parentData.cp[1], angle, radius);
				} else {
					cp = self.origin;
				}
				if(self.originId) {
					self.originId = id;
				}
				self.geoCoord[o.name] = cp;
				if(parentData) {
					self.markLineData.push([{
						"name": o.name
					}, {
						"name": parentData.data.name,
						"value": o.value
					}]);
					self.markPointData.push({
						"name": o.name,
						"value": o.value
					});
				} else {
					self.markLineData.push([{
						"name": o.name
					}, {
						"name": self.data[0].name,
						"value": o.value
					}]);
				}

				var item = {
					"type": "Feature",
					"id": id,
					"properties": {
						"name": o.name,
						"cp": cp,
						"childNum": 1
					},
					"geometry": {
						"type": "Polygon",
						"coordinates": [
							"@@DB@DF@@@B@@@@@@@B@B@@@@@@@@@@@D@BAB@@@B@B@@@B@B@BA@@B@B@@BD@@F@B@@@B@@@@@B@B@B@@@B@@@@@@@FD@@CA@@AD@BC@@@A@EB@@CD@@AB@B@R@@@@@@@@@@@@ED@@@@@D@@@@@B@@E@@@BA@@A@@@A@@@A@@@@@@@@@@@A@@@CB@@@@@@@@@@AA@@@@@@@@AF@B@@@B@@@@@@@@@@@@@@AB@@BD@@@@@@@@@A@@@@B@@AB@@@@B@@@@@FBBA@CD@@EAA@@@A@@@@@@B@@@@@@@@@@@BB@@@@B@@@@@@@B@D@@@@@@@@@@@@AB@@@A@@@@A@A@@@@@@@@A@@@AA@@@A@@@A@A@@@@@AA@@A@@@E@@@@@@@A@C@@@@@@@@@@@E@@@@CB@@@@A@@@@@A@AA@@@@@@@@@BA@@@A@@A@@@BE@@IBE@G@C@C@@@@BC@A@@@C@C@A@C@A@A@@B@@@@BB@@@B@B@@@B@B@@@B@B@B@B@B@@@D@@CA@C@@AB@@@@@@@@C@@@A@@@EH@@AD@@@@@@@@AC@@C@@A@A@AB@@@@A@@@A@@AC@@ABG@A@@@@BE@C@A@@@@@AAAAA@@@A@C@@@@@@AA@@@@@@C@KBO@C@@@C@A@@@A@AAA@@@E@@@E@@CD@@@@@@A@@@@@C@@@@B@@AA@@C@@@@@@A@@@A@BGA@@@@@A@@A@@@@@@C@C@CB@@@@C@@@A@@@A@A@@@@@A@@@@@A@@AI@@@B@A@@B@B@B@@@@@@@B@@A@@@@A@@AB@BA@A@@@@@@DE@@@@@@B@@@BEA@@A@A@AAA@A@@@@@A@@B@@@@A@@@@@A@@@@@@@@@B@@B@@@@B@@@@@@@@@B@@D@@@DJ@B@D@@@@@H@NB@B@B@@@L@@@B@@@BAH@J@J@F@@@@@@A@@@A@@@@B@@@@@D@B@JG@@BB@@B@@@@@DA@@@@@@B@@@@B@AD@@@@@B@NJ@@B@@@@@@@@@@@@F@AJ@@@@C@AX@@@@@@AB@@A@@F@N@NMA@F@B"
						],
						"encodeOffsets": [
							[
								119181,
								40920
							]
						]
					}
				}
				self.mapData.features.push(item);
				if(o.items && o.items.length > 0) {
					var cpData = {
						"cp": cp,
						"data": o,
						"angle": angle
					};
					self.setData(o.items, cpData);
				}

			});
			self.mapOption.series[0].geoCoord = self.geoCoord;
			self.mapOption.series[0].markLine.data = self.markLineData;
			self.mapOption.series[0].markPoint.data = self.markPointData;
		};
		self.create();
		return self;
	};

	/**echarts组件**/
	base.echartsOld = function(option) {
		var self = {};
		self.container = null;
		self.dataOption = null;
		self.parentOption = option.parentOption;
		self.chart = null;
		self.data = null;
		self.echarts = null;
		self.theme = null;
		self.chartEle = null;
		option.seriesType = option.seriesType ? option.seriesType : "map";
		self.element = document.createElement("div");
		$(self.element).addClass("echarts-chart");

		if(option.show) {
			$(self.element).hide();
		} else {
			$(self.element).show();
		}

		$(option.container).append(self.element);
		base.setProperty(self.element, option);
		self.mapSelectFuc = function(chart) {
			if(option.seriesType == "map") {
				chart.on("mapselectchanged", function(param) {
					option.mapSelectedEvent(param, self);
				});
			} else {
				chart.on("click", function(param) {
					option.mapSelectedEvent(param, self);
				});
			}

		};
		self.clickFuc = function(chart) {
			require(["echartsConfig"], function(ecConfig) {
				chart.on("click", function(param) {

					option.clickEvent(param, self);
				});
			});

		};
		self.hoverFuc = function(chart) {
			require(["echartsConfig"], function(ecConfig) {
				chart.on("hover", function(param) {
					option.hoverEvent(param);
				});
			});
		};
		self.create = function() {
			if(option.option) {

				option.dataOption = option.option;

				if(option.setOptionDataEvent) {
					option.setOptionDataEvent(option);
				}
				if(option.type == "map") {

					require(["echarts2.0"], function() {

						if(option.mapData && option.mapName) {
							//self.mapName = option.mapName?option.mapName:"myMap";
							echarts.util.mapData.params.params[option.mapName] = {
								getGeoJson: function(callback) {
									if(typeof(option.mapData) == "string") {
										$.getJSON(option.mapData, function(data) {
											// 压缩后的地图数据必须使用 decode 函数转换
											callback(echarts.util.mapData.params.decode(data));
										});
									} else {
										callback(echarts.util.mapData.params.decode(option.mapData));
									}

								}
							};
							self.echarts = echarts;

							self.chart = self.echarts.init(self.element, self.theme);

							self.chartEle = self.chart.setOption(option.dataOption, true);

							$(window).on("resize", function() {
								self.reDraw();

							});
							if(option.mapSelectedEvent) {
								self.mapSelectFuc(self.chart);
							}
							if(option.clickEvent) {
								self.clickFuc(self.chart);
							}
							if(option.hoverEvent) {
								self.hoverFuc(self.chart);
							}

						} else {
							self.echarts = echarts;
							/*
							if(!option.dataOption.series[0].data||option.dataOption.series[0].data.length==0){
									$(self.container).attr("id",option.id);
									$(self.container).html("<div style='text-align:center;color:#fff;padding:15px 0 0 0;'>无数据</div>");
									return;
								}
							*/

							self.chart = self.echarts.init(self.element, self.theme);
							self.chartEle = self.chart.setOption(option.dataOption, true);

							$(window).on("resize", function() {
								self.reDraw();
							});
							if(option.mapSelectedCallback) {
								self.mapSelectFuc(self.chart);
							}
							if(option.clickCallback) {
								self.clickFuc(self.chart);
							}
							if(option.hoverCallback) {
								self.hoverFuc(self.chart);
							}
						}
					});
				} else {
					require(["echarts.min", option.theme], function(echarts, theme) {
						self.echarts = echarts;
						self.theme = theme;

						self.chart = self.echarts.init(self.element, self.theme);
						self.chartEle = self.chart.setOption(option.dataOption, true);

						$(window).on("resize", function() {
							self.reDraw();
						});
						if(option.mapSelectedCallback) {
							self.mapSelectFuc(self.chart);
						}
						if(option.clickCallback) {
							self.clickFuc(self.chart);
						}
						if(option.hoverCallback) {
							self.hoverFuc(self.chart);
						}
					});
				}

			}

		};

		self.setChartOption = function(chartOption) {
			option.dataOption = chartOption;
		};

		self.getChartOption = function() {
			return option.dataOption;
		};

		self.refresh = function(chartOption) {
			self.setChartOption(chartOption);
			self.chart.setOption(option.dataOption, true);
		};

		self.reDraw = function() {
			/*
			if(!option.dataOption.series[0].data||option.dataOption.series[0].data.length==0){
				$(self.container).attr("id",option.id);
				$(self.container).html("<div style='text-align:center;color:#fff;padding:15px 0 0 0;'>无数据</div>");
				return;
			}
			*/

			self.chart = self.echarts.init(self.element, self.theme);
			self.chart.setOption(option.dataOption, true);
			if(option.mapSelectedEvent) {
				self.mapSelectFuc(self.chart);
			}

		};
		self.create();
		return self;
	};

	/**轮播组件**/
	base.carousel = function(option) {
		var self = {};
		if(!option) {
			return;
		} else {

			self.container = $(option.container) ? $(option.container) : null;
			if(!option || !self.container) {
				return;
			}
			self.index = 0;
			self.data = option.data ? option.data : null;
			self.remoteData = option.remoteData ? option.remoteData : null;
			self.step = option.step ? option.step : 4;
			self.interval = option.interval ? option.interval : false;
			self.carouselBody = $(self.container).find(".carousel-inner");
		}

		self.setCarousel = function() {
			if(option.setCarouselEvent) {
				option.setCarouselEvent(self);
			}

		};
		self.slid = function() {
			if(option.slidEvent) {
				$(self.container).on("slid.bs.carousel", function() {
					option.slidEvent(self);
				});
			}
		};
		self.slide = function() {
			if(option.slideEvent) {
				$(self.container).on("slide.bs.carousel", function() {
					option.slideEvent(self);
				});
			}
		};
		self.next = function() {
			$(self.container).carousel('next');
		};
		self.prev = function() {
			$(self.container).carousel('prev');
		};
		self.drawCarousel = function() {
			if(option.slideEvent) {
				$(self.container).on("slide.bs.carousel", function() {
					option.slideEvent(self);
				});
			}

			if(self.data) {

				//self.setCarousel();
				$(self.container).carousel({
					interval: self.interval
				});
			}

		};
		self.create = function() {
			base.setProperty(self.carouselBody, option);
			self.slid();
			self.slide();
			self.drawCarousel();
			self.setCarousel();
			return self;
		};
		self.create();
		return self;
	};

	/**highCharts组件**/
	base.highCharts = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.chartOption = option.chartOption ? option.chartOption : null;
		self.theme = option.theme ? option.theme : "dark";
		self.callback = option.callback ? option.callback : null;
		self.element = null;
		self.isMain = option.isMain ? option.isMain : true;
		self.create = function() {
			if(self.container && self.chartOption) {
				if(self.isMain) {
					self.element = self.container;
				} else {
					self.element = document.createElement("div");
					$(self.container).append(self.element);
				}
				base.setProperty(self.element, option);
				if(self.callback) {
					$(self.element).highcharts(self.chartOption, self.callback);
				} else {
					$(self.element).highcharts(self.chartOption);
				}

			}
			return self;
		}
		self.create();
		return self;
	};

	/**进度条**/
	base.progress = function(option) {
		var self = {};
		self.element = null;
		self.container = option.container ? option.container : null;
		self.data = option.data.replace("/g", "%");
		self.data = Number(self.data) ? Number(self.data) : 0;
		self.animate = option.animate ? option.animate : true;
		self.progressColor = option.progressColor ? option.progressColor : "#0298f7";
		self.bgColor = option.bgColor ? option.bgColor : "#111";
		self.radius = option.radius ? option.radius : 5;
		self.label = null;
		self.height = option.height ? option.height : 9;
		self.progress = null;
		self.labelColor = option.labelColor ? option.labelColor : "#fff";
		self.progressLine = null;
		self.timer = option.timer ? option.timer : 1000;
		self.create = function() {
			$(self.container).css("height", self.height);
			$(self.container).css("float", "left");
			$(self.container).html("");
			if(!option.label) {
				self.setLabel();
			} else {
				if(option.label.show || option.label.show == "undefined")
					self.setLabel();
			}

			self.setProgress();
			base.setProperty(self.element, option);
			return self;
		};
		self.setLabel = function() {
			self.label = document.createElement("div");
			$(self.label).addClass("progressLabel");
			$(self.label).css("text-align", "center");
			//$(self.label).css("padding-top","3px");
			$(self.label).css("position", "relative");
			$(self.label).css("height", self.height);
			$(self.label).css("z-index", 3);

			if(self.height > 9) {
				$(self.label).css("top", self.height - 9);
			} else {
				$(self.label).css("top", -(9 - self.height + 3));
			}

			$(self.label).css("color", self.labelColor);
			$(self.label).css("font-size", self.height);
			$(self.label).html(0 + "%");
			$(self.container).append(self.label);
		};
		self.progressGlass = null;
		self.setProgressGlass = function() {
			self.progressGlass = document.createElement("div");
			$(self.progressGlass).addClass("progressGlass");
			$(self.progressGlass).css("background-color", "rgba(255,255,255,0.35)");
			$(self.progressGlass).css("height", self.height * 0.4);
			$(self.progressGlass).css("position", "absolute");
			$(self.progressGlass).css("border-radius", self.radius);
			$(self.progressGlass).css("left", 2);
			$(self.progressGlass).css("right", 2);
			$(self.progressGlass).css("top", 1);
			$(self.progress).append(self.progressGlass);
		};
		self.setProgress = function() {
			self.progress = document.createElement("div");

			$(self.progress).css("border-radius", self.radius);
			$(self.progress).css("width", "100%");
			$(self.progress).css("position", "relative");
			$(self.progress).css("z-index", 1);
			$(self.progress).css("top", -6);
			//$(self.progress).css("border","1px solid rgba(0,255,255,0.4)");
			$(self.progress).css("background", self.bgColor);
			//$(self.progress).css("border","1px solid rgba(0,0,0,0.8)");
			$(self.progress).css("padding", 1);
			$(self.progress).css("height", self.height);
			//$(self.progress).css("color",option.progress.color?option.progress.color:["#0093ca"]);
			$(self.progress).css("font-size", "13px");
			$(self.progress).css("box-shadow", "0 0 5px rgba(0,0,0,0.7)");
			$(self.container).append(self.progress);

			if(!base.IE8()) {
				self.setProgressGlass();
			}
			self.setProgressLine();
		};
		self.clear = function() {
			$(self.progressLine).css("width", 0);
		};
		self.timeoutFuc = null;
		self.animate = function() {
			if(self.animate) {
				$(self.progressLine).css("width", 0);
				var i = 0;
				self.timeoutFuc = window.setInterval(function() {
					i++;
					$(self.label).html(i + "%");
					if(i >= self.data) {
						window.clearInterval(self.timeoutFuc);
					}
				}, self.timer / self.data)
				$(self.progressLine).animate({
						"width": $(self.progress).width() * (self.data / 100)
					},
					self.timer
				);
			} else {
				$(self.label).html(self.data + "%");
				$(self.progressLine).css("width", $(self.progress).width() * (self.data / 100));
			}
		};
		self.setProgressLine = function() {
			self.progressLine = document.createElement("div");
			$(self.progressLine).addClass("progressLine");
			$(self.progressLine).css("border-radius", self.radius);

			if(jQuery.isArray(self.progressColor)) {
				var d = null;
				var min = 0;
				var max = 0;
				$(self.progressColor).each(function(i, o) {
					if(o.split(":").length > 1) {
						min = max;
						max = o.split(":")[1];
					} else {
						min = max;
						max = Math.round(100 / self.progressColor.length * (i + 1));
					}
					if(self.data >= min && self.data < max) {
						d = o;
					}
				});
				if(d) {
					var color = d.split(":")[0];
					$(self.progressLine).css("background", color);
					$(self.progressLine).css("box-shadow", "0 0 15px " + color);
				}

			} else {
				$(self.progressLine).css("background", self.progressColor);
			}
			$(self.progressLine).css("padding", 0);
			$(self.progressLine).css("height", "100%");

			$(self.progress).append(self.progressLine);
			self.animate();
		};

		self.create();
		return self;
	};
	/**圆形进度条**/
	base.roundLoader = function(option) {

		var self = {};
		self.container = option.container ? option.container : null;
		self.time = option.time ? option.time : null;
		self.showPercentage = option.showPercentage ? option.showPercentage : false;
		self.element = null;
		self.value = self.value ? self.value : 0;
		self.create = function() {
			if(base.IE8()) {
				return;
			}
			if(option && self.container) {
				require(["radialIndicator"], function() {
					base.setProperty(self.element, option);
					self.set();
				});
			}
			return self;
		};
		self.set = function() {

			if(self.time) {

				window.setInterval(function() {
					if(self.value < 100) {
						self.value = self.value + 1;
					} else {
						self.value = 0;
						if(option.drawEvent) {
							option.drawEvent(self);
						}
					}
					self.draw();
				}, self.time / 100);
			} else {
				self.draw();
			}

		};
		self.draw = function() {

			$(self.container).html("");

			self.element = $(self.container).radialIndicator({
				radius: 12,
				showPercentage: self.showPercentage,
				displayNumber: false,
				barWidth: 2.5,
				roundCorner: true,
				barBgColor: "rgba(0,0,0,0)",
				barColor: "#20c6fc",
				shadowColor: "#20c6fc",
				shadowRadius: 5
			}).data("radialIndicator");
			self.element.value(self.value);
		};
		self.create();
		return self;
	};

	/**定制化滚动条**/
	base.scroll = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.topEvent = option.topEvent ? option.topEvent : null;
		self.bottomEvent = option.bottomEvent ? option.bottomEvent : null;
		self.scrollEvent = option.scrollEvent ? option.scrollEvent : null;
		self.xScroll = option.xScroll ? option.xScroll : false;
		self.callback = option.callback ? option.callback : null;
		self.scrollOption = {
			"mouseWheel": true,
			"scrollInertia": 500,
		};
		self.create = function() {
			require(["jqScrollbar"], function() {
				self.destroy();
				if(self.scrollEvent) {
					self.scrollOption.callbacks.onScroll = function() {
						self.scrollEvent(self);
					}
				}
				if(self.bottomEvent) {
					self.scrollOption.callbacks.onTotalScroll = function() {
						self.bottomEvent(self);
					}
				}
				if(self.topEvent) {
					self.scrollOption.callbacks.onTotalScrollBack = function() {
						self.topEvent(self);
					}
				}
				if(self.xScroll) {
					self.scrollOption.horizontalScroll = self.xScroll;
				}
				$(self.container).mCustomScrollbar(self.scrollOption);

				if(self.callback) {
					self.callback(self);
				}
			});

		};
		self.destroy = function() {
			$(self.container).mCustomScrollbar("destroy");
		};
		self.disable = function() {
			$(self.container).mCustomScrollbar("disable");
		};
		self.position = function(posNumber) {
			$(self.container).mCustomScrollbar("scrollTo", posNumber);
		};
		self.top = function() {
			$(self.container).mCustomScrollbar("scrollTo", "top");
		};
		self.bottom = function() {
			$(self.container).mCustomScrollbar("scrollTo", "bottom");
		};
		self.create();
		return self;

	};
	/**表格**/
	base.grid = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.table = null;
		self.ajaxType = option.ajaxType ? option.ajaxType : "get";
		self.header = null;
		self.body = null;
		self.footer = null;
		self.params = {};
		self.columns = null;
		self.gridOption = option.gridOption ? option.gridOption : null;
		self.pagination = option.pagination ? option.pagination : true;
		self.paginationContainer = null;
		self.paginationNumber = 5;
		self.url = option.url ? option.url : null;
		self.data = option.data ? option.data : null;
		self.pageSize = option.pageSize ? option.pageSize : 10;
		self.pageNumber = 1;
		self.callback = option.callback ? option.callback : null;
		self.total = 0;
		self.pageCount = 0;
		self.pageItemOption = {
			"first": {
				type: "first",
				title: "首页",
				number: 1,
				context: "<i class='fa fa-angle-double-left'></i>"
			},
			"previous": {
				type: "previous",
				title: "上一页",
				number: self.pageNumber - 1,
				context: "<i class='fa fa-angle-left'></i>"
			},
			"moreLeft": {
				type: "moreLeft",
				context: "..."
			},
			"moreRight": {
				type: "moreRight",
				context: "..."
			},
			"next": {
				type: "next",
				number: self.pageNumber - 1,
				title: "下一页",
				context: "<i class='fa fa-angle-right'></i>"
			},
			"last": {
				type: "last",
				number: self.pageCount,
				title: "末页",
				context: "<i class='fa fa-angle-double-right'></i>"
			},
			"jump": {
				type: "jump",
				context: "到第<input type='text' class='pageInput form-control'/>页<button style='margin-left:5px' class='btn btn-primary'>确定</button>"
			},
			"page": {
				number: null,
				type: "page",
				context: null,
				cls: "fb-page-item"
			}
		};
		self.create = function() {
			if(self.container) {
				self.drawTable();
			}
			return self;
		};

		self.drawTable = function() {
			if($(self.container).children("table").length == 0) {
				self.table = document.createElement("table");
				base.setProperty(self.table, self.gridOption.grid);
				$(self.container).append(self.table);
			} else {
				self.table = $(self.container).children("table")[0];
				base.setProperty(self.table, self.gridOption.grid);
			}
			self.drawHeader();
			self.drawBody();
			self.drawFooter();
			if(self.pagination) {
				self.query({
					isPagination: true
				});
			}

		};
		self.drawSort = function(ele, data) {
			var s = "<div class='btn-group'><a class='dropdown-toggle' data-toggle='dropdown'><span>" + data.columnContext + "</span><i class='fa fa-sort-down'></i></a>" +
				"<ul class='dropdown-menu' role='menu'>" +
				"<li><a type='desc'>降序</a></li>" +
				"<li><a type='asc'>升序</a></li>" +
				"<li><a>正常</a></li>" +
				"</ul>";
			$(ele).html(s);
			$(ele).find(".dropdown-menu a").unbind("click").on("click", function() {
				switch($(this).attr("type")) {
					case "desc":
						self.params.sort = data.columnName + "_desc";
						break;

					case "asc":
						self.params.sort = data.columnName + "_asc";
						break;

					default:
						if(self.params.sort)
							delete self.params.sort;
						break;
				}
				self.pageNumber = 1;
				self.query({
					isPagination: true
				});
			});
		};
		self.drawHeader = function() {
			if($(self.container).children("thead").length == 0) {

				if(self.gridOption) {
					if(self.gridOption.columns && self.gridOption.columns.length > 0) {
						self.columns = self.gridOption.columns;
						self.header = document.createElement("thead");
						$(self.table).append(self.header);
						$(self.columns).each(function(i, o) {
							var tr = document.createElement("tr");
							$(self.header).append(tr);
							$(o).each(function(i1, o1) {
								var th = document.createElement("th");
								base.setProperty(th, o1);
								if(o1.sort) {
									self.drawSort(th, o1);
								} else {
									$(th).html(o1.columnContext);
								}
								$(tr).append(th);
							});
						});
					}
				}
			}
		};

		self.query = function(option) {
			$(self.body).html("");
			self.params.pageSize = self.pageSize;
			self.params.pageNumber = self.pageNumber;
			if(self.url) {
				base.ajax({
					url: self.url,
					params: self.params,
					type: self.ajaxType,
					success: function(data) {
						$(self.body).html("");
						var gridData = data.data;
						self.total = data.total;
						$(gridData).each(function(i, o) {
							var tr = document.createElement("tr");
							$(self.body).append(tr);
							$(self.columns[0]).each(function(i1, o1) {
								var td = document.createElement("td");
								if(self.gridOption.columnDefine[o1.columnName]) {
									var define = self.gridOption.columnDefine[o1.columnName];
									if(define.drawEvent) {
										define.drawEvent(o[o1.columnName], td);
									}
								} else {
									$(td).html(o[o1.columnName]);
								}

								$(tr).append(td);
							});
						});

						if(option) {
							if(option.isPagination) {
								self.drawPagination();
							}
						}
						if(self.callback) {
							self.callback();
						}
					},
					beforeSend: function() {
						$(self.body).html("<tr><td class='tb-loadContainer' style='height:200px' colspan='" + $(self.table)[0].rows.item(0).cells.length + "'></td></tr>");
						base.loading($(self.body).find(".tb-loadContainer"));
					}
				});
			}
		};
		self.drawBody = function() {
			$(self.table).remove("tbody");
			self.body = document.createElement("tbody");
			$(self.table).append(self.body);

		};
		self.drawFooter = function() {
			$(self.table).remove("tfoot");
			self.footer = document.createElement("tfoot");
			$(self.table).append(self.footer);
		};

		self.drawPagination = function() {
			if(!self.paginationContainer) {
				self.paginationContainer = document.createElement("ul");
				$(self.paginationContainer).addClass("fb-grid-pagination");
				$(self.container).append(self.paginationContainer);
			} else {
				$(self.paginationContainer).html("");
			}

			if(self.total % self.pageSize == 0) {
				self.pageCount = self.total / self.pageSize;
			} else {
				self.pageCount = Math.floor(self.total / self.pageSize) + 1;
			}

			self.drawPaginationItem();

		};
		self.setActive = function(ele) {
			$(self.paginationContainer).find(".active").removeClass("active");
			$(ele).addClass("active");
		};
		self.drawPaginationItem = function() {
			$(self.paginationContainer).find("li").remove();
			self.createPageItem("info");
			if(self.pageCount <= self.paginationNumber) { //分页总数<=页段数量
				for(var i = 1; i <= self.pageCount; i++) {
					self.createPageItem("page", i);
				}
			} else {
				if(self.pageNumber < self.paginationNumber) { //当前页<=页段数量
					for(var i = 1; i <= self.paginationNumber; i++) {
						self.createPageItem("page", i);
					}
					self.createPageItem("moreRight");
					self.createPageItem("next", self.pageNumber + 1);
					self.createPageItem("last", self.pageCount);
				} else if(self.pageNumber > (self.pageCount - self.paginationNumber)) {
					self.createPageItem("first", 1);
					self.createPageItem("previous", self.pageNumber - 1);
					self.createPageItem("moreLeft");
					for(var i = self.pageCount - self.paginationNumber; i <= self.pageCount; i++) {
						self.createPageItem("page", i);
					}
				} else {
					self.createPageItem("first", 1);
					self.createPageItem("previous", self.pageNumber - 1);
					self.createPageItem("moreLeft");

					for(var i = self.pageNumber - (Math.floor(self.paginationNumber / 2)); i <= self.pageNumber + (Math.floor(self.paginationNumber / 2)); i++) {
						self.createPageItem("page", i);
					}

					self.createPageItem("moreRight");
					self.createPageItem("next", self.pageNumber + 1);
					self.createPageItem("last", self.pageCount);
				}

			}
			self.createPageItem("jump");
		};
		self.createPageItem = function(type, number) {
			var item = document.createElement("li");
			$(self.paginationContainer).append(item);
			$(item).attr("type", type);
			switch(type) {
				case "info":
					$(item).html("<div style='letter-spacing:0.5px;padding:0 20px;font-size:13px;'>共" + self.pageCount + "页(" + self.total + "条记录)" + "" + "</div>");
					break;

				case "first":
					$(item).html("<i class='fa fa-angle-double-left'></i>");
					$(item).attr("title", "首页");
					$(item).on("click", function() {
						self.pageNumber = number;
						self.drawPaginationItem();
						self.query();
					});
					break;
				case "previous":
					$(item).html("<i class='fa fa-angle-left'></i>");
					$(item).attr("title", "上一页");
					$(item).on("click", function() {
						self.pageNumber = number;
						self.drawPaginationItem();
						self.query();
					});
					break;
				case "next":
					$(item).html("<i class='fa fa-angle-right'></i>");
					$(item).attr("title", "下一页");
					$(item).on("click", function() {
						self.pageNumber = number;
						self.drawPaginationItem();
						self.query();
					});
					break;
				case "last":
					$(item).html("<i class='fa fa-angle-double-right'></i>");
					$(item).attr("title", "末页");
					$(item).on("click", function() {
						self.pageNumber = number;
						self.drawPaginationItem();
						self.query();
					});
					break;

				case "page":
					$(item).addClass("fb-page-item");
					$(item).html(number);
					if(self.pageNumber == number) {
						$(item).addClass("active");
					}
					$(item).on("click", function() {
						self.pageNumber = number;
						self.drawPaginationItem();
						self.query();
					});
					break;
				case "moreLeft":
				case "moreRight":
					$(item).html("...");
					break;

				case "jump":
					$(item).html("到第<input type='number' class='pageInput form-control'/>页<button style='margin-left:5px' class='btn btn-primary'>确定</button>");
					$(item).find("button").on("click", function() {
						var num = $(item).find("input").val();
						if(num) {
							if(num < 1) {
								num = 1;
								$(item).find("input").val(num);
							} else if(num > self.pageCount) {
								num = self.pageCount;
							}
							self.pageNumber = num;
							self.query({
								isPagination: true
							});
						}
					});
					break;
			}

		};

		self.pageTo = function(pageNumber) {
			self.pageNumber = pageNumber;
			self.drawPaginationItem();
			self.query();
		};

		self.reset = function() {
			self.pageNumber = 1;
			self.pageSize = option.pageSize ? option.pageSize : self.pageSize;
			self.params = {};
			self.query({
				isPagination: true
			});
		};

		self.search = function(option) {
			self.pageNumber = 1;
			self.pageSize = option.pageSize ? option.pageSize : self.pageSize;
			if(option) {
				self.params = option.params ? option.params : self.params;
			}
			self.query({
				isPagination: true
			});
		};
		self.addRow = function(data, drawCallback) {
			var row = document.createElement("tr");
			$(self.body).append(row);
			$(data).each(function(i, o) {
				var column = document.createElement("td");
				column.html(o);
				$(row).append(column);
			});
			if(drawCallback) {
				drawCallback(self);
			}
		};
		self.deleteRow = function(obj) {
			$(obj).parents("tr").remove();
		};
		self.create();
		return self;
	};
	/**获取选中的checkbox或radio**/
	base.getCR = function(obj, hasValue) {
		var cbs = null;
		var v = "";
		if((typeof(obj)).toLowerCase() == "string") {
			cbs = $("input[name='" + obj + "']:checked");
			if(hasValue) {
				$(cbs).each(function(i, o) {
					if(i == ($(cbs).length - 1)) {
						v += $(o).val();
					} else {
						v += $(o).val() + ",";
					}

				});
				return v;
			} else {
				return cbs;
			}

		} else {
			cbs = $("input[name='" + $(obj).attr("name") + "']:checked");
			if(hasValue) {
				$(cbs).each(function(i, o) {
					if(i == ($(cbs).length - 1)) {
						v += $(o).val();
					} else {
						v += $(o).val() + ",";
					}

				});
			} else {
				return cbs;
			}

		}
		/*
				return $(obj).filter(":checked");*/
	};
	/**获取选中的checkbox或radio**/
	base.getChecks = function(name) {
		var cbs = $("input[name='" + name + "']");
		var ary = [];
		$(cbs).each(function(i, o) {
			if($(o).is(':checked')) {
				ary.push($(o).val());
			}
		});
		return ary;
	};

	/**设置选中checkbox或radio**/
	base.setChecks = function(data, name) {
		var eles = $("input[name='" + name + "']");
		$(eles).each(function(i, o) {
			$(o).prop("checked", false);
		});
		if(data){
	         if(typeof(data).toLowerCase()!='object'){
	            $(eles).filter("[value='" + data + "']").prop("checked", true);
	         }else{
	            for(var i=0;i<data.length;i++){
	               $(eles).filter("[value='" + data[i] + "']").prop("checked", true);
	            }
	         }
      	}
	};
	/**全选checkbox**/
	base.selectAll = function(e1, e2, callback) {
		$(e1).on("click", function() {
			if($(this).is(':checked')) {
				$(e2).not(":disabled").prop("checked", true);
			} else {
				$(e2).not(":disabled").prop("checked", false);
			}
			if(callback) {
				callback(e1, e2);
			}
		});

		$(e2).on("click", function() {
			if($(e2).filter(":checked").length == $(e2).length) {
				$(e1).prop("checked", true);
			} else {
				$(e1).prop("checked", false);
			}
			if(callback) {
				callback(e1, e2);
			}
		});
	};
	/**清除最后一个字符**/
	base.clearLastCharacter = function(str) {
		str = str.substring(0, str.length - 1);
		return str;
	};
	/**表单**/
	base.formEntity = function() {
		var self = this;
		self.init = function(dataMap, form) {
			for(var key in dataMap) {
				var e = $(form).find("[name='" + key + "']");
				if(e.length == 0) {
					continue;
				}
				var type = e.attr("type");
				if(type) {
					type = type.toLowerCase();
				}
				switch(type) {
					case "checkbox":
					case "radio":
						base.setChecks(dataMap[key], e.attr("name"));
						break;

					case "hidden":
					case "text":
						e.val(dataMap[key]);
						break;

					default:
						switch(e[0].tagName.toLowerCase()) {
							case "select":
							case "textarea":
								e.val(dataMap[key]);
								break;

							default:
								e.text(dataMap[key]);
								break;
						}
						break;
				}
			}
		};
		return self;
	};
	base.form = new base.formEntity();
	/**校验上传文件大小,fileSize单位是kb,如果要校验20m的文件，fileSize就传参20*1024**/
	base.form.validateFileSize = function(input, fileSize) {
		var fileInput = $(input)[0];
		var byteSize = fileInput.files[0].fileSize ? fileInput.files[0].fileSize : fileInput.files[0].size;
		if(Math.ceil(byteSize / 1024) > fileSize) {
			return false;
		} else {
			return true;
		}
	};
	/**获取文件名**/
	base.form.getFileName = function(input) {
		var file = $(input).val();
		return file.replace(/.*(\/|\\)/, "");
	};
	/**获取文件扩展名**/
	base.form.getFileExtname = function(input) {
		var file = $(input).val();
		var filename = base.form.getFileName(input);
		return(/[.]/.exec(filename)) ? /[^.]+$/.exec(filename.toLowerCase()) : '';
	};
	/**校验文件名扩展名是否正确,filenames用逗号分割，例如: jpg,bmp,gif,doc...**/
	base.form.validateFileExtname = function(input, filenames) {
		var filename = base.form.getFileExtname(input);
		var hasName = false;
		$(filenames.split(",")).each(function(i, o) {
			if(o == filename) {
				hasName = true;
				return false;
			}
		});
		if(!hasName) {
			return false;
		} else {
			return true;
		}
	};
	/**动态表单**/
	base.form.autoForm = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.data = option.data ? option.data : null;
		self.columnSize = option.columnSize ? option.columnSize : 3;
		self.layoutType = option.layoutType ? option.layoutType : "table";
		self.layoutContainer = null;
		self.layoutContainerBody = null;
		self.layoutOption = option.layoutOption ? option.layoutOption : null;
		self.rowOption = option.rowOption ? option.rowOption : null;
		self.columnOption = option.columnOption ? option.columnOption : null;
		self.buttons = option.buttons ? option.buttons : null;
		if(!self.container) {
			return;
		}
		if(!self.data || self.data.length == 0) {
			return;
		}
		self.create = function() {
			if(self.layoutType == "table") {
				self.createTable();
			} else {
				self.createDivGroup();
			}
			if(self.buttons) {
				self.createButtons();
			}
			return self;
		};
		self.createButtons = function() {
			var buttonbar = document.createElement("div");
			$(buttonbar).css("clear", "over");
			$(buttonbar).css("margin", "5px");
			$(buttonbar).css("float", "right");
			$(self.buttons).each(function(i, o) {
				o.container = buttonbar;
				switch(o.type) {

					case "submit":
						o.cls = "btn btn-info";
						o.label = "提交";
						o.clickEvent = function() {

							base.form.reset($(buttonbar).parents("form"));
						};
						break;

					case "reset":
						o.cls = "btn btn-warning";
						o.label = "重置";
						o.clickEvent = function() {
							base.form.reset($(buttonbar).parents("form"));
						};
						break;

				}
				var btn = base.form.button(o);

			});
			$(self.container).append(buttonbar);
		};
		self.createTable = function() {
			self.layoutContainer = document.createElement("table");
			if(self.layoutOption) {
				base.setProperty(self.layoutContainer, self.layoutOption);
			}
			$(self.container).append(self.layoutContainer);
			self.layoutContainerBody = document.createElement("tbody");
			$(self.layoutContainer).append(self.layoutContainerBody);
			var count = 0;
			var tr = null;
			var tmp = 0;
			$(self.data).each(function(i, o) {
				var columnSize = 1;
				if(o.columnSize) {
					if(o.columnSize > self.columnSize) {
						count += self.columnSize;
						columnSize = self.columnSize;
					} else if(o.columnSize <= 0) {
						count++;
						columnSize = 1;
					} else {
						count += o.columnSize;
						columnSize = o.columnSize;
					}
				} else {
					count++;
				}

				if(count > self.columnSize) {
					count = columnSize;
					tr = document.createElement("tr");
					if(self.rowOption) {
						base.setProperty(tr, self.rowOption);
					}
					self.layoutContainerBody.append(tr);
					self.createColumn(tr, o, columnSize);

				} else if(count == 1) {
					tr = document.createElement("tr");
					if(self.rowOption) {
						base.setProperty(tr, self.rowOption);
					}
					self.layoutContainerBody.append(tr);
					self.createColumn(tr, o, columnSize);
				} else {
					self.createColumn(tr, o, columnSize);
				}

			});
			self.autoFill();
		};
		self.autoFill = function() {
			//console.log(count);
			var rows = self.layoutContainer.rows;
			$(rows).each(function(i, o) {
				var cells = o.cells;
				var columnNum = 0;
				$(cells).each(function(i1, o1) {
					columnNum += Number($(o1).attr("colspan") ? $(o1).attr("colspan") : 1);
				});

				if(columnNum < self.columnSize * 2) {
					for(var i1 = 0; i1 < self.columnSize * 2 - columnNum; i1++) {
						if(i1 % 2 == 0) {
							var label = $("<td></td>");
							if(self.columnOption && self.columnOption.label) {
								base.setProperty(label, self.columnOption.label);
							}
							$(o).append(label);
						} else {
							var content = $("<td></td>");
							if(self.columnOption && self.columnOption.content) {
								base.setProperty(content, self.columnOption.content);
							}
							$(o).append(content);
						}
					}
				}

			});
		};
		self.createColumn = function(row, data, columnSize) {
			var label = document.createElement("td");
			if(self.columnOption && self.columnOption.label) {
				base.setProperty(label, self.columnOption.label);
			}
			$(row).append(label);
			if(data.label) {
				if(data.role) {
					if(data.role.required) {
						$(label).html("<span style='font-size:15px;color:red'>*</span>" + data.label);
					} else {
						$(label).text(data.label);
					}
				} else {
					$(label).text(data.label);
				}

			}
			var content = document.createElement("td");
			if(self.columnOption && self.columnOption.content) {
				base.setProperty(content, self.columnOption.content);
			}
			if(columnSize > 1) {
				$(content).attr("colspan", columnSize * 2 - 1);
			}

			$(row).append(content);
			data.container = content;
			base.form.element(data);
		};

		self.createElementToDivGroup = function() {

		};
		self.createElementToDiv = function() {

		};

		self.create();
		return self;
	};
	/**筛选器**/
	base.form.filterBox = function(option) {
		var self = {};
		self.data = option.data ? option.data : null;
		self.container = option.container ? option.container : null;
		self.callback = option.callback ? option.callback : null;
		self.leftBox = null;
		self.rightBox = null;
		self.leftBoxContainer = null;
		self.rightBoxContainer = null;
		self.handlerBox = null;
		self.handlerBoxContainer = null;
		self.handlerWidth = 50;
		self.boxMinWidth = 150;
		self.shadow = option.shadow == 0 ? false : true;
		self.height = option.height ? option.height : $(self.container).height();
		self.unique = option.unique == 0 ? false : true;
		self.isTree = option.isTree == 0 ? false : true;
		self.tree = null;
		self.treeNode = null;
		self.resultData = [];
		self.url = option.url ? option.url : null;
		self.params = option.params ? option.params : null;
		self.type = option.type ? option.type : "get";
		self.create = function() {
			self.createLeftBox();
			self.createHandler();
			self.createRightBox();
			return self;
		};
		self.treeContainerId = base.getRandom(1000, 9999) + "filterBoxTree";
		self.createLeftBox = function() {
			var w = ($(self.container).width() - self.handlerWidth) / 2;
			if(w < self.boxMinWidth) {
				w = self.boxMinWidth;
			}
			self.leftBox = document.createElement("div");
			$(self.leftBox).css("float", "left");
			$(self.leftBox).css("width", w);
			$(self.leftBox).css("padding", "10px");
			$(self.container).append(self.leftBox);
			self.leftBoxContainer = document.createElement("div");
			$(self.leftBoxContainer).attr("id", self.treeContainerId);
			$(self.leftBoxContainer).css("height", self.height);
			$(self.leftBoxContainer).css("overflow", "auto");
			$(self.leftBoxContainer).css("padding", "5px");
			if(self.shadow) {
				$(self.leftBoxContainer).css("box-shadow", "0 0 10px #ddd inset");
			}

			$(self.leftBoxContainer).css("border", "1px solid #ccc");
			$(self.leftBox).append(self.leftBoxContainer);
			self.createLeftItems();
		};
		self.treeClickEvent = function(event, treeId, treeNode) {
			self.treeNode = treeNode;
		};
		self.createLeftItems = function() {
			$(self.leftBoxContainer).addClass("ztree");
			if(self.url) {
				base.ajax({
					url: self.url,
					type: self.type,
					params: self.params,
					success: function(data) {
						self.tree = base.tree({
							container: $(self.leftBoxContainer),
							data: data,
							setting: {
								data: {
									simpleData: {
										enable: true
									}
								},
								callback: {
									onClick: self.treeClickEvent
								}
							}
						});
					}
				});
			} else {
				if(self.data && self.data.length > 0) {
					self.tree = base.tree({
						container: $(self.leftBoxContainer),
						data: self.data,
						setting: {
							data: {
								simpleData: {
									enable: true
								}
							},
							callback: {
								onClick: self.treeClickEvent
							}
						}
					});
				}
			}
		};

		self.createRightBox = function() {
			var w = ($(self.container).width() - self.handlerWidth) / 2;
			if(w < self.boxMinWidth) {
				w = self.boxMinWidth;
			}
			self.rightBox = document.createElement("div");
			$(self.rightBox).css("float", "left");

			$(self.rightBox).css("width", w);
			$(self.rightBox).css("padding", "10px");
			$(self.container).append(self.rightBox);
			self.rightBoxContainer = document.createElement("div");
			$(self.rightBoxContainer).css("height", self.height);
			if(self.shadow) {
				$(self.rightBoxContainer).css("box-shadow", "0 0 10px #ddd inset");
			}
			$(self.rightBoxContainer).css("overflow", "auto");
			$(self.rightBoxContainer).css("padding", "0px 5px");
			$(self.rightBoxContainer).css("border", "1px solid #ccc");
			$(self.rightBox).append(self.rightBoxContainer);
		};
		self.createHandler = function() {
			self.handlerBox = document.createElement("div");
			$(self.handlerBox).css("float", "left");
			$(self.handlerBox).css("width", self.handlerWidth);
			$(self.handlerBox).css("height", self.height + 20);
			$(self.handlerBox).css("padding", "10px 0");
			$(self.handlerBox).css("display", "table");
			$(self.handlerBox).css("text-align", "center");
			$(self.container).append(self.handlerBox);
			self.handlerBoxContainer = document.createElement("div");
			$(self.handlerBoxContainer).css("width", self.handlerWidth);
			$(self.handlerBoxContainer).css("vertical-align", "middle");
			$(self.handlerBoxContainer).css("display", "table-cell");
			base.form.button({
				container: self.handlerBoxContainer,
				icon: "fa fa-angle-right",
				iconStyle: "font-size:22px",
				style: "margin-bottom:10px",
				attr: [{
					name: "title",
					value: "添加"
				}],
				clickEvent: function() {
					self.add();
				}
			});
			base.form.button({
				container: self.handlerBoxContainer,
				icon: "fa fa-angle-left",
				iconStyle: "font-size:22px",
				attr: [{
					name: "title",
					value: "移除"
				}],
				style: "margin-bottom:10px",
				clickEvent: function() {
					self.remove();
				}
			});
			$(self.handlerBox).append(self.handlerBoxContainer);
		};

		self.getData = function() {
			return self.resultData;
		};
		self.createResultItem = function() {
			if(!self.treeNode) {
				base.alert("请选择添加项");
				return false;
			}
			if(!self.checkRepeat()) {
				var resultItem = document.createElement("span");
				$(resultItem).html(self.treeNode.name);
				$(resultItem).css("cursor", "pointer");
				$(resultItem).css("background", "#f2f2f2");
				$(resultItem).css("padding", "5px 15px");
				$(resultItem).css("border", "1px solid #ddd");
				$(resultItem).css("margin", "5px 5px 5px 0");
				$(resultItem).css("float", "left");
				$(resultItem).attr("treeId", self.treeNode.id);
				$(resultItem).on("click", function() {
					$(self.rightBoxContainer).children().css("background", "#f2f2f2");
					$(self.rightBoxContainer).children().css("border", "1px solid #ddd");
					$(self.rightBoxContainer).children().removeClass("active");
					$(this).addClass("active");
					$(this).css("background", "#c9f2fe");
					$(this).css("border", "1px solid #63c9e7");
				});
				$(resultItem).on("mouseover", function() {

				});
				$(resultItem).on("mouseout", function() {

				});
				$(self.rightBoxContainer).append(resultItem);
				self.resultData.push(self.treeNode);
			} else {
				base.alert("不能重复添加“<span style='padding:0 5px;color:#00a7ed'>" + self.treeNode.name + "</span>”！");
			}
		};
		self.checkRepeat = function() {
			var hasRepeat = false;
			$(self.resultData).each(function(i, o) {
				if(self.treeNode.id == o.id) {
					hasRepeat = true;
					return false;
				}
			});
			return hasRepeat;
		};
		self.deleteNodeData = function(obj) {
			var treeId = $(obj).attr("treeId");
			$(self.resultData).each(function(i, o) {
				if(treeId == o.id) {
					self.resultData.splice(i, 1);
					return false;
				}
			});
		};
		self.add = function() {
			self.createResultItem();
		};
		self.remove = function() {
			var activeNode = $(self.rightBoxContainer).children(".active");
			if(activeNode.length == 0) {
				base.alert("请选择删除项");
				return false;
			}
			self.deleteNodeData(activeNode);
			activeNode.remove();
		};
		self.create();
		return self;
	};
	/**表单控件**/
	base.form.element = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.type = option.type ? option.type : "text";
		self.name = option.name ? option.name : null;
		self.id = option.id ? option.id : null;
		self.role = option.role ? option.role : null;
		self.readonly = option.readonly == true ? true : false;
		self.disabled = option.disabled == true ? true : false;
		self.data = option ? option : null;
		self.create = function() {
			self.createElement();
			return self;
		};
		self.createElement = function(option) {
			var data = self.data;
			switch(self.type) {
				case "text":
					self.element = document.createElement("input");
					$(self.element).addClass("form-control");
					base.setProperty(self.element, data);
					$(self.element).attr("type", self.type);
					if(data.value) {
						$(self.element).val(data.value);
					}
					break;

				case "hidden":
					self.element = document.createElement("input");
					base.setProperty(self.element, data);
					$(self.element).attr("type", self.type);
					if(data.value) {
						$(self.element).val(data.value);
					}
					break;

				case "file":
					self.element = document.createElement("input");
					base.setProperty(self.element, data);
					$(self.element).attr("type", "file");
					$(self.element).css("display", "none");

					var btn = base.form.button({
						container: self.container,
						label: data.label ? data.label : "文件",
						attr: [{
							"name": "onclick",
							"value": "return false;"
						}],
						clickEvent: function() {
							$(self.element).click();
							return false;
						}
					});
					if(self.readonly) {
						$(self.element).attr("readonly", true);
					}
					if(self.disabled) {
						$(self.element).attr("disabled", true);
						$(btn.element).attr("disabled", true);
					}
					self.element.addEventListener("change", function() {
						$(self.element).replaceWith("<input type='file' id='" + self.id + "' name='" + self.name + "' style='display:none;'/>");
					});
					break;

				case "date":
					self.element = document.createElement("input");
					base.setProperty(self.element, data);
					$(self.element).attr("type", "text");
					$(self.element).addClass("form-control");
					$(self.element).attr("readonly", true);
					base.form.date({
						element: self.element,
						isTime: data.isTime == true ? true : false,
						dateOption: data.dateOption ? data.dateOption : null
					});
					if(data.value) {
						$(self.element).val(data.value);
					}
					break;

				case "select":
					self.element = document.createElement("select");
					base.setProperty(self.element, data);
					$(self.element).addClass("form-control");

					var draw = function(data, optionData) {
						$(self.element).append("<option value='-1'>*请选择*</option>");
						$(data).each(function(i, o) {
							$(self.element).append("<option value='" + o.value + "'>" + o.key + "</option>");
							if(o.selected) {
								$(self.element).val(o.value);
							}
						});
						if(optionData.changeEvent) {
							$(self.element).on("change", function() {
								optionData.changeEvent(self);
							});
						}
					};
					if(data.data && data.data.length > 0) { //本地数据
						draw(data.data, data);
					} else if(data.ajax) { //远程数据
						base.ajax({
							url: data.ajax.url,
							params: data.ajax.params ? data.ajax.params : null,
							type: data.ajax.type ? data.ajax.type : "get",
							success: function(ajaxData) {
								if(ajaxData && ajaxData.length > 0) {
									draw(ajaxData, data);
								}
							}
						});
					}

					break;

				case "textarea":
					self.element = document.createElement("textarea");
					base.setProperty(self.element, data);
					$(self.element).addClass("form-control");
					if(data.value) {
						$(self.element).val(data.value);
					}
					break;

				case "radio":
					var draw = function(data, optionData) {
						var role = null;
						if(optionData.role) {
							role = " role='" + JSON.stringify(self.role).replace(/"/g, "") + "'";
						}
						$(data).each(function(i, o) {
							//var radioContainer = $("<div style='float:left;padding:3px 5px;'></div>");
							var radio = $("<input type='radio' style='margin-right:4px;' name='" + optionData.name + "' value='" + o.value + "'" + role + "/>");
							$(self.container).append(radio);
							$(self.container).append(o.key);
							base.setProperty(radio, data);
							//$(self.container).append(radioContainer);
							if(o.selected) {
								$(radio).prop("checked", true);
							}
							if(self.readonly) {
								$(radio).attr("readonly", true);
							}
							if(self.disabled) {
								$(radio).attr("disabled", true);
							}
						});
						if(optionData.clickEvent) {
							$(container).find("input[type='radio']").on("click", function() {
								optionData.clickEvent(self);
							});
						}
					};
					if(data.data && data.data.length > 0) {
						draw(data.data, data);
					} else if(data.ajax) {
						base.ajax({
							url: data.ajax.url,
							params: data.ajax.params ? data.ajax.params : null,
							type: data.ajax.type ? data.ajax.type : "get",
							success: function(ajaxData) {
								if(ajaxData && ajaxData.length > 0) {
									draw(ajaxData, data);
								}
							}
						});
					}
					break;

				case "checkbox":
					var draw = function(data, optionData) {
						var role = null;
						if(optionData.role) {
							role = " role='" + JSON.stringify(self.role).replace(/"/g, "") + "'";
						}
						$(data).each(function(i, o) {
							//var checkboxContainer = $("<div style='float:left;padding:3px 5px;'></div>");
							var checkbox = $("<input type='checkbox' style='margin-right:3px;' name='" + optionData.name + "' value='" + o.value + "'" + role + "/>");
							base.setProperty(checkbox, data);
							$(self.container).append(checkbox);
							$(self.container).append("<span style='margin-right:20px;'>" + o.key + "</span>");
							//$(self.container).append(checkboxContainer);
							if(o.selected) {
								$(checkbox).prop("checked", true);
							}
							if(self.readonly) {
								$(checkbox).attr("readonly", true);
							}
							if(self.disabled) {
								$(checkbox).attr("disabled", true);
							}
						});
						if(optionData.clickEvent) {
							$(container).find("input[type='radio']").on("click", function() {
								optionData.clickEvent(self);
							});
						}
					};
					if(data.data && data.data.length > 0) {
						draw(data.data, data);
					} else if(data.ajax) {
						base.ajax({
							url: data.ajax.url,
							params: data.ajax.params ? data.ajax.params : null,
							type: data.ajax.type ? data.ajax.type : "get",
							success: function(ajaxData) {
								if(ajaxData && ajaxData.length > 0) {
									draw(ajaxData, data);
								}
							}
						});
					}
					break;

				case "button":
					var btnOption = data;
					self.data.container = self.container;
					base.form.button(self.data);

					break;

				case "view":
					$(self.container).text(data.value);
					break;

			}

			if(self.element) {
				if(self.role) {
					$(self.element).attr("role", JSON.stringify(self.role).replace(/"/g, ""));
				}
				if(self.readonly) {
					$(self.element).attr("readonly", true);
				}
				if(self.disabled) {
					$(self.element).attr("disabled", true);
				}
				$(self.container).append(self.element);
			}

		};
		self.create();
	};
	/**文件上传**/
	base.form.fileUpload = function(option) {
		var self = {};
		self.url = option.url ? option.url : null;
		self.success = option.success ? option.success : null;
		self.error = option.error ? option.error : null;
		self.id = option.id ? option.id : null;
		self.params = option.params ? option.params : null;
		self.create = function() {
			if(!self.url || !self.id) {
				return;
			}
			require(["fileUpload"], function() {
				var formId = 'jUploadForm' + self.id;
				var oldForm = $('#' + formId);
				if(oldForm.length > 0) {
					oldForm.remove();
				};
				jQuery.ajaxFileUpload({
					url: self.url,
					secureuri: false,
					fileElementId: self.id,
					dataType: 'json',
					data: self.params,
					success: function(data, status) {
						if(self.success) {
							self.success(data, status);
						}
						self.clear();
					},
					error: function(data, status, e) {
						if(self.error) {
							self.error(data, status, e);
						}
						self.clear();
					}
				});
			});
		};
		self.clear = function() {
			var file = $(self.id)
			file.after(file.clone().val(""));
			file.remove();
		};
		self.create();
	};
	base.form.paramsToString = function(params) {
		var s = "?";
		var i = 0;
		for(var key in params) {
			if(i == 0) {
				s += key + "=" + params[key];
			} else {
				s += "&" + key + "=" + params[key];
			}
			i++;
		}
		return s;
	};
	base.form.download = function(option) {
		var self = {};
		self.url = option.url ? option.url : null;
		self.params = option.url ? option.params : null;
		self.download = function() {
			/*base.ajax({
				url:self.url,
				params:self.params,
				contentType:"application/force-download"
			});*/
			$.ajax({
				url: self.url + base.form.paramsToString(self.params),
				type: "post",
				data: self.params,
				dataType: "json",
				contentType: "application/json;charset=UTF-8",
				//contentType:"application/force-download",
				success: function(data) {
					//alert(4444);
				}
			});
			/*	var xhr = base.xmlHttpRequest();
				console.log(xhr)
				xhr.onreadystatechange = function(){
					if(xhr.readState==4){
					        if(xmlhttp.status==200){

					            var message=xmlhttp.responseText;


					         }
					 }
				};
				xhr.open("post", self.url+base.form.paramsToString(self.params), true);
				xhr.responseType ="blob";
				console.log(xhr)
				xhr.send(null);*/
			/*require(["download"],function(){
				var url = self.url+base.form.paramsToString(self.params);
				$.fileDownload(url);
			});*/
		};
		self.download();
		return self;
	};

	/**获取form表单的参数**/
	base.form.getParams = function(form, isGet) {
		var params = null;
		if(isGet) {
			params = "";
		} else {
			params = {};
		}
		var self = {};
		self.form = form ? form : null;

		if(self.form) {
			var eles = $(self.form)[0].elements;
			for(var i = 0, j = eles.length; i < j; i++) {
				var o = eles[i];

				//var name = $(o).attr("name") ? $(o).attr("name") : "element" + i;
				var name = $(o).attr("name");
				if(!name) {
					continue;
				}
				if(o.tagName.toLowerCase() == "input") {
					if($(o).attr("type").toLowerCase() == "checkbox" || $(o).attr("type").toLowerCase() == "radio") {
						if(params[name]) {
							continue;
						} else {
							var s = "";
							$(self.form).find("input[name='" + name + "']").each(function(i1, o1) {
								if($(o1).is(':checked')) {
									s += $(o1).val() + ",";
								}
							});
							if(s != "") {
								s = base.clearLastCharacter(s);
								if(isGet) {
									if(params == "") {
										params += name + "=" + s;
									} else {
										params += "&" + name + "=" + s;
									}

								} else {
									params[name] = s;
								}

							}
						}
					} else if($(o).attr("type").toLowerCase() == "button") {
						continue;
					} else {
						if($(o).val()) {
							if(isGet) {
								if(params == "") {
									params += name + "=" + encodeURIComponent($(o).val());
								} else {
									params += "&" + name + "=" + encodeURIComponent($(o).val());
								}

							} else {
								params[name] = $(o).val();
							}

						}

					}
				} else if(o.tagName.toLowerCase() == "select" && $(o).val() == "-1") {
					continue;
				} else if(o.tagName.toLowerCase() == "button") {
					continue;
				} else {
					if(isGet) {
						if(params == "") {
							params += name + "=" + encodeURIComponent($(o).val());
						} else {
							params += "&" + name + "=" + encodeURIComponent($(o).val());
						}

					} else {
						params[name] = $(o).val();
					}
				}
			}

		}
		return params;
	};

	/**form表单校验**/
	base.form.validate = function(option) {
		var self = {};
		self.form = option.form ? option.form : null;
		self.roles = option.roles ? option.roles : null;
		self.promptType = option.promptType ? option.promptType : "follow";
		self.checkAll = option.checkAll == true ? true : false;
		self.errorMsg = [];
		self.isPass = true;
		self.tipPosition = option.tipPosition ? option.tipPosition : "bottom";
		self.passCallback = option.passCallback ? option.passCallback : null;
		self.notPassCallback = option.notPassCallback ? option.notPassCallback : null;
		self.error = function(role, errorText, obj) {
			switch(self.promptType) {
				case "top":
					if($(obj).attr("type")) {
						if($(obj).attr("type").toLowerCase() == "checkbox" || $(obj).attr("type").toLowerCase() == "radio") {
							//$(obj).parent().addClass("errorStyle");
						} else {
							$(obj).addClass("errorStyle");
						}
					} else {
						$(obj).addClass("errorStyle");
					}

					break;

				case "tip":
					if($(obj).attr("type")) {
						if($(obj).attr("type").toLowerCase() == "checkbox" || $(obj).attr("type").toLowerCase() == "radio") {
							$(obj).parent().attr("data-toggle", "tooltip");
							$(obj).parent().attr("data-placement", self.tipPosition);
							$(obj).parent().attr("data-trigger", "manual");
							$(obj).parent().attr("title", errorText);
							//$(obj).parent().addClass("errorStyle");
						} else {
							$(obj).attr("data-toggle", "tooltip");
							$(obj).attr("data-placement", self.tipPosition);
							$(obj).attr("data-trigger", "manual");
							$(obj).attr("title", errorText);
							$(obj).addClass("errorStyle");
						}
					} else {
						$(obj).attr("data-toggle", "tooltip");
						$(obj).attr("data-placement", self.tipPosition);
						$(obj).attr("data-trigger", "manual");
						$(obj).attr("title", errorText);
						$(obj).addClass("errorStyle");
					}

					break;

				case "follow":
					$(obj).parent().find(".ui-form-error").remove();
					$(obj).parent().append("<div class='ui-form-error' style='color:red;text-align:left;'>" + errorText + "</div>");
					if($(obj).attr("type") != "checkbox" && $(obj).attr("type") != "radio") {
						$(obj).addClass("errorStyle");
					}
					break;

			}
			self.errorMsg.push(errorText + "<br>");
			return true;
		};
		self.verify = function(obj, role) {
			var errorText = "";
			var hasError = false;
			var iname = role.text ? role.text : $(obj).attr("name");
			if($(obj).is(":hidden")){return;}
			for(var key in role) {

				switch(key) {
					case "required": //是否必填

						if(role[key]) {

							switch($(obj)[0].tagName.toLowerCase()) {
								case "select":

									var val = $(obj).val();

									if(!val || val == "-1") {
										errorText = "必选项";
										hasError = self.error(role, errorText, obj);
									}
									break;

								case "textarea":
									var val = $(obj).val();
									if(!val) {
										errorText = "必填项";
										hasError = self.error(role, errorText, obj);
									}
									break;

								case "input":
									switch($(obj).attr("type")) {
										case "checkbox":
										case "radio":

											if(base.getChecks($(obj).attr("name")).length == 0) {
												errorText = "必选项";

												hasError = self.error(role, errorText, obj);
											}
											break;

										default:

											var val = $(obj).val();
											if(!val) {
												errorText = "必填项";

												hasError = self.error(role, errorText, obj);
											}
											break;
									}
									break;
							}
						}
						break;

					case "int": //是否是整数
					case "float": //是否是小数
					case "number": //是否是数字
					debugger
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						var ex = /^\d+$/;
						var ds = "整数";
						if(key == "float") {
							ex = /^\d+(\.\d+)?$/;
							ds = "小数";
						} else if(key == "number") {
							ds = "数字";
						}

						if(isNaN(Number(val))) {
							errorText = "必须是" + ds;
							hasError = self.error(role, errorText, obj);
						} else {

							if(!ex.test(val) && key != "number") {
								errorText = "必须是" + ds;
								hasError = self.error(role, errorText, obj);
							} else {
								switch((typeof(role[key])).toLowerCase()) {
									case "number":

										if(Number(val) > role[key]) {
											errorText = "数字不能大于" + role[key];
											hasError = self.error(role, errorText, obj);
										}
										break;

									default:
										if(jQuery.isArray(role[key]) && role[key].length >= 2) {
											if(val < role[key][0]) {
												errorText = "不能小于" + role[key][0];
												hasError = self.error(role, errorText, obj);
											} else if(val > role[key][1]) {
												errorText = "不能大于" + role[key][1];
												hasError = self.error(role, errorText, obj);
											}
										}
										break;
								}
							}
						}
						break;

					case "length": //字符串长度
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(base.getByteLen(val) > role[key]) {
							errorText = "不能超过" + role[key] + "个字符";
							hasError = self.error(role, errorText, obj);
						}
						break;

					case "identityCard": //身份证
						errorText = "身份证号不正确";
						var ex = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!ex.test(val)) {
							hasError = self.error(role, errorText, obj);
						}
						break;

					case "en": //英文
						errorText = "必须是英文";
						var ex = /^[a-z]*|[A-Z]*$/;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!ex.test(val)) {
							hasError = self.error(role, errorText, obj);
						}
						break;

					case "ip": //ip地址
						errorText = "IP地址不正确";
						var ex = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!ex.test(val)) {
							hasError = self.error(role, errorText, obj);
						}
						break;

					case "ips_port":
						errorText = "IP地址不正确";
						var ipEx = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
						var portEx = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						var myError = false;
						$(val.split(";")).each(function(i, o) {
							if(!o || o == "") {
								myError = true;
								return false;
							}
							var ip = null;
							var port = null;
							if(o.split(":")[0]) {
								ip = o.split(":")[0];
							}
							if(o.split(":")[1]) {
								port = o.split(":")[1];
							}
							if(ip && $.trim(ip) != "") {
								if(!ipEx.test(ip)) {
									myError = true;
									return false;
								}
							} else {
								myError = true;
								return false;
							}

							if(port && $.trim(port) != "") {
								if(!portEx.test(port)) {
									myError = true;
									return false;
								}
							} else {
								myError = true;
								return false;
							}

						});
						if(myError) {
							hasError = self.error(role, errorText, obj);
						}
						break;

					case "port": //端口
						errorText = "端口不正确";
						var ex = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!ex.test(val)) {
							hasError = self.error(role, errorText, obj);
						}
						break;

					case "money": //货币
						var ex = /^\d+.?\d{0,2}$/;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(isNaN(val)) {
							errorText = "格式不正确";
							hasError = self.error(role, errorText, obj);
						} else {
							val = Number(val);
							if(!ex.test(val)) {
								errorText = "格式不正确";
								hasError = self.error(role, errorText, obj);
							}
						}
					break;

					case "mobile_telephone"://手机+普通电话
						errorText = "电话号码不正确";
						var ex = /^[1][3,4,5,7,8][0-9]{9}$/;
						var ex2= /^0\d{2,3}-?\d{7,8}$/;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!ex.test(val)&&!ex2.test(val)) {
							hasError = self.error(role, errorText, obj);
						}

					break;

					case "mobile": //手机号
						errorText = "手机号码不正确";
						var ex = /^[1][3,4,5,7,8][0-9]{9}$/;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!ex.test(val)) {
							hasError = self.error(role, errorText, obj);
						}
						break;

					case "telephone": //普通电话
						errorText = "电话号码不正确";
						//var ex = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
						var ex = /^0\d{2,3}-?\d{7,8}$/;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!ex.test(val)) {
							hasError = self.error(role, errorText, obj);
						}
						break;

					case "email": //邮箱
						errorText = "邮箱地址不正确";
						var ex = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!ex.test(val)) {
							hasError = self.error(role, errorText, obj);
						}
						break;

					case "filter": //只允许字母、数字、下划线
						var ex = /^\w+$/;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!ex.test(val)) {

							errorText = "只允许字母、数字、下划线";

							hasError = self.error(role, errorText, obj);
						}
						break;

					case "filterCN":
						var ex = /^[\u4E00-\u9FA5a-zA-Z0-9_]+$/;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!ex.test(val)) {

							errorText = "不能包含特殊字符";

							hasError = self.error(role, errorText, obj);
						}
						break;
						/**以什么开头**/
					case "first":
						var fs = role[key];
						var l = fs.length;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(val.slice(0, l) != fs) {
							errorText = "必须以" + fs + "开头";
							hasError = self.error(role, errorText, obj);
						}

						break;

						/**网址**/
					case "website":
						var strRegex = "^[^\s]+";
						var ex = new RegExp(strRegex);
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!ex.test(val)) {
							errorText = "网络地址不正确";
							hasError = self.error(role, errorText, obj);
						}

						break;

						/**en_number英文和数字**/
					case "en_number":
						errorText = "必须是英文或数字";
						var ex = /^[0-9a-zA-Z]+$/;
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!ex.test(val)) {
							hasError = self.error(role, errorText, obj);
						}
						break;

						/**文件大小**/
					case "fileSize":
						errorText = "文件大小不能超过" + role[key] + "kb";
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!base.form.validateFileSize($(obj), Number(role[key]))) {
							hasError = self.error(role, errorText, obj);
						}
						break;

						/**文件名**/
					case "fileName":
						errorText = "必须是" + role[key] + "的文件";
						var val = $(obj).val();
						if(!val || val == "") {
							return;
						}
						if(!base.form.validateFileExtname($(obj), role[key])) {
							hasError = self.error(role, errorText, obj);
						}
						break;
						/**password密码，至少1个字母或1个数字的6-18位**/
					case "password":
						errorText = "密码格式不正确，至少1个字母和数字且6-18个字符";
						var val = $(obj).val();
						var ex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/;
						if(!val || val == "") {
							return;
						}
						if(!ex.test(val)) {
							hasError = self.error(role, errorText, obj);
						}
						break;
				}
			}
			return hasError;
		};
		self.init = function() {
			self.errorMsg = [];
			self.isPass = true;
			$(self.form).find(".alert").remove();
			$(self.form).find("[data-toggle='tooltip']").tooltip('destroy');
			$(self.form).find("[data-toggle='tooltip']").removeAttr("title");
			$(self.form).find("[data-toggle='tooltip']").removeAttr("data-toggle");
			$(".errorStyle").removeClass("errorStyle");
			$(".ui-form-error").remove();
			if($("#errorStyle").length == 0) {
				$("head").append("<style id='errorStyle'>.errorStyle{border:1px solid red;}</style>");
			}
		};
		self.scan = function() {
			self.init();
			if(self.form) {
				if(self.roles) {
					var i = 0;
					for(var name in self.roles) {
						var role = self.roles[name];
						var obj = $(self.form).find("[name='" + name + "']");

						if(role && obj.length > 0) {
							if(self.checkAll) {
								self.verify(obj, role);
							} else {
								if(self.verify(obj, role)) {
									break;
								}
							}
						}
						i++;
					}
				} else {
					var tmp = {};
					if($(self.form).length == 0) {
						return;
					}
					var eles = $(self.form)[0].elements;
					for(var i = 0, j = eles.length; i < j; i++) {
						var o = $(eles[i]);
						var role = o.attr("role");
						if(role) {
							var roleData = eval("(" + role + ")");
							var name = o.attr("name");

							if(self.checkAll) {

								if(tmp[name]) {
									continue;
								} else {
									self.verify(o, roleData);
									tmp[name] = true;
								}
							} else {

								if(tmp[name]) {
									continue;
								} else {
									if(self.verify(o, roleData)) {
										break;
									};
								}
							}
						}
					}
				}
				if(self.errorMsg.length > 0) {
					switch(self.promptType) {
						case "tip":
							if(self.checkAll) {
								$(self.form).find("[data-toggle='tooltip']").tooltip("show");
							} else {
								$(self.form).find("[data-toggle='tooltip']:eq(0)").tooltip("show");
							}

							break;

						case "top":
							var alertDialog = document.createElement("div");
							$(alertDialog).addClass("alert alert-danger");
							$(self.form).prepend(alertDialog);
							if(self.checkAll) {
								$(self.errorMsg).each(function(i, o) {
									$(alertDialog).append(i + 1 + "." + o);
								});
							} else {
								$(alertDialog).append(self.errorMsg[0]);
							}
							break;
					}
					self.isPass = false;
				}
			} else {
				self.isPass = false;
			}
			if(self.isPass) {
				if(self.passCallback) {
					self.passCallback(self);
				}
			} else {
				if(self.notPassCallback) {
					self.notPassCallback(self);
				}
			}
			return self.isPass;
		};

		self.scan();
		return self.isPass;
	};
	/**form表单重置**/
	base.form.reset = function(form, callback) {
		/*if(form) {
			$(form)[0].reset();

			if(callback) {
				callback(form);
			}
		}*/
		var eles = $(form)[0].elements;
		for(var i = 0, j = eles.length; i < j; i++) {
			if($(eles[i]).prop("disabled") == true) {
				continue;
			} else {
				if(eles[i] && eles[i].tagName) {
					var tagName = eles[i].tagName.toLowerCase();
					switch(tagName) {
						case "select":
							$(eles[i]).find("option:first").prop("selected", 'selected');
							break;

						case "hidden":
							break;

						case "checkbox":
						case "radio":
							$(eles[i]).prop("checked", false);
							break;

						default:
							$(eles[i]).val("");
							break;
					}
				}

			}
		}
		if(callback) {
			callback();
		}
	};
	/**form表单组件-Button**/
	base.form.button = function(option) {
		var self = {};
		self.label = option.label ? option.label : "确定";
		self.disabled = option.disabled ? option.disabled : false;
		self.container = option.container ? option.container : $("body");
		self.element = null;
		self.clickEvent = option.clickEvent ? option.clickEvent : null;
		self.id = option.id ? option.id : null;
		self.cls = option.cls ? option.cls : null;
		self.style = option.style ? option.style : null;
		self.icon = option.icon ? option.icon : null;
		self.iconStyle = option.iconStyle ? option.iconStyle : "";
		self.imgIcon = option.imgIcon ? option.imgIcon : null;
		self.attr = option.attr ? option.attr : null;
		self.iconPosition = option.iconPosition ? option.iconPosition : "first";
		self.create = function() {
			self.element = document.createElement("button");

			if(self.cls) {
				$(self.element).addClass(option.cls.replace(/,/g, " "));
			} else {
				$(self.element).addClass("btn btn-primary");
			}
			if(self.style) {
				$(self.element).attr("style", option.style.replace(/,/g, ";"));
			}
			if(self.attr) {
				$(self.attr).each(function(i, o) {
					$(self.element).attr(o.name, o.value);
				});
			}
			if(self.id) {
				$(self.element).attr("id", self.id);
			}
			if(self.disabled) {
				$(self.element).addClass("disabled");
			} else {
				if(self.clickEvent) {
					$(self.element).on("click", function() {
						self.clickEvent(self,this);
					});
				}
			}
			if(self.label) {
				$(self.element).append("<span>" + self.label + "</span>");
			}
			if(self.icon) {

				if(self.iconStyle) {
					switch(self.iconPosition) {
						case "last":
							$(self.element).append("<i class='" + self.icon + "' style='" + self.iconStyle + "'></i>");
							break;
						default:
							$(self.element).prepend("<i class='" + self.icon + "' style='" + self.iconStyle + "'></i>");
							break;
					}

				} else {
					switch(self.iconPosition) {
						case "last":
							$(self.element).append("<i class='" + self.icon + "'></i>");
							break;
						default:
							$(self.element).prepend("<i class='" + self.icon + "'></i>");
							break;
					}
				}

			}

			if(self.imgIcon) {
				$(self.element).html("<img src='" + self.imgIcon + "' style='border:0'/>");
			}
			$(self.element).attr("onclick", "return false;");
			$(self.container).append(self.element);
		};
		self.create();
		return self;
	};
	/**日历选择器**/
	base.form.date = function(option) {
		var self = {};
		self.dateOption = option.dateOption ? option.dateOption : {};

		self.element = option.element ? option.element : null;

		if(option.type) {
			self.dateOption.type = option.type ? option.type : null;
		}
		if(option.dateOption && option.dateOption.type) {
			self.dateOption.type = option.dateOption.type ? option.dateOption.type : null;
		}
		if(option.range) {
			self.dateOption.range = "~";
		}
		if(option.dateOption && option.dateOption.range) {
			self.dateOption.range = "~";
		}
		self.theme = "#01a9c2";
		if(option.theme) {
			switch(option.theme) {
				case "weilan":
					self.theme = "#029dd0";
					break;

				case "molv":
					self.theme = "#03bf4e";
					break;

				case "red":
					self.theme = "#f60505";
					break;

				case "orange":
					self.theme = "#fda917";
					break;

				default:
					self.theme = option.theme;
					break;
			}
		}
		self.dateOption.theme = self.theme;
		if(option.isTime) {
			self.dateOption.type = "datetime";
		}
		self.create = function() {
			if($(self.element).length > 0) {
				var tgn = self.element.tagName;

				require(["date5.0"], function(laydate) {
					if($(self.element).length > 1) {
						$(self.element).each(function() {
							self.readonly(this);
							self.dateOption.elem = this;
							laydate.render(self.dateOption);
						});
					} else {
						self.readonly($(self.element)[0]);
						self.dateOption.elem = $(self.element)[0];
						laydate.render(self.dateOption);
					}
				});

			}
		};
		self.readonly = function(el) {
			var tgn = $(el)[0].tagName;
			if(tgn) {
				switch(tgn.toLowerCase()) {
					case "input":
					case "select":
					case "textarea":
						$(el).attr("readonly", true);
						break;
				}
			}
		};
		self.create();
	};

	/**日历控件(已过期)**/
	/*base.form.date = function(option) {
		var self = {};
		self.dateOption= option.dateOption?option.dateOption:{};
		self.element = option.element?option.element:null;
		self.isTime = option.isTime?option.isTime:false;
		self.theme = option.theme?option.theme:"molv";
		self.static = option.static==1?option.static:false;
		self.create = function() {
			if(self.static){
				require(["date"], function(){
					laydate(self.dateOption);
				});
			}else{
				if($(self.element).length>0){
					$(self.element).attr("readonly",true);
					require(["date"], function(){
						laydate.skin(self.theme);
						$(self.element).on("click",function(){
							if(self.isTime){
								self.dateOption.istime = true;
								self.dateOption.format = "YYYY-MM-DD hh:mm:ss";
							}
							laydate(self.dateOption);
						});
					});
				}
			}
		};
		self.create();
		return self;
	};*/
	/**时间范围控件**/
	base.form.dateRange = function(option) {
		var self = {};
		self.dateOption = option.dateOption ? option.dateOption : {
			format: 'YYYY-MM-DD'
		};
		self.dataOption.language = "cn";
		self.element = option.element ? option.element : null;
		self.create = function() {
			if(!self.element) {
				return;
			}
			if($("head").find("#dateRangeCSS").length == 0) {
				$("head").append("<link id='dateRangeCSS' href='" + $.base + "/css/daterangepicker.min.css' rel='stylesheet' type='text/css'>")
			}
			require(["dateRange"], function() {
				$(self.element).dateRangePicker(self.dateOption);
			});
		};
		self.create();
	};
	/**联想模糊选择框**/
	base.form.autoSelect = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.data = option.data ? option.data : null;
		self.url = option.url ? option.url : null;
		self.params = option.params ? option.params : {};
		self.size = option.size ? option.size : 10;
		self.highLight = option.highLight ? option.highLight : true;
		self.autoSelectObj = null;
		self.type = option.type ? option.type : "get";
		self.ajaxSettings = option.ajaxSettings ? option.ajaxSettings : {};
		self.dropContainer = option.dropContainer ? option.dropContainer : null;
		self.clickCallback = option.clickCallback ? option.clickCallback : null;
		self.width = option.width ? option.width : "auto";
		self.create = function() {
			if(self.container) {

				require(["autoSelect"], function() {
					if(self.data) { //静态数据
						self.autoSelectObj = $(self.container).autoSelect({
							lookup: self.data,
							dropContainer: self.dropContainer,
							clickCallback: self.clickCallback,
							width: self.width,
							onSelect: function(suggestion) {
								//alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
							}
						});
					} else if(self.url) { //动态远程数据

						self.autoSelectObj = $(self.container).autoSelect({
							serviceUrl: self.url,
							params: self.params,
							type: self.type,
							dropContainer: self.dropContainer,
							ajaxSettings: self.ajaxSettings,
							clickCallback: self.clickCallback,
							width: self.width,
							lookupFilter: function(suggestion, query, queryLowerCase) {},
							onSelect: function(suggestion) {
								//alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
							}
						});
					}
				});

			}
			return self;
		};
		self.disable = function() {
			self.autocompleteObj.disable();
		};
		self.create();
		return self;
	};

	/**树形select组件**/
	base.form.treeSelect = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.parentContainer = option.parentContainer ? option.parentContainer : $("body");
		self.data = option.data ? option.data : null;
		self.url = option.url ? option.url : null;
		self.params = option.params ? option.params : {};
		self.multi = option.multi ? option.multi : false;
		self.treeContainer = null;
		self.type = option.type ? option.type : "get";
		self.clickEvent = option.clickEvent ? option.clickEvent : function() {};
		self.clickCallback = option.clickCallback ? option.clickCallback : null;

		if(!self.multi) {
			self.clickEvent = function(event, treeId, treeNode) {
				$(self.container).val(treeNode.name);
				$(self.container).attr("tid", treeNode.id);
				self.hide();
				if(self.clickCallback) {
					self.clickCallback(event, treeId, treeNode)
				}
			};
		}

		self.id = option.id ? option.id : base.getRandom(1000, 9999);
		self.setting = {
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onClick: self.clickEvent
			}
		};
		self.create = function() {
			if($(self.container).length > 0) {
				$(self.container).attr("readonly", true);
				$(self.container).on("click", function(e) {
					if($(this).hasClass("active")) {
						return;
					}
					self.createTree();
					$(this).addClass("active");
				});
				$(document).on("click", function(e) {
					var ele = e.target;
					if($(ele).is($(self.container))) {
						return;
					}
					if($(ele).parents("[type='treeSelect']").length > 0) {
						return;
					}
					if($(ele).hasClass("[type='treeSelect']").length > 0) {
						return;
					}
					self.hide(e);
				});
			}

		};
		self.createTree = function() {
			self.treeContainer = document.createElement("div");
			$(self.treeContainer).attr("type", "treeSelect");
			$(self.treeContainer).attr("id", self.id);
			$(self.treeContainer).css("position", "absolute");
			$(self.treeContainer).css("z-index", "10000");
			$(self.treeContainer).css("min-width", $(self.container).outerWidth());
			if(self.cls || self.style) {
				base.setProperty(self.element, option);
			} else {
				$(self.treeContainer).css("border", "1px solid #109bdc");
				$(self.treeContainer).css("background-color", "#fff");
				$(self.treeContainer).css("height", 180);
				$(self.treeContainer).css("overflow", "auto");
				$(self.treeContainer).css("box-shadow", "0 0 5px #aaa");
			}

			$(self.treeContainer).addClass("ztree");
			//alert("left:"+$(self.container).offset().left+",top:"+$(self.container).offset().top)
			$(self.treeContainer).css("left", $(self.container).offset().left);
			$(self.treeContainer).css("top", $(self.container).offset().top + $(self.container).height());
			$("body").append(self.treeContainer);
			if(self.data) {
				base.tree({
					container: $(self.treeContainer),
					data: self.data,
					setting: self.setting
				});
			} else {
				if(self.url) {
					base.ajax({
						url: self.url,
						type: self.type,
						params: self.params,
						success: function(data) {
							base.tree({
								container: $(self.treeContainer),
								data: data,
								setting: self.setting
							});
						}
					})
				}
			}

		};
		self.hide = function(event) {

			$(self.container).removeClass("active");
			$(self.treeContainer).remove();
		};
		self.create();
		return self;
	};

	/**关联select控件**/
	base.form.linkSelect = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.changeEvent = option.changeEvent ? option.changeEvent : null;
		self.ajax = option.ajax ? option.ajax : null;
		self.data = option.data ? option.data : null;
		self.rootId = option.rootId ? option.rootId : null;
		self.create = function() {
			self.run(self.rootId);
		};
		self.run = function(pid, obj) {
			if(self.data) {
				var nodeData = self.findNode(pid);
				if(nodeData) {
					self.createNodeSelect(nodeData, obj);
				}
			} else if(self.ajax) {
				base.ajax({
					url: self.ajax.url ? self.ajax.url : null,
					params: self.ajax.params ? self.ajax.params : null,
					type: self.ajax.type ? self.ajax.type : "get",
					success: function(data) {
						self.createNodeSelect(data);
					}
				});
			}
		};
		self.createNodeSelect = function(data, obj) {
			var opt = data;
			opt.container = self.container;
			opt.type = "select";
			opt.changeEvent = function(entity) {
				$(entity.element).nextAll().remove();
				self.run(data.id, entity.element);
				if(self.changeEvent) {
					self.changeEvent(opt, entity);
				}
			};
			base.form.element(opt);
		};
		self.findNode = function(id) {
			var find = function(data) {
				var d = data.items;
				for(var i = 0, j = d.length; i < j; i++) {
					if(d[i].id == id) {
						if(d[i].items && d[i].items.length > 0) {
							return d[i];
						} else {
							return null;
						}
					} else if(d[i].items) {
						find(d[i]);
					}
				}
			};
			find(self.data);
		};
		self.create();
	};
	/**糕点选择组件**/
	base.form.cakeSelect = function(option) {
		var self = {};
		self.hasFirstSelect = option.hasFirstSelect == false ? false : true;
		self.isMulti = option.isMulti == true ? true : false;
		self.itemColor = option.itemColor ? option.itemColor : "#aaa";
		self.activeItemColor = option.activeItemColor ? option.activeItemColor : "#333";
		self.data = option.data ? option.data : null;
		self.clickEvent = option.clickEvent ? option.clickEvent : null;
		self.callback = option.callback ? option.callback : null;
		self.container = null;
		self.input = option.input ? option.input : null;
		self.value = $(self.input).val() ? $(self.input).val() : null;

		self.create = function() {
			if(self.input) {
				if(self.data && self.data.length > 0) {
					self.setValue($(self.input).val());
					self.createBox();
					$(self.input).on("change", function() {
						self.change($(this).val());
					});
				}
			}
		};
		self.createBox = function() {
			self.container = document.createElement("ul");
			$(self.container).addClass("ui-form-cakeSelect");
			$(self.input).parent().append(self.container);
			self.draw();
		};
		self.createItem = function(itemData, isActive) {
			var item = document.createElement("li");
			$(self.container).append(item);
			$(item).html(itemData.name);
			$(item).attr("val", itemData.value);
			$(item).on("click", function() {

				if(!self.isMulti) {
					$(self.container).children("li").removeAttr("class");
					$(self.input).val($(this).attr("val"));
				}
				if($(this).hasClass("active")) {
					$(this).removeAttr("class");
				} else {
					$(this).addClass("active");
				}
				if(self.isMulti) {
					var v = "";
					var acts = $(self.container).children(".active");
					$(acts).each(function(i, o) {
						if(i == (acts.length - 1)) {
							v += $(o).attr("val");
						} else {
							v += $(o).attr("val") + ",";
						}
					});
					$(self.input).val(v);
				}
			});
			if(isActive) {
				$(item).addClass("active");
			}

		};
		self.change = function(value) {
			if(value) {
				self.setValue(value);
			}
			var items = $(self.container).children("li");
			$(items).removeClass("active");
			$(items).each(function(i, o) {
				var vals = self.value.split(",");
				$(vals).each(function(i1, o1) {
					if(o1 == $(o).val()) {
						$(o).addClass("active");
						return false;
					}
				});
			});
		};
		self.draw = function(value) {
			$(self.container).html("");
			if(value) {
				self.setValue(value);
			}
			$(self.data).each(function(i, o) {
				var hasV = false;
				var vals = self.value.split(",");
				$(vals).each(function(i1, o1) {
					if(o1 == o.value) {
						hasV = true;
						return false;
					}
				});
				self.createItem(o, hasV);
			});

		};
		self.changeValue = function() {

		};
		self.setValue = function(value) {
			if(!self.isMulti) {
				if(self.hasFirstSelect && !value) {
					self.value = self.data[0].value;
				} else {
					self.value = value;
				}
			} else {
				self.value = value;
			}
			self.value = self.value.toString();
		};
		self.create();
		return self;
	};
	/**地市选择器(仅限中国)，需引入pick-pcc.css或设置clsUrl**/
	base.form.areaSelect = function(option){
		var self = {};
		self.container = option.container?option.container:null;
		self.option = option.option?option.option:null;
		self.callback = option.callback?option.callback:null;
		self.cls = option.cls?option.cls:null;
		if(option.name){
			self.option.name = option.name;
		}
		if(option.id){
			self.option.id = option.id;
		}
		self.create = function(){
			if(self.container){
				if(self.cls){
					$("head").append("<link rel='stylesheet' href='"+self.cls+"'>");
				}
				require(["areaSelect"],function(){
					$(self.container).pickArea(self.option);
					if(self.callback){
						self.callback(self);
					}
				});
			}
		};
		self.create();
		return self;
	};
	/**富文本编辑器**/
	base.form.editor = function(option){
		var self = {};
		self.name = option.name ? option.name :null;
		self.editorOption = option.editorOption?option.editorOption:null;
		self.editorEntity = null;
		self.create = function(){
			require(["editor"],function(){

				KindEditor.ready(function(e) {
					self.editorEntity = e.create("textarea[name='"+self.name+"']", {allowFileManager : true});
				});
			});
		};
		self.create();
	};

	/**echarts封装**/
	base.echarts = function(option) {
		var self = {};
		self.container = option.container ? option.container : $("body");
		self.chartOption = option.chartOption ? option.chartOption : null;
		self.chart = null;
		self.echarts = option.echarts ? option.echarts : null;
		self.drawCallback = option.drawCallback ? option.drawCallback : null;
		self.create = function() {
			if(!self.echarts) {
				return;
			}
			if(self.chartOption) {
				if(self.beforeEvent) {
					self.beforeEvent(self)();
				}
				self.chart = self.echarts.init($(self.container)[0]);
				if(self.chartOption.length > 0) {

					$(self.chartOption).each(function(i, o) {
						self.chart.setOption(o);
					});
				} else {
					self.chart.setOption(self.chartOption);
				}
				if(self.drawCallback) {
					self.drawCallback(self);
				}
				$(window).on("resize", function() {
					self.chart.resize();
				});

			}
			return self;
		};
		self.refresh = function(chartOption) {
			self.chartOption = chartOption;
			self.chart.setOption(self.chartOption);
		};
		self.create();
		return self;
	};
	/**3d球组件**/
	base.earthRollMap = function(option) {
		var self = {};
		self.rippleImg = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiANCiJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPg0KPHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiPiAgICANCiAgICA8Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSI1IiAgc3Ryb2tlPSJyZ2IoNCwxOTgsMjU0KSIgbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjMiIGZpbGwtb3BhY2l0eT0iMSIgZmlsbD0icmdiYSgwLDAsMCwwKSIgc3Ryb2tlLW9wYWNpdHk9IjAuMiI+DQogICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZVR5cGU9InhtbCIgIGF0dHJpYnV0ZU5hbWU9InIiIGZyb209IjAiIHRvPSIyMCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4NCiAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89IjAiIGJlZ2luPSIwcyIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+DQogICAgPC9jaXJjbGU+DQo8L3N2Zz4=";
		self.container = option.container ? option.container : $("body");
		self.data = option.data ? option.data : null;
		self.mapOption = {
			backgroundColor: '#999',

			globe: {
				baseTexture: "/service/images/earth-specbetter.jpg",
				//heightTexture: "/service/images/earth-specbetter-height.jpg",
				displacementScale: 0,
				environment: "#000f1a",
				shading: 'color',
				//environment: 'rgba(0,0,0,0)',
				realisticMaterial: {
					roughness: 0.9
				},
				postEffect: {
					enable: false,
					bloom: {
						enable: true,
						bloomIntensity: 0.1
					}
				},
				depthOfField: {
					enable: true
				},
				FXAA: {
					enable: true
				},
				viewControl: {
					autoRotate: true,
					distance: 170,
					center: [0, 0, 0],
					beta: 130,
					alpha: 30,
					autoRotateAfterStill: 0.5
				}
			},
			series: self.data
		};

		self.create = function() {
			require(["echartsGl"], function() {
				var mapEntity = base.echarts({
					container: self.container,
					option: self.mapOption
				});
			});
		};
		self.create();
	};
	/**3d地图组件**/
	base.geoRollMap = function(option) {
		var self = {};

		self.container = option.container ? option.container : $("body");
		self.data = option.data ? option.data : null;
		self.mapEntity = null;
		self.pointsMapEntity = null;
		self.mapName = option.mapName ? option.mapName : "world";
		self.mapOption = {
			geo3D: {
				map: self.mapName,
				shading: 'color',
				//environment: '/asset/get/s/data-1491837999815-H1_44Qtal.jpg',
				regionHeight: 6,
				silent: true,
				groundPlane: {
					show: false
				},
				light: {
					main: {
						intensity: 0
					},
					ambient: {
						intensity: 0
					}
				},
				viewControl: {
					distance: 50,
					center: [116.405285, 39.904989]
				},

				itemStyle: {
					areaColor: '#111'
				},

				boxHeight: 0.5
			},
			series: self.data
		};
		self.create = function() {
			require(["echarts"], function(echarts) {
				base.ajax({
					type: "get",
					url: "/service/map/" + self.mapName + ".json",
					success: function(data) {
						echarts.registerMap(self.mapName, data);
						require(["echartsGl"], function() {
							self.mapEntity = base.echarts({
								container: self.container,
								option: [{
									series: [{
										type: 'map',
										map: self.mapName
									}]
								}, self.mapOption]
							});
						});
					}
				});
			});
		};
		self.create();
	};

	/**校验是否是boolean**/
	base.isBoolean = function(v) {
		if(typeof(v).toLowerCase() == "boolean") {
			return true;
		} else {
			return false;
		}
	};
	/**加载页面**/
	base.loadPage = function(option) {
		var self = {};
		self.url = option.url ? option.url : null;
		self.container = option.container ? option.container : null;
		self.params = option.params ? option.params : null;
		self.callback = option.callback ? option.callback : null;
		self.scrolls = option.scrolls ? option.scrolls : null;
		self.load = function() {
			if(self.container && self.url) {
				base.ajax({
					type: "get",
					url: self.url,
					dataType: "text",
					params: self.params,
					success: function(data) {
						$(self.container).html(data);
						if(self.callback) {
							self.callback(self);
						}
						if(self.scrolls) {
							$(self.scrolls.split(",")).each(function(i, o) {
								if($(o).length > 0) {
									base.scroll({
										container: $(o)
									});
								}
							});
						}
					},
					beforeSend: function() {
						base.loading($(self.container));
					},
					error: function() {
						$(self.container).html("加载错误");
					}
				});
			}
		};
		self.load();
	};
	/**reqirejs加载**/
	base.require = function(res, callback) {
		require([res], function() {
			if(callback) {
				callback();
			}
		});
	};
	/**datatables表格**/
	base.datatables = function(option) {
		var self = {};
		self.option = option.option ? option.option : null;
		self.container = option.container ? option.container : null;
		self.grid = null;
		self.inputRedirect = option.inputRedirect==false?false:true;
		self.filter = option.filter ? option.filter : null;
		self.callback = option.callback ? option.callback : null;
		self.nodataIcon = option.nodataIcon?option.nodataIcon:null;
		self.nodataString = "<span style='color:#ccc'>暂无相关数据</span>";
		if(self.nodataIcon){
			self.nodataString = self.nodataIcon + "<br/><br/>" + self.nodataString;
		}
		self.language = {
			"sProcessing": "<i class='fa fa-spinner fa-pulse fa-3x fa-fw' style='margin-right:4px;font-size:20px;'></i>加载中...",
			"sLengthMenu": "显示 _MENU_ 条记录",
			"sZeroRecords": self.nodataString,
			"sInfo": "第 _START_ 至 _END_ 条记录，共 _TOTAL_ 条",
			"sInfoEmpty": "显示第 0 至 0 条记录，共 0 条",
			"sInfoFiltered": "(由 _MAX_ 条记录过滤)",
			"sInfoPostFix": "",
			"sSearch": "搜索:",
			"sUrl": "",
			"sEmptyTable": self.nodataString,
			"sLoadingRecords": "载入中...",
			"sInfoThousands": ",",
			"oPaginate": {
				"sFirst": "<i style='font-size:15px;' class='fa fa-angle-double-left'></i>",
				"sPrevious": "<i style='font-size:15px;' class='fa fa-angle-left'></i>",
				"sNext": "<i style='font-size:15px;' class='fa fa-angle-right'></i>",
				"sLast": "<i style='font-size:15px;' class='fa fa-angle-double-right'></i>"
			},
			"oAria": {
				"sSortAscending": ": 以升序排列此列",
				"sSortDescending": ": 以降序排列此列"
			}
		};
		self.create = function() {
			if(self.container && self.option) {
				self.option.language = self.language;
				$.fn.dataTable.ext.errMode = 'none';
				if(self.filter) {
					self.option.ajax.dataFilter = self.filter;
				}

				self.grid = $(self.container).DataTable(self.option);
			}

		};
		self.setInputRedirect = function(){
			var pageContainer = $(self.container).parent();
			$(pageContainer).find(".inputRedirect").remove();

			var inputRedirectContainer = document.createElement("span");
			$(inputRedirectContainer).addClass("inputRedirect")
			$(pageContainer).append(inputRedirectContainer);
			var input = document.createElement("input");
			$(input).css("width",30);
			$(inputRedirectContainer).append(input);
			base.form.button({
				container:inputRedirectContainer,
				cls:"btn btn-info",
				label:"跳转",
				clickEvent:function(e){
					var number = Number($.trim($(input).val()));
					if(number){
						var re = /^[0-9]+$/ ;
     					if(re.test(number)){
     						self.grid.page(number).draw( false );
     					}
					}

					e.element.stopPropagation();
					return false;
				}
			});
		};
		self.reload = function() {
			$(self.container).find("thead input[type='checkbox']").prop("checked", false);
			self.grid.ajax.reload();
		};
		self.addRow = function(data) {
			self.grid.row.add(data).draw(false);
		};
		self.deleteRow = function(obj) {

			$(self.container).find("tbody tr").removeClass('selected');
			$(obj).parents("tr").addClass('selected');
			self.grid.row(".selected").remove().draw(false);
		};
		self.destroy = function() {
			self.grid.destroy();
		};
		self.create();
		return self;
	};
	/**请求处理的提示框**/
	base.requestTip = function(option) {
		var self = {};
		self.container = null;
		if(!option) {
			option = {};
		}
		self.width = option.width ? option.width : "auto";
		self.height = option.height ? option.height : 40;
		self.color = option.color ? option.color : "#555";
		self.bg = option.bg ? option.bg : "#f2f2f2";
		self.position = option.position ? option.position : "top";
		self.timeout = option.timeout <= 0 ? option.timeout : 15000;
		self.waitWord = option.waitWord ? option.waitWord : "正在提交...";
		self.successWord = option.successWord ? option.successWord : "提交成功";
		self.errorWord = option.errorWord ? option.errorWord : "提交错误";
		self.create = function() {
			self.container = document.createElement("div");
			$(self.container).css("position", "absolute");
			$(self.container).css("z-index", "2000");
			$(self.container).css("padding", "0 10px");
			switch(self.position) {
				case "top":
					$(self.container).css("top", 5);
					break;

				case "center":

					$(self.container).css("top", "50%");
					$(self.container).css("bottom", "50%");
					break;
			}

			self.center();
			//$(self.container).css("right","50%");
			$(self.container).css("text-align", "center");
			$(self.container).css("border", "1px solid #aaa");
			$(self.container).css("background", self.bg);
			$(self.container).css("overflow", "auto");
			$(self.container).css("width", self.width);
			$(self.container).css("height", self.height);
			$(self.container).css("margin", "auto");
			$(self.container).css("display", "none");
			$(self.container).css("line-height", self.height - 2 + "px");
			//$(self.container).css("box-shadow","0 0 10px #bbb");
			$(self.container).css("border-radius", 5);
			$("body").append(self.container);
		};
		self.center = function() {
			var l = ($(document).width() - $(self.container).width()) / 2;
			$(self.container).css("left", l);
		};
		self.wait = function(word) {
			self.waitWord = word ? word : self.waitWord;
			if(!self.container) {
				self.create();
			}
			$(self.container).show();
			$(self.container).html("<i class='fa fa-spinner fa-pulse fa-3x fa-fw' style='color:#aaa;margin-right:4px;font-size:14px;'></i>" + self.waitWord);
			if(self.timeout > 0) {
				window.setTimeout(function() {
					$(self.container).fadeOut(function() {
						$(self.container).remove();
					});

				}, self.timeout)
			}
		};
		self.success = function(word) {
			self.successWord = word ? word : self.successWord;
			if(!self.container) {
				self.create();
			}
			//$(self.container).show();
			$(self.container).html("<i class='fa fa-check-circle' style='color:#01b617;margin-right:4px;font-size:18px;'></i>" + self.successWord);
			self.center();
			$(self.container).show();
			window.setTimeout(function() {
				$(self.container).fadeOut(function() {
					$(self.container).remove();
				});

			}, 3000)
		};
		self.error = function(word) {
			self.errorWord = word ? word : self.errorWord;
			if(!self.container) {
				self.create();
			}
			$(self.container).html("<i class='fa fa-times-circle' style='color:red;margin-right:4px;font-size:18px;'></i>" + self.errorWord);
			self.center();
			$(self.container).show();
			window.setTimeout(function() {
				$(self.container).fadeOut(function() {
					$(self.container).remove();
				});
			}, 3000)
		};
		self.remove = function() {
			$(self.container).fadeOut(function() {
				$(self.container).remove();
			});
		};
		return self;
	};
	/**数组转map**/
	base.arrayToMap = function(data, pid, firstActive) {
		var self = {};
		self.data = data ? data : null;
		self.pid = pid ? pid : null;
		self.map = {};
		if(self.data && self.data.length > 0) {
			if(self.pid) {
				var n = 0;
				self.transform = function(pid) {
					var k = 0;
					$(self.data).each(function(i, o) {
						if(o.pid == pid) {
							self.map[o.id] = o;
							if(pid == self.pid) {
								n++; //n 每增加一次表示得到一个一级的元素
							}
							k++;
							if(firstActive) {
								if(k == 1 && n == 1) {
									self.map[o.id].active = true;
								}
							}

							self.transform(o.id);
						}

					});

				}
				self.transform(self.pid);
			}
		}
		return self.map;
	};
	/**map转数组**/
	base.mapToArray = function(data, pid) {
		var self = {};
		self.data = data ? data : null;
		self.array = [];
		self.pid = pid ? pid : null;
		if(self.data && self.pid) {
			self.thansform = function(pid, node) {
				for(var key in self.data) {
					var nodeData = self.data[key];
					if(nodeData.pid == pid) {
						if(node) {
							if(!node.items) {
								node.items = [];
							}
							node.items.push(nodeData);
							self.thansform(nodeData.id, nodeData);
						} else {
							self.array.push(nodeData);
							self.thansform(nodeData.id, nodeData);
						}

					}
				}
			};
			self.thansform(pid);
		}

		return self.array;
	};
	/**提示框**/
	base.confirm = function(option) {
		var self = {};
		self.label = option.label ? option.label : "提示";
		self.text = option.text ? option.text : "是否删除?";
		self.confirmCallback = option.confirmCallback ? option.confirmCallback : null;
		self.cancelCallback = option.cancelCallback ? option.cancelCallback : null;
		self.width = 200;
		self.height = 30;
		self.create = function() {
			var modal = base.modal({
				label: self.label,

				context: "<div style='text-align:center;font-size:13px;'>" + self.text + "</div>",
				width: self.width,
				height: self.height,
				contentStyle: "overflow:hidden,padding:20px 0",
				labelStyle: "font-size:14px",
				buttons: [{
						"label": "确定",
						"cls": "btn btn-info",
						"clickEvent": function() {
							if(self.confirmCallback) {
								self.confirmCallback();
							}
							modal.hide();
						}
					},
					{
						"label": "取消",
						"cls": "btn btn-warning",
						"clickEvent": function() {
							if(self.cancelCallback) {
								self.cancelCallback();
							}
							modal.hide();
						}
					}
				]
			});

		};
		self.create();
		return self;
	};
	/**消息提示框**/
	base.tip = function(option) {
		var self = {};
		self.text = option.text ? option.text : "";
		self.label = option.label ? option.label : '提示';
		self.icon = option.icon ? option.icon : "fa fa-commenting-o";
		self.width = option.width ? option.width : 200;
		self.height = option.height ? option.height : 30;
		self.create = function() {
			var modal = base.modal({
				label: "<i class='" + self.icon + "' style='margin-right:4px;font-size:20px;'></i>" + self.label,
				context: "<div style='text-align:center;font-size:13px;padding:5px;'>" + self.text + "</div>",
				width: self.width,
				height: self.height,
				contentStyle: "overflow:auto,padding:20px 0",
				labelStyle: "font-size:14px",
				buttons: [{
					"label": "关闭",
					"cls": "btn btn-info",
					"clickEvent": function() {
						modal.hide();
					}
				}]
			});

		};
		self.create();
		return self;
	};

	/**告警提示框**/
	base.alert = function(text, callback) {
		var self = {};
		self.text = text ? text : "";
		self.width = 200;
		self.height = 30;
		self.callback = callback ? callback : null;
		self.create = function() {
			var modal = base.modal({
				label: "<i class='fa fa-exclamation-circle' style='margin-right:4px;color:red;font-size:20px;'></i>提示",
				context: "<div style='text-align:center;font-size:13px;'>" + self.text + "</div>",
				width: self.width,
				height: self.height,
				contentStyle: "overflow:hidden,padding:20px 0",
				labelStyle: "font-size:14px",
				buttons: [{
					"label": "关闭",
					"cls": "btn btn-info",
					"clickEvent": function() {
						if(self.callback) {
							self.callback();
						}
						modal.hide();
					}
				}]
			});

		};
		self.create();
		return self;
	};
	/**查询父级数据,data为有id与pid的map类型数据**/
	base.findParentToArray = function(data, id) {
		var self = {};
		self.data = data ? data : null;
		self.id = id ? id : null;
		var ary = [];
		if(self.data && self.id) {
			self.find = function(id) {
				if(self.data[id]) {
					ary.push(self.data[id]);
					self.find(self.data[id].pid);
				}
			};
			self.find(self.id);
		}
		return ary.reverse();
	};
	/**tree组件**/
	base.tree = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.setting = option.setting ? option.setting : null;
		self.data = option.data ? option.data : null;
		self.treeObj = null;
		self.drawCallback = option.drawCallback ? option.drawCallback : null;
		self.selectNodeId = option.selectNodeId ? option.selectNodeId : null;
		self.expandAll = option.expandAll==false?false:true;
		self.selectNode = function(nodes, tree) {
			$(nodes).each(function(i, o) {
				if(o.id == self.selectNodeId) {
					self.treeObj.selectNode(o);
					self.treeObj.setting.callback.onClick(null, o.tId, o);
					return false;
				} else {
					if(o.children && o.children.length > 0) {
						self.selectNode(o.children);
					}
				}
			});
		};
		self.create = function() {
			$.fn.zTree.init(self.container, self.setting, self.data);
			self.treeObj = $.fn.zTree.getZTreeObj($(self.container).attr("id"));
			self.treeObj.expandAll(self.expandAll);
			if(self.drawCallback) {
				self.drawCallback(self.treeObj);
			}
			if(self.selectNodeId) {
				var node = self.selectNode(self.treeObj.getNodeByParam(self.selectNodeId),self.treeObj);
				self.treeObj.expandNode(node, true, false);
			}

		};
		self.destroy = function(){
			self.treeObj.destroy();
			self.treeObj = null;
		};
		self.create();
		return self;

	};
	/**步骤组件**/
	base.steps = function(option) {
		var self = {};
		self.data = option.data ? option.data : null;
		self.container = option.container ? option.container : null;
		self.width = 0;
		self.height = option.height ? option.height : 300;
		if($(self.container).parents(".modal-body").length > 0) {
			self.height = $(self.container).parents(".modal-body").innerHeight() - 50;
		}
		if(self.height <= 0) {
			self.height = 300;
		}
		self.header = {};
		self.body = {};
		self.footer = {};
		self.buttonbar = null;
		self.animate = option.animate == false ? false : true;
		self.tipSize = option.tipSize ? option.tipSize : 30;
		self.color = option.color ? option.color : "#039bda";
		self.showNumber = option.showNumber == false ? false : true;
		self.buttons = option.buttons ? option.buttons : null;
		self.lineHeight = option.lineHeight ? option.lineHeight : 10;
		self.buttonGroupToggle = option.buttonGroupToggle ? option.buttonGroupToggle : null;
		self.headerHeight = 90;
		if(self.container) {
			self.width = $(self.container).width();
		}
		self.currentStep = option.currentStep ? option.currentStep : 0;
		if(self.currentStep > self.data.length) {
			self.currentStep = self.data.length;
		}
		self.create = function() {
			$(self.container).html("");
			if(self.data && self.data.length > 0) {
				self.setHeader();
				self.setBody();
				self.setFooter();
			}
		};
		self.setHeader = function(isCreated) {
			self.header.element = document.createElement("div");
			$(self.header.element).addClass("ui-steps-header");
			$(self.header.element).css("height", self.headerHeight);
			$(self.container).append(self.header.element);
			self.header.createStepbar = function() {
				self.header.stepbar = document.createElement("ul");
				$(self.header.stepbar).addClass("ui-steps-stepbar");
				$(self.header.element).append(self.header.stepbar);
				self.header.createItem = function(data, index) {
					var item = document.createElement("li");
					$(self.header.stepbar).append(item);
					$(item).css("width", self.width / self.data.length);
					var label = document.createElement("div");
					$(label).attr("type", "label");
					$(label).html(data.label);
					$(item).append(label);
					var tip = document.createElement("div");
					$(tip).attr("type", "tip");
					$(tip).css("width", self.tipSize);
					$(tip).css("height", self.tipSize);
					//$(tip).css("background-color",self.color);
					if(self.showNumber) {
						$(tip).html(index + 1);
					}
					$(tip).css("line-height", self.tipSize + "px");
					$(tip).css("font-size", self.tipSize / 3 * 2);
					$(item).append(tip);
				};
				$(self.data).each(function(i, o) {
					self.header.createItem(o, i);
				});
			};
			self.header.createLinebar = function() {
				self.header.linebar = document.createElement("div");
				$(self.header.linebar).addClass("ui-steps-linebar");
				$(self.header.linebar).css("width", self.width / self.data.length * (self.data.length - 1));
				$(self.header.linebar).css("margin-left", self.width / self.data.length / 2);
				$(self.header.linebar).css("margin-right", self.width / self.data.length / 2);
				$(self.header.linebar).css("height", self.lineHeight);
				$(self.header.element).append(self.header.linebar);
				$(self.header.linebar).css("top", -self.tipSize + self.lineHeight);
				self.header.line = document.createElement("div");
				$(self.header.line).addClass("ui-steps-line");
				$(self.header.linebar).append(self.header.line);
			};

			self.header.step = function(isBack) {
				var w = $(self.header.linebar).width() / (self.data.length - 1) * self.currentStep;
				if(self.animate) {
					$(self.header.line).animate({
						"width": w
					});
				} else {
					$(self.header.line).css("width", w);
				}
				$(self.header.stepbar).find("li").removeClass("active");
				$(self.header.stepbar).find("li").slice(0, self.currentStep + 1).addClass("active");

			};
			self.header.back = function() {
				if(self.currentStep <= 0) {
					return;
				}
				self.currentStep = self.currentStep - 1;
				self.header.step(true);
			};

			self.header.forward = function() {
				if(self.currentStep == (self.data.length - 1)) {
					return;
				}
				self.currentStep = self.currentStep + 1;
				self.header.step(false);
			};

			self.header.createStepbar();
			self.header.createLinebar();
			self.header.step();
		};

		self.getStep = function() {
			return self.currentStep;
		};

		self.getStepCount = function() {
			return self.data.length;
		};

		self.toStep = function(step) {
			if(step < 0) {
				step = 0;
			}
			if(step > (self.data.length - 1)) {
				step = self.data.length - 1;
			}
			if(step == self.currentStep) {
				return;
			}
			if(step < self.currentStep) {
				self.currentStep = step;
				self.header.step();
				self.body.step();
				self.footer.check();
			} else {
				self.currentStep = step;
				self.header.step();
				self.body.step();
				self.footer.check();
			}
		};

		self.setBody = function() {
			self.body.element = document.createElement("div");
			$(self.body.element).addClass("ui-steps-body");
			$(self.container).append(self.body.element);
			self.body.createCarousel = function() {
				self.body.carouselbar = document.createElement("ul");
				$(self.body.carouselbar).addClass("ui-steps-carouselbar");
				$(self.body.element).append(self.body.carouselbar);
				$(self.body.carouselbar).css("width", $(self.container).width() * self.data.length);

				$(self.data).each(function(i, o) {
					self.body.createCarouselItem(o, i);
				});
			};
			self.body.createCarouselItem = function(data, index) {
				var item = document.createElement("li");
				$(self.body.carouselbar).append(item);
				$(item).html(data.content);
				$(item).css("width", $(self.container).width());
				$(item).css("height", self.height - self.headerHeight);

				base.scroll({
					container: item
				});

				if(index == self.currentStep) {
					$(item).addClass("active");
				}
				if(data.contentToggle) {
					$(item).html($(data.contentToggle).children().clone());
					$(data.contentToggle).remove();
				}
				if(data.contentUrl) {
					base.loadPage({
						container: item,
						url: data.contentUrl,
						callback: o.callback ? o.callback : null
					});
				}
				if(data.content) {
					$(item).html(data.content);
				}
				if(data.callback) {

					data.callback(self);
				}
			};
			self.body.step = function(isBack) {
				var ml = -self.width * self.currentStep;
				$(self.body.carouselbar).children("li").show();
				if(self.animate) {
					$(self.body.carouselbar).animate({
						"marginLeft": ml
					}, function() {
						$(self.body.carouselbar).children("li").removeClass("active");
						$(self.body.carouselbar).children("li:eq(" + self.currentStep + ")").addClass("active");
					});
				} else {
					$(self.body.carouselbar).css("margin-left", ml);
					$(self.body.carouselbar).children("li").removeClass("active");
					$(self.body.carouselbar).children("li:eq(" + self.currentStep + ")").addClass("active");
				}
			};
			self.body.back = function() {
				if(self.currentStep < 0) {
					return;
				}
				self.body.step(true);
			};
			self.body.forward = function() {
				if(self.currentStep == self.data.length) {
					return;
				}
				self.body.step(false);
			};
			self.body.createCarousel();
			self.body.step();
		};

		self.back = function(callback) {
			if(callback) {
				if(!callback(self)) {
					return;
				};
			}
			self.header.back();
			self.body.back();
			self.footer.check();
		};

		self.forward = function(callback) {
			if(callback) {
				if(!callback(self)) {
					return;
				};
			}
			self.header.forward();
			self.body.forward();
			self.footer.check();
		};

		self.setFooter = function() {
			if(self.buttonGroupToggle) {
				self.footer.element = $(self.buttonGroupToggle);
			} else {
				self.footer.element = document.createElement("div");
				$(self.footer.element).addClass("ui-steps-footer");
				$(self.container).append(self.footer.element);
			}

			self.footer.createButton = function() {
				if(self.buttons && self.buttons.length > 0) {
					$(self.buttons).each(function(i, o) {

						var label = null;
						var type = o.type ? " " + o.type : "";
						var cls = o.cls ? o.cls + type : "btn btn-info" + type;
						var clickEvent = null;
						var icon = o.icon ? o.icon : null;
						var iconPosition = o.iconPosition ? o.iconPosition : "first";
						switch(o.type) {
							case "back": //上一步
								label = o.label ? o.label : "上一步";
								clickEvent = function(obj) {
									var callback = o.callback ? o.callback : null;
									self.back(callback);
								}
								break;

							case "forward": //下一步
								label = o.label ? o.label : "下一步";
								clickEvent = function(obj) {
									var callback = o.callback ? o.callback : null;
									self.forward(callback);
								}
								break;

							case "confirm": //确定
								label = o.label ? o.label : "确定";
								clickEvent = function(obj) {
									if(o.callback) {
										if(!o.callback(obj, self)) {
											return;
										};
									}
								}
								break;

							default:
								label = o.label ? o.label : null;
								clickEvent = function(obj) {
									if(o.callback) {
										if(!o.callback(obj, self)) {
											return;
										};
									}
								}
								break;
						}
						base.form.button({
							container: self.footer.element,
							label: label,
							icon: icon,
							cls: cls,
							iconPosition: iconPosition,
							clickEvent: clickEvent
						});

					});
				}

			};
			self.footer.check = function(obj) {
				var count = self.getStepCount();
				if(self.currentStep == 0) { //第一步
					$(self.footer.element).find(".back").addClass("disabled");
					$(self.footer.element).find(".back").hide();
					$(self.footer.element).find(".forward").removeClass("disabled");
					$(self.footer.element).find(".forward").show();
					$(self.footer.element).find(".confirm").addClass("disabled");
					$(self.footer.element).find(".confirm").hide();
				} else if(self.currentStep == (count - 1)) { //最后一步
					$(self.footer.element).find(".back").removeClass("disabled");
					$(self.footer.element).find(".back").show();
					$(self.footer.element).find(".forward").addClass("disabled");
					$(self.footer.element).find(".forward").hide();
					$(self.footer.element).find(".confirm").removeClass("disabled");
					$(self.footer.element).find(".confirm").show();
				} else { //其余
					$(self.footer.element).find(".back").removeClass("disabled");
					$(self.footer.element).find(".back").show();
					$(self.footer.element).find(".forward").removeClass("disabled");
					$(self.footer.element).find(".forward").show();
					$(self.footer.element).find(".confirm").addClass("disabled");
					$(self.footer.element).find(".confirm").hide();
				}
			};
			self.footer.createButton();
			self.footer.check();
		};
		self.create();
		return self;
	};
	/**推拉效果组件**/
	base.pull = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.pull = null;
		self.width = option.width ? option.width : 8;
		self.height = option.height ? option.height : 50;
		self.bg = option.bg ? option.bg : "#fff";
		self.hoverBg = option.hoverBg?option.hoverBg:"#eee";
		self.show = option.show ? option.show : true;
		self.callback = option.callback ? option.callback : null;
		self.target = option.target ? option.target : null;
		self.animate = option.animate ? option.animate : true;
		self.color = option.color?option.color:"#333";
		self.border = option.border?option.border:"#aaa";
		self.pullbtn = option.pullbtn?option.pullbtn:null;
		self.create = function() {
			self.pull = document.createElement("div");
			$(self.pull).css("float", "left");
			$(self.pull).css("width", self.width);
			$(self.pull).css("height", self.height);

			$(self.pull).css("position", "absolute");
			$(self.pull).css("text-align", "center");
			$(self.pull).css("cursor", "pointer");
			$(self.pull).css("font-size", "12px");
			$(self.pull).css("padding-top", self.height / 4 + 2);
			if(self.pullbtn){
				$(self.pull).css("background-image","url('"+self.pullbtn+"')");
				$(self.pull).css("background-position","0px 0px");
			}else{
				$(self.pull).css("background-color", self.bg);
				$(self.pull).css("border", "1px solid "+self.border);

			}
			$(self.pull).css("color", self.color);
			$(self.pull).attr("type","pull");
			self.setPosition();
			$(self.pull).hover(function() {
				if(self.pullbtn){
					$(this).css("background-position","-8px 0px");
				}else{
					$(this).css("background-color", self.hoverBg);
				}

			}, function() {
				if(self.pullbtn){
					$(this).css("background-position","0px 0px");
				}else{
					$(this).css("background-color", self.bg);
				}

			});
			$(self.pull).css("z-index", "1000");
			$(self.container).parent().parent().append(self.pull);
			self.toggle();
			$(self.pull).on("click", function() {
				self.show = !self.show;
				self.toggle();
			});
			$(window).on("resize", function() {
				self.setPosition();
			});
		};
		self.setPosition = function() {
			$(self.pull).css("top", $(self.container).height() / 2 - self.height / 2 + "px");
			$(self.pull).css("left", 11 - self.width);
		};
		self.toggle = function() {
			if($(self.container).length > 0) {
				if(self.show) {
					$(self.pull).html("<i class='fa fa-caret-left'></i>");
					if(self.target) {
						if(self.animate) {
							$(self.target).animate({
								"left": $(self.container).outerWidth()
							});
						} else {
							$(self.target).css("left", $(self.container).outerWidth());
						}

					}
					$(self.container).show();
				} else {
					$(self.pull).html("<i class='fa fa-caret-right'></i>");
					if(self.target) {
						if(self.animate) {
							$(self.target).animate({
								"left": 0
							});
						} else {
							$(self.target).css("left", 0);
						}

					}
					$(self.container).hide();
				}
				if(self.callback) {
					self.callback(self);
				}
			}
		};
		self.create();
		return self;
	};
	/**消息提示窗组件**/
	base.msg = function(option) {
		var self = {};
		self.content = option.content ? option.content : "";
		self.position = option.position ? option.position : "rightBottom";
		self.label = option.label ? option.label : "消息";
		self.create = function() {
			self.createHeader();
			self.crreateBody();
		};
		self.createHeader = function() {

		};
		self.crreateBody = function() {

		};
		self.create();
		return self;
	};
	/**获取url的参数**/
	base.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	};
	/**封装了cookie的组件**/
	base.cookie = function(option) {
		var self = {};
		self.path = option.path ? option.path : "/";
		self.name = option.name ? option.name : null;
		self.value = option.value ? option.value : null;
		self.days = option.days ? option.days : null;
		self.option = {};
		if(self.days) {
			self.option.expires = self.days;
		}
		if(self.path) {
			self.option.path = self.path;
		}
		self.create = function() {
			if(!self.name) {
				return;
			}
			self.setCookie();
		};
		self.setCookie = function() {
			$.cookie(self.name, self.value, self.option);
		};
		self.getCookie = function(name) {
			$.cookie(self.name);
		};
		self.create();
	};
	/**树形表格组件**/
	base.treeTable = function(option) {
		var self = {};
		self.setting = option.setting ? option.setting : null;
		self.container = option.container ? option.container : null;
		self.create = function() {
			require(["treeTable"], function() {
				$(self.container).removeClass("treetable");
				$(self.container).treetable(self.setting);
			});
		};
		self.create();
	};
	/**字符串转日期**/
	base.getDate = function(dateStr) {
		if(!dateStr) {
			dateStr = new Date().format("yyyy-MM-dd HH:mm:ss");
		}
		var yyyy = null;
		var MM = null;
		var dd = null;
		var HH = 0;
		var mm = 0;
		var ss = 0;
		var d = null;
		var time = null;

		var tmp = dateStr.split(" ");

		if(tmp.length > 0) {
			d = tmp[0].split("-");
			if(d[0]) {
				yyyy = d[0];
			}
			if(d[1]) {
				MM = d[1] - 1;
			}
			if(d[2]) {
				dd = d[2];
			}
		}
		if(tmp.length == 2) {
			time = tmp[1].split(":");
			if(time[0]) {
				HH = time[0];
			}
			if(time[1]) {
				mm = time[1];
			}
			if(time[2]) {
				ss = time[2];
			}
		}
		return new Date(yyyy, MM, dd, HH, mm, ss);
	};

	/**原生Ajax**/
	base.xmlHttpRequest = function() {
		var xmlHttp;
		try { // Firefox, Opera 8.0+, Safari
			xmlHttp = new XMLHttpRequest();
		} catch(e) {
			try { // Internet Explorer
				xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				try {
					xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
				} catch(e) {}
			}
		}

		return xmlHttp;

	};
	/**获取字符串长度**/
	base.getByteLen = function(val) {
		var len = 0;
		for(var i = 0; i < val.length; i++) {
			var patt = new RegExp(/[^\x00-\xff]/ig);
			var a = val[i];
			if(patt.test(a)) {
				len += 2;
			} else {
				len += 1;
			}
		}
		return len;
	};
	/**拖拽选择器 **/
	base.dragPickBox = function(option) {
		var self = {};
		self.items = option.items ? option.items : null;
		self.boxes = option.boxes ? option.boxes : null;
		self.mouseX = 0;
		self.mouseY = 0;
		self.name = "dragPick";
		self.dragElement = null;
		self.factor = base.getRandom(1000, 9999);
		self.boxRange = [];
		self.multiple = option.multiple == 1 ? true : false;
		self.actveBox = null;
		self.hasRemoveTools = option.removeTools == 0 ? false : true;
		self.removeToolsSize = option.removeToolsSize ? option.removeToolsSize : 14;
		self.clickEvent = option.clickEvent ? option.clickEvent : null;
		self.destory = function() {
			$(document).unbind("mousedown");
			$(document).unbind("mouseup");
			$(document).unbind("mousemove");
		};
		self.create = function() {
			self.destory();
			self.setItems();
			self.setBoxes();
			document.body.onselectstart = function() {
				return false;
			};
			self.init();
			self.setMouseMove();
			self.setMouseDown();
			self.setMouseUp();
		};

		self.setItems = function() {
			$(self.items).addClass(self.factor + self.name + "Item");
			base.unselect(self.items);
		};
		self.setBoxes = function() {
			$(self.boxes).addClass(self.factor + self.name + "Box");
			$(self.boxes).css("overflow", "auto");
			base.unselect(self.boxes);
			self.empty(self.boxes);
		};
		self.setMouseDown = function() {
			$(document).on("mousedown", function(event) {
				var event = event || window.event;
				var touchObj = event.target || event.srcElement;
				var item = null;
				var parents = $(touchObj).parents("." + self.factor + self.name + "Item");
				if(parents.length > 0) {
					item = parents[0];
				} else {
					if($(touchObj).hasClass(self.factor + self.name + "Item")) {
						item = touchObj;
					}
				}
				if(item) {
					self.createDragElement(item);
					if(self.clickEvent) {
						self.clickEvent(item);
					}
				}

			});
		};
		self.setMouseMove = function() {
			$(document).on("mousemove", function(event) {
				event = event || window.event;
				self.mouseX = event.clientX;
				self.mouseY = event.clientY;
				if(self.dragElement) {
					self.setDragPosition();
					self.touchEvent(event);
				}

			});

		};
		self.removeDragElement = function() {
			$(self.dragElement).remove();
			self.dragElement = null;
		};
		self.setMouseUp = function() {
			$(document).on("mouseup", function(event) {
				self.pick();
				self.clearActiveBox();
				self.removeDragElement();

			});
		};
		self.empty = function(elements) {
			$(elements).each(function(i, o) {
				var style = "float:left;width:100%;color:#ddd;text-align:center;font-size:" + self.removeToolsSize + "px;padding-top:" + ($(o).innerHeight() / 2 - 2 - self.removeToolsSize / 2) + "px";
				$(o).html("<div style='" + style + "'>暂无</div>")
			});

		};
		self.pick = function() {
			if(!self.activeBox) {
				return;
			}
			var uid = $(self.dragElement).attr("uid");
			if(self.checkRepeat(uid)) {
				base.alert("不能重复添加");
				return;
			}
			if(self.hasRemoveTools) {
				self.createRemoveTools(self.activeBox);
			}
			if(self.multiple) {
				$(self.activeBox).append("<div uid ='" + uid + "' style='padding:5px;float:left;width:100%;text-align:center;'>" + $(self.dragElement).html() + "</div>");
			} else {
				var style = "float:left;width:100%;text-align:center;font-size:" + self.removeToolsSize + "px;padding-top:" + ($(self.activeBox).innerHeight() / 2 - 2 - self.removeToolsSize - 4 - self.removeToolsSize / 2) + "px";
				$(self.activeBox).children("div").remove();
				$(self.activeBox).append("<div uid ='" + uid + "' style='" + style + "'>" + $(self.dragElement).html() + "</div>");
			}
		};
		self.checkRepeat = function(uid) {
			if($(self.activeBox).children("div[uid='" + uid + "']").length > 0) {
				return true;
			} else {
				return false;
			}
		};
		self.createRemoveTools = function(box) {
			var removeTools = document.createElement("i");
			$(removeTools).addClass("fa fa-trash-o");
			var style = "font-size:" + self.removeToolsSize + "px;cursor:pointer;float:right;margin:2px;";
			$(removeTools).attr("style", style);
			$(removeTools).attr("title", "移除");
			$(removeTools).addClass("remove" + self.name + "Tools");
			$(box).find("." + "remove" + self.name + "Tools").remove();
			$(box).append(removeTools);
			$(removeTools).on("click", function() {
				self.empty(box);
			});

		};

		self.touchEvent = function(event) {
			event = event || window.event;
			$(self.boxRange).each(function(i, o) {
				var dx1 = self.mouseX - $(self.dragElement).outerWidth() / 2;
				var dx2 = self.mouseX + $(self.dragElement).outerWidth() / 2;
				var dy1 = self.mouseY - $(self.dragElement).outerHeight() / 2;
				var dy2 = self.mouseY + $(self.dragElement).outerHeight() / 2;
				var isInner = false;
				if(dx1 <= o.x2 && dx2 >= o.x1) {
					if(dy1 <= o.y2 && dy2 >= o.y1) {
						isInner = true;
						self.setActiveBox(o.element);
						return false;
					}
				}
				if(!isInner) {
					self.clearActiveBox();
				}
			});
		};
		self.setActiveBox = function(box) {
			self.clearActiveBox();
			$(box).css("border", "1px solid #0000ff");
			self.activeBox = box;
		};
		self.clearActiveBox = function() {
			$(self.boxes).css("border", "1px solid #ddd");
			self.activeBox = null;
		};
		self.init = function(boxes) {
			self.boxRange = [];
			if(boxes) {
				self.boxes = boxes;
			}
			$(self.boxes).each(function(i, o) {
				self.boxRange.push({
					x1: $(o).offset().left,
					x2: $(o).offset().left + $(o).outerWidth(),
					y1: $(o).offset().top,
					y2: $(o).offset().top + $(o).outerHeight(),
					index: i,
					element: o
				});
			});
			$(boxes).each(function(i, o) {
				$(o).find(".removedragPickTools").on("click", function() {
					self.empty(o);
				});
			});
		};

		self.setDragPosition = function() {
			$(self.dragElement).css("left", self.mouseX - $(self.dragElement).outerWidth() / 2);
			$(self.dragElement).css("top", self.mouseY - $(self.dragElement).outerHeight() / 2);
		};
		self.createDragElement = function(obj) {
			self.dragElement = null;
			self.dragElement = document.createElement("div");
			$(self.dragElement).css("position", "absolute");
			$(self.dragElement).css("z-index", 10000);
			$(self.dragElement).css("padding", "5px 10px");
			base.unselect(self.dragElement);
			$(self.dragElement).css("background", "#f2f2f2");
			$(self.dragElement).css("cursor", "move");
			$(self.dragElement).css("border", "1px solid #ddd");
			$(self.dragElement).attr("uid", $(obj).attr("uid"));
			$(self.dragElement).addClass(self.factor + self.name + "Drag");
			base.unselect(self.dragElement);
			$(self.dragElement).html($(obj).attr("uv"));
			$("body").append(self.dragElement);
			self.setDragPosition();
			$(self.dragElement).focus();
		};
		self.getData = function() {

		};

		self.create();
		return self;
	};
	/**让鼠标不能框选内容**/
	base.unselect = function(obj) {
		$(obj).css("-moz-user-select", "none");
		$(obj).css("-khtml-user-select", "none");
		$(obj).css("user-select", "none");
		$(obj).attr("unselectable", "on");
		$(obj).attr("onselectstart", "return false");
	};

	/**获取数组值**/
	base.findData = function(key, value, data) {
		var nodeData = null;
		$(data).each(function(i, o) {
			if(o[key] == value) {
				nodeData = o;
				return false;
			}
		});
		return nodeData;
	};
	/**改变数据值**/
	base.changeData = function(option) {
		var self = {};
		self.data = option.data ? option.data : null;
		self.key = option.key ? option.key : null;
		self.value = option.value ? option.value : null;
		self.newData = option.newData ? option.newData : null;
		$(self.data).each(function(i, o) {
			if(o[self.key] == self.value) {
				for(var key in self.newData) {
					o[key] = self.newData[key];
				}
				return false;
			}
		});
		return self.data;
	};

	/**获取当前日期**/
	base.getNowDate = function() {
		var myDate = (new Date()).Format("yyyy-MM-dd");
		return myDate;
	};

	/**获取当前时间**/
	base.getNowTime = function() {
		var myDate = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
		return myDate;
	};
	/**获取前或后几个月**/
	base.getDateByMonth = function(monthNumber, hasTime) {
		var myDate = new Date();
		if(hasTime) {
			return new Date(myDate.getFullYear(), myDate.getMonth() + monthNumber, myDate.getDate(), myDate.getHours(), myDate.getMinutes(), myDate.getSeconds()).Format("yyyy-MM-dd hh:mm:ss");
		} else {
			return new Date(myDate.getFullYear(), myDate.getMonth() + monthNumber, myDate.getDate()).Format("yyyy-MM-dd");
		}

	};

	/**获取前或后几天**/
	base.getDateByDay = function(dayNumber, hasTime) {
		var myDate = new Date();
		if(hasTime) {
			return new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate() + dayNumber, myDate.getHours(), myDate.getMinutes(), myDate.getSeconds()).Format("yyyy-MM-dd hh:mm:ss");
		} else {
			return new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate() + dayNumber).Format("yyyy-MM-dd");
		}

	};

	/**tab标签组件**/
	base.tabs = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.addEnable = option.addEnable == true ? true : false;
		self.closeEnable = option.closeEnable == true ? true : false;
		self.data = option.data ? option.data : null;
		self.tabContainer = null;
		self.id = option.id ? option.id : base.getRandom(1000, 9999) + "tab";
		self.create = function() {
			return self;
		};
		self.init = function() {
			self.tabContainer = document.createElement("ul");
			$(self.tabContainer).attr("id", self.id);
			$(self.tabContainer).addClass("nav nav-tabs");
			$(self.data).each(function(i, o) {
				self.add(o);
			});
		};
		self.add = function(data) {
			var tabItem = document.createElement("li");
			if(!data) {
				$(tabItem).append("<a href='###' data-toggle='tab'><i class='fa fa-plus'></i></a>");
				self.tabContainer.append(tabItem);
			} else {

			}
		};
		self.close = function() {

		};
		self.create();
	};

	/**日程组件**/
	base.calendar = function(option) {
		var self = {};
		self.calendarOption = option.calendarOption ? option.calendarOption : {};
		self.container = option.container ? option.container : null;
		self.data = option.data ? option.data : null;
		self.calendarOption.locale = "zh-cn";
		self.setData = function(data) {
			self.calendarOption.events = data;
			self.data = data;
		};
		if(self.data) {
			self.setData(self.data);
		}
		if(!self.calendarOption.header) {
			self.calendarOption.header = {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay,listMonth'
			}
		}

		self.calendarOption.buttonIcons = true;
		self.calendarOption.defaultDate = option.date ? option.date : base.getNowDate();
		self.calendarOption.navLinks = true;
		self.calendarOption.editable = true;
		self.calendarOption.eventLimit = true;
		if(option.clickEvent) {
			self.calendarOption.eventClick = function(a, b) {
				option.clickEvent(a);
			};
		}

		self.create = function() {
			if(self.container) {
				self.draw();
			}
			return self;
		};
		self.draw = function() {
			require(["moment", "calendarLocale"], function(moment) {
				moment.createFromInputFallback = function(config) {
					config._d = new Date(config._i);
				};
				$(self.container).fullCalendar(self.calendarOption);
			});
		};
		self.destroy = function() {
			$(self.container).fullCalendar("destroy");
		};
		self.redraw = function(data, container) {
			self.destroy();
			self.setData(data);
			self.container = container;
			self.draw();
		}
		self.findData = function(cid) {
			var dat = null;
			if(cid) {
				$(self.data).each(function(i, o) {
					if(o.id == cid) {
						dat = o;
						return false;
					}
				});
			}
			return dat;
		};
		self.create();
		return self;
	};
	/**页面操作组件**/
	base.pageEntity = function() {
		var self = this;
		self.init = function(dataMap, form) {

		};
	};
	base.page = new base.pageEntity();
	/**页面加载**/
	base.page.load = function(option) {
		var self = {};
		self.container = option.container ? option.container : $(".ui-article");
		self.url = option.url ? option.url : null;
		self.params = option.params ? option.params : null;
		self.context = option.context ? option.context : null;
		self.beforeCallback = option.beforeCallback ? option.beforeCallback : null;
		self.callback = option.callback ? option.callback : null;
		self.pageItem = null;
		self.isUnique = option.isUnique == true ? true : false;
		self.pageGroup = null;

		self.load = function() {
			if(self.container.length > 0) {

				if($(self.container).children(".ui-page-group").length==0){
					self.pageGroup = document.createElement("div");
					$(self.pageGroup).addClass("ui-page-group");
					$(self.container).append(self.pageGroup);
				}else{
					self.pageGroup = $(self.container).children(".ui-page-group")[0];
				}
				self.pageItem = document.createElement("div");
				$(self.pageItem).addClass("ui-page-item");
				$(self.pageGroup).find(".ui-page-item").removeClass("active");
				$(self.pageItem).addClass("active");
				if(self.context) {
					if(self.beforeCallback) {
						self.beforeCallback(self);
					}
					if(self.isUnique) {
						$(self.pageGroup).children().remove();
					}
					$(self.pageItem).attr("pageLevel", $(self.pageGroup).find(".ui-page-item").length);
					$(self.pageItem).html(self.context);
					$(self.pageGroup).append(self.pageItem);
					if(self.callback) {
						self.callback(self);
					}
				} else if(self.url) {
					base.ajax({
						type: "get",
						url: self.url,
						dataType: "text",
						params: self.params,
						success: function(context) {
							if(self.beforeCallback) {
								self.beforeCallback(self);
							}
							if(self.isUnique) {
								$(self.pageGroup).children().remove();
							}
							$(self.pageItem).attr("pageLevel", $(self.pageGroup).find(".ui-page-item").length);
							$(self.pageItem).html(context);
							$(self.pageGroup).append(self.pageItem);
							if(self.callback) {
								self.callback(self);
							}
						},
						beforeSend: function() {
							base.loading($(self.pageItem));
						},
						error: function() {
							$(self.pageItem).html("加载错误");
						}
					});
				}
			}
		};
		self.load();
		return self;
	};
	/**页面返回**/
	base.page.back = function(option) {
		var self = {};
		if(!option) {
			option = {};
		}
		self.pageItem = null;
		self.pageLevel = null;
		self.container = option.container ? option.container : $(".ui-page-group");
		self.beforeCallback = option.beforeCallback ? option.beforeCallback : null;
		self.callback = option.callback ? option.callback : null;
		self.back = function() {
			if(self.container.length > 0) {
				if(self.beforeCallback) {
					self.beforeCallback(self);
				}
				self.pageItem = $(self.container).children(".active");
				var parentPage = self.pageItem.prev();
				if(parentPage.length > 0) {
					self.pageItem.siblings().removeClass("active");
					parentPage.addClass("active");
					self.pageItem.remove();
				}
				if(self.callback) {
					self.callback(self);
				}
			}
		};
		self.back();
		return self;
	};
	/**当前位置**/
	base.page.crumbs = function(option) {
		var self = {};
		self.create = function() {

		};
		self.create();
		return self;
	};
	/**栏目标签组件**/
	base.pillTabs = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.data = option.data ? option.data : null;
		self.tabContainer = option.tabContainer ? option.tabContainer : null;
		self.create = function() {
			if(self.data) {
				if(self.data.data && self.data.data.length > 0) {
					if(self.tabContainer) {
						$(self.tabContainer).html("");
						if(!self.container) {
							self.container = $(self.tabContainer).parent();
						}
					} else {
						if(!self.container) {
							return;
						} else {
							self.createTab();
						}
					}

					$(self.data.data).each(function(i, o) {
						self.createTabItem(o);
					});
				}
			}
		};
		self.createTab = function() {
			if(self.container) {
				self.tabContainer = document.createElement("div");
				base.setProperty(self.tabContainer, self.data);
				self.container.append(self.tabContainer);
			}
		};
		self.createTabItem = function(data) {
			if(!data){return;}
			var tabItem = document.createElement("li");

			if(data.imageIcon) {
				$(tabItem).append("<img src='" + data.imageIcon + "'/>");
			}
			if(data.icon) {
				$(tabItem).append("<i class='" + data.icon + "'></i>");
			}
			if(data.name) {
				$(tabItem).append("<span>" + data.name + "</span>");
			}
			if(data.active) {
				$(tabItem).addClass("active");
				if(data.clickEvent) {
					data.clickEvent(tabItem, data, self);
				} else if(self.data.clickEvent) {
					self.data.clickEvent(tabItem, data, self);
				}
			}
			$(self.tabContainer).append(tabItem);
			$(tabItem).on("click", function() {
				$(self.tabContainer).children("li").removeClass("active");
				$(this).addClass("active");
			});
			if(data.clickEvent) {
				$(tabItem).on("click", function() {
					data.clickEvent(this, data, self);
				});
			} else if(self.data.clickEvent) {
				$(tabItem).on("click", function() {
					self.data.clickEvent(this, data, self);
				});
			}
		};
		self.create();
		return self;
	};

	/**折叠菜单**/
	base.accordion = function(option) {
		var self = {};
		self.container = option.container ? option.container : null;
		self.accordion = null;
		self.data = option.data ? option.data : null;
		self.id = option.id ? option.id : "accordion" + base.random(1000, 9999);
		self.name = option.name ? option.name : base.getRandomString(8);
		self.fixed = option.fixed==false?false:true;
		self.currentIndex = 0;
		self.firstIn = option.firstIn==false?false:true;
		self.create = function() {
			if(self.container) {
				if(self.data && self.data.length > 0) {
					self.createAccordion();
				}
			}
		};
		self.createAccordion = function() {
			self.accordion = document.createElement("div");
			$(self.accordion).addClass("panel-group");
			$(self.container).append(self.accordion);
			option.id = self.id;
			base.setProperty(self.accordion, option);
			self.createAccordionItem();
		};

		self.createAccordionItem = function() {
			$(self.data).each(function(i, o) {
				var item = document.createElement("div");
				$(item).addClass("panel panel-default");
				$(self.accordion).append(item);
				self.createAccordionItemHeader(item, o, i);
				self.createAccordionItemBody(item, o, i);
			});
			self.setEvent();
		};
		self.createAccordionItemHeader = function(parent, data, index) {
			var header = document.createElement("div");
			$(header).addClass("panel-heading");
			$(parent).append(header);
			var title = document.createElement("h4");
			$(header).append(title);
			$(title).addClass("panel-title");
			var a = document.createElement("a");
			$(title).append(a);
			if(data.icon) {
				$(a).append("<i class='" + data.icon + "'></i>");
			}
			if(data.label) {
				$(a).append("<span>" + data.label + "</span>");
			}
			$(a).attr("data-toggle", "collapse");
			$(a).attr("data-parent", "#" + self.id);
			$(a).addClass("collapsed");
			$(a).attr("href", "#" + self.name + index);
			$(a).attr("aria-expanded", "false");
		};
		self.createAccordionItemBody = function(parent, data, index) {
			var collapse = document.createElement("div");
			$(parent).append(collapse);
			$(collapse).attr("index",index);
			$(collapse).attr("id", self.name + index);
			$(collapse).addClass("panel-collapse collapse");
			if(self.firstIn){
				if(index==0)
				$(collapse).addClass("in");
			}
			$(collapse).attr("aria-expanded", "false");
			var body = document.createElement("div");
			$(body).addClass("panel-body");
			$(body).attr("id",base.getRandomString(10)+index);
			$(collapse).append(body);
			if(data.context){
				$(body).html(data.context);
			}
			if(data.callback){
				data.callback(body,data,self);
			}else{
				if(option.callback){
					data.callback(body,self.data);
				}
			}
			if(self.fixed){
				var h = $(self.container).innerHeight()- $(parent).find(".panel-heading").outerHeight()*self.data.length;
				$(body).css("height",h);
				base.scroll({
					container:$(body)
				});
			}

		};
		self.setEvent = function(){
			self.show();
			self.shown();
			self.hide();
			self.hidden();
		};
		self.show = function(){
			$(self.accordion).on('show.bs.collapse', function (panel) {
				self.currentIndex = $(panel.target).attr("index");
				if(self.showEvent){
			   		self.showEvent();
				}
			});
		};
		self.shown = function(){
			$(self.accordion).on('shown.bs.collapse', function (d) {
				if(self.shownEvent){
			   		self.shownEvent();
				}
			});
		};

		self.hide = function(){
			$(self.accordion).on('hide.bs.collapse', function (d) {
				if(self.hideEvent){
			   		self.hideEvent();
				}
			});
		};

		self.hidden = function(){
			$(self.accordion).on('hidden.bs.collapse', function (d) {
				if(self.hiddenEvent){
			   		self.hiddenEvent();
				}
			});
		};

		self.create();
		return self;
	};
	/**UTF-16 转 UTF-8**/
	base.utf16to8 = function(str) {
	    var out, i, len, c;
	    out = "";
	    len = str.length;
	    for(i = 0; i < len; i++) {
	    c = str.charCodeAt(i);
	    if ((c >= 0x0001) && (c <= 0x007F)) {
	        out += str.charAt(i);
	    } else if (c > 0x07FF) {
	        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
	        out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
	        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
	    } else {
	        out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
	        out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
	    }
	    }
	    return out;
	};

	/**二维码生成器组件,基于canvas，ie9以下浏览器不支持**/
	base.qrcode = function(option){
		var self = {};
		self.container = option.container?option.container:null;
		self.text = option.text?option.text:null;
		self.callback = option.callback?option.callback:null;
		self.width = option.width?option.width:100;
		self.height = option.height?option.height:100;
		self.foreground = option.foreground?option.foreground:"#000";
		self.background = option.background?option.background:"#fff";
		self.option = {
			width:self.width,
			height:self.height,
			text:self.text,
			render:self.container,
			foreground:self.foreground,
			background:self.background
		};
		self.create = function(){
			require(["qrcode"],function(){
				if(self.container&&self.text){
					self.option.text = base.utf16to8(self.option.text);
					$(self.container).qrcode(self.option);
					if(self.callback){
						self.callback(self);
					}
				}
			});
		};
		self.create();
		return self;
	};
	return base;
});
