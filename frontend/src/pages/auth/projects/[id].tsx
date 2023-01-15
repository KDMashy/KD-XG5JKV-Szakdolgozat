import axios, { Axios } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
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

  const [cols, setCols] = useState<any>([]);
  const [tasks, setTasks] = useState<any>([]);

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
    if (projectData) {
      console.log("projdata", projectData);
      setCols(projectData?.rows);
      setTasks(projectData?.tasks);
    }
  }, [projectData]);

  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const colPosition = useRef<any>(null);
  const taskIndex = useRef<any>(null);

  const handleSort = () => {
    let colIndex: any = null;
    let selectedCol: any = null;

    let copyCols: any = cols;

    copyCols.map((col: any, index: number) => {
      if (col?.id === colPosition.current) {
        colIndex = index;
        selectedCol = col;
      }
    });

    let searchedTask: any = null;
    tasks.map((task: any) => {
      if (task?.id === taskIndex.current) searchedTask = task;
    });

    if (searchedTask?.row?.id !== selectedCol?.id) {
      copyCols.map((col: any, index: number) => {
        col?.tasks.map((task: any, index: number) => {
          if (task?.id === searchedTask?.id) {
            col?.tasks.splice(index, 1);
          }
        });
      });

      searchedTask.row = copyCols[colIndex];
      copyCols[colIndex]?.tasks.push(searchedTask);
      console.log("add");
    } else {
      let examples = cols[colIndex]?.tasks;

      const draggedItemContent = examples.splice(dragItem.current, 1)[0];
      examples.splice(dragOverItem.current, 0, draggedItemContent);

      copyCols[colIndex].tasks = examples;
      console.log("sort");
    }

    (dragItem.current = null), (dragOverItem.current = null);
    colPosition.current = null;
    taskIndex.current = null;
    setCols(copyCols);
  };

  // const [{ x, y }, api] = useSpring(() => ({
  //   x: 0,
  //   y: 0,
  // }));

  // const bindDrag = useDrag(({ offset }) => {
  //   api({
  //     x: offset[0],
  //     y: offset[1],
  //   });
  // });

  return (
    <div className="relative">
      <div className="grid grid-cols-9 gap-9">
        <Container type={darkMode ? "dark" : "light"} className="col-span-2">
          <></>
        </Container>
        <Container type={darkMode ? "dark" : "light"} className="col-span-7">
          <div className="flex w-full justify-between" id="project-tasks">
            {cols.map((item: any) => (
              // <ListItem key={item.name} id={item.id} name={item.name} />
              <div
                key={`${item?.row_name}-${item?.id}`}
                onDragEnter={(e) => (colPosition.current = item?.id)}
                className="w-[45%] bg-slate-700 p-3 text-center"
              >
                {item?.row_name}
                {item?.tasks.map((task: any, index: number) => (
                  <ListItem
                    key={`${task?.task_name}-${task?.id}`}
                    id={task?.id}
                    index={index}
                    name={task?.task_name}
                    dragItem={dragItem}
                    dragOverItem={dragOverItem}
                    handleSort={handleSort}
                    taskIndex={taskIndex}
                    // bindDrag={bindDrag}
                    // springStyle={{ x, y }}
                  />
                ))}
              </div>
            ))}
          </div>
        </Container>
      </div>
      <Loading loading={loading} />
    </div>
  );
}

export default ProjectPage;

function ListItem({
  id,
  name,
  dragItem,
  dragOverItem,
  handleSort,
  index,
  taskIndex,
  bindDrag,
  springStyle,
}: {
  id?: number;
  name?: string;
  dragItem?: any;
  dragOverItem?: any;
  handleSort?: any;
  index?: number;
  taskIndex?: any;
  bindDrag?: any;
  springStyle?: any;
}) {
  return (
    <animated.div
      // {...bindDrag()}
      // style={springStyle}
      draggable
      onDragStart={(e) => {
        taskIndex.current = id;
        dragItem.current = index;
      }}
      onDragEnter={(e) => (dragOverItem.current = index)}
      onDragEnd={handleSort}
      onDragOver={(e) => e.preventDefault()}
      className="bg-slate-100 text-light-900 h-[50px] my-3 flex justify-center items-center text-center"
    >
      {name}
    </animated.div>
  );
}
