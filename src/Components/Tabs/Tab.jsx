import { useState } from "react";
import styles from "./Tab.module.css";
export const Tab = ({ tabList, onTabChange }) => {
  const [activeTab, setActiveTabe] = useState(0);

  return (
    <div className={styles.tabcontainer}>
      {tabList?.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            setActiveTabe(index);
            onTabChange(item);
          }}
          className={index === activeTab ? styles.active : ""}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
