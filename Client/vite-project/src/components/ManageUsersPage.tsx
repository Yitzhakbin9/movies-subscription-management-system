import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { mockManageUsers } from '../data/mockManageUsers';
import type { ManageUsersOutletContext } from '../hooks/useManageUsersOutletContext';
import type { ManageUser } from '../types/manageUser';
import '../css/ManageUsersPage.css';

function ManageUsersPage() {
  const [users, setUsers] = useState<ManageUser[]>(mockManageUsers);

  const handleAddUser = (newUser: ManageUser) => {
    setUsers((currentUsers) => [...currentUsers, newUser]);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId)
    );
  };

  const handleUpdateUser = (updatedUser: ManageUser) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const outletContext: ManageUsersOutletContext = {
    users,
    addUser: handleAddUser,
    deleteUser: handleDeleteUser,
    updateUser: handleUpdateUser,
  };

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

      <Outlet context={outletContext} />
    </section>
  );
}

export default ManageUsersPage;
