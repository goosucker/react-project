import { Link, Route, Routes } from "react-router-dom";
import st from "./style.module.css";
import { useEffect, useState } from "react";
const Main = () => {
    const [showInput, setInput] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [data, setData] = useState(JSON.parse(localStorage.getItem("titlelist")) || [])
    const [checkBacklogList, setBacklogList] = useState(false)
    const [checkReadyList, setReadyList] = useState(false)
    const [checkInProgressList, setInProgressList] = useState(false)
    localStorage.setItem("titlelist", JSON.stringify(data))

    const DetailedTitle = ({name, description, id}) => {
        const [showDescriptionInput, setDescriptionInput] = useState(false)
        const [descriptionValue, setDescriptionValue] = useState(description)

        const handleChange = (e) => {
            setDescriptionValue(e.target.value)
        }

        const detailedButtonClick = () => {
            setDescriptionInput(false)
            const newData = [...data]
            newData[id - 1].description = descriptionValue
            setData(newData)
        }
        const DescriptionInput = () => {
            if (!showDescriptionInput) {
                return null
            }
            return (
                <div className={st.DetailedInputBox}>
                    <input autoFocus className={st.DetailedInput} type="text" value={descriptionValue} onChange={handleChange}></input>
                    <button className={st.DetailedInputButton} onClick={detailedButtonClick}>Submit</button>
                </div>
            )
        }
        const detailedTitleTextClick = () => {
            if (!showDescriptionInput) {
                setDescriptionInput(true)
            } else {
                setDescriptionInput(false)
            }
        }
        return (
            <div className={st.DetailedTitle}>
                <div className={st.DetailedTitleHeadBox}>
                    <h2 className={st.DetailedTitleHead}>{name}</h2>
                    <Link to="/">
                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="1.35355" y1="0.646447" x2="24.3536" y2="23.6464" stroke="black"/>
                        <line y1="-0.5" x2="32.5269" y2="-0.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 24 1)" stroke="black"/>
                        </svg>
                    </Link>
                </div>
                <DescriptionInput />
                <p className={st.DetailedTitleText} onClick={detailedTitleTextClick}>{description}</p>
            </div>
        )
    }

    const Title = ({titleId}) => {
        return(
        <div className={st.TitleBoxFirst}>
            {data.map(({title, id, name, description}) => {
            if (title === "backlog" & titleId === 1) {
                return (
                    <Routes>
                        <Route path="/" element={<Link to={`/title/${id}`} className={st.Link}><h3 className={st.Title} key={id} id={id}>{name}</h3></Link>}></Route>
                        <Route path={`/title/${id}`} element={<DetailedTitle name={name} description={description} id={id}/>}></Route>
                    </Routes>
                )
            } if (title === "ready" & titleId === 2) {
                return (
                    <Routes>
                        <Route path="/" element={<Link to={`/title/${id}`} className={st.Link}><h3 className={st.Title} key={id} id={id}>{name}</h3></Link>}></Route>
                        <Route path={`/title/${id}`} element={<DetailedTitle name={name} description={description} id={id}/>}></Route>
                    </Routes>
                )
            } if (title === "in-progress" & titleId === 3) {
                return (
                    <Routes>
                        <Route path="/" element={<Link to={`/title/${id}`} className={st.Link}><h3 className={st.Title} key={id} id={id}>{name}</h3></Link>}></Route>
                        <Route path={`/title/${id}`} element={<DetailedTitle name={name} description={description} id={id}/>}></Route>
                    </Routes>
                )
            } if (title === "finished" & titleId === 4) {
                return (
                    <Routes>
                        <Route path="/" element={<Link to={`/title/${id}`} className={st.Link}><h3 className={st.Title} key={id} id={id}>{name}</h3></Link>}></Route>
                        <Route path={`/title/${id}`} element={<DetailedTitle name={name} description={description} id={id}/>}></Route>
                    </Routes>
                )
            } else {
                return null
            }
        })}
        </div>)
    }

    useEffect(() => {data.map(({title}) => {
        if (title === "backlog") {
            setBacklogList(true)
        } 
        if (title === "ready") {
            setReadyList(true)
        }
        if (title === "in-progress") {
            setInProgressList(true)
        }
        return null
    })}, [data])

    const AddButtonBacklog = () => {
        const [buttonTextStyle, setButtonTextStyle] = useState(st.AddButtonText)
        const [buttonText, setButtonText] = useState("+ Add card")
        const [buttonStyle, setButtonStyle] = useState(st.AddButton)
        const addInputClick = () => {
            if (!showInput) {
                setInput(true)
                setButtonText("Submit")
                setButtonStyle(st.SubmitButton)
                setButtonTextStyle(st.SubmitButtonText)
            } else {
                if (inputValue === "") {
                    setInput(false)
                    setButtonText("+ Add card")
                    setButtonStyle(st.AddButton)
                    setButtonTextStyle(st.AddButtonText)
                } else {
                    setData(current => [...current, 
                        {
                            title: "backlog",
                            id: data.length + 1,
                            name: `${inputValue}`,
                            description: "This task has no description"
                        }])
                    setInput(false)
                    setButtonText("+ Add card")
                    setButtonStyle(st.AddButton)
                    setButtonTextStyle(st.AddButtonText)
                    setInputValue('');
                }
            }
        }
        return (
            <button className={buttonStyle} onClick={addInputClick}>
                <span className={buttonTextStyle}>{buttonText}</span>
            </button>
        )
    }

    const AddButtonReady = () => {
        const [showSelectionMenuReady, setSelectionMenuReady] = useState(false)
        const addButtonReadyClick = () => {
            if (!showSelectionMenuReady & checkBacklogList) {
                setSelectionMenuReady(true)
            } if (showSelectionMenuReady & checkBacklogList) {
                setSelectionMenuReady(false)
            }
        }

        const SelectionMenuReady = () => {
            if (!showSelectionMenuReady) {
                return null
            } else {
                const toggleTitleReady = (index) => {
                    data.map(({title}) => {
                        if (!(title === "backlog")) {
                            setBacklogList(false)
                        } else {
                            const newData = [...data]
                            newData[index - 1].title = "ready"
                            setData(newData)
                            setSelectionMenuReady(false)
                        }
                        return null
                    })
                }
                return (
                    <div className={st.SelectionMenu}>
                        <div className={st.SelectionMenuOpener} onClick={addButtonReadyClick}>
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 0.5L11 13L19 0.5" stroke="black"/>
                            </svg>
                        </div>
                        {data.map(({title, id, name}) => {
                            if (title === "backlog") {
                                return (
                                    <h3 className={st.SelectionTitle} id={id} key={id} onClick={() => {toggleTitleReady(id)}}>{name}</h3>
                                )
                            } else return null
                        })}
                    </div>
                )
            }
        }
        return (
            <div>
                <SelectionMenuReady />
                <button className={`${st.AddButton} ${checkBacklogList ? '' : st.AddButtonDesable}`} onClick={addButtonReadyClick}><span className={st.AddButtonText}>+ Add card</span></button>
            </div>
        )
    }

    const AddButtonInProgress = () => {
        const [showSelectionMenuInProgress, setSelectionMenuInProgress] = useState(false)
        const addButtonInProgressClick = () => {
            if (!showSelectionMenuInProgress & checkReadyList) {
                setSelectionMenuInProgress(true)
            } if (showSelectionMenuInProgress & checkReadyList) {
                setSelectionMenuInProgress(false)
            }
        }

        const SelectionMenuInProgress = () => {
            if (!showSelectionMenuInProgress) {
                return null
            } else {
                const toggleTitleInProgress = (index) => {
                    data.map(({title}) => {
                        if (!(title === "ready")) {
                            setReadyList(false)
                        } else {
                            const newData = [...data]
                            newData[index - 1].title = "in-progress"
                            setData(newData)
                            setSelectionMenuInProgress(false)
                        }
                        return null
                    })
                }
                return (
                    <div className={st.SelectionMenu}>
                        <div className={st.SelectionMenuOpener} onClick={addButtonInProgressClick}>
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 0.5L11 13L19 0.5" stroke="black"/>
                            </svg>
                        </div>
                        {data.map(({title, id, name}) => {
                            if (title === "ready") {
                                return (
                                    <h3 className={st.SelectionTitle} id={id} key={id} onClick={() => {toggleTitleInProgress(id)}}>{name}</h3>
                                )
                            } else return null
                        })}
                    </div>
                )
            }
        }
        return (
            <div>
                <SelectionMenuInProgress />
                <button className={`${st.AddButton} ${checkReadyList ? '' : st.AddButtonDesable}`} onClick={addButtonInProgressClick}><span className={st.AddButtonText}>+ Add card</span></button>
            </div>
        )
    }

    const AddButtonFinished = () => {
        const [showSelectionMenuFinished, setSelectionMenuFinished] = useState(false)
        const addButtonFinishedClick = () => {
            if (!showSelectionMenuFinished & checkInProgressList) {
                setSelectionMenuFinished(true)
            } if (showSelectionMenuFinished & checkInProgressList) {
                setSelectionMenuFinished(false)
            }
        }

        const SelectionMenuFinished = () => {
            if (!showSelectionMenuFinished) {
                return null
            } else {
                const toggleTitleFinished = (index) => {
                    data.map(({title}) => {
                        if (!(title === "in-progress")) {
                            setInProgressList(false)
                        } else {
                            const newData = [...data]
                            newData[index - 1].title = "finished"
                            setData(newData)
                            setSelectionMenuFinished(false)
                        }
                        return null
                    })
                }
                return (
                    <div className={st.SelectionMenu}>
                        <div className={st.SelectionMenuOpener} onClick={addButtonFinishedClick}>
                            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 0.5L11 13L19 0.5" stroke="black"/>
                            </svg>
                        </div>
                        {data.map(({title, id, name}) => {
                            if (title === "in-progress") {
                                return (
                                    <h3 className={st.SelectionTitle} id={id} key={id} onClick={() => {toggleTitleFinished(id)}}>{name}</h3>
                                )
                            } else return null
                        })}
                    </div>
                )
            }
        }
        return (
            <div>
                <SelectionMenuFinished />
                <button className={`${st.AddButton} ${checkInProgressList ? '' : st.AddButtonDesable}`} onClick={addButtonFinishedClick}><span className={st.AddButtonText}>+ Add card</span></button>
            </div>
        )
    }

    const Input = ({showInput}) => {
        const handleChange = (event) => {
            setInputValue(event.target.value)
        }
        if (!showInput) {
            return null
        }
        return (
            <input autoFocus className={st.Input} type="text" value={inputValue} placeholder="Введите заголовок" onChange={handleChange}></input>
        )
    }

    return (
        <main className={st.Main}>
            <div className={st.MainBlock}>
                <h2 className={st.BlockName}>Backlog</h2>
                <div className={st.TitleBox}>
                    <Title titleId={1}/>
                    <Input showInput={showInput}/>
                </div>
                <AddButtonBacklog />
            </div>
            <div className={st.MainBlock}>
                <h2 className={st.BlockName}>Ready</h2>
                <Title titleId={2} />
                <AddButtonReady />
            </div>
            <div className={st.MainBlock}>
                <h2 className={st.BlockName}>In Progress</h2>
                <Title titleId={3} />
                <AddButtonInProgress />
            </div>
            <div className={st.MainBlock}>
                <h2 className={st.BlockName}>Finished</h2>
                <Title titleId={4} />
                <AddButtonFinished />
            </div>
        </main>
    )
}

export default Main