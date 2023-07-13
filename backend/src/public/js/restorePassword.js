
const restorePasswordForm = document.getElementById("restorePassword");

restorePasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const password = document.getElementById("password1").value;
  const passwordVerification = document.getElementById("password2").value;
  if (password === passwordVerification) {
    try {
      const restoreLink = `${url}/api/session/password/reset`;

      const response = await fetch(restoreLink, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password, confirmPassword: password }),
      });
      console.log(response)
      const responseBody = await response.json();
      
      const responseMessage = responseBody.message;
      if (response.ok) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: responseMessage,
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.href = `${url}/handlebars/login`;
        });
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: responseMessage,
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          window.location.href = `${url}/handlebars/emailForm`;
        })
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
