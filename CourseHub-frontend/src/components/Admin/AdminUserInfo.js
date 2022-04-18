/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import "../../assets/css/AdminUserInfo.css";

function UserInfo() {
  const logoutUser = () => {
    localStorage.setItem("logged_in_user", '');
    localStorage.setItem("isAdmin", false);
    window.open('/', '_self');
  };

  return (
    <section className="userInfo">
      <span className="material-icons account-circle">account_circle</span>
      <div className="userInfoItems">
        <ul>
          <li>Sourav Malik</li>
          <li onClick={logoutUser}>Logout</li>
        </ul>
      </div>
    </section>
  );
}

export default UserInfo;
