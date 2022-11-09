/**
 * @desc this is the login component of the application.
 * @author Jagmohan Singh
 */

import { useAppSelector } from "../../store/hooks";
import { IMAGE } from "../../constants";
import "./index.scss";

const ProfilePage = () => {
  const profileData = useAppSelector((state) => state.profile);

  return (
    <main className="content-container" id="profilePage">
      <section className="content-top">
        <h2 className="content-heading">Profile</h2>
      </section>

      <section className="profile">
        <img
          className="profile-image"
          src={`${IMAGE.SMALL}${profileData.image}`}
          alt={profileData.name}
        />
        <div className="profile-details">
          <h4 className="profile-name">Admin</h4>
          {profileData.email ? (
            <a className="value" href={`mailto:${profileData.email}`}>
              {profileData.email}
            </a>
          ) : (
            "NA"
          )}
          <a href={`tel:${profileData.phoneNumber}`} className="profile-text">
            {profileData.phoneNumber}
          </a>
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
