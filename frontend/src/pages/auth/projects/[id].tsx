import axios, { Axios } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/common/Loading";
import Container from "../../../components/Container";
import { API_URL } from "../../../constants/url";
import { useAuth } from "../../../hooks/useAuth";
import { useDarkMode } from "../../../hooks/useDarkMode";

function ProjectPage() {
  const { darkMode } = useDarkMode();

  const { user } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: true,
  });

  const router = useRouter();

  const { id } = router.query;

  const [loading, setLoading] = useState(true);

  const [projectData, setProjectData] = useState<any>(null);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    if (id) getProjectData(id, cancelToken);
    return () => cancelToken.cancel();
  }, [id]);

  const getProjectData = async (id: any, cancelToken: any) => {
    if (!id) return;

    setLoading(true);
    await axios
      .get(`${API_URL}/project/${id}`, {
        withCredentials: true,
        cancelToken: cancelToken.token,
      })
      .then((res) => setProjectData(res?.data))
      .catch((error) => {
        if (axios.isCancel(error)) return;
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (projectData)
      console.log("projdata", projectData?.user_projects[0]?.user);
  }, [projectData]);

  return (
    <div className="relative">
      <div className="grid grid-cols-9 gap-9">
        <Container type={darkMode ? "dark" : "light"} className="col-span-2">
          <></>
        </Container>
        <Container type={darkMode ? "dark" : "light"} className="col-span-7">
          <></>
        </Container>
      </div>
      <Loading loading={loading} />
    </div>
  );
}

export default ProjectPage;
