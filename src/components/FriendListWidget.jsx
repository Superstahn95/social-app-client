import WidgetWrapper from "./WidgetWrapper";
import Friend from "./Friend";

function FriendListWidget() {
  return (
    <WidgetWrapper>
      <h3 className="mb-2">Friend List</h3>
      <Friend />
      <Friend />
      <Friend />
    </WidgetWrapper>
  );
}

export default FriendListWidget;
