import { Formik } from "formik";
import React from "react";
import { newColumnValidation } from "../../../validations";
import Button from "../Button";
import CustomForm from "../form/CustomForm";
import { CustomInput } from "../form/CustomInput";

function AddNewList({ submit, loading, setIsOpen }) {
  const initialValues = {
    row_name: "",
  };
  return (
    <div className="text-light-400 font-semibold">
      <h2 className="text-lg">Add New Column</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={newColumnValidation}
        onSubmit={(values) => submit(values)}
      >
        {({
          handleChange,
          setFieldValue,
          errors,
          values,
          handleSubmit,
          touched,
          setFieldTouched,
        }) => {
          return (
            <CustomForm handleSubmit={() => handleSubmit()}>
              <div className="text-left w-[calc(100%-30%)] mx-auto">
                <CustomInput
                  label="Column Name"
                  value={values?.row_name ?? ""}
                  onChange={(e) => {
                    setFieldValue("row_name", e?.target?.value);
                    setFieldTouched("row_name", true);
                  }}
                  touched={touched?.row_name}
                  error={errors?.row_name}
                />
                <div className="flex justify-between mt-10">
                  <Button
                    label="Cancel"
                    type="dark"
                    color="error"
                    loading={loading}
                    clickHandler={() => setIsOpen(false)}
                  />
                  <Button
                    label="Create"
                    type="dark"
                    color="primary"
                    loading={loading}
                    clickHandler={() => handleSubmit()}
                  />
                </div>
              </div>
            </CustomForm>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddNewList;
