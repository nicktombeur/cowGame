define(['app.service'], function (services) {

    var injectParams = ['$http','$log','API_URL'];

    var adminService = function ($http,$log,API_URL) {
        return {
            getGames: function () {
                $log.info("Getting events");
                return $http.get(API_URL+'/api/event/')
                    .then(
                    function (response) {
                        $log.debug("Getting events - SUCCESS");
                        return response.data;
                    },
                    function (httpError) {
                        $log.debug("Getting events - FAILED");
                        // translate the error
                        throw httpError.status + " : " +
                            httpError.data;
                    });
            },
            getMockGames: function () {
                return [
                    {id: "1234", title: "First Game", shortDescription: "First Game description", fullDescription: "ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf", picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                    {id: "123453", title: "Game", shortDescription: "First Game description", fullDescription: "ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf", picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                    {id: "123453", title: "zef Game", shortDescription: "First Game description", fullDescription: "ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf", picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                    {id: "123453", title: "ger Game", shortDescription: "First Game description", fullDescription: "ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf", picture: "http://file2.answcdn.com/answ-cld/image/upload/w_726,c_fill,g_faces:center,q_60/v1/tk/view/getty/Local/65eb833a/157204335.jpg"},
                    {id: "123453", title: "Firregst Game", shortDescription: "First Game description", fullDescription: "ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf", picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                    {id: "123453", title: "Firergst Game", shortDescription: "First Game description", fullDescription: "ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf", picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                    {id: "123453", title: "Firergst Game", shortDescription: "First Game description", fullDescription: "ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf", picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                    {id: "123453", title: "Firergst Game", shortDescription: "First Game description", fullDescription: "ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf", picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                    {id: "12343434", title: "Firergrest Game", shortDescription: "First Game description", fullDescription: "Dieper afzien aan sterke are gezift herten gif. Kongostaat verwachten middellijn gas ongebruikt feestdagen buitendien mee. Koopman genomen javanen ik nu ontdekt op menigte. Bakken europa tunnel invoer zullen dat kamper zoo. Leveren zwijnen hoogere duivels sombere bak van dik lot. Uit stam hier aan acre zin. Schuld forten zeggen elk bij minste jungle leggen een. Dragen aan bouwde lappen loopen rubben ceylon nog. De afkoopen ad vreemden er af scheppen gewonnen. ", picture: "http://file2.answcdn.com/answ-cld/image/upload/w_726,c_fill,g_faces:center,q_60/v1/tk/view/getty/Local/65eb833a/157204335.jpg"}
                ]
            }

        }
    };

    adminService.$inject = injectParams;

    services.factory('adminService', adminService);

});