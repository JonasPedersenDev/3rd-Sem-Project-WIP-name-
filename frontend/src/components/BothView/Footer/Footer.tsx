
function Footer() {
    return (
        <footer className="bg-dark text-white py-2" style={{ marginLeft: "250px", padding: "20px", flex: 1 }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Adresse:</h5>
                        <p>Damstræde</p>
                        <p>Afdeling 41</p>
                        <p>Himmerland Boligforening</p>
                        <p>9220 Aalborg Ø</p>
                    </div>
                      <div className="col-md-4">
                        <h5>Himmmerland Service - din varmemester:</h5>
                        <p>Anders Klagenberg</p>
                        <p>Fredrik Bajers Vej 154 B</p>
                    </div>
                      <div className="col-md-4">
                        <h5>Kontakt:</h5>
                        <p>Email: kanalkvarteret@abhim.dk</p>
                        <p>Phone: +45 98 15 87 22</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Kontortid:</h5>
                        <p>Mandag - fredag kl. 07:00 - 07:30 samt 11:00 - 12:00</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Følg Os:</h5>
                        <p><a href="https://www.facebook.com/HimmerlandBoligforening/" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="Besøg vores Facebook">Facebook</a></p>
                        <p><a href="https://www.youtube.com/user/abhimdk" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="Besøg vores YouTube">Youtube</a></p>
                        <p><a href="https://dk.linkedin.com/company/himmerland-boligforening" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="Besøg vores LinkedIn">LinkedIn</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
