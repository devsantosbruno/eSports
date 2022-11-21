import { CaretLeft } from "phosphor-react";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div id="error-page">
      <NavLink to={`/`}>
        <button className="py-2 px-3 bg-violet-500 text-white rounded flex items-center gap-3 whitespace-nowrap mt-3 sm:mt-0 hover:bg-violet-600 transition duration-300">
          <CaretLeft size={16} />
          Voltar
        </button>
      </NavLink>

      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}
