import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MOVIE_DEPENDENT_PERMISSIONS,
  PERMISSIONS,
  PERMISSION_OPTIONS,
  SUBSCRIPTION_DEPENDENT_PERMISSIONS,
  type Permission,
} from '../constants/permissions';
import { useManageUsersOutletContext } from '../hooks/useManageUsersOutletContext';

interface AddUserFormState {
  firstName: string;
  lastName: string;
  userName: string;
  sessionTimeout: string;
  permissions: Permission[];
}

const initialFormState: AddUserFormState = {
  firstName: '',
  lastName: '',
  userName: '',
  sessionTimeout: '',
  permissions: [],
};

function normalizePermissions(permissions: Permission[]) {
  const uniquePermissions = new Set(permissions);

  return PERMISSION_OPTIONS.filter((permission) =>
    uniquePermissions.has(permission)
  );
}

function createUserId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `user-${Date.now()}`;
}

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function ManageUsersAddUserView() {
  const navigate = useNavigate();
  const { users, addUser } = useManageUsersOutletContext();
  const [formData, setFormData] = useState<AddUserFormState>(initialFormState);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCancel = () => {
    navigate('/main/manage-users');
  };

  const handleFieldChange = (
    field: keyof Omit<AddUserFormState, 'permissions'>,
    value: string
  ) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));

    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handlePermissionChange = (permission: Permission, checked: boolean) => {
    setFormData((currentFormData) => {
      const nextPermissions = new Set(currentFormData.permissions);

      if (checked) {
        nextPermissions.add(permission);
      } else {
        nextPermissions.delete(permission);
      }

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

    const trimmedFirstName = formData.firstName.trim();
    const trimmedLastName = formData.lastName.trim();
    const trimmedUserName = formData.userName.trim();
    const parsedSessionTimeout = Number(formData.sessionTimeout);

    if (
      !trimmedFirstName ||
      !trimmedLastName ||
      !trimmedUserName ||
      Number.isNaN(parsedSessionTimeout) ||
      parsedSessionTimeout < 0
    ) {
      setErrorMessage('Please fill in all fields and use a valid session time out.');
      return;
    }

    const userNameTaken = users.some(
      (user) => user.name.toLowerCase() === trimmedUserName.toLowerCase()
    );

    if (userNameTaken) {
      setErrorMessage('That username already exists. Please choose another one.');
      return;
    }

    addUser({
      id: createUserId(),
      name: trimmedUserName,
      password: '',
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      createdDate: getTodayDate(),
      sessionTimeout: parsedSessionTimeout,
      permissions: formData.permissions,
    });

    navigate('/main/manage-users');
  };

  return (
    <section className="manage-users-view">
      <div className="manage-users-card">
        <h2 className="manage-users-section-title">Add User</h2>
        <p className="manage-users-section-text">
          Add a new user with the profile details and permissions they should
          receive in the system.
        </p>

        {errorMessage ? <p className="manage-users-status">{errorMessage}</p> : null}

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
              <span className="field-label">UserName</span>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={(event) =>
                  handleFieldChange('userName', event.target.value)
                }
              />
            </label>

            <label className="field">
              <span className="field-label">Seesion Time Out</span>
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

          <section
            className="manage-user-permissions"
            aria-labelledby="add-user-permissions-title"
          >
            <h3
              className="manage-user-permissions-title"
              id="add-user-permissions-title"
            >
              Permissons
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
              Save
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

export default ManageUsersAddUserView;
