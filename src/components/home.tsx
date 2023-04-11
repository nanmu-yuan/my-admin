import  style from "./home.less"
import React from 'react'
import {useEffect} from 'react'
import img from  '@/assets/images/logo.png'
const Home:React.FC =()=>{
    useEffect(()=>{
        console.log('123123')
    })
    return(
        <div id={style.box}>
            <img src={img} alt="" />
            {/* asdasdasdadasdadasdasdddddddddd */}
        </div>
    )
}
export default Home