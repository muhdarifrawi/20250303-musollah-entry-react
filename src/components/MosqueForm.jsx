import React from "react";

function MosqueForm(){

    return (
        <>
            <h1>Mosque Form</h1>
            <div class="mb-3">
                <label for="mosque-name-input" class="form-label">Mosque Name</label>
                <input type="text" class="form-control" id="mosque-name-input" placeholder="Darul Ghufran"/>
            </div>

        </>
    )
}

export default MosqueForm;