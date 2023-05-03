import React, { useEffect, useState } from "react";
import { axios } from "../../../lib/axios";
import { API_URL } from "../../../constants/url";
import { getAvailableAndAddedTeams } from "../../../helpers/Helpers";
import { CustomInput } from "../form/CustomInput";
import Button from "../Button";
import Loading from "../Loading";
import { NotifyMessage } from "../ToastNotification";
import { useRouter } from "next/router";

function AddTeamModal({ pageData = null, setOpenModal, refreshData = null }) {
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [alreadyAdded, setAlreadyAdded] = useState([]);
  const [wasTeams, setWasTeams] = useState([]);

  const router = useRouter();

  const getTeamData = async () => {
    setLoading(true);
    await axios(
      "get",
      `${API_URL}/team/${pageData?.project_creator?.id}`,
      null,
      null,
      (res) => {
        let tmpProjectTeams = [];
        pageData?.teams?.map((item) => tmpProjectTeams?.push(item?.team));
        let tmp = getAvailableAndAddedTeams(tmpProjectTeams, res?.data);
        setTeams(tmp?.teams);
        setAlreadyAdded(tmp?.project);
        setWasTeams(pageData?.teams);
      },
      null,
      setLoading(false)
    );
  };

  useEffect(() => {
    getTeamData();
  }, []);

  const addForOther = (team, type: "team" | "added") => {
    if (type === "team") {
      setTeams(teams?.filter((item) => item?.id !== team?.id));
      setAlreadyAdded((prev) => [...prev, team]);
    } else {
      setTeams((prev) => [...prev, team]);
      setAlreadyAdded(alreadyAdded?.filter((item) => item?.id !== team?.id));
    }
  };

  const createRecords = async () => {
    setLoading(true);
    let wasFailAdd = false;
    for (const item of alreadyAdded) {
      if (!wasTeams?.filter((was) => was?.team?.id === item?.id)[0]) {
        await axios(
          "post",
          `${API_URL}/project/add-team`,
          {
            team: item?.id,
            project: pageData?.id,
          },
          null,
          null,
          (error) => (wasFailAdd = true)
        );
      }
    }
    for (const item of teams) {
      if (wasTeams?.filter((was) => was?.team?.id === item?.id)[0]) {
        await axios(
          "delete",
          `${API_URL}/project/remove-team/${
            wasTeams?.filter((was) => was?.team?.id === item?.id)[0]?.id
          }`,
          null,
          null,
          null,
          (error) => (wasFailAdd = true)
        );
      }
    }
    if (wasFailAdd)
      NotifyMessage(
        "error",
        "Nem sikerült hozzáadni, vagy törölni valamelyik csapatot"
      );
    await setLoading(false);
  };

  const beforeClose = async () => {
    await createRecords();
    await refreshData(pageData?.id);
    setOpenModal(false);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-black border-x-2 border-dark-200 mb-14 mt-3 pb-10 pt-5">
          <h3 className="text-lg font-semibold mx-auto text-center -mt-3 mb-5 text-light-400">
            Választható csapatok
          </h3>
          {teams?.map((item) => (
            <div
              className="flex w-[200px] justify-between mx-auto my-3 text-light-400 font-semibold items-center hover:bg-dark-200 hover:bg-opacity-30 transition-all ease-in-out duration-150 rounded-md px-3 py-2"
              key={`${item?.id}${item?.team_name}`}
            >
              <p>{item?.team_name}</p>
              <CustomInput
                // label="Only creator can modify"
                type="checkbox"
                className="w-[30px]"
                onChange={(e: any) => {
                  addForOther(item, "team");
                }}
              />
            </div>
          ))}
          {teams?.length <= 0 && (
            <p className="text-center text-light-400 font-semibold">
              Nincs hozzáadható csapat
            </p>
          )}
        </div>
        <div className="text-black border-x-2 border-dark-200 mb-14 mt-3 pb-10 pt-5">
          <h3 className="text-lg font-semibold mx-auto text-center -mt-3 mb-5">
            Hozzáadott csapatok
          </h3>
          {alreadyAdded?.map((item) => (
            <div
              className="flex w-[200px] justify-between mx-auto my-3 text-light-400 font-semibold items-center hover:bg-dark-200 hover:bg-opacity-30 transition-all ease-in-out duration-150 rounded-md px-3 py-2"
              key={`${item?.id}${item?.team_name}`}
            >
              <p>{item?.team_name}</p>
              <CustomInput
                // label="Only creator can modify"
                type="checkbox"
                className="w-[30px]"
                onChange={(e: any) => {
                  addForOther(item, "added");
                }}
              />
            </div>
          ))}
          {alreadyAdded?.length <= 0 && (
            <p className="text-center text-light-400 font-semibold">
              Nincs hozzáadott csapat
            </p>
          )}
        </div>
      </div>

      <Loading loading={loading} />

      <div className="flex justify-between w-1/2 mx-auto">
        <Button
          label="Vissza"
          color="error"
          clickHandler={() => {
            setOpenModal(false);
          }}
          loading={loading}
        />
        <Button
          label="Kiválasztottak hozzáadása"
          color="succes"
          clickHandler={async () => {
            await beforeClose();
          }}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default AddTeamModal;
