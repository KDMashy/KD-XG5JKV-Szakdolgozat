import { animated, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";

export function ListItem({
  id,
  name,
  dragItem,
  dragOverItem,
  handleSort,
  index,
  taskIndex,
  bindDrag,
  springStyle,
  setType,
  setIsOpen,
  setTaskData,
  task,
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
  setType?: any;
  setIsOpen?: any;
  setTaskData?: any;
  task?: any;
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
      className="bg-slate-100 text-light-900 h-[50px] my-3 flex justify-center items-center text-center hover:bg-slate-200 transition-all ease-in-out delay-100 rounded-md hover:cursor-pointer"
      onClick={() => {
        setType("task");
        setIsOpen(true);
        setTaskData(task);
      }}
    >
      {name}
    </animated.div>
  );
}
