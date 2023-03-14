import { useParams } from "react-router-dom"
import Loader from "../components/global/Loader"
import useAxios from "../hooks/useAxios"
import Button from "../components/subcomponents/Button"
import { useContext, useState } from "react"
import ImagePlaceholder from "../components/global/ImagePlaceholder"
import AuthContext from "../contexts/AuthContext"
export default function ActivityDetailsPage() {
  const { id } = useParams()
  const { data, error, loading } = useAxios(`${import.meta.env.VITE_API_URI}/activities/${id}`)
  const [imageLoaded, setImageLoaded] = useState(false)
  const handleImageLoad = () => {
    setImageLoaded(true)
  }
  const { auth, setAuth } = useContext(AuthContext)
  return (
    <section>
      {loading ? (
        <Loader size="lg" />
      ) : (
        <>
          <div className="relative h-[60vh] w-full">
            {!imageLoaded && <ImagePlaceholder size="full" noRounded />}
            <img onLoad={handleImageLoad} alt={data?.name} className={imageLoaded ? "-z-1 h-full w-full object-cover" : "hidden"} src={data?.asset?.url} />
            {auth && <Button className="absolute bottom-6 right-6">Tilmeld</Button>}
          </div>
          <article className="flex flex-col p-4">
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
