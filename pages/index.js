import React,{useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {Row, Col , List} from 'antd'
import axios from 'axios';
import { CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons';
import css from '../styles/page/index.module.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '@/components/Advert'
import Footer from '@/components/Footer';
import servicePath from '@/config/apiURL'

import { marked } from 'marked';
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';


const Home = (list) => {
  
  const renderer = new marked.Renderer()

  marked.setOptions({
    renderer:renderer,
    // 启动类似github样式的markdown
    gfm:true,
    // 容错设置false -- 有容错    true -- 没有容错（严格执行）
    pendantic:false,
    // 是否忽略html标签
    sanitic:false,
    // GitHub样式
    tables:true,
    // github换行符
    breaks:true,
    // 列表样式
    smartLists:true,
    // 设置高亮
    highlight:function(code){
      return hljs.highlightAuto(code).value
    }
  })

  const [ mylist , setMylist ] = useState(list.data)

  return(
  <>
    <Head>
      <title>Home</title>
    </Head>
    <Header/>
    <Row className='comm-main' type='flex' justify='center'>
      <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
        <div>
          <List 
            // List标题
            header={<div className='list-title'>日志</div>}
            // 子项标题
            itemLayout='vertical'
            // 数据
            dataSource={mylist}
            renderItem={item =>(
              // 将数据塞到item中
              <List.Item>
                <div className='list-title'>
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      {item.title}
                    </Link>
                </div>
                <div className='list-icon'>
                  <span><CalendarOutlined />{item.releaseTime}</span>
                  <span><FolderOutlined /> {item.typeName}</span>
                  <span><FireOutlined /> {item.viewCount}</span>
                </div>
                <div className={css.listContext} dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
              </List.Item>
            )}
          />
        </div>
      </Col>
      <Col className='comm-box' xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author />
        <Advert />
      </Col>
    </Row>
    <Footer />
 </>
 )
}

export default Home

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) =>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
  return await promise
}