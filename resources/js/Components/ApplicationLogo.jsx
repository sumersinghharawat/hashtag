import logo from "../images/incorpX-logo.png";
export default function ApplicationLogo(props) {
    return (
        <img src={logo} className={props.className}/>
    );
}
