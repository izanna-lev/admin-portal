import { useState } from "react";
import { Create } from "../../api/Create";
import { Editor } from "../../components/Simplemde/WYSIWYG";
import { API } from "../../constants";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import "./index.scss";
import { setAppdetails } from "../../store/slices/appDetails";
const PrivacyPolicy = () => {
  const dispatch = useAppDispatch();
  const { privacyPolicy, termsAndConditions, aboutUs } = useAppSelector(
    (state) => state.appDetails
  );
  const [privacyPolicyValue, setPrivacyPolicy] = useState(privacyPolicy)

  console.log("---privacyPolicy->",privacyPolicy)

  const handleAboutUsChange = (e: any) => {
    setPrivacyPolicy(e)
  }
  
  const saveAppDetails = () => {
    dispatch(
      Create(
        API.APP_DETAILS_ADD,
        {
          privacyPolicy: privacyPolicyValue
        },
      )
    );
    dispatch(setAppdetails({
        privacyPolicy: privacyPolicyValue
    }))
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
                initialValue: privacyPolicyValue || privacyPolicy || "",
              }}
            />
            <button
              onClick={() => {
                saveAppDetails();
              }}
              className="btn view-button settings"
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
