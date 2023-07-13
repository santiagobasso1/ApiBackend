
const hrefForgotPassword = document.getElementById('hrefForgotPassword')
hrefForgotPassword.href = `${url}/handlebars/emailForm`;

const hrefRegister = document.getElementById('hrefRegister')
hrefRegister.href = `${url}/handlebars/register`;


const loginForm = document.getElementById("loginFormId");
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const cliente = { email, password };
        const response = await fetch(`${url}/api/session/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
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
            }).then(() => {
                window.location.href = `${url}/handlebars/products`;
            });
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
});
