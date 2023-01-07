import clsx from 'clsx';

const Tag = ({ label, className }) => (
  <span className={clsx('uppercase text-[11px] py-1 px-2 rounded', className)}>
    {label}
  </span>
);

Tag.defaultProps = {
  label: '',
  className: '',
};

export default Tag;
