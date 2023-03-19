import React, { useState } from "react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import Loading from "../components/common/Loading";
import PageTitle from "../components/common/PageTitle";
import Container from "../components/Container";
import { loginValidation } from "../validations";
import { CustomInput } from "../components/common/form/CustomInput";
import Button from "../components/common/Button";
import CustomForm from "../components/common/form/CustomForm";
import { useDarkMode } from "../hooks/useDarkMode";
import { API_URL } from "../constants/url";
import { useAuth } from "../hooks/useAuth";
import { axios } from "../lib/axios";

function SignIn() {
  const { darkMode } = useDarkMode();

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: true,
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const submit = async (values: any) => {
    setLoading(true);
    let token = "";
    await axios(
      "post",
      `${API_URL}/auth/login`,
      null,
      values,
      (res: any) => {
        values.username = "";
        values.password = "";
        localStorage.setItem("JWT", res.data?.access_token);
        token = res.data.access_token;
      },
      null,
      setLoading(false)
    );
    await axios("get", `${API_URL}/user`, null, null, (res: any) =>
      router.push("/auth/projects")
    );
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
                <CustomForm
                  className="container grid grid-cols-6 grid-rows-2 gap-9"
                  handleSubmit={() => handleSubmit()}
                >
                  <div className="col-span-4 row-start-1">
                    <CustomInput
                      label="Email"
                      value={values?.username}
                      onChange={(e) => {
                        setFieldValue("username", e?.target?.value);
                        setFieldTouched("username", true);
                      }}
                      touched={touched?.username}
                      error={errors?.username}
                    />
                  </div>
                  <div className="col-span-2 row-start-1">
                    <CustomInput
                      label="Password"
                      value={values?.password}
                      onChange={(e) => {
                        setFieldValue("password", e?.target?.value);
                        setFieldTouched("password", true);
                      }}
                      touched={touched?.password}
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
