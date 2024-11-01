import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useAppSelector, useAppDispatch } from '../reduxHooks';
import { RootState, store } from "../store";
import { toast } from "react-toastify";
import JobInfo from "./JobInfo";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import moment from "moment";
import { deleteJob } from "../features/job/jobSlice";

export interface JobProps {
  _id: string;
  position: string;
  company: string;
  jobLocation: string;
  jobType: string;
  createdAt: string; 
  status: string;
}

const Job: React.FC<JobProps> = ({ _id, position, company, jobLocation, jobType, createdAt, status }) => {
  const date = moment(createdAt).format("MMM Do, YYYY");
  const dispatch=useAppDispatch();
  return (
    <Wrapper>
			<header>
				<div className='main-icon'>{company.charAt(0)}</div>
				<div className='info'>
					<h5>{position}</h5>
					<p>{company}</p>
				</div>
			</header>
			<div className='content'>
				<div className='content-center'>
					<JobInfo icon={<FaLocationArrow/>} text={jobLocation}/>
					<JobInfo icon={<FaCalendarAlt/>} text={date}/>
					<JobInfo icon={<FaBriefcase/>} text={jobType}/>
					<div className={`status ${status}`}>{status}</div>
				</div>
				<footer>
					<div className='actions'>
						<Link
							to='/add-job'
							className='btn edit-btn'
							onClick={() => {
								console.log("edit job");
							}}>
							Edit
						</Link>
						<button
							type='button'
							className='btn delete-btn'
							onClick={() => {
								dispatch(deleteJob(_id))
							}}>
							Delete
						</button>
					</div>
				</footer>
			</div>
		</Wrapper>
  );
}

export default Job;
