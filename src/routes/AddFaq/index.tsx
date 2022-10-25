/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { API } from "../../constants";
import { BsChevronLeft } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";


import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useRef } from "react";
import { Create } from "../../api/Create";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import TextArea from "../../components/InputTypes/TextArea";

const AddFaq = () => {

  const apiMessage = useAppSelector((state) => state.apiMessage);


  const questionRef = useRef();
  const answerRef = useRef();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const saveSpecialist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getInputValue = (ref: any) => ref.current.value;

    const data = {
      question: getInputValue(questionRef),
      answer: getInputValue(answerRef),
    };
    dispatch(Create(API.FAQ_ADD, data, false));
  };

  if (apiMessage.type === "success") navigate("/settings/faqs");


  return (
    <main className="content-container" id="formTop">

      <section className="content-top">
        <h2
          className="content-heading"
          onClick={() => navigate("/settings/faqs")}
          style={{ cursor: "pointer" }}
        >
          <BsChevronLeft />
          <span>Add Faq</span>
        </h2>
      </section>

      <form className="specialist-details" onSubmit={saveSpecialist}>
        <div className="specialist-basic">
          <TextArea
            inputFields={{
              placeholder: "",
              ref: questionRef,
              name: "Question",
              id: "question",
              maxlength: 30,
              type: "text",
            }}
          />
          <TextArea
            inputFields={{
              placeholder: "",
              ref: answerRef,
              name: "Answer",
              id: "answer",
              maxlength: 30,
              type: "text",
            }}
          />
          <button className="button-submit-itinerary" type="submit">
            <div className="button">Add</div>
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddFaq;
