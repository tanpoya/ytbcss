$(() => {
    const navigation = $(".navigation");
    $(".toggle").click(function() {
        this.classList.toggle("active");
        $(navigation).toggleClass("active");
    });
});