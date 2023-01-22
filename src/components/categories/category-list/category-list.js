import React from "react";
import axios from "axios";
import './category-list.css';
import { Link } from 'react-router-dom';


class CategoryList extends React.Component {

  constructor() {
    super();
    this.state = {
      categories: [],
      searchParams:null,
      businessId:null
    };
  }
  openMenuList(item) {
    // console.log(item);
  }
  async componentDidMount() {
    try {
      const response = await axios.get(
        `https://food-service.osc-fr1.scalingo.io/api/business/get-all-menu-details?businessId=${this.state.businessId}`,
        {
          headers: {
             "x-business-id": this.state.businessId,
          }
        }
      );
      this.setState(
        {
          categories: response?.data.response
        },
        () => {
          // console.log("Response");
          }
      );
    } catch (error) {
      console.log("Error",error);
    }
  }

  render(){
    this.state.businessId = new URLSearchParams(window.location.search)?.get("businessId");
  return (
    <React.Fragment>
    <div className="container mt-2 p-0">
        <div className="row company-info">
          <div className="col-1 pl-2 company-logo">
            <img className="img-fluid" src="https://i.ibb.co/jr4h1LL/not-found.jpg" alt="not-found" border="0"></img>
          </div>
          <div className="col-11 pb-2 company-name">
            <div className="table-info">You are sitting at</div>
            <div className="seller-name">Take n Test - Belur</div>
          </div>
        </div>
        <h3 className="text-right ml-4 welcome-text mx-2">What would you like to order ?</h3>
        <div className="row text-center mx-2">
        {
                this.state.categories.map((item,index) => {
                  return (
                        <div className="col-6 my-2 p-0 mb-2">
                            <div className="card">
                              <Link to="/menu-items" state={{ data: item,businessId:this.state.businessId }} className="link">
                                <div className="card-body" onClick={() => this.openMenuList(item)}>
                                      <p className="card-text">{item?.category}</p>
                                  </div>
                              </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
    </React.Fragment>
  );
}
};

export default CategoryList;
