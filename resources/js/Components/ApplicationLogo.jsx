import logo from "../images/dark_logo.png";
export default function ApplicationLogo(props) {
    return (
        <img src={logo} className={props.className}/>
    );
}
