import { useEffect } from "react";
import Dashboard from "../Dashboard";

export default function ViewSubmitedRequestList (auth, companyrequests) {

    useEffect(()=>{
        console.log(companyrequests);
    })

    return (
        <Dashboard auth={auth}>123
            {/* {companyrequests.map((element)=>{
                return <>{element.name}</>;
            })} */}
        </Dashboard>
    );
};
