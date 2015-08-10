define(['app.service'], function (services) {

    var injectParams = ['$http'];

    var adminDetailService = function ($http) {

        return {
            getGame: function(){
                return {
                    name: "JOB EVENT",
                    size: 45,
                    shortDescription:"shortDescription",
                    longDescription:"longDescription",
                    image:"https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg",
                    newMembers:[
                        {
                            name: "Maarten Denorme",
                            email: "ezfzefze@ezf.com",
                            telephone: "90809720972",
                            jobInterest: "ezfezkflnezlfknezlkafnelkznaflezkanflkezanflekzanffezaklnflkeznfklzenfklezf"

                        },{
                            name: "Mart Denorme",
                            email: "ezfzefze@ezf.com",
                            telephone: "90809720972",
                            jobInterest: "ezfezkflnezlfknezlkafnelkznaflezkanflkezanflekzanffezaklnflkeznfklzenfklezf"

                        },{
                            name: "Nick Tombeur",
                            email: "ezfzefze@ezf.com",
                            telephone: "90809720972",
                            jobInterest: "ezfezkflnezlfknezlkafnelkznaflezkanflkezanflekzanffezaklnflkeznfklzenfklezf"

                        }
                    ]
                };
            }
        }
    };


    adminDetailService.$inject = injectParams;

    services.factory('adminDetailService', adminDetailService);
});