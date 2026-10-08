document.addEventListener('DOMContentLoaded', function () {
  var STORAGE_KEY = 'recetasOtonoSubscribers';
  var forms = document.querySelectorAll('.subscribe-form');

  forms.forEach(function (form) {
    var feedback = form.parentElement.querySelector('.subscribe-feedback');
    var input = form.querySelector('input[type="email"]');
    var button = form.querySelector('button');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = input.value.trim();
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        showFeedback(feedback, 'Ingresa un correo válido, por favor.', false);
        return;
      }

      var subscribers = getSubscribers();

      if (subscribers.indexOf(email) !== -1) {
        showFeedback(feedback, 'Ese correo ya estaba suscrito. ¡Gracias!', true);
        form.reset();
        return;
      }

      button.disabled = true;

      subscribers.push(email);
      saveSubscribers(subscribers);

      showFeedback(feedback, '¡Listo! Te avisaremos de cada receta nueva.', true);
      form.reset();
      button.disabled = false;
    });
  });

  function getSubscribers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (err) {
      return [];
    }
  }

  function saveSubscribers(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      /* localStorage no disponible: la suscripción no se persiste, pero el mensaje igual se muestra */
    }
  }

  function showFeedback(el, message, success) {
    if (!el) return;
    el.textContent = message;
    el.classList.remove('is-error', 'is-success');
    el.classList.add(success ? 'is-success' : 'is-error');
  }
});