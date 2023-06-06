const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    try {
        
        const first_name = document.getElementById("first_name").value;
        const last_name = document.getElementById("last_name").value;
        const age = document.getElementById("age").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        


        const cliente = { first_name, last_name, age, email, password };
        const response = await fetch('http://localhost:4000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        });
        
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        if (data) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registado correctamente!',
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
