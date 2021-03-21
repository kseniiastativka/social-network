import {NavLink} from 'react-router-dom'
import s from './Dialogs.module.css'

const DialogItem = (props: { name: string, id: string }) => {
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
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name="Zenya" id='1'/>
                <DialogItem name="Ira" id='2'/>
                <DialogItem name="Anna" id='3'/>
                <DialogItem name="Sasha" id='4'/>

            </div>
            <div className={s.messages}>
                <Message message="Hi"/>
                <Message message="Yo"/>
                <Message message="What's up?"/>
            </div>
        </div>
    )
}

export default Dialogs
