export default function LoginInput({
  label,
  type,
  placeholder,
  icon,
  rightIcon,
}) {
  return (
    <div className="login-input">

      <label className="login-label">
        {label}
      </label>

      <div className="login-input-wrapper">

        <div className="login-icon">
          {icon}
        </div>

        <input
          type={type}
          placeholder={placeholder}
          className="login-field"
        />

        {rightIcon && (
          <div className="login-right-icon">
            {rightIcon}
          </div>
        )}

      </div>

    </div>
  );
}