import { useState, useEffect } from "react";
import { getFlagUrl } from "../utilities/countries.js";

const iconExists = async (countryName) => {

}

function FlagIcon({ countryName }) {

    const [flagSrc, setFlagSrc] = useState(`/images/Flags/${countryName}.png`)

    // Check if flag icon already exists, and if not, use the flag icon from utilities/countries.js
    useEffect(()=>{

    }, []) // only on mount

    return (
        <img src={flagSrc} alt={`Flag of ${countryName}`} className="flag" loading="lazy" />
    )
}

export default FlagIcon;