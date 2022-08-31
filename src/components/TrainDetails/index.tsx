/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable array-callback-return */
/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useState } from "react";
import { Modal } from "../../components/Portal";
import NewTrain from "./NewTrain";
import styles from "./index.module.scss";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

interface ActivityProps {
  day: number;
  trainClass: string;
  arrivalStation: string;
  arrivalDate: Date;
  arrivalTime: Date;
  departStation: string;
  departTime: Date;
  note: string;
}

const AddActivitiesPage = () => {
  const [trainDataList, setTrainDataList] = useState<ActivityProps[]>([]);
  const [canAddMore, setAddMore] = useState(false);

  const addObjectToArray = (obj: ActivityProps) => {
    setTrainDataList((current) => [...current, obj]);
    setAddMore(false);
  };

  return (
    <>
      <section className={styles["AddTrainsPage"]}>
        <div className={styles["flightDetails-table"]}>
          <div>Day</div>
          <div>Arrival Station</div>
          <div>Train Class</div>
          <div>Arrival Date</div>
          <div>Arrival Time</div>
          <div>Depart Station</div>
          <div>Depart Time</div>
          <div>Specialist Note</div>
          <div>Actions</div>
        </div>

        <div className={styles["forms"]}>
          {/* {trainDataList.length ? (
            trainDataList.map((element, index) => (
              <div
                className={`${styles["flightDetails-table"]} ${styles["table-item"]}`}
                key={index}
              >
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
                <div>{element.day || "NA"}</div>
              </div>
            ))
          ) : (
            <div className={`${styles["empty-table"]} ${styles["table-item"]}`}>
              Nothing Added
            </div>
          )} */}

          <div
            className={`${styles["flightDetails-table"]} ${styles["table-item"]}`}
          >
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div>Test</div>
            <div className="action-buttons">
              <button className="edit-button">
                <FaRegEdit />
                &nbsp;<span>Edit</span>
              </button>
              <button className="delete-button">
                <MdDeleteOutline />
                &nbsp;<span>Delete</span>
              </button>
            </div>
          </div>
        </div>

        <div
          className={styles["add-more"]}
          onClick={() => {
            setAddMore(true);
          }}
        >
          + Add Train Details
        </div>

        {canAddMore ? (
          <Modal
            modal={
              <NewTrain cancelAdd={setAddMore} addTrain={addObjectToArray} />
            }
            root={document.getElementById("overlay-root") as HTMLElement}
          />
        ) : null}
      </section>

      <div
        onClick={() => console.log("continue")}
        className={styles["continue-button"]}
      >
        Continue
      </div>
    </>
  );
};

export default AddActivitiesPage;
