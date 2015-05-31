define(['app.service'], function (services) {
    services.factory('adminService', ["$http", function ($http) {
        return {
            getSelectedCubesHTTP: function (gameId) {
                return $http.get('/api/v1/admin/' + gameId)
                    .then(
                    function (response) {
                        return {
                            title: response.data.title,
                            cost: response.data.price
                        };
                    },
                    function (httpError) {
                        // translate the error
                        throw httpError.status + " : " +
                        httpError.data;
                    });
            },
            getGames: function(){
                return [{id:"1234",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf", picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf",picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf",picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf",picture: "http://file2.answcdn.com/answ-cld/image/upload/w_726,c_fill,g_faces:center,q_60/v1/tk/view/getty/Local/65eb833a/157204335.jpg"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf",picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf",picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf",picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf",picture: "https://ce12b193d2f7d75eb0d1-a678cc8f4f890e88f71fe9818106b11e.ssl.cf1.rackcdn.com/vault/img/2011/05/10/4dc92e52c29e0685030015b4/medium_cowpielogo.jpg"},
                        {id:"12343434",title:"First Game",shortDescription: "First Game description",fullDescription:"Dieper afzien aan sterke are gezift herten gif. Kongostaat verwachten middellijn gas ongebruikt feestdagen buitendien mee. Koopman genomen javanen ik nu ontdekt op menigte. Bakken europa tunnel invoer zullen dat kamper zoo. Leveren zwijnen hoogere duivels sombere bak van dik lot. Uit stam hier aan acre zin. Schuld forten zeggen elk bij minste jungle leggen een. Dragen aan bouwde lappen loopen rubben ceylon nog. De afkoopen ad vreemden er af scheppen gewonnen. ",picture: "http://file2.answcdn.com/answ-cld/image/upload/w_726,c_fill,g_faces:center,q_60/v1/tk/view/getty/Local/65eb833a/157204335.jpg"}]
            }

        }
    }]);
});