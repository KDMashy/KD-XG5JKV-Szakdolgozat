import React, { useState } from "react";
import { Formik } from "formik";
import Loading from "../components/common/Loading";
import PageTitle from "../components/common/PageTitle";
import Container from "../components/Container";
import { loginValidation } from "../validations";
import { CustomInput } from "../components/common/form/CustomInput";
import Button from "../components/common/Button";
import axios from "axios";
import CustomForm from "../components/common/form/CustomForm";
import { useDarkMode } from "../hooks/useDarkMode";

function SignIn() {
  const { darkMode } = useDarkMode();

  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    password: "",
  };

  const submit = async (values: any) => {
    setLoading(true);
    await axios
      .post(`http://localhost:8000/auth/login`, values)
      .then((res) => {
        values.username = "";
        values.password = "";
        localStorage.setItem("JWT", res.data?.access_token);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container relative">
      <Container type={darkMode ? "dark" : "light"}>
        <>
          <PageTitle type={darkMode ? "dark" : "light"} title="Login" />
          <Formik
            validationSchema={loginValidation}
            initialValues={initialValues}
            onSubmit={(values) => submit(values)}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              values,
              setFieldValue,
              setFieldTouched,
              touched,
            }) => {
              return (
                <CustomForm className="container grid grid-cols-6 grid-rows-2 gap-9">
                  <div className="col-span-4 row-start-1">
                    <CustomInput
                      label="Email"
                      value={values?.username}
                      onChange={handleChange("username")}
                      touched
                      error={errors?.username}
                    />
                  </div>
                  <div className="col-span-2 row-start-1">
                    <CustomInput
                      label="Password"
                      value={values?.password}
                      onChange={handleChange("password")}
                      touched
                      error={errors?.password}
                      type={"password"}
                    />
                  </div>
                  <div className="col-span-6 row-start-2 mx-auto">
                    <Button
                      label="Login"
                      clickHandler={() => handleSubmit()}
                      type={darkMode ? "dark" : "light"}
                      clickType="submit"
                      loading={loading}
                    />
                  </div>
                </CustomForm>
              );
            }}
          </Formik>
        </>
      </Container>
      <Loading loading={loading} />
    </div>
  );
}

export default SignIn;
