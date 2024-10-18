import Wrapper from "../assets/wrappers/Job";
import { useAppSelector, useAppDispatch } from '../reduxHooks';
import { RootState, store } from "../store";
import { toast } from "react-toastify";

interface JobProps {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  createAt: string; // You might want to use Date if you're handling date objects
  status: string;
}

const Job: React.FC<JobProps> = ({ _id, position, company, jobLocation, jobType, createAt, status }) => {
  return (
    <Wrapper>
      <div>
        
      </div>
    </Wrapper>
  );
}

export default Job;
