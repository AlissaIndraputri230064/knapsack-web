const Form = (props) => {
    const {children, labelName = "", id="", className = "" } = props;
    return(
        <form>
            <label htmlFor="{labelName}">{children}</label>
            <input 
                type="number" 
                id={id || labelName} 
                name = {labelName}
                className={`h-10 px-4 rounded-md bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
            />
        </form>
    );
};

export default Form;