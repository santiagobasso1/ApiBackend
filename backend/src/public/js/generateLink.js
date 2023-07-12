const url = "http://localhost:4000"
const sendMailForm = document.getElementById("sendMailForm")
sendMailForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById("email").value;
  try {
    const resetUrl = `${url}/api/session/password/createlink`;
    const response = await fetch(resetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    });
    const responseBody = await response.json();
        
    const responseMessage = responseBody.message;
    if (!response.ok) {
      return Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: `Error: ${responseMessage}`,
        showConfirmButton: false,
        timer: 1500
      })
    }

    if (response.ok) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: responseMessage,
        showConfirmButton: false,
        timer: 1500
      })
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: responseMessage,
        showConfirmButton: false,
        timer: 1500
      })
    }
    // const data = await response.json();
    // console.log(data);

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