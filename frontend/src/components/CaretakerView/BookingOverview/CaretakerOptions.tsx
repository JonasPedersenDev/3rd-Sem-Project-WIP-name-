import React, { useState, useEffect } from "react";
import ApiService from "../../../utils/ApiService";
import { Button, Form } from "react-bootstrap";

const CaretakerOptions = () => {
  const [caretakers, setCaretakers] = useState<string[]>([]);
  const [newInitials, setNewInitials] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchCaretakerInitials = async () => {
      try {
        const initials = await ApiService.getAllCaretakerInitials();
        setCaretakers(initials);
      } catch (error) {
        console.error("Error fetching caretaker initials:", error);
      }
    };

    fetchCaretakerInitials();
  }, []);

  const handleEditInitials = async () => {
    if (!newInitials.trim()) {
      console.log("Please enter valid initials");
      return;
    }

    try {
      await ApiService.createCaretakerInitials({ initials: newInitials });
      setCaretakers((prev) => [...prev, newInitials]);
      setNewInitials("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating caretaker initials:", error);
    }
  };

  const handleDeleteInitials = async (initials: string) => {
    try {
      await ApiService.deleteCaretakerInitials(initials);
      setCaretakers((prev) => prev.filter((item) => item !== initials));
    } catch (error) {
      console.error("Error deleting caretaker initials:", error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        Indstillinger
      </button>

      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Indstillinger
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <h6>Medarbejdere</h6>
            <ul className="list-group" style={{ textAlign: "center" }}>
              {caretakers.length > 0 ? (
                caretakers.map((initial, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {initial}
                    {isEditing && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteInitials(initial)}
                      >
                        Slet
                      </Button>
                    )}
                  </li>
                ))
              ) : (
                <li className="list-group-item text-muted">
                  Indlæser medarbejdere...
                </li>
              )}
            </ul>
          </div>
          <div className="mt-3">
            {!isEditing && (
              <Button
                variant="primary"
                onClick={() => setIsEditing(true)}
                className="mt-3"
              >
                Rediger
              </Button>
            )}

            {isEditing && (
              <>
                <Form.Group>
                  <Form.Label>Tilføj medarbejder initialer</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Indtast initialer"
                    value={newInitials}
                    onChange={(e) => setNewInitials(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="outline-secondary"
                  onClick={handleEditInitials}
                  className="mt-3"
                >
                  Bekræft
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => setIsEditing(false)}
                  className="mt-3 ms-2"
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaretakerOptions;
