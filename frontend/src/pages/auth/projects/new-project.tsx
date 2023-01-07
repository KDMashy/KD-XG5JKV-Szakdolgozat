import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import Button from "../../../components/common/Button";
import CustomForm from "../../../components/common/form/CustomForm";
import { CustomInput } from "../../../components/common/form/CustomInput";
import Label from "../../../components/common/form/Label";
import Loading from "../../../components/common/Loading";
import PageTitle from "../../../components/common/PageTitle";
import Container from "../../../components/Container";
import { API_URL } from "../../../constants/url";
import { useAuth } from "../../../hooks/useAuth";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { newProjectValidation } from "../../../validations";

function NewProject() {
  const { darkMode } = useDarkMode();

  const { user } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: true,
  });

  const [loading, setLoading] = useState(false);

  const initialValues = {
    project_name: "",
    project_description: "",
    project_creator: false,
    project_only_creator: false,
  };

  const submit = async (values: any) => {
    let project = {
      project_name: values?.project_name,
      project_description: values?.project_description,
      project_creator: user?.id,
      project_only_creator: values?.project_only_creator ? 1 : 0,
    };

    if (!user) return;

    setLoading(true);
    await axios
      .post(`${API_URL}/project`, project, { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container relative max-w-[1500px] w-full mx-auto">
      <Container
        type={darkMode ? "dark" : "light"}
        className="overflow-hidden h-[500px]"
      >
        <div className="">
          <PageTitle
            title="Create New Project"
            type={darkMode ? "dark" : "light"}
            className="row-start-1 col-span-2"
          />
          <Formik
            validationSchema={newProjectValidation}
            initialValues={initialValues}
            onSubmit={(values) => submit(values)}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              setFieldValue,
            }) => {
              return (
                <CustomForm
                  handleSubmit={() => handleSubmit()}
                  className="grid grid-cols-3 gap-9"
                >
                  <div className="grid grid-rows-2 col-span-2 gap-9">
                    <CustomInput
                      label="Project name"
                      value={values?.project_name}
                      onChange={handleChange("project_name")}
                      touched
                      error={errors?.project_name}
                    />
                    <CustomInput
                      label="Project description"
                      value={values?.project_description}
                      onChange={handleChange("project_description")}
                      touched
                      error={errors?.project_description}
                      className="row-start-2 col-start-1 h-full overflow-y-scroll max-h-[150px] min-h-[100px]"
                      textArea
                    />
                  </div>
                  <div className="">
                    <div className="flex justify-between">
                      <div className="flex justify-start">
                        <CustomInput
                          // label="Only creator can modify"
                          type="checkbox"
                          className="mr-3"
                          onChange={(e: any) => {
                            setFieldValue(
                              "project_only_creator",
                              e.target.checked
                            );
                          }}
                        />
                        <Label label="Only creator can modify" />
                      </div>
                      <Button
                        label="Create Project"
                        clickHandler={() => handleSubmit()}
                        type={darkMode ? "dark" : "light"}
                        clickType="submit"
                        loading={loading}
                      />
                    </div>
                  </div>
                </CustomForm>
              );
            }}
          </Formik>
        </div>
      </Container>
      <Loading loading={loading} />
    </div>
  );
}

export default NewProject;
