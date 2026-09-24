require.config({
  paths: {
    jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min',
    lodash: 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.5.0/lodash.min',
    materialize: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min',
    hammerjs: 'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min'
  },
  shim: {
    materialize: {
      deps: ['jquery', 'hammerjs']
    }
  }
});

require([
  'app',
], function (app) {
  app.init();
});
