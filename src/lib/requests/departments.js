import { getConfig } from "lib";
const departmentsConfig = (action) =>
  getConfig({ module: "Departments", action });

const prefix = `/api/departments`;

export const getDepartmentsConfig = () => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: [""],
      keyword: "",
    },
    keyword: "",
    pageNumber: 0,
    pageSize: 0,
    orderBy: [""],
  },
  config: departmentsConfig('View'),
});

export const getDepartmentsByUserIdConfig = ({ id }) => ({
  url: `/api/departments/getuserdepartments/${id}`,
  config: departmentsConfig('View'),
});

export const getUsersByDepartmentIdConfig = (id) => ({
  url: `/api/departments/getdepartmentusers/${id}`,
  config: departmentsConfig('View'),
});

export const addDepartmentConfig = () => ({
  url: `${prefix}`,
  config: departmentsConfig('Create'),
});

export const assignDepartmentConfig = () => ({
  url: `${prefix}/assigndepartmentasync`,
  config: departmentsConfig('Create'),
});

export const unAssignDepartmentConfig = () => ({
  url: `${prefix}/unassigndepartmentasync`,
  config: departmentsConfig('Create'),
});

// Edit Departemnt
export const editDepartmentConfig = ({ id }) => ({
  url: `${prefix}/${id}`,
  config: departmentsConfig('Update'),
});
// Delete Departemnt
export const deleteDepartmentConfig = ({ id }) => ({
  url: `${prefix}/${id}`,
  config: departmentsConfig('Remove'),
});
