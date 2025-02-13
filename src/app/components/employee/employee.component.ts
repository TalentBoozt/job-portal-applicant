import {AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {AuthService} from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import {jobCategories} from "../../shared/data-store/job-categories-data-store";
import {map, Observable, tap} from "rxjs";
import {isPlatformBrowser} from "@angular/common";
import {WindowService} from "../../services/common/window.service";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  @ViewChild('employeeSearchInput') employeeSearchInput!: ElementRef;

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  followingIds: any[] = [];
  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  employees: any;
  filteredEmployees: any;

  paginatedEmployees: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0;
  pageLimit: number = 5;
  startPage: number = 1;
  endPage: number = 5;
  pages: number[] = [];

  targetInput1: any;
  targetInput2: any;

  isSearchResultNotFound: boolean = false;
  isClearButtonVisible: boolean = false;

  employeeSearch: string = '';
  locationSearch: string = '';

  locationFilter: string = '';
  employmentFilter: string = '';
  sortFilter: string = '';

  filterCategoriesList: any[] = jobCategories;

  constructor(private employeeService: EmployeeService,
              public cookieService: AuthService,
              private route: ActivatedRoute,
              private windowService: WindowService,
              private meta: Meta, private title: Title,
              private router: Router) {}

  async ngOnInit(): Promise<any> {
    this.title.setTitle('Talentboozt -Candidates');
    this.meta.addTags([
      { name: 'description', content: 'We’re a dedicated team of HR Professional and Tech enthusiasts passionate about ' +
          'connecting people with opportunity and fulfilling human potential.' },
      { name: 'keywords', content: 'Employee Directory, Search Employees, Occupation Finder, Employee Profiles, ' +
          'HR Professionals, Web Developers, Personalized Profiles, Employee Search Tools, Salary Estimates, ' +
          'Experience Levels, Team Directory, Employee Database, Career Listings, Professional Profiles, ' +
          'Employee Management, Searchable Profiles, Diverse Occupations, 24/7 Support, Save Time, Quick and Easy Search' }
    ]);
    this.employeeId = this.cookieService.userID();
    await this.getAllEmployees().subscribe((data) => {
      // Get query parameters from route
      this.route.queryParams.subscribe(params => {
        this.employeeSearch = params['employeeSearch'] || '';
        this.locationSearch = params['locationSearch'] || '';

        this.filterEmployees(); // Apply filtering based on query params
        this.totalPages = Math.ceil(this.filteredEmployees?.length / this.itemsPerPage);
        this.updatePaginationRange();
        this.updatePaginatedJobAds();
      });
    })

    this.getEmployee(this.employeeId);
  }

  ngAfterViewInit() {
    if (this.windowService.nativeDocument){
      const icons = (document as any).querySelectorAll('.material-icons');
      icons.forEach((icon: any) => {
        icon.setAttribute('translate', 'no');
      });
    }
  }

  getEmployee(id: any) {
    this.loading = true;
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        if (this.employee?.empFollowing && this.employee?.empFollowing.length > 0) {
          this.followingIds = this.employee.empFollowing[0]?.followings?.map((following: any) => following?.followingId) || [];
        }
      },
      (error: HttpErrorResponse) => {
        // Check for different error types
        if (error.status === 404) {
          this.notFound = true;
        } else if (error.status === 500) {
          this.serverError = true;
        } else if (error.status === 0) {
          this.corsError = true;
        } else if (error.status === 403) {
          this.forbidden = true;
        } else {
          this.unexpectedError = true;
        }

        this.loading = false;
      }
    );
  }

  getAllEmployees(): Observable<any> {
    return this.employeeService.fetchEmployees().pipe(
      map((data:any) => data?.sort((a:any, b:any) => a?.firstname?.localeCompare(b?.firstname))),
      tap(data => {
        this.employees = data;
      })
    )
  }

  filterEmployees(): void {
    this.isSearchResultNotFound = false;
    this.filteredEmployees = this.employees?.filter((data: any) => {
      const name = data.firstname + ' ' + data.lastname;
      const titleMatch = this.targetInput1 ? name?.toLowerCase().includes(this.targetInput1.toLowerCase()) : true;
      const locationMatch = this.targetInput2 ? data.occupation?.toLowerCase().includes(this.targetInput2.toLowerCase()) : true;
      const titleMatchQuery = this.employeeSearch ? data.occupation?.toLowerCase().trim().includes(this.employeeSearch.toLowerCase().trim()) : true;
      const locationMatchQuery = this.locationSearch ? data.occupation?.toLowerCase().trim().includes(this.locationSearch.toLowerCase().trim()) : true;

      // Apply the location and employment filters
      const locationFilterMatch = this.locationFilter ? data?.locationType.toLowerCase() === this.locationFilter.toLowerCase() : true;
      const employmentFilterMatch = this.employmentFilter ? data.employeeType.toLowerCase() === this.employmentFilter.toLowerCase() : true;

      return titleMatch && locationMatch && titleMatchQuery && locationMatchQuery && locationFilterMatch && employmentFilterMatch;
    });

    this.isSearchResultNotFound = this.filteredEmployees?.length === 0;
    this.isClearButtonVisible = !!(this.targetInput1 || this.targetInput2 || this.employeeSearch || this.locationSearch || this.locationFilter || this.employmentFilter);

    this.totalPages = Math.ceil(this.filteredEmployees?.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to first page after filtering
    this.updatePaginationRange();
    this.updatePaginatedJobAds();
  }

  sortEmployeesByType(): void {
    if (this.sortFilter === 'Recent') {
      this.paginatedEmployees?.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    } else if (this.sortFilter === 'Popular') {
      this.paginatedEmployees?.sort((a, b) => b.popularityScore - a.popularityScore);
    }
  }

  applyFilters(): void {
    const queryParams = {
      employeeSearch: this.employeeSearch,
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
    this.filterEmployees();
  }

  selectCategory(category: string): void {
    if (category === 'Other') {
      this.clearFilters();
      return;
    }
    const queryParams = {
      employeeSearch: category,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
    this.filterEmployees();
  }

  clearFilters(): void {
    this.locationFilter = '';
    this.employmentFilter = '';
    this.sortFilter = '';
    this.clearSearch();
  }

  viewProfile(id: any) {
    if (id) {
      this.router.navigate(['/candidate-profile'], {queryParams: {id: id}});
      setTimeout(() => {
        if (this.windowService.nativeWindow)
          (window as any).location.reload();
      }, 500)
    }
  }

  handleEmployeeSearch(data: any): void {
    this.targetInput1 = data.value;
    this.filterEmployees();
  }

  handleLocationSearch(data: any): void {
    this.targetInput2 = data.value;
    this.filterEmployees();
  }

  clearSearch() {
    this.employeeSearch = '';
    this.locationSearch = '';
    this.targetInput1 = '';
    this.targetInput2 = '';
    this.filteredEmployees = this.employees;
    this.isClearButtonVisible = false;
    this.updatePaginatedJobAds();
  }

  updatePaginatedJobAds() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEmployees = this.filteredEmployees?.slice(startIndex, endIndex);
    this.sortEmployeesByType()
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
    this.employeeSearchInput.nativeElement.focus();
    if (this.windowService.nativeDocument)
      (document as any).body.scrollTop = 0;
  }
}
