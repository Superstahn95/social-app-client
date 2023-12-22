import UserImage from "./UserImage";

function Conversation() {
  //to be swapped
  const demoImage =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  return (
    <div className="flex items-center space-x-5 cursor-pointer mt-5 hover:bg-slate-200 dark:hover:bg-slate-800">
      <UserImage image={demoImage} />
      <span className="dark:text-white">Tessy Akwuba</span>
    </div>
  );
}

export default Conversation;
