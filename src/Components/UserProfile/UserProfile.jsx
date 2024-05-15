import {useEffect, useState} from "react";

export function UserProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log(data,"user profile")
  useEffect(() => {
    setLoading(true);
    fetch('/api/profile').then(response => {
      response.json().then(data => {
        setData(data);
        setLoading(false);
      });
    })
  }, []);

  return {loading, data};
}