/*=======================================================
 Author: [Sourav Malik] (sr343164@dal.ca)
========================================================= */
import React, { useEffect, useState } from "react";
import Header from './AdminHeader';
import Tabs from './AdminTabs';
import User from '../../pages/AdminUser';
import Course from '../../pages/AdminCourse';

function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("1");

  useEffect(() => {
    const tabIndex = !window.location.search ? '1' : window.location.search[window.location.search.length - 1];
    setSelectedTab(tabIndex);
  }, []);

  const handleChange = (tabIndex) => {
    const tabName = `/admin?t=${tabIndex}`;
    window.history.replaceState(null, null, tabName);

    setSelectedTab(tabIndex);
  };


  return (
    <div className="admin-app">
      <Header />
      <Tabs
        selectedTab={selectedTab}
        handleTabChange={(tabIndex) => handleChange(tabIndex)}
      />
      {selectedTab === "1" && <User />}
      {selectedTab === "2" && <Course />}
    </div>
  );
}

export default AdminDashboard;
