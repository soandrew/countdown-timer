import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useQueryParams = ({ getAll = false } = {}) => {
  const queryString = useLocation().search;
  return useMemo(() => {
    const result = Object.create(null);
    for (const [key, value] of new URLSearchParams(queryString).entries()) {
      if (value === null || value === '') {
        continue;
      } else if (result[key] === undefined) {
        result[key] = getAll ? [value] : value;
      } else if (getAll) {
        result[key].push(value);
      }
    }
    return result;
  }, [queryString, getAll]);
};

export default useQueryParams;
