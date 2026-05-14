import { useNavigate } from 'react-router-dom';
import { useManageUsersOutletContext } from '../hooks/useManageUsersOutletContext';
import UsersList from './UsersList';

function ManageUsersUsersView() {
  const navigate = useNavigate();
  const { users, deleteUser } = useManageUsersOutletContext();

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
  };

  const handleEditUser = (userId: string) => {
    navigate(`/main/manage-users/edit/${userId}`);
  };

  return (
    <section className="manage-users-view">
      <div className="manage-users-card">
        <h2 className="manage-users-section-title">Users</h2>
        <p className="manage-users-section-text">
          This area shows all system users inside the Manage Users page.
        </p>

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
