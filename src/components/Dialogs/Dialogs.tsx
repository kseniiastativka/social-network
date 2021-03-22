import {NavLink} from 'react-router-dom'
import s from './Dialogs.module.css'

const DialogItem = (props: { name: string, id: number }) => {
    let path = '/dialogs/' + props.id

    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}> {props.name}
            </NavLink>
        </div>
    )
}

const Message = (props: { message: string }) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

const Dialogs = () => {
    let dialogs = [
        {id: 1, name: 'Zenya'},
        {id: 2, name: 'Ira'},
        {id: 3, name: 'Anna'},
        {id: 4, name: 'Sasha'}
    ]

    let messages = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Yo'},
        {id: 3, message: 'What\'s up?'},
    ]


    let dialogElements = dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>
    )
    let messageElements = messages.map(message => <Message message={message.message}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {messageElements}
            </div>
        </div>
    )
}

export default Dialogs
