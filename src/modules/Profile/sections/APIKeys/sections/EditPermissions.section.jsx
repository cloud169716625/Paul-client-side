import { useSelector, useDispatch } from "react-redux";
import { PermissionsModal } from "components";
import { updateAPIKeyPermissions } from "store";

export const EditPermissions = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { clientModules } = useSelector((state) => state?.modules);
  const { loading, apiKey } = useSelector((state) => state?.apiKeys);
  const getInitialModules = () => {
    if (apiKey?.userApiKeyModules) {
      const filtered = clientModules.filter((module) => {
        return !apiKey?.userApiKeyModules?.some(
          (permission) => permission.name === module.name
        );
      });
      const currentModules = apiKey?.userApiKeyModules?.filter((module) => {
        return clientModules.some(
          (permission) => permission.name === module.name
        );
      }).map((module) => {
        return {
          isActive: true,
          name: module.name,
          permissionDetail: JSON.parse(module && module.permissionDetail),
          tenant: "client",
        };
      });
      const final = [...filtered, ...currentModules];
      final.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
      return final;
    } else {
      return clientModules;
    }
  };

  const initialModules = getInitialModules();
  
  return (
    <PermissionsModal
      show={show}
      setShow={setShow}
      heading="API Key Permissions"
      submitText="Update Permissions"
      permissions={initialModules}
      loading={loading}
      handleSubmit={async (values) => {
        const newValues = values?.filter((value) => {
          return !clientModules?.includes(value);
        });
        const valuesToPost = newValues.map(
          ({ isActive, name, permissionDetail, tenant }) => {
            return {
              isActive,
              name,
              permissionDetail: JSON.stringify(permissionDetail),
              tenant,
              subUserApiKeyId: apiKey?.subUserApiKeyId,
            };
          }
        );
        const finalObject = {
          userApiKeyModules: valuesToPost,
        };
        await dispatch(updateAPIKeyPermissions(apiKey?.id, finalObject));
        setShow(false);
      }}
    />
  );
};
