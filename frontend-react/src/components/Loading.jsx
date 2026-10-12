export default function Loading({ message = 'Loading parking data...' }) {
  return (
    <p className="loading" role="status">
      {message}
    </p>
  );
}
