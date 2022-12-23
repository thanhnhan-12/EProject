function getPageList(totalPages, page, maxLength) {
  function range(start, end) {
    return Array.from(Array(end - start + 1), (_, i) => i + start )
  }

  var sideWidth = maxLength < 9 ? 1 : 2;
  var leftWidth = (maxLength -sideWidth * 2 - 3) >> 1;
  var rightWidth = (maxLength -sideWidth * 2 - 3) >> 1;

  if(totalPages <= maxLength) {
    return range(1, totalPages);
  }

  if(page <= maxLength - sideWidth -1 - rightWidth) {
    return range(1, maxLength - sideWidth - 1).concat(0, range(totalPages - sideWidth + 1, totalPages));
  }

  if(page >= totalPages - sideWidth - 1 - rightWidth) {
    return range(1, sideWidth).concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
  }

  return range(1, sideWidth).concat(0, range(page - leftWidth, page + rightWidth), 0, range(totalPages - sideWidth + 1, totalPages));

}

$(function() {
  var numberOfItems = $(".content-post .post-box").length;
  var limitPerPage = 3;
  var totalPages = Math.ceil(numberOfItems / limitPerPage);
  var paginationSize = 7;
  var currentPage;

  function showPage(whichPage) {
    if (whichPage < 1 || whichPage > totalPages) return false;

    currentPage = whichPage;

    $(".content-post .post-box").hide().slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage).show();

    $(".pagination1 li").slice(1, -1).remove();

    getPageList(totalPages, currentPage, paginationSize).forEach(item => {
      $("<li>").addClass("page-item1").addClass(item ? "current-page1" : "dots1" )
      .toggleClass("active", item == currentPage).append($("<a>").addClass("page-link1")
      .attr({href: "javascript:void(0)"}).text(item || "...")).insertBefore(".next-page1")
    });

    $("previous-page1").toggleClass("disabled", currentPage === 1);
    $("next-page1").toggleClass("disabled", currentPage === totalPages);
    return true;
  }

  $(".pagination1").append(
    $("<li>").addClass("page-item1").addClass("previous-page1").append($("<a>").addClass("page-link1").attr({href: "javascript:void(0)"}).text("Prev")),
    $("<li>").addClass("page-item1").addClass("previous-page1").append($("<a>").addClass("page-link1").attr({href: "javascript:void(0)"}).text("Next")),
  );

  $(".content-post").show();
  showPages(2);

});