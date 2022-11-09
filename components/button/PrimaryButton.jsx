const PrimaryButton = ({ children, className, ...props }) => {
	return (
		<button
			className={`rounded-md bg-black px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:opacity-80 ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default PrimaryButton;
