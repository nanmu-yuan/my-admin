import {RouteProps} from 'react-router-dom'

export default interface IRoute extends RouteProps{
    name:string;
    title:string;
    path:string;
    icon:string;
    hiddenInMenu?:boolean;
    children?:IRoute[]
}