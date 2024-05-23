import React from "react";
import {Row, Col, Menu} from 'antd'
import * as Icons from '@ant-design/icons';
import header from '../styles/components/Header.module.css'
import { useEffect, useState } from 'react';
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from "@/config/apiURL";
// xs: <576px响应式栅格。
// sm：≥576px响应式栅格.
// md: ≥768px响应式栅格.
// lg: ≥992px响应式栅格.
// xl: ≥1200px响应式栅格.
// xxl: ≥1600px响应式栅格.

const Header = () => {
    const motivationalSentence = [
        "活到老，学到老。",
        "莫等闲，白了少年头，空悲切。",
        "天生我才必有用，千金散尽还复来。",
        "身正不怕影子斜，心正不怕神明惩。",
        "成功在于不断的积累和学习，失败在于不肯认真思考。",
        "学而不思则罔，思而不学则殆。",
        "天行健，君子以自强不息。",
        "学无止境，努力向上。",
        "立志欲坚不欲锐，成功在久不在速。",
        "拼搏过后才会有收获，坚持不懈才能成功。",
        "学海无涯，回头是岸。",
        "好学近乎知，力行近乎仁，知耻近乎勇。",
        "读书破万卷，下笔如有神。",
        "知之者不如好之者，好之者不如乐之者。",
        "书山有路勤为径，学海无涯苦作舟。",
        "非淡泊无以明志，非宁静无以致远。",
        "三人行，必有我师焉。",
        "己所不欲，勿施于人。",
        "知己知彼，百战不殆。",
        "知识就像是无穷无尽的宝藏，需要勤奋努力才能开启它的大门。",
        "知识是人生中最宝贵的财富。",
        "读书如饮水，深思如愁风。",
        "读书是磨刀石，为自己的前途打磨利器。",
        "勤能补拙，笃志力行。",
        "读书不仅能够拓宽眼界，还能够丰富人生阅历。",
        "无愧于天，无愧于地，无愧于自己。",
        "吃得苦中苦，方为人上人。",
        "静以修身，俭以养德，非淡泊无以明志，非宁静无以致远。",
        "成功需要不断的学习和探索。",
        "知识的力量是无穷无尽的，勤奋的学习才能够收获更多。",
        "活到老，学到老，永远不要停止学习。",
        "每天学习一点点，成功的路就离你越来越近。",
        "愚昧是黑暗的，知识是光明的。"]

    const [navArray, setNavArray] = useState([])
    // 在页面初始化时只会调用一次
    useEffect(()=>{
        // 这里不能直接用一步方法 await axios() 因为
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        // 调用(手动异步)
        fetchData()
    },[])

    // 点击跳转方法
    const handleClick = (e)=>{
        if(e.key==0){
            Router.push('/')
        }else{
            Router.push('/list?id='+e.key)
        }
    }
    return(
        <>
            <div className={header.header}>
                <Row type="flex" justify="center">
                    <Col  xs={24} sm={24} md={10} lg={13} xl={11}>
                        <span className={header.headerLogo}><Link href={{pathname:'/'}}>WeBlog</Link></span>
                        <div className={header.headerTxt}>{motivationalSentence[(new Date).getHours()]}</div>
                    </Col>
                    <Col className={header.antMeu} xs={0} sm={0} md={14} lg={10} xl={7}>
                        {/* 菜单（导航）栏 */}
                        {/* <Menu className={header.antMenuItem} mode="horizontal" items=
                        { 
                            setTimeout(()=>{
                                [{ key: 0, onClick: {handleClick}, icon: <HomeOutlined />, label: "首页" }].push(navArray.map((item)=>{
                                         return({key: item.id, onClick: {handleClick},icon: item.icon, label: item.typeName})
                                     }))
                            },2000)
                        }
                        /> */}
                        <Menu
                            mode="horizontal"
                            onClick={handleClick}
                            items={
                                    ...navArray.map((item) => ({
                                    key: item.id,
                                    icon: React.createElement(Icons[item.icon]),
                                    label: item.typeName
                                  }))
                            }/>
                    </Col>
                </Row>
            </div>
        </>  
    )
}

export default Header
