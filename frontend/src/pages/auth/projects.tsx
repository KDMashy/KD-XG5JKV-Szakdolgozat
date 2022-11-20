import React, { useEffect, useState } from "react";
import Loading from "../../components/common/Loading";
import Container from "../../components/Container";
import { useAuth } from "../../hooks/useAuth";
import { useDarkMode } from "../../hooks/useDarkMode";

function Projects() {
  const { darkMode } = useDarkMode();

  const { user } = useAuth();

  const [init, setInit] = useState(true);

  useEffect(() => {
    if (user) {
      setInit(false);
    } else {
      setInit(true);
    }
  }, [user]);

  return (
    <div className="container relative">
      <div className="grid grid-cols-7 gap-9">
        <Container type={darkMode ? "dark" : "light"} className="col-span-2">
          <></>
        </Container>
        <Container type={darkMode ? "dark" : "light"} className="col-span-5">
          <></>
        </Container>
      </div>
      <Loading loading={init} />
    </div>
  );
}

export default Projects;
