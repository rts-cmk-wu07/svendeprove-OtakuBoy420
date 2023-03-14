import { useParams } from "react-router-dom"
import Loader from "../components/global/Loader"
import useAxios from "../hooks/useAxios"
import Button from "../components/subcomponents/Button"
import { useState } from "react"
import ImagePlaceholder from "../components/global/ImagePlaceholder"
export default function ActivityDetailsPage() {
  const { id } = useParams()
  const { data, error, loading } = useAxios(`${import.meta.env.VITE_API_URI}/activities/${id}`)
  const [imageLoaded, setImageLoaded] = useState(false)
  console.log(data)
  const handleImageLoad = () => {
    setImageLoaded(true)
  }
  return (
    <section>
      {loading ? (
        <Loader size="lg" />
      ) : (
        <>
          <div className="relative h-[60vh] w-full">
            {!imageLoaded && <ImagePlaceholder size="full" noRounded />}
            <img onLoad={handleImageLoad} alt={data?.name} className={imageLoaded ? "-z-1 h-full w-full object-cover" : "hidden"} src={data?.asset?.url} />
            <Button text="Tilmeld" className="absolute bottom-6 right-6" />
          </div>
          <article className="flex flex-col p-6">
            <h1 className="text-lg">{data?.name}</h1>

            <p>
              {data?.minAge}-{data?.maxAge} år
            </p>
            <p className="mb-4 capitalize">
              {data?.weekday}, {data?.time}
            </p>
            <p className="text-sm">{data?.description}</p>
          </article>
        </>
      )}
    </section>
  )
}
