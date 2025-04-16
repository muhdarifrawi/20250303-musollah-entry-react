import React, { useState } from 'react';
import axios from 'axios';



const PushJsonToGitHub = ({ jsonData }) => {
    const pushToGitHub = async () => {
        try {
            const token = window.env?.GITHUB_TOKEN;
            console.log("GITHUB TOKEN", token);
            
            await axios.put(
                'https://api.github.com/repos/your-username/your-repo/contents/path/to/file.json',
                {
                    message: 'Update file via app',
                    content: btoa(JSON.stringify(jsonData)),
                    sha: 'your-latest-sha',
                },
                {
                    headers: {
                        Authorization: `Bearer YOUR_GITHUB_TOKEN`,
                        Accept: 'application/vnd.github+json',
                    },
                }
            );
        } catch (error) {
            console.error('Failed to push to GitHub:', error);
        }
    };

    // Optional effect or button
    return (
        <button onClick={pushToGitHub}>
            Push JSON to GitHub
        </button>
    );
};

export default PushJsonToGitHub;
