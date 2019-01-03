import { Alert } from './modules/alert';
import { Card } from './modules/card';

// Main screen
window.addEventListener('load', () => {
  var timeout;

  document.querySelector('button[type=submit]').addEventListener('click', () => {
    const nick = document.querySelector('.sign-in--nick').value,
    regExp = new RegExp('[a-zA-Z0-9_]{4,}');

    if (nick !== '' && regExp.test(nick)) {
      document.body.removeChild(document.querySelector('.sign-in--view'));
      document.querySelector('.board--view').style.display = 'block';
      login(nick);
    } else if (nick === '') {
     timeout = Alert.create('Nie podano nazwy tablicy.', timeout);
    } else {
     timeout = Alert.create('Nazwa tablicy jest nieprawidłowa.', timeout);
    }
  });
});

// Dashboard
function login(nick) {
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', `Frigo/users/${nick}`, true);
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      let response = JSON.parse(xhttp.responseText)
      for (let note of response) {
        new Card(note.Identity, nick, note.Width, note.Height, note.Top, note.Left, note.Content, note.Index, true);
      }
    }
  }
  xhttp.send();
  document.querySelector('.board--add').style.display = 'block';

  document.querySelector('.board--add').addEventListener('click', () => {
    const count = document.querySelectorAll('.note').length + 1;
    new Card(count, nick, 150, 150, 150, 150, '', count, false); 
  });
};

// Removal
Element.prototype.remove = function() {
  this.parentElement.removeChild(this); 
};
 
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    };
  };
};
