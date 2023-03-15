import { useEffect, useState } from "react";
import ImagePlaceholder from "../global/ImagePlaceholder";
import Button from "./Button";
import joinClass from "../../functions/joinClass";
import leaveClass from "../../functions/leaveClass";
export default function ActivityDetailsHero({ data, userData, auth }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [userJoinedDays, setUserJoinedDays] = useState([]);
  const [userAge, setUserAge] = useState();
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  useEffect(() => {
    if (!userData) return;
    setUserJoinedDays(userData?.activities?.map((activity) => activity?.weekday));
    setUserAge(userData?.age);
  }, [userData]);
  useEffect(() => {
    if (!data) return;
    if (!userJoinedDays) return;
    userJoinedDays.forEach((day) => {
      if (day === data?.weekday) {
        setHasJoined(true);
      }
    });
  }, [data, userJoinedDays]);

  return (
    <div className="relative h-[60vh] w-full">
      {!imageLoaded && <ImagePlaceholder size="full" noRounded />}
      <img onLoad={handleImageLoad} alt={data?.name} className={imageLoaded ? "-z-1 h-full w-full object-cover" : "hidden"} src={data?.asset?.url} />
      {auth && (
        <Button
          onClick={() => {
            if (hasJoined) {
              leaveClass(data?.id, data?.weekday, setHasJoined, auth?.token, auth?.userId, setUserJoinedDays, userJoinedDays);
            } else joinClass(data?.id, data?.weekday, setHasJoined, auth?.token, auth?.userId, setUserJoinedDays, userJoinedDays, userAge, data?.minAge, data?.maxAge);
          }}
          className="absolute bottom-6 right-6">
          {hasJoined ? "Forlad" : "Tilmeld"}
        </Button>
      )}
    </div>
  );
}
