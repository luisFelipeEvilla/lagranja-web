import { Modal, Button } from 'flowbite-react';

export default ({ message, showModal, setShowModal }) => (
    <Modal
        show={showModal}
        size="md"
        popup={true}
        onClose={() => setShowModal(false)}
    >
        <Modal.Header />
        <Modal.Body>

            <div className="text-center">
                <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {message}
                </h3>
                <div className="flex justify-center gap-4">
                    <Button
                        color="success"
                        onClick={() => setShowModal(false)}
                    >
                        Ok
                    </Button>
                </div>
            </div>
        </Modal.Body>
    </Modal>
)
