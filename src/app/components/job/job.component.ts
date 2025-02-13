import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {AuthService} from "../../services/auth.service";
import {AlertsService} from "../../services/alerts.service";
import {CompanyService} from "../../services/company.service";
import {Observable, tap} from "rxjs";
import {jobCategories} from "../../shared/data-store/job-categories-data-store";
import {WindowService} from "../../services/common/window.service";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit, AfterViewInit {
  @ViewChild('jobSearchInput') jobSearchInput!: ElementRef;

  jobAdDataStore: any[] = [];
  filteredJobAds: any[] = [];
  paginatedJobAds: any[] = []; // List of jobs to show on the current page
  currentPage: number = 1;
  itemsPerPage: number = 6;  // how many items per page
  totalPages: number = 0;
  pageLimit: number = 5;     // Maximum number of pagination buttons to show
  startPage: number = 1;
  endPage: number = 5;
  pages: number[] = [];

  targetInput1: any;
  targetInput2: any;

  isSearchResultNotFound: boolean = false;
  isClearButtonVisible: boolean = false;

  jobSearch: string = '';
  locationSearch: string = '';

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  userSavedIds: any[] = [];

  locationFilter: string = '';
  employmentFilter: string = '';
  sortFilter: string = '';

  filterCategoriesList: any[] = jobCategories;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private companyService: CompanyService,
              private cookieService: AuthService,
              private windowService: WindowService,
              private meta: Meta, private title: Title,
              private alertService: AlertsService) {
  }

  async ngOnInit(): Promise<any> {
    this.title.setTitle('Talentboozt -Job Opportunities');
    this.meta.addTags([
      { name: 'description', content: 'Finding the right job shouldn’t be complicated. Our platform is designed to help ' +
          'you connect with top employers, showcase your skills, and find opportunities that match your career goals.' },
      { name: 'keywords', content: 'job search, career opportunities, job vacancies, employment platform, hiring, ' +
          'apply now, digital marketing manager, production executive, quality assurance manager, TPM manager, ' +
          'procurement manager, sales and marketing, manufacturing operations, software engineering, ' +
          'business management, personalized job recommendations, career support, easy application process, ' +
          '24/7 support, tech jobs, startup jobs, Talent Boozt, job portal, find top employers, connect with employers, ' +
          'explore jobs' }
    ]);
    this.employeeId = this.cookieService.userID();
    await this.getAllJobs().subscribe((data) => {
      // Get query parameters from route
      this.route.queryParams.subscribe(params => {
        this.jobSearch = params['jobSearch'] || '';
        this.locationSearch = params['locationSearch'] || '';

        this.filterJobs(); // Apply filtering based on query params
        this.totalPages = Math.ceil(this.filteredJobAds.length / this.itemsPerPage);
        this.updatePaginationRange();
        this.updatePaginatedJobAds();
      });
    })

    if (this.employee){
      this.getEmployee(this.employeeId);
    }
  }

  getEmployee(id: any) {
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.userSavedIds = this.employee.employee.savedJobs.map((job: any) => job.jobId);
      },
      (error: any) => {
        this.alertService.warningMessage('Please login first to apply for jobs', 'Reminder');
      }
    );
  }

  ngAfterViewInit() {
    if (this.windowService.nativeDocument){
      const icons = (document as any).querySelectorAll('.material-icons');
      icons.forEach((icon: any) => {
        icon.setAttribute('translate', 'no');
      });
    }
  }

  getAllJobs(): Observable<any> {
    return this.companyService.fetchAllPostedJobs().pipe(
      tap((data) => {
        data.forEach((company: any) => {
          company.postedJobs.forEach((job: any) => {
            let filteredJobs: any[] = [];
            job.companyName = company.companyName;
            job.companyLogo = company.companyLogo;
            job.companyLevel = company.companyLevel;
            filteredJobs.push(job);
            filteredJobs = filteredJobs.filter((item: any) => new Date(item.expiryDate).getTime() > new Date().getTime() && new Date(item.datePosted).getTime() <= new Date().getTime());
            this.jobAdDataStore.push(...filteredJobs);
          });
        });
      })
    )
  }

  sortJobsByType(): void {
    // Use the sortFilter to determine sorting criteria
    if (this.sortFilter === 'Recent') {
      this.paginatedJobAds?.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else if (this.sortFilter === 'Popular') {
      this.paginatedJobAds?.sort((a, b) => b.popularityScore - a.popularityScore);  // Assuming jobs have a popularityScore field
    }
  }

  filterJobs(): void {
    this.isSearchResultNotFound = false;
    this.filteredJobAds = this.jobAdDataStore.filter((data: any) => {
      const titleMatch = this.targetInput1 ? data.title.toLowerCase().includes(this.targetInput1.toLowerCase()) : true;
      const locationMatch = this.targetInput2 ? data.location.toLowerCase().includes(this.targetInput2.toLowerCase()) : true;
      const titleMatchQuery = this.jobSearch ? data.title.toLowerCase().includes(this.jobSearch.toLowerCase()) : true;
      const locationMatchQuery = this.locationSearch ? data.location.toLowerCase().includes(this.locationSearch.toLowerCase()) : true;

      // Apply the location and employment filters
      const locationFilterMatch = this.locationFilter ? data?.locationType.toLowerCase() === this.locationFilter.toLowerCase() : true;
      const employmentFilterMatch = this.employmentFilter ? data.employeeType.toLowerCase() === this.employmentFilter.toLowerCase() : true;

      return titleMatch && locationMatch && titleMatchQuery && locationMatchQuery && locationFilterMatch && employmentFilterMatch;
    });

    this.isSearchResultNotFound = this.filteredJobAds.length === 0;
    this.isClearButtonVisible = !!(this.targetInput1 || this.targetInput2 || this.jobSearch || this.locationSearch || this.locationFilter || this.employmentFilter);

    this.totalPages = Math.ceil(this.filteredJobAds.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to first page after filtering
    this.updatePaginationRange();
    this.updatePaginatedJobAds();
  }

  applyFilters(): void {
    const queryParams = {
      jobSearch: this.jobSearch,
      locationSearch: this.locationSearch,
      locationFilter: this.locationFilter,
      employmentFilter: this.employmentFilter,
      sortFilter: this.sortFilter,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
    this.filterJobs();
  }

  selectCategory(category: string): void {
    if (category === 'Other') {
      this.clearFilters();
      return;
    }
    const queryParams = {
      jobSearch: category,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
    this.filterJobs();
  }

  clearFilters(): void {
    this.locationFilter = '';
    this.employmentFilter = '';
    this.sortFilter = '';
    this.clearSearch();
  }

  handleJobSearch(data: any): void {
    this.targetInput1 = data.value;
    this.filterJobs();
  }

  handleLocationSearch(data: any): void {
    this.targetInput2 = data.value;
    this.filterJobs();
  }

  clearSearch() {
    this.jobSearch = '';
    this.locationSearch = '';
    this.targetInput1 = '';
    this.targetInput2 = '';
    this.filteredJobAds = this.jobAdDataStore;
    this.isClearButtonVisible = false;
    this.updatePaginatedJobAds();
  }

  updatePaginatedJobAds() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedJobAds = this.filteredJobAds.slice(startIndex, endIndex);
    this.sortJobsByType()
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginationRange();
      this.updatePaginatedJobAds();
    }
  }

  updatePaginationRange() {
    if (this.currentPage <= this.pageLimit) {
      this.startPage = 1;
      this.endPage = Math.min(this.pageLimit, this.totalPages);
    } else if (this.currentPage + this.pageLimit - 1 <= this.totalPages) {
      this.startPage = this.currentPage;
      this.endPage = Math.min(this.currentPage + this.pageLimit - 1, this.totalPages);
    } else {
      this.startPage = this.totalPages - this.pageLimit + 1;
      this.endPage = this.totalPages;
    }
    this.pages = Array.from({length: this.endPage - this.startPage + 1}, (_, i) => i + this.startPage);
  }

  focusInput() {
    this.jobSearchInput.nativeElement.focus();
    if (this.windowService.nativeDocument)
      (document as any).body.scrollTop = 0;
  }

  onJobSavedOrRemoved() {
    this.getEmployee(this.employeeId);
  }
}
