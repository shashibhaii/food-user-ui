import React from "react";
import axios from "axios";
import { Categories_response } from '../../../services/sampleData';



class CategoryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      tokenvalue: localStorage.getItem("tokenKey")
    };
  }
  async componentDidMount() {
    try {
    //   const response = await axios.get(
    //     "https://aggregate-dispatch.herokuapp.com/api/aggregate/users",
    //     {
    //       params: {
    //         aggregate_company_id: '41'
    //       },
    //       headers: {
    //          "x_auth_token": `${this.state.tokenvalue}`,
    //          "content-type": "application/json"
    //       }
    //     }
    //   );
      this.setState(
        {
          categories: Categories_response.response
        },
        () => {
          console.log("Response");
          }
      );
    } catch (error) {
      console.log("Error",error);
    }
}

  render(){
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
                            <div className="card-body">
                                <p className="card-text">{item?.category}</p>
                            </div>
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
