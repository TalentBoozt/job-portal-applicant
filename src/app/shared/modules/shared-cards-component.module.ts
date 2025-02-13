import {NgModule} from "@angular/core";
import {JobPostCard1Component} from "../../components/shared/cards/job-post-card1/job-post-card1.component";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SharedPipesModule} from "./shared-pipes.module";
import {JobPostCard2Component} from "../../components/shared/cards/job-post-card2/job-post-card2.component";
import {CompanyCard1Component} from "../../components/shared/cards/company-card1/company-card1.component";
import {HireCard1Component} from "../../components/shared/cards/hire-card1/hire-card1.component";
import {JobAdCard1Component} from "../../components/shared/cards/job-ad-card1/job-ad-card1.component";
import {OfferCard1Component} from "../../components/shared/cards/offer-card1/offer-card1.component";

@NgModule({
  declarations: [
    JobPostCard1Component,
    JobPostCard2Component,
    CompanyCard1Component,
    HireCard1Component,
    JobAdCard1Component,
    OfferCard1Component
  ],
    imports: [
        NgIf,
        RouterLink,
        SharedPipesModule,
        NgClass,
        NgOptimizedImage
    ],
  exports: [
    JobPostCard1Component,
    JobPostCard2Component,
    CompanyCard1Component,
    HireCard1Component,
    JobAdCard1Component,
    OfferCard1Component
  ]
})
export class SharedCardsComponentModule {}
