import React from 'react'

const TextInput = ({ label, id, name, type = 'text', className, placeholder, ...etc }) => {
    return (
        <div>
            <div>
                <label for={id} class="block text-gray-800 font-medium text-sm">{label}</label>
                <div class="mt-0.5">
                    <input
                        placeholder={placeholder}
                        id={id}
                        type={type}
                        name={name}
                        spellCheck='false'
                        className={`block w-full rounded-md p-2 border-[1.5px] border-gray-300 focus:border-primary focus:border-[1.5px] focus:ring-0 ${className}`}
                        {...etc}
                    />
                </div>
            </div>
        </div>
    )
}

export default TextInput