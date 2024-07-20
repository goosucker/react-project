import { useState, useRef } from "react";
import st from "./style.module.css";
import AvatarLogo from "../../icons/user-avatar.svg";
import ArrowDown from "../../icons/arrow-down.svg";

const Avatar = () => {
    const [showDropDownMenu, setDropDownMenu] = useState(false);
    const arrowRef = useRef(null)
    const ToggleDropDown = () => {
        if (showDropDownMenu) {
            setDropDownMenu(false)
            arrowRef.current.style.rotate = "0deg";
        } else {
            setDropDownMenu(true)
            arrowRef.current.style.rotate = "180deg";
        }
    }
    return (
        <div className={st.AvatarBox} onClick={ToggleDropDown}>
            <img src={AvatarLogo} alt="изображение" />
            <img ref={arrowRef} src={ArrowDown} alt="стелочка вниз" />
            <DropDownMenu showDropDownMenu={showDropDownMenu}/>
        </div>
    )
}

const DropDownMenu = ({showDropDownMenu}) => {
    if (!showDropDownMenu) {
        return null
    }
    return (
    <div className={st.DropDownMenu}>
        <div className={st.DropDownArrow}></div>
        <button className={st.DropDownButton}>Profile</button>
        <button className={st.DropDownButton}>Log Out</button>
    </div>
   )
}

const Header = () => {
    return (
        <header className={st.Header}>
           <h1 className={st.H1}>Awesome Kanban Board</h1>
           <Avatar />
        </header>
    )
}

export default Header;