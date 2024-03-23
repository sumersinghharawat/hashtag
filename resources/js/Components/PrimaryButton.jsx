export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `w-full primary-button ${
                    disabled && 'primary-button__disable'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
