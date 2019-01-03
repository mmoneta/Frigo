export class Alert {
  static create(alert, timeout) {
    document.querySelector('.sign-in--alert').innerHTML = alert;
  
    if (timeout) {
     clearTimeout(timeout);
    };
  
    timeout = setTimeout(() => { document.querySelector('.sign-in--alert').innerHTML = ''; }, 5000);
    return timeout;
  };
};