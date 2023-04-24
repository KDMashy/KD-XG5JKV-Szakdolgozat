import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import PageTitle from "../../components/common/PageTitle";
import { useDarkMode } from "../../hooks/useDarkMode";
import Container from "../../components/Container";
import { Formik } from "formik";
import CustomForm from "../../components/common/form/CustomForm";
import Button from "../../components/common/Button";
import { CustomInput } from "../../components/common/form/CustomInput";
import { saveAccountValidation } from "../../validations";
import { axios } from "../../lib/axios";
import { API_URL } from "../../constants/url";
import { NotifyMessage } from "../../components/common/ToastNotification";
import HeadMetaData from "../../components/HeadMetaData";

function Settings() {
  const { darkMode } = useDarkMode();
  const { user } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: true,
  });

  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    first_name: "",
    last_name: "",
  };

  useEffect(() => {
    if (user) {
      initialValues.first_name = user?.first_name;
      initialValues.last_name = user?.last_name;
      setData(user);
    }
  }, [user]);

  const submit = async (values) => {
    setLoading(true);
    let tmp: any = data;
    tmp.first_name = values?.first_name;
    tmp.last_bane = values?.last_name;
    await axios(
      "put",
      `${API_URL}/user/edit`,
      null,
      tmp,
      (res) => NotifyMessage("success", "Sikeresen elmentette a változásokat"),
      (error) => NotifyMessage("error", "Valami hiba történt a mentés közben"),
      setLoading(false)
    );
  };

  return (
    <div>
      <HeadMetaData title="Follofox - Fiók beállítások" />
      <Container type={darkMode ? "dark" : "light"}>
        <>
          <PageTitle
            type={darkMode ? "dark" : "light"}
            title="Fiók beállítások"
          />
          <Formik
            validationSchema={saveAccountValidation}
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
                  className="container flex flex-col lg:w-[50%] md:w-[75%] w-full"
                  handleSubmit={() => handleSubmit()}
                >
                  <CustomInput
                    className="my-2"
                    label="Keresztnév"
                    value={values?.first_name}
                    onChange={(e) => {
                      setFieldValue("first_name", e?.target?.value);
                      setFieldTouched("first_name", true);
                    }}
                    touched={touched?.first_name}
                    error={errors?.first_name}
                  />
                  <CustomInput
                    className="my-2"
                    label="Vezetéknév"
                    value={values?.last_name}
                    onChange={(e) => {
                      setFieldValue("last_name", e?.target?.value);
                      setFieldTouched("last_name", true);
                    }}
                    touched={touched?.last_name}
                    error={errors?.last_name}
                  />
                  <Button
                    label="Mentés"
                    clickHandler={() => handleSubmit()}
                    type={darkMode ? "dark" : "light"}
                    clickType="submit"
                    className="mt-5"
                    loading={loading}
                  />
                </CustomForm>
              );
            }}
          </Formik>
        </>
      </Container>
    </div>
  );
}

export default Settings;
