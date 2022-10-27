import { useState } from "react";
import { Create } from "../../api/Create";
import { Editor } from "../../components/Simplemde/WYSIWYG";
import { API } from "../../constants";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setAppdetails } from "../../store/slices/appDetails";
import "./index.scss";

const AboutUs = () => {
  const dispatch = useAppDispatch();
  const { aboutUs } = useAppSelector(
    (state) => state.appDetails
  );
  const [aboutUsValue, setAboutUs] = useState(aboutUs)


  console.log("=----> aboutUsValue",aboutUsValue)
  const handleAboutUsChange = (e: any) => {
    setAboutUs(e)
  }
  
  const saveAppDetails = () => { 
    dispatch(
      Create(
        API.APP_DETAILS_ADD,
        {
          aboutUs: aboutUsValue
        },
      )
    );
    dispatch(setAppdetails({
      aboutUs: aboutUsValue
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
            &nbsp;About Us
          </div>
          <div className="content-top-left"></div>
        </section>
        <section className="content-bottom">
          <div className="editor-container">
            <Editor 
              // id="body-editor"
              onChange={handleAboutUsChange}
              options={{
                initialValue: aboutUsValue || aboutUs || "",
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


export default AboutUs;
