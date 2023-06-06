const btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    try {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const cliente = { email, password };
        const response = await fetch('http://localhost:4000/auth/login', {
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
        if (response.ok) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Logueado correctamente!',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = 'http://localhost:4000/handlebars';
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
