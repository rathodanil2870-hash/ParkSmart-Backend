export default function MessageBanner({ message }) {
  if (!message) return null;

  return (
    <div className="message" role="status">
      {message}
    </div>
  );
}
