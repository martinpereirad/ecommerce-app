import "./EmptyState.css";

interface EmptyStateProps {
  message?: string;
}

export default function EmptyState({
  message = "No se encontraron productos",
}: EmptyStateProps) {
  return (
    <div className="empty-state" data-testid="empty-state">
      <span className="empty-state__icon">🔍</span>
      <p className="empty-state__text">{message}</p>
      <p className="empty-state__hint">
        Intenta ajustar los filtros de búsqueda
      </p>
    </div>
  );
}
