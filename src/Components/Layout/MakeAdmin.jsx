import React, { useEffect, useState } from 'react';
import { UserProfile } from '../UserProfile/UserProfile';

const MakeAdmin = ({ user, onSave }) => {
    const { data: loggedInUserData } = UserProfile();
    console.log(loggedInUserData,"loggedInUserData")
 
    console.log(user,"user from make admin")
    const [admin, setAdmin] = useState(user?.admin || false);
  console.log(admin, "admin")
  

  let design;

  if (loggedInUserData._id === user?._id) { 
    design = <p className="text-red-500 text-center font-times text-xl"> you cant remove your self from admin </p>
  }

  else {
    design = 
    <form
    className="grow"
    onSubmit={ev =>
      onSave(ev, {
       admin,
       
      })
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
}
    return (
        <div>
   
        {design}
        </div>
    );
};

export default MakeAdmin;