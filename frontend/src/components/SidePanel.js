import React, { useState } from "react";

function SidePanel() {

    return (
        <div className="sidebar" style={{ display: 'flex' }}>
            <ul className="sidebar-list">
                <li className="sidebar-item">Hjem</li>
                <li className="sidebar-item">Evt andre1</li>
                <li className="sidebar-item">Evt andre2</li>

                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label class="form-check-label" for="flexSwitchCheckDefault">Vis kun tilgængelige</label>
                </div>

                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label class="form-check-label" for="flexSwitchCheckDefault">Andre options1</label>
                </div>

                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label class="form-check-label" for="flexSwitchCheckDefault">Andre options2</label>
                </div>

                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label class="form-check-label" for="flexSwitchCheckDefault">Andre options3</label>
                </div>

            </ul>
        </div>
    );
};

export default SidePanel;