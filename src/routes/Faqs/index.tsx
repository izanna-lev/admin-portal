import { useState, useEffect } from "react";
import { Create } from "../../api/Create";
import { API } from "../../constants";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { SerialNum } from "../../util";
import "./index.scss";
import { FaRegEdit } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Fetch } from "../../api/Fetch";
import { useNavigate } from "react-router-dom";
import { DeleteEntity } from "../../api/Delete";
import { Modal } from "../../components/Portal";
import Popup from "../../components/Popup";

const TableHead = () => (
  <thead className="table-head">
    <tr className="head-tr">
      <th>Sr.No.</th>
      <th>Question</th>
      <th>Answer</th>
      <th className="custom-head">Actions</th>
    </tr>
  </thead>
);

const TableRow = (
  item: any,
  index: number,
  limit: number,
  page: number,
  navigate: any,
  popupUpdate: any
) => {
  return (
    <tr className="body-tr" key={index}>
      <td>{SerialNum(limit, page, index)}</td>
      <td>{item.question || "NA"}</td>
      <td>{item.answer || "NA"}</td>
      <td className="specialist-actions">
        <button
          className="btn view-button specialist-edit"
          onClick={() => {
            navigate(`/settings/faqs/edit/${item._id}`, {
              state: {
                id: item._id,
                question: item.question,
                answer: item.answer,
              },
            });
          }}
        >
          <FaRegEdit />
          Edit
        </button>
        <button
          className="btn view-button specialist-delete"
          onClick={() => popupUpdate(true, item._id)}
        >
          <RiDeleteBin6Line />
          Delete
        </button>
      </td>
    </tr>
  );
};

const Faqs = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { page, limit, size, total, list } = useAppSelector(
    (state) => state.faqList
  );

  const [popup, setPopup] = useState({
    id: "",
    show: false,
  });

  const popupUpdate = (show: boolean, id: string) => {
    setPopup({ ...popup, show, id });
  };

  const cancel = () => {
    setPopup({ ...popup, show: false, id: "" });
  };

  const deleteFaq = () => {
    dispatch(DeleteEntity(API.FAQ_DELETE, { faqRef: popup.id }));
    cancel();
    window.location.reload();
  };

  useEffect(() => {
    dispatch(Fetch(API.FAQ_LIST, {}, 1, 10));
  }, [dispatch]);

  return (
    <section className="content-container">
      <section className="content">
        <section className="content-top-faq">
          <div
            className="content-heading"
            style={{ display: "flex", alignItems: "center" }}
          >
            {/* <HelpOutlineOutlinedIcon fontSize="large" /> */}
            &nbsp;FAQs
          </div>
          <button
            className=" btn view-button add-faq"
            onClick={() => {
              navigate(`/settings/faq/add`);
            }}
          >
            Add FAQs
          </button>
          <div className="content-top-left"></div>
        </section>

        <section className="table-container">
          <table className="itinerary-table table">
            {TableHead()}
            <tbody className="body-tr">
              {list.length ? (
                list.map((item, index) =>
                  TableRow(item, index, limit, page, navigate, popupUpdate)
                )
              ) : (
                <tr className="table-empty">
                  <td colSpan={7}>
                    <div>No Data</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </section>
      {popup.show && (
        <Modal
          modal={
            <Popup
              heading="Delete Specialist"
              text="Are you sure you want to delete this faq. This can`t be undone"
              firstButtonText="Delete"
              secondButtonText="Cancel"
              firstButtonAction={deleteFaq}
              secondButtonAction={cancel}
            />
          }
          root={document.getElementById("overlay-root") as HTMLElement}
        />
      )}
    </section>
  );
};

export default Faqs;
