import { FormikFormProps } from "formik";
import { useState } from "preact/hooks";

const InputPassword = ({
  formik,
  withValidation,
}: {
  formik: FormikFormProps;
  withValidation?: boolean;
}) => {
  const [inputType, setInputType] = useState("password");

  const changeTypeHandler = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const isHasValue = () => {
    const field = formik.getFieldProps("password");
    return field.value ? String(field.value).length > 0 : false;
  };

  return (
    <div className="mb-2">
      <div className="relative w-full flex flex-col rounded-md overflow-hidden">
        <input
          {...formik.getFieldProps("password")}
          type={inputType}
          placeholder="Password"
          className={`border w-full border-slate-100 pl-3 rounded-md text-sm py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
            isHasValue() ? "pr-12 border-slate-300" : "pr-3"
          }`}
        />
        {isHasValue() && (
          <button
            className="h-full px-1.5 text-xs absolute right-0 top-0 bg-stone-50 border-t border-r border-b border-slate-300 rounded-e-md"
            onClick={changeTypeHandler}
          >
            {inputType === "password" ? "show" : "hide"}
          </button>
        )}
      </div>
      {withValidation
        ? formik.errors.password && (
            <small className={"flex justify-start text-red-600 text-xs"}>
              {formik.errors.password}
            </small>
          )
        : undefined}
    </div>
  );
};

export default InputPassword;
