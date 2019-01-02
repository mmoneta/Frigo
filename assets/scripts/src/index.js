// VARIABLES
var nick, toMove, toResize, notes = new Array();

function createAlert(alert, timeout) {
  document.querySelector('.sign-in--alert').innerHTML = alert;

  if (timeout) {
   clearTimeout(timeout);
   console.log('s');
  };

  timeout = setTimeout(() => { document.querySelector('.sign-in--alert').innerHTML = ''; }, 5000);
  return timeout;
};

// Main screen
window.addEventListener('load', () => {
  var regExp = new RegExp('[a-zA-Z0-9]{4,}'), timeout;

  document.querySelector('button[type=submit]').addEventListener('click', () => {
    nick = document.querySelector('.sign-in--nick').value;

    if (nick !== '' && regExp.test(nick)) {
      document.body.removeChild(document.querySelector('.sign-in--view'));
      document.querySelector('.board--view').style.display = 'block';
      login(nick);
    } else if (nick === '') {
     timeout = createAlert('Nie podano nazwy tablicy.', timeout);
    } else {
     timeout = createAlert('Nie podano nazwy tablicy.', timeout);
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
        notes.push(new card(note.Identity, note.Width, note.Height, note.Top, note.Left, note.Content, true));
      }
    }
  }
  xhttp.send();
  document.querySelector('.board--add').style.display = 'block';
  document.querySelector('.board--add').addEventListener('click', () => { notes.push(new card(notes.length + 1, 150, 150, 150, 150, '', notes.length + 1, false)); })
}

class card {
  constructor(ID, width, height, top, left, content, existed) {
    this.ID = ID;
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
    this.content = content;
    this.toMove = false;
    this.toResize = false;
    this.create(existed);
  }

  create(existed) {
    this.card = document.createElement('div');
    this.card.className = 'note';
    this.card.style.top = `${this.top}px`;
    this.card.style.left = `${this.left}px`;
    this.card.style.width = `${this.width}px`;
    this.card.style.height = `${this.height}px`;
    document.body.appendChild(this.card);
    this.card.id = this.ID;

    // New card in database
    if (existed === false) {
      let xhttp = new XMLHttpRequest();
      xhttp.open('GET', `/add/${nick}/${this.ID}/${this.width}/${this.height}/${this.top}/${this.left}/${this.ID}`, true);
      xhttp.send();
    };

    // Delete card (button)
    this.destroyButton = document.createElement('div');
    this.card.appendChild(this.destroyButton);
    this.destroyButton.style.cssText = 'width: 15px; height: 15px; position: absolute; top: -15px; right: -15px; background-color: blue;';

    this.destroyButton.addEventListener('click', () => {
      this.card.remove();
      var xhttp = new XMLHttpRequest();
      xhttp.open(`GET`, `Frigo/delete/${nick}/${this.card.id}`, true);
      xhttp.send();
      delete notes[this.ID]
    });
 
    // Moving
    this.moveButton = document.createElement('div');
    this.card.appendChild(this.moveButton);
    this.moveButton.style.cssText = 'width: 100%; height: 20%; position: absolute; bottom: 0; right: 0;';

    this.moveButton.addEventListener('mousedown', (e) => {
     if (this.toMove === false) {
      this.toMove = true;
      this.a = e.clientX - parseInt(getComputedStyle(this.card).left);
      this.b = e.clientY - parseInt(getComputedStyle(this.card).top);          
     };
    });

    this.moveButton.addEventListener('mouseup', () => {
      if (this.toMove === true) {
        this.toMove = false;
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', `Frigo/position/${nick}/${this.card.id}/${parseInt(this.card.style.top)}/${parseInt(this.card.style.left)}`, true);
        xhttp.send();
      };
    });
 
    // Zooming
    this.resize = document.createElement('div');
    this.card.appendChild(this.resize);
    this.resize.style.cssText = 'width: 15px; height: 15px; background-color: green; position: absolute; right: -15px; bottom: -15px';  
  
    this.resize.addEventListener('mousedown', () => {
      if (this.toResize == false) {
        this.toResize = true;
      };
    });
 
    this.resize.addEventListener('mouseup', () => {
      if (this.toResize === true) {
        this.toResize = false;
        let xhttp = new XMLHttpRequest();
        xhttp.open('GET', `Frigo/size/${nick}/${this.card.id}/${parseInt(this.card.style.width)}/${parseInt(this.card.style.height)}`, true);
        xhttp.send();
      };
    });

    document.body.addEventListener('mousemove', (e) => {
      if (this.toMove === true) {    
        this.card.style.left = `${e.clientX - this.a}px`;
        this.card.style.top = `${e.clientY - this.b}px`;
      };
 
      if (this.toResize === true) {
        this.card.style.width = `${e.clientX - parseInt(getComputedStyle(this.card).left) - 15}px`;
        this.card.style.height = `${e.clientY - parseInt(getComputedStyle(this.card).top) - 15}px`;
      }
    });

    // Textbox
    this.textPlace = document.createElement('div');
    this.card.appendChild(this.textPlace);
    this.textPlace.style.cssText = 'position: absolute; top: 3%; left: 0; width: 100%; height: 80%; background-color: yellow;';
    this.textPlace.className = 'content';
    this.textPlace.innerHTML = this.content;
   
    // TinyMCE
    var existState = false;
    this.card.addEventListener('dblclick', () => {
      if (existState === false) {
        existState = true;
        this.textEditor = document.createElement('div');
        this.textEditor.style.width = '100%';
        this.textEditor.style.height = '80%';
        this.textEditor.innerHTML = this.textPlace.innerHTML;
        this.saveExit = document.createElement('div');
        this.saveExit.style.width = '100%';
        this.saveExit.style.height = '20%';
        this.tinyDestroyButton = document.createElement('div');
        this.tinyDelete = document.createElement('img');
        this.tinyDelete.src = 'assets/images/dist/delete.png';
        this.tinyDelete.style.height = '50px';
        this.tinyDelete.style.marginTop = '1%';
        this.tinyDelete.style.marginLeft = '1%';

        this.tinyDelete.addEventListener('click', (e) => {
          this.textPlace.innerHTML = tinyMCE.activeEditor.getContent({ format: 'raw' })
          e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
          let xhttp = new XMLHttpRequest();
          xhttp.open('POST', 'Frigo/content', true);
          xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
          xhttp.send(`nick=${nick}&identity=${this.card.id}&content=${this.textPlace.innerHTML}`);
          // State of tinyMCE
          existState = false;
        });

        this.saveExit.appendChild(this.tinyDelete)
        this.tinyDestroyButton.appendChild(this.saveExit)
        this.tinyDestroyButton.appendChild(this.textEditor)
        this.saveExit.className = 'saveExit';
        this.textEditor.className = 'editor';
        document.body.appendChild(this.tinyDestroyButton);
        tiny();
      };
    });

    // Swapping layers
    this.card.addEventListener('click', () => {
      for (let i = 1; i <= notes.length; i++) {
        document.getElementById(i).style.zIndex = i;
      };
      document.getElementById(this.card.id).style.zIndex = notes.length + 1;
    });
  };
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
 
// TinyMCE
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
};
