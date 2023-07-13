import React, { ReactNode } from "react";
import Header from "../Header";
import './index.scss'

type Props = {
  enableSearch?: boolean;
  children?: ReactNode;
};

const Layout: React.FC<Props> = ({ children, enableSearch }) => {
  return (
    <div className="container">
      <Header enableSearch={enableSearch}/>
      <div className="content"> {children}</div>
    </div>
  );
};

export default Layout;
