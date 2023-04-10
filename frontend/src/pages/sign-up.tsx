import { Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import Button from "../components/common/Button";
import CustomForm from "../components/common/form/CustomForm";
import { CustomInput } from "../components/common/form/CustomInput";
import Loading from "../components/common/Loading";
import PageTitle from "../components/common/PageTitle";
import Container from "../components/Container";
import { API_URL } from "../constants/url";
import { useAuth } from "../hooks/useAuth";
import { useDarkMode } from "../hooks/useDarkMode";
import { axios } from "../lib/axios";
import { registrationValidation } from "../validations";

function SignUp() {
  const { darkMode } = useDarkMode();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: true,
  });

  const initialValues = {
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmation: "",
  };

  const submit = async (values: any) => {
    setLoading(true);
    await axios(
      "post",
      `${API_URL}/user/register`,
      null,
      values,
      (res: any) => {
        values.username = "";
        values.first_name = "";
        values.last_name = "";
        values.email = "";
        values.password = "";
        values.confirmation = "";
        router.push("sign-in");
      },
      null,
      setLoading(false)
    );
  };

  return (
    <div className="container relative">
      <Container type={darkMode ? "dark" : "light"}>
        <>
          <PageTitle type={darkMode ? "dark" : "light"} title="Register" />
          <Formik
            initialValues={initialValues}
            validationSchema={registrationValidation}
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
                  className="container grid grid-cols-6 grid-rows-5 gap-9"
                  handleSubmit={() => handleSubmit()}
                >
                  <div className="col-span-2 row-start-1">
                    <CustomInput
                      label="Username"
                      value={values?.username}
                      onChange={(e) => {
                        setFieldValue("username", e?.target?.value);
                        setFieldTouched("username", true);
                      }}
                      touched={touched?.username}
                      error={errors?.username}
                      minLength={5}
                      maxLength={16}
                    />
                  </div>
                  <div className="col-span-4 row-start-1">
                    <CustomInput
                      label="Email"
                      value={values?.email}
                      onChange={(e) => {
                        setFieldValue("email", e?.target?.value);
                        setFieldTouched("email", true);
                      }}
                      touched={touched?.email}
                      error={errors?.email}
                    />
                  </div>
                  <div className="col-span-3 row-start-2">
                    <CustomInput
                      label="First name"
                      value={values?.first_name}
                      onChange={(e) => {
                        setFieldValue("first_name", e?.target?.value);
                        setFieldTouched("first_name", true);
                      }}
                      touched={touched?.first_name}
                      error={errors?.first_name}
                    />
                  </div>
                  <div className="col-span-3 row-start-2">
                    <CustomInput
                      label="Last name"
                      value={values?.last_name}
                      onChange={(e) => {
                        setFieldValue("last_name", e?.target?.value);
                        setFieldTouched("last_name", true);
                      }}
                      touched={touched?.last_name}
                      error={errors?.last_name}
                    />
                  </div>
                  <div className="col-span-3 row-start-3">
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
                  <div className="col-span-3 row-start-4">
                    <CustomInput
                      label="Password Confirmation"
                      value={values?.confirmation}
                      onChange={(e) => {
                        setFieldValue("confirmation", e?.target?.value);
                        setFieldTouched("confirmation", true);
                      }}
                      touched={touched?.confirmation}
                      error={errors?.confirmation}
                      type={"password"}
                    />
                  </div>
                  <div className="col-span-3 row-start-3 row-span-2">
                    {/* ReCaptCHa */}
                  </div>
                  <div className="col-span-3 mx-auto">
                    <Button
                      label="Register"
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

export default SignUp;
