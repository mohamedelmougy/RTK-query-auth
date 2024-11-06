import { useGetUsersQuery } from "../redux/features/users/usersAliSlice";
import styles from "../styles/Dashboard.module.css";

const DashboardPage = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    error,
    isError,
  } = useGetUsersQuery();

  const formatDate = (dateString) => {
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return "Invalid date format";

    const year = match[1];
    const month = match[2];
    const day = match[3];

    return `${year}/${month}/${day}`;
  };
  
  return (
    <div>
      <h1>Dashboard</h1>

      {isLoading && !isError && <p>Loading...</p>}
      {!isLoading && isError && error && <p>Error: {error.data.message}</p>}
      {!isLoading && isSuccess && users && users.length >= 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{formatDate(user.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardPage;
