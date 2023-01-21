import React , {useEffect} from "react";
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import "./menu-items.css";
import { useLocation } from "react-router-dom";
import { authorizedaxios } from '../../../axiosinit';

const MenuItems =  React.memo(props => {
    const location = useLocation();
    var [Menu_response,setMenu_response] = React.useState(null);
    var [activeTabIndex, setActiveTabIndex] = React.useState(0);
    var [activeCategory, setActiveCategory] = React.useState(Menu_response?.response[0]);
    // useEffect(() => {
    //     fetch('https://food-service.osc-fr1.scalingo.io/api/business/get-all-menu-category?businessId=2c91809a85b0f7360185b113723e000a',{
    //         method: 'GET',
    //         headers: new Headers({ 
    //             'Access-Control-Allow-Origin': '*',
    //             'Content-Type': 'application/json',
    //             'Accept':'application/json',    
    //             'x-busniess-id': '2c91809a85b0f7360185b113723e000a',
    //             Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiYWJhX2FkbWluIiwiZXhwIjoxNjc0MTY2MDE5LCJpYXQiOjE2NzQxNDgwMTl9.uYa1IsWuXLVtcsv78yGD5wu-ty7mh7g8Z-q3lX1KbMeD04Fwqx1f2lhm1buS3xO2sDrLQ91AjX5zYlov-GDTBA'
    //         }), 
    //     })
    //   .then(data => {
    //    console.log(data);
    //   });
    //     loadDataOnlyOnce();
    //   },[]);
    useEffect(()=>{
        authorizedaxios('').get(`/business/get-all-menu-details?businessId=${location.state?.businessId}`)
        .then((res)=>{
            if(res){
                // console.log("res",res)
                setMenu_response(res?.data);
                Menu_response=res?.data;
                loadDataOnlyOnce();
                }
        })
        .catch((err)=>{
            console.log(err)
        })
      },[])
    let loadDataOnlyOnce = () => {
        // console.log("loadDataOnlyOnce",Menu_response,location.state);
        for(let i = 0; i < Menu_response?.response.length;i++){
            if(Menu_response.response[i].categoryId === location.state?.data?.categoryId){
                setActiveCategory(Menu_response.response[i]);
                setActiveTabIndex(i);
                break;
            }
        }
    }
    let onTabClick = (e, index) => {
        setActiveTabIndex(index);
        setActiveCategory(Menu_response?.response[index]);
    };
    return (
        <div className="MenuList">
            <div className="tabs">
                <Tabs
                activeTab={activeTabIndex}
                onTabClick={onTabClick}
                hideNavBtnsOnMobile={false}
                >{
                Menu_response?.response?.map((item,index) => (
                    <Tab key={index}>{item?.category}</Tab>
                ))}
                </Tabs>
            </div>
            <div className="active-category px-4">
                <div className="row mb-4">
                    <div className="col">
                        <h3> {activeCategory?.category}</h3>
                    </div>
                </div>
                <div>{
                    activeCategory?.menuItems.map((_,key) => (
                        <div className="row py-3">
                            <div className="col-8 text-start">
                                <div > { _?.itemName.charAt(0).toUpperCase() + _?.itemName.slice(1).toLowerCase()}</div>
                                <div className="menu-desc"> {_?.itemDescription}</div>
                            </div>
                            <div className="col-4 text-end">
                                {_?.itemPrice}
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    );
})
export default MenuItems;