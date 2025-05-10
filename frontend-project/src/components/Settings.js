import React from 'react';

const Settings = ({ firstPlayer, handleFirstPlayerChange }) => {
    return (
        <div className="settings">
            <label>
                Choose who plays first:
                <select value={firstPlayer} onChange={handleFirstPlayerChange}>
                    <option value="X">X</option>
                    <option value="O">O</option>
                </select>
            </label>
        </div>
    );
};

export default Settings;
