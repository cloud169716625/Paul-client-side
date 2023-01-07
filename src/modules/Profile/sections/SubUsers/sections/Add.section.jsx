import { AddSubUsers } from './AddSubUsers.section';

export const Add = ({ show, setShow }) => {
  return (
    <AddSubUsers
      show={show}
      setShow={setShow}
      handleSubmit={(values) => {
        setShow(false);
      }}
    />
  );
};
