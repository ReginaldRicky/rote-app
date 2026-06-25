import { Link } from "react-router-dom";

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  children,
}) {
  return (
    <section className="page-header">
      <div className="page-header-left">
        <h1 className="page-title">{title}</h1>

        {subtitle && (
          <p className="page-subtitle">{subtitle}</p>
        )}

        {breadcrumbs.length > 0 && (
          <div className="page-breadcrumb">
            {breadcrumbs.map((item, index) => (
              <span key={item.label}>
                {item.to ? (
                  <Link to={item.to} className="page-breadcrumb-link">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}

                {index < breadcrumbs.length - 1 && (
                  <span className="page-breadcrumb-separator"> / </span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>

      {children && (
        <div className="page-header-action">
          {children}
        </div>
      )}
    </section>
  );
}