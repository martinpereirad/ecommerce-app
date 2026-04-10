"use client";

import type { FilterState } from "@/types";
import "./Filters.css";

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  categories: string[];
}

export default function Filters({
  filters,
  onFilterChange,
  categories,
}: FiltersProps) {
  return (
    <aside className="filters" data-testid="filters">
      <h2 className="filters__title">Filtros</h2>

      <div className="filters__group">
        <label className="filters__label" htmlFor="search">
          Buscar
        </label>
        <input
          id="search"
          type="text"
          className="filters__input"
          placeholder="Buscar productos..."
          value={filters.search}
          onChange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          data-testid="search-input"
        />
      </div>

      <div className="filters__group">
        <label className="filters__label" htmlFor="category">
          Categoría
        </label>
        <select
          id="category"
          className="filters__select"
          value={filters.category}
          onChange={(e) =>
            onFilterChange({ ...filters, category: e.target.value })
          }
          data-testid="category-select"
        >
          <option value="">Todas</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__group">
        <label className="filters__label" htmlFor="price-range">
          Precio máximo: ${filters.maxPrice.toFixed(0)}
        </label>
        <input
          id="price-range"
          type="range"
          className="filters__range"
          min={0}
          max={1300}
          step={10}
          value={filters.maxPrice}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              maxPrice: Number(e.target.value),
            })
          }
          data-testid="price-range"
        />
        <div className="filters__range-labels">
          <span>$0</span>
          <span>$1300</span>
        </div>
      </div>
    </aside>
  );
}
