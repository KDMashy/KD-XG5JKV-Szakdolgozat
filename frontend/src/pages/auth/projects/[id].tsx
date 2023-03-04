import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../components/common/Loading";
import Container from "../../../components/Container";
import DragNDropTable from "../../../components/dragndrop";
import { API_URL } from "../../../constants/url";
import { useAuth } from "../../../hooks/useAuth";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { axios } from "../../../lib/axios";

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

  const [cols, setCols] = useState<any>([]);
  const [tasks, setTasks] = useState<any>([]);

  useEffect(() => {
    if (id) getProjectData(id);
  }, [id]);

  const getProjectData = async (id: any) => {
    if (!id) return;

    setLoading(true);
    await axios(
      "get",
      `${API_URL}/project/${id}`,
      null,
      null,
      (res) => setProjectData(res?.data),
      null,
      setLoading(false)
    );
  };

  useEffect(() => {
    if (projectData) {
      console.log("projdata", projectData);
      setCols(
        projectData?.rows?.sort((a, b) => {
          if (a?.row_count > b?.row_count) {
            return 1;
          } else return -1;
        })
      );
      setTasks(projectData?.tasks);
    }
  }, [projectData]);

  return (
    <div className="relative">
      <div className="grid grid-cols-9 gap-9">
        <Container type={darkMode ? "dark" : "light"} className="col-span-2">
          <></>
        </Container>
        <Container type={darkMode ? "dark" : "light"} className="col-span-7">
          <DragNDropTable cols={cols} tasks={tasks} setCols={setCols} />
        </Container>
      </div>
      <Loading loading={loading} />
    </div>
  );
}

export default ProjectPage;
