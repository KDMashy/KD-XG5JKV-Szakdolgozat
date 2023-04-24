import React, { useState, useEffect } from "react";
import { API_URL } from "../../../constants/url";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import { useDarkMode } from "../../../hooks/useDarkMode";
import Container from "../../../components/Container";
import Button from "../../../components/common/Button";
import { ListItem } from "../../../components/common/list/ProjectListItem";
import Loading from "../../../components/common/Loading";
import HeadMetaData from "../../../components/HeadMetaData";

function Teams() {
  const { darkMode } = useDarkMode();

  const { user } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: true,
  });

  const [init, setInit] = useState(true);

  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<any>([]);

  // const addNewMember = async (values) => {
  //   await axios(
  //     "post",
  //     `${API_URL}/team/add-member`,
  //     {
  //       team_id: 11,
  //       members: [4],
  //     },
  //     null,
  //     (res) => {
  //       console.log(res.data);
  //     }
  //   );
  // };

  // const removeMember = async (member) => {
  //   await axios(
  //     "delete",
  //     `${API_URL}/team/remove-member`,
  //     {
  //       team: 11,
  //       member: 4,
  //     },
  //     null,
  //     (res) => {
  //       console.log(res.data);
  //     }
  //   );
  // };

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    if (user) {
      setInit(false);
      if (teams?.length === 0) getData(cancelToken);
    } else {
      setInit(true);
    }
    return () => cancelToken.cancel();
  }, [user]);

  const getData = async (cancelToken: any) => {
    setLoading(true);
    await axios
      .get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
        withCredentials: true,
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        res.data?.created_teams.map((item: any) => {
          setTeams((prev: any) => [...prev, item]);
        });
        res.data?.team_member.map((membership: any) => {
          let found = false;

          for (let item of res.data?.created_teams) {
            if (item?.id === membership?.team?.id) {
              found = true;
              break;
            }
          }

          if (!found) {
            setTeams((prev: any) => [...prev, membership?.team]);
          }
        });
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container relative">
      <HeadMetaData title="Follofox - Csapatok" />
      <div className="grid grid-cols-7 gap-9">
        <Container
          type={darkMode ? "dark" : "light"}
          className="col-span-2 max-h-[230px] overflow-hidden"
        >
          <div className="flex flex-col">
            <Button
              label="Új csapat"
              type={darkMode ? "dark" : "light"}
              className="bg-dark-100 text-light-400 h-[70px] mb-10 w-full"
              route="/auth/teams/new-team"
            />
            {/* NO CHECKBOXES YET */}
            {/* <Button
              label="Remove Selected"
              type={darkMode ? "dark" : "light"}
              className="h-[70px]"
              disabled={true}
            /> */}
          </div>
        </Container>
        <Container
          type={darkMode ? "dark" : "light"}
          className="col-span-5 max-h-[650px] overflow-y-scroll py-0"
        >
          <>
            {teams.length > 0 &&
              teams.map((item: any) => (
                <ListItem
                  key={item?.team_name}
                  name={item?.team_name}
                  description={item?.team_description}
                  id={item?.id}
                  darkMode={darkMode}
                  project={false}
                />
              ))}
          </>
        </Container>
      </div>
      <Loading loading={init || loading} />
    </div>
  );
}

export default Teams;
