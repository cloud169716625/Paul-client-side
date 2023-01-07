import { useSelector, useDispatch } from 'react-redux';
import { PermissionsModal } from 'components';
import { addSubUsers } from 'store';

export const AddPermissions = ({ show, setShow, subUsersInit }) => {
  const dispatch = useDispatch();
  const { subuserModules } = useSelector((state) => state?.modules);
  const { loading } = useSelector((state) => state?.subUsers);
  const { user } = useSelector((state) => state?.auth);

  const getInitialModules = () => {
    if (typeof subuserModules != "undefined" && subuserModules.length > 0) {
      const subuserModulesSorted = [...subuserModules].sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
      return subuserModulesSorted;
    } else {
      return subuserModules;
    }
  };
  const initialModules = getInitialModules();

  return (
    <PermissionsModal
      show={show}
      setShow={setShow}
      heading="Sub-User Permissions"
      submitText="Create Sub-User"
      permissions={initialModules}
      loading={loading}
      handleSubmit={async (values) => {
        const newValues = values?.filter((value) => {
          return !initialModules?.includes(value);
        });
        const valuesToPost = newValues.map(
          ({ isActive, name, permissionDetail, tenant }) => {
            return {
              isActive,
              name,
              permissionDetail: JSON.stringify(permissionDetail),
              tenant
            };
          }
        );
        const finalObject = {
          ...subUsersInit,
          subUserModules: Array.isArray(valuesToPost) &&
            valuesToPost.length ? valuesToPost :
            [
              {
                name: "Identity",
                permissionDetail: "{\"Create\":false,\"View\":false,\"Update\":false,\"Remove\":false}",
                tenant: "client",
                isActive: true,
                subUserId: ""
              }
            ],
        };
        await dispatch(addSubUsers(finalObject));
        setShow(false);
      }}
    />
  );
};
