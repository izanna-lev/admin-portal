/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import AddEditNote from "../../../components/AddEditNote";
import { DeleteEntity } from "../../../api/Delete";
import { MdDeleteOutline } from "react-icons/md";
import { API, IMAGE } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Fetch } from "../../../api/Fetch";
import "./index.scss";
import { EDIT_NOTES } from "../../../store/slices/itinerary";
import { editListItem } from "../../../util";
import { AiOutlinePlus } from "react-icons/ai";

const NotesDetails = ({ status }: { status?: number }) => {
  const [addMore, setAddMore] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { list, page, limit } = useAppSelector(
    (state) => state.itinerary.notes
  );

  const { _id } = useAppSelector((state) => state.itinerary.itineraryDetails);

  const editNote = (id: any = "") =>
    editListItem(dispatch, list, EDIT_NOTES, id);

  const fetchData = useCallback(
    (page = 1, limit = 10000) =>
      dispatch(Fetch(API.NOTES_LIST, { itineraryRef: _id }, page, limit, {})),
    [_id, dispatch]
  );

  useEffect(() => {
    fetchData(1, 10);
  }, [fetchData]);

  // const nextPage = () => fetchData(page + 1, limit);
  // const previousPage = () => fetchData(page - 1, limit);

  const deleteNote = (noteRef: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reservation?"
    );
    if (confirmDelete)
      dispatch(
        DeleteEntity(
          API.NOTE_DELETE,
          { noteRef },
          API.NOTES_LIST,
          { itineraryRef: _id },
          page,
          limit
        )
      );
  };

  return (
    <>
      {/* {list.length
        ? Pagination({
            page,
            limit,
            total,
            size,
            nextPage,
            previousPage,
          })
        : null} */}
      <section className="itinerary-details-container">
        <div className="AddNotesPage">
          <div className="add-notes notes-grid itinerary-table-header">
            <div>Day</div>
            <div>Image</div>
            <div>Description</div>
            <div>Action</div>
          </div>

          <div className="forms">
            {addMore ? <AddEditNote handleAddEdit={setAddMore} /> : null}
            {list.length ? (
              list.map((element: any, index: number) => {
                return element.edit ? (
                  <AddEditNote handleAddEdit={editNote} data={element} />
                ) : (
                  <div
                    className={`add-notes table-item notes-grid itinerary-table-row`}
                    key={index}
                  >
                    <div>{element.day}</div>
                    <div>
                      <img
                        className="itineraryImage"
                        src={`${IMAGE.SMALL}${element.image}`}
                        alt={element.name}
                      />
                    </div>
                    <div>{element.description}</div>
                    {status === 3 || status === 5 ? (
                      <div></div>
                    ) : (
                      <div className="add-activity-buttons">
                        <button
                          className="btn edit-button"
                          onClick={() => editNote(element._id)}
                        >
                          <FaRegEdit />
                          &nbsp;<span>Edit</span>
                        </button>

                        <button
                          className="btn delete-button"
                          onClick={() => deleteNote(element._id)}
                        >
                          <MdDeleteOutline />
                          &nbsp;<span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className={`empty-table table-item`}>Nothing Added</div>
            )}
          </div>
        </div>
      </section>
      {status === 1 || status === 2 || status === 4 ? (
        <span
          className="add-more-tickets"
          onClick={() => {
            setAddMore(true);
          }}
        >
          <AiOutlinePlus />
          &nbsp;Add More
        </span>
      ) : null}

      {status === 4 ? (
        <div
          onClick={() => navigate("/itinerary/add/summary")}
          className="continue-button"
        >
          Continue
        </div>
      ) : null}
    </>
  );
};

export default NotesDetails;
