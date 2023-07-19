import { FormikFormProps } from "formik";

const InputNumber = ({ formik }: { formik: FormikFormProps }) => {
  const isShown = (type: string) => {
    const field = formik.getFieldProps(type);
    return field.value ? String(field.value).length > 0 : false;
  };

  const fieldResetHandler = (field: string) => {
    const handler = formik.getFieldHelpers(field);
    handler.setValue("");
  };

  return (
    <div className="relative w-full rounded-md overflow-hidden">
      <input
        type="number"
        placeholder="Phone Number"
        value={formik.getFieldProps("phoneNumber").value}
        className={`text-sm border w-full border-slate-100 pl-3 rounded-md  py-2 transition-all duration-200 focus:border-slate-300 placeholder:text-sm placeholder:text-center focus:placeholder:opacity-0  ${
          isShown("phoneNumber") ? "pr-12 border-slate-300" : "pr-3"
        }`}
        onChange={(event: Event) => {
          const inputElement = event.target as HTMLInputElement;
          const handler = formik.getFieldHelpers("phoneNumber");

          const valueToString = inputElement.value.slice(0, 12);
          handler.setValue(valueToString);
        }}
      />
      {isShown("phoneNumber") && (
        <button
          className="h-full px-1.5 text-xs absolute right-0 top-0 bg-stone-50 border-t border-r border-b border-slate-300 rounded-e-md transition-all duration-200"
          onClick={() => {
            fieldResetHandler("phoneNumber");
          }}
        >
          clear
        </button>
      )}
    </div>
  );
};

export default InputNumber;
