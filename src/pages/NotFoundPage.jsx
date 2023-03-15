import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-center text-xl font-bold">404 Not found</h1>

      <Link className="rounded-full border-2 border-white py-1.5 px-4 text-lg" to="/activites">
        Go to home
      </Link>
    </div>
  );
}
