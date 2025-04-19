import React, { useState, useEffect } from 'react';
import axios from 'axios';



const PushJsonToGitHub = ({ jsonData, pulledData}) => {
    const pushToGitHub = async (e) => {
        e.preventDefault();

        const result = await window.github.pushJson(myJsonData);
        if (result.success) {
            console.log('✅ Pushed to GitHub:', result.res);
        } else {
            console.error('❌ Failed to push:', result.error);
        }
    };

    const pullFromGitHub = async (e) => {
        e.preventDefault();

        const result = await github.pullJson();
        if (result.success) {
            console.log('✅ Pulled from GitHub:', result.res);
            pulledData(result.res);
        } else {
            console.error('❌ Failed to pull:', result.error);
        }
    };

    // Optional effect or button
    return (
        <>
            <button onClick={pullFromGitHub}>
                Pull JSON from GitHub
            </button>
            <button onClick={pushToGitHub}>
                Push JSON to GitHub
            </button>
        </>
    );
};

export default PushJsonToGitHub;
