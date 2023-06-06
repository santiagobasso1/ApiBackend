export const sendEmailView = async (req, res) => {
    try {
      res.render("sendEmail");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };


  export const sendRestorePasswordView = async (req, res) => {
    try {
      res.render("restorePassword");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  export const sendLoginView = async (req, res) => {
    try {
      res.render("login");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  

  export const sendMensaje = async (req, res) => {
    try {
      res.render("mensajePorEstaEntrega");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };


  export const sendRegisterView = async (req, res) => {
    try {
      res.render("register");
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };