/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import TextArea from "../../components/InputTypes/TextArea";
import { useNavigate } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import { Create } from "../../api/Create";
import { API } from "../../constants";
import { useEffect } from "react";
import "./index.scss";

const AddFaq = () => {
  const apiMessage = useAppSelector((state) => state.apiMessage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const saveSpecialist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target: any = e.target;
    const data = { question: target[0].value, answer: target[1].value };

    dispatch(Create(API.FAQ_ADD, data, false));
  };

  useEffect(() => {
    if (apiMessage.type === "success") navigate("/settings/faqs");
  }, [apiMessage.type, navigate]);

  return (
    <main className="content-container" id="formTop">
      <section className="content-top">
        <h2
          className="content-heading"
          onClick={() => navigate("/settings/faqs")}
          style={{ cursor: "pointer" }}
        >
          <BsChevronLeft />
          &nbsp;
          <span>Add Faq</span>
        </h2>
      </section>

      <form className="specialist-details" onSubmit={saveSpecialist}>
        <div className="specialist-basic">
          <TextArea
            inputFields={{
              placeholder: "",
              name: "Question",
              id: "question",
              maxlength: 30,
              type: "text",
            }}
          />
          <TextArea
            inputFields={{
              placeholder: "",
              name: "Answer",
              id: "answer",
              maxlength: 30,
              type: "text",
            }}
          />
          <button className="button-submit-itinerary" type="submit">
            Add
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddFaq;
