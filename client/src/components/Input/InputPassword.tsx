import { FormikFormProps } from "formik";
import { useState } from "preact/hooks";

const InputPassword = ({
  formik,
  withValidation,
  isDisabled = false,
  formikField = "password",
  placeholder = "Password",
}: {
  formik: FormikFormProps;
  withValidation?: boolean;
  isDisabled?: boolean;
  formikField?: string;
  placeholder?: string;
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
    const field = formik.getFieldProps(formikField);
    return field.value ? String(field.value).length > 0 : false;
  };

  return (
    <div className="mb-2">
      <div className="relative w-full flex flex-col rounded-md overflow-hidden">
        <input
          {...formik.getFieldProps(formikField)}
          type={inputType}
          disabled={isDisabled}
          placeholder={placeholder}
          className={`border w-full border-slate-100 pl-3 rounded-md text-sm py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0 disabled:bg-stone-100 disabled:cursor-not-allowed ${
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
        ? formik.errors[formikField] && (
            <small className={"flex justify-start text-red-600 text-xs"}>
              {formik.errors[formikField]}
            </small>
          )
        : undefined}
    </div>
  );
};

export default InputPassword;
