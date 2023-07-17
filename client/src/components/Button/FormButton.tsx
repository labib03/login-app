import { Loader } from "../index.ts";
import React, { FC } from "preact/compat";

type Props = {
  loading?: boolean;
  onClick: (e: React.JSX.TargetedMouseEvent<HTMLButtonElement>) => void;
  text: string;
};
const FormButton: FC<Props> = ({ loading, text, onClick }) => {
  const renderButtonText = () => {
    if (loading) {
      return (
        <div className="flex gap-1 items-center justify-center">
          <Loader />
          <h1>Loading ...</h1>
        </div>
      );
    } else {
      return <>{text}</>;
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      className="bg-emerald-400 rounded-md py-2 text-sm mt-2 transition-all duration-150 hover:bg-emerald-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
      onClick={onClick}
    >
      {renderButtonText()}
    </button>
  );
};

export default FormButton;
