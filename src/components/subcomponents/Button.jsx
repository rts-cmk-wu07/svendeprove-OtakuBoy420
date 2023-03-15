export default function Button({ children, onClick, className, type }) {
  return (
    <button type={type} onClick={onClick} className={"w-[249px] rounded-[10px] border-none bg-primary py-3 shadow-primary outline-none ring-0 " + className}>
      {children}
    </button>
  );
}
