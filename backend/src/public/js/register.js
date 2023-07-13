const url = "https://backendcoderhouse.onrender.com"

const registerForm = document.getElementById("registerFormId");
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        
        const first_name = document.getElementById("first_name").value;
        const last_name = document.getElementById("last_name").value;
        const birthDate = document.getElementById("birth_date").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;


        const cliente = { first_name, last_name, birthDate, email, password };
        console.log(cliente)
        const response = await fetch(`${url}/api/session/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        const responseBody = await response.json();
        const responseMessage = responseBody.message;
        console.log(responseMessage)
        if (!response.ok) {

            return Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `Error: ${responseMessage}`,
                showConfirmButton: false,
                timer: 1500
            })     
              
        }


     
        if (responseBody) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: responseMessage,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = 'http://localhost:4000/handlebars/login';
            });
        }
    } catch (error) {
        console.error(error);
    }
});
