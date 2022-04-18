/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import "../../assets/css/AdminTabs.css";

function Tabs(props) {
  return (
    <section className="tabs">
      <ul>
        <li
          className={[props.selectedTab === "1" ? "active" : "", 'user-management', 'clickable'].join(' ')}
          onClick={() => props.handleTabChange("1")}
        >
          User Management
        </li>
        <li
          className={[props.selectedTab === "2" ? "active" : "", 'course-management', 'clickable'].join(' ')}
          onClick={() => props.handleTabChange("2")}
        >
          Course Management
        </li>
      </ul>
    </section>
  );
}

export default Tabs;
