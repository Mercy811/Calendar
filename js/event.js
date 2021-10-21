
$("#new-event-dialog").dialog({
    autoOpen: false,
});
$("#new-event-btn").click(function () {
    $("#new-event-dialog").dialog("open");
});