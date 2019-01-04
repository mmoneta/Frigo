import { tiny } from './tinymce';

export class Card {
  constructor(ID, cretor, width, height, top, left, content, index, existed) {
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

  create(existed) {
    this.card = document.createElement('div');
    this.card.className = 'note';
    this.card.id = this.ID;
    this.card.style.top = `${this.top}px`;
    this.card.style.left = `${this.left}px`;
    this.card.style.width = `${this.width}px`;
    this.card.style.height = `${this.height}px`;
    this.card.style.zIndex = this.index;
    document.body.appendChild(this.card);

    // New card in database
    if (existed === false) {
      let xhttp = new XMLHttpRequest();
      xhttp.open('POST', 'Frigo/add', true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send(`creator=${this.cretor}&identity=${this.card.id}&width=${this.width}&height=${this.height}&top=${this.top}&left=${this.left}&index=${this.ID}`);
    };

    // Delete card (button)
    this.destroyButton = document.createElement('div');
    this.destroyButton.className = 'destroy--button';
    this.card.appendChild(this.destroyButton);
    this.destroyButton.style.cssText = 'width: 15px; height: 15px; position: absolute; border-radius: 3px; top: -14px; right: -14px; background-color: blue;';

    this.destroyButton.addEventListener('click', () => {
      this.card.remove();
      var xhttp = new XMLHttpRequest();
      xhttp.open('POST', 'Frigo/delete', true);
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send(`creator=${this.cretor}&identity=${this.ID}`);
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
        xhttp.open('POST', 'Frigo/position', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(`creator=${this.cretor}&identity=${this.card.id}&top=${parseInt(this.card.style.top)}&left=${parseInt(this.card.style.left)}`);  
      };
    });
 
    // Zooming
    this.resize = document.createElement('div');
    this.resize.className = 'resize--button';
    this.card.appendChild(this.resize);
    this.resize.style.cssText = 'width: 15px; height: 15px; background-color: green; position: absolute; border-radius: 3px; right: -14px; bottom: -14px';  
  
    this.resize.addEventListener('mousedown', () => {
      if (this.toResize == false) {
        this.toResize = true;
      };
    });
 
    this.resize.addEventListener('mouseup', () => {
      if (this.toResize === true) {
        this.toResize = false;
        let xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'Frigo/size', true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(`creator=${this.cretor}&identity=${this.card.id}&width=${parseInt(this.card.style.width)}&height=${parseInt(this.card.style.height)}`);
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
    this.textPlace.style.cssText = 'position: absolute; top: 3%; left: 2%; padding: 2%; width: 92%; height: 75%; background-color: yellow;';
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
          xhttp.send(`creator=${this.cretor}&identity=${this.card.id}&content=${this.textPlace.innerHTML}`);
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
    this.card.addEventListener('click', (e) => {
      const classes_of_buttons = ['resize--button', 'destroy--button'];

      if (classes_of_buttons.indexOf(e.target.className) === -1) {
        const notes = document.querySelectorAll('.note');
        
        for (let i = 1; i <= notes.length; i++) {
          document.getElementById(i).style.zIndex = i;
        };
        
        document.getElementById(this.card.id).style.zIndex = notes.length + 1;
      };
    });
  };
};
