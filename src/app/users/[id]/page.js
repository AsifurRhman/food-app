'use client';

import DeleteButton from "@/Components/Layout/DeleteButton";
import MakeAdmin from "@/Components/Layout/MakeAdmin";
import UserForm from "@/Components/Layout/UserForm";
import UserTabs from "@/Components/Layout/UserTabs";
import { UserProfile } from "@/Components/UserProfile/UserProfile";
import {redirect, useParams} from "next/navigation";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
  const { loading, data } = UserProfile();
  const [refetch,setRefetch] = useState(null)
 
  //console.log(data, "edit user page")
  const [redirectToItems, setRedirectToItems] = useState(false);
  const [user, setUser] = useState(null);
  console.log(user, "edit user page")
  const [loader,setLoader]=useState(false);
//console.log(user,"user form edit user")
  const { id } = useParams();
  
  const [admin, setAdmin] = useState(user?.admin || false);
  //console.log(admin, "set admin")

  
  useEffect(() => {
    const retypeData = async () => {
      setLoader(true); 
  
      try {
        const response = await fetch(`/api/profile?_id=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoader(false); 
      }
    };
  
    retypeData(); 
  }, [refetch]); 
  

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    //console.log(data,"data from save button")
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...data,_id:id}),
      });
      if (res.ok) {
        resolve();
        setRefetch(Math.random())
      }
        
      else
        reject();
    });

    await toast.promise(promise, {
      loading: 'Saving user...',
      success: 'User saved',
      error: 'An error has occurred while saving the user',
    });
  }

  if (loading) {
    return 'Loading user profile...';
  }

  if (!data.admin) {
    return 'Not an admin';
  }
  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      //console.log(id,"id")
      const res = await fetch('/api/users?_id='+id, {
        method: 'DELETE',
      });
      if (res.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });

    setRedirectToItems(true);
  }
  if (redirectToItems) {
    return redirect('/users');
  }
 
 
  return (
    <section className="mt-8 mx-auto max-w-2xl">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {/* <UserForm user={user} onSave={handleSaveButtonClick} /> */}
        {
          loader ? (
            <div>
              <p className="text-center font-times text-xl">Loading.....</p></div>
          )
            :
            <MakeAdmin user={user} onSave={handleSaveButtonClick} handleDeleteClick={handleDeleteClick} setRefetch={ setRefetch} />
        }
       
      </div>
      {/* <div className="max-w-md mx-auto mt-2">
        <div className="max-w-xs ml-20 ">
          <DeleteButton
            label="Delete"
            onDelete={handleDeleteClick}
          />
        </div>
      </div> */}
    </section>
  );
}