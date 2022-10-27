import { useState } from "react";
import { Create } from "../../api/Create";
import { Editor } from "../../components/Simplemde/WYSIWYG";
import { API } from "../../constants";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setAppdetails } from "../../store/slices/appDetails";
import "./index.scss";

const TermsConditions = () => {
  const dispatch = useAppDispatch();
  const { termsAndConditions } = useAppSelector(
    (state) => state.appDetails
  );
  const [termsAndConditionsValue, setTermsAndConditions] = useState(termsAndConditions)


  const handleAboutUsChange = (e: any) => {
    setTermsAndConditions(e)
  }
  
  const saveAppDetails = () => {
    dispatch(
      Create(
        API.APP_DETAILS_ADD,
        {
          termsAndConditions: termsAndConditionsValue
        },
      )
    );
    dispatch(setAppdetails({
      termsAndConditions: termsAndConditionsValue
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
            &nbsp;Terms & Conditions
          </div>
          <div className="content-top-left"></div>
        </section>
        <section className="content-bottom">
          <div className="editor-container">
            <Editor 
              // id="body-editor"
              onChange={handleAboutUsChange}
              options={{
                initialValue: termsAndConditionsValue || termsAndConditions || "",
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


export default TermsConditions;
