import React, { useRef, useState } from "react";
import Button from "../common/Button";
import { ListItem } from "./ListItem";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { sendColData, sendTaskData } from "../../api/ProjectTable";
import NewListItem from "./NewListItem";
import NewList from "./NewList";
import { useScrollContainer } from "react-indiana-drag-scroll";
import CancelIcon from "@mui/icons-material/Cancel";

function DragNDropTable({
  cols,
  tasks,
  setCols,
  setType,
  setIsOpen,
  setTaskData,
  removeTask,
  removeCol,
}) {
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const colPosition = useRef<any>(null);
  const taskIndex = useRef<any>(null);

  const scrollContainer = useScrollContainer();

  const handleSort = async () => {
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
      await sendTaskData(
        searchedTask,
        colIndex,
        copyCols[colIndex]?.tasks?.length,
        (res) => {
          copyCols[colIndex]?.tasks.push(searchedTask);
        }
      );
    } else {
      let examples = cols[colIndex]?.tasks;

      const draggedItemContent = examples.splice(dragItem.current, 1)[0];
      examples.splice(dragOverItem.current, 0, draggedItemContent);

      let wasIndex = dragOverItem.current;
      let newIndex = dragItem.current;

      let fail = false;

      await sendTaskData(
        searchedTask,
        colIndex,
        newIndex,
        (res) => {},
        (error) => (fail = true)
      );
      if (!fail)
        await sendTaskData(examples[wasIndex], colIndex, wasIndex, (res) => {
          examples[wasIndex].count = wasIndex + 1;
          examples[newIndex].count = newIndex + 1;
          copyCols[colIndex].tasks = examples;
        });
    }

    (dragItem.current = null), (dragOverItem.current = null);
    colPosition.current = null;
    taskIndex.current = null;
    setCols(copyCols);
  };

  const returnSortedCol = (col) => {
    let tmp = col?.sort((a, b) => {
      if (a?.count > b?.count) {
        return 1;
      } else return -1;
    });
    return tmp;
  };

  const sortCols = async (dir: "before" | "after", col) => {
    let tmp = cols;
    let tempItem = tmp[col];
    let changeItem = dir === "before" ? tmp[col - 1] : tmp[col + 1];
    let catchFail = false;

    await sendColData(
      tempItem,
      dir === "before" ? col - 1 : col + 1,
      (res) => {},
      (error) => (catchFail = true)
    );
    if (!catchFail)
      await sendColData(changeItem, col, (res) => {
        if (dir === "before") {
          tmp[col] = changeItem;
          tmp[col - 1] = tempItem;
        } else {
          tmp[col] = changeItem;
          tmp[col + 1] = tempItem;
        }
        setCols(tmp);
      });
  };

  return (
    <div
      className="flex w-full justify-between md:flex-row flex-col overflow-x-scroll pb-10 items-start"
      id="project-tasks"
      //   ref={scrollContainer.ref}
    >
      {cols.map((item: any, index) => (
        // <ListItem key={item.name} id={item.id} name={item.name} />
        <div
          key={`${item?.row_name}-${item?.id}`}
          onDragEnter={(e) => (colPosition.current = item?.id)}
          className="min-w-[400px] max-w-[400px] md:mx-3 mx-auto bg-slate-700 p-3 text-center rounded-md bg-opacity-80"
        >
          <div className="flex justify-between">
            <Button
              icon={<ArrowCircleLeftIcon />}
              circular
              clickHandler={() => sortCols("before", index)}
              disabled={index <= 0}
            />
            {item?.row_name}
            <div>
              <Button
                icon={<ArrowCircleRightIcon />}
                circular
                clickHandler={() => sortCols("after", index)}
                disabled={index >= cols?.length - 1}
              />

              <Button
                icon={<CancelIcon />}
                circular
                color="error"
                clickHandler={() => removeCol(item)}
                className="ml-5"
              />
            </div>
          </div>
          <div>
            {returnSortedCol(item?.tasks).map((task: any, index: number) => (
              <ListItem
                key={`${task?.task_name}-${task?.id}`}
                id={task?.id}
                index={index}
                name={task?.task_name}
                dragItem={dragItem}
                dragOverItem={dragOverItem}
                handleSort={handleSort}
                taskIndex={taskIndex}
                setType={setType}
                setIsOpen={setIsOpen}
                setTaskData={setTaskData}
                task={task}
                removeFunc={removeTask}
                // bindDrag={bindDrag}
                // springStyle={{ x, y }}
              />
            ))}
          </div>
          <div className="">
            <NewListItem
              clickHandler={() => {
                setIsOpen(true);
                setType({
                  type: "item",
                  col: item,
                  tasks: item?.tasks,
                });
              }}
            />
          </div>
        </div>
      ))}
      <NewList
        clickHandler={() => {
          setIsOpen(true);
          setType("list");
        }}
      />
    </div>
  );
}

export default DragNDropTable;
