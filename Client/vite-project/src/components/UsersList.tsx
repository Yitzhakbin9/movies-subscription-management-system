import UserListItem from './UserListItem';
import type { ManageUser } from '../types/manageUser';

interface UsersListProps {
  users: ManageUser[];
  onDeleteUser: (userId: string) => void;
  onEditUser: (userId: string) => void;
}

function UsersList({ users, onDeleteUser, onEditUser }: UsersListProps) {
  if (users.length === 0) {
    return (
      <div className="manage-users-empty-state">
        <p className="manage-users-section-text">
          There are no users to show right now.
        </p>
      </div>
    );
  }

  return (
    <section className="users-list" aria-label="Users list">
      {users.map((user) => (
        <UserListItem
          key={user.id}
          user={user}
          onDelete={onDeleteUser}
          onEdit={onEditUser}
        />
      ))}
    </section>
  );
}

export default UsersList;
