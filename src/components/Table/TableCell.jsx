const TableCell = ({ children, className }) => (
  <div
    className={`table-cell border-secondary-light border-dashed px-0 py-custom-5 ${className}`}
  >
    {children}
  </div>
);

TableCell.defaultProps = {
  className: '',
};

export default TableCell;
