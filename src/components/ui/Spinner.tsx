import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-container" data-testid="spinner">
      <div className="spinner" />
      <p className="spinner-text">Cargando productos...</p>
    </div>
  );
}
