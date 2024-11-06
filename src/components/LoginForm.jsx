import { useNavigate } from "react-router-dom";
import styles from "../styles/Form.module.css";
import { useState } from "react";
import { useLoginMutation } from "../redux/features/auth/authAoiSlice";
import Cookies from "js-cookie";

const LoginForm = () => {
  const navigate = useNavigate();
  const [userInputs, setUserInputs] = useState({ email: "", password: "" });
  const [login, { isError, error, isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        email: userInputs.email,
        password: userInputs.password,
      });
      const { accessToken } = data;
      if (accessToken) {
        Cookies.set("accessToken", accessToken);
      }
      setUserInputs({ email: "", password: "" });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          onChange={(e) => {
            setUserInputs((prev) => ({
              ...prev,
              email: e.target.value,
            }));
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
          onChange={(e) => {
            setUserInputs((prev) => ({
              ...prev,
              password: e.target.value,
            }));
          }}
        />
      </fieldset>
      <button disabled={isLoading}>
        {isLoading ? "Submitting..." : "Signin"}
      </button>
    </form>
    {isError && error && <p className={styles.error}>{error.data.message}</p>}
    </>
  );
};

export default LoginForm;
