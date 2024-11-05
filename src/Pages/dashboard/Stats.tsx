import { useEffect } from "react";
import { useAppDispatch,useAppSelector } from "../../reduxHooks";
import { showStats } from "../../features/allJobs/allJobsSlice";
import { RootState } from "../../store";
import Loading from "../../Components/Loading";
import StatsContainer from "../../assets/wrappers/StatsContainer";
import ChartsContainer from "../../assets/wrappers/ChartsContainer";
const Stats = () => {
	const { isLoading, monthlyApplications } = useAppSelector(
		(store:RootState) => store.alljobs
	);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(showStats());
		// eslint-disable-next-line
	}, []);
	if (isLoading) {
		return <Loading center />;
	}
	return (
		<>
			<StatsContainer />
			{monthlyApplications.length > 0 && <ChartsContainer />}
		</>
	);
};

export default Stats;