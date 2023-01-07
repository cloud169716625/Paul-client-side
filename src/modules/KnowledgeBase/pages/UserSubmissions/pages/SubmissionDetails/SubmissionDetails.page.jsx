import { EditorState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

// Custom Modules
import { ConfigurationEditor, EmailBodyInput, Button } from 'components';
import { addEmailTemplate } from 'store';
import './SubmissionDetails.styles.scss';

// const ConfigurationEditor = ({ editorState, onEditorStateChange, onBlur }) => {
//   return (
//     <div className="configuration-editor">
//       <div className="configuration-editor__container">
//         <SMTPEditor
//           editorState={editorState}
//           wrapperClassName="configuration-editor__container-wrapper"
//           editorClassName="configuration-editor__container-editor"
//           onChange={onEditorStateChange}
//           placeholder="Start typing here..."
//           onBlur={onBlur}
//         />
//       </div>
//     </div>
//   );
// };

// const getInputEl = ({ options, name, placeholder, type }) => {
//   switch (type) {
//     case 'multiselect':
//       return (
//         <div className="custom-multiselect-kba w-full">
//           <MultiSelect name={name} options={options} mode="multiple" />
//         </div>
//       );
//     case 'text':
//       return (
//         <Field
//           name={name}
//           placeholder={placeholder}
//           className="h-[52px] w-[60%] text-[#92928f] placeholder:text-[#92928f] bg-[transparent] focus-visible:outline-none"
//         />
//       );
//     case 'select':
//       return (
//         <div className="custom-select-kba w-full">
//           <Input
//             type={type}
//             placeholder={placeholder}
//             name={name}
//             options={options}
//           />
//         </div>
//       );
//     default:
//       break;
//   }
// };

// const EmailBodyInput = ({
//   touched,
//   errors,
//   name,
//   placeholder,
//   type,
//   label,
//   options,
// }) => {
//   return (
//     <div className="flex gap-[20px] bg-[transparent] items-center border-b-[1px] border-b-[#323248] border-dashed">
//       <h6 className="pl-[32px] text-white whitespace-nowrap w-[15%]">
//         {label}
//       </h6>
//       {getInputEl({ options, name, placeholder, type })}
//       {touched[name] && errors[name] && (
//         <div className="error whitespace-nowrap mr-[12px] mt-[0px] w-[20%]">
//           {errors[name]}
//         </div>
//       )}
//     </div>
//   );
// };

export const SubmissionDetails = () => {
  const initialValues = {
    title: '',
    categories: [],
    visibility: 'public',
    body: '',
    status: 'draft',
    bodyHolder: EditorState.createEmpty(),
    articleStatus: true,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('This field is required!'),
    visibility: Yup.string().required('This field is required!'),
    body: Yup.string().required('This field is required!'),
  });

  const fields = [
    {
      name: 'title',
      type: 'text',
      label: 'Article Ttitle',
    },
    {
      name: 'categories',
      type: 'multiselect',
      options: [
        { label: 'Category 1', value: '1' },
        { label: 'Category 2', value: '2' },
      ],
      label: 'Categories',
    },
    {
      name: 'visibility',
      type: 'select',
      label: 'Visibility',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Private', value: 'private' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Publish', value: 'publish' },
      ],
    },
    // {
    //   name: 'articleStatus',
    //   type: 'switch',
    //   label: 'Article Status',
    // },
    // {
    //   name: 'image',
    //   type: 'file',
    //   label: 'Choose Image',
    // },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values) => {
        await dispatch(addEmailTemplate({ data: values }));
        navigate('/admin/dashboard/settings/email-templates');
      }}
    >
      {({ values, errors, touched, setFieldValue, setFieldTouched }) => {
        return (
          <Form>
            {/* TODO: Change Spinning When Integration */}
            <Spin spinning={false}>
              <div className="grid grid-cols-[1fr] gap-[20px] px-[32px] py-[40px]">
                <div className="flex flex-col gap-[20px]">
                  <div className="bg-[#1E1E2D] rounded-[8px]">
                    <h6 className="text-white font-medium p-[32px] text-[16px]">
                      Submission Details
                    </h6>
                    {/* Other Inputs */}
                    <div className="flex flex-col gap-[2px]">
                      {fields?.map((field, idx) => {
                        return (
                          <EmailBodyInput
                            key={`field-${idx}`}
                            options={field?.options}
                            name={field?.name}
                            label={field?.label}
                            type={field?.type}
                            placeholder={field?.placeholder}
                            touched={touched}
                            errors={errors}
                          />
                        );
                      })}
                    </div>
                    <ConfigurationEditor
                      editorState={values.bodyHolder}
                      onBlur={() => setFieldTouched('body', true)}
                      onEditorStateChange={(state) => {
                        setFieldValue('bodyHolder', state);
                        const currentContentAsHTML = convertToHTML(
                          state.getCurrentContent()
                        );
                        if (
                          convertToRaw(state.getCurrentContent()).blocks
                            .length === 1 &&
                          convertToRaw(state.getCurrentContent()).blocks[0]
                            .text === ''
                        ) {
                          setFieldValue('body', '');
                        } else {
                          setFieldValue('body', currentContentAsHTML);
                        }
                      }}
                    />
                    {touched['body'] && errors['body'] && (
                      <div className="error whitespace-nowrap ml-[32px] mb-[16px] w-[20%]">
                        {errors['body']}
                      </div>
                    )}
                    <div className="p-[32px] pt-[10px] flex items-center gap-[16px]">
                      <Button htmlType="submit" className="w-[fit_content]">
                        Approve Submission
                      </Button>
                      <Button
                        type="ghost"
                        htmlType="submit"
                        className="w-[fit_content]"
                      >
                        Generate Ticket
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Spin>
          </Form>
        );
      }}
    </Formik>
  );
};
