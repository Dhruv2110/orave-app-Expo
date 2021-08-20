import axios from "axios";

export default axios.create({
	 baseURL: "https://orave.herokuapp.com/api"
    //   baseURL: "http://192.168.29.156:8080/api"
    	//  baseURL: "http://192.168.1.85:8080/api"
});
