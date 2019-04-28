// global bootbox
$(document).ready(function () {
    //setting a refernece to the article-containe div where all the dynamic content will go
    //adding event listeners to any dynamically generated "save article"
    //and scrap new article buttons
    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    //once the page is ready, run the initPage function
    initPage();

    function initPage() {
        //emply the article container, run an AJAX request for any unsaved headlines
        articleContainer.empty();
        $.get("/api/headlines?saved=false")
            .then(function (data) {
                //if we have headlines, render them to the page
                if (data && data.length) {
                    renderArticles(data);
                } else {
                    // otherwise render a message explaining we have no articles
                    renderEmpty();
                }
            });
    }


    function renderArticles(articles) {
        //This function handles appending HTML containing our article data to the page
        //passing an array of JSON containing all available articles in our database
        var articlePanels = [];
        //pass each article JSON object to the createPanel function which return a bootstrap panel with article data inside

        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        //when all html for the articles are stored in articlePanels array, append them to the article Panels container
        articleContainer.append(articlePanels);
    }

    function createPanel(article) {
        var panel =
            $(["<div class='panel panel-default'>",
                "<div class='panel-heading'>",
                "<h3>",
                article.headline,
                "<a class='btn btn-success save'>",
                "Save Article",
                "</a>",
                "</h3>",
                "</div>",
                "</div class='panel-body'>",
                article.summary,
                "</div>",
                "<div>"
            ].join(""));

        panel.data("_id", article._id);

        return panel;
    }

    function renderEmpty() {
        var emptyAlert =
            $(["<div class='alert alert-warning text-center'>",
                "<h4>No new articles.</h4>",
                "</div>",
                "<div class='panel panel-default'>",
                "<div class='panel-heading text-center'>",
                "<h3>What You Like to Do?</h3>",
                "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a class='scrape-new'>Try Scraping New Articles</a></h4>",
                "<h4><a href='/saved'>Go to Saved Articles</a></h4>",
                "</div>",
                "</div>"
            ].join(""));

        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        //This function is triggered when the user wants to save an article


        var articleToSave =
    

}


function renderNotesList(data) {


    var notesToRender = [];
    var currentNote;
    if (!data.notes.length) {

        currentNote = [
            "<li class='list-group-item'>",
            "No notes for this article.",
            "</li>"
        ].join("");
        notesToRender.push(currentNote);
    } else {

        for (var i = 0; i < data.notes.length; i++) {

            currentNote = $([
                "<li class='list-group-item note'>",
                data.notes[i].noteText,
                "<button class='btn btn-danger note-delete'>x</button>",
                "</li>"
            ].join(""));

            currentNote.children("button").data("_id", data.notes[i]._id);

            notesToRender.push(currentNote);
        }
    }

    $(".note-container").append(notesToRender);
}

function handleArticleDelete() {


    var articleToDelete = $(this).parents(".panel").data();

    $.ajax({
        method: "DELETE",
        url: "/api/headlines/" + articleToDelete._id
    }).then(function (data) {

        if (data.ok) {
            initPage();
        }
    });
}

function handleArticleNotes() {


    var currentArticle = $(this).parents(".panel").data();

    $.get("/api/notes" + currentArticle._id).then(function (data) {

        var modalText = [
            "<div class='container-fluid text center'>",
            "<h4>Article Notes: ",
            currentArticle._id,
            "</h4>",
            "<hr />",
            "<ul class='list-group note-container'>",
            "<ul>",
            "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
            "<button class='btn btn-success save'>Save Note</button>",
            "</div>"
        ].join("");

        bootbox.dialog({
            message: modalText,
            closeButton: true
        });
        var noteData = {
            _id: currentArticle._id,
            notes: data || []
        };



        $(".btn.save").data("article", noteData);

        renterNotesList(noteData);
    });
}

function handleNoteSave() {



    var noteData;
    var newNote = $(".bootbox-body textarea").val().trim();


    if (newNote) {
        noteData = {
            id: $( this).data("article")._id,
            noteText: newNote
        };
        $.post("/api/notes", noteData).then(function() {

       bootbox.hideAll();
        });
    }
}

function handleNoteDelete() {



    var noteToDelete = $(this).data("_id");

$.ajax({
    url: "/api/notes/" + noteToDelete,
    method: "DELETE"
}).then(function() {

    bootbox.hideAll()
    });
}

});




