import Modal from "./Modal";

type RegisterProps = {
  onClose: () => void;
};

export default function Register({ onClose }: RegisterProps) {
  return (
    <Modal onClose={onClose}>
      <p>Register</p>
    </Modal>
  );
}
