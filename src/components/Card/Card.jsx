import "./Card.css";

export default function Card({ title, subtitle, meta, children }) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      {subtitle && (
        <div className="card-subtitle">{subtitle}</div>
      )}
      {children}
      {meta && (
        <div className="card-meta">{meta}</div>
      )}
    </div>
  );
} 