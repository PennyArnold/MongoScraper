//include routes in server file
module.exports = function(router) {
    //route renders the homepage
    router.get("/", function(req, res) {
        res.render("home");
    });
    //this route renders the saved handlebars page
    router.get("/saved", function(req, res) {
        res.render("saved");
    });
}