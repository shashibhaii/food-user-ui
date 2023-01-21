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
    <div className="container mt-4">
        <h3 className="text-left ml-4">Categories</h3>
    <div className="row text-center mx-2">
    {
            this.state.categories.map((item,index) => {
              return (
                    <div className="col-5 m-2">
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
