const Button = (props) => {
    const {children, variant = "bg-blue"} = props;
    return(
        <button className = 
            {`h-10 px-6 semibold rounded-md ${variant} text-white`}
            type = "submit"
        >
            {children}
        </button>
    );
};