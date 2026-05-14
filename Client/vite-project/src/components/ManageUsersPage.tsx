import { NavLink, Outlet } from 'react-router-dom';
import '../css/ManageUsersPage.css';

function ManageUsersPage() {
  return (
    <section className="manage-users-panel">
      <h2 className="manage-users-title">Manage Users</h2>
      <p className="page-description">
        Choose a section from the menu to view all users or move to the Add
        User page.
      </p>

      <nav className="manage-users-menu" aria-label="Manage users sections">
        <NavLink
          end
          className={({ isActive }) =>
            `button-link manage-users-tab ${
              isActive ? 'manage-users-tab-active' : 'manage-users-tab-idle'
            }`
          }
          to="."
        >
          All Users
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `button-link manage-users-tab ${
              isActive ? 'manage-users-tab-active' : 'manage-users-tab-idle'
            }`
          }
          to="add-user"
        >
          Add User
        </NavLink>
      </nav>

      <Outlet />
    </section>
  );
}

export default ManageUsersPage;
