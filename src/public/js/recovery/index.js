/* ************************************************************************** */
/* /src/public/js/recovery/index.js - .js de /src/views/recovery.handlebars 
/* ************************************************************************** */
console.log('testing js');
/* ************************************************************************** */
/* /src/public/js/register/index.js - .js de /src/views/register.handlebars */
/* ************************************************************************** */
document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('recoveryForm');

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Crear un objeto con los datos del formulario
    var payload = {
      email: email,
      password: password,
    };

    // Realizar una solicitud POST al servidor con los datos del formulario
    fetch('/api/sessions/useradmin/recovery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(function (response) {
        if (response.ok) {
          // Redirigir al usuario a la URL deseada después de que se haya agregado el usuario correctamente
          swal('Contraseña Recuperada', 'Loguéate con tu Email y tu nuevo Password', 'success').then(function () {
            window.location.href = '/';
          });
        } else {
          response.json().then(function () {
            {
              swal('El usuario no existe', 'No se pudo recuperar la contraseña', 'error');
            }
          });
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  });
});
