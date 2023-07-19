import { FormikFormProps } from "formik";
import { FC } from "preact/compat";

type Props = {
  formik: FormikFormProps;
  field: string;
  placeholder: string;
};

const InputText: FC<Props> = ({ formik, field, placeholder }) => {
  const isHasValue = (type: string) => {
    const field = formik.getFieldProps(type);
    return field.value ? String(field.value).length > 0 : false;
  };

  const fieldResetHandler = (field: string) => {
    const handler = formik.getFieldHelpers(field);
    handler.setValue("");
  };

  return (
    <>
      <div className="relative w-full rounded-md overflow-hidden">
        <input
          {...formik.getFieldProps(field)}
          type="text"
          placeholder={placeholder}
          className={`text-sm border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
            isHasValue(field) ? "pr-12 border-slate-300" : "pr-3"
          }`}
        />
        {isHasValue(field) && (
          <button
            className="h-full px-1.5 text-xs absolute right-0 top-0 bg-stone-50 border-t border-r border-b border-slate-300 rounded-e-md transition-all duration-200"
            onClick={() => fieldResetHandler(field)}
          >
            clear
          </button>
        )}
      </div>
      {formik.errors[field] && (
        <small className={"text-xs flex justify-start text-red-600"}>
          {formik.errors[field]}
        </small>
      )}
    </>
  );
};

export default InputText;
