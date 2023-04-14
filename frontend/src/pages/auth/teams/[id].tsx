import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../../../components/common/Loading";
import { axios } from "../../../lib/axios";
import { API_URL } from "../../../constants/url";
import SideBar from "../../../components/common/sidebars/SideBar";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { useAuth } from "../../../hooks/useAuth";
import Container from "../../../components/Container";
import TeamMemberItem from "../../../components/common/team/TeamMemberItem";
import Modal from "../../../components/common/modal/Modal";
import { getAvailableList, mergeFriendlist } from "../../../helpers/Helpers";
import { CustomInput } from "../../../components/common/form/CustomInput";
import Button from "../../../components/common/Button";
import { NotifyMessage } from "../../../components/common/ToastNotification";

function TeamPage() {
  const router = useRouter();
  const { id } = router.query;
  const { darkMode } = useDarkMode();

  const { user } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: true,
  });

  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [hideTimer, setHideTimer] = useState(false);
  const [members, setMembers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [modalLoad, setModalLoad] = useState(false);
  const [newlyAdded, setNewlyAdded] = useState([]);

  useEffect(() => {
    if (user) setFriends(getAvailableList(mergeFriendlist(user), members));
  }, [user]);

  useEffect(() => {
    if (user) setFriends(getAvailableList(mergeFriendlist(user), members));
  }, [members]);

  const getTeamData = async (id) => {
    if (!id) return;

    setLoading(true);
    await axios(
      "get",
      `${API_URL}/team/user/${id}`,
      null,
      null,
      (res) => setTeamData(res?.data),
      null,
      setLoading(false)
    );
  };

  useEffect(() => {
    console.log(members);
  }, [members]);

  useEffect(() => {
    if (id) getTeamData(id);
  }, [id]);

  useEffect(() => {
    console.log(teamData);
    if (teamData) {
      let tmp = [];
      teamData?.membership?.map((item) => tmp.push(item?.user));
      setMembers(tmp);
    }
  }, [teamData]);

  useEffect(() => {
    console.log(members);
  }, [members]);

  const addTeamMembers = async () => {
    setModalLoad(true);
    await axios(
      "post",
      `${API_URL}/team/add-member`,
      {
        team_id: teamData?.id,
        members: selectedUsers,
      },
      null,
      (res) => {
        setMembers((prev) => [...prev, ...selectedUsers]);
        setNewlyAdded((prev) => [...prev, ...selectedUsers]);
        NotifyMessage("success", "Successfully added new users to the team");
      },
      (error) => NotifyMessage("error", "Couldn't add new users"),
      () => {
        setModalLoad(false);
        setSelectedUsers([]);
        setOpenModal(false);
      }
    );
  };

  return (
    <div className="relative">
      <div className="grid md:grid-cols-9 grid-cols-1 gap-9">
        <SideBar
          darkMode={darkMode}
          hidden={hidden}
          hideTimer={hideTimer}
          setHidden={setHidden}
          setHideTimer={setHideTimer}
          page="team"
          setOpenModal={setOpenModal}
          containerClassName={`md:col-span-2 col-span-1 md:row-start-1`}
        />
        <Container
          type={darkMode ? "dark" : "light"}
          className={`${
            hidden
              ? `${
                  hideTimer ? "md:col-span-7" : "md:col-span-9"
                } transition-all ease-in-out delay-100`
              : "md:col-span-7 transition-all ease-in-out delay-100"
          } col-span-1 md:row-start-1 row-start-2`}
          padding={`${hidden ? "py-6 pl-12" : "py-6 pl-6"}`}
        >
          <>
            {members?.map((member) => (
              <TeamMemberItem
                newlyAdded={newlyAdded}
                members={members}
                memberId={member?.id}
                setMembers={setMembers}
                teamData={teamData}
                id={
                  teamData?.membership?.filter(
                    (item) => item?.user?.id === member?.id
                  )[0]?.id
                }
                username={member?.username}
                email={member?.email}
                key={member?.email}
              />
            ))}
          </>
        </Container>
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
                        setSelectedUsers((prev) => [...prev, item]);
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
                  loading={modalLoad}
                />
                <Button
                  label="Kiválasztottak hozzáadása"
                  color="succes"
                  clickHandler={() => addTeamMembers()}
                  loading={modalLoad}
                />
              </div>
            </div>
          }
        />
      </div>
      <Loading loading={loading} />
    </div>
  );
}

export default TeamPage;
