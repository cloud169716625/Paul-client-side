import { Menu } from '@headlessui/react';
import clsx from 'clsx';

const DropdownItem = ({ label }) => (
  <Menu.Item>
    {({ active }) => (
      <button
        className={clsx(
          'block px-4 py-2 text-sm text-[#92928F] capitalize w-full text-left',
          {
            'text-gray-600 bg-secondary-light': active,
            'text-grey': !active,
          }
        )}
      >
        {label}
      </button>
    )}
  </Menu.Item>
);

export default DropdownItem;
