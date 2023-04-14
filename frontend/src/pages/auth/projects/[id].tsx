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
import AddNewTask from "../../../components/common/modal/AddNewTask";

function ProjectPage() {
  const { darkMode } = useDarkMode();

  const { user } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: true,
  });

  const router = useRouter();

  const { id } = router.query;

  const [loading, setLoading] = useState(true);

  const [projectData, setProjectData] = useState(null);

  const [cols, setCols] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [badges, setBadges] = useState([]);

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

  const deleteFunc = async (type: "task" | "col", index) => {
    await axios(
      "delete",
      `${API_URL}/${type === "task" ? `task` : `project/row`}/${index}`,
      null,
      null,
      (res) => {
        let tmp = [];
        if (type === "task") {
          tmp = tasks?.filter((task) => task?.id !== index);
          setTasks(tmp);
        } else {
          tmp = cols?.filter((col) => col?.id !== index);
          setCols(tmp);
        }
        NotifyMessage(
          "success",
          `Successfully deleted a ${type === "task" ? "Task" : "Column"}`
        );
      },
      (error) => {
        NotifyMessage(
          "error",
          `Couldn't delete ${type === "task" ? "Task" : "Column"}`
        );
      }
    );
  };

  const editFunc = async (type: "task" | "col", values) => {
    setModalLoad(true);
    await axios(
      "put",
      `${API_URL}/${type === "task" ? `task` : `project/row`}/${values?.id}`,
      null,
      values,
      (res) => {
        if (type === "task") {
          setTasks(changeListData(tasks, values, res?.data));
        } else {
          setCols(changeListData(cols, values, res?.data));
        }
        NotifyMessage(
          "success",
          `Successfully updated ${type === "task" ? "Task" : "Column"}`
        );
      },
      (error) =>
        NotifyMessage(
          "error",
          `Couldn't update ${type === "task" ? "Task" : "Column"}`
        ),
      () => {
        setModalLoad(false);
        setIsOpen(false);
      }
    );
  };

  const changeListData = (tmp, values, res) => {
    tmp?.map((item) => {
      if (item?.id === values?.id) {
        item = res?.data;
      }
    });
    return tmp;
  };

  const addNewTask = async (values, typeInfo) => {
    setModalLoad(true);
    await axios(
      "post",
      `${API_URL}/task`,
      null,
      {
        task_name: values?.task_name,
        task_creator: user?.id,
        project_id: projectData?.id ?? null,
        task_only_creator: 1,
        row: typeInfo?.col?.id,
        count: typeInfo?.tasks?.length + 1,
      },
      (res) => {
        getProjectData(id);
        NotifyMessage("success", "Successfully created new Task");
      },
      (error) => {
        NotifyMessage("error", "Couldn't create new Task");
      },
      () => {
        setModalLoad(false);
        setIsOpen(false);
      }
    );
  };

  const removeTask = async (taskInfo) => {
    await axios(
      "delete",
      `${API_URL}/task/${taskInfo?.id}`,
      null,
      null,
      (res) => {
        getProjectData(id);
        NotifyMessage("success", "Successfully removed Task");
      },
      (error) => {
        NotifyMessage("error", "Couldn't remove Task");
      }
    );
  };

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

  const removeCol = async (colInfo) => {
    await axios(
      "delete",
      `${API_URL}/project/row/${colInfo?.id}`,
      null,
      null,
      (res) => {
        let tmp = cols?.filter((item) => item?.id !== colInfo?.id);
        setCols(tmp);
        NotifyMessage("success", "Successfully removed Task");
      },
      (error) => {
        NotifyMessage("error", "Couldn't remove Task");
      }
    );
  };

  const createNewBadge = async (values, taskInfo = null) => {
    setModalLoad(true);
    await axios(
      "post",
      `${API_URL}/badge`,
      null,
      {
        badge_label: values?.label,
        badge_creator: user?.id,
        badge_only_creator: 1,
        badge_color: values?.color,
        project: projectData?.id,
        task: taskInfo ? taskInfo?.id : null,
      },
      (res) => {
        setBadges((prev) => [...prev, res?.data]);
        NotifyMessage("success", "Successfully created Badge");
      },
      (error) => NotifyMessage("error", "Couldn't create Badge"),
      () => {
        setModalLoad(false);
        setIsOpen(false);
      }
    );
  };

  const editOrDeleteBadge = async (values, type: "edit" | "delete") => {
    setModalLoad(true);
    await axios(
      type === "edit" ? "put" : "delete",
      `${API_URL}/${values?.id}`,
      null,
      type === "edit" ? values : null,
      (res) => {
        if (type === "edit") {
          let tmp = badges;
          tmp?.map((item) => {
            if (item?.id === values?.id) item = res?.data;
          });
          setBadges(tmp);
        }
        NotifyMessage(
          "success",
          `Successfully ${type === "edit" ? "edited" : "deleted"} Badge`
        );
      },
      (error) =>
        NotifyMessage(
          "error",
          `Coulnd't ${type === "edit" ? "edit" : "delete"} Badge`
        )
    );
  };

  const addOrDeleteBadgeFromTask = async (
    type: "add" | "delete",
    badge,
    task = null,
    connection = null
  ) => {
    await axios(
      type === "add" ? "post" : "put",
      `${API_URL}/badge/${
        type === "add" ? "add-for-task" : "remove-from-task"
      }`,
      null,
      type === "add"
        ? {
            task: task?.id,
            id: badge?.id,
          }
        : {
            id: connection,
          },
      (res) => {
        NotifyMessage(
          "success",
          `Successfully ${
            type === "add" ? "added badge for" : "removed badge from"
          } task`
        );
      },
      (error) =>
        NotifyMessage(
          "error",
          `Couldn't ${
            type === "add" ? "add badge for" : "remove badge from"
          } task`
        )
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
            removeTask={removeTask}
            removeCol={removeCol}
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
              <AddNewTask
                typeInfo={type}
                submit={addNewTask}
                setIsOpen={setIsOpen}
                loading={modalLoad}
              />
            )
          }
        />
      </div>
      <Loading loading={loading} />
    </div>
  );
}

export default ProjectPage;
