import { useState } from 'react';
import UsersList from './UsersList';
import type { ManageUser } from '../types/manageUser';

const exampleUsers: ManageUser[] = [
  {
    name: 'admin',
    password: '1234',
    id: '1',
    firstName: 'System',
    lastName: 'Admin',
    createdDate: '2026-05-14',
    sessionTimeout: 30,
  },
  {
    name: 'admin',
    password: '1234',
    id: '1',
    firstName: 'System',
    lastName: 'Admin',
    createdDate: '2026-05-14',
    sessionTimeout: 30,
  },
];

function ManageUsersUsersView() {
  const [users, setUsers] = useState<ManageUser[]>(exampleUsers);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleDeleteUser = (userId: string) => {
    setUsers((currentUsers) =>
      currentUsers.filter((user) => user.id !== userId)
    );

    if (selectedUserId === userId) {
      setSelectedUserId(null);
    }
  };

  const handleEditUser = (userId: string) => {
    setSelectedUserId(userId);
  };

  const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <section className="manage-users-view">
      <div className="manage-users-card">
        <h2 className="manage-users-section-title">Users</h2>
        <p className="manage-users-section-text">
          This area shows all system users inside the Manage Users page.
        </p>

        {selectedUser ? (
          <p className="manage-users-status">
            Selected user for edit: {selectedUser.firstName}{' '}
            {selectedUser.lastName}
          </p>
        ) : null}

        <UsersList
          users={users}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
        />
      </div>
    </section>
  );
}

export default ManageUsersUsersView;
