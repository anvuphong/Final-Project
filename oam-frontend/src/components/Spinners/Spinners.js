import {Oval} from "react-loader-spinner";
import "./Spinners.css";

const Spinners = () => {
    return (
        <div className="spinners__overlay">
            <div className="spinners__icon">
                <Oval height="100"
                      width="100"
                      color='red'
                      ariaLabel='loading'/>
            </div>
        </div>
    )
}
export default Spinners;