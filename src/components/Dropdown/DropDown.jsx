import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import DropdownItem from './DropdownItem';

const Dropdown = ({ label }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="btn btn-secondary text-[11px] leading-4 box-border px-3 py-1 inline-flex justify-center uppercase rounded shadow-sm border-0 bg-secondary-light">
        <span>{label}</span>
        <img
          alt=""
          src="/icon/dashboard/arrow-circle-down.svg"
          className="ml-2"
          width={16}
          height={16}
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right border-0 rounded-md min-w-[160px] shadow-custom bg-custom-secondary ring-opacity-5">
          <div className="py-1">
            <DropdownItem label="View" />
            <DropdownItem label="Close" />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

Dropdown.defaultProps = {
  label: 'actions',
};

export default Dropdown;
