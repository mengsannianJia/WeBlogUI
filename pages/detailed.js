import React,{useState} from 'react'
import Head from 'next/head'
import {Row, Col , Affix ,Breadcrumb  } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined} from '@ant-design/icons'
import 'markdown-navbar/dist/navbar.css'
import css from '../styles/page/detailed.module.css'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import axios from 'axios';
import { marked } from 'marked';
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import Tocify from '../components/tocify.tsx'
import servicePath from '@/config/apiURL'



const Detailed = (props) => {
  
  const tocify = new Tocify()

  const renderer = new marked.Renderer()


  // 添加锚点链接
  renderer.heading = function(text, level, raw) {
      // 将文本和等级添加到 anchor 中
      const anchor = tocify.add(text, level);
      // 生成锚链接
      return `<a id="${anchor}" href="#${anchor}" class="anchorFix"><h${level}>${text}</h${level}></a>\n`;
    };
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
  
// 获取文章内容
let html = marked(props.articleContent)
  
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className={css.breadDiv}>
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item><a href="/list">视频列表</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

            <div>
                <div className={css.detailedTitle}>{props.title}</div>

                <div className="list-icon center">
                    <span><CalendarOutlined />{props.releseTime}</span>
                    <span><FolderOutlined />{props.typeName}</span>
                    <span><FireOutlined />{props.fire}</span>
                </div>
                {/* MarkDown文档页面 */}
                <div className={css.detailedContent} dangerouslySetInnerHTML={{__html:html}}>
                    
                </div>
            </div>
          </div>
        </Col>
        {/* 右侧栏 用户信息等 */}
        <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            <Advert />
            <Affix offsetTop={8}>
                <div className={css.detailedNav}>
                    <div className={css.navTitle}>文章目录</div>
                      <div className={css.tocList}>
                        {/* 先判断再渲染 */}
                        {tocify && tocify.render()}
                      </div>
                </div>
            </Affix>
        </Col>
      </Row>
      <Footer/>
  </>
  )
}


Detailed.getInitialProps = async(content)=>{
  console.log(content.query.id)
  let id = content.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleById+id).then(
      (res)=>{
        console.log(res)
        resolve(res.data.data[0])
      }
    )
  })
  return await promise 
}

export default Detailed