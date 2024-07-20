import { useEffect, useState } from "react"
import st from "./style.module.css"
//Я не знаю, как сделать динамически обновляющуюся data(
const ActiveTasks = ({data}) => {
    return (
        <div className={st.Task}> 
            <p>Active tasks: </p>
            {data.map(({name, title, id}) => {
                if (title === "backlog") {
                    return (
                        <p key={id}>{name}</p>
                    )
                } else {
                    return null
                }
            })}
        </div>
    )
}
const FinishedTasks = ({data}) => {
    return (
        <div className={st.Task}> 
            <p>Finished tasks: </p>
            {data.map(({name, title, id}) => {
                if (title === "finished") {
                    return (
                        <p key={id}>{name}</p>
                    )
                } else {
                    return null
                }
            })}
        </div>
    )
}
const Footer = () => {
    const [data, setData] = useState(JSON.parse(localStorage.getItem("titlelist")) || [])
    useEffect(() => {
        setData(data)
    }, [data])
    return (
        <div className={st.Footer}>
            <ActiveTasks data={data}/>
            <FinishedTasks data={data}/>
        </div>
    )
}
export default Footer;