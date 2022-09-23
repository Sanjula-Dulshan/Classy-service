import React, {useState,useEffect} from "react";
import axios from "axios";
import { useSelector} from "react-redux";
import { showSuccessMsg, showErrMsg } from "./utils/notification/Notification";
import "./CSS/profile.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import ConfirmBox from "react-dialog-confirm";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";


const initialState = {
    err: "",
    success: "",
  };


export default function AdminPage() {

  const auth = useSelector((state) => state.auth);

  const { user } = auth;
  const [data, setData] = useState(initialState);
  const {err, success } = data;
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();

  const[request,setRequest] = useState([]); 
    useEffect(()=>{
              
        axios.get("user/allusers").then((res)=>{
                setRequest(res.data.existingUser);
            }).catch((err)=>{
                alert(err.message);
             })          

    },[])
    
    const confirm = (id) => {
        setIsOpen(true);
        setId(id);
      };
      
      const handleClose = () => {
        setIsOpen(!isOpen);
      };
      
      const onDelete = (_id) => {
        try{axios.delete(`user/delete/${_id}`)
          .then(()=> {
            setIsOpen(false);
            window.location.href = "/admin";
          })
        }catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
      };

//search bar functions
const filterData = (users,searchkey) =>{

  const result= users.filter((Users) =>
  Users.email.toLowerCase().includes(searchkey) ||
  Users.email.includes(searchkey)||
  Users.name.toLowerCase().includes(searchkey) ||
  Users.name.includes(searchkey)
  )

  setRequest(result)
}


 function handleSearch(e) {
       
 const searchkey = e.currentTarget.value;

 axios.get("user/allusers").then((res)=>{

         if(res.data.success){
             
           filterData(res.data.existingUser,searchkey)

         }
 
 });

}
  return (
    <div>
      <Sidebar />
      <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
      </div>
      
      <h2 className="profhead3">Manage User Accounts.</h2>

      <div className="admin">
        <div className="adminT">
          <br></br>

          <div style={{ position: "absolute", zIndex: "704" }}>
          <ConfirmBox 
            options={{
              icon: "https://img.icons8.com/ios/50/000000/error--v1.png",
              text: "Are you sure you want to delete your account?",
              confirm: "yes",
              cancel: "no",
              btn: true,
            }}
            isOpen={isOpen}
            onClose={handleClose}
            onConfirm={() => {
              onDelete(id);
            }}
            onCancel={handleClose}
          />
        </div>
          
            {/* search bar */}
         <div className="container" >
                  <div className="row">
                   <div style={{display:"flex"}}>
                   <div className="searchicon" >
                     <FontAwesomeIcon icon={faMagnifyingGlass}/>
                   </div>
                    <div className="col-lg-4 mt-2 mb-2">
                        <input
                          className="form-control"
                          type="search"
                          placeholder="Search by name or email"
                          name="searchQuery"
                          onChange={handleSearch}>
                        </input>       
                  </div>
                  </div>
                </div>

            </div>
            <br/>
            <div className = "container">
            
           <table className="table" style={{backgroundColor:"rgb(247, 247, 247)"}}>

                <thead>
                        <tr>
                
                        <th className="tColumn" style={{fontWeight:"bold",fontSize:"22px"}} scope="col">Name</th>
                        <th className="tColumn" style={{fontWeight:"bold",fontSize:"22px"}} scope="col">Email</th>
                        
                        </tr>

                </thead>
            <tbody>

              {request.map((data,index)=>(
                        
                        <tr key={index}>
                          
                            <td> <b> {data.name} </b></td> 
                            <td><b> {data.email} </b> </td> 
                        
                            <td>
                            <button className="removebtn"
                            onClick={() => confirm(user._id)}
                             >Remove Account</button>  
                            </td>

                        </tr>
                        

                ))}
                
                
                </tbody> 
            </table>
      


          </div></div>
      <br></br>
    </div></div>
  )
}
