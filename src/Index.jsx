import React from "react";
import MusollahForm from "./components/MusollahForm.jsx";
import MosqueForm from "./components/MosqueForm.jsx";
import OffCanvas from "./components/OffCanvas.jsx";

function Index(){
    return (
        <>
            <OffCanvas/>
            <MusollahForm/>
            <MosqueForm/>
        </>
    );
}

export default Index;