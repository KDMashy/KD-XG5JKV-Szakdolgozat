import * as yup from "yup";

const registrationValidation = yup.object().shape({
  username: yup.string().min(5).max(16).required("UFelhasználónév szükséges"),
  first_name: yup.string().required("Keresztnév szükséges"),
  last_name: yup.string().required("Vezetéknév szükséges"),
  email: yup
    .string()
    .email("Kérem írjon be rendes email címet")
    .required("Kérem írjon be rendes email címet"),
  password: yup
    .string()
    .min(10, ({ min }) => `legalább ${min} karaktert írjon be`)
    .required("Jelszó szükséges")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
      "A jelszónak tartalmaznia kell legalább egy nagy, és egy kis betűt, illetve speciális karaktert"
    ),
  confirmation: yup
    .string()
    // .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Megerősítő jelszó szükséges"),
});

const loginValidation = yup.object().shape({
  username: yup
    .string()
    .email("Kérem írjon be rendes email címet")
    .required("Kérem írjon be rendes email címet"),
  password: yup
    .string()
    .min(10, ({ min }) => {})
    .required("Jelszó szükséges"),
});

const newProjectValidation = yup.object().shape({
  project_name: yup.string().required("Projekt név szükséges"),
  project_description: yup.string().required("Projekt leírás szükséges"),
});

const newColumnValidation = yup.object().shape({
  row_name: yup.string().required("Oszlop név szükséges"),
});

const newTeamValidation = yup.object().shape({
  team_name: yup.string().required("Csapat név szükséges"),
  team_description: yup.string().required("Csapat leírás szükséges"),
});

const newTaskValidation = yup.object().shape({
  task_name: yup.string().required("Feladat név szükséges"),
});

export {
  registrationValidation,
  loginValidation,
  newProjectValidation,
  newColumnValidation,
  newTeamValidation,
  newTaskValidation,
};
