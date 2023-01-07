import { useSelector, useDispatch } from 'react-redux';
import { PermissionsModal } from 'components';
import { addAPIKey } from 'store';

export const AddPermissions = ({ show, setShow, apiKeyInit }) => {
  const dispatch = useDispatch();
  const { clientModules } = useSelector((state) => state?.modules);
  const { loading } = useSelector((state) => state?.apiKeys);
  const { user } = useSelector((state) => state?.auth);

  const getInitialModules = () => {
    if (typeof clientModules != "undefined" && clientModules.length > 0) {
      const clientModulesSorted = [...clientModules].sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
      return clientModulesSorted;
    } else {
      return clientModules;
    }
  };
  const initialModules = getInitialModules();

  return (
    <PermissionsModal
      show={show}
      setShow={setShow}
      heading="API Keys Permissions"
      submitText="Create"
      permissions={initialModules}
      loading={loading}
      handleSubmit={async (values) => {
        const newValues = values?.filter((value) => {
          return !initialModules?.includes(value);
        });
        const valuesToPost = newValues.map(
          ({ isActive, name, permissionDetail, tenant, subUserApiKeyId }) => {
            return {
              isActive,
              name,
              permissionDetail: JSON.stringify(permissionDetail),
              tenant,
              subUserApiKeyId,
            };
          }
        );
        const finalObject = {
          ...apiKeyInit,
          subUserApiKeyModules: valuesToPost,
        };
        await dispatch(addAPIKey(user?.id, finalObject));
        setShow(false);
      }}
    />
  );
};
