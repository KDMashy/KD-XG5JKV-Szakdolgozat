import Avatar from "../Avatar";
import Button from "../Button";

export const ListItem = ({
  name = "",
  description = "",
  badges = [],
  url = "",
  id,
  darkMode = true,
  project = true,
}: {
  name: string;
  description: string;
  badges?: any[];
  url?: string;
  id: number;
  darkMode: boolean;
  project?: boolean;
}) => {
  return (
    <div className="bg-light-600 w-full h-[120px] rounded-2xl flex items-center my-10">
      {/* <div className="w-[130px] flex justify-center">
        <Avatar image_url={url} width="w-[90px]" height="h-[90px]" />
      </div> */}
      <div className="w-full flex flex-col pl-10">
        <div className="flex">
          <div className=" text-center">
            <h2 className="font-noto font-bold text-light-400 text-lg">
              {name}
            </h2>
          </div>
          {/* <div className="w-1/2">BADGES</div> */}
        </div>
        <div className="flex justify-between sm:flex-row flex-col items-center">
          <div className="">
            <p className="font-noto font-semibold text-light-400 text-base">
              {description}
            </p>
          </div>
          <div className="mr-10">
            <Button
              type={darkMode ? "dark" : "light"}
              label="Megtekint"
              route={`/auth/${project ? "projects" : "teams"}/${id}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
