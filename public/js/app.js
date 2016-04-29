angular.module("contactApp",['ngRoute'])
.config(function($routeProvider){
        $routeProvider
            .when("/",{
                templateUrl:"list.html",
                controller: "ListController",
                resolve: {
                    contacts: function(Contacts) {
                        return Contacts.getContacts();
                    }
                }
            })
            .when("/new/contact", {
                controller: "NewContactController",
                templateUrl: "contact-form.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
.service("Contacts",function($http){
        this.getContacts = function(){
            then(function(response){
                return response;

            },function(response){
                alert("error finding Contacts");
            });

        }
        this.getContacts = function(contactId)
        {
            var url = "/contacts/"+contactId;
            return $http.get(url).
                then(function(response){
                    return response;
                },function(response){
                   alert("error finding this contact")
                });
        }
        this.createContact = function(contact) {
            return $http.post("/contacts", contact).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating contact.");
                });
        }
            .controller("ListController", function(contacts, $scope) {
                $scope.contacts = contacts.data;
            })
            .controller("NewContactController", function($scope, $location, Contacts) {
                $scope.back = function() {
                    $location.path("#/");
                }

                $scope.saveContact = function(contact) {
                    Contacts.createContact(contact).then(function(doc) {
                        var contactUrl = "/contact/" + doc.data._id;
                        $location.path(contactUrl);
                    }, function(response) {
                        alert(response);
                    });
                }
            })
    });