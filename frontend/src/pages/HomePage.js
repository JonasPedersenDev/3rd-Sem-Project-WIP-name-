import React, { useState } from 'react';

const HomePage = () => {
    //Code goes here for login page

    return (
        <div>
            <h1>HomePage</h1>
            <div class="row">
                <div class="col-sm-2 mb-4 mb-sm-0">
                    <div class="card">
                        <img src="/img/prototypeBoremaskine.jpg" class="card-img-top" alt="Card image"></img>
                        <div class="card-body">
                            <h5 class="card-title">Boremaskine</h5>
                            <p class="card-text">Evt tekst</p>
                            <a href="#" class="btn btn-primary">Book</a>
                        </div>
                    </div>
                </div>

                <div class="col-sm-2">
                    <div class="card">
                        <img src="/img/prototypeBoremaskine.jpg" class="card-img-top" alt="Card image"></img>
                        <div class="card-body">
                            <h5 class="card-title">Boremaskine</h5>
                            <p class="card-text">Evt tekst</p>
                            <a href="#" class="btn btn-primary">Book</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default HomePage;