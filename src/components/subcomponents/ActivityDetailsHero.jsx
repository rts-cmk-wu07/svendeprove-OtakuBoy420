import { useEffect, useState } from "react";
import ImagePlaceholder from "../global/ImagePlaceholder";
import Button from "./Button";
import joinActivity from "../../functions/joinActivity";
import leaveActivity from "../../functions/leaveActivity";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
export default function ActivityDetailsHero({ data, userData, auth, setAuth }) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [userJoinedDays, setUserJoinedDays] = useState([]);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  useEffect(() => {
    if (!userData) return;
    setUserJoinedDays(userData?.activities?.map((activity) => activity?.weekday));
  }, [userData]);
  useEffect(() => {
    if (!data || !userData) return;
    if (data?.users?.map((user) => user.id)?.includes(Number(userData?.id))) {
      setHasJoined(true);
    }
  }, [data, userData, setHasJoined]);

  return (
    <div className="relative h-[60vh] w-full lg:mt-12 lg:max-h-96 lg:max-w-xl">
      {!imageLoaded && <ImagePlaceholder size="full" noRounded />}
      <img onLoad={handleImageLoad} alt={data?.name} className={imageLoaded ? "-z-1 h-full w-full object-cover lg:rounded-xl" : "hidden"} src={data?.asset?.url} />
      <AnimatePresence>
        {auth?.role === "default" ? (
          <Button
            animated
            onClick={() => {
              hasJoined
                ? leaveActivity(data, setHasJoined, setUserJoinedDays, userJoinedDays, auth, setAuth)
                : joinActivity(data, setHasJoined, setUserJoinedDays, userJoinedDays, userData?.age, auth, setAuth);
            }}
            className="absolute bottom-6 right-6">
            {hasJoined ? "Forlad" : "Tilmeld"}
          </Button>
        ) : auth?.role === "instructor" && auth.userId === data?.instructorId ? (
          <Button animated onClick={() => navigate(`/roster/${data?.id}`)} className="absolute bottom-6 right-6">
            Se tilmeldte
          </Button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
