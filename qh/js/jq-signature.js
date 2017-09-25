(function(window, document, $) {
  'use strict';

  // 在屏幕上画一个固定的间隔
  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimaitonFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  /*
   * 插件的构造函数
   */
  var pluginName = 'jqSignature',
    defaults = {
      lineColor: '#222222',
      lineWidth: 1,
      border: '1px dashed #AAAAAA',
      background: '#ffffff',
      width: 300,
      height: 100,
      autoFit: false,
    },
    canvasFixture = '<canvas></canvas>';

  function Signature(element, options) {
    // DOM 元素/对象
    this.element = element;
    this.$element = $(this.element);
    this.canvas = false;
    this.$canvas = false;
    this.ctx = false;
    // 绘画状态
    this.drawing = false;
    this.currentPos = {
      x: 0,
      y: 0
    };
    this.lastPos = this.currentPos;
    // 确定插件设置
    this._data = this.$element.data();
    this.settings = $.extend({}, defaults, options, this._data);
    // 初始化插件
    this.init();
  }

  Signature.prototype = {
    // 初始化画布
    init: function() {
      // 设置画布
      this.$canvas = $(canvasFixture).appendTo(this.$element);
      this.$canvas.attr({
        width: this.settings.width,
        height: this.settings.height
      });
      this.$canvas.css({
        boxSizing: 'border-box',
        width: this.settings.width + 'px',
        height: this.settings.height + 'px',
        border: this.settings.border,
        background: this.settings.background,
        cursor: 'crosshair'
      });
      // 匹配画布的宽度
      if (this.settings.autoFit === true) {
        this._resizeCanvas();
        // 允许动态调整画布大小
        // 需要在更改宽度之前保存画布状态以避免被清除
        // var timeout = false;
        // $(window).on('resize', $.proxy(function(e) {
        //   clearTimeout(timeout);
        //   timeout = setTimeout($.proxy(this._resizeCanvas, this), 250);
        // }, this));
      }
      this.canvas = this.$canvas[0];
      this._resetCanvas();
      // 设置鼠标事件
      this.$canvas.on('mousedown touchstart', $.proxy(function(e) {
        this.drawing = true;
        this.lastPos = this.currentPos = this._getPosition(e);
      }, this));
      this.$canvas.on('mousemove touchmove', $.proxy(function(e) {
        this.currentPos = this._getPosition(e);
      }, this));
      this.$canvas.on('mouseup touchend', $.proxy(function(e) {
        this.drawing = false;
        // 触发改变事件
        var changedEvent = $.Event('jq.signature.changed');
        this.$element.trigger(changedEvent);
      }, this));
      // 在触摸画布时防止文档滚动
      $(document).on('touchstart touchmove touchend', $.proxy(function(e) {
        if (e.target === this.canvas) {
          e.preventDefault();
        }
      }, this));
      // 开始画
      var that = this;
      (function drawLoop() {
        window.requestAnimFrame(drawLoop);
        that._renderCanvas();
      })();
    },
    // 清除画布
    clearCanvas: function() {
      this.canvas.width = this.canvas.width;
      this._resetCanvas();
    },
    // 将画布的内容作为base64数据URL
    getDataURL: function() {
      return this.canvas.toDataURL("image/png");
    },
    // 获得鼠标或触摸的位置
    _getPosition: function(event) {
      var xPos, yPos, rect;
      rect = this.canvas.getBoundingClientRect();
      event = event.originalEvent;
      // 触摸事件
      if (event.type.indexOf('touch') !== -1) { // event.constructor === TouchEvent
        xPos = event.touches[0].clientX - rect.left;
        yPos = event.touches[0].clientY - rect.top;
      }
      // 鼠标事件
      else {
        xPos = event.clientX - rect.left;
        yPos = event.clientY - rect.top;
      }
      return {
        x: xPos,
        y: yPos
      };
    },
    // 将签名呈现在画布上
    _renderCanvas: function() {
      if (this.drawing) {
        this.ctx.moveTo(this.lastPos.x, this.lastPos.y);
        this.ctx.lineTo(this.currentPos.x, this.currentPos.y);
        this.ctx.stroke();
        this.lastPos = this.currentPos;

      }

    },
    // 重置画布背景
    _resetCanvas: function() {
      this.ctx = this.canvas.getContext("2d");
      this.ctx.strokeStyle = this.settings.lineColor;
      this.ctx.lineWidth = this.settings.lineWidth;

      // var context = this.ctx;
      // var canvas = this.canvas;
      // var img = new Image();


      // img.src = "a.jpg";
      //
      // img.onload = function() {
      //   var ptrn = context.createPattern(img, 'no-repeat');
      //   context.fillStyle = ptrn;
      //
      //   context.fillRect(0, 0, canvas.width, canvas.height);
      // }


    },
    // 调整画布元素
    _resizeCanvas: function() {
      var width = this.$element.outerWidth();
      this.$canvas.attr('width', width);
      this.$canvas.css('width', width + 'px');
    }
  };

  /*
   * 插件包装和初始化
   */

  $.fn[pluginName] = function(options) {
    var args = arguments;
    if (options === undefined || typeof options === 'object') {
      return this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Signature(this, options));
        }
      });
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      var returns;
      this.each(function() {
        var instance = $.data(this, 'plugin_' + pluginName);
        if (instance instanceof Signature && typeof instance[options] === 'function') {
          returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }
        if (options === 'destroy') {
          $.data(this, 'plugin_' + pluginName, null);
        }
      });
      return returns !== undefined ? returns : this;
    }
  };

})(window, document, jQuery);