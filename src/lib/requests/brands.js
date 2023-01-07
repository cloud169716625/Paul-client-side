import { getConfig } from 'lib';
const brandsConfig = (action) => getConfig({ module: 'Brands', action });

const prefix = `/api/v1/admin/brands`;

export const getBrandsConfig = () => ({
  url: `${prefix}/search`,
  defaultData: {
    advancedSearch: {
      fields: [''],
      keyword: '',
    },
    keyword: '',
    pageNumber: 0,
    pageSize: 0,
    orderBy: [''],
  },
  // config: brandsConfig('View'),
});

export const addBrandConfig = () => ({
  url: `${prefix}`,
  // config: brandsConfig('Create'),
});

// Edit Brand
export const editBrandConfig = ({ id }) => ({
  url: `${prefix}/${id}`,
  // config: brandsConfig('Update'),
});
// Delete Brand
export const deleteBrandConfig = ({ id }) => ({
  url: `${prefix}/${id}`,
  // config: brandsConfig('Remove'),
});
