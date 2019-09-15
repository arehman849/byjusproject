import React, { Component } from 'react';
import JobCard from './jobCard';

class Home extends Component {
    render() {
        return(
            <div className="container">
                <JobCard />
            </div>
        )
    }
}

export default Home;