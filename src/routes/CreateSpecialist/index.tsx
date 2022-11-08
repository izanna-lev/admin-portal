/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { API } from "../../constants";
import { BsChevronLeft } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/plain.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useRef, useState } from "react";
import { Create } from "../../api/Create";
import "./index.scss";
import { setBackground } from "../../util";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/InputTypes/InputForm";
import CheckBox from "../../components/InputTypes/CheckBox";


const CreateSpecialist = () => {
  const [permissions, setPermissions] = useState({
    createItinerary: false,
    editItinerary: false,
    cancelItinerary: false,
    sendNotifications: false,
  });
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("");

  const [selectedImage, setSelectedImage] = useState("");

  const setSpecificPermission = (data: boolean, name: string) => {
    setPermissions({ ...permissions, ...{ [name]: data } });
  };
  const apiMessage = useAppSelector((state) => state.apiMessage);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setBackground(URL.createObjectURL(e.target.files[0]), "itineraryImage");
    }
  };

  const saveSpecialist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getInputValue = (ref: any) => ref.current.value;

    const data = {
      specialistEmail: getInputValue(emailRef),
      name: getInputValue(nameRef),
      phoneNumber: phone,
      access: permissions,
      phoneCode,
    };

    if (!selectedImage) {
      return alert("Please select an image!");
    }
    dispatch(Create(API.CREATE_SPECIALIST, data, true, selectedImage));
  };

  if (apiMessage.type === "success") navigate("/admin/accessSpecialistList");

  return (
    <main className="content-container" id="formTop">
      <section className="content-top">
        <h2
          className="content-heading"
          onClick={() => navigate("/admin/accessSpecialistList")}
          style={{ cursor: "pointer" }}
        >
          <BsChevronLeft />
          <span>Create Specialist</span>
        </h2>
      </section>

      <form className="specialist-details" onSubmit={saveSpecialist}>
        <div className="specialist-basic">
          <div className="feild-heading">Basic Details</div>
          <div className="feild-heading-text">Upload Image</div>
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={imageChange}
            hidden
          />
          <label
            htmlFor="upload"
            className={`upload-image ${selectedImage ? "" : "not-selected-preview"
              }`}
            id="itineraryImage"
          >
            {<IoImageOutline className="image-placeholder" />}
          </label>

          <InputForm
            inputFields={{
              placeholder: "Steven Johns",
              ref: nameRef,
              name: "Name",
              id: "name",
              maxlength: 30,
              type: "text",
            }}
          />
          <InputForm
            inputFields={{
              placeholder: "john@gmail.com",
              ref: emailRef,
              name: "Email",
              id: "email",
              maxlength: 30,
              type: "email",
            }}
          />

          <div className="field-heading">Phone Number</div>
          <PhoneInput
            inputProps={{
              name: "Phone Number",
              required: true,
              autoFocus: true,
            }}
            country={"us"}
            value={phoneCode + phone}
            onKeyDown={(val: any) => {
              setPhoneCode(val.target.value.split(" ")[0])
              setPhone(val.target.value.split(" ").slice(1).join(""))
            }}
            specialLabel="Phone Number"
            inputClass="field-value"
            containerClass="input-tel"
            buttonClass="flag-dropdown"
          // onChange={(value: any) => 
          //   {
          //     console.log({value})
          //     setPhone(value)
          //   }}
          />

          <button className="button-submit-itinerary" type="submit">
            Create
          </button>
        </div>

        <div className="specialist-basic">
          <div className="feild-heading">Permissions</div>
          <div className="permissions-container">
            <div className="feild-heading-text">Specialist Permissions</div>
            <div className="line"></div>
            <CheckBox
              text="Create Itineraries"
              name="createItinerary"
              permissionValue={permissions.createItinerary}
              setSpecificPermission={setSpecificPermission}
            />
            <div className="line"></div>
            <CheckBox
              text="Edit Itineraries"
              name="editItinerary"
              permissionValue={permissions.editItinerary}
              setSpecificPermission={setSpecificPermission}
            />
            <div className="line"></div>
            <CheckBox
              text="Cancel Itineraries"
              name="cancelItinerary"
              permissionValue={permissions.cancelItinerary}
              setSpecificPermission={setSpecificPermission}
            />
            <div className="line"></div>
            <CheckBox
              text="Send Notifications"
              name="sendNotifications"
              permissionValue={permissions.sendNotifications}
              setSpecificPermission={setSpecificPermission}
            />
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateSpecialist;
