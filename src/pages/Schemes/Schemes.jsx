import { useState } from 'react'
import './Schemes.css'

function Schemes() {

    const [data, setData] = useState([
        {
            title: "Проект 1"
        },
        {
            title: "Проект 2"
        },
        {
            title: "Проект 3"
        },
        {
            title: "Проект 4"
        },
        {
            title: "Проект 5"
        },
        {
            title: "Проект 6"
        },
        {
            title: "Проект 7"
        }
    ])

    return (
        <div className="schemes">
            <div className="schemes__header">
                <div className="schemes__find">
                    <input className='schemes__input' type="text" placeholder='Найти проект' />
                </div>
                <div className="schemes__create">
                    <button className='create__btn'>Создать</button>
                </div>
            </div>
            <div className="listOfSchemes">
                {
                    data.length === 0
                        ?
                        <div className="emptyList">
                            У вас еще нет проектов, но вы всегда можете создать новый!
                        </div>
                        :
                        <div className="list">
                            {
                                data.map((value) =>
                                    <div className="myProject" key={value}>
                                        <img className='img__item' src="src\assets\template.JPG" alt="" />
                                        <div className="title">
                                            {value.title}
                                        </div>


                                    </div>

                                )
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Schemes