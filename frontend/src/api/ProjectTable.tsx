import { API_URL } from "../constants/url";
import { axios } from "../lib/axios";

export const sendColData = async (col, colCount, res = null, errors = null) => {
  await axios(
    "put",
    `${API_URL}/project/row/${col?.id}`,
    null,
    {
      row_name: col?.row_name,
      project: col?.project,
      count: colCount,
    },
    res,
    errors
  );
};

export const sendTaskData = async (
  task,
  colIndex,
  wasIndex,
  res = null,
  errors = null
) => {
  await axios(
    "put",
    `${API_URL}/task/${task?.id}`,
    null,
    {
      task_name: task?.task_name,
      task_creator: task?.task_creator,
      project_id: task?.project_id,
      task_only_creator: task?.task_only_creator,
      row: colIndex + 1,
      count: wasIndex + 1,
    },
    res,
    errors
  );
};
