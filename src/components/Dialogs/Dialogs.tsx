import { NavLink } from 'react-router-dom'
import s from './Dialogs.module.css'

const Dialogs = ()=>{
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog +' '+s.active}><NavLink to='/dialogs/1'> Ira</NavLink></div>
                <div className={s.dialog}><NavLink to='/dialogs/2'>Sasha</NavLink></div>
                <div className={s.dialog}><NavLink to='/dialogs/3'>Zhenya</NavLink></div>
                <div className={s.dialog}><NavLink to='/dialogs/4'>Anna</NavLink></div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hi</div>
                <div className={s.message}>Yo</div>
                <div className={s.message}>What's up?</div>
            </div>
        </div>
    )
}

export default Dialogs
