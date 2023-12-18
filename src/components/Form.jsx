import { Formik } from "formik";
import * as yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { useState } from "react";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
});
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required(),
  password: yup.string().required("required"),
});
const registrationInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
};
const loginInitialValues = {
  email: "",
  password: "",
};
const formInputClass =
  "border border-gray-500 outline-none p-2 w-full rounded-md ";
const errorClass = "text-red-500  text-xs capitalize";
function Form() {
  const [pageType, setPageType] = useState("register");
  const [image, setImage] = useState(null);
  //   const dispatch = useDispatch();
  //returning booleans to know if we are on the login or the register
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const registerUser = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
      if (image) {
        formData.append("profilePicture", image);
      }
    }
    console.log("Submitting form....");
    console.log(values);
  };
  const loginUser = async (values, onSubmitProps) => {
    console.log("Logging in....");
    console.log(values);
  };

  const handleFormSubmit = (values, onSubmitProps) => {
    if (pageType === "login") loginUser(values, onSubmitProps);
    if (pageType === "register") registerUser(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? loginInitialValues : registrationInitialValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => {
        return (
          <div className="w-full md:w-[600px] mt-20 mx-auto rounded-md shadow-lg p-4 font-montserrat">
            <form onSubmit={handleSubmit}>
              {isRegister ? (
                <>
                  <h2 className="font-montserrat  text-2xl font-bold py-3 text-center">
                    Sign Up
                  </h2>
                  <div className="flex space-x-2 mb-3 items-center justify-center">
                    <div className="w-full">
                      <label className="text-gray-700 ">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        className={formInputClass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.firstName ? (
                        <div className={errorClass}>{errors.firstName}</div>
                      ) : null}
                    </div>
                    <div className="w-full">
                      <label className="text-gray-700 ">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        className={formInputClass}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.lastName ? (
                        <div className={errorClass}>{errors.lastName}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="text-gray-700 ">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      className={formInputClass}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email ? (
                      <div className={errorClass}>{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label className="text-gray-700 ">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={values.location}
                      className={formInputClass}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.location ? (
                      <div className={errorClass}>{errors.location}</div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label className="text-gray-700 ">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={values.occupation}
                      className={formInputClass}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.occupation ? (
                      <div className={errorClass}>{errors.occupation}</div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label className="text-gray-700 ">Password</label>
                    <input
                      type="text"
                      name="password"
                      value={values.password}
                      className={formInputClass}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password ? (
                      <div className={errorClass}>{errors.password}</div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="profilePicture"
                      className="text-gray-700  cursor-pointer"
                    >
                      <div className=" flex items-center justify-center border border-gray-500 rounded-md p-2">
                        Add Profile Photo
                      </div>
                    </label>
                    <input
                      type="file"
                      id="profilePicture"
                      className="sr-only"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-montserrat  text-3xl font-bold py-3 text-center">
                    Sign In
                  </h2>
                  <div className="mb-3">
                    <label className="text-gray-700 ">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      className={formInputClass}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.email ? (
                      <div className={errorClass}>{errors.email}</div>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <label className="text-gray-700 ">Password</label>
                    <input
                      type="email"
                      name="email"
                      value={values.password}
                      className={formInputClass}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.password ? (
                      <div className={errorClass}>{errors.password}</div>
                    ) : null}
                  </div>
                </>
              )}

              {/* button */}
              <div className="mb-3">
                <button
                  type="submit"
                  className="w-full rounded-md p-2 bg-blue-500 text-white font-bold"
                >
                  {isLogin ? "LOGIN" : "REGISTER"}
                </button>
              </div>

              {/* Redirect text */}
              {isLogin ? (
                <p className="text-xs">
                  Don't have an account?{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setPageType("register")}
                  >
                    Click here to register
                  </span>
                </p>
              ) : (
                <p className="text-xs">
                  Already have an account?{" "}
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => setPageType("login")}
                  >
                    Click here to login
                  </span>
                </p>
              )}
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default Form;
