export default function Button({ text, onClick, className }) {
  return (
    <button onClick={onClick} className={"rounded-[10px] border-none bg-primary px-20 py-3 shadow-primary outline-none ring-0 " + className}>
      {text}
    </button>
  )
}
