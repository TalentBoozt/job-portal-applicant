import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {countries} from "../../../shared/data-store/countries";
import {FileUploadService} from "../../../services/file-upload.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../../services/employee.service";
import { HttpErrorResponse } from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {CredentialService} from "../../../services/credential.service";
import {Router} from "@angular/router";
import {AlertsService} from "../../../services/alerts.service";
import {EncryptionService} from "../../../services/encryption.service";

declare var bootstrap: any;

@Component({
  selector: 'app-emp-profile-settings',
  templateUrl: './emp-profile-settings.component.html',
  styleUrls: ['./emp-profile-settings.component.scss']
})
export class EmpProfileSettingsComponent implements OnInit, AfterViewInit, OnDestroy{
  countriesSet: any[] = countries

  employee: any;
  employeeId: any; //66e5a9836f5a4f722e9e97cf || 66e31aa7217eb911ad764373
  loading: boolean = false;

  serverError: boolean = false;
  notFound: boolean = false;
  forbidden: boolean = false;
  corsError: boolean = false;
  unexpectedError: boolean = false;

  editSkills: boolean = false;
  editSkillId: any;
  editExperiences: boolean = false;
  editExperienceId: any;
  editEducations: boolean = false;
  editEducationId: any;
  editProjects: boolean = false;
  editProjectId: any;
  editCertificates: boolean = false;
  editCertificateId: any;
  editContactId: any = null;
  editSocialLinksId: any = null;

  downloadURL?: any;

  personalFormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    occupation: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    intro: new FormControl('')
  });

  searchAppearanceFormGroup = new FormGroup({
    expectedSalaryRange: new FormControl(''),
    currentExperience: new FormControl(''),
    keywords: new FormControl('', [Validators.max(40), Validators.min(3), Validators.maxLength(40), Validators.minLength(3)]),
  });

  skillsFormGroup = new FormGroup({
    skill: new FormControl('', [Validators.required]),
    percentage: new FormControl('', [Validators.required])
  });

  experienceFormGroup = new FormGroup({
    occupation: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl(''),
    currentCheck: new FormControl(false),
    description: new FormControl('', [Validators.required])
  });

  educationFormGroup = new FormGroup({
    degree: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    school: new FormControl('', [Validators.required]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl(''),
    currentCheck: new FormControl(false),
    description: new FormControl('', [Validators.required])
  });

  projectsFormGroup = new FormGroup({
    project: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    start: new FormControl('', [Validators.required]),
    end: new FormControl(''),
    currentCheck: new FormControl(false),
    demo: new FormControl(''),
    source: new FormControl(''),
    description: new FormControl('', [Validators.required])
  });

  certificatesFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    organization: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    certificateId: new FormControl('', [Validators.required]),
    certificateUrl: new FormControl('', [Validators.required]),
  });

  contactFormGroup = new FormGroup({
    phone: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    zip: new FormControl(''),
    website: new FormControl(''),
  });

  socialFormGroup = new FormGroup({
    facebook: new FormControl(''),
    twitter: new FormControl(''),
    instagram: new FormControl(''),
    linkedin: new FormControl(''),
    github: new FormControl(''),
  });

  changePassForm = new FormGroup({
    oldPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required]),
    confirmPass: new FormControl('', [Validators.required])
  });

  aNotificationsForm = new FormGroup({
    mention: new FormControl(false),
    follow: new FormControl(false),
    share: new FormControl(false),
    message: new FormControl(false)
  });

  mNotificationsForm = new FormGroup({
    promotion: new FormControl(false),
    companyNews: new FormControl(false),
    jobs: new FormControl(false),
    unsubscribe: new FormControl(false)
  });

  isp1open: boolean = true;
  isp2open: boolean = true;

  constructor(private fileUploadService: FileUploadService,
              private employeeService: EmployeeService,
              private credentialService: CredentialService,
              private alertService: AlertsService,
              private router: Router,
              private encryptionService: EncryptionService,
              private cookieService: AuthService) {
  }

  ngOnInit(): void {
    this.employeeId = this.cookieService.userID();
    this.getEmployee(this.employeeId);
  }

  ngAfterViewInit() {
    const icons = document.querySelectorAll('.material-icons');
    icons.forEach((icon) => {
      icon.setAttribute('translate', 'no');
    });

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  ngOnDestroy() {
    this.updateNotifications()
  }

  getEmployee(id: any) {
    this.loading = true;
    this.employeeService.fetchFullEmployee(id).subscribe(
      (data) => {
        this.employee = data;
        this.patchValuesToPersonalForm();
        this.patchValuesToSearchAppearanceForm();
        this.patchValuesToContactForm();
        this.patchValuesToSocialForm();
        this.patchNotifications(data?.employee?.accountNotifications, data?.employee?.marketingNotifications);
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
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

  patchValuesToPersonalForm() {
    if (this.employee) {
      this.personalFormGroup.get('firstname')?.setValue(this.employee?.employee?.firstname ? this.employee?.employee?.firstname : '');
      this.personalFormGroup.get('lastname')?.setValue(this.employee?.employee?.lastname ? this.employee?.employee?.lastname : '');
      this.personalFormGroup.get('email')?.setValue(this.employee?.employee?.email ? this.employee?.employee?.email : '');
      this.personalFormGroup.get('occupation')?.setValue(this.employee?.employee?.occupation ? this.employee?.employee?.occupation : '');
      this.personalFormGroup.get('dob')?.setValue(this.employee?.employee?.dob ? this.employee?.employee?.dob : '');
      this.personalFormGroup.get('intro')?.setValue(this.employee?.employee?.intro ? this.employee?.employee?.intro : '');
    }
  }

  patchValuesToContactForm() {
    if (this.employee?.empContact) {
      this.employee?.empContact?.forEach((contact: any) => {
        this.contactFormGroup.get('phone')?.setValue(contact?.contact ? contact?.contact[0]?.phone || '' : '');
        this.contactFormGroup.get('email')?.setValue(contact?.contact ? contact?.contact[0]?.email || '' : '');
        this.contactFormGroup.get('address')?.setValue(contact?.contact ? contact?.contact[0]?.address || '' : '');
        this.contactFormGroup.get('city')?.setValue(contact?.contact ? contact?.contact[0]?.city || '' : '');
        this.contactFormGroup.get('country')?.setValue(contact?.contact ? contact?.contact[0]?.country || '' : '');
        this.contactFormGroup.get('zip')?.setValue(contact?.contact ? contact?.contact[0]?.zipCode || '' : '');
        this.contactFormGroup.get('website')?.setValue(contact?.contact ? contact?.contact[0]?.website || '' : '');
        this.editContactId = contact?.contact ? contact?.contact[0]?.id || '' : '';
      })
    }
  }

  patchValuesToSocialForm() {
    if (this.employee?.empContact) {
      this.employee?.empContact?.forEach((social: any) => {
        this.socialFormGroup.get('facebook')?.setValue(social?.socialLinks ? social?.socialLinks[0]?.facebook || '' : '');
        this.socialFormGroup.get('twitter')?.setValue(social?.socialLinks ? social?.socialLinks[0]?.twitter || '' : '');
        this.socialFormGroup.get('instagram')?.setValue(social?.socialLinks ? social?.socialLinks[0]?.instagram || '' : '');
        this.socialFormGroup.get('linkedin')?.setValue(social?.socialLinks ? social?.socialLinks[0]?.linkedin || '' : '');
        this.socialFormGroup.get('github')?.setValue(social?.socialLinks ? social?.socialLinks[0]?.github || '' : '');
        this.editSocialLinksId = social?.socialLinks ? social.socialLinks[0]?.id || '' : '';
      })
    }
  }

  patchValuesToSearchAppearanceForm() {
    if (this.employee) {
      this.searchAppearanceFormGroup.get('expectedSalaryRange')?.setValue(this.employee?.employee?.expectedSalaryRange ? this.employee?.employee?.expectedSalaryRange : '');
      this.searchAppearanceFormGroup.get('currentExperience')?.setValue(this.employee?.employee?.currentExperience ? this.employee?.employee?.currentExperience : '');
      this.searchAppearanceFormGroup.get('keywords')?.setValue(this.employee?.employee?.keywords ? this.employee?.employee?.keywords : '');
    }
  }

  savePersonalDetails() {
    this.loading = true;
    this.employeeService.updateEmployee({
      id: this.employee?.employee?.id,
      firstname: this.personalFormGroup.get('firstname')?.value,
      lastname: this.personalFormGroup.get('lastname')?.value,
      email: this.personalFormGroup.get('email')?.value,
      occupation: this.personalFormGroup.get('occupation')?.value,
      dob: this.personalFormGroup.get('dob')?.value,
      intro: this.personalFormGroup.get('intro')?.value
    }).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Personal details updated successfully! Please refresh the page.', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  saveSearchAppearance() {
    this.loading = true;
    this.employeeService.updateSearchAppearance({
      id: this.employee?.employee?.id,
      expectedSalaryRange: this.searchAppearanceFormGroup.get('expectedSalaryRange')?.value,
      currentExperience: this.searchAppearanceFormGroup.get('currentExperience')?.value,
      keywords: this.searchAppearanceFormGroup.get('keywords')?.value
    }).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Search appearance updated successfully! Please refresh the page.', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  saveSkills() {
    this.loading = true;
    this.employeeService.addSkills({
      employeeId: this.employeeId,
      skills: [{
        id: this.generateRandomId(),
        skill: this.skillsFormGroup.get('skill')?.value,
        percentage: this.skillsFormGroup.get('percentage')?.value
      }]
    }).subscribe((data) => {
      this.clear('skills');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Skill added successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  deleteSkill(skillId: string) {
    this.employeeService.deleteSkill(this.employeeId, skillId).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Skill deleted successfully', 'Success');
    }, (error) => {
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  editSkill() {
    this.employeeService.editSkill(this.employeeId, {
      id: this.editSkillId,
      skill: this.skillsFormGroup.get('skill')?.value,
      percentage: this.skillsFormGroup.get('percentage')?.value
    }).subscribe((data) => {
      this.clear('skills');
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Skill updated successfully', 'Success');
    }, (error) => {
      this.clear('skills');
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  patchValuesToSkillsForm(skill: any) {
    this.editSkills = true;
    if (this.employee) {
      this.skillsFormGroup.get('skill')?.setValue(skill?.skill ? skill?.skill : '');
      this.skillsFormGroup.get('percentage')?.setValue(skill?.percentage ? skill?.percentage : '');
      this.editSkillId = skill?.id;
    }
  }

  saveExperience() {
    this.loading = true;
    const ex: any[] = [{
      id: this.generateRandomId(),
      company: this.experienceFormGroup.get('company')?.value,
      position: this.experienceFormGroup.get('occupation')?.value,
      country: this.experienceFormGroup.get('country')?.value,
      startDate: this.experienceFormGroup.get('start')?.value,
      endDate: this.experienceFormGroup.get('currentCheck')?.value ? 'Present' : this.experienceFormGroup.get('end')?.value,
      description: this.experienceFormGroup.get('description')?.value
    }];
    this.employeeService.addExperience({
      employeeId: this.employeeId,
      experiences: ex
    }).subscribe((data) => {
      this.clear('experience');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Experience updated successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  deleteExperience(experienceId: string) {
    this.employeeService.deleteExperience(this.employeeId, experienceId).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Experience deleted successfully', 'Success');
    }, (error) => {
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  editExperience() {
    this.employeeService.editExperience(this.employeeId, {
      id: this.editExperienceId,
      company: this.experienceFormGroup.get('company')?.value,
      position: this.experienceFormGroup.get('occupation')?.value,
      country: this.experienceFormGroup.get('country')?.value,
      startDate: this.experienceFormGroup.get('start')?.value,
      endDate: this.experienceFormGroup.get('currentCheck')?.value ? 'Present' : this.experienceFormGroup.get('end')?.value,
      description: this.experienceFormGroup.get('description')?.value
    }).subscribe((data) => {
      this.clear('experience');
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Experience updated successfully', 'Success');
    }, (error) => {
      this.clear('experience');
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  patchValuesToExperienceForm(experience: any) {
    this.editExperiences = true;
    if (this.employee) {
      this.experienceFormGroup.get('company')?.setValue(experience?.company ? experience?.company : '');
      this.experienceFormGroup.get('occupation')?.setValue(experience?.position ? experience?.position : '');
      this.experienceFormGroup.get('country')?.setValue(experience?.country ? experience?.country : '');
      this.experienceFormGroup.get('start')?.setValue(experience?.startDate ? experience?.startDate : '');
      this.experienceFormGroup.get('end')?.setValue(experience?.endDate ? experience?.endDate : '');
      this.experienceFormGroup.get('description')?.setValue(experience?.description ? experience?.description : '');
      this.experienceFormGroup.get('currentCheck')?.setValue(experience?.endDate === 'Present');
      this.editExperienceId = experience?.id ? experience?.id : '';
    }
  }

  saveEducation() {
    this.loading = true;
    const ed: any[] = [{
      id: this.generateRandomId(),
      school: this.educationFormGroup.get('school')?.value,
      degree: this.educationFormGroup.get('degree')?.value,
      country: this.educationFormGroup.get('country')?.value,
      startDate: this.educationFormGroup.get('start')?.value,
      endDate: this.educationFormGroup.get('currentCheck')?.value ? 'Present' : this.educationFormGroup.get('end')?.value,
      description: this.educationFormGroup.get('description')?.value
    }];
    this.employeeService.addEducation({
      employeeId: this.employeeId,
      education: ed
    }).subscribe((data) => {
      this.clear('education');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Experience updated successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  deleteEducation(educationId: string) {
    this.employeeService.deleteEducation(this.employeeId, educationId).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Education deleted successfully', 'Success');
    }, (error) => {
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  editEducation() {
    this.employeeService.editEducation(this.employeeId, {
      id: this.editEducationId,
      school: this.educationFormGroup.get('school')?.value,
      degree: this.educationFormGroup.get('degree')?.value,
      country: this.educationFormGroup.get('country')?.value,
      startDate: this.educationFormGroup.get('start')?.value,
      endDate: this.educationFormGroup.get('currentCheck')?.value ? 'Present' : this.educationFormGroup.get('end')?.value,
      description: this.educationFormGroup.get('description')?.value
    }).subscribe((data) => {
      this.clear('education');
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Education updated successfully', 'Success');
    }, (error) => {
      this.clear('education');
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  patchValuesToEducationForm(education: any) {
    this.editEducations = true;
    if (this.employee) {
      this.educationFormGroup.get('school')?.setValue(education?.school ? education?.school : '');
      this.educationFormGroup.get('degree')?.setValue(education?.degree ? education?.degree : '');
      this.educationFormGroup.get('country')?.setValue(education?.country ? education?.country : '');
      this.educationFormGroup.get('start')?.setValue(education?.startDate ? education?.startDate : '');
      this.educationFormGroup.get('end')?.setValue(education?.endDate ? education?.endDate : '');
      this.educationFormGroup.get('description')?.setValue(education?.description ? education?.description : '');
      this.educationFormGroup.get('currentCheck')?.setValue(education?.endDate === 'Present');
      this.editEducationId = education?.id ? education?.id : '';
    }
  }

  saveProject() {
    this.loading = true;
    const project: any[] = [{
      id: this.generateRandomId(),
      title: this.projectsFormGroup.get('project')?.value,
      company: this.projectsFormGroup.get('company')?.value,
      role: this.projectsFormGroup.get('role')?.value,
      startDate: this.projectsFormGroup.get('start')?.value,
      endDate: this.projectsFormGroup.get('currentCheck')?.value ? 'Present' : this.projectsFormGroup.get('end')?.value,
      demo: this.projectsFormGroup.get('demo')?.value,
      source: this.projectsFormGroup.get('source')?.value,
      description: this.projectsFormGroup.get('description')?.value,
    }];
    this.employeeService.addProject({
      employeeId: this.employeeId,
      projects: project
    }).subscribe((data) => {
      this.clear('project');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Project updated successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  deleteProject(projectId: string) {
    this.employeeService.deleteProject(this.employeeId, projectId).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Project deleted successfully', 'Success');
    }, (error) => {
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  editProject() {
    this.employeeService.editProject(this.employeeId, {
      id: this.editProjectId,
      title: this.projectsFormGroup.get('project')?.value,
      company: this.projectsFormGroup.get('company')?.value,
      role: this.projectsFormGroup.get('role')?.value,
      startDate: this.projectsFormGroup.get('start')?.value,
      endDate: this.projectsFormGroup.get('currentCheck')?.value ? 'Present' : this.projectsFormGroup.get('end')?.value,
      demo: this.projectsFormGroup.get('demo')?.value,
      source: this.projectsFormGroup.get('source')?.value,
      description: this.projectsFormGroup.get('description')?.value,
    }).subscribe((data) => {
      this.clear('project');
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Project updated successfully', 'Success');
    }, (error) => {
      this.clear('project');
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  patchValuesToProjectForm(project: any) {
    this.editProjects = true;
    if (this.employee) {
      this.projectsFormGroup.get('project')?.setValue(project?.title ? project?.title : '');
      this.projectsFormGroup.get('company')?.setValue(project?.company ? project?.company : '');
      this.projectsFormGroup.get('role')?.setValue(project?.role ? project?.role : '');
      this.projectsFormGroup.get('start')?.setValue(project?.startDate ? project?.startDate : '');
      this.projectsFormGroup.get('end')?.setValue(project?.endDate ? project?.endDate : '');
      this.projectsFormGroup.get('demo')?.setValue(project?.demo ? project?.demo : '');
      this.projectsFormGroup.get('source')?.setValue(project?.source ? project?.source : '');
      this.projectsFormGroup.get('description')?.setValue(project?.description ? project?.description : '');
      this.projectsFormGroup.get('currentCheck')?.setValue(project?.endDate === 'Present');
      this.editProjectId = project?.id ? project?.id : '';
    }
  }

  saveCertificate() {
    this.loading = true;
    const certificate: any[] = [{
      id: this.generateRandomId(),
      name: this.certificatesFormGroup.get('name')?.value,
      organization: this.certificatesFormGroup.get('organization')?.value,
      date: this.certificatesFormGroup.get('date')?.value,
      certificateId: this.certificatesFormGroup.get('certificateId')?.value,
      certificateUrl: this.certificatesFormGroup.get('certificateUrl')?.value,
    }];
    this.employeeService.addCertificate({
      employeeId: this.employeeId,
      certificates: certificate
    }).subscribe((data) => {
      this.clear('certificate');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Certificate updated successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  deleteCertificate(certificateId: string) {
    this.employeeService.deleteCertificate(this.employeeId, certificateId).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Certificate deleted successfully', 'Success');
    }, (error) => {
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  editCertificate() {
    this.employeeService.editCertificate(this.employeeId, {
      id: this.editCertificateId,
      name: this.certificatesFormGroup.get('name')?.value,
      organization: this.certificatesFormGroup.get('organization')?.value,
      date: this.certificatesFormGroup.get('date')?.value,
      certificateId: this.certificatesFormGroup.get('certificateId')?.value,
      certificateUrl: this.certificatesFormGroup.get('certificateUrl')?.value,
    }).subscribe((data) => {
      this.clear('certificate');
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('Certificate updated successfully', 'Success');
    }, (error) => {
      this.clear('certificate');
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  patchValuesToCertificateForm(certificate: any) {
    this.editCertificates = true;
    if (this.employee) {
      this.certificatesFormGroup.get('name')?.setValue(certificate?.title ? certificate?.title : '');
      this.certificatesFormGroup.get('organization')?.setValue(certificate?.organization ? certificate?.organization : '');
      this.certificatesFormGroup.get('date')?.setValue(certificate?.date ? certificate?.date : '');
      this.certificatesFormGroup.get('certificateId')?.setValue(certificate?.certificateId ? certificate?.certificateId : '');
      this.certificatesFormGroup.get('certificateUrl')?.setValue(certificate?.certificateUrl ? certificate?.certificateUrl : '');
      this.editCertificateId = certificate?.id ? certificate?.id : '';
    }
  }

  addContact() {
    this.loading = true;
    const contact: any[] = [{
      id: this.generateRandomId(),
      phone: this.contactFormGroup.get('phone')?.value,
      email: this.contactFormGroup.get('email')?.value,
      address: this.contactFormGroup.get('address')?.value,
      city: this.contactFormGroup.get('city')?.value,
      country: this.contactFormGroup.get('country')?.value,
      zipCode: this.contactFormGroup.get('zip')?.value,
      website: this.contactFormGroup.get('website')?.value
    }];
    this.employeeService.addContact({
      employeeId: this.employeeId,
      contact: contact
    }).subscribe((data) => {
      this.clear('contact');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Contact updated successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  updateContact(id: any) {
    this.loading = true;
    this.employeeService.editContact(this.employeeId, {
      id: id,
      phone: this.contactFormGroup.get('phone')?.value,
      email: this.contactFormGroup.get('email')?.value,
      address: this.contactFormGroup.get('address')?.value,
      city: this.contactFormGroup.get('city')?.value,
      country: this.contactFormGroup.get('country')?.value,
      zipCode: this.contactFormGroup.get('zip')?.value,
      website: this.contactFormGroup.get('website')?.value
    }).subscribe((data) => {
      this.clear('contact');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Contact updated successfully', 'Success');
    }, (error) => {
      this.clear('contact');
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  addSocial() {
    this.loading = true;
    const social: any[] = [{
      id: this.generateRandomId(),
      facebook: this.socialFormGroup.get('facebook')?.value,
      twitter: this.socialFormGroup.get('twitter')?.value,
      linkedin: this.socialFormGroup.get('linkedin')?.value,
      instagram: this.socialFormGroup.get('instagram')?.value,
      github: this.socialFormGroup.get('github')?.value
    }];
    this.employeeService.addSocial({
      employeeId: this.employeeId,
      socialLinks: social
    }).subscribe((data) => {
      this.clear('social');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Social updated successfully', 'Success');
    }, (error) => {
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  updateSocial(id: any) {
    this.loading = true;
    this.employeeService.editSocial(this.employeeId, {
      id: id,
      facebook: this.socialFormGroup.get('facebook')?.value,
      twitter: this.socialFormGroup.get('twitter')?.value,
      linkedin: this.socialFormGroup.get('linkedin')?.value,
      instagram: this.socialFormGroup.get('instagram')?.value,
      github: this.socialFormGroup.get('github')?.value
    }).subscribe((data) => {
      this.clear('social');
      this.getEmployee(this.employeeId);
      this.loading = false;
      this.alertService.successMessage('Social updated successfully', 'Success');
    }, (error) => {
      this.clear('social');
      this.loading = false;
      this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
    });
  }

  async changePass() {
    this.loading = true;
    if (this.changePassForm.valid) {
      const password: string = this.changePassForm.get('newPass')?.value || '';
      const encryptedPassword = await this.encryptionService.encryptPassword(password);
      this.credentialService.fetchCredentialByEmployeeId(this.employeeId).subscribe(async (data) => {
        if (data) {
          const oldPassword: string = await this.encryptionService.decryptPassword(data.password);
          if (oldPassword == this.changePassForm.get('oldPass')?.value) {
            if (this.changePassForm.get('newPass')?.value === this.changePassForm.get('confirmPass')?.value) {
              this.credentialService.updateCredential(this.employeeId, {
                id:data.id,
                employeeId:this.employeeId,
                firstname:data.firstname,
                lastname:data.lastname,
                email:data.email,
                password:encryptedPassword,
                role:data.role,
                userLevel:data.userLevel
              }).subscribe((data) => {
                this.clear('changePass');
                this.loading = false;
                this.alertService.successMessage('Password updated successfully', 'Success');
              }, (error) => {
                this.loading = false;
                this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
              });
            } else {
              this.loading = false;
              this.alertService.errorMessage('Passwords do not match', 'Error');
            }
          } else {
            this.loading = false;
            this.alertService.errorMessage('Old password is incorrect', 'Error');
          }
        }
      }, (error) => {
        this.loading = false;
        this.alertService.errorMessage('Something went wrong. Please try again', 'Error');
      })
    } else {
      this.loading = false;
      this.alertService.errorMessage('Please fill all the required fields', 'Error');
    }
  }

  updateNotifications() {
    this.employeeService.updateNotifications({
      id: this.employeeId,
      accountNotifications: {
        mention: this.aNotificationsForm.get('mention')?.value,
        follow: this.aNotificationsForm.get('follow')?.value,
        shareActivity: this.aNotificationsForm.get('share')?.value,
        message: this.aNotificationsForm.get('message')?.value
      },
      marketingNotifications: {
        promotion: this.mNotificationsForm.get('promotion')?.value,
        companyNews: this.mNotificationsForm.get('companyNews')?.value,
        weeklyJobs: this.mNotificationsForm.get('jobs')?.value,
        unsubscribe: this.mNotificationsForm.get('unsubscribe')?.value
      }
    }).subscribe((data) => {
      this.getEmployee(this.employeeId);
      this.alertService.successMessage('All applied changes are visible after refresh', 'Success');
    })
  }

  patchNotifications(account:any, marketing:any) {
    if (account){
      this.aNotificationsForm.get('mention')?.patchValue(account?.mention || false);
      this.aNotificationsForm.get('follow')?.patchValue(account?.follow || false);
      this.aNotificationsForm.get('share')?.patchValue(account?.shareActivity || false);
      this.aNotificationsForm.get('message')?.patchValue(account?.message || false);
    }
    if (marketing){
      this.mNotificationsForm.get('promotion')?.patchValue(marketing?.promotion || false);
      this.mNotificationsForm.get('companyNews')?.patchValue(marketing?.companyNews || false);
      this.mNotificationsForm.get('jobs')?.patchValue(marketing?.weeklyJobs || false);
      this.mNotificationsForm.get('unsubscribe')?.patchValue(marketing?.unsubscribe || false);
    }
  }

  deleteEmployee() {
    this.loading = true;
    this.employeeService.deleteEmployee(this.employeeId).subscribe((data) => {
      console.log(data);
      this.alertService.warningMessage('Account deleted permanently', 'Success');
    })
    this.cookieService.logout()
    this.router.navigate(['/']);
  }

  uploadFile(event: any, filePath: string, location: string) {
    const file = event.target.files[0];
    const maxFileSize = 2 * 1024 * 1024;
    const allowedFileTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (file) {
      if (file.size > maxFileSize) {
        this.alertService.warningMessage('File size exceeds the maximum limit of 2MB.', 'Warning');
        return;
      }
      if (!allowedFileTypes.includes(file.type)) {
        this.alertService.warningMessage('Only PNG, JPEG, and PDF files are allowed.', 'Warning');
        return;
      }
      this.loading = true;
      this.fileUploadService.uploadFile(filePath, file).subscribe(url => {
        this.downloadURL = url;
        switch (location) {
          case 'resume':
            this.employeeService.updateResume({
              id: this.employeeId,
              resume: this.downloadURL
            }).subscribe((data) => {
              this.getEmployee(this.employeeId);
              this.loading = false;
              this.alertService.successMessage('Resume uploaded successfully.', 'Success');
            }, (error) => {
              this.loading = false;
              this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
            })
            break;
          case 'cover':
            this.employeeService.updateCoverPic({
              id: this.employeeId,
              coverImage: this.downloadURL
            }).subscribe((data) => {
              this.getEmployee(this.employeeId);
              this.loading = false;
              this.alertService.successMessage('Cover image uploaded successfully.', 'Success');
            }, (error) => {
              this.loading = false;
              this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
            })
            break;
          case 'profile':
            this.employeeService.updateProfilePic({
              id: this.employeeId,
              image: this.downloadURL
            }).subscribe((data) => {
              this.getEmployee(this.employeeId);
              this.loading = false;
              this.alertService.successMessage('Profile image uploaded successfully.', 'Success');
            }, (error) => {
              this.loading = false;
              this.alertService.errorMessage('Something went wrong. Please try again.', 'Error');
            })
            break;
          default:
            break;
        }
      }, error => {
        this.loading = false;
        this.alertService.warningMessage('We are creating specific path just for you. Please re upload', 'Request');
      });
    }
  }

  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  clear(form: string) {
    switch (form) {
      case 'skills':
        this.skillsFormGroup.reset();
        this.editSkills = false;
        this.editSkillId = '';
        break;
      case 'experience':
        this.experienceFormGroup.reset();
        this.editExperiences = false;
        this.editExperienceId = '';
        break;
      case 'education':
        this.educationFormGroup.reset();
        this.editEducations = false;
        this.editEducationId = '';
        break;
      case 'project':
        this.projectsFormGroup.reset();
        this.editProjects = false;
        this.editProjectId = '';
        break;
      case 'certificate':
        this.certificatesFormGroup.reset();
        this.editCertificates = false;
        this.editCertificateId = '';
        break;
      case 'contact':
        this.contactFormGroup.reset();
        break;
      case 'changePass':
        this.changePassForm.reset();
        break;
      default:
        break;
    }
  }

  togglePasswordVisibility(id: string){
    const input: HTMLInputElement = document.getElementById(id) as HTMLInputElement;
    if (input.type === 'password'){
      input.type = 'text';
    } else {
      input.type = 'password';
    }
    switch (id) {
      case 'old-password':
        this.isp1open = !this.isp1open;
        break;
      case 'new-password':
        this.isp2open = !this.isp2open;
        break;
      default:
        break;
    }
  }
}
