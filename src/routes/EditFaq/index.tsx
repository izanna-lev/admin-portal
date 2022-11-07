/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { API } from "../../constants";
import { BsChevronLeft } from "react-icons/bs";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import TextArea from "../../components/InputTypes/TextArea";
import { useEffect, useRef } from "react";
import { Create } from "../../api/Create";
import "./index.scss";

const EditFaq = () => {
  const dispatch = useAppDispatch();
  const location: any = useLocation();
  const navigate = useNavigate();

  const apiMessage = useAppSelector((state) => state.apiMessage);

  const questionRef = useRef();
  const answerRef = useRef();

  useEffect(() => {
    if (!location.state) navigate("/settings/faqs");
  }, [location.state, navigate]);

  const saveFaq = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getInputValue = (ref: any) => ref.current.value;

    const data = {
      question: getInputValue(questionRef),
      answer: getInputValue(answerRef),
      faqRef: location.state.id,
    };
    dispatch(Create(API.FAQ_EDIT, data, false));
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
          <span>Edit Faq</span>
        </h2>
      </section>

      <form className="specialist-details" onSubmit={saveFaq}>
        <div className="specialist-basic">
          <TextArea
            inputFields={{
              placeholder: "",
              ref: questionRef,
              name: "Question",
              id: "question",
              maxlength: 1000,
              type: "text",
              value: location.state?.question,
            }}
          />
          <TextArea
            inputFields={{
              placeholder: "",
              ref: answerRef,
              name: "Answer",
              id: "answer",
              maxlength: 1000,
              type: "text",
              value: location.state?.answer,
            }}
          />
          <button className="button-submit-itinerary" type="submit">
            Save
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditFaq;
