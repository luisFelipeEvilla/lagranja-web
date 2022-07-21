import { Spinner } from 'flowbite-react'

const SpinnerComponent = () => {
    return (
        <div className="absolute inset-x-1/2  inset-y-1/3 w-fit">
            <div
                className="inline-blocck w-24 h-24 border-4 border-blue-400 border-dotted rounded-full animate-spin">
            </div>
                Cargando...
        </div>
    )
}

export default SpinnerComponent;