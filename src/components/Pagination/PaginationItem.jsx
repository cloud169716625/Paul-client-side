import clsx from 'clsx';

const PaginationItem = ({ label, currentPage, isActive, isDisabled, className, onClick }) => {
  const handleChangePage = () => {
    if(!isDisabled) {
      if(label === "<") {
        onClick(currentPage - 1);
      } else if (label === ">") {
        onClick(currentPage + 1);
      } else {
        onClick(label)
      }
    }
  }

  return (
    <li className="inline-block">
      <button
        onClick = {handleChangePage}
        className={clsx(
          'rounded btn leading-5 w-[32px] h-[32px] text-sm',
          {
            'bg-custom-info text-white': isActive,
            'bg-secondary-light text-custom-grey': isDisabled,
            'bg-custom-blue-dark text-custom-info': !isActive && !isDisabled,
          },
          className
        )} 
      >
        {label}
      </button>
    </li>
  );
};

PaginationItem.defaultProps = {
  className: '',
  isActive: false,
  isDisabled: false,
};

export default PaginationItem;
