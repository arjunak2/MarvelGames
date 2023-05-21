import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const LoginModal = forwardRef((props, ref) => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const toggle = () => setShow(!show);
    useImperativeHandle(ref, () => ({
        handleClose,
        handleShow,
        toggle,
    }));

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop={"static"} centered>
                <Modal.Header>
                    <Modal.Title>Welcome!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Enter you info 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default LoginModal;
