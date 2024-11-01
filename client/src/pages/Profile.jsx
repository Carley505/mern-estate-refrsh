import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  updateStart,
  updateFailure,
  updateSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  logoutUserFailure,
  logoutUserSuccess,
  logoutUserStart,
} from "../redux/appSlices/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export const Profile = () => {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [fileUploadPerc, setFileUploadPerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formUpdate, setFormUpdate] = useState(false);

  const [userListings, setUserListings] = useState([])

  console.log(userListings)

  const fileRef = useRef(null);

  const { loading, error, currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(updateStart());
    const url = `/api/user/update/${currentUser._id}`;

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success === false) {
          dispatch(updateFailure(data.message));
          return;
        } else {
          dispatch(updateSuccess(data));
          setFormUpdate(true);
        }
      })
      .catch((error) => {
        dispatch(updateFailure(error.message));
      });
  };

  const handleDelete = async () => {
    const url = `/api/user/delete/${currentUser._id}`;

    dispatch(deleteUserStart());
    await fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        } else {
          navigate("/sign-up");
          dispatch(deleteUserSuccess(data));
          console.log(data);
        }
      })
      .catch((error) => {
        dispatch(deleteUserFailure(error.message));
      });
  };

  const handleLogOut = async () => {
    const url = `/api/auth/signout`;

    dispatch(logoutUserStart());
    await fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success === false) {
          dispatch(logoutUserFailure(data.message));
          return;
        } else {
          dispatch(logoutUserSuccess(data));
        }
      })
      .catch((error) => {
        dispatch(logoutUserFailure(error));
      });
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadPerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({
            ...formData,
            avatar: downloadUrl,
          });
        });
      }
    );
  };
  const handleShowListings = async() =>{
    const url = `/api/user/listings/${currentUser._id}`

    await fetch(url).then((response)=>{
      return response.json()
    }).then((data)=>{
      setUserListings(data)
    }).catch((error)=>{
      console.log(error.message)
    })
  }

  const handleDeleteUserListing = async(listing) =>{
    const url = `/api/user/listings/${currentUser._id}/delete/${listing._id}`;

    await fetch(url, {
      method: "DELETE",
    }).then((response)=>{
      return response.json()
    }).then((data)=>{
      setUserListings((prev)=>prev.filter((item)=>item._id !== listing._id))
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div>
        <h2 className="text-center font-semibold text-3xl my-7">Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            hidden
            onChange={(e) => setFile(e.target.files[0])}
            ref={fileRef}
            type="file"
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            className="h-24 w-24 object-cover cursor-pointer rounded-full ring-2 self-center"
            src={formData.avatar || currentUser.avatar}
            alt="avatar"
          />
          <p className="text-sm self-center">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image Upload(Image must be less than 2mb)
              </span>
            ) : fileUploadPerc > 0 && fileUploadPerc < 100 ? (
              <span className="text-slate-700">{fileUploadPerc}%</span>
            ) : fileUploadPerc === 100 ? (
              <span className="text-green-700">
                Image Successfully Uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
          <input
            className="p-4 border rounded-lg focus:outline-none"
            id="username"
            placeholder="username"
            type="text"
            onChange={handleChange}
            defaultValue={currentUser.username}
          />
          <input
            className="p-4 border rounded-lg focus:outline-none"
            id="email"
            placeholder="email"
            type="text"
            onChange={handleChange}
            defaultValue={currentUser.email}
          />
          <input
            className="p-4 border rounded-lg focus:outline-none"
            id="password"
            placeholder="password"
            type="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-4 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <Link
            className="bg-green-700 text-white p-4 text-center rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            to="/create-listing"
          >
            {"Create Listing"}
          </Link>
        </form>
        <div className="text-red-700 mt-4 flex justify-between">
          <span className="cursor-pointer" onClick={handleDelete}>
            Delete Account
          </span>
          <span className="cursor-pointer" onClick={handleLogOut}>
            Sign Out
          </span>
        </div>
        {error ? <p className="text-red-600 mt-4">{error}</p> : ""}
        {formUpdate ? (
          <p className="text-green-700">User updated Successfully.</p>
        ) : (
          ""
        )}
      </div>
      <div>
        <button onClick={handleShowListings} className="text-green-700 w-full" type="button">show listings</button>
         {
          userListings && userListings.length > 0 &&
           (
            <div className="">
            <h2 className="font-semibold text-2xl text-center mt-7">Your Listings</h2>
              {
                userListings.map((listing)=>{
                return(
                  <div className="flex justify-between items-center p-2 gap-4 border rounded-lg" key={listing._id}>
                  <Link to={`/listing/${listing._id}`}>
                  <img className="h-20 w-20 object-contain rounded-lg" src={listing.imageUrls[0]} alt='image'/>
                  </Link>
                  <Link  className="flex-1 text-slate-700 font-semibold hover:underline truncate" to={`/listing/${listing._id}`}>
                  <h2>{listing.name}</h2>
                  </Link>
                  <div className="flex flex-col gap-2">
                    <button onClick={()=>handleDeleteUserListing(listing)} className="uppercase text-red-700" type="button">Delete</button>
                    <button className="uppercase text-green-700" type="button">edit</button>
                  </div>
                </div>
                )
              }) 
              }
            </div>
           )
         }
        </div>
      </div>
  );
};
