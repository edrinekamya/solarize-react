import { ReactNode } from "react";
import './index.css'

const Spinner = ({children}: {children: ReactNode}) => {
  return (
    <div className="Spinner">{ children}</div> 
  );
}

export default Spinner;