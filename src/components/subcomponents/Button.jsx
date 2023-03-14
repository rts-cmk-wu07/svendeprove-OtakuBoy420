export default function Button({ children, onClick, className, type }) {
  return (
    <button type={type} onClick={onClick} className={"rounded-[10px] border-none bg-primary px-20 py-3 shadow-primary outline-none ring-0 " + className}>
      {children}
    </button>
  )
}
