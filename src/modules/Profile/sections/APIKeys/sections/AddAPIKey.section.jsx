import * as Yup from 'yup';
import { Modal } from 'components';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { AddPermissions } from './AddPermissions.section';
import { defaultTenant } from 'lib/constants';

const validationSchema1 = Yup.object().shape({
  label: Yup.string().required('Label is required'),
  statusApi: Yup.string().required('Status is required'),
  tenant: Yup.string().required('Tenant is required'),
  validTill: Yup.date().required('Expiry date is required'),
});

export const AddAPIKey = ({ show, setShow }) => {
  const [apiKeyInit, setAPIKeyInit] = useState(false);
  const [showPermissions, setShowPermissions] = useState(false);

  const fields = [
    {
      name: 'label',
      type: 'input',
      title: 'Label',
      placeholder: 'Navitare',
    },
    {
      name: 'safeListIpAddresses',
      type: 'input',
      title: 'Restrict to IP Address',
      placeholder: '255.255.255.125',
    },
    {
      name: 'validTill',
      type: 'date',
      title: 'Expires',
      disableDate: (current) => current && current.valueOf() < Date.now(),
    },
    {
      name: 'statusApi',
      type: 'switch',
      title: 'Status',
    },
  ];

  const initialValues1 = {
    applicationKey: nanoid(),
    subUserIds: "",
    safeListIpAddresses: "",
    subUserApiKeyModules: [
      {
        name: "",
        permissionDetail: "",
        tenant: defaultTenant,
        isActive: true,
        subUserApiKeyId: ""
      }
    ],
    validTill: "",
    statusApi: true,
    tenant: defaultTenant,
    label: ""
  };

  return (
    <>
      <Modal
        show={show}
        setShow={setShow}
        fields={fields}
        initialValues={initialValues1}
        validationSchema={validationSchema1}
        heading="Add API Key"
        submitText="Configure Permissions"
        handleSubmit={(values) => {
          const newValues = {
            ...values,
            validTill: values.validTill.toISOString(),
          };
          setShow(false);
          setAPIKeyInit(newValues);
          setShowPermissions(true);
        }}
      />
      <AddPermissions
        show={showPermissions}
        setShow={setShowPermissions}
        apiKeyInit={apiKeyInit}
      />
    </>
  );
};
