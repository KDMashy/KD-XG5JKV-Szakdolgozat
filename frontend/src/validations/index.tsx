import * as yup from "yup";

const registrationValidation = yup.object().shape({
  username: yup.string().min(5).max(16).required("Username is required"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(10, ({ min }) => `Enter at least ${min} characters`)
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
      "Password must contain at least one uppercase and one lowercase character"
    ),
  confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Confirm password is required"),
});

const loginValidation = yup.object().shape({
  username: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(10, ({ min }) => `Enter at least ${min} characters`)
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
      "Password must contain at least one uppercase and one lowercase character"
    ),
});

const newProjectValidation = yup.object().shape({
  project_name: yup.string().required("Project name is required"),
  project_description: yup.string().required("Project description is required"),
});

export { registrationValidation, loginValidation, newProjectValidation };
