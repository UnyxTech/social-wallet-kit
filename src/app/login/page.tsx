"use client";
import {TomoContextProvider, TomoModal} from "@tomo-inc/tomo-social-react"
import "@tomo-inc/tomo-social-react/style.css"

interface IProps {}

const Login: React.FC<IProps> = () => {


  return (
    <TomoContextProvider>
      <TomoModal />
    </TomoContextProvider>

  );
};

export default Login;
