import React from "react";
import { useState, useEffect } from "react";
import MusollahForm from "./components/MusollahForm.jsx";
import MosqueForm from "./components/MosqueForm.jsx";
import OffCanvas from "./components/OffCanvas.jsx";
import { Router, Route, Switch, useLocation } from "wouter";
import Homepage from "./components/Homepage.jsx";

function useFixedHashLocation() {
    const [location, setLocation] = useState(fixPath(window.location.hash));

    useEffect(() => {
        const handler = () => {
            console.log("Hash changed:", window.location.hash);
            setLocation(fixPath(window.location.hash));
        };
        window.addEventListener("hashchange", handler);
        return () => window.removeEventListener("hashchange", handler);
    }, []);

    function fixPath(hash) {
        // Ensure we correctly handle empty and root paths
        let fixedHash = hash.replace(/^#\/main_window/, "#").replace(/^#/, "");
        if (fixedHash === "") fixedHash = "/"; // Ensure root route works
        console.log("Fixed route:", fixedHash);
        return fixedHash;
    }

    function navigate(to) {
        console.log("Navigating to:", to);
        window.location.hash = to;
        setLocation(fixPath(to));
    }

    return [location, navigate];
}

function Index() {
    const [location, navigate] = useFixedHashLocation();;
    console.log("Wouter location:", location);
    return (
        <>
            <OffCanvas />
            <Router hook={useFixedHashLocation}>
                <Switch>
                    <Route path="/" component={Homepage} />
                    <Route path="/musollah-form" component={MusollahForm} />
                    <Route path="/mosque-form" component={MosqueForm} />
                </Switch>
            </Router>
        </>
    );
}

export default Index;