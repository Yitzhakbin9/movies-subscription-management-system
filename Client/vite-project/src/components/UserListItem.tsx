import { USER_FIELDS } from '../constants/userFields';
import type { ManageUser } from '../types/manageUser';

interface UserListItemProps {
  user: ManageUser;
  onDelete: (userId: string) => void;
  onEdit: (userId: string) => void;
}

const userFieldLabels = [
  { label: USER_FIELDS.USER_NAME, valueKey: 'name' },
  { label: USER_FIELDS.PASSWORD, valueKey: 'password' },
  { label: USER_FIELDS.ID, valueKey: 'id' },
  { label: USER_FIELDS.FIRST_NAME, valueKey: 'firstName' },
  { label: USER_FIELDS.LAST_NAME, valueKey: 'lastName' },
  { label: USER_FIELDS.CREATED_DATE, valueKey: 'createdDate' },
  { label: USER_FIELDS.SESSION_TIMEOUT, valueKey: 'sessionTimeout' },
] as const;

function UserListItem({ user, onDelete, onEdit }: UserListItemProps) {
  return (
    <article className="user-list-item">
      <div className="user-list-item-details">
        {userFieldLabels.map((field) => (
          <div className="user-detail" key={field.label}>
            <span className="user-detail-label">{field.label}</span>
            <span className="user-detail-value">{String(user[field.valueKey])}</span>
          </div>
        ))}

        <div className="user-detail user-detail-permissions">
          <span className="user-detail-label">Permissions</span>
          {user.permissions.length > 0 ? (
            <div className="user-permissions-list">
              {user.permissions.map((permission) => (
                <span className="user-permission-badge" key={permission}>
                  {permission}
                </span>
              ))}
            </div>
          ) : (
            <span className="user-detail-value">No permissions assigned</span>
          )}
        </div>
      </div>

      <div className="user-list-item-actions">
        <button
          className="button-secondary user-action-button"
          type="button"
          onClick={() => onEdit(user.id)}
        >
          Edit
        </button>
        <button
          className="button-primary user-action-button"
          type="button"
          onClick={() => onDelete(user.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default UserListItem;
