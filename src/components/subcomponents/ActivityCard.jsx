import { useState } from "react";
import { Link } from "react-router-dom";
import ImagePlaceholder from "../global/ImagePlaceholder";
import { motion } from "framer-motion";
export default function ActivityCard({ activity, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <motion.article
      initial={{ opacity: 0, y: -50 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: index * 0.1,
          ease: "easeOut",
        },
      }}
      exit={{
        opacity: 0,
        y: -50,
        transition: {
          duration: 1,
          ease: "easeOut",
        },
      }}
      layout
      key={activity?.id}
      className="relative flex aspect-square w-full cursor-pointer flex-col rounded-[39px] rounded-br-none sm:max-w-xs">
      <Link className="h-full w-full rounded-[39px] rounded-br-none" to={`/activity/${activity?.id}`}>
        {!imageLoaded && <ImagePlaceholder card size="full" />}
        <img
          onLoad={handleImageLoad}
          className={imageLoaded ? "-z-1 absolute inset-0 h-full w-full rounded-[39px] rounded-br-none object-cover sm:max-w-xs" : "hidden"}
          src={activity?.asset.url}
          alt={activity?.name}
        />
        <div className="absolute bottom-0 flex h-[30%] w-full flex-col justify-center rounded-tr-[39px] rounded-bl-[39px] bg-secondary/80 px-6 text-black">
          <h2>{activity?.name}</h2>
          <p>
            {activity?.minAge}-{activity?.maxAge} år
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
