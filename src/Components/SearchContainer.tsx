import { FormRow, FormRowSelect } from "."; // assuming these are correctly typed components
import Wrapper from "../assets/wrappers/SearchContainer";
import { clearFilters, FiltersState, handleChange } from "../features/allJobs/allJobsSlice";
import { InitialStateType } from "../features/job/jobSlice";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { RootState } from "../store"; 


const SearchContainer = () => {
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useAppSelector((store: RootState) => store.alljobs);
  const { jobTypeOptions, statusOptions } = useAppSelector(
    (store: RootState) => store.job
  );

  const dispatch = useAppDispatch();

  // Handle search input change with the proper event type
  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // Assert that the name is a key of FiltersState
    const name = e.target.name as keyof FiltersState; // Explicitly narrow the type to keyof FiltersState
    const value = e.target.value;

    // Dispatch the change with the correct type
    dispatch(handleChange({ name, value }));
  };

  // Handle form submission with the correct event type
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearFilters())
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />
          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            type="submit"
            className="btn btn-block btn-danger"
            disabled={isLoading}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
