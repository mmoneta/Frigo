(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _alert = require("./modules/alert");

var _card = require("./modules/card");

// Main screen
window.addEventListener('load', function () {
  var timeout;
  document.querySelector('button[type=submit]').addEventListener('click', function () {
    var nick = document.querySelector('.sign-in--nick').value,
        regExp = new RegExp('[a-zA-Z0-9_]{4,}');

    if (nick !== '' && regExp.test(nick)) {
      document.body.removeChild(document.querySelector('.sign-in--view'));
      document.querySelector('.board--view').style.display = 'block';
      login(nick);
    } else if (nick === '') {
      timeout = _alert.Alert.create('Nie podano nazwy tablicy.', timeout);
    } else {
      timeout = _alert.Alert.create('Nazwa tablicy jest nieprawidłowa.', timeout);
    }
  });
}); // Dashboard

function login(nick) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', "Frigo/users/".concat(nick), true);

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      var response = JSON.parse(xhttp.responseText);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = response[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var note = _step.value;
          new _card.Card(note.Identity, nick, note.Width, note.Height, note.Top, note.Left, note.Content, note.Index, true);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  };

  xhttp.send();
  document.querySelector('.board--add').style.display = 'block';
  document.querySelector('.board--add').addEventListener('click', function () {
    var count = document.querySelectorAll('.note').length + 1;
    new _card.Card(count, nick, 150, 150, 150, 150, '', count, false);
  });
}

; // Removal

Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }

    ;
  }

  ;
};

},{"./modules/alert":2,"./modules/card":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alert = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Alert =
/*#__PURE__*/
function () {
  function Alert() {
    _classCallCheck(this, Alert);
  }

  _createClass(Alert, null, [{
    key: "create",
    value: function create(alert, timeout) {
      document.querySelector('.sign-in--alert').innerHTML = alert;

      if (timeout) {
        clearTimeout(timeout);
      }

      ;
      timeout = setTimeout(function () {
        document.querySelector('.sign-in--alert').innerHTML = '';
      }, 5000);
      return timeout;
    }
  }]);

  return Alert;
}();

exports.Alert = Alert;
;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;

var _tinymce = require("./tinymce");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Card =
/*#__PURE__*/
function () {
  function Card(ID, cretor, width, height, top, left, content, index, existed) {
    _classCallCheck(this, Card);

    this.ID = ID;
    this.cretor = cretor;
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
    this.content = content;
    this.index = index;
    this.toMove = false;
    this.toResize = false;
    this.existed = existed;
    this.create(existed);
  }

  _createClass(Card, [{
    key: "create",
    value: function create(existed) {
      var _this = this;

      this.card = document.createElement('div');
      this.card.className = 'note';
      this.card.id = this.ID;
      this.card.style.top = "".concat(this.top, "px");
      this.card.style.left = "".concat(this.left, "px");
      this.card.style.width = "".concat(this.width, "px");
      this.card.style.height = "".concat(this.height, "px");
      this.card.style.zIndex = this.index;
      document.body.appendChild(this.card); // New card in database

      if (existed === false) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'Frigo/add', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send("creator=".concat(this.cretor, "&identity=").concat(this.card.id, "&width=").concat(this.width, "&height=").concat(this.height, "&top=").concat(this.top, "&left=").concat(this.left, "&index=").concat(this.ID));
      }

      ; // Delete card (button)

      this.destroyButton = document.createElement('div');
      this.card.appendChild(this.destroyButton);
      this.destroyButton.style.cssText = 'width: 15px; height: 15px; position: absolute; border-radius: 3px; top: -14px; right: -14px; background-color: blue;';
      this.destroyButton.addEventListener('click', function () {
        _this.card.remove();

        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'Frigo/delete', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send("creator=".concat(_this.cretor, "&identity=").concat(_this.card.id));
      }); // Moving

      this.moveButton = document.createElement('div');
      this.card.appendChild(this.moveButton);
      this.moveButton.style.cssText = 'width: 100%; height: 20%; position: absolute; bottom: 0; right: 0;';
      this.moveButton.addEventListener('mousedown', function (e) {
        if (_this.toMove === false) {
          _this.toMove = true;
          _this.a = e.clientX - parseInt(getComputedStyle(_this.card).left);
          _this.b = e.clientY - parseInt(getComputedStyle(_this.card).top);
        }

        ;
      });
      this.moveButton.addEventListener('mouseup', function () {
        if (_this.toMove === true) {
          _this.toMove = false;

          var _xhttp = new XMLHttpRequest();

          _xhttp.open('POST', 'Frigo/position', true);

          _xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

          _xhttp.send("creator=".concat(_this.cretor, "&identity=").concat(_this.card.id, "&top=").concat(parseInt(_this.card.style.top), "&left=").concat(parseInt(_this.card.style.left)));
        }

        ;
      }); // Zooming

      this.resize = document.createElement('div');
      this.card.appendChild(this.resize);
      this.resize.style.cssText = 'width: 15px; height: 15px; background-color: green; position: absolute; border-radius: 3px; right: -14px; bottom: -14px';
      this.resize.addEventListener('mousedown', function () {
        if (_this.toResize == false) {
          _this.toResize = true;
        }

        ;
      });
      this.resize.addEventListener('mouseup', function () {
        if (_this.toResize === true) {
          _this.toResize = false;

          var _xhttp2 = new XMLHttpRequest();

          _xhttp2.open('POST', 'Frigo/size', true);

          _xhttp2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

          _xhttp2.send("creator=".concat(_this.cretor, "&identity=").concat(_this.card.id, "&width=").concat(parseInt(_this.card.style.width), "&height=").concat(parseInt(_this.card.style.height)));
        }

        ;
      });
      document.body.addEventListener('mousemove', function (e) {
        if (_this.toMove === true) {
          _this.card.style.left = "".concat(e.clientX - _this.a, "px");
          _this.card.style.top = "".concat(e.clientY - _this.b, "px");
        }

        ;

        if (_this.toResize === true) {
          _this.card.style.width = "".concat(e.clientX - parseInt(getComputedStyle(_this.card).left) - 15, "px");
          _this.card.style.height = "".concat(e.clientY - parseInt(getComputedStyle(_this.card).top) - 15, "px");
        }
      }); // Textbox

      this.textPlace = document.createElement('div');
      this.card.appendChild(this.textPlace);
      this.textPlace.style.cssText = 'position: absolute; top: 3%; left: 2%; padding: 2%; width: 92%; height: 75%; background-color: yellow;';
      this.textPlace.className = 'content';
      this.textPlace.innerHTML = this.content; // TinyMCE

      var existState = false;
      this.card.addEventListener('dblclick', function () {
        if (existState === false) {
          existState = true;
          _this.textEditor = document.createElement('div');
          _this.textEditor.style.width = '100%';
          _this.textEditor.style.height = '80%';
          _this.textEditor.innerHTML = _this.textPlace.innerHTML;
          _this.saveExit = document.createElement('div');
          _this.saveExit.style.width = '100%';
          _this.saveExit.style.height = '20%';
          _this.tinyDestroyButton = document.createElement('div');
          _this.tinyDelete = document.createElement('img');
          _this.tinyDelete.src = 'assets/images/dist/delete.png';
          _this.tinyDelete.style.height = '50px';
          _this.tinyDelete.style.marginTop = '1%';
          _this.tinyDelete.style.marginLeft = '1%';

          _this.tinyDelete.addEventListener('click', function (e) {
            _this.textPlace.innerHTML = tinyMCE.activeEditor.getContent({
              format: 'raw'
            });
            e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
            var xhttp = new XMLHttpRequest();
            xhttp.open('POST', 'Frigo/content', true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send("creator=".concat(_this.cretor, "&identity=").concat(_this.card.id, "&content=").concat(_this.textPlace.innerHTML)); // State of tinyMCE

            existState = false;
          });

          _this.saveExit.appendChild(_this.tinyDelete);

          _this.tinyDestroyButton.appendChild(_this.saveExit);

          _this.tinyDestroyButton.appendChild(_this.textEditor);

          _this.saveExit.className = 'saveExit';
          _this.textEditor.className = 'editor';
          document.body.appendChild(_this.tinyDestroyButton);
          (0, _tinymce.tiny)();
        }

        ;
      }); // Swapping layers

      this.card.addEventListener('click', function () {
        var notes = document.querySelectorAll('.note');

        for (var i = 1; i <= notes.length; i++) {
          document.getElementById(i).style.zIndex = i;
        }

        ;
        document.getElementById(_this.card.id).style.zIndex = notes.length + 1;
      });
    }
  }]);

  return Card;
}();

exports.Card = Card;
;

},{"./tinymce":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tiny = tiny;

function tiny() {
  tinymce.init({
    selector: '.editor',
    inline: false,
    theme_advanced_resizing: true,
    theme_advanced_resizing_use_cookie: false,
    plugins: ['autoresize', 'fullscreen'],
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | fullscreen',
    menubar: true,
    autoresize_max_height: 50,
    autosave_interval: '5s'
  });
}

;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc2NyaXB0cy9zcmMvaW5kZXguanMiLCJhc3NldHMvc2NyaXB0cy9zcmMvbW9kdWxlcy9hbGVydC5qcyIsImFzc2V0cy9zY3JpcHRzL3NyYy9tb2R1bGVzL2NhcmQuanMiLCJhc3NldHMvc2NyaXB0cy9zcmMvbW9kdWxlcy90aW55bWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7QUFFQTtBQUNBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFNO0FBQ3BDLE1BQUksT0FBSjtBQUVBLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIscUJBQXZCLEVBQThDLGdCQUE5QyxDQUErRCxPQUEvRCxFQUF3RSxZQUFNO0FBQzVFLFFBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixFQUF5QyxLQUF0RDtBQUFBLFFBQ0EsTUFBTSxHQUFHLElBQUksTUFBSixDQUFXLGtCQUFYLENBRFQ7O0FBR0EsUUFBSSxJQUFJLEtBQUssRUFBVCxJQUFlLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBWixDQUFuQixFQUFzQztBQUNwQyxNQUFBLFFBQVEsQ0FBQyxJQUFULENBQWMsV0FBZCxDQUEwQixRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBMUI7QUFDQSxNQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCLEVBQXVDLEtBQXZDLENBQTZDLE9BQTdDLEdBQXVELE9BQXZEO0FBQ0EsTUFBQSxLQUFLLENBQUMsSUFBRCxDQUFMO0FBQ0QsS0FKRCxNQUlPLElBQUksSUFBSSxLQUFLLEVBQWIsRUFBaUI7QUFDdkIsTUFBQSxPQUFPLEdBQUcsYUFBTSxNQUFOLENBQWEsMkJBQWIsRUFBMEMsT0FBMUMsQ0FBVjtBQUNBLEtBRk0sTUFFQTtBQUNOLE1BQUEsT0FBTyxHQUFHLGFBQU0sTUFBTixDQUFhLG1DQUFi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LEVBUlo7QUFTWCxJQUFBLGlCQUFpQixFQUFFO0FBVFIsR0FBYjtBQVdEOztBQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgQWxlcnQgfSBmcm9tICcuL21vZHVsZXMvYWxlcnQnO1xuaW1wb3J0IHsgQ2FyZCB9IGZyb20gJy4vbW9kdWxlcy9jYXJkJztcblxuLy8gTWFpbiBzY3JlZW5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICB2YXIgdGltZW91dDtcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1zdWJtaXRdJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgY29uc3QgbmljayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWduLWluLS1uaWNrJykudmFsdWUsXG4gICAgcmVnRXhwID0gbmV3IFJlZ0V4cCgnW2EtekEtWjAtOV9dezQsfScpO1xuXG4gICAgaWYgKG5pY2sgIT09ICcnICYmIHJlZ0V4cC50ZXN0KG5pY2spKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWduLWluLS12aWV3JykpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLS12aWV3Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICBsb2dpbihuaWNrKTtcbiAgICB9IGVsc2UgaWYgKG5pY2sgPT09ICcnKSB7XG4gICAgIHRpbWVvdXQgPSBBbGVydC5jcmVhdGUoJ05pZSBwb2Rhbm8gbmF6d3kgdGFibGljeS4nLCB0aW1lb3V0KTtcbiAgICB9IGVsc2Uge1xuICAgICB0aW1lb3V0ID0gQWxlcnQuY3JlYXRlKCdOYXp3YSB0YWJsaWN5IGplc3QgbmllcHJhd2lkxYJvd2EuJywgdGltZW91dCk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG4vLyBEYXNoYm9hcmRcbmZ1bmN0aW9uIGxvZ2luKG5pY2spIHtcbiAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gIHhodHRwLm9wZW4oJ0dFVCcsIGBGcmlnby91c2Vycy8ke25pY2t9YCwgdHJ1ZSk7XG4gIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh4aHR0cC5yZWFkeVN0YXRlID09PSA0ICYmIHhodHRwLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhodHRwLnJlc3BvbnNlVGV4dClcbiAgICAgIGZvciAobGV0IG5vdGUgb2YgcmVzcG9uc2UpIHtcbiAgICAgICAgbmV3IENhcmQobm90ZS5JZGVudGl0eSwgbmljaywgbm90ZS5XaWR0aCwgbm90ZS5IZWlnaHQsIG5vdGUuVG9wLCBub3RlLkxlZnQsIG5vdGUuQ29udGVudCwgbm90ZS5JbmRleCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHhodHRwLnNlbmQoKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLS1hZGQnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm9hcmQtLWFkZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IGNvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5vdGUnKS5sZW5ndGggKyAxO1xuICAgIG5ldyBDYXJkKGNvdW50LCBuaWNrLCAxNTAsIDE1MCwgMTUwLCAxNTAsICcnLCBjb3VudCwgZmFsc2UpOyBcbiAgfSk7XG59O1xuXG4vLyBSZW1vdmFsXG5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMpOyBcbn07XG4gXG5Ob2RlTGlzdC5wcm90b3R5cGUucmVtb3ZlID0gSFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICBmb3IgKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmICh0aGlzW2ldICYmIHRoaXNbaV0ucGFyZW50RWxlbWVudCkge1xuICAgICAgdGhpc1tpXS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXNbaV0pO1xuICAgIH07XG4gIH07XG59O1xuIiwiZXhwb3J0IGNsYXNzIEFsZXJ0IHtcclxuICBzdGF0aWMgY3JlYXRlKGFsZXJ0LCB0aW1lb3V0KSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lnbi1pbi0tYWxlcnQnKS5pbm5lckhUTUwgPSBhbGVydDtcclxuICBcclxuICAgIGlmICh0aW1lb3V0KSB7XHJcbiAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgfTtcclxuICBcclxuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHsgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZ24taW4tLWFsZXJ0JykuaW5uZXJIVE1MID0gJyc7IH0sIDUwMDApO1xyXG4gICAgcmV0dXJuIHRpbWVvdXQ7XHJcbiAgfTtcclxufTsiLCJpbXBvcnQgeyB0aW55IH0gZnJvbSAnLi90aW55bWNlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXJkIHtcclxuICBjb25zdHJ1Y3RvcihJRCwgY3JldG9yLCB3aWR0aCwgaGVpZ2h0LCB0b3AsIGxlZnQsIGNvbnRlbnQsIGluZGV4LCBleGlzdGVkKSB7XHJcbiAgICB0aGlzLklEID0gSUQ7XHJcbiAgICB0aGlzLmNyZXRvciA9IGNyZXRvcjsgXHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIHRoaXMudG9wID0gdG9wO1xyXG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcclxuICAgIHRoaXMuY29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICB0aGlzLnRvTW92ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy50b1Jlc2l6ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5leGlzdGVkID0gZXhpc3RlZDtcclxuICAgIHRoaXMuY3JlYXRlKGV4aXN0ZWQpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlKGV4aXN0ZWQpIHtcclxuICAgIHRoaXMuY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jYXJkLmNsYXNzTmFtZSA9ICdub3RlJztcclxuICAgIHRoaXMuY2FyZC5pZCA9IHRoaXMuSUQ7XHJcbiAgICB0aGlzLmNhcmQuc3R5bGUudG9wID0gYCR7dGhpcy50b3B9cHhgO1xyXG4gICAgdGhpcy5jYXJkLnN0eWxlLmxlZnQgPSBgJHt0aGlzLmxlZnR9cHhgO1xyXG4gICAgdGhpcy5jYXJkLnN0eWxlLndpZHRoID0gYCR7dGhpcy53aWR0aH1weGA7XHJcbiAgICB0aGlzLmNhcmQuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5oZWlnaHR9cHhgO1xyXG4gICAgdGhpcy5jYXJkLnN0eWxlLnpJbmRleCA9IHRoaXMuaW5kZXg7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY2FyZCk7XHJcblxyXG4gICAgLy8gTmV3IGNhcmQgaW4gZGF0YWJhc2VcclxuICAgIGlmIChleGlzdGVkID09PSBmYWxzZSkge1xyXG4gICAgICBsZXQgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgeGh0dHAub3BlbignUE9TVCcsICdGcmlnby9hZGQnLCB0cnVlKTtcclxuICAgICAgeGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG4gICAgICB4aHR0cC5zZW5kKGBjcmVhdG9yPSR7dGhpcy5jcmV0b3J9JmlkZW50aXR5PSR7dGhpcy5jYXJkLmlkfSZ3aWR0aD0ke3RoaXMud2lkdGh9JmhlaWdodD0ke3RoaXMuaGVpZ2h0fSZ0b3A9JHt0aGlzLnRvcH0mbGVmdD0ke3RoaXMubGVmdH0maW5kZXg9JHt0aGlzLklEfWApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZWxldGUgY2FyZCAoYnV0dG9uKVxyXG4gICAgdGhpcy5kZXN0cm95QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNhcmQuYXBwZW5kQ2hpbGQodGhpcy5kZXN0cm95QnV0dG9uKTtcclxuICAgIHRoaXMuZGVzdHJveUJ1dHRvbi5zdHlsZS5jc3NUZXh0ID0gJ3dpZHRoOiAxNXB4OyBoZWlnaHQ6IDE1cHg7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgYm9yZGVyLXJhZGl1czogM3B4OyB0b3A6IC0xNHB4OyByaWdodDogLTE0cHg7IGJhY2tncm91bmQtY29sb3I6IGJsdWU7JztcclxuXHJcbiAgICB0aGlzLmRlc3Ryb3lCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2FyZC5yZW1vdmUoKTtcclxuICAgICAgdmFyIHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgIHhodHRwLm9wZW4oJ1BPU1QnLCAnRnJpZ28vZGVsZXRlJywgdHJ1ZSk7XHJcbiAgICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcclxuICAgICAgeGh0dHAuc2VuZChgY3JlYXRvcj0ke3RoaXMuY3JldG9yfSZpZGVudGl0eT0ke3RoaXMuY2FyZC5pZH1gKTtcclxuICAgIH0pO1xyXG4gXHJcbiAgICAvLyBNb3ZpbmdcclxuICAgIHRoaXMubW92ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5jYXJkLmFwcGVuZENoaWxkKHRoaXMubW92ZUJ1dHRvbik7XHJcbiAgICB0aGlzLm1vdmVCdXR0b24uc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDogMTAwJTsgaGVpZ2h0OiAyMCU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgYm90dG9tOiAwOyByaWdodDogMDsnO1xyXG5cclxuICAgIHRoaXMubW92ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xyXG4gICAgIGlmICh0aGlzLnRvTW92ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy50b01vdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLmEgPSBlLmNsaWVudFggLSBwYXJzZUludChnZXRDb21wdXRlZFN0eWxlKHRoaXMuY2FyZCkubGVmdCk7XHJcbiAgICAgIHRoaXMuYiA9IGUuY2xpZW50WSAtIHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy5jYXJkKS50b3ApOyAgICAgICAgICBcclxuICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5tb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnRvTW92ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMudG9Nb3ZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGh0dHAub3BlbignUE9TVCcsICdGcmlnby9wb3NpdGlvbicsIHRydWUpO1xyXG4gICAgICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcclxuICAgICAgICB4aHR0cC5zZW5kKGBjcmVhdG9yPSR7dGhpcy5jcmV0b3J9JmlkZW50aXR5PSR7dGhpcy5jYXJkLmlkfSZ0b3A9JHtwYXJzZUludCh0aGlzLmNhcmQuc3R5bGUudG9wKX0mbGVmdD0ke3BhcnNlSW50KHRoaXMuY2FyZC5zdHlsZS5sZWZ0KX1gKTsgIFxyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiBcclxuICAgIC8vIFpvb21pbmdcclxuICAgIHRoaXMucmVzaXplID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNhcmQuYXBwZW5kQ2hpbGQodGhpcy5yZXNpemUpO1xyXG4gICAgdGhpcy5yZXNpemUuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDogMTVweDsgaGVpZ2h0OiAxNXB4OyBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjsgcG9zaXRpb246IGFic29sdXRlOyBib3JkZXItcmFkaXVzOiAzcHg7IHJpZ2h0OiAtMTRweDsgYm90dG9tOiAtMTRweCc7ICBcclxuICBcclxuICAgIHRoaXMucmVzaXplLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMudG9SZXNpemUgPT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLnRvUmVzaXplID0gdHJ1ZTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gXHJcbiAgICB0aGlzLnJlc2l6ZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy50b1Jlc2l6ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMudG9SZXNpemUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHR0cC5vcGVuKCdQT1NUJywgJ0ZyaWdvL3NpemUnLCB0cnVlKTtcclxuICAgICAgICB4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XHJcbiAgICAgICAgeGh0dHAuc2VuZChgY3JlYXRvcj0ke3RoaXMuY3JldG9yfSZpZGVudGl0eT0ke3RoaXMuY2FyZC5pZH0md2lkdGg9JHtwYXJzZUludCh0aGlzLmNhcmQuc3R5bGUud2lkdGgpfSZoZWlnaHQ9JHtwYXJzZUludCh0aGlzLmNhcmQuc3R5bGUuaGVpZ2h0KX1gKTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcclxuICAgICAgaWYgKHRoaXMudG9Nb3ZlID09PSB0cnVlKSB7ICAgIFxyXG4gICAgICAgIHRoaXMuY2FyZC5zdHlsZS5sZWZ0ID0gYCR7ZS5jbGllbnRYIC0gdGhpcy5hfXB4YDtcclxuICAgICAgICB0aGlzLmNhcmQuc3R5bGUudG9wID0gYCR7ZS5jbGllbnRZIC0gdGhpcy5ifXB4YDtcclxuICAgICAgfTtcclxuIFxyXG4gICAgICBpZiAodGhpcy50b1Jlc2l6ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuY2FyZC5zdHlsZS53aWR0aCA9IGAke2UuY2xpZW50WCAtIHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy5jYXJkKS5sZWZ0KSAtIDE1fXB4YDtcclxuICAgICAgICB0aGlzLmNhcmQuc3R5bGUuaGVpZ2h0ID0gYCR7ZS5jbGllbnRZIC0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmNhcmQpLnRvcCkgLSAxNX1weGA7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFRleHRib3hcclxuICAgIHRoaXMudGV4dFBsYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNhcmQuYXBwZW5kQ2hpbGQodGhpcy50ZXh0UGxhY2UpO1xyXG4gICAgdGhpcy50ZXh0UGxhY2Uuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMyU7IGxlZnQ6IDIlOyBwYWRkaW5nOiAyJTsgd2lkdGg6IDkyJTsgaGVpZ2h0OiA3NSU7IGJhY2tncm91bmQtY29sb3I6IHllbGxvdzsnO1xyXG4gICAgdGhpcy50ZXh0UGxhY2UuY2xhc3NOYW1lID0gJ2NvbnRlbnQnO1xyXG4gICAgdGhpcy50ZXh0UGxhY2UuaW5uZXJIVE1MID0gdGhpcy5jb250ZW50O1xyXG4gICBcclxuICAgIC8vIFRpbnlNQ0VcclxuICAgIHZhciBleGlzdFN0YXRlID0gZmFsc2U7XHJcbiAgICB0aGlzLmNhcmQuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGlmIChleGlzdFN0YXRlID09PSBmYWxzZSkge1xyXG4gICAgICAgIGV4aXN0U3RhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudGV4dEVkaXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMudGV4dEVkaXRvci5zdHlsZS53aWR0aCA9ICcxMDAlJztcclxuICAgICAgICB0aGlzLnRleHRFZGl0b3Iuc3R5bGUuaGVpZ2h0ID0gJzgwJSc7XHJcbiAgICAgICAgdGhpcy50ZXh0RWRpdG9yLmlubmVySFRNTCA9IHRoaXMudGV4dFBsYWNlLmlubmVySFRNTDtcclxuICAgICAgICB0aGlzLnNhdmVFeGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5zYXZlRXhpdC5zdHlsZS53aWR0aCA9ICcxMDAlJztcclxuICAgICAgICB0aGlzLnNhdmVFeGl0LnN0eWxlLmhlaWdodCA9ICcyMCUnO1xyXG4gICAgICAgIHRoaXMudGlueURlc3Ryb3lCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLnRpbnlEZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICB0aGlzLnRpbnlEZWxldGUuc3JjID0gJ2Fzc2V0cy9pbWFnZXMvZGlzdC9kZWxldGUucG5nJztcclxuICAgICAgICB0aGlzLnRpbnlEZWxldGUuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xyXG4gICAgICAgIHRoaXMudGlueURlbGV0ZS5zdHlsZS5tYXJnaW5Ub3AgPSAnMSUnO1xyXG4gICAgICAgIHRoaXMudGlueURlbGV0ZS5zdHlsZS5tYXJnaW5MZWZ0ID0gJzElJztcclxuXHJcbiAgICAgICAgdGhpcy50aW55RGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgIHRoaXMudGV4dFBsYWNlLmlubmVySFRNTCA9IHRpbnlNQ0UuYWN0aXZlRWRpdG9yLmdldENvbnRlbnQoeyBmb3JtYXQ6ICdyYXcnIH0pXHJcbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUpO1xyXG4gICAgICAgICAgbGV0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICB4aHR0cC5vcGVuKCdQT1NUJywgJ0ZyaWdvL2NvbnRlbnQnLCB0cnVlKTtcclxuICAgICAgICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcclxuICAgICAgICAgIHhodHRwLnNlbmQoYGNyZWF0b3I9JHt0aGlzLmNyZXRvcn0maWRlbnRpdHk9JHt0aGlzLmNhcmQuaWR9JmNvbnRlbnQ9JHt0aGlzLnRleHRQbGFjZS5pbm5lckhUTUx9YCk7XHJcbiAgICAgICAgICAvLyBTdGF0ZSBvZiB0aW55TUNFXHJcbiAgICAgICAgICBleGlzdFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2F2ZUV4aXQuYXBwZW5kQ2hpbGQodGhpcy50aW55RGVsZXRlKVxyXG4gICAgICAgIHRoaXMudGlueURlc3Ryb3lCdXR0b24uYXBwZW5kQ2hpbGQodGhpcy5zYXZlRXhpdClcclxuICAgICAgICB0aGlzLnRpbnlEZXN0cm95QnV0dG9uLmFwcGVuZENoaWxkKHRoaXMudGV4dEVkaXRvcilcclxuICAgICAgICB0aGlzLnNhdmVFeGl0LmNsYXNzTmFtZSA9ICdzYXZlRXhpdCc7XHJcbiAgICAgICAgdGhpcy50ZXh0RWRpdG9yLmNsYXNzTmFtZSA9ICdlZGl0b3InO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50aW55RGVzdHJveUJ1dHRvbik7XHJcbiAgICAgICAgdGlueSgpO1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3dhcHBpbmcgbGF5ZXJzXHJcbiAgICB0aGlzLmNhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIHZhciBub3RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3RlJyk7XHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IG5vdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaSkuc3R5bGUuekluZGV4ID0gaTtcclxuICAgICAgfTtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5jYXJkLmlkKS5zdHlsZS56SW5kZXggPSBub3Rlcy5sZW5ndGggKyAxO1xyXG4gICAgfSk7XHJcbiAgfTtcclxufTsiLCJleHBvcnQgZnVuY3Rpb24gdGlueSgpIHtcclxuICB0aW55bWNlLmluaXQoe1xyXG4gICAgc2VsZWN0b3I6ICcuZWRpdG9yJyxcclxuICAgIGlubGluZTogZmFsc2UsXHJcbiAgICB0aGVtZV9hZHZhbmNlZF9yZXNpemluZzogdHJ1ZSxcclxuICAgIHRoZW1lX2FkdmFuY2VkX3Jlc2l6aW5nX3VzZV9jb29raWU6IGZhbHNlLFxyXG4gICAgcGx1Z2luczogWydhdXRvcmVzaXplJywgJ2Z1bGxzY3JlZW4nXSxcclxuICAgIHRvb2xiYXI6ICdpbnNlcnRmaWxlIHVuZG8gcmVkbyB8IHN0eWxlc2VsZWN0IHwgYm9sZCBpdGFsaWMgfCBhbGlnbmxlZnQgYWxpZ25jZW50ZXIgYWxpZ25yaWdodCBhbGlnbmp1c3RpZnkgfCBidWxsaXN0IG51bWxpc3Qgb3V0ZGVudCBpbmRlbnQgfCBmdWxsc2NyZWVuJyxcclxuICAgIG1lbnViYXI6IHRydWUsXHJcbiAgICBhdXRvcmVzaXplX21heF9oZWlnaHQ6IDUwLFxyXG4gICAgYXV0b3NhdmVfaW50ZXJ2YWw6ICc1cydcclxuICB9KTtcclxufTsiXX0=
