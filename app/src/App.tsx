import { Routes, Route } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import ProjectsGallery from "./sections/ProjectsGallery";
import ScrollToTop from "./ScrollToTop";
import NotFound from "./sections/NotFound";
import AdminPage from "./sections/AdminPage";
import PortalPage from "./sections/PortalPage";
import ProjectTrackingSystemRiyadh from "./sections/ProjectTrackingSystemRiyadh";
import CreateAccountPage from "./sections/create-account";
import ActivateAccountPage from "./sections/activate-account";

import Decor from "@/sections/Decor";
import DecorWood from "@/sections/DecorWood";
import DecorMarble from "@/sections/DecorMarble";
import DecorShipboard from "./sections/Decorshipboard";

import VillaFinishingRiyadh from "./sections/VillaFinishingRiyadh";
import VillaRenovationRiyadh from "./sections/VillaRenovationRiyadh";
import ConstructionCompanyRiyadh from "./sections/ConstructionCompanyRiyadh";
import VillaFinishingPriceRiyadh from "./sections/VillaFinishingPriceRiyadh";
import VillaBoneConstructionRiyadh from "./sections/VillaBoneConstructionRiyadh";
import ApartmentFinishingRiyadh from "./sections/ApartmentFinishingRiyadh";
import HomeRenovationCompanyRiyadh from "./sections/HomeRenovationCompanyRiyadh";
import ContractorAlMalqaRiyadh from "./sections/ContractorAlMalqaRiyadh";

import CaseStudyVillaRiyadh from "@/sections/CaseStudyVillaRiyadh";
import ProfilePage from "@/sections/ProfilePage";
import ProjectDetailsPage from "@/sections/ProjectDetailsPage";
import PrivacyPolicy from "@/sections/PrivacyPolicy";
import TermsAndConditions from "@/sections/TermsAndConditions";
import EngineeringInsightsSection from "@/sections/engineering-insights";
import AccountHome from "@/sections/AccountHome";
import Top10QuestionsBeforeHiringConstructionCompany from "@/engineering-insights/ChooseContractor/Top10QuestionsBeforeHiringConstructionCompany";
import DifferenceBetweenGeneralContractorAndFinishingContractor from "@/engineering-insights/ChooseContractor/DifferenceBetweenGeneralContractorAndFinishingContractor";

import EngineeringInsightsCostPage from "@/engineering-insights/EngineeringInsightsCostPage";
import VillaFinishingCostRiyadh from "@/engineering-insights/cost/villa-finishing-cost-riyadh";
import FinishingPricePerMeterRiyadh from "@/engineering-insights/cost/finishing-price-per-meter-riyadh";
import TurnkeyFinishingRiyadh from "@/engineering-insights/cost/turnkey-finishing-riyadh";
import VillaConstructionCostRiyadh from "@/engineering-insights/cost/villa-construction-cost-riyadh";
import Villa300mConstructionCostRiyadh from "@/engineering-insights/cost/villa-300m-construction-cost-riyadh";
import GrayStructureCostRiyadh from "@/engineering-insights/cost/gray-structure-cost-riyadh";
import VillaShellToFinishCostRiyadh from "@/engineering-insights/cost/villa-shell-to-finish-cost-riyadh";
import ApartmentFinishingCostRiyadh from "@/engineering-insights/cost/apartment-finishing-cost-riyadh";
import EconomyVsStandardVsLuxuryFinishing from "@/engineering-insights/cost/economy-vs-standard-vs-luxury-finishing";
import WhatIncreasesFinishingCostRiyadh from "@/engineering-insights/cost/what-increases-finishing-cost-riyadh";
import PlumbingAndElectricalCostFinishing from "@/engineering-insights/cost/plumbing-and-electrical-cost-finishing";
import HowToEstimateProjectCostInitially from "@/engineering-insights/cost/how-to-estimate-project-cost-initially";
import MisleadingQuotationMistakes from "@/engineering-insights/cost/misleading-quotation-mistakes";
import HowToCompareFinishingQuotations from "@/engineering-insights/cost/how-to-compare-finishing-quotations";
import EngineeringInsightsChooseContractorPage from "./engineering-insights/EngineeringInsightsChooseContractorPage";
import HowToChooseConstructionCompanyRiyadh from "@/engineering-insights/ChooseContractor/HowToChooseConstructionCompanyRiyadh";
import HowToVerifyConstructionCompanyQualityBeforeSigning from "@/engineering-insights/ChooseContractor/HowToVerifyConstructionCompanyQualityBeforeSigning";
import SignsOfUnprofessionalConstructionCompany from "@/engineering-insights/ChooseContractor/SignsOfUnprofessionalConstructionCompany";
import IsItBetterToHireOneConstructionCompanyOrMultipleContractors from "@/engineering-insights/ChooseContractor/IsItBetterToHireOneConstructionCompanyOrMultipleContractors";
import HowToReadConstructionQuotationProperly from "@/engineering-insights/ChooseContractor/HowToReadConstructionQuotationProperly";
import CommonMistakesWhenHiringConstructionCompanyRiyadh from "@/engineering-insights/ChooseContractor/CommonMistakesWhenHiringConstructionCompanyRiyadh";
import WhatShouldClearConstructionContractInclude from "@/engineering-insights/ChooseContractor/WhatShouldClearConstructionContractInclude";
import HowToCompareTwoConstructionCompaniesBeforeDecision from "@/engineering-insights/ChooseContractor/HowToCompareTwoConstructionCompaniesBeforeDecision";
import WhenLowConstructionPriceBecomesRedFlag from "@/engineering-insights/ChooseContractor/WhenLowConstructionPriceBecomesRedFlag";
import VillaConstructionStagesSaudiArabia from "@/engineering-insights/construction-and-finishing-stages/VillaConstructionStagesSaudiArabia";
import InteriorFinishingStagesVillas from "@/engineering-insights/construction-and-finishing-stages/InteriorFinishingStagesVillas";
import HowLongDoesItTakeToBuildVillaRiyadh from "@/engineering-insights/construction-and-finishing-stages/HowLongDoesItTakeToBuildVillaRiyadh";
import ConstructionStageInspectionChecklist from "@/engineering-insights/construction-and-finishing-stages/ConstructionStageInspectionChecklist";
import StructuralShellConstructionStages from "@/engineering-insights/construction-and-finishing-stages/StructuralShellConstructionStages";
import CommonFinishingSequenceMistakes from "@/engineering-insights/construction-and-finishing-stages/CommonFinishingSequenceMistakes";
import WhenToStartFinishingAfterStructure from "@/engineering-insights/construction-and-finishing-stages/WhenToStartFinishingAfterStructure";
import { Toaster } from "@/components/ui/sonner";
import RequestProjectPage from "@/sections/RequestProjectPage";
import DifferenceBetweenShellAndFinishing from "@/engineering-insights/construction-and-finishing-stages/DifferenceBetweenShellAndFinishing";
import VillaConstructionExecutionSchedule from "@/engineering-insights/construction-and-finishing-stages/VillaConstructionExecutionSchedule";
import HowToMonitorFinishingQuality from "@/engineering-insights/construction-and-finishing-stages/HowToMonitorFinishingQuality";
import ConstructionAndFinishingStagesPage from "@/engineering-insights/construction-and-finishing-stages";
import CommonMistakesPage from "@/engineering-insights/common-mistakes";

export default function App() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Navbar />

      <div className="pt-18">
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsGallery />} />

          <Route path="/decor" element={<Decor />} />
          <Route path="/decor/wood" element={<DecorWood />} />
          <Route path="/decor/marble" element={<DecorMarble />} />
          <Route path="/decor/shipboard" element={<DecorShipboard />} />

          <Route path="/villa-finishing-riyadh" element={<VillaFinishingRiyadh />} />
          <Route path="/villa-renovation-riyadh" element={<VillaRenovationRiyadh />} />
          <Route path="/construction-company-riyadh" element={<ConstructionCompanyRiyadh />} />
          <Route path="/villa-finishing-price-riyadh" element={<VillaFinishingPriceRiyadh />} />
          <Route path="/villa-bone-construction-riyadh" element={<VillaBoneConstructionRiyadh />} />
          <Route path="/apartment-finishing-riyadh" element={<ApartmentFinishingRiyadh />} />
          <Route path="/home-renovation-company-riyadh" element={<HomeRenovationCompanyRiyadh />} />
          <Route path="/contractor-almalqa-riyadh" element={<ContractorAlMalqaRiyadh />} />
          

          <Route path="/account" element={<AccountHome />} />
          <Route path="/portal" element={<PortalPage />} />
          <Route path="/portal/projects/:id" element={<ProjectDetailsPage />} />

          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/activate-account" element={<ActivateAccountPage />} />
          <Route path="/request-project" element={<RequestProjectPage />} />

          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/project-tracking-system-riyadh"
            element={<ProjectTrackingSystemRiyadh />}
          />

          <Route
  path="/engineering-insights/common-mistakes"
  element={<CommonMistakesPage />}
/>
          <Route
  path="/engineering-insights/construction-and-finishing-stages"
  element={<ConstructionAndFinishingStagesPage />}
/>
          <Route
  path="/engineering-insights/construction-and-finishing-stages/how-to-monitor-finishing-quality"
  element={<HowToMonitorFinishingQuality />}
/>
          <Route
  path="/engineering-insights/construction-and-finishing-stages/villa-construction-execution-schedule"
  element={<VillaConstructionExecutionSchedule />}
/>
          <Route
  path="/engineering-insights/construction-and-finishing-stages/difference-between-shell-and-finishing"
  element={<DifferenceBetweenShellAndFinishing />}
/>
          <Route
  path="/engineering-insights/construction-and-finishing-stages/when-to-start-finishing-after-structure"
  element={<WhenToStartFinishingAfterStructure />}
/>
          <Route
  path="/engineering-insights/construction-and-finishing-stages/common-finishing-sequence-mistakes"
  element={<CommonFinishingSequenceMistakes />}
/>

          <Route
  path="/engineering-insights/construction-and-finishing-stages/structural-shell-construction-stages"
  element={<StructuralShellConstructionStages />}
/>
          <Route
  path="/engineering-insights/construction-and-finishing-stages/construction-stage-inspection-checklist"
  element={<ConstructionStageInspectionChecklist />}
/>

          <Route
  path="/engineering-insights/construction-and-finishing-stages/how-long-does-it-take-to-build-villa-riyadh"
  element={<HowLongDoesItTakeToBuildVillaRiyadh />}
/>

          <Route
  path="/engineering-insights/construction-and-finishing-stages/interior-finishing-stages-villas"
  element={<InteriorFinishingStagesVillas />}
/>
          <Route
  path="/engineering-insights/construction-and-finishing-stages/villa-construction-stages-saudi-arabia"
  element={<VillaConstructionStagesSaudiArabia />}
/>
          <Route
  path="/engineering-insights/when-low-construction-price-becomes-red-flag"
  element={<WhenLowConstructionPriceBecomesRedFlag />}
/>
          <Route
  path="/engineering-insights/how-to-compare-two-construction-companies-before-decision"
  element={<HowToCompareTwoConstructionCompaniesBeforeDecision />}
/>
          <Route
  path="/engineering-insights/what-should-clear-construction-contract-include"
  element={<WhatShouldClearConstructionContractInclude />}
/>
          <Route
  path="/engineering-insights/common-mistakes-when-hiring-construction-company-riyadh"
  element={<CommonMistakesWhenHiringConstructionCompanyRiyadh />}
/>
          <Route
 path="/engineering-insights/how-to-read-construction-quotation-properly"
 element={<HowToReadConstructionQuotationProperly />}
/>
          <Route
  path="/engineering-insights/is-it-better-to-hire-one-construction-company-or-multiple-contractors"
  element={<IsItBetterToHireOneConstructionCompanyOrMultipleContractors />}
/>
          <Route
  path="/engineering-insights/signs-of-unprofessional-construction-company"
  element={<SignsOfUnprofessionalConstructionCompany />}
/>
          <Route
  path="/engineering-insights/how-to-verify-construction-company-quality-before-signing"
  element={<HowToVerifyConstructionCompanyQualityBeforeSigning />}
/>
          <Route
  path="/engineering-insights/difference-between-general-contractor-and-finishing-contractor"
  element={<DifferenceBetweenGeneralContractorAndFinishingContractor />}
/>

          <Route
  path="/engineering-insights/top-10-questions-before-hiring-construction-company"
  element={<Top10QuestionsBeforeHiringConstructionCompany />}
/>

          <Route
  path="/engineering-insights/how-to-choose-construction-company-riyadh"
  element={<HowToChooseConstructionCompanyRiyadh />}
/>

          <Route
  path="/engineering-insights/choose-contractor"
  element={<EngineeringInsightsChooseContractorPage />}
/>

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />

          <Route path="/engineering-insights" element={<EngineeringInsightsSection />} />
          <Route
            path="/engineering-insights/how-to-choose-construction-company-riyadh"
            element={<HowToChooseConstructionCompanyRiyadh />}
          />

          <Route path="/engineering-insights/cost" element={<EngineeringInsightsCostPage />} />
          <Route
            path="/engineering-insights/cost/villa-finishing-cost-riyadh"
            element={<VillaFinishingCostRiyadh />}
          />
          <Route
            path="/engineering-insights/cost/finishing-price-per-meter-riyadh"
            element={<FinishingPricePerMeterRiyadh />}
          />
          <Route
            path="/engineering-insights/cost/turnkey-finishing-riyadh"
            element={<TurnkeyFinishingRiyadh />}
          />
          <Route
            path="/engineering-insights/cost/villa-construction-cost-riyadh"
            element={<VillaConstructionCostRiyadh />}
          />
          <Route
            path="/engineering-insights/cost/villa-300m-construction-cost-riyadh"
            element={<Villa300mConstructionCostRiyadh />}
          />
          <Route
            path="/engineering-insights/cost/gray-structure-cost-riyadh"
            element={<GrayStructureCostRiyadh />}
          />
          <Route
            path="/engineering-insights/cost/villa-shell-to-finish-cost-riyadh"
            element={<VillaShellToFinishCostRiyadh />}
          />
          <Route
            path="/engineering-insights/cost/apartment-finishing-cost-riyadh"
            element={<ApartmentFinishingCostRiyadh />}
          />
          <Route
            path="/engineering-insights/cost/economy-vs-standard-vs-luxury-finishing"
            element={<EconomyVsStandardVsLuxuryFinishing />}
          />
          <Route
            path="/engineering-insights/cost/what-increases-finishing-cost-riyadh"
            element={<WhatIncreasesFinishingCostRiyadh />}
          />
          <Route
            path="/engineering-insights/cost/plumbing-and-electrical-cost-finishing"
            element={<PlumbingAndElectricalCostFinishing />}
          />
          <Route
            path="/engineering-insights/cost/how-to-estimate-project-cost-initially"
            element={<HowToEstimateProjectCostInitially />}
          />
          <Route
            path="/engineering-insights/cost/misleading-quotation-mistakes"
            element={<MisleadingQuotationMistakes />}
          />
          <Route
            path="/engineering-insights/cost/how-to-compare-finishing-quotations"
            element={<HowToCompareFinishingQuotations />}
          />

          <Route
            path="/case-study-villa-renovation-riyadh"
            element={<CaseStudyVillaRiyadh />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
      <Toaster />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 lg:hidden">
        <a
          href="https://wa.me/966550604837"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-700"
          aria-label="WhatsApp"
        >
          🟢
        </a>

        <a
          href="tel:+966550604837"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-bold text-black shadow-lg transition-transform hover:scale-105 hover:bg-gold/90"
          aria-label="Call"
        >
          📞
        </a>
      </div>
    </div>
  );
}