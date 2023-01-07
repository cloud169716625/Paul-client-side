import { getError, axios } from 'lib';
import { getDataCountConfig } from 'lib/requests/count';
import { toast } from 'react-toastify';
import { setCount, setCountLoading } from 'store/Slices/dataCountSlice';

export const getDataCounts = () => {
  return async (dispatch) => {    
    setCountLoading(true);
    try {
      const { url, config } = getDataCountConfig();
      const res = await axios.get(url, config);
      dispatch(setCount(res?.data?.data));
    } catch (e) {
      toast.error(getError(e));
    } finally {
      setCountLoading(false);
    }
  };
};
