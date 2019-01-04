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
      this.destroyButton.className = 'destroy--button';
      this.card.appendChild(this.destroyButton);
      this.destroyButton.style.cssText = 'width: 15px; height: 15px; position: absolute; border-radius: 3px; top: -14px; right: -14px; background-color: blue;';
      this.destroyButton.addEventListener('click', function () {
        _this.card.remove();

        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'Frigo/delete', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send("creator=".concat(_this.cretor, "&identity=").concat(_this.ID));
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
      this.resize.className = 'resize--button';
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

      this.card.addEventListener('click', function (e) {
        var classes_of_buttons = ['resize--button', 'destroy--button'];

        if (classes_of_buttons.indexOf(e.target.className) == -1) {
          var notes = document.querySelectorAll('.note');

          for (var i = 1; i <= notes.length; i++) {
            document.getElementById(i).style.zIndex = i;
          }

          ;
          document.getElementById(_this.card.id).style.zIndex = notes.length + 1;
        }

        ;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc2NyaXB0cy9zcmMvaW5kZXguanMiLCJhc3NldHMvc2NyaXB0cy9zcmMvbW9kdWxlcy9hbGVydC5qcyIsImFzc2V0cy9zY3JpcHRzL3NyYy9tb2R1bGVzL2NhcmQuanMiLCJhc3NldHMvc2NyaXB0cy9zcmMvbW9kdWxlcy90aW55bWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFDQTs7QUFFQTtBQUNBLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxZQUFNO0FBQ3BDLE1BQUksT0FBSjtBQUVBLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIscUJBQXZCLEVBQThDLGdCQUE5QyxDQUErRCxPQUEvRCxFQUF3RSxZQUFNO0FBQzVFLFFBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixFQUF5QyxLQUF0RDtBQUFBLFFBQ0EsTUFBTSxHQUFHLElBQUksTUFBSixDQUFXLGtCQUFYLENBRFQ7O0FBR0EsUUFBSSxJQUFJLEtBQUssRUFBVCxJQUFlLE1BQU0sQ0FBQyxJQUFQLENBQVksSUFBWixDQUFuQixFQUFzQztBQUNwQyxNQUFBLFFBQVEsQ0FBQyxJQUFULENBQWMsV0FBZCxDQUEwQixRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBdkIsQ0FBMUI7QUFDQSxNQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCLEVBQXVDLEtBQXZDLENBQTZDLE9BQTdDLEdBQXVELE9BQXZEO0FBQ0EsTUFBQSxLQUFLLENBQUMsSUFBRCxDQUFMO0FBQ0QsS0FKRCxNQUlPLElBQUksSUFBSSxLQUFLLEVBQWIsRUFBaUI7QUFDdkIsTUFBQSxPQUFPLEdBQUcsYUFBTSxNQUFOLENBQWEsMkJBQWIsRUFBMEMsT0FBMUMsQ0FBVjtBQUNBLEtBRk0sTUFFQTtBQUNOLE1BQUEsT0FBTyxHQUFHLGFBQU0sTUFBTixDQUFhLG1DQUFi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QUFhO0FBQ1gsSUFBQSxRQUFRLEVBQUUsU0FEQztBQUVYLElBQUEsTUFBTSxFQUFFLEtBRkc7QUFHWCxJQUFBLHVCQUF1QixFQUFFLElBSGQ7QUFJWCxJQUFBLGtDQUFrQyxFQUFFLEtBSnpCO0FBS1gsSUFBQSxPQUFPLEVBQUUsQ0FBQyxZQUFELEVBQWUsWUFBZixDQUxFO0FBTVgsSUFBQSxPQUFPLEVBQUUsZ0pBTkU7QUFPWCxJQUFBLE9BQU8sRUFBRSxJQVBFO0FBUVgsSUFBQSxxQkFBcUIsRUFBRSxFQVJaO0FBU1gsSUFBQSxpQkFBaUIsRUFBRTtBQVRSLEdBQWI7QUFXRDs7QUFBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCB7IEFsZXJ0IH0gZnJvbSAnLi9tb2R1bGVzL2FsZXJ0JztcbmltcG9ydCB7IENhcmQgfSBmcm9tICcuL21vZHVsZXMvY2FyZCc7XG5cbi8vIE1haW4gc2NyZWVuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgdmFyIHRpbWVvdXQ7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9c3VibWl0XScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGNvbnN0IG5pY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lnbi1pbi0tbmljaycpLnZhbHVlLFxuICAgIHJlZ0V4cCA9IG5ldyBSZWdFeHAoJ1thLXpBLVowLTlfXXs0LH0nKTtcblxuICAgIGlmIChuaWNrICE9PSAnJyAmJiByZWdFeHAudGVzdChuaWNrKSkge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lnbi1pbi0tdmlldycpKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC0tdmlldycpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgbG9naW4obmljayk7XG4gICAgfSBlbHNlIGlmIChuaWNrID09PSAnJykge1xuICAgICB0aW1lb3V0ID0gQWxlcnQuY3JlYXRlKCdOaWUgcG9kYW5vIG5hend5IHRhYmxpY3kuJywgdGltZW91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgdGltZW91dCA9IEFsZXJ0LmNyZWF0ZSgnTmF6d2EgdGFibGljeSBqZXN0IG5pZXByYXdpZMWCb3dhLicsIHRpbWVvdXQpO1xuICAgIH1cbiAgfSk7XG59KTtcblxuLy8gRGFzaGJvYXJkXG5mdW5jdGlvbiBsb2dpbihuaWNrKSB7XG4gIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB4aHR0cC5vcGVuKCdHRVQnLCBgRnJpZ28vdXNlcnMvJHtuaWNrfWAsIHRydWUpO1xuICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoeGh0dHAucmVhZHlTdGF0ZSA9PT0gNCAmJiB4aHR0cC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgbGV0IHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHR0cC5yZXNwb25zZVRleHQpXG4gICAgICBmb3IgKGxldCBub3RlIG9mIHJlc3BvbnNlKSB7XG4gICAgICAgIG5ldyBDYXJkKG5vdGUuSWRlbnRpdHksIG5pY2ssIG5vdGUuV2lkdGgsIG5vdGUuSGVpZ2h0LCBub3RlLlRvcCwgbm90ZS5MZWZ0LCBub3RlLkNvbnRlbnQsIG5vdGUuSW5kZXgsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB4aHR0cC5zZW5kKCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC0tYWRkJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJvYXJkLS1hZGQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBjb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ub3RlJykubGVuZ3RoICsgMTtcbiAgICBuZXcgQ2FyZChjb3VudCwgbmljaywgMTUwLCAxNTAsIDE1MCwgMTUwLCAnJywgY291bnQsIGZhbHNlKTsgXG4gIH0pO1xufTtcblxuLy8gUmVtb3ZhbFxuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzKTsgXG59O1xuIFxuTm9kZUxpc3QucHJvdG90eXBlLnJlbW92ZSA9IEhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgZm9yICh2YXIgaSA9IHRoaXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBpZiAodGhpc1tpXSAmJiB0aGlzW2ldLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgIHRoaXNbaV0ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzW2ldKTtcbiAgICB9O1xuICB9O1xufTtcbiIsImV4cG9ydCBjbGFzcyBBbGVydCB7XHJcbiAgc3RhdGljIGNyZWF0ZShhbGVydCwgdGltZW91dCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZ24taW4tLWFsZXJ0JykuaW5uZXJIVE1MID0gYWxlcnQ7XHJcbiAgXHJcbiAgICBpZiAodGltZW91dCkge1xyXG4gICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuICAgIH07XHJcbiAgXHJcbiAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWduLWluLS1hbGVydCcpLmlubmVySFRNTCA9ICcnOyB9LCA1MDAwKTtcclxuICAgIHJldHVybiB0aW1lb3V0O1xyXG4gIH07XHJcbn07IiwiaW1wb3J0IHsgdGlueSB9IGZyb20gJy4vdGlueW1jZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IoSUQsIGNyZXRvciwgd2lkdGgsIGhlaWdodCwgdG9wLCBsZWZ0LCBjb250ZW50LCBpbmRleCwgZXhpc3RlZCkge1xyXG4gICAgdGhpcy5JRCA9IElEO1xyXG4gICAgdGhpcy5jcmV0b3IgPSBjcmV0b3I7IFxyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLnRvcCA9IHRvcDtcclxuICAgIHRoaXMubGVmdCA9IGxlZnQ7XHJcbiAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xyXG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgdGhpcy50b01vdmUgPSBmYWxzZTtcclxuICAgIHRoaXMudG9SZXNpemUgPSBmYWxzZTtcclxuICAgIHRoaXMuZXhpc3RlZCA9IGV4aXN0ZWQ7XHJcbiAgICB0aGlzLmNyZWF0ZShleGlzdGVkKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZShleGlzdGVkKSB7XHJcbiAgICB0aGlzLmNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMuY2FyZC5jbGFzc05hbWUgPSAnbm90ZSc7XHJcbiAgICB0aGlzLmNhcmQuaWQgPSB0aGlzLklEO1xyXG4gICAgdGhpcy5jYXJkLnN0eWxlLnRvcCA9IGAke3RoaXMudG9wfXB4YDtcclxuICAgIHRoaXMuY2FyZC5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5sZWZ0fXB4YDtcclxuICAgIHRoaXMuY2FyZC5zdHlsZS53aWR0aCA9IGAke3RoaXMud2lkdGh9cHhgO1xyXG4gICAgdGhpcy5jYXJkLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuaGVpZ2h0fXB4YDtcclxuICAgIHRoaXMuY2FyZC5zdHlsZS56SW5kZXggPSB0aGlzLmluZGV4O1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNhcmQpO1xyXG5cclxuICAgIC8vIE5ldyBjYXJkIGluIGRhdGFiYXNlXHJcbiAgICBpZiAoZXhpc3RlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgbGV0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgIHhodHRwLm9wZW4oJ1BPU1QnLCAnRnJpZ28vYWRkJywgdHJ1ZSk7XHJcbiAgICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcclxuICAgICAgeGh0dHAuc2VuZChgY3JlYXRvcj0ke3RoaXMuY3JldG9yfSZpZGVudGl0eT0ke3RoaXMuY2FyZC5pZH0md2lkdGg9JHt0aGlzLndpZHRofSZoZWlnaHQ9JHt0aGlzLmhlaWdodH0mdG9wPSR7dGhpcy50b3B9JmxlZnQ9JHt0aGlzLmxlZnR9JmluZGV4PSR7dGhpcy5JRH1gKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRGVsZXRlIGNhcmQgKGJ1dHRvbilcclxuICAgIHRoaXMuZGVzdHJveUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5kZXN0cm95QnV0dG9uLmNsYXNzTmFtZSA9ICdkZXN0cm95LS1idXR0b24nO1xyXG4gICAgdGhpcy5jYXJkLmFwcGVuZENoaWxkKHRoaXMuZGVzdHJveUJ1dHRvbik7XHJcbiAgICB0aGlzLmRlc3Ryb3lCdXR0b24uc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDogMTVweDsgaGVpZ2h0OiAxNXB4OyBwb3NpdGlvbjogYWJzb2x1dGU7IGJvcmRlci1yYWRpdXM6IDNweDsgdG9wOiAtMTRweDsgcmlnaHQ6IC0xNHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlOyc7XHJcblxyXG4gICAgdGhpcy5kZXN0cm95QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICB0aGlzLmNhcmQucmVtb3ZlKCk7XHJcbiAgICAgIHZhciB4aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICB4aHR0cC5vcGVuKCdQT1NUJywgJ0ZyaWdvL2RlbGV0ZScsIHRydWUpO1xyXG4gICAgICB4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XHJcbiAgICAgIHhodHRwLnNlbmQoYGNyZWF0b3I9JHt0aGlzLmNyZXRvcn0maWRlbnRpdHk9JHt0aGlzLklEfWApO1xyXG4gICAgfSk7XHJcbiBcclxuICAgIC8vIE1vdmluZ1xyXG4gICAgdGhpcy5tb3ZlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNhcmQuYXBwZW5kQ2hpbGQodGhpcy5tb3ZlQnV0dG9uKTtcclxuICAgIHRoaXMubW92ZUJ1dHRvbi5zdHlsZS5jc3NUZXh0ID0gJ3dpZHRoOiAxMDAlOyBoZWlnaHQ6IDIwJTsgcG9zaXRpb246IGFic29sdXRlOyBib3R0b206IDA7IHJpZ2h0OiAwOyc7XHJcblxyXG4gICAgdGhpcy5tb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XHJcbiAgICAgaWYgKHRoaXMudG9Nb3ZlID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLnRvTW92ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMuYSA9IGUuY2xpZW50WCAtIHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy5jYXJkKS5sZWZ0KTtcclxuICAgICAgdGhpcy5iID0gZS5jbGllbnRZIC0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmNhcmQpLnRvcCk7ICAgICAgICAgIFxyXG4gICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm1vdmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMudG9Nb3ZlID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy50b01vdmUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHR0cC5vcGVuKCdQT1NUJywgJ0ZyaWdvL3Bvc2l0aW9uJywgdHJ1ZSk7XHJcbiAgICAgICAgeGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG4gICAgICAgIHhodHRwLnNlbmQoYGNyZWF0b3I9JHt0aGlzLmNyZXRvcn0maWRlbnRpdHk9JHt0aGlzLmNhcmQuaWR9JnRvcD0ke3BhcnNlSW50KHRoaXMuY2FyZC5zdHlsZS50b3ApfSZsZWZ0PSR7cGFyc2VJbnQodGhpcy5jYXJkLnN0eWxlLmxlZnQpfWApOyAgXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuIFxyXG4gICAgLy8gWm9vbWluZ1xyXG4gICAgdGhpcy5yZXNpemUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMucmVzaXplLmNsYXNzTmFtZSA9ICdyZXNpemUtLWJ1dHRvbic7XHJcbiAgICB0aGlzLmNhcmQuYXBwZW5kQ2hpbGQodGhpcy5yZXNpemUpO1xyXG4gICAgdGhpcy5yZXNpemUuc3R5bGUuY3NzVGV4dCA9ICd3aWR0aDogMTVweDsgaGVpZ2h0OiAxNXB4OyBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjsgcG9zaXRpb246IGFic29sdXRlOyBib3JkZXItcmFkaXVzOiAzcHg7IHJpZ2h0OiAtMTRweDsgYm90dG9tOiAtMTRweCc7ICBcclxuICBcclxuICAgIHRoaXMucmVzaXplLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMudG9SZXNpemUgPT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLnRvUmVzaXplID0gdHJ1ZTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gXHJcbiAgICB0aGlzLnJlc2l6ZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy50b1Jlc2l6ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMudG9SZXNpemUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHR0cC5vcGVuKCdQT1NUJywgJ0ZyaWdvL3NpemUnLCB0cnVlKTtcclxuICAgICAgICB4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XHJcbiAgICAgICAgeGh0dHAuc2VuZChgY3JlYXRvcj0ke3RoaXMuY3JldG9yfSZpZGVudGl0eT0ke3RoaXMuY2FyZC5pZH0md2lkdGg9JHtwYXJzZUludCh0aGlzLmNhcmQuc3R5bGUud2lkdGgpfSZoZWlnaHQ9JHtwYXJzZUludCh0aGlzLmNhcmQuc3R5bGUuaGVpZ2h0KX1gKTtcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcclxuICAgICAgaWYgKHRoaXMudG9Nb3ZlID09PSB0cnVlKSB7ICAgIFxyXG4gICAgICAgIHRoaXMuY2FyZC5zdHlsZS5sZWZ0ID0gYCR7ZS5jbGllbnRYIC0gdGhpcy5hfXB4YDtcclxuICAgICAgICB0aGlzLmNhcmQuc3R5bGUudG9wID0gYCR7ZS5jbGllbnRZIC0gdGhpcy5ifXB4YDtcclxuICAgICAgfTtcclxuIFxyXG4gICAgICBpZiAodGhpcy50b1Jlc2l6ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMuY2FyZC5zdHlsZS53aWR0aCA9IGAke2UuY2xpZW50WCAtIHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUodGhpcy5jYXJkKS5sZWZ0KSAtIDE1fXB4YDtcclxuICAgICAgICB0aGlzLmNhcmQuc3R5bGUuaGVpZ2h0ID0gYCR7ZS5jbGllbnRZIC0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmNhcmQpLnRvcCkgLSAxNX1weGA7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFRleHRib3hcclxuICAgIHRoaXMudGV4dFBsYWNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLmNhcmQuYXBwZW5kQ2hpbGQodGhpcy50ZXh0UGxhY2UpO1xyXG4gICAgdGhpcy50ZXh0UGxhY2Uuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMyU7IGxlZnQ6IDIlOyBwYWRkaW5nOiAyJTsgd2lkdGg6IDkyJTsgaGVpZ2h0OiA3NSU7IGJhY2tncm91bmQtY29sb3I6IHllbGxvdzsnO1xyXG4gICAgdGhpcy50ZXh0UGxhY2UuY2xhc3NOYW1lID0gJ2NvbnRlbnQnO1xyXG4gICAgdGhpcy50ZXh0UGxhY2UuaW5uZXJIVE1MID0gdGhpcy5jb250ZW50O1xyXG4gICBcclxuICAgIC8vIFRpbnlNQ0VcclxuICAgIHZhciBleGlzdFN0YXRlID0gZmFsc2U7XHJcbiAgICB0aGlzLmNhcmQuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGlmIChleGlzdFN0YXRlID09PSBmYWxzZSkge1xyXG4gICAgICAgIGV4aXN0U3RhdGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudGV4dEVkaXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMudGV4dEVkaXRvci5zdHlsZS53aWR0aCA9ICcxMDAlJztcclxuICAgICAgICB0aGlzLnRleHRFZGl0b3Iuc3R5bGUuaGVpZ2h0ID0gJzgwJSc7XHJcbiAgICAgICAgdGhpcy50ZXh0RWRpdG9yLmlubmVySFRNTCA9IHRoaXMudGV4dFBsYWNlLmlubmVySFRNTDtcclxuICAgICAgICB0aGlzLnNhdmVFeGl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5zYXZlRXhpdC5zdHlsZS53aWR0aCA9ICcxMDAlJztcclxuICAgICAgICB0aGlzLnNhdmVFeGl0LnN0eWxlLmhlaWdodCA9ICcyMCUnO1xyXG4gICAgICAgIHRoaXMudGlueURlc3Ryb3lCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLnRpbnlEZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICB0aGlzLnRpbnlEZWxldGUuc3JjID0gJ2Fzc2V0cy9pbWFnZXMvZGlzdC9kZWxldGUucG5nJztcclxuICAgICAgICB0aGlzLnRpbnlEZWxldGUuc3R5bGUuaGVpZ2h0ID0gJzUwcHgnO1xyXG4gICAgICAgIHRoaXMudGlueURlbGV0ZS5zdHlsZS5tYXJnaW5Ub3AgPSAnMSUnO1xyXG4gICAgICAgIHRoaXMudGlueURlbGV0ZS5zdHlsZS5tYXJnaW5MZWZ0ID0gJzElJztcclxuXHJcbiAgICAgICAgdGhpcy50aW55RGVsZXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgIHRoaXMudGV4dFBsYWNlLmlubmVySFRNTCA9IHRpbnlNQ0UuYWN0aXZlRWRpdG9yLmdldENvbnRlbnQoeyBmb3JtYXQ6ICdyYXcnIH0pXHJcbiAgICAgICAgICBlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUpO1xyXG4gICAgICAgICAgbGV0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICB4aHR0cC5vcGVuKCdQT1NUJywgJ0ZyaWdvL2NvbnRlbnQnLCB0cnVlKTtcclxuICAgICAgICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcclxuICAgICAgICAgIHhodHRwLnNlbmQoYGNyZWF0b3I9JHt0aGlzLmNyZXRvcn0maWRlbnRpdHk9JHt0aGlzLmNhcmQuaWR9JmNvbnRlbnQ9JHt0aGlzLnRleHRQbGFjZS5pbm5lckhUTUx9YCk7XHJcbiAgICAgICAgICAvLyBTdGF0ZSBvZiB0aW55TUNFXHJcbiAgICAgICAgICBleGlzdFN0YXRlID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2F2ZUV4aXQuYXBwZW5kQ2hpbGQodGhpcy50aW55RGVsZXRlKVxyXG4gICAgICAgIHRoaXMudGlueURlc3Ryb3lCdXR0b24uYXBwZW5kQ2hpbGQodGhpcy5zYXZlRXhpdClcclxuICAgICAgICB0aGlzLnRpbnlEZXN0cm95QnV0dG9uLmFwcGVuZENoaWxkKHRoaXMudGV4dEVkaXRvcilcclxuICAgICAgICB0aGlzLnNhdmVFeGl0LmNsYXNzTmFtZSA9ICdzYXZlRXhpdCc7XHJcbiAgICAgICAgdGhpcy50ZXh0RWRpdG9yLmNsYXNzTmFtZSA9ICdlZGl0b3InO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50aW55RGVzdHJveUJ1dHRvbik7XHJcbiAgICAgICAgdGlueSgpO1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3dhcHBpbmcgbGF5ZXJzXHJcbiAgICB0aGlzLmNhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBjb25zdCBjbGFzc2VzX29mX2J1dHRvbnMgPSBbJ3Jlc2l6ZS0tYnV0dG9uJywgJ2Rlc3Ryb3ktLWJ1dHRvbiddO1xyXG5cclxuICAgICAgaWYgKGNsYXNzZXNfb2ZfYnV0dG9ucy5pbmRleE9mKGUudGFyZ2V0LmNsYXNzTmFtZSkgIT0gLTEpIHtcclxuICAgICAgICBsZXQgbm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubm90ZScpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IG5vdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpKS5zdHlsZS56SW5kZXggPSBpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5jYXJkLmlkKS5zdHlsZS56SW5kZXggPSBub3Rlcy5sZW5ndGggKyAxO1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfTtcclxufTsiLCJleHBvcnQgZnVuY3Rpb24gdGlueSgpIHtcclxuICB0aW55bWNlLmluaXQoe1xyXG4gICAgc2VsZWN0b3I6ICcuZWRpdG9yJyxcclxuICAgIGlubGluZTogZmFsc2UsXHJcbiAgICB0aGVtZV9hZHZhbmNlZF9yZXNpemluZzogdHJ1ZSxcclxuICAgIHRoZW1lX2FkdmFuY2VkX3Jlc2l6aW5nX3VzZV9jb29raWU6IGZhbHNlLFxyXG4gICAgcGx1Z2luczogWydhdXRvcmVzaXplJywgJ2Z1bGxzY3JlZW4nXSxcclxuICAgIHRvb2xiYXI6ICdpbnNlcnRmaWxlIHVuZG8gcmVkbyB8IHN0eWxlc2VsZWN0IHwgYm9sZCBpdGFsaWMgfCBhbGlnbmxlZnQgYWxpZ25jZW50ZXIgYWxpZ25yaWdodCBhbGlnbmp1c3RpZnkgfCBidWxsaXN0IG51bWxpc3Qgb3V0ZGVudCBpbmRlbnQgfCBmdWxsc2NyZWVuJyxcclxuICAgIG1lbnViYXI6IHRydWUsXHJcbiAgICBhdXRvcmVzaXplX21heF9oZWlnaHQ6IDUwLFxyXG4gICAgYXV0b3NhdmVfaW50ZXJ2YWw6ICc1cydcclxuICB9KTtcclxufTsiXX0=
