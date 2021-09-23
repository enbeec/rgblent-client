import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider.js";
import { Profile } from "./reusable/Profile.js";

export const UserProfile = (props) => {
  const { profile, isLoading } = useContext(AuthContext);
  return <Profile profile={profile} isLoading={isLoading} />;
};
