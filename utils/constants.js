
module.exports = {
    userType: {
        employee: "EMPLOYEE",
        manager: "MANAGER",
        admin: "ADMIN"
    },


    userStatus: {
        pending: "PENDING",
        approved: "APPROVED",
        rejected: "REJECTED"
    },

    leadStatus: {
        new: "NEW",
        lost: "LOST",
        contacted: "CONTACTED",
        canceled: "CANCELED",
        qualified: "QUALIFIED",
        confirmed: "CONFIRMED"
    },
    serviceStatus: {
        created: "CREATED",
        released: "RELEASED",
        open: "OPEN",
        canceled: "CANCELED",
        inProcess: "IN PROCESS",
        completed: "COMPLETED"
    },

    isValidEmail: (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },

    // getEngineer: (engineers) => {

    //     let tempEng;
    //     let maxTicketAssigned = Number.MAX_SAFE_INTEGER;

    //     for (let engineer of engineers) {
    //         if (engineer.ticketsAssigned.length < maxTicketAssigned) {
    //             tempEng = engineer;
    //             maxTicketAssigned = engineer.ticketsAssigned.length
    //         }
    //     }
    //     return tempEng
    // },

    mailCriteria: {
        OWNER_NAME: "CRM-APP",
        ADMIN_MAIL_ID: "aamir.iqbal040@gmail.com"
    }

}