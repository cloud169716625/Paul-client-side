import { useCallback } from 'react';
import PaginationItem from './PaginationItem';

const Pagination = (props) => {
  const { totalCount, currentPage, onChange } = props;

  const handleChange = useCallback(
    (page) => {
      onChange(page);
    },
    [onChange]
  );

  if (!totalCount) return null;

  return (
    <ul className="flex flex-grow gap-2">
      <PaginationItem label="<" isDisabled={currentPage === 1 && true} currentPage={currentPage} onClick={handleChange} />

      {Array(totalCount)
        .fill(0)
        .map((item, idx) => {
          const pageNum = idx + 1;
          const isActive = pageNum === currentPage; 
          return (
            <PaginationItem
              key={`pitem_${idx}`}
              currentPage={currentPage}
              label={pageNum}
              isDisabled={false}
              isActive={isActive}
              onClick={handleChange}
            />
          );
        })}

      <PaginationItem
        label=">"
        isDisabled={currentPage === totalCount && true}
        currentPage={currentPage} 
        onClick={handleChange}
      />
    </ul>
  );
};

Pagination.defaultProps = {
  totalCount: 1,
  currentPage: 1,
};

export default Pagination;
