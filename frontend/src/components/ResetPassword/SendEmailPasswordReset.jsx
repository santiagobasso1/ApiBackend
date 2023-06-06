import React, { useState } from 'react';
import axios from 'axios';

const SendEmailPasswordReset = () => {
  const [email, setEmail] = useState('');

  // Función para obtener el valor de una cookie por su nombre
  const getCookie = name => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  }

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:4000/auth/password/createLink', { email });
      console.log(response.data);

      // Acceder y almacenar la cookie en el frontend
      const resetToken = getCookie('resetToken');
      console.log(resetToken);
    } catch (error) {
      console.error(error);
    }
  }

  const handleEmailChange = event => {
    setEmail(event.target.value);
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card text-center" style={{ width: '300px' }}>
        <div className="card-header h5 text-white bg-primary">Password Reset</div>
        <div className="card-body px-5">
          <p className="card-text py-2">
            Enter your email address and we'll send you an email with instructions to reset your password.
          </p>
          <div className="form-outline">
            <input type="email" id="typeEmail" className="form-control my-3" value={email} onChange={handleEmailChange} />
            <label className="form-label" htmlFor="typeEmail">Email input</label>
          </div>
          <button className="btn btn-primary w-100" onClick={handleResetPassword}>Reset password</button>
          <div className="d-flex justify-content-between mt-4">
            <a href="#">Login</a>
            <a href="#">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendEmailPasswordReset;
