import { Field } from 'formik';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import './style.scss';

export const ImageUpload = ({ name, accept, placeholder, hidePreview }) => {
  const inputRef = useRef(null);
  return (
    <Field name={name} className="image-upload">
      {({ meta, form: { setFieldValue, values } }) => (
        <>
          <input
            type="file"
            accept={accept || 'image/*'}
            id="imgInp"
            className="image-upload__el"
            style={{ display: 'none' }}
            ref={inputRef}
            onChange={(e) => {
              const [file] = e.target.files;
              if (file) {
                const fileSize = (file.size / 1024 / 1024).toFixed(4);
                if (fileSize <= 2) {
                  setFieldValue(name, e.target.files[0]);
                  if (!hidePreview) {
                    setFieldValue('preview', URL.createObjectURL(file));
                  }
                } else {
                  toast.error('Please select image below 2MB.');
                }
              }
            }}
          />
          <div className="w-full flex gap-[18px]">
            <div className="flex justify-between w-full bg-[#171723] items-center rounded-[8px] p-[16px]">
              <div className="text-[#92928F] text-[14px]">
                {values?.[name]?.name
                  ? values?.[name]?.name
                  : placeholder
                  ? placeholder
                  : 'Select Image (Max Size 2MB)'}
              </div>
              <div
                className="text-[#3699FF] text-[14px] cursor-pointer"
                onClick={() => inputRef.current.click()}
              >
                Browse
              </div>
            </div>
            {hidePreview ? (
              <></>
            ) : (
              <>
                {values?.preview ? (
                  <img
                    src={values?.preview}
                    className="h-[52px] w-[60px] rounded-[5px]"
                    alt="preview"
                  />
                ) : (
                  <div className="h-[52px] w-[60px] rounded-[5px] border-1 border-[#3699FF] flex items-center justify-center text-white text-[10px]">
                    Preview
                  </div>
                )}
              </>
            )}
          </div>
          {meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </>
      )}
    </Field>
  );
};
