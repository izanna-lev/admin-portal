/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { API, IMAGE } from "../../constants";
import { BsChevronLeft } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/plain.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useRef, useState } from "react";
import { Create } from "../../api/Create";
import "./index.scss";
import { setBackground } from "../../util";
import { useNavigate, useLocation } from "react-router-dom";
import InputForm from "../../components/InputTypes/InputForm";
import CheckBox from "../../components/InputTypes/CheckBox";

const EditSpecialist = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState(location.state?.phoneNumber || "");
  const [phoneCode, setPhoneCode] = useState(location.state?.phoneCode || "");

  useEffect(() => {
    if (!location.state) {
      navigate("/admin/accessSpecialistList");
    }
    if (location.state?.image) {
      const myMaybeNullElement =
        window.document.getElementById("specialistImage");
      myMaybeNullElement!.style.background =
        "url(" + IMAGE.SMALL + location.state.image + ")";
    }
  }, []);

  const [permissions, setPermissions] = useState({
    createItinerary: location.state?.permissions?.createItinerary || false,
    editItinerary: location.state?.permissions?.editItinerary || false,
    cancelItinerary: location.state?.permissions?.cancelItinerary || false,
    sendNotifications: location.state?.permissions?.sendNotifications || false,
  });

  const [selectedImage, setSelectedImage] = useState();

  const setSpecificPermission = (data: boolean, name: string) =>
    setPermissions({ ...permissions, ...{ [name]: data } });

  const apiMessage = useAppSelector((state) => state.apiMessage);

  const nameRef = useRef();
  const emailRef = useRef();

  const dispatch = useAppDispatch();

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      setBackground(URL.createObjectURL(e.target.files[0]), "specialistImage");
    }
  };

  const editSpecialist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getInputValue = (ref: any) => ref.current.value;
    const data = {
      specialistEmail: getInputValue(emailRef),
      name: getInputValue(nameRef),
      phoneNumber: phone,
      phoneCode,
      access: permissions,
      specialistRef: location.state.id,
    };

    dispatch(Create(API.EDIT_SPECIALIST, data, true, selectedImage));
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
          <span>Edit Specialist</span>
        </h2>
      </section>

      <form className="specialist-details" onSubmit={editSpecialist}>
        <div className="specialist-basic">
          <div className="feild-heading">Basic Details</div>
          <div className="feild-heading">Upload Image</div>
          <input
            type="file"
            id="upload"
            accept="image/*"
            onChange={imageChange}
            hidden
          />
          <label htmlFor="upload">
            <div
              className="specialist-image-placeholder"
              id="specialistImage"
            ></div>
          </label>

          <InputForm
            inputFields={{
              placeholder: "Steven Johns",
              ref: nameRef,
              name: "Name",
              id: "name",
              maxlength: 30,
              type: "text",
              value: location.state?.name,
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
              value: location.state?.email,
            }}
          />

          <div className="field-heading">Phone Number</div>

          <PhoneInput
            inputProps={{
              name: "Phone Number",
              required: true,
            }}
            country={"us"}
            value={phoneCode + phone}
            onChange={(value, country, e) => {
              // console.log(value, country, e);
              const newVal = e.target.value.split(" ");

              setPhoneCode(newVal[0]);
              setPhone(newVal.slice(1).join(""));
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
            <div className="button">Edit</div>
          </button>
        </div>

        <div className="specialist-basic">
          <div className="feild-heading">Permissions</div>
          <div className="permissions-container">
            <div className="feild-heading">Specialist Permissions</div>
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

export default EditSpecialist;
