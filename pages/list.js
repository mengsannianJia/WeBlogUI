
import React,{useState, useEffect} from 'react'
import Head from 'next/head'
import {Row, Col , List  ,Breadcrumb  } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons';
import css from '../styles/page/detailed.module.css'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import axios from 'axios'
import  servicePath  from '../config/apiURL'
import Link from 'next/link'

const ArticleList = (list) =>{

  const [ mylist , setMylist ] = useState(list.data);
  useEffect(()=>{
    setMylist(list.data)
   })

  return (
    <>
      <Head>
        <title>List</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className={css.breadDiv}>
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <List
                itemLayout="vertical"
                dataSource={mylist}
                renderItem={item => (
                  <List.Item>
                    <div className="list-title">
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      {item.title}
                    </Link>
                    </div>
                    <div className="list-icon">
                    <span><CalendarOutlined />{item.releaseTime}</span>
                    <span><FolderOutlined /> {item.typeName}</span>
                    <span><FireOutlined /> {item.viewCount}</span>
                    </div>
                    <div className="list-context">{item.introduce}</div>  
                  </List.Item>
                )}
              />  

            </div>
        </Col>

        <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer/>

   </>
  )

} 

ArticleList.getInitialProps = async(context)=>{
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById+id).then(
      (res)=>resolve(res.data)
    )
  })
  return await promise
}

export default ArticleList