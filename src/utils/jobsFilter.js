import _ from "lodash";

class filter {
    constructor(data) {
        this.data = data;
        this.companyList = {};
        this.jobsByCompany = {};
        this.experienceList = {};
        this.jobsByExperience = {};
    }
    _generateCompanyList () {
        this.data.forEach(element => {
            let companyName = element.companyname.trim();
            let experience = element.experience.trim()
            this.companyList[companyName] = companyName;
            this.experienceList[experience] = experience;
            if (this.jobsByCompany[companyName]) {
                this.jobsByCompany[companyName].push(element)    
            } else {
                this.jobsByCompany[companyName] = [element];
            }
            if(this.jobsByExperience[experience]) {
                this.jobsByExperience[experience].push(element);
            } else {
                this.jobsByExperience[experience] = [element];
            }

        });
        // console.log("this.companyList", this.companyList);
        // console.log('this.jobsByCompany', this.jobsByCompany);
        // console.log('this.jobsByExperience', this.jobsByExperience)
    }

    getCompanyList() {
        return this.companyList
    }

    getJobsByCompany(companyName) {
        return this.jobsByCompany[companyName];
    }
    getAllJobs() {
        return this.data;
    }
    _getJobsByLocation(loc, jobs) {
        const locations = loc && loc.split(',')
        const filteredJobs = []
        if (!locations.length) return jobs;
        locations.forEach(elem => {
            jobs.forEach(job => {
                if (job.location && job.location.toLowerCase().indexOf(elem) > -1) {
                    filteredJobs.push(job);
                }
            });
        });
        return filteredJobs;
    }

    _getJobsBySkills(skill, jobs) {
        const skills = skill && skill.split(',')
        const filteredJobs = []
        if (!skills.length) return jobs;
        skills.forEach(elem => {
            jobs.forEach(job => {
                if (job.skills && job.skills.toLowerCase().indexOf(elem) > -1) {
                    filteredJobs.push(job);
                }
            });
        });
        return filteredJobs;
    }
    _getJobsExperience (yrs) {
        let filteredJobs = []
        if (yrs === '' || isNaN(yrs)) return this.data
        this.data.forEach(job => {
            let experience = job.experience && job.experience.replace(/(yrs|yr)/, '').trim().split('-');
            if(_.range(Number(experience[0]), Number(experience[1]) + 1).includes(Number(yrs)) 
                || ((Number(yrs) === 0 && !job.experience) 
                || (Number(yrs) === 0 && (job.experience.toLowerCase() === 'fresher' || job.experience.toLowerCase() === 'freshers')))) {
                filteredJobs.push(job)
            }
        });
        return filteredJobs;
    }
    getJobsByFilter(searchQuery) {
        let filteredJobs = this._getJobsByLocation(searchQuery.location, this._getJobsBySkills(searchQuery.skills, this._getJobsExperience(searchQuery.experience)))
        return filteredJobs;
    }
    init () {
        this._generateCompanyList();
        // this._generateJobsByLocation();
        // this._generateJobsBySkills();
        // this.generateJobsByExperience();
    }
}

export default filter;