import React, { useState, useEffect } from "react";
const Login = () => {
  const [heading, setHeading] = useState("Sing Up");
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Those passwords didn’t match. Try again.";
    }
    return errors;
  };

  return (
    <>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="sucess">Signed in successfully</div>
      ) : (
        <form onClick={handleOnSubmit}>
          <div className="container">
            <div className="header">
              <h4>{heading}</h4>
            </div>
            <div className="inputs">
              <div className="input">
                <i className="bx bxs-envelope"></i>
                <input
                  type="text"
                  id="text"
                  placeholder="Name"
                  name="username"
                  value={formValues.username}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.username}</p>
              <div className="input">
                <img src="" alt="" />
                <input
                  type="text"
                  id="text"
                  placeholder="E-mail"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.email}</p>
              <div className="input">
                <img src="" alt="" />
                <input
                  type="password"
                  id="text"
                  placeholder="Password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.password}</p>
              <div className="input">
                <input
                  type="password"
                  id="text"
                  placeholder="Password"
                  name="confirmPassword"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <p>{formErrors.confirmPassword}</p>
              <div className="submit-container">
                <button className="submit">Sign up</button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Login;
