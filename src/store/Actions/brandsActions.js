import {
    getError,
    axios,
    getBrandsConfig,
    addBrandConfig,
    editBrandConfig,
    deleteBrandConfig
} from 'lib';

import { toast } from 'react-toastify';
import {
    getBrandsDispatch,
    setBrandsLoading,
} from 'store/Slices';


// Get All Users
export const getBrands = () => {
    return async (dispatch) => {
        dispatch(setBrandsLoading(true));
        try {
            const { url, defaultData, config } = getBrandsConfig();
            const res = await axios.post(url, defaultData, config);
            dispatch(getBrandsDispatch(res?.data?.data));
            dispatch(setBrandsLoading(false));
        } catch (e) {
            toast.error(getError(e));
            dispatch(setBrandsLoading(false));
        }
    };
};

// Add Brand
export const addBrand = (data) => {
    return async (dispatch) => {
        dispatch(setBrandsLoading(true));
        try {
            const { url, config } = addBrandConfig();
            const res = await axios.post(url, data, config);
            if (res.status === 200) {
                const { url, defaultData, config } = getBrandsConfig();
                const response = await axios.post(url, defaultData, config);
                dispatch(getBrandsDispatch(response?.data?.data));
                toast.success('Brand Added Successfully');
            }
        } catch (e) {
            toast.error(getError(e));
        } finally {
            dispatch(setBrandsLoading(false));
        }
    };
};


export const editBrand = ({ data }) => {
    return async (dispatch) => {
        dispatch(setBrandsLoading(true));
        try {
            const { url, config } = editBrandConfig({ id: data?.id });
            const response = await axios.put(url, data, config);
            if (response.status === 200) {
                const { url, defaultData, config } = getBrandsConfig();
                const response = await axios.post(url, defaultData, config);
                dispatch(getBrandsDispatch(response?.data?.data));
                toast.success('Brand Updated Successfully');
            }
        } catch (error) {
            toast.error(getError(error));
        } finally {
            dispatch(setBrandsLoading(false));
        }
    };
};

export const deleteBrand = ({ id }) => {
    return async (dispatch) => {
        dispatch(setBrandsLoading(true));
        try {
            const { url, config } = deleteBrandConfig({ id });
            const response = await axios.delete(url, config);
            if (response.status === 200) {
                const { url, defaultData, config } = getBrandsConfig();
                const response = await axios.post(url, defaultData, config);
                dispatch(getBrandsDispatch(response?.data?.data));
                toast.success('Brands Deleted Successfully');
            }
        } catch (error) {
            toast.error(getError(error));
        } finally {
            dispatch(setBrandsLoading(false));
        }
    };
};

