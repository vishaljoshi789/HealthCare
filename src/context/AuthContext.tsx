"use client";
import { createContext, ReactNode, useState } from "react";

import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
// import { json } from "stream/consumers";

// interface UserInfoType {
//   id: number;
//   name: string;
//   email: string;
//   phone_no: string;
//   user_id: string;
//   user_type: string;
//   email_verified: boolean;
//   phone_verified: boolean;
//   aadhar_verified: boolean;
//   pan_verified: boolean;
//   p_address: string;
//   date_joined: string;
//   last_login: string;
//   status: boolean;
//   referral: any;
//   VendorInfo: any;
// }

interface AccessTokenType {
  access: string;
  refresh: string;
}

interface GFContextType {
  authToken: AccessTokenType | null;
  setAuthToken: Dispatch<SetStateAction<AccessTokenType | null>>;
  logout: () => void;
  baseURL: string;
  login: (email: string, password: string) => Promise<void>;
  // userInfo: any;
  // setUserInfo: any;
}

export type { GFContextType };

const GFContext = createContext<GFContextType>({
  authToken: null,
  setAuthToken: () => {},
  logout: () => {},
  baseURL: "",
  login: async () => {}
  // userInfo: null,
  // setUserInfo: () => {},
});

const GFProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const baseURL = process.env.NEXT_PUBLIC_API_URL || "";
  const baseURL = "http://192.168.225.187:8000";

  const router = useRouter();
  const [authToken, setAuthToken] = useState<AccessTokenType | null>(
    typeof window !== "undefined" && localStorage.getItem("accessToken")
      ? JSON.parse(
          (typeof window !== "undefined" &&
            localStorage.getItem("accessToken")) ||
            "{}"
        )
      : null
  );

  // let [userInfo, setUserInfo] = useState<UserInfoType | null>(
  //   typeof window !== "undefined" && localStorage.getItem("userInfo")
  //     ? JSON.parse(
  //         (typeof window !== "undefined" && localStorage.getItem("userInfo")) ||
  //           "{}"
  //       )
  //     : null
  // );
  const login = async (email: string, password : string) => {
    const user = {username: email, password};
    const res = await fetch(baseURL + '/auth/token/', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
    if(res.status === 200) {
      const data = await res.json();
      setAuthToken(data);
      localStorage.setItem("accessToken", JSON.stringify(data));
      router.push("/dashboard");
    } else {
      console.error("Error Login");
    }
  }

  const userLogout = () => {
    setAuthToken(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    typeof window !== "undefined" && localStorage.removeItem("accessToken");
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    typeof window !== "undefined" && localStorage.removeItem("userInfo");
    router.push("/auth/login");
  };

  const ContextData: GFContextType = {
    authToken,
    setAuthToken,
    logout: userLogout,
    baseURL,
    login
    // userInfo,
    // setUserInfo,
  };

  return (
    <GFContext.Provider value={ContextData}>{children}</GFContext.Provider>
  );
};

export { GFContext, GFProvider };