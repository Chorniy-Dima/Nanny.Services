import Modal from "./Modal";

type LoginProps = {
  onClose: () => void;
};

export default function Login({ onClose }: LoginProps) {
  return (
    <Modal onClose={onClose}>
      <p>Login</p>
    </Modal>
  );
}
