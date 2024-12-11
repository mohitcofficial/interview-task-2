import axios from "axios";
import React, { useEffect, useState } from "react";
import UserApiServices from "../../services/api/User.api.services";

function Verify() {
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentUrl = window.location.href;
  const parts = currentUrl.split("/");
  const lastElement = parts[parts.length - 1];

  useEffect(() => {
    const verifyUser = async () => {
      try {
        setLoading(true);
        const data = await UserApiServices.verifyUser(lastElement);
        setFound(true);
      } catch (error) {
        console.log(error);
        setFound(false);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  return (
    <>
      {loading && found && <h2>..loading</h2>}
      {!loading && found && <h2>Account Verified</h2>}
      {!loading && !found && <h2>Invalid Token or Token Expired!</h2>}
    </>
  );
}

export default Verify;
