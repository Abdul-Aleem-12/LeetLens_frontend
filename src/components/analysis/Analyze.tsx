import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Analyze = () => {
    let name: string = "abdul";
    const {username} = useParams();
    const [data, setData] = useState(null);

     useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/${username}`);
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        const error = err as any;
        if (error.response) {
          // Server responded with a status code out of 2xx range
          if (error.response.status === 400) {
            console.error("Bad Request: Username not found.");
          } else {
            console.error(`Server responded with status ${error.response.status}: ${error.response.data}`);
          }
        } else if (error.request) {
          // Request was made but no response received
          console.error("Could not connect to the server. Please check your internet connection or server status.");
        } else {
          // Something else happened
          console.error("An unexpected error occurred:", error.message);
        }
      }
    };

    fetchData();
  }, [username]);

    return (
        <div className="grid">
            <h1 className="text-white text-5xl" >Hello {name}</h1>
        </div>
    )
}
export default Analyze;