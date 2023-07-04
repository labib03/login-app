import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

function BackButton() {
  return (
    <div className="absolute top-8 left-5 bg-white px-2 py-2 rounded-md shadow-sm">
      <Link to="/" className="flex items-center justify-center gap-2">
        <span>
          <BiArrowBack />
        </span>
        Back
      </Link>
    </div>
  );
}

export default BackButton;
