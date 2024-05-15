import React, { useEffect, useState } from 'react';
import { UserProfile } from '../UserProfile/UserProfile';
import DeleteButton from './DeleteButton';

const MakeAdmin = ({ user, onSave,handleDeleteClick, setRefetch}) => {
  const { data: loggedInUserData } = UserProfile();
  console.log(user,"user from make admin");
    //console.log(loggedInUserData,"loggedInUserData")
 
    //console.log(user,"user from make admin")
    const [admin, setAdmin] = useState(user?.admin || false);
  //console.log(admin, "admin")
  
useEffect(() => {
  setAdmin(user?.admin );
}, [user])

  let design;
  if (loggedInUserData._id === user?._id) { 
    design = <p className="text-red-500 text-center font-times text-2xl "> you cant remove your self  </p>
  }

  else {
    design = 
      <>
          <form
    className="grow"
    onSubmit={ev =>
    {onSave(ev, {
      admin,
      
    })
    setRefetch(Math.random())}
    }
>
  <label>
   Name
  </label>
    <input
         disabled={true}
    type="text" placeholder="First and last name"
    value={user?.name} onChange={ev => setUserName(ev.target.value)}
  />
  <label>Email</label>
  <input
    type="email"
    disabled={true}
    value={user?.email}
    placeholder={'email'}
  />
 
 
    <div>
      <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
        <input
          id="adminCb" type="checkbox" className="" value={'1'}
          checked={admin}
          onChange={ev => setAdmin(ev.target.checked)}
                  />
                  {
                      user?.admin ? <span className='text-red-500 text-xl font-times  '> Remove from Admin</span> :
                      <span className='text-cyan-500 text-xl font-times  '> Make Admin</span>
                  }
       
      </label>
    </div>

  <button type="submit">Save</button>
</form>
<div className="max-w-md mx-auto mt-2">
<div className="max-w-xs ml-20 ">
  <DeleteButton
    label="Delete"
    onDelete={handleDeleteClick}
  />
</div>
</div>

</>

}
    return (
        <div>
   
   <form
    className="grow"
    onSubmit={ev =>
    {onSave(ev, {
      admin,
      
    })
    setRefetch(Math.random())}
    }
>
  <label>
   Name
  </label>
    <input
         disabled={true}
    type="text" placeholder="First and last name"
    value={user?.name} onChange={ev => setUserName(ev.target.value)}
  />
  <label>Email</label>
  <input
    type="email"
    disabled={true}
    value={user?.email}
    placeholder={'email'}
  />
 
 
   
          {
            loggedInUserData._id !== user?._id && (
              <div>
              <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                <input
                  id="adminCb" type="checkbox" className="" value={'1'}
                  checked={admin}
                  onChange={ev => setAdmin(ev.target.checked)}
                          />
                          {
                              user?.admin ? <span className='text-red-500 text-xl font-times  '> Remove from Admin</span> :
                              <span className='text-cyan-500 text-xl font-times  '> Make Admin</span>
                          }
               
              </label>
            </div>
            ) 
}
  <button type="submit">Save</button>
        </form>
        
        {
          loggedInUserData._id !== user?._id && (
            <div className="max-w-md mx-auto mt-2">
<div className="max-w-xs ml-20 ">
  <DeleteButton
    label="Delete"
    onDelete={handleDeleteClick}
  />
</div>
</div>
          )
        }

     
        </div>
    );
};

export default MakeAdmin;