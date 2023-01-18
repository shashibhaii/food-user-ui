import React , {useEffect} from "react";
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import "./menu-items.css";
import { Menu_response } from '../../../services/sampleData2';
import { useLocation } from "react-router-dom";

const MenuItems =  React.memo(props => {
    const location = useLocation();
    var [activeTabIndex, setActiveTabIndex] = React.useState(0);
    var [activeCategory, setActiveCategory] = React.useState(Menu_response?.response[0]);
    useEffect(() => {
        loadDataOnlyOnce();
      },[]);
    let loadDataOnlyOnce = () => {
    for(let i = 0; i < Menu_response?.response.length;i++){
        if(Menu_response.response[i].categoryId === location.state?.data?.id){
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
            <Tabs
            activeTab={activeTabIndex}
            onTabClick={onTabClick}
            hideNavBtnsOnMobile={false}
            >{
            Menu_response?.response?.map((item,index) => (
                <Tab key={index}>{item?.category}</Tab>
            ))}
            </Tabs>
            <div className="active-category px-4">
                <div className="row mb-4">
                    <div className="col">
                        <h3> {activeCategory?.category}</h3>
                    </div>
                </div>
                <div>{
                    activeCategory?.menuItems.map((_,key) => (
                        <div className="row py-3">
                            <div className="col-6 text-start">
                                <div> {_?.itemName}</div>
                                <div> {_?.itemDescription}</div>
                            </div>
                            <div className="col-6 text-end">
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