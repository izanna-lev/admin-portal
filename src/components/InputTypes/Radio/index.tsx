import styles from "./index.module.scss";

type InputProps = {
  inputFields: {
    name?: string;
    type?: string;
    id?: string;
    value?: number;
    checked?: boolean;
  };
};

const Radio = ({ inputFields }: InputProps) => {
  return (
    <div className={styles["input-radio-form"]}>
      <input
        className={styles["field-radio-value"]}
        type={inputFields.type}
        id={inputFields.id}
        name={inputFields.id}
        value={inputFields.value}
        defaultChecked={inputFields.checked}
      />
       
      <label className={styles["input-radio-label"]} htmlFor={inputFields.id}>
        {inputFields.name}
      </label>
    </div>
  );
};

export default Radio;
