// src/components/Sidebar.tsx
import React, {useState} from 'react';
import {  NavLink, useMatch, useLocation } from 'react-router-dom';
import ViewData from '../pages/ViewData_backup';
const Sidebar: React.FC = () => {
    const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const handleMenuItemClick = (menu: string) => {
    setSelectedMenu(menu);
  };
  const matchView = useMatch('/dashboard/view');
  const matchImport = useMatch('/dashboard/import');
  const matchSettings = useMatch('/dashboard/settings');
//   React.useEffect(() => {
//     const pathname = location.pathname;
//     if (pathname.startsWith('/view')) {
//       setSelectedMenu('view');
//     } else if (pathname.startsWith('/import')) {
//       setSelectedMenu('import');
//     } else if (pathname.startsWith('/settings')) {
//       setSelectedMenu('settings');
//     } else {
//       setSelectedMenu(null);
//     }
//   }, [location]);

  return (
    <div className="sidebar">
      <NavLink to="/dashboard/view">View Data</NavLink>
      <NavLink to="/dashboard/import">Import Data</NavLink>
      <NavLink to="settings">User Settings</NavLink>
      {/* <NavLink to="view" className={matchView ? 'active' : ''} >
        View Data
      </NavLink>
      <NavLink to="import" className={matchImport ? 'active' : ''}>
        Import Data
      </NavLink>
      <NavLink to="settings" className={matchSettings ? 'active' : ''}>
        User Settings
      </NavLink> */}
    </div>
  );
};

export default Sidebar;


      {/* <NavLink to="/dashboard/view">View Data</NavLink>
      <NavLink to="/dashboard/import">Import Data</NavLink>
      <NavLink to="/dashboard/settings">User Settings</NavLink> */}