import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  MOVIE_DEPENDENT_PERMISSIONS,
  PERMISSIONS,
  PERMISSION_OPTIONS,
  SUBSCRIPTION_DEPENDENT_PERMISSIONS,
  type Permission,
} from '../constants/permissions';
import { useManageUsersOutletContext } from '../hooks/useManageUsersOutletContext';

interface EditUserFormState {
  firstName: string;
  lastName: string;
  createdDate: string;
  name: string;
  sessionTimeout: string;
  permissions: Permission[];
}

function normalizePermissions(permissions: Permission[]) {
  const uniquePermissions = new Set(permissions);

  return PERMISSION_OPTIONS.filter((permission) =>
    uniquePermissions.has(permission)
  );
}

function createFormState(firstUserData: {
  firstName: string;
  lastName: string;
  createdDate: string;
  name: string;
  sessionTimeout: number;
  permissions: Permission[];
}): EditUserFormState {
  return {
    firstName: firstUserData.firstName,
    lastName: firstUserData.lastName,
    createdDate: firstUserData.createdDate,
    name: firstUserData.name,
    sessionTimeout: String(firstUserData.sessionTimeout),
    permissions: normalizePermissions(firstUserData.permissions),
  };
}

function EditUser() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { users, updateUser } = useManageUsersOutletContext();
  const selectedUser = users.find((user) => user.id === userId);
  const [formData, setFormData] = useState<EditUserFormState | null>(() =>
    selectedUser ? createFormState(selectedUser) : null
  );

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    setFormData(createFormState(selectedUser));
  }, [selectedUser]);

  const handleCancel = () => {
    navigate('/main/manage-users');
  };

  const handleFieldChange = (
    field: keyof Omit<EditUserFormState, 'permissions'>,
    value: string
  ) => {
    setFormData((currentFormData) =>
      currentFormData ? { ...currentFormData, [field]: value } : currentFormData
    );
  };

  const handlePermissionChange = (permission: Permission, checked: boolean) => {
    setFormData((currentFormData) => {
      if (!currentFormData) {
        return currentFormData;
      }

      const nextPermissions = new Set(currentFormData.permissions);

      if (checked) {
        nextPermissions.add(permission);
      } else {
        nextPermissions.delete(permission);
      }

      // Keep create/update/delete permissions tied to their required view permission.
      if (checked && SUBSCRIPTION_DEPENDENT_PERMISSIONS.includes(permission)) {
        nextPermissions.add(PERMISSIONS.VIEW_SUBSCRIPTIONS);
      }

      if (checked && MOVIE_DEPENDENT_PERMISSIONS.includes(permission)) {
        nextPermissions.add(PERMISSIONS.VIEW_MOVIES);
      }

      if (!checked && permission === PERMISSIONS.VIEW_SUBSCRIPTIONS) {
        nextPermissions.delete(PERMISSIONS.CREATE_SUBSCRIPTIONS);
        nextPermissions.delete(PERMISSIONS.DELETE_SUBSCRIPTIONS);
        nextPermissions.delete(PERMISSIONS.UPDATE_SUBSCRIPTION);
      }

      if (!checked && permission === PERMISSIONS.VIEW_MOVIES) {
        nextPermissions.delete(PERMISSIONS.CREATE_MOVIES);
        nextPermissions.delete(PERMISSIONS.DELETE_MOVIES);
        nextPermissions.delete(PERMISSIONS.UPDATE_MOVIE);
      }

      return {
        ...currentFormData,
        permissions: normalizePermissions(Array.from(nextPermissions)),
      };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedUser || !formData) {
      return;
    }

    const trimmedFirstName = formData.firstName.trim();
    const trimmedLastName = formData.lastName.trim();
    const trimmedUserName = formData.name.trim();
    const parsedSessionTimeout = Number(formData.sessionTimeout);

    if (
      !trimmedFirstName ||
      !trimmedLastName ||
      !trimmedUserName ||
      Number.isNaN(parsedSessionTimeout) ||
      parsedSessionTimeout < 0
    ) {
      return;
    }

    updateUser({
      ...selectedUser,
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      name: trimmedUserName,
      sessionTimeout: parsedSessionTimeout,
      permissions: formData.permissions,
    });

    navigate('/main/manage-users');
  };

  if (!selectedUser) {
    return (
      <section className="manage-users-view">
        <div className="manage-users-card">
          <h2 className="manage-users-section-title">Edit User</h2>
          <p className="manage-users-section-text">
            The selected user could not be found.
          </p>
          <button
            className="button-secondary"
            type="button"
            onClick={handleCancel}
          >
            Back to All Users
          </button>
        </div>
      </section>
    );
  }

  if (!formData) {
    return null;
  }

  return (
    <section className="manage-users-view">
      <div className="manage-users-card">
        <h2 className="manage-users-section-title">Edit User</h2>
        <p className="manage-users-section-text">
          Update the selected user details and permissions, then return to All
          Users.
        </p>

        <form className="manage-user-form" onSubmit={handleSubmit}>
          <div className="manage-user-form-grid">
            <label className="field">
              <span className="field-label">First Name</span>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(event) =>
                  handleFieldChange('firstName', event.target.value)
                }
              />
            </label>

            <label className="field">
              <span className="field-label">Last Name</span>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(event) =>
                  handleFieldChange('lastName', event.target.value)
                }
              />
            </label>

            <label className="field">
              <span className="field-label">Created Date</span>
              <input
                className="manage-user-readonly"
                type="text"
                name="createdDate"
                value={formData.createdDate}
                readOnly
              />
            </label>

            <label className="field">
              <span className="field-label">UserName</span>
              <input
                type="text"
                name="username"
                value={formData.name}
                onChange={(event) => handleFieldChange('name', event.target.value)}
              />
            </label>

            <label className="field">
              <span className="field-label">Session Time Out</span>
              <input
                type="number"
                min="0"
                name="sessionTimeout"
                value={formData.sessionTimeout}
                onChange={(event) =>
                  handleFieldChange('sessionTimeout', event.target.value)
                }
              />
            </label>
          </div>

          <section className="manage-user-permissions" aria-labelledby="permissions-title">
            <h3 className="manage-user-permissions-title" id="permissions-title">
              Permissions
            </h3>
            <p className="manage-user-permissions-text">
              Create, delete, and update permissions automatically enable the
              matching view permission.
            </p>

            <div className="manage-user-permissions-grid">
              {PERMISSION_OPTIONS.map((permission) => (
                <label className="manage-user-checkbox" key={permission}>
                  <input
                    type="checkbox"
                    checked={formData.permissions.includes(permission)}
                    onChange={(event) =>
                      handlePermissionChange(permission, event.target.checked)
                    }
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
          </section>

          <div className="manage-user-actions">
            <button className="button-primary" type="submit">
              Update
            </button>
            <button
              className="button-secondary"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditUser;
