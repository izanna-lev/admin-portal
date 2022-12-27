import { useEffect, useState, Key } from "react";
import { API, IMAGE, USER_TYPES_NOTIFICATION } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./index.scss";
import { Fetch } from "../../api/Fetch";
import { setApiMessage } from "../../store/slices/apiMessage";
import { Create } from "../../api/Create";
import { ICON } from "../../assets/index";
import { IoImageOutline } from "react-icons/io5";
import NotificationTemplate from "../../components/NotificationTemplate";

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
      {user.image ? (
        <img
          className={`${user.image ? "user-selection-img" : "user-dummy-img"} `}
          src={`${
            user.image ? IMAGE.SMALL + user.image : ICON.USER_PLACEHOLDER
          } `}
          alt={user.name}
          onError={(e: any) => {
            e.target.src = ICON.USER_PLACEHOLDER;
          }}
          loading="lazy"
        />
      ) : (
        <div className="user-selection-img-dummy">
          {" "}
          <IoImageOutline className="dummy-image" />
        </div>
      )}

      <div className="user-selection-info">
        <div className="user-selection-name">{user.name}</div>
        <div className="user-selection-email">{user.email}</div>
      </div>
    </div>
  );
};

let selectedUsers: any[] = [];

const Notifications = () => {
  const [userType, setUserType] = useState(USER_TYPES_NOTIFICATION.TRAVELLER);
  const [selectedAll, setSelectedAll] = useState(false);
  const [message, setmessage] = useState("");

  let { templates } = useAppSelector((state) => state.notificationTemplates);
  let { data } = useAppSelector((state) => state.notificationUserList);
  let apiMessage = useAppSelector((state) => state.apiMessage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Fetch(API.LIST_TEMPLATE));
  }, [dispatch]);

  useEffect(() => {
    setSelectedAll(false);
    dispatch(
      Fetch(
        API.LIST_USERS,
        {
          notificationList: true,
          userFilter: userType,
        },
        1,
        10000000
      )
    );
    unselectAll();
  }, [userType, dispatch]);

  const handleSelect = () => {
    selectedAll ? unselectAll() : selectAll();
    setSelectedAll(!selectedAll);
  };

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
    selectedUsers = [];
  };

  const selectOne = (id: any) => {
    if (selectedUsers.indexOf(id) > -1) {
      setSelectedAll(false);
      selectedUsers.splice(selectedUsers.indexOf(id), 1);
    } else {
      selectedUsers.push(id);
    }
  };

  const sendNotifications = (e: any) => {
    e.preventDefault();
    if (!selectedUsers.length && !selectedAll) {
      return dispatch(
        setApiMessage({
          type: "error",
          message: "Please select some users to send notifications to!",
        })
      );
    }

    dispatch(
      Create(
        API.BROADCAST,
        {
          message,
          selectedAll,
          userType,
          userIds: selectedAll ? [] : selectedUsers,
        },
        false
      )
    );
  };

  useEffect(() => {
    const { type } = apiMessage;
    if (type === "success") {
      setmessage("");
      unselectAll();
      setSelectedAll(false);
    }
  }, [apiMessage]);

  return (
    <section className="content-container">
      <section className="content">
        <section className="content-top">
          <div className="content-heading">Notifications</div>
        </section>
        <section className="content-bottom notifications-main-div">
          <form
            className="notifications-message-div"
            onSubmit={sendNotifications}
          >
            <label
              className="notifications-message-heading"
              htmlFor="notificationText"
            ></label>
            <textarea
              id="notificationText"
              className="notifications-textarea"
              autoFocus
              placeholder="Type your message here or select one below."
              required
              value={message}
              onChange={(e) => setmessage(e.target.value)}
            />
            <div className="notifications-message-heading">
              Note: Select users from right pane who you want to send the
              notification.
            </div>
            <button
              className="notifications-send-btn"
              title="Send notification"
            >
              Send
            </button>
            <NotificationTemplate
              setmessage={setmessage}
              templates={templates}
            />
          </form>
          <div className="container-right">
            <div>Select Users</div>
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
                    <div>Select All</div>
                  </div>
                </div>
                <div className="user-selection">
                  <div
                    className={`${
                      userType === USER_TYPES_NOTIFICATION.TRAVELLER
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setUserType(USER_TYPES_NOTIFICATION.TRAVELLER)
                    }
                  >
                    Traveler
                  </div>
                  <div
                    onClick={() =>
                      setUserType(USER_TYPES_NOTIFICATION.SPECIALIST)
                    }
                    className={`${
                      userType === USER_TYPES_NOTIFICATION.SPECIALIST
                        ? "selected"
                        : ""
                    }`}
                  >
                    Specialist
                  </div>
                  <div
                    onClick={() => setUserType(USER_TYPES_NOTIFICATION.ALL)}
                    className={`${
                      userType === USER_TYPES_NOTIFICATION.ALL ? "selected" : ""
                    }`}
                  >
                    All
                  </div>
                </div>
                <div
                  title="Select all users"
                  onClick={selectAll}
                  className="user-selection-right"
                ></div>
                <div className="user-selection-right"></div>
              </div>

              <div className="user-selection-list">
                {data.map((user: any, index: number) =>
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

// function FetchEntity(
//   USERS: any,
//   arg1: { notificationList: boolean },
//   arg2: number,
//   arg3: number
// ) {
//   throw new Error("Function not implemented.");
// }
