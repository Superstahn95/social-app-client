import WidgetWrapper from "./WidgetWrapper";

function AdvertWidget() {
  const imageAddress =
    "https://cdn.pixabay.com/photo/2015/08/25/03/51/lemon-906141_1280.jpg";
  return (
    <WidgetWrapper>
      <div className="flex items-center justify-between py-2 ">
        <span className="text-sm text-black/40 dark:text-white">Sponsored</span>
        <span className="text-sm text-black/40 dark:text-white">Create Ad</span>
      </div>
      <img src={imageAddress} alt="ad" />
      <div className="flex items-center justify-between py-2">
        <span className="text-sm">Nature's glow</span>
        <span className="text-sm font-bold text-black/60 dark:text-white">
          glow@gmail.com
        </span>
      </div>
      <p className="text-sm text-black/60 dark:text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
        praesentium qui quaerat! Quaerat sit perspiciatis officia perferendis
        tenetur optio cupiditate earum molestias sint?
      </p>
    </WidgetWrapper>
  );
}

export default AdvertWidget;
