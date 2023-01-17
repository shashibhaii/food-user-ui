import React from "react";
import { Tabs, Tab } from "react-tabs-scrollable";
import "react-tabs-scrollable/dist/rts.css";
import "./menu-items.css";
import { Menu_response } from '../../../services/sampleData2';
import { useLocation } from "react-router-dom";

export default function MenuItems(props) {
    const location = useLocation();
    console.log(location.state.data, " useLocation Hook");
// console.log(Menu_response);
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeCategory, setActiveCategory] = React.useState(Menu_response?.response[0]);
  console.log(activeCategory);
  const onTabClick = (e, index) => {
    setActiveTab(index);
    console.log(index);
    setActiveCategory(Menu_response?.response[index]);
  };
  return (
    <div className="MenuList">
        <Tabs
        activeTab={activeTab}
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
}
