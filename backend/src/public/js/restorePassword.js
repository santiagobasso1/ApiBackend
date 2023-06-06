const restorePasswordForm = document.getElementById("restorePassword");

restorePasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById("password1").value;
  const passwordVerification = document.getElementById("password2").value;

  if (password === passwordVerification) {
    try {
      const url = 'http://localhost:4000/auth/password/reset';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password, confirmPassword: password }),
      });

      if (response.ok) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Password Updated',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.href = 'http://localhost:4000/handlebars/login';
        });
      } else {
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error,
        showConfirmButton: false,
        timer: 1500
      })
    }
  } else {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Passwords do not match',
      showConfirmButton: false,
      timer: 1500
    })
  }
});
