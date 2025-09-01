import { Modal } from "antd";
import { Limit } from "../../types/Limit.ts"
import AddLimitForm from "../../components/UserDetailComponents/AddLimitForm/index.tsx";

const AddLimitModal = ({
    visible,
    onClose,
    onAdd,
}: {
    visible: boolean;
    onClose: () => void;
    onAdd: (newLimit: Limit) => void;
}) => {
    return (
        <Modal
            title="Add New Limit"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <AddLimitForm onAdd={(limit) => {
                onAdd(limit);
                onClose();
            }} />
        </Modal>
    );
};

export default AddLimitModal;
