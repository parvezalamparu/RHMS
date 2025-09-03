import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const usePreviousPage = () => {
    const navigate = useNavigate();
    return (
        useEffect(() => {
            const back =(event:any) => {
            if(event.key === "Escape"){
                navigate(-1);
            }
           window.addEventListener('keydown',back);
           
           return () => window.removeEventListener('keydown',back);
            
        }}, [])
    )
}

export default usePreviousPage