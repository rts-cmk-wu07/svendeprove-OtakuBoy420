import { Link } from "react-router-dom"
export default function ActivityCard({ activity }) {
  return (
    <article className="relative flex aspect-square w-full cursor-pointer flex-col rounded-[39px] rounded-br-none">
      <Link className="h-full w-full rounded-[39px] rounded-br-none" to={`/activity/${activity.id}`}>
        <img src={activity.asset.url} alt={activity.name} className="-z-1 absolute inset-0 h-full w-full rounded-[39px] rounded-br-none object-cover" />
        <div className="absolute bottom-0 flex h-[30%] w-full flex-col justify-center rounded-tr-[39px] rounded-bl-[39px] bg-secondary/80 px-6 text-black">
          <h2>{activity.name}</h2>
          <p>
            {activity.minAge}-{activity.maxAge} år
          </p>
        </div>
      </Link>
    </article>
  )
}
