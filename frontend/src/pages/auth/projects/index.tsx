import axios from "axios";
import React, { useEffect, useState } from "react";
import Avatar from "../../../components/common/Avatar";
import Button from "../../../components/common/Button";
import { ListItem } from "../../../components/common/list/ProjectListItem";
import Loading from "../../../components/common/Loading";
import Container from "../../../components/Container";
import { API_URL } from "../../../constants/url";
import { useAuth } from "../../../hooks/useAuth";
import { useDarkMode } from "../../../hooks/useDarkMode";

function Projects() {
  const { darkMode } = useDarkMode();

  const { user } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: true,
  });

  const [init, setInit] = useState(true);

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any>([]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    if (user) {
      setInit(false);
      if (projects?.length === 0) getData(cancelToken);
    } else {
      setInit(true);
    }
    return () => cancelToken.cancel();
  }, [user]);

  const getData = async (cancelToken: any) => {
    setLoading(true);
    await axios
      .get(`${API_URL}/project/user/${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
        withCredentials: true,
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        res.data?.created_projects.map((item: any) => {
          setProjects((prev: any) => [...prev, item]);
        });
        res.data?.team_member.map((membership: any) => {
          membership?.team?.projects.map((member_projects: any) => {
            let found = false;

            for (let item of res.data?.created_projects) {
              if (item?.id === member_projects?.project?.id) {
                found = true;
                break;
              }
            }

            if (!found) {
              setProjects((prev: any) => [...prev, member_projects?.project]);
            }
          });
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
      <div className="grid grid-cols-7 gap-9">
        <Container
          type={darkMode ? "dark" : "light"}
          className="col-span-2 max-h-[230px] overflow-hidden"
        >
          <div className="flex flex-col">
            <Button
              label="Új projekt"
              type={darkMode ? "dark" : "light"}
              className="bg-dark-100 text-light-400 h-[70px] mb-10 w-full"
              route="/auth/projects/new-project"
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
            {projects.length > 0 &&
              projects.map((item: any) => (
                <ListItem
                  key={item?.project_name}
                  name={item?.project_name}
                  description={item?.project_description}
                  url={item?.project_url}
                  id={item?.id}
                  badges={item?.badges}
                  darkMode={darkMode}
                />
              ))}
          </>
        </Container>
      </div>
      <Loading loading={init || loading} />
    </div>
  );
}

export default Projects;
