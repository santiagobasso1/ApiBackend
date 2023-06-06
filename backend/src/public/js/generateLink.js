const sendMailForm = document.getElementById("sendMailForm")
sendMailForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById("email").value;
  try {
    const url = 'http://localhost:4000/auth/password/createlink';
    const parametro = email;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    if (response.ok){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Check your mail',
        showConfirmButton: false,
        timer: 1500
      })
    }
    const data = await response.json();
    console.log(data);
    
  } catch (error) {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: error,
      showConfirmButton: false,
      timer: 1500
    })
  }
})