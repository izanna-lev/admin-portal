import { useState } from "react";
import { Create } from "../../api/Create";
import { Editor } from "../../components/Simplemde/WYSIWYG";
import { API } from "../../constants";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "./index.scss";

const PrivacyPolicy = () => {
  const dispatch = useAppDispatch();
  const { privacyPolicy } = useAppSelector(
    (state) => state.appDetails
  );
  const [privacyPolicyValue, setPrivacyPolicy] = useState(privacyPolicy)


  const handleAboutUsChange = (e: any) => {
    setPrivacyPolicy(e)
  }
  
  const saveAppDetails = () => {
    dispatch(
      Create(
        API.APP_DETAILS_ADD,
        {
          termsAndConditions: privacyPolicyValue
        },
      )
    );
  }
  return (
    <section className="content-container">
      <section className="content">
        <section className="content-top">
          <div
            className="content-heading"
            style={{ display: "flex", alignItems: "center" }}
          >
            {/* <HelpOutlineOutlinedIcon fontSize="large" /> */}
            &nbsp;Privacy Policy
          </div>
          <div className="content-top-left"></div>
        </section>
        <section className="content-bottom">
          <div className="editor-container">
            <Editor 
              // id="body-editor"
              onChange={handleAboutUsChange}
              options={{
                initialValue: privacyPolicyValue || "",
              }}
            />
            <button
              onClick={() => {
                saveAppDetails();
              }}
              className="btn view-button"
              style={{ marginTop: "25px" }}
            >
              Save
            </button>
          </div>
        </section>
      </section>
    </section>
  );
};


export default PrivacyPolicy;
