import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const usePreviousPage = () => {
    const navigate = useNavigate();
    return (
        useEffect(() => {
           window.addEventListener('keydown', (event) => {
            if(event.key === "Escape"){
                navigate(-1);
            }
           })
            
        }, [])
    )
}

export default usePreviousPage