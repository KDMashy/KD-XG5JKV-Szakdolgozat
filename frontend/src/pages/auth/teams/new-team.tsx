import React, { useState, useEffect } from "react";
import { axios } from "../../../lib/axios";
import { API_URL } from "../../../constants/url";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/router";
import Container from "../../../components/Container";
import PageTitle from "../../../components/common/PageTitle";
import { Formik } from "formik";
import CustomForm from "../../../components/common/form/CustomForm";
import { CustomInput } from "../../../components/common/form/CustomInput";
import Label from "../../../components/common/form/Label";
import Button from "../../../components/common/Button";
import Loading from "../../../components/common/Loading";
import { newTeamValidation } from "../../../validations";
import TeamMemberListItem from "../../../components/common/team/TeamMemberListItem";
import Modal from "../../../components/common/modal/Modal";
import { getAvailableList, getIds } from "../../../helpers/Helpers";
import { mergeFriendlist } from "../../../helpers/Helpers";
import HeadMetaData from "../../../components/HeadMetaData";

function NewTeam() {
  const { darkMode } = useDarkMode();

  const router = useRouter();

  const { user } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: true,
  });

  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [friends, setFriends] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const initialValues = {
    team_name: "",
    team_description: "",
    team_only_creator: false,
  };

  useEffect(() => {
    if (user) setFriends(getAvailableList(mergeFriendlist(user), members));
  }, [user]);

  useEffect(() => {
    if (user) setFriends(getAvailableList(mergeFriendlist(user), members));
  }, [members]);

  const submit = async (values) => {
    setLoading(true);
    await axios(
      "post",
      `${API_URL}/team`,
      {
        members: getIds(members),
      },
      {
        team_name: values?.team_name,
        team_description: values?.team_description,
        team_creator: user?.id,
        team_only_creator: values?.team_only_creator ? 1 : 0,
      },
      (res) => {
        console.log(res.data);
      },
      null,
      () => setLoading(false)
    );
  };

  return (
    <div className="container relative max-w-[1500px] w-full mx-auto">
      <HeadMetaData title="Follofox - Új csapat létrehozása" />
      <Container
        type={darkMode ? "dark" : "light"}
        className="overflow-hidden h-[500px]"
      >
        <div className="">
          <PageTitle
            title="Új csapat létrehozása"
            type={darkMode ? "dark" : "light"}
            className="row-start-1 col-span-2"
          />
          <Formik
            validationSchema={newTeamValidation}
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
                      label="Csapat neve"
                      value={values?.team_name}
                      onChange={handleChange("team_name")}
                      touched
                      error={errors?.team_name}
                    />
                    <CustomInput
                      label="Csapat leírása"
                      value={values?.team_description}
                      onChange={handleChange("team_description")}
                      touched
                      error={errors?.team_description}
                      className="row-start-2 col-start-1 h-full overflow-y-scroll max-h-[150px] min-h-[100px]"
                      textArea
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <div className="flex justify-start">
                        <CustomInput
                          // label="Only creator can modify"
                          type="checkbox"
                          className="mr-3"
                          onChange={(e: any) => {
                            setFieldValue(
                              "team_only_creator",
                              e.target.checked
                            );
                          }}
                        />
                        <Label label="Csak a létrehozó módosíthatja" />
                      </div>
                      <Button
                        label="Csapat létrehozása"
                        clickHandler={() => handleSubmit()}
                        type={darkMode ? "dark" : "light"}
                        clickType="submit"
                        loading={loading}
                        disabled={loading}
                      />
                    </div>
                    <div className="border-2 border-dark-200 min-h-[250px] w-full mt-5 px-3 py-2 overflow-y-auto relative">
                      <div className="flex w-full text-center justify-center items-center">
                        <Button
                          label="Új csapattag"
                          clickHandler={() => {
                            setOpenModal(true);
                          }}
                          className="px-3 py-1"
                        />
                      </div>
                      {members?.map((member) => (
                        <TeamMemberListItem
                          key={`${member?.username}${member?.id}`}
                          member={member}
                          members={members}
                          setMembers={setMembers}
                        />
                      ))}
                      <Modal
                        isOpen={openModal}
                        onSetIsOpen={setOpenModal}
                        closable
                        content={
                          <div className="text-black">
                            {friends?.map((item) => (
                              <div
                                className="flex w-[200px] justify-between mx-auto my-3 text-light-400 font-semibold items-center hover:bg-dark-200 hover:bg-opacity-30 transition-all ease-in-out duration-150 rounded-md px-3 py-2"
                                key={`${item?.id}${item?.username}`}
                              >
                                <p>{item?.username}</p>
                                <CustomInput
                                  // label="Only creator can modify"
                                  type="checkbox"
                                  className="w-[30px]"
                                  onChange={(e: any) => {
                                    if (e?.target?.checked) {
                                      setSelectedUsers((prev) => [
                                        ...prev,
                                        item,
                                      ]);
                                    } else {
                                      let tmp = selectedUsers?.filter(
                                        (selected) => selected?.id !== item?.id
                                      );
                                      setSelectedUsers(tmp);
                                    }
                                  }}
                                />
                              </div>
                            ))}
                            <div className="flex justify-between w-1/2 mx-auto">
                              <Button
                                label="Vissza"
                                color="error"
                                clickHandler={() => {
                                  setSelectedUsers([]);
                                  setOpenModal(false);
                                }}
                              />
                              <Button
                                label="Kiválasztottak hozzáadása"
                                color="succes"
                                clickHandler={() => {
                                  setMembers((prev) => [
                                    ...prev,
                                    ...selectedUsers,
                                  ]);
                                  setSelectedUsers([]);
                                  setOpenModal(false);
                                }}
                              />
                            </div>
                          </div>
                        }
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

export default NewTeam;
