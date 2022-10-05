import styles from "./index.module.scss";

type InputProps = {
  name: string
  text: string
  setSpecificPermission: Function
  permissionValue: boolean
};

const CheckBox = ({ name, text, setSpecificPermission, permissionValue }: InputProps) => {
  return (

    <label className={styles["container"]} htmlFor="tick" >{text}
      <input type="checkbox"  checked={permissionValue}
      />

      <span className={styles["checkmark"]}
        onClick={() => setSpecificPermission(!permissionValue, name)}
      ></span>
    </label>
  );
};

export default CheckBox;
