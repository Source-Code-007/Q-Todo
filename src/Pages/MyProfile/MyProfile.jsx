import MyLoading from "../../Components/HelpingCompo/MyLoading";
import { useAuth } from "../../Provider/authProvider";
import myLocalDB from "../../util/localDB";


const MyProfile = () => {
  const { user, authLoading } = useAuth();
    const {getMyProfile} = myLocalDB
    const myProfile = getMyProfile(user?.email)


  
  if (authLoading) {
    return <div className='h-screen flex items-center justify-center'>
        <MyLoading className={'h-14 w-14'} />
    </div>
}

  return (
    <div className="my-container mx-auto px-5 py-[100px] min-h-screen">
        <h2 className="text-3xl font-bold text-center my-4">My Profile</h2>
      <div className="py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-xl mx-auto bg-slate-100 bg-opacity-40 rounded-lg shadow-lg p-8">
                        <div className="flex flex-col items-center">
                            <img
                                src={user?.photoURL}
                                alt="Profile"
                                className="mx-auto w-24 h-24 rounded-full mb-4"
                            />
                            <h2 className="text-lg sm:text-xl font-semibold" title="name">{user?.displayName}</h2>
                            <h2 className="text-lg sm:text-xl font-semibold" title="name">{user?.email}</h2>
                            <p title="bio">{myProfile?.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
};

export default MyProfile;
