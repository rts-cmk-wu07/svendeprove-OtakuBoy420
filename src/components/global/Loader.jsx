export default function Loader({ size }) {
  return (
    <div
      className={
        size === "lg"
          ? "border-inputText m-auto h-20 w-20 animate-spin rounded-full border-4 border-solid border-t-transparent"
          : "border-inputText m-auto h-6 w-6 animate-spin rounded-full border-2 border-solid border-t-transparent"
      }
    />
  )
}
