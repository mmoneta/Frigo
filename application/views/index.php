<!DOCTYPE html>
<html>
  <head>
     <title>Frigo</title>
     <meta charset="utf-8" />
     <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
     <link rel="icon" href="<?= base_url(); ?>assets/images/favicon.ico" type="image/x-icon" />
     <script src="https://cdn.tinymce.com/4/tinymce.min.js"></script>
     <!-- Styles -->
     <link rel="stylesheet" href="<?= base_url(); ?>assets/styles/css/style.css">
     <!-- Scripts -->
     <script src="<?= base_url(); ?>assets/scripts/dist/index.js" defer></script>
   </head>
   <body oncontextmenu="return false;">
     <div class="sign-in--view">
        <div class="sign-in--content">
          <label>Wpisz nazwę tablicy: <input class="sign-in--nick" type="text" /></label>
          <button type="submit">Zaloguj się</button>
          <p class="sign-in--alert"></p>
        </div>
      </div>
      <div class="board--view">
         <img src="<?= base_url(); ?>assets/images/dist/add.png" class="board--add" alt="Add new element" />
      </div>
  </body>
</html>