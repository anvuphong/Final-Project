import {Col, Modal, Row} from "react-bootstrap";
import "./LogoutModal.css"
import {useContext} from "react";
import AuthContext from "../../../contexts/AuthContext";

const LogoutModal = props => {
    const ctx = useContext(AuthContext);

    const handleSubmit = () => {
        ctx.onLogout();
    }

    return (
        <>
            <Modal show={props.show} className="logout-modal">
                <Modal.Header className="logout-modal__header">
                    <Modal.Title>
                        <span className="text-danger bold">Are you sure?</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="logout-modal__body">
                    <span>Do you want to log out?</span>
                </Modal.Body>
                <Modal.Footer className="logout-modal__footer">
                    <button className="btn btn-danger" onClick={handleSubmit}>
                        Log out
                    </button>
                    <button className="btn btn-outline-secondary px-3 ms-4" onClick={props.handleClose}>
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LogoutModal;