import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/axiosInstance";

function ProfileUpdateModal({ fieldToUpdate, setFieldToUpdate }) {
  const [image, setImage] = useState(null);
  const [handle, setHandle] = useState("");
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const updateUser = async () => {
    if (!image && !handle) return alert("You cannot submit an empty field");
    const formData = new FormData();
    if (fieldToUpdate === "profilePicture") {
      formData.append("profilePicture", image);
    }
    if (fieldToUpdate === "twitter" || fieldToUpdate === "linkedIn") {
      formData.append(fieldToUpdate, handle);
    }
    setLoading(true);
    try {
      const response = await axiosInstance.patch("/user", formData, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      console.log(response.data);

      setAuth((prevState) => ({
        ...prevState,
        user: response.data.user,
      }));
      setLoading(false);
      setFieldToUpdate(null);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  //   setAuth({
  //     user: response.data.user,
  //     token: response.data.token,
  //   });
  return (
    <div className="fixed z-[100] w-full h-full top-0 left-0 bg-black/40 font-montserrat  flex justify-center ">
      <div className="bg-white dark:bg-slate-900 dark:text-white h-fit w-[90%]  sm:w-[500px]  p-4 rounded-md mt-10 ">
        <div className="border-b border-gray-400 flex items-center justify-between">
          <h2 className="text-gray-700 text-xl pb-2 font-bold dark:text-white">
            Update {fieldToUpdate}
          </h2>
          <div
            onClick={() => setFieldToUpdate(null)}
            className="h-8 w-8 rounded-full flex items-center justify-center border cursor-pointer border-gray-700 "
          >
            <IoIosCloseCircle className="h-5 w-5 text-gray-700 dark:text-white" />
          </div>
        </div>
        {/* fields to be update */}
        {fieldToUpdate === "profilePicture" && (
          <div className="my-3 flex flex-col space-y-2 ">
            <label htmlFor="profilePicture">Select image</label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={(e) => setImage(e.target.files[0])}
              className="border border-gray-500/40 outline-none p-2 w-full rounded-md dark:bg-slate-800 dark:border-white"
            />
          </div>
        )}

        {(fieldToUpdate === "twitter" || fieldToUpdate === "linkedIn") && (
          <div className="my-3 flex flex-col space-y-2 ">
            <label
              htmlFor={fieldToUpdate}
              className="text-black dark:text-white"
            >
              Enter {fieldToUpdate} username{" "}
            </label>
            <input
              type="text"
              id={fieldToUpdate}
              name={fieldToUpdate}
              onChange={(e) => setHandle(e.target.value)}
              value={handle}
              className="border border-gray-500/40 outline-none p-2 w-full rounded-md dark:bg-slate-800 dark:border-white"
            />
          </div>
        )}
        {/* submit button */}
        <div>
          <button
            role="button"
            className="bg-blue-500 dark:bg-orange-500 text-white px-3 py-2 rounded-md"
            onClick={updateUser}
            disabled={loading}
          >
            {loading ? "Loading" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdateModal;
