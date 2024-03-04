import Image from 'next/image';

const Button = (props) => {
  const { icon, label, type, onClick, className, disabled } = props;
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={className}
      type={type}
    >
      <div className="flex gap-2 justify-center items-center">
        {icon && (
          <Image
            src={icon}
            alt="..."
            width={20}
            height={20}
          />
        )}
        <p>{label}</p>
      </div>
    </button>
  );
};

export default Button;
