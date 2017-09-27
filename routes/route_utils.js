module.exports = {
    /**
     * Returns all the info needed by the front end for the User model.
     * @param {object} userDoc - The user model retrieved from the database.
     * @return {object} userObject - The user model as required by the front end.
     */
    returnUserObject: function(userDoc) {
        "use strict";
        let user = {
            id: userDoc.id,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
            email: userDoc.email,
            employerId: userDoc.employerId === undefined ? null : userDoc.employerId
        };

        return user;
    },

    /**
     *
     * @param employerDoc {object} - The employer model retrieved from the database.
     * @return {object} employerObject - The employer model as required by the front end.
     */
    returnEmployerObject: function(employerDoc) {
        "use strict";
        let employer = {
            logoImg: employerDoc.logoImg,
            name: employerDoc.name,
            applicants: employerDoc.applicants,
            jobs: employerDoc.jobs,
            socialMedia: employerDoc.socialMedia,
            location: employerDoc.location,
            id: employerDoc.id
        };

        return employer;
    }
};

