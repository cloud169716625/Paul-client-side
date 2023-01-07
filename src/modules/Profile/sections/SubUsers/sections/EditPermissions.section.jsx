import { useSelector, useDispatch } from "react-redux";
import { PermissionsModal } from "components";
import { updateSubUserPermissions } from "store";

export const EditPermissions = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { subuserModules } = useSelector((state) => state?.modules);
  const { subUser, loading } = useSelector((state) => state?.subUsers);

  const getInitialModules = () => {
    if (subUser?.userModules) {
      const filtered = subuserModules.filter((module) => {
        return !subUser?.userModules?.some(
          (permission) => permission.name === module.name
        );
      });
      const currentModules = subUser?.userModules?.filter((module) => {
        return subuserModules.some(
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
      final.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));;
      return final;
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
      submitText="Update Permissions"
      permissions={initialModules}
      loading={loading}
      handleSubmit={async (values) => {
        const newValues = values?.filter((value) => {
          return !subuserModules?.includes(value);
        });
        const valuesToPost = newValues.map(
          ({ isActive, name, permissionDetail, tenant }) => {
            return {
              isActive,
              name,
              permissionDetail: JSON.stringify(permissionDetail),
              tenant,
              subUserId: subUser?.id,
            };
          }
        );
        const finalObject = {
          subUserModules: valuesToPost,
        };
        await dispatch(updateSubUserPermissions(finalObject));
        setShow(false);
      }}
    />
  );
};
