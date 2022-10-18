import { SET_NAVIGATION } from "../../store/slices/navigation";
import { useEffect, useState, useLayoutEffect, Key } from "react";
import { API, IMAGE, ICON, NAVIGATE, USER_TYPES_NOTIFICATION } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./index.scss";
import { Fetch } from "../../api/Fetch";
import { setApiMessage } from "../../store/slices/apiMessage";
import { Create } from "../../api/Create";

const User = (
  user: any,
  index: Key | null | undefined,
  selectOne: { (id: any): void; (arg0: any): void }
) => {
  return (
    <div className="user-selection-element" key={index}>
      <input
        id={`checkbox-${index}`}
        type="checkbox"
        className="checkbox"
        defaultChecked={selectedUsers.includes(user._id)}
        onChange={() => {
          selectOne(user._id);
        }}
      />
      <img
        className="user-selection-img"
        src={`${IMAGE.SMALL}${user.image}`}
        alt={user.name}
        onError={(e) => {
          // e.target.src = ICON.USER_PLACEHOLDER;
        }}
        loading="lazy"
      />
      <div className="user-selection-info">
        <div className="user-selection-name">{user.name}</div>
        <div className="user-selection-email">{user.email}</div>
      </div>
    </div>
  );
};

let selectedUsers: any[] = [];

const Notifications = (props: any) => {
  const [selectedAll, setSelectedAll] = useState(false);
  const [userType, setUserType] = useState(USER_TYPES_NOTIFICATION.TRAVELLER);
  const dispatch = useAppDispatch();
  let { data } = useAppSelector(
    (state) => state.notificationUserList
  );


  useEffect(() => {
    setSelectedAll(false)
    dispatch(
      Fetch(
        API.LIST_USERS,
        {
          notificationList: true,
          userFilter: userType
        },
        1,
        10000000
      ));
      unselectAll()
  }, [userType]);

  const handleSelect = () => {
    selectedAll ? unselectAll() : selectAll();
    setSelectedAll(!selectedAll)
  }

  const selectAll = () => {
    const checkboxes = document.querySelectorAll("input.checkbox");
      for (let index = 0; index < data.length; index++) {
        if (selectedUsers.indexOf(data[index]._id) === -1) {
          selectedUsers.push(data[index]._id);
        }
      }
      checkboxes.forEach((checkbox: any) => {
        checkbox.checked = true;
      });
  };

  const unselectAll = () => {
    const checkboxes = document.querySelectorAll("input.checkbox");
    selectedUsers = [];
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false;
    });
  };

  const selectOne = (id: any) => {
    if (selectedUsers.indexOf(id) > -1) {
      setSelectedAll(false)
      selectedUsers.splice(selectedUsers.indexOf(id), 1);
    } else {
      selectedUsers.push(id);
    }
  };


  const sendNotifications = () => {
    if (!selectedUsers.length && !selectedAll) {
      dispatch(
        setApiMessage({
          type: "error",
          message: "Please select some users to send notifications to!",
        })
      );
      return;
    }
    if (!(document.getElementById("notificationText") as HTMLInputElement).value) {
      dispatch(
        setApiMessage({
          type: "error",
          message: "Notification message cannot be empty!",
        })
      );
      return;
    }


    dispatch(
      Create(
        API.BROADCAST,
        {
          message: (document.getElementById("notificationText") as HTMLInputElement).value,
          selectedAll,
          userType,
          userIds: selectedAll ? [] : selectedUsers,
        },
        false,
      )
    );

  };

  return (
    <section className="content-container">
      <section className="content">
        <section className="content-top">
          <div className="content-heading">Notifications</div>
          <div className="notifications-main-div">
            <div className="notifications-message-div">
              <div className="notifications-message-heading"></div>
              <textarea
                id="notificationText"
                className="notifications-textarea"
                autoFocus
              />
              <div className="notifications-message-heading">
                Note: Select users from right pane who you want to send the
                notification.
              </div>
              <button
                onClick={sendNotifications}
                className="notifications-send-btn"
                title="Send notification"
              >
                Send
              </button>
            </div>
            <div className="user-selection-main-div">
              <div className="user-selection-header">
                <div className="user-selection-left">
                  <div>Users List</div>
                  <div className="select-all">
                  <input
                    id={`checkbox-x`}
                    type="checkbox"
                    className="checkbox"
                    onClick={() => handleSelect()} 
                    checked={selectedAll}
                  />
                  <div>Select All</div></div>
                </div>
                <div className="user-selection">
                  <div className={`${userType === USER_TYPES_NOTIFICATION.TRAVELLER ? "selected" : ""}`}
                    onClick={() => setUserType(USER_TYPES_NOTIFICATION.TRAVELLER)}>Traveller</div>
                  <div
                    onClick={() => setUserType(USER_TYPES_NOTIFICATION.SPECIALIST)} className={`${userType === USER_TYPES_NOTIFICATION.SPECIALIST ? "selected" : ""}`}>Specialist</div>
                  <div
                    onClick={() => setUserType(USER_TYPES_NOTIFICATION.ALL)} className={`${userType === USER_TYPES_NOTIFICATION.ALL ? "selected" : ""}`}>All</div>
                </div>
                <div
                  title="Select all users"
                  onClick={selectAll}
                  className="user-selection-right"
                >
                </div>
                <div

                  className="user-selection-right"
                >
                </div>
              </div>

              <div className="user-selection-list">
                {data.length &&
                  data.map((user: any, index: number) =>
                    User(user, index, selectOne)
                  )}
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Notifications;
function FetchEntity(USERS: any, arg1: { notificationList: boolean; }, arg2: number, arg3: number) {
  throw new Error("Function not implemented.");
}

