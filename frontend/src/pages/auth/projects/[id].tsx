import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../../components/common/Loading";
import AddNewList from "../../../components/common/modal/AddNewList";
import Modal from "../../../components/common/modal/Modal";
import SideBar from "../../../components/common/sidebars/SideBar";
import { NotifyMessage } from "../../../components/common/ToastNotification";
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

  const [hidden, setHidden] = useState(true);
  const [hideTimer, setHideTimer] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<"item" | "list" | "task" | null>(null);
  const [modalLoad, setModalLoad] = useState(false);
  const [taskData, setTaskData] = useState(null);

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

  const addNewTask = async (values) => {};

  const addNewCol = async (values) => {
    setModalLoad(true);
    await axios(
      "post",
      `${API_URL}/project/row`,
      null,
      {
        row_name: values?.row_name ?? "Unknown",
        project: projectData?.id ?? null,
        count: cols?.length + 1,
      },
      (res) => {
        setCols((prev) => [...prev, res?.data]);
        NotifyMessage("success", "Successfully created new Column");
      },
      (error) => {
        NotifyMessage("error", "Couldn't create new Column");
      },
      () => {
        setModalLoad(false);
        setIsOpen(false);
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
          <DragNDropTable
            cols={cols}
            tasks={tasks}
            setCols={setCols}
            setIsOpen={setIsOpen}
            setType={setType}
            setTaskData={setTaskData}
          />
        </Container>
        <Modal
          isOpen={isOpen}
          onSetIsOpen={setIsOpen}
          closable
          content={
            type === "list" ? (
              <AddNewList
                submit={addNewCol}
                setIsOpen={setIsOpen}
                loading={modalLoad}
              />
            ) : (
              <></>
            )
          }
        />
      </div>
      <Loading loading={loading} />
    </div>
  );
}

export default ProjectPage;
