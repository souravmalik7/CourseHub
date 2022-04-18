/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import '../../assets/css/AdminHeader.css';
import UserInfo from './AdminUserInfo';


function Header() {
  return (
    <header className='protoHeader'>
      <div className='logo-name clickable'>
        <div className='app-name'>CourseHub</div>
      </div>
      <UserInfo />
    </header>
  );
}

export default Header;
