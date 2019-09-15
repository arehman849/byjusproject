import React from 'react';

const Card = ( {job } ) => {
    const notDisclosed = <small className="grey-text">Not Disclosed</small>
    return (
        <div className="card job-card shadow p-3 mb-3 bg-white rounded" >
                    <div className="card-body">
                        <div className="card-title"><h4><b>{job.title || notDisclosed}</b></h4></div>
                        <div className="row">
                            <div className="col-6">
                                <b>Company Name: </b>{job.companyname || notDisclosed}
                            </div>
                            <div className="col-6">
                            <b>Location : </b> {job.location || notDisclosed}
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6">
                                <b>Skills: </b> {job.skills || notDisclosed}
                            </div>
                            <div className="col-6">
                                <b>Experience: </b> {job.experience || notDisclosed}
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6">
                                <b>Salary: </b> {job.salary || notDisclosed}
                            </div>
                            <div className="col-6">
                                <b>Type of job: </b> {job.type || notDisclosed}
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-12">
                                <b>Job Description: </b> {job.jd || notDisclosed}
                            </div>
                        </div>
                        <a className="btn btn-outline-primary mt-3 btn-lg" href={job.applylink} target="_blank" rel="noopener noreferrer">Apply on {job.source || 'website'}</a>
                    </div>
                </div>
    );
}
 
export default Card;