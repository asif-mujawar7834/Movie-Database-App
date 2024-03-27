import { useState } from "react";
import styles from "./MultiSelect.module.css";
import { FaCaretDown } from "react-icons/fa";
export const MultiSelect = ({
  multiple,
  options,
  handleChange,
  selectedOptions,
  fieldName,
}) => {
  const [open, setOpen] = useState(false);
  const handleClick = (option) => {
    if (multiple) {
      if (selectedOptions?.every((el) => el?.name != option.name)) {
        handleChange([...(selectedOptions || []), option]);
      } else {
        handleChange(
          selectedOptions?.filter(
            (el) => el?.[fieldName] !== option?.[fieldName]
          )
        );
      }
    } else {
      handleChange(option);
    }
  };

  const handleReset = (e) => {
    e.stopPropagation();
    handleChange([]);
  };
  return (
    <div
      className={styles.container}
      onClick={() => {
        setOpen((prev) => !prev);
      }}
      // onBlur={() => setOpen(false)}
    >
      <span className={styles.value}>
        {selectedOptions?.length > 0 || selectedOptions ? (
          multiple ? (
            selectedOptions?.map((item) => (
              <button key={item?.id} onClick={() => handleClick(item)}>
                {item[fieldName]}
              </button>
            ))
          ) : (
            <button>{selectedOptions?.[fieldName]}</button>
          )
        ) : (
          <button>Select</button>
        )}
      </span>

      <button className={styles["clear-btn"]} onClick={handleReset}>
        &times;
      </button>
      <div className={styles.divider}></div>
      <button className={styles["crt-btn"]}>
        <FaCaretDown />
      </button>
      <ul className={`${styles.options} ${open ? styles.show : ""}`}>
        {options
          ?.filter((el) => {
            return multiple
              ? selectedOptions?.every(
                  (item) => el?.[fieldName] != item?.[fieldName]
                )
              : el?.[fieldName] === el?.[fieldName];
          })
          .map((option) => (
            <li
              key={option.id}
              className={styles.option}
              onClick={() => handleClick(option)}
            >
              {option[fieldName]}
            </li>
          ))}
      </ul>
    </div>
  );
};
