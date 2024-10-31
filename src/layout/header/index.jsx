import React, { useState } from "react";
import logo from "../../assets/images/logo.svg";
import "./header.scss";
export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const links = [
        { name: "Home", href: "#" },
        { name: "About", href: "#" },
        { name: "Services", href: "#" },
        { name: "Contact", href: "#" },
    ];

    return (
        <header>
            <div className="container">
            <h1>
                <img src={logo} alt="" />
            </h1>


                {/* <Slider />
                <Button /> */}

            </div>

            {/* <div>
                <Icon name="beer" size={20} color="green" ariaLabel="Coffee icon" />
                <Icon name="telecaller" size={28} color="brown" ariaLabel="Coffee icon" />
                <Icon name="close" size={20} color="red" ariaLabel="Coffee icon" />
                <Icon name="s" size={20} color="blue" ariaLabel="Coffee icon" />
            </div> */}

            {/* <Greeting name={"ankit"} /> */}
        </header>
    );
};


export default Header
