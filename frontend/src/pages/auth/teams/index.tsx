import React, { useState, useEffect } from "react";
import { API_URL } from "../../../constants/url";
import { useAuth } from "../../../hooks/useAuth";
import { axios } from "../../../lib/axios";

function Teams() {
  const { user } = useAuth({
    middleware: "auth",
    redirectIfAuthenticated: false,
  });

  const [loading, setLoading] = useState(false);

  const createNewTeam = async (values) => {
    setLoading(true);
    await axios(
      "post",
      `${API_URL}/team`,
      {
        members: [2, 3],
      },
      {
        team_name: "test_team_name",
        team_description: "test_team_description",
        team_creator: 1,
        team_only_creator: 1,
      },
      (res) => {
        console.log(res.data);
      },
      null,
      () => setLoading(false)
    );
  };

  const addNewMember = async (values) => {
    await axios(
      "post",
      `${API_URL}/team/add-member`,
      {
        team_id: 11,
        members: [4],
      },
      null,
      (res) => {
        console.log(res.data);
      }
    );
  };

  const removeMember = async (member) => {
    await axios(
      "delete",
      `${API_URL}/team/remove-member`,
      {
        team: 11,
        member: 4,
      },
      null,
      (res) => {
        console.log(res.data);
      }
    );
  };

  return <div>Teams</div>;
}

export default Teams;
