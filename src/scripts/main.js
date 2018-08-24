import Common from './modules/common';
import Map from './modules/map';

const availableModules = { Common, Map };

window.modules = {};

$(() => {
  const htmlModules = $('[data-module]');

  // Loading htmlModules if they are in availableModules
  htmlModules.each((key, value) => {
    const mod = $(value).data('module');

    if (Object.prototype.hasOwnProperty.call(availableModules, mod)) {
      window.modules[mod] = new availableModules[mod]();
    } else {
      console.log(`The module "${mod}" does not exists.`);
    }
  });
});

document.addEventListener('DOMContentLoaded', function(event) {
  console.log("%cMade in BRZ Digital! \ud83d\ude42 We love to inspect codes too \ud83d\udc40", "font-size: 16px; color: #a7bf34");
});
