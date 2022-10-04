import img from './error.gif'
import './ErrorMessage.scss'

const ErrorMessage = (props) => {
    return (
        <>
            <img alt="errorImg" className='error_gif' src={img} />
            <div className='text'>Sorry! But we can`t find weather data of the city {props.name}</div>
        </>
    )
}

export default ErrorMessage