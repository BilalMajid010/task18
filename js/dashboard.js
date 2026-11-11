
document.addEventListener("DOMContentLoaded", () => {
  const projects = [
    { name: "Website Redesign", owner: "Sarah Ahmed", date: "2026-11-15", status: "Active", progress: 75 },
    { name: "Mobile Application", owner: "Ahmed Khan", date: "2026-11-20", status: "Active", progress: 45 },
    { name: "Marketing Website", owner: "Usman Ali", date: "2026-10-28", status: "Completed", progress: 100 },
    { name: "CRM Integration", owner: "Ayesha Malik", date: "2026-11-25", status: "Pending", progress: 10 },
    { name: "E-commerce Store", owner: "Bilal Majid", date: "2026-11-18", status: "Active", progress: 60 },
    { name: "Portfolio Website", owner: "Sarah Ahmed", date: "2026-10-20", status: "Completed", progress: 100 },
    { name: "Admin Dashboard", owner: "Ahmed Khan", date: "2026-12-01", status: "Pending", progress: 15 },
    { name: "Landing Page", owner: "Usman Ali", date: "2026-11-10", status: "Completed", progress: 100 },
    { name: "Booking System", owner: "Ayesha Malik", date: "2026-11-30", status: "Active", progress: 50 },
    { name: "Analytics Panel", owner: "Bilal Majid", date: "2026-12-05", status: "Pending", progress: 20 }
  ];

  const searchInput = document.getElementById("projectSearch");
  const statusFilter = document.getElementById("statusFilter");
  const tableBody = document.getElementById("projectTableBody");
  const tableInfo = document.getElementById("tableInfo");
  const previousButton = document.getElementById("previousPage");
  const nextButton = document.getElementById("nextPage");

  const pageSize = 5;
  let currentPage = 1;

  function getFilteredProjects() {
    const search = searchInput.value.toLowerCase().trim();
    const status = statusFilter.value;

    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(search) ||
        project.owner.toLowerCase().includes(search);

      const matchesStatus = status === "all" || project.status === status;

      return matchesSearch && matchesStatus;
    });
  }

  function getStatusClass(status) {
    if (status === "Completed") return "badge badge-green";
    if (status === "Pending") return "badge badge-yellow";
    return "badge bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
  }

  function renderProjects() {
    const filteredProjects = getFilteredProjects();
    const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));

    currentPage = Math.min(currentPage, totalPages);

    const startIndex = (currentPage - 1) * pageSize;
    const visibleProjects = filteredProjects.slice(startIndex, startIndex + pageSize);

    tableBody.innerHTML = "";

    if (visibleProjects.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="px-4 py-8 text-center text-slate-500">
            No matching projects found.
          </td>
        </tr>
      `;
    } else {
      visibleProjects.forEach((project) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td class="px-4 py-4 font-semibold">${project.name}</td>
          <td class="px-4 py-4 text-slate-500">${project.owner}</td>
          <td class="px-4 py-4 text-slate-500">${project.date}</td>
          <td class="px-4 py-4"><span class="${getStatusClass(project.status)}">${project.status}</span></td>
          <td class="px-4 py-4">
            <div class="flex items-center gap-3">
              <div class="h-2 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <div class="h-full rounded-full bg-brand-600" style="width: ${project.progress}%"></div>
              </div>
              <span class="text-xs text-slate-500">${project.progress}%</span>
            </div>
          </td>
        `;

        tableBody.appendChild(row);
      });
    }

    const firstItem = filteredProjects.length === 0 ? 0 : startIndex + 1;
    const lastItem = Math.min(startIndex + pageSize, filteredProjects.length);

    tableInfo.textContent = `Showing ${firstItem}-${lastItem} of ${filteredProjects.length} projects`;
    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages || filteredProjects.length === 0;
  }

  searchInput.addEventListener("input", () => {
    currentPage = 1;
    renderProjects();
  });

  statusFilter.addEventListener("change", () => {
    currentPage = 1;
    renderProjects();
  });

  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderProjects();
    }
  });

  nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(getFilteredProjects().length / pageSize);

    if (currentPage < totalPages) {
      currentPage++;
      renderProjects();
    }
  });

  renderProjects();
});
