import { Input,Button, Container } from "@material-ui/core";
import { useState } from "react";
import Axios from "axios";
import './style.css';
const Main=()=>{
    const [img,setimg]=useState(null);
    const [res,setres]=useState(null);
    const [loading,setloading]=useState(false);
    const handlesubmit=()=>{
        if(img==null)
        {
            setres("please upload the image");
            return;
        }
        //("https://ecg-classifier-api.herokuapp.com/predict")
        //"http://127.0.0.1:5000/predict"
        setloading(true);
        var body=new FormData();
        body.append("image",img);
        Axios({
          method:"post",
          url: "https://ecg-classifier-api.herokuapp.com/predict",
          data:body,
          headers: {
            'Content-Type': `multipart/form-data; boundary=${body._boundary}`,
        }
        }
        )
        .then(res=>{console.log(res.data);setres(res.data);setloading(false);})
        .catch(err=>{console.log(err)});
        
    }        
    return(
        <div className="main" 
        style={{width:"100%",height:"100%"}}
        >{
            loading?
            <div>
            <img src="https://monebo.com/wp-content/uploads/2019/08/output_6U72fa.gif" 
            style={{display:"block",
                    marginLeft:"auto",
                    marginRight:"auto",
                    marginTop:"2%",
                    marginBottom:"2%"
                    }}
            ></img>
            <h1 className="fetching"
            style={{    
                color:"red",
                display:"block",
                textAlign:"center",
                animation:"blink 1.8s linear infinite"
            }}
            >... fetching results </h1>
            </div>
            :
        <div>
            {img
            ?
            <img src={URL.createObjectURL(img)} width="200" height="200" 
            style={{display:"block",
                    marginLeft:"auto",
                    marginRight:"auto",
                    marginTop:"2%",
                    marginBottom:"2%"
                    }}></img>
            :
            <img src={"https://thumbs.gfycat.com/HardBarrenBluemorphobutterfly-size_restricted.gif"}
            style={{display:"block",
                    marginLeft:"auto",
                    marginRight:"auto",
                    marginTop:"2%",
                    marginBottom:"2%"
                    }}
            ></img>
            }
            
            <Input type="file" 
            style={{display:"block",marginLeft:"auto",marginRight:"auto",width:"19%"}}
            onChange={(e)=>{
                setimg(e.target.files[0]);                
            }}
            />
            <br/>
            <Button variant="contained" color="secondary"
            style={{display:"block",marginLeft:"auto",marginRight:"auto"}}
            onClick={()=>handlesubmit()}
            >submit</Button>
            {
                res?
                <h1 style={{textAlign:"center"}}>{res}</h1>
                :null
            }
           
        </div>
            }   
        </div>
    );
}
export default Main;