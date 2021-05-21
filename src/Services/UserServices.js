import GenericServices from "./GenericServices";
import jwt_decode from "jwt-decode";
class userServices extends GenericServices {
  isLoggedin = () => {
    try {
      return localStorage.getItem("token") ? true : false;
    } catch (error) {}
  };

  logout = () => {
    try {
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {}
  };

  componentDidMount() {
    this.isLoggedin();
    this.logout();
    this.getLoggedinfo();
  }

  getLoggedinfo = () => {
    try {
      let jwt = localStorage.getItem("token");
      console.log(jwt);
      var decode = jwt_decode(jwt);

      return decode;
    } catch (error) {
      console.log(error);
    }
  };
}

let UserServices = new userServices();
export default UserServices;
