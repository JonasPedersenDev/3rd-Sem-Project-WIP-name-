import React, { useState } from "react";

function ResourceGrid() {

    // Just an example to set up the grid. Replace with actual data from the database.
    const ResourceCards = () => {
        const [resources] = useState(['Boremaskine', 'Sav', 'Hammer', 'Skruetrækker', 'Målebånd']);

        return (
            <div className="row">
                {resources.map((equipment, index) => (
                    <div className="col-sm-2 mb-4 mb-sm-0" key={index}>
                        <div className="card">
                            <img src={`/img/${equipment}.jpg`} className="card-img-top" alt={`${equipment} image`} />
                            <div className="card-body">
                                <h5 className="card-title">{equipment}</h5>
                                <p className="card-text">Evt tekst</p>
                                <a href="#" className="btn btn-primary">Book</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <ResourceCards />
        </div>
    );
}

export default ResourceGrid;
