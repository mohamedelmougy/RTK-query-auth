import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useLogoutMutation } from "../redux/features/auth/authAoiSlice";

const RootLayout = () => {
  const navigate = useNavigate()
  const accessToken = Cookies.get("accessToken");
  const [logout,{isLoading,isError}]= useLogoutMutation()

  const handleLogout =async () => {
    await logout();
    Cookies.remove("accessToken")
    navigate("/auth/login")
  };
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/auth/signup">Signup</Link>
        </li>
        {accessToken ? (
          <li>
            <button type="button" onClick={handleLogout} className="logout">
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
        )}
      </ul>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
