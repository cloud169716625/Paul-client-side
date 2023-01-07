import { AddAPIKey } from './AddAPIKey.section';

export const Add = ({ show, setShow }) => {
  return (
    <>
      <AddAPIKey
        show={show}
        setShow={setShow}
        handleSubmit={(values) => {
          setShow(false);
        }}
      />
    </>
  );
};
