const app = {
    init: function () {
      game.init();
      rules.init();
    },
  };
  
  document.addEventListener("DOMContentLoaded", app.init);