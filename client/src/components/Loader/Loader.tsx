import style from "./loader.module.css";
const Loader = () => {
  return (
    <svg className={style.svg} viewBox="25 25 50 50">
      <circle className={style.circle} r="20" cy="50" cx="50"></circle>
    </svg>
  );
};

export default Loader;
