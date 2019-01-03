export function tiny() {
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