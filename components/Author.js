
import {Avatar,Divider} from 'antd'
import { QqOutlined, GithubOutlined, WechatOutlined } from '@ant-design/icons';
import css from '../styles/components/author.module.css'

const Author =()=>{

    return (
        <div className={css.authorDiv}>
            <div> <Avatar size={100} src="https://s2.loli.net/2023/04/13/FkIZn9RQyKOliHM.png"  /></div>
            <div className={css.authorIntroduction} >
                专注于WEB和移动前端开发。
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<QqOutlined />} className={css.account}  />
                <Avatar size={28} icon={<GithubOutlined />}  className={css.account} />
                <Avatar size={28} icon={<WechatOutlined />}  className={css.account} />
            </div>
        </div>
    )

}

export default Author