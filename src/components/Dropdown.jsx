import { useState } from 'react'


function DropDown() {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)

    const options = ["Option 1", "Option 2", "Option 3"]

    const toggle = () => setIsOpen(!isOpen)

    const handleOptionClick = (option) => {
        setSelectedOption(option)
        setIsOpen(false)
    }

    return (
        <div className='dropdown'>
            <button 
                className='dropdown-toggle'
                onClick={toggle}
            >BTN</button>
            
            
        
        {isOpen && (
            <ul className='dropdown-menu'>
                <div className='upper'>
                <button className='closeBtn'
                onClick={toggle}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="close-icon"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                    />
                </svg>
                
                </button>
                </div>
                
                {options.map((option, index) => (
                    <li 
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        className='dropdown-item'
                    >
                        {option}
                    </li>
                ))}
            </ul>
        )}
    </div>

    )
}


export default DropDown;

