import { Icon } from "@shared"

export const SmallCardOne = ({ iconName, text, className }) => {
    return <div className={`flex gap-1 bg-white-300 border border-gray-400 
    border-solid rounded-xl justify-center p-3 text-base leading-tight ${className}`}>
        <Icon name={iconName} size={14} ariaLabel={`${iconName} icon`} />

        {text}
    </div>
}

export const SmallCardTwo = ({ iconName, text, className }) => {
    return <div className={`flex gap-1 bg-blue-200 p-3 rounded-md mb-6 leading-tight justify-center ${className}`}>
        <Icon name={iconName} size={14} ariaLabel={`${iconName} icon`} />
        <p className='text-navy-blue text-base'>
            {text}
        </p>
    </div>
}