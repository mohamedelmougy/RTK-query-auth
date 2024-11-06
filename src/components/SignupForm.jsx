import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Form.module.css";
import { useRegisterMutation } from "../redux/features/auth/authAoiSlice";

const SignupForm = () => {
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [register, { isError, isLoading, error, isSuccess }] =
    useRegisterMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({
        first_name: userInputs.first_name,
        last_name: userInputs.last_name,
        email: userInputs.email,
        password: userInputs.password,
      });
      const { accessToken } = data;
      if (accessToken) {
        Cookies.set("accessToken", accessToken);
      }
      setUserInputs({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="first_name">First Name</label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            required
            minLength={5}
            value={userInputs.first_name}
            onChange={(e) => {
              setUserInputs((prev) => {
                return {
                  ...prev,
                  first_name: e.target.value,
                };
              });
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="last_name">Last Name</label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            required
            minLength={5}
            value={userInputs.last_name}
            onChange={(e) => {
              setUserInputs((prev) => {
                return {
                  ...prev,
                  last_name: e.target.value,
                };
              });
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            value={userInputs.email}
            onChange={(e) => {
              setUserInputs((prev) => {
                return {
                  ...prev,
                  email: e.target.value,
                };
              });
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
            value={userInputs.password}
            onChange={(e) => {
              setUserInputs((prev) => {
                return {
                  ...prev,
                  password: e.target.value,
                };
              });
            }}
          />
        </fieldset>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Create Account"}
        </button>
      </form>
      {isError && error && <p className={styles.error}>{error.data.message}</p>}
    </>
  );
};

export default SignupForm;
