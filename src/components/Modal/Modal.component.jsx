import { Modal as BSModal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import { object } from "yup";
import { passwordStrength } from "check-password-strength";
import { DatePicker } from "components";
import { Switch, Button, Checkbox } from "antd";
import { Fragment } from "react";
import { Input, MultiSelect } from "components/formFields";
import "./Modal.styles.scss";

const demoFields = [];

const vSchema = object({});

const iValues = {};

export function Modal({
  show,
  setShow,
  heading,
  fields = demoFields,
  validationSchema = vSchema,
  initialValues = iValues,
  submitText = "Add",
  cancelButtonText = "Cancel",
  handleCancel,
  customBody,
  additionalBody,
  loading,
  disableSubmit,
  centered,
  handleSubmit = (values) => console.log(values),
}) {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <BSModal
      show={show}
      onHide={handleClose}
      className={`custom-modal`}
      centered={centered}
    >
      <BSModal.Body className="modal__bg">
        <div className="modal__header">
          <h3>{heading}</h3>
        </div>
        <div className="modal__divider" />
        <div className="modal__body">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched, values }) => {
              return (
                <Form>
                  {customBody ? (
                    customBody
                  ) : (
                    <div className="modal__form">
                      {fields.map(
                        (
                          {
                            type,
                            name,
                            placeholder,
                            title,
                            options,
                            disableDate,
                            disableTime,
                            disabled,
                            users,
                            subText,
                            mode,
                            ...props
                          },
                          index
                        ) => {
                          const strength = values?.password
                            ? passwordStrength(values?.password)?.value
                            : "Password Not Entered Yet!";
                          return (
                            <Fragment key={name}>
                              <div className="modal__form-el" key={name}>
                                <p className="modal__form-el-label">{title}</p>
                                {/* Switch */}
                                {type === "date" ? (
                                  <DatePicker
                                    name={name}
                                    disableDate={disableDate}
                                    disableTime={disableTime}
                                  />
                                ) : type === "switch" ? (
                                  <Field name={name}>
                                    {({
                                      field,
                                      meta,
                                      form: { setFieldValue },
                                    }) => {
                                      return (
                                        <div className="modal__form-el-switch">
                                          <div className="modal__form-el-switch-container">
                                            <p className="modal__form-el-switch-container-label">
                                              {field?.value
                                                ? "Enabled"
                                                : "Disabled"}
                                            </p>
                                            <div>
                                              <Switch
                                                checked={field?.value}
                                                onChange={(e) =>
                                                  setFieldValue(field?.name, e)
                                                }
                                              />
                                            </div>
                                          </div>
                                          {meta.touched && meta.error && (
                                            <div className="error mt-[8px]">
                                              {meta.error}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }}
                                  </Field>
                                ) : name === "password" ? (
                                  <div className="modal__form-el-password">
                                    <Field
                                      type="password"
                                      name={name}
                                      placeholder={placeholder}
                                      className="modal__form-el-field"
                                      key={name}
                                    />
                                    <div className="modal__form-el-password-strength">
                                      <div
                                        className={`modal__form-el-password-strength-box transition-all ${
                                          strength === "Too weak"
                                            ? "bg-red-600"
                                            : strength === "Weak"
                                            ? "bg-yellow-600"
                                            : strength === "Medium"
                                            ? "bg-blue-600"
                                            : strength === "Strong"
                                            ? "bg-green-600"
                                            : "bg-[#323248]"
                                        }`}
                                      />
                                      <div
                                        className={`modal__form-el-password-strength-box transition-all ${
                                          strength === "Weak"
                                            ? "bg-yellow-600"
                                            : strength === "Medium"
                                            ? "bg-blue-600"
                                            : strength === "Strong"
                                            ? "bg-green-600"
                                            : "bg-[#323248]"
                                        }`}
                                      />
                                      <div
                                        className={`modal__form-el-password-strength-box transition-all ${
                                          strength === "Medium"
                                            ? "bg-blue-600"
                                            : strength === "Strong"
                                            ? "bg-green-600"
                                            : "bg-[#323248]"
                                        }`}
                                      />
                                      <div
                                        className={`modal__form-el-password-strength-box transition-all ${
                                          strength === "Strong"
                                            ? "bg-green-600"
                                            : "bg-[#323248]"
                                        }`}
                                      />
                                    </div>
                                    <div className="modal__form-el-password-strength-text">
                                      Use 8 or more characters with a mix of
                                      letters, numbers & symbols.
                                    </div>
                                    {touched[name] && errors[name] && (
                                      <div className="error mt-[8px]">
                                        {errors[name]}
                                      </div>
                                    )}
                                  </div>
                                ) : // Select
                                type === "select" ? (
                                  <Field name={name}>
                                    {({
                                      field,
                                      meta,
                                      form: { setFieldValue, values },
                                    }) => {
                                      const finalOptions = [
                                        ...options,
                                        // { label: placeholder, value: "" },
                                      ];
                                      return (
                                        <div className="w-full">
                                          <select
                                            value={values[name]}
                                            disabled={disabled}
                                            placeholder={placeholder}
                                            onChange={(e) => {
                                              setFieldValue(
                                                name,
                                                e.target.value
                                              );
                                              props?.action &&
                                                props?.action(e.target.value);
                                            }}
                                            className="form-select appearance-none block w-full px-[16px] h-[52px] text-base font-normal text-[#92928f] bg-[#171723] bg-clip-padding bg-no-repeat border-none rounded-[8px] transition ease-in-out m-0 focus:bg-[#171723] focus:border-none focus:outline-none"
                                          >
                                            {finalOptions?.map((option) => (
                                              <option
                                                value={option?.value}
                                                key={option?.value}
                                                className={
                                                  option?.isActive
                                                    ? "isActive"
                                                    : ""
                                                }
                                              >
                                                {option?.label}
                                              </option>
                                            ))}
                                          </select>
                                          {meta.touched && meta.error && (
                                            <div className="error mt-[8px]">
                                              {meta.error}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }}
                                  </Field>
                                ) : type === "searchable" ? (
                                  <Field name={name}>
                                    {({
                                      field,
                                      meta,
                                      form: { setFieldValue, values },
                                    }) => {
                                      return (
                                        <div className="w-full">
                                          <>
                                            <Field
                                              placeholder={placeholder}
                                              type="search"
                                              name="orderForClientId"
                                              className="modal__form-el-field"
                                              value={
                                                options?.isSelected
                                                  ? options?.clients.filter(
                                                      (client) =>
                                                        client.id ===
                                                        values[name]
                                                    )[0]?.fullName
                                                  : options?.searchTerm
                                              }
                                              onChange={options?.keyWordHandler}
                                            />

                                            {options?.searchTerm.length > 1 && (
                                              <div className="relative w-full text-left">
                                                {options?.searchResults.length >
                                                0 ? (
                                                  <ul className="absolute top-0 right-0 left-0 border-0 margin-0 bg-[#171723] pl-0 rounded shadow-md list-none max-h-48 overflow-y-auto z-50">
                                                    {options?.searchTerm &&
                                                      options?.searchResults.map(
                                                        (result) => {
                                                          return (
                                                            <li
                                                              onClick={() => {
                                                                options?.setIsSelected(
                                                                  true
                                                                );
                                                                setFieldValue(
                                                                  name,
                                                                  result.id
                                                                );
                                                                options?.setSearchTerm(
                                                                  ""
                                                                );
                                                                options?.setSearchResults(
                                                                  []
                                                                );
                                                              }}
                                                              key={result.id}
                                                              className="px-2 py-1.5 cursor-pointer capitalize border-t border-[#323248] hover:bg-[#323248] text-[#92928f]"
                                                            >
                                                              {result.fullName}
                                                            </li>
                                                          );
                                                        }
                                                      )}
                                                  </ul>
                                                ) : (
                                                  <div className="overflow-hidden absolute top-0 right-0 left-0 m-0 border-1 border-[#323248] bg-[#171723] z-50 rounded-md pt-2 px-2.5 pb-3 shadow-md">
                                                    Ooops, No Client match for{" "}
                                                    <strong className="text-primary">
                                                      {options?.searchTerm}
                                                    </strong>{" "}
                                                    found!
                                                  </div>
                                                )}
                                              </div>
                                            )}
                                          </>
                                          {meta.touched && meta.error && (
                                            <div className="error mt-[8px]">
                                              {meta.error}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }}
                                  </Field>
                                ) : type === "file" ? ( // sorry, I wrote my own JSX for input type file because ImageUpload component doesn't look like on the Adobe design
                                  <Field name={name}>
                                    {({
                                      field,
                                      meta,
                                      form: { setFieldValue, values },
                                    }) => {
                                      return (
                                        <div className="modal__form-el-password">
                                          <label
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              flexDirection: "row-reverse",
                                              justifyContent: "space-between",
                                            }}
                                            key={name}
                                            htmlFor="typeFile"
                                            className="w-full px-[16px] h-[52px] text-[#92928f] bg-[#171723] rounded-[8px] transition ease-in-out focus:bg-[#171723] focus:border-none focus:outline-none"
                                          >
                                            <div
                                              style={{
                                                color: "#3699FF",
                                                fontSize: "10px",
                                              }}
                                            >
                                              {subText}
                                            </div>
                                            <div>
                                              <img
                                                src={values[name]}
                                                alt=""
                                                id="img"
                                                style={{
                                                  border: "none",
                                                  outline: "none",
                                                  width: `${
                                                    values[name] && "50px"
                                                  }`,
                                                  height: `${
                                                    values[name] && "35px"
                                                  }`,
                                                }}
                                              />
                                            </div>
                                            <input
                                              type="file"
                                              id="typeFile"
                                              name={name}
                                              style={{ display: "none" }}
                                              onChange={(event) => {
                                                const [file] =
                                                  event.target.files;
                                                let logo =
                                                  event.target.files[0];
                                                let url =
                                                  URL.createObjectURL(logo);
                                                let img =
                                                  document.getElementById(
                                                    "img"
                                                  );
                                                if (file) {
                                                  setFieldValue(name, url);
                                                  setFieldValue(
                                                    "image",
                                                    event.target.files[0]
                                                  );
                                                }
                                                img.src = url;
                                                img.style.width = "50px";
                                                img.style.height = "35px";
                                              }}
                                            />
                                          </label>
                                        </div>
                                      );
                                    }}
                                  </Field>
                                ) : type === "userList" ? (
                                  <Field name={name}>
                                    {({
                                      field,
                                      meta,
                                      form: { setFieldValue, values },
                                    }) => {
                                      return (
                                        <div className="w-full">
                                          <div className="bg_col">
                                            <Checkbox.Group
                                              defaultValue={values[name]}
                                              onChange={(checkedValues) => {
                                                values[`${name}`] =
                                                  checkedValues;
                                              }}
                                            >
                                              {users?.map(
                                                (user) =>
                                                  user.fullName && (
                                                    <Checkbox
                                                      value={user.id}
                                                      className="custdes"
                                                    >
                                                      <div className="image_wr">
                                                        <div className="imgwrap">
                                                          {user.imageUrl ? (
                                                            <img
                                                              alt=""
                                                              src={
                                                                user.imageUrl
                                                              }
                                                            />
                                                          ) : (
                                                            <img
                                                              alt=""
                                                              src={
                                                                "https://via.placeholder.com/200"
                                                              }
                                                            />
                                                          )}
                                                        </div>
                                                        <div className="lablwrap">
                                                          {user.fullName}
                                                        </div>
                                                      </div>
                                                    </Checkbox>
                                                  )
                                              )}
                                            </Checkbox.Group>
                                          </div>
                                          {meta.touched && meta.error && (
                                            <div className="error mt-[8px]">
                                              {meta.error}
                                            </div>
                                          )}
                                        </div>
                                      );
                                    }}
                                  </Field>
                                ) : type === "multiselect" ? (
                                  <MultiSelect
                                    name={name}
                                    options={options}
                                    placeholder={placeholder}
                                    mode={mode}
                                    disabled={false}
                                    className="bg-[#171723]"
                                  />
                                ) : type === "textarea" ? (
                                  <Input
                                    name={name}
                                    type="textarea"
                                    placeholder={placeholder}
                                  />
                                ) : (
                                  <>
                                    <Field
                                      className="modal__form-el-field"
                                      key={name}
                                      type={type}
                                      name={name}
                                      placeholder={placeholder}
                                      disabled={disabled}
                                    />
                                    {touched[name] && errors[name] && (
                                      <div className="error mt-[8px]">
                                        {errors[name]}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </Fragment>
                          );
                        }
                      )}
                    </div>
                  )}
                  {additionalBody ? additionalBody : <></>}
                  <div
                    className={`modal__buttons grid ${
                      submitText ? "grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    <button
                      onClick={handleCancel ? handleCancel : handleClose}
                      type="button"
                      className="modal__buttons-btn modal__buttons-btn-secondary"
                    >
                      {cancelButtonText}
                    </button>
                    {submitText && (
                      <Button
                        htmlType="submit"
                        loading={loading}
                        className="modal__buttons-btn modal__buttons-btn-primary"
                        disabled={disableSubmit}
                      >
                        {submitText}
                      </Button>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </BSModal.Body>
    </BSModal>
  );
}
