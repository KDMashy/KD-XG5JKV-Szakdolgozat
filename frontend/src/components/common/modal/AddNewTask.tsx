import React from "react";
import Button from "../Button";
import { CustomInput } from "../form/CustomInput";
import CustomForm from "../form/CustomForm";
import { Formik } from "formik";
import { newTaskValidation } from "../../../validations";

function AddNewTask({ submit, loading, setIsOpen, typeInfo }) {
  const initialValues = {
    task_name: "",
  };
  return (
    <div className="text-light-400 font-semibold">
      <h2 className="text-lg">Add New Column</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={newTaskValidation}
        onSubmit={(values) => submit(values, typeInfo)}
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
                  label="Task description"
                  textArea
                  value={values?.task_name ?? ""}
                  onChange={(e) => {
                    setFieldValue("task_name", e?.target?.value);
                    setFieldTouched("task_name", true);
                  }}
                  touched={touched?.task_name}
                  error={errors?.task_name}
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

export default AddNewTask;
