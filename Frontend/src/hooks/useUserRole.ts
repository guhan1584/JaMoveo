import { useEffect, useState } from "react";

export const useUserRole = () => {
  const [userRole, setUserRole] = useState(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "");
      return {
        isAdmin: user.admin === true,
        username: user.username,
        instrument: user.instrument ?? "",
      };
    } catch {
      return { isAdmin: false, username: "Anonymous", instrument: "" };
    }
  });

  useEffect(() => {
    const updateRole = () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "");
        setUserRole({
          isAdmin: user.admin === true,
          username: user.username,
          instrument: user.instrument ?? "",
        });
      } catch {
        setUserRole({ isAdmin: false, username: "Anonymous", instrument: "" });
      }
    };

    window.addEventListener("storage", updateRole);
    return () => window.removeEventListener("storage", updateRole);
  }, []);

  return userRole;
};
