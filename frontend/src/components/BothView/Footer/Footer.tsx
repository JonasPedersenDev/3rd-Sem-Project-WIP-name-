
function Footer() {
    return (
        <footer className="bg-dark text-white py-2">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Kontakt os</h5>
                        <p>Email: info@email.com</p>
                        <p>Phone: +4500000000</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Telefontider</h5>
                        <p>Mandag - onsdag kl. 9:00 - 15:00</p>
                        <p>Torsdag kl. 9:00 - 17:00</p>
                        <p>Fredag kl. 9:00 - 13:00</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Vores kontoradresse</h5>
                        <p>Himmerland Boligforening</p>
                        <p>Rendsburggade 22</p>
                        <p>9000 Aalborg</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Åbningstider</h5>
                        <p>Mandag - onsdag kl. 10:00 - 14:00</p>
                        <p>Torsdag kl. 10:00 - 17:00</p>
                        <p>Fredag kl. 10:00 - 13:00</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Følg Os</h5>
                        <a href="https://www.facebook.com/HimmerlandBoligforening/" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="Besøg vores Facebook">Facebook</a>
                        <a href="https://www.youtube.com/user/abhimdk" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="Besøg vores YouTube">Youtube</a>
                        <a href="https://dk.linkedin.com/company/himmerland-boligforening" target="_blank" rel="noopener noreferrer" className="text-light" aria-label="Besøg vores LinkedIn">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;