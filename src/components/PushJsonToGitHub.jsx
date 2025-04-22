import React, { useState, useEffect } from "react";
import axios from "axios";

const PushJsonToGitHub = ({ pushData, pulledData }) => {
    const pushToGitHub = async (e) => {
        e.preventDefault();

        console.log("Data to GitHub:", pushData);

        const result = await window.github.pushJson(pushData[0], pushData[1]);
        if (result.success) {
            console.log("✅ Pushed to GitHub:", result.res);
        } else {
            console.error("❌ Failed to push:", result.error);
        }
    };

    const pullFromGitHub = async (e) => {
        e.preventDefault();

        const result = await github.pullJson();
        if (result.success) {
            console.log("✅ Pulled from GitHub:", result.res);
            pulledData(result.res);
        } else {
            console.error("❌ Failed to pull:", result.error);
        }
    };

    return (
        <>
            <div className="mb-3">
                <button
                    type="button"
                    className="btn btn-primary me-3"
                    onClick={pullFromGitHub}
                >
                    Pull JSON from GitHub
                </button>
                <button
                    type="button"
                    className="btn btn-warning me-3"
                    onClick={pushToGitHub}
                >
                    Push JSON to GitHub
                </button>
            </div>
        </>
    );
};

export default PushJsonToGitHub;
