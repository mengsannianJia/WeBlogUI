import '../styles/components/advert.module.css'
import {List} from 'antd'
 const Advert = ()=>{
    const imageSrc = [
        "http://blogimages.jspang.com/flutter_ad2.jpg",
        "http://blogimages.jspang.com/WechatIMG12.jpeg"
    ]
    return (
        <>
            <List 
            className='ad-list'
            // List标题
            // header={<div>福利</div>}
            // 子项布局
            itemLayout='vertical'
            // 数据
            dataSource={imageSrc}
            renderItem={item =>(
            // 将数据塞到item中
            <List.Item>
                <div><img src={item} width="100%" /></div>
            </List.Item>
            )}/>
        </>
    )
 }

 export default Advert