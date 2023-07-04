import { Link } from "react-router-dom";
import { RouterCollection } from "../../datas/routing";

function Navbar() {
  return (
    <div className="py-3 bg-slate-50 shadow-sm flex items-center justify-center overflow-hidden">
      <ul className="flex gap-3">
        {RouterCollection.map((item) => (
          <li key={item.index}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;
