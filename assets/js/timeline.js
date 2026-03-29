/**
 * Timeline Sort & Enhance
 *
 * Sorts .timeline-entry elements by their data-date attribute (oldest-first)
 * and groups them under year headings for visual structure.
 * Posts with the same date as a project appear first.
 */
(function () {
  "use strict";

  const container = document.querySelector(".timeline-entries");
  if (!container) return;

  const entries = Array.from(container.querySelectorAll(".timeline-entry"));
  if (entries.length === 0) return;

  // Sort: oldest-first, posts before projects on same date
  entries.sort(function (a, b) {
    var dateA = a.getAttribute("data-date") || "";
    var dateB = b.getAttribute("data-date") || "";
    if (dateA !== dateB) return dateA.localeCompare(dateB);

    // Same date — posts appear before projects
    var aIsPost = a.querySelector(".badge-post") !== null;
    var bIsPost = b.querySelector(".badge-post") !== null;
    if (aIsPost && !bIsPost) return -1;
    if (!aIsPost && bIsPost) return 1;
    return 0;
  });

  // Clear container and re-append sorted entries with year dividers
  container.innerHTML = "";
  var currentYear = null;

  entries.forEach(function (entry) {
    var date = entry.getAttribute("data-date") || "";
    var year = date.substring(0, 4);

    if (year && year !== currentYear) {
      currentYear = year;
      var divider = document.createElement("div");
      divider.className = "timeline-year-divider";
      divider.setAttribute("role", "heading");
      divider.setAttribute("aria-level", "2");
      divider.textContent = year;
      container.appendChild(divider);
    }

    container.appendChild(entry);
  });
})();
