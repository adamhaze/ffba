import { ProfilePicture } from "./components/ProfilePicture";

const profpic = 'https://hips.hearstapps.com/hmg-prod/images/bloodhound-1663107040.jpg';

function UserProfile () {
    return (
        <div>
            <h1> User Profile Page... </h1>
            <ProfilePicture imageUrl={profpic} size={'100px'}/>
        </div>
    );
};

export default UserProfile;