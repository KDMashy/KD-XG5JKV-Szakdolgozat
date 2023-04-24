import axiosLib from "axios";

export async function axios(
  httprequest: "get" | "post" | "put" | "delete",
  url = "",
  params = null,
  body = null,
  responseFunc: any = null,
  errorFunc: any = null,
  finallyFunc: any = null,
  headers: any = null
) {
  let token = localStorage.getItem("JWT") ?? "";
  switch (httprequest) {
    case "get":
      return await axiosLib
        .get(url, {
          params: params,
          withCredentials: true,
          headers: headers ?? {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => returnFunction(responseFunc, res))
        .catch((error) => returnFunction(errorFunc, error))
        .finally(finallyFunc && finallyFunc());
    case "post":
      return await axiosLib
        .post(url, body, {
          withCredentials: true,
          params: params,
          headers: headers ?? {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => returnFunction(responseFunc, res))
        .catch((error) => returnFunction(errorFunc, error))
        .finally(finallyFunc && finallyFunc());
    case "put":
      return await axiosLib
        .put(url, body, {
          withCredentials: true,
          params: params,
          headers: headers ?? {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => returnFunction(responseFunc, res))
        .catch((error) => returnFunction(errorFunc, error))
        .finally(finallyFunc && finallyFunc());
    case "delete":
      return await axiosLib
        .delete(url, {
          params: params,
          withCredentials: true,
          headers: headers ?? {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => returnFunction(responseFunc, res))
        .catch((error) => returnFunction(errorFunc, error))
        .finally(finallyFunc && finallyFunc());
  }
}

function returnFunction(func: any, data: any) {
  if (func) return func(data);
  return console.log(data);
}
