import React, { useEffect, useState } from "react";

export default function AdminPageUsers() {
  const [users, setUsers] = useState([]);
  console.log(users);

  const handleDelete = async (userId) => {
    const url = `/api/user/admin/delete/${userId}`;
    await fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success === false) {
          console.log(data.message);
        } else {
          console.log(data);
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const url = "/api/user/";
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.success === "false") {
            console.log(data.message);
          } else {
            setUsers(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchUsers();
  }, []);
  return (
    <div className="max-w-3xl mx-auto mt-7 space-y-4 p-4">
      {users.length === 1 ? <h2 className="text-center font-semibold text-3xl text-slate-700">No Available Users...</h2> :
        users.map((user) => (
          <div key={user._id}>
            {
              !user.isAdmin && 
            <div
            className="flex justify-between items-center ring-2 p-2 rounded-md shadow-md"
          >
            <p className="font-semibold text-sm w-1/4">{user.username}</p>
            <p className="font-semibold text-sm text-slate-500 w-1/4">{user.email}</p>
            <input
              className="bg-slate-50 border p-1 rounded-md shrink w-20 md:w-32"
              value="***************"
              readOnly
            />
            <button
              disabled={user.isAdmin}
              onClick={() => handleDelete(user._id)}
              type="button"
              className="bg-red-600 text-white p-1 rounded-md disabled:opacity-70"
            >
              {user.isAdmin ? (
                <span className="line-through">Delete</span>
              ) : (
                <span>Delete</span>
              )}
            </button>
          </div>
            }
          </div>
        ))}
    </div>
  );
}
