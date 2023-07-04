import styles from "./Input.module.css";
function Input({ field, type, setterFunction, children, id, defaultValue }) {
  // if no id manually assigned, assign a UUID
  if (!id) id = crypto.randomUUID();
  return (
    <>
      <div className={styles.input}>
        <input
          className={styles.box}
          type={type}
          id={id}
          value={field}
          onChange={(e) => setterFunction(e.target.value)}
          placeholder={children}
        ></input>
        <label className={styles.label} htmlFor={id}>
          {children}
        </label>
      </div>
    </>
  );
}

export default Input;
