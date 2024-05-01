'use client';

import Left from "@/Components/Icons/Left";
import MenuItemForm from "@/Components/Layout/MenuItemForm";
import UserTabs from "@/Components/Layout/UserTabs";
import { UserProfile } from "@/Components/UserProfile/UserProfile";
import Link from "next/link";
import {redirect} from "next/navigation";
import {useState} from "react";
import toast from "react-hot-toast";

export default function NewMenuItemPage() {

  const [redirectToItems, setRedirectToItems] = useState(false);
  const {loading, data} = UserProfile();

  async function handleFormSubmit(ev, data) {
      ev.preventDefault();
      //console.log(data,"data from new menu item")
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menuItem', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
        //console.log(response,"response")
      if (response.ok)
        resolve();
      else
        reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving this tasty item',
      success: 'Saved',
      error: 'Error',
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect('/menuItem');
  }

  if (loading) {
    return 'Loading user info...';
  }

  if (!data.admin) {
    return 'Not an admin.';
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={'/menuItem'} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}