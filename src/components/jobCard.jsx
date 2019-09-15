import React, { Component } from 'react'; 
import PaginationElement from './common/Pagination'
import { paginate } from '../utils/paginate';
import Card from './common/card';
import Select from './common/select';
import filter from '../utils/jobsFilter';
import _ from 'lodash';
import Axios from 'axios';

class JobCard extends Component {
    state = {
        data: '',
        pageSize: 10,
        currentPage: 1,
        searchQuery: {
            skills: '',
            location: '',
            experience: ''
        },
        dataRecieved: false
    }
    componentDidMount() {
        Axios.get('https://nut-case.s3.amazonaws.com/jobs.json')
        .then((res) => {
            this.filter = new filter(res.data.data);
            this.filter.init();
            this.setState({data: this.filter.getAllJobs(), dataRecieved: true});
        }).catch((err) => {
            console.log(err)
        })
    }
    handlePageChange = page => {
        this.setState({ currentPage: page });
    }
    handleCompanySelect = ({currentTarget: select}) => {
        const { value } = select;
        const jobs = value === 'all' ? this.filter.getAllJobs() : this.filter.getJobsByCompany(value)
        this.setState({
            currentPage: 1,
            data: jobs
        })
    }
    
    handleChange = ({currentTarget: input}) => {
        const searchQuery = { ...this.state.searchQuery };
        searchQuery[input.name] = input.value
        this.setState({searchQuery});
    }
    handleSearch = (e) => {
        e.preventDefault();
        const jobs = this.filter.getJobsByFilter(this.state.searchQuery)
        this.setState({
            currentPage: 1,
            data: jobs
        });
    }
    resetFilters = () => {
        
        this.setState({
            data: this.filter.getAllJobs(),
            currentPage: 1,
            searchQuery: {
                skills: '',
                location: '',
                experience: ''
            }
        })
    }
    render() {
        const { data, pageSize, currentPage, searchQuery, dataRecieved } = this.state;
        const { skills, location, experience } = searchQuery;
        const jobs = paginate(data, currentPage, pageSize);
        return (
            <div className="container">
                <div className="row mt-2 mb-2">
                    <div className="col">
                    <form className="form-inline" onSubmit={this.handleSearch}>
                        <div className="form-group mb-2">
                            <label htmlFor="skills" className="sr-only">Skills</label>
                            <input type="text" className="form-control" name="skills" placeholder="Skills" onChange={this.handleChange} value={skills}/>
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <label htmlFor="location" className="sr-only">Location</label>
                            <input type="text" className="form-control" name="location" placeholder="Location" onChange={this.handleChange} value={location}/>
                        </div>
                        <div className="form-group mx-sm-3 mb-2">
                            <Select 
                                items={_.range(0, 31)} 
                                className='form-control' 
                                optionAppend='yrs'
                                onItemSelect={this.handleChange}
                                name='experience'
                                value={experience} 
                                />
                        </div>
                        <button type="submit" className="btn btn-primary mb-2">Search</button>
                    </form>
                    <button className="btn btn-primary mb-2" onClick={this.resetFilters}>reset filters</button>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-3">
                        <Select 
                            items={dataRecieved ? Object.keys(this.filter.getCompanyList()) : []} 
                            onItemSelect={this.handleCompanySelect} 
                            className="custom-select"
                            size={40}
                            label="Filter All Jobs By Company"
                            />
                    </div>
                    <div className="col-9">
                        {data.length === 0 && <p>0 Jobs found please try a different search</p>}
                        {jobs && jobs.map((job) => (
                            <Card job={job} key={job._id}/>
                        ))}
                        <PaginationElement jobsCount={data.length} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage} />
                    </div>
                </div>
            </div>
        )            
    }
}

export default JobCard;