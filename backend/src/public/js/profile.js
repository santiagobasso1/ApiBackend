

const loadProfile = async()=>{
    const response = await fetch(`${url}/api/session/current`, {
        method: 'GET',
    });
    const profileDiv = document.getElementById('profile')
    
    const jsonResponse = await response.json()
    const user = jsonResponse.user;
    let item = document.createElement("div");
    let itemContent = ""
    if (!user){
        itemContent = `
        <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
                <div class="">
                    <h2>Logued user not found</h2>
                </div>
            </div>
        </div>            
        `;
    }else{
        itemContent = `
        <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
                <div class="">
                    <h3>First Name</h3>
                    <p class="lead fw-normal mb-2">${user.first_name}</p>
                    <h3>Last Name</h3>
                    <p class="lead fw-normal mb-2">${user.last_name}</p>
                    <h3>Email</h3>
                    <p class="lead fw-normal mb-2">${user.email}</p>
    
                </div>
            </div>
        </div>            
        `;
    }

    item.innerHTML = itemContent;
    profileDiv.appendChild(item)
    document.getElementById('btnLogout').addEventListener('click',async()=>{
        const logoutResponse = await fetch(`${url}/api/session/logout`, {
            method: 'POST',
        });
        const logoutResponseJson = await logoutResponse.json()
        console.log(logoutResponseJson)
        if (!logoutResponse.ok){
            return Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `${logoutResponseJson.message}`,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = `${url}/handlebars/login`;
            })
        }else{
            return Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `${logoutResponseJson.message}`,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = `${url}/handlebars/login`;
            })
        }
 
    })
}

loadProfile();
