import React, { useState, useEffect } from 'react';
import axios from 'axios';



const PushJsonToGitHub = ({ jsonData }) => {
    const pushToGitHub = async (e) => {
        e.preventDefault();
        // try {
        //     const TOKEN = window.env?.GITHUB_TOKEN;
        //     const URL = window.env?.GITHUB_FILE_URL;
        //     console.log("GITHUB TOKEN", TOKEN);

        //     await axios.put(
        //         'https://api.github.com/repos/your-username/your-repo/contents/path/to/file.json',
        //         {
        //             message: 'Update file via app',
        //             content: btoa(JSON.stringify(jsonData)),
        //             sha: 'your-latest-sha',
        //         },
        //         {
        //             headers: {
        //                 Authorization: `Bearer YOUR_GITHUB_TOKEN`,
        //                 Accept: 'application/vnd.github+json',
        //             },
        //         }
        //     );
        // } catch (error) {
        //     console.error('Failed to push to GitHub:', error);
        // }

        const result = await window.github.pushJson(myJsonData);
        if (result.success) {
            console.log('✅ Pushed to GitHub:', result.res);
        } else {
            console.error('❌ Failed to push:', result.error);
        }
    };

    const pullFromGitHub = async (e) => {
        e.preventDefault();
        // try {
        //     const TOKEN = window.env?.GITHUB_TOKEN;
        //     const URL = window.env?.GITHUB_FILE_URL;
        //     console.log("GITHUB TOKEN", TOKEN);
        //     console.log("GITHUB URL", URL);

        //     await axios.get(
        //         URL,
        //         // {
        //         //     message: 'Update file via app',
        //         //     content: btoa(JSON.stringify(jsonData)),
        //         //     sha: 'your-latest-sha',
        //         // },
        //         {
        //             headers: {
        //                 Authorization: `Bearer ${TOKEN}`,
        //                 Accept: 'application/vnd.github+json',
        //             },
        //         }
        //     );
        // } catch (error) {
        //     console.error('Failed to pull from GitHub:', error);
        // }
        const result = await github.pullJson();
        if (result.success) {
            console.log('✅ Pulled from GitHub:', result.res);
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
