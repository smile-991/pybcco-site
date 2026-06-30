import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Home from "./sections/Home";
import ScrollToTop from "./ScrollToTop";

import { Toaster } from "@/components/ui/sonner";


/* ================= Lazy Pages ================= */

const ProjectsGallery = lazy(() => import("./sections/ProjectsGallery"));
const NotFound = lazy(() => import("./sections/NotFound"));
const AdminPage = lazy(() => import("./sections/AdminPage"));
const PortalPage = lazy(() => import("./sections/PortalPage"));
const ProjectTrackingSystemRiyadh = lazy(
  () => import("./sections/ProjectTrackingSystemRiyadh")
);
const CreateAccountPage = lazy(() => import("./sections/create-account"));
const ActivateAccountPage = lazy(() => import("./sections/activate-account"));
const RequestProjectPage = lazy(() => import("@/sections/RequestProjectPage"));
const BuildingAndFinishingPricesRiyadh = lazy(
  () => import("./sections/building-and-finishing-prices-riyadh")
);
const RiyadhProjectsMapPage = lazy(
  () => import("./sections/RiyadhProjectsMapPage")
);


const Decor = lazy(() => import("@/sections/Decor"));
const DecorWood = lazy(() => import("@/sections/DecorWood"));
const DecorMarble = lazy(() => import("@/sections/DecorMarble"));
const DecorShipboard = lazy(() => import("./sections/Decorshipboard"));

const VillaFinishingRiyadh = lazy(
  () => import("./sections/VillaFinishingRiyadh")
);
const VillaRenovationRiyadh = lazy(
  () => import("./sections/VillaRenovationRiyadh")
);
const ConstructionCompanyRiyadh = lazy(
  () => import("./sections/ConstructionCompanyRiyadh")
);
const VillaFinishingPriceRiyadh = lazy(
  () => import("./sections/VillaFinishingPriceRiyadh")
);
const VillaConstructionCostCalculatorRiyadh = lazy(
  () => import("@/sections/VillaConstructionCostCalculatorRiyadh")
);
const VillaBoneConstructionRiyadh = lazy(
  () => import("./sections/VillaBoneConstructionRiyadh")
);
const ApartmentFinishingRiyadh = lazy(
  () => import("./sections/ApartmentFinishingRiyadh")
);
const HomeRenovationCompanyRiyadh = lazy(
  () => import("./sections/HomeRenovationCompanyRiyadh")
);
const ContractorAlMalqaRiyadh = lazy(
  () => import("./sections/ContractorAlMalqaRiyadh")
);
const VideosLibraryPage = lazy(() => import("./sections/VideosLibraryPage"));

const CaseStudyVillaRiyadh = lazy(
  () => import("@/sections/CaseStudyVillaRiyadh")
);
const ProfilePage = lazy(() => import("@/sections/ProfilePage"));
const PrivacyPolicy = lazy(() => import("@/sections/PrivacyPolicy"));
const TermsAndConditions = lazy(
  () => import("@/sections/TermsAndConditions")
);
const AccountHome = lazy(() => import("@/sections/AccountHome"));
const ProjectDetailsPage = lazy(
  () => import("@/sections/ProjectDetailsPage")
);
const CaseStudyRestaurantOutdoorRiyadh = lazy(
  () => import("./sections/CaseStudyRestaurantOutdoorRiyadh")
);

const EngineeringInsightsSection = lazy(
  () => import("@/sections/engineering-insights")
);
const EngineeringInsightsCostPage = lazy(
  () => import("@/engineering-insights/EngineeringInsightsCostPage")
);
const EngineeringInsightsChooseContractorPage = lazy(
  () => import("./engineering-insights/EngineeringInsightsChooseContractorPage")
);

const ConstructionAndFinishingStagesPage = lazy(
  () => import("@/engineering-insights/construction-and-finishing-stages")
);
const CommonMistakesPage = lazy(
  () => import("@/engineering-insights/common-mistakes")
);

/* ================= Choose Contractor Articles ================= */

const Top10QuestionsBeforeHiringConstructionCompany = lazy(
  () =>
    import(
      "@/engineering-insights/ChooseContractor/Top10QuestionsBeforeHiringConstructionCompany"
    )
);
const DifferenceBetweenGeneralContractorAndFinishingContractor = lazy(
  () =>
    import(
      "@/engineering-insights/ChooseContractor/DifferenceBetweenGeneralContractorAndFinishingContractor"
    )
);
const HowToChooseConstructionCompanyRiyadh = lazy(
  () =>
    import(
      "@/engineering-insights/ChooseContractor/HowToChooseConstructionCompanyRiyadh"
    )
);
const HowToVerifyConstructionCompanyQualityBeforeSigning = lazy(
  () =>
    import(
      "@/engineering-insights/ChooseContractor/HowToVerifyConstructionCompanyQualityBeforeSigning"
    )
);
const SignsOfUnprofessionalConstructionCompany = lazy(
  () =>
    import(
      "@/engineering-insights/ChooseContractor/SignsOfUnprofessionalConstructionCompany"
    )
);
const IsItBetterToHireOneConstructionCompanyOrMultipleContractors = lazy(
  () =>
    import(
      "@/engineering-insights/ChooseContractor/IsItBetterToHireOneConstructionCompanyOrMultipleContractors"
    )
);
const HowToReadConstructionQuotationProperly = lazy(
  () =>
    import(
      "@/engineering-insights/ChooseContractor/HowToReadConstructionQuotationProperly"
    )
);
const CommonMistakesWhenHiringConstructionCompanyRiyadh = lazy(
  () =>
    import(
      "@/engineering-insights/ChooseContractor/CommonMistakesWhenHiringConstructionCompanyRiyadh"
    )
);
const WhatShouldClearConstructionContractInclude = lazy(
  () =>
    import(
      "@/engineering-insights/ChooseContractor/WhatShouldClearConstructionContractInclude"
    )
);
const HowToCompareTwoConstructionCompaniesBeforeDecision = lazy(
  () =>
    import(
      "@/engineering-insights/ChooseContractor/HowToCompareTwoConstructionCompaniesBeforeDecision"
    )
);
const WhenLowConstructionPriceBecomesRedFlag = lazy(
  () =>
    import(
      "@/engineering-insights/ChooseContractor/WhenLowConstructionPriceBecomesRedFlag"
    )
);

/* ================= Construction Stages Articles ================= */

const VillaConstructionStagesSaudiArabia = lazy(
  () =>
    import(
      "@/engineering-insights/construction-and-finishing-stages/VillaConstructionStagesSaudiArabia"
    )
);
const InteriorFinishingStagesVillas = lazy(
  () =>
    import(
      "@/engineering-insights/construction-and-finishing-stages/InteriorFinishingStagesVillas"
    )
);
const HowLongDoesItTakeToBuildVillaRiyadh = lazy(
  () =>
    import(
      "@/engineering-insights/construction-and-finishing-stages/HowLongDoesItTakeToBuildVillaRiyadh"
    )
);
const ConstructionStageInspectionChecklist = lazy(
  () =>
    import(
      "@/engineering-insights/construction-and-finishing-stages/ConstructionStageInspectionChecklist"
    )
);
const StructuralShellConstructionStages = lazy(
  () =>
    import(
      "@/engineering-insights/construction-and-finishing-stages/StructuralShellConstructionStages"
    )
);
const CommonFinishingSequenceMistakes = lazy(
  () =>
    import(
      "@/engineering-insights/construction-and-finishing-stages/CommonFinishingSequenceMistakes"
    )
);
const WhenToStartFinishingAfterStructure = lazy(
  () =>
    import(
      "@/engineering-insights/construction-and-finishing-stages/WhenToStartFinishingAfterStructure"
    )
);
const DifferenceBetweenShellAndFinishing = lazy(
  () =>
    import(
      "@/engineering-insights/construction-and-finishing-stages/DifferenceBetweenShellAndFinishing"
    )
);
const VillaConstructionExecutionSchedule = lazy(
  () =>
    import(
      "@/engineering-insights/construction-and-finishing-stages/VillaConstructionExecutionSchedule"
    )
);
const HowToMonitorFinishingQuality = lazy(
  () =>
    import(
      "@/engineering-insights/construction-and-finishing-stages/HowToMonitorFinishingQuality"
    )
);

/* ================= Common Mistakes Articles ================= */

const MistakesChoosingContractorRiyadh = lazy(
  () =>
    import(
      "@/engineering-insights/common-mistakes/MistakesChoosingContractorRiyadh"
    )
);
const MistakesComparingQuotations = lazy(
  () =>
    import(
      "./engineering-insights/common-mistakes/MistakesComparingQuotations"
    )
);
const MistakesFinishingContract = lazy(
  () =>
    import("./engineering-insights/common-mistakes/MistakesFinishingContract")
);
const PlumbingMistakesBeforeClosingWalls = lazy(
  () =>
    import(
      "./engineering-insights/common-mistakes/PlumbingMistakesBeforeClosingWalls"
    )
);
const ElectricalMistakesBeforeFinishing = lazy(
  () =>
    import(
      "./engineering-insights/common-mistakes/ElectricalMistakesBeforeFinishing"
    )
);
const WaterproofingAndInsulationMistakes = lazy(
  () =>
    import(
      "./engineering-insights/common-mistakes/WaterproofingAndInsulationMistakes"
    )
);
const MistakesChoosingFinishingMaterials = lazy(
  () =>
    import(
      "./engineering-insights/common-mistakes/MistakesChoosingFinishingMaterials"
    )
);
const SchedulingAndExecutionMistakes = lazy(
  () =>
    import(
      "./engineering-insights/common-mistakes/SchedulingAndExecutionMistakes"
    )
);
const FinalHandoverMistakesChecklist = lazy(
  () =>
    import(
      "./engineering-insights/common-mistakes/FinalHandoverMistakesChecklist"
    )
);
const MistakesSiteSupervision = lazy(
  () =>
    import("./engineering-insights/common-mistakes/MistakesSiteSupervision")
);

/* ================= Cost Articles ================= */

const VillaFinishingCostRiyadh = lazy(
  () => import("@/engineering-insights/cost/villa-finishing-cost-riyadh")
);
const FinishingPricePerMeterRiyadh = lazy(
  () => import("@/engineering-insights/cost/finishing-price-per-meter-riyadh")
);
const TurnkeyFinishingRiyadh = lazy(
  () => import("@/engineering-insights/cost/turnkey-finishing-riyadh")
);
const VillaConstructionCostRiyadh = lazy(
  () => import("@/engineering-insights/cost/villa-construction-cost-riyadh")
);
const Villa300mConstructionCostRiyadh = lazy(
  () =>
    import("@/engineering-insights/cost/villa-300m-construction-cost-riyadh")
);
const GrayStructureCostRiyadh = lazy(
  () => import("@/engineering-insights/cost/gray-structure-cost-riyadh")
);
const VillaShellToFinishCostRiyadh = lazy(
  () => import("@/engineering-insights/cost/villa-shell-to-finish-cost-riyadh")
);
const ApartmentFinishingCostRiyadh = lazy(
  () => import("@/engineering-insights/cost/apartment-finishing-cost-riyadh")
);
const EconomyVsStandardVsLuxuryFinishing = lazy(
  () =>
    import(
      "@/engineering-insights/cost/economy-vs-standard-vs-luxury-finishing"
    )
);
const WhatIncreasesFinishingCostRiyadh = lazy(
  () =>
    import("@/engineering-insights/cost/what-increases-finishing-cost-riyadh")
);
const PlumbingAndElectricalCostFinishing = lazy(
  () =>
    import("@/engineering-insights/cost/plumbing-and-electrical-cost-finishing")
);
const HowToEstimateProjectCostInitially = lazy(
  () =>
    import("@/engineering-insights/cost/how-to-estimate-project-cost-initially")
);
const MisleadingQuotationMistakes = lazy(
  () => import("@/engineering-insights/cost/misleading-quotation-mistakes")
);
const HowToCompareFinishingQuotations = lazy(
  () =>
    import("@/engineering-insights/cost/how-to-compare-finishing-quotations")
);
const BathroomRenovationCostRiyadh = lazy(
  () => import("@/sections/costbathroom-renovation-cost-riyadh")
);
const AnnexConstructionCostRiyadh = lazy(
  () => import("@/sections/AnnexConstructionCostRiyadh")
);
const GypsumBoardPriceRiyadh = lazy(
  () => import("@/sections/GypsumBoardPriceRiyadh")
);
const PaintingPricePerSquareMeterRiyadh = lazy(
  () => import("./sections/PaintingPricePerSquareMeterRiyadh")
);
const PorcelainInstallationPriceRiyadh = lazy(
  () => import("./sections/PorcelainInstallationPriceRiyadh")
);

/* ================= Comparisons ================= */

const ComparisonsAndOptions = lazy(
  () => import("./engineering-insights/comparisons-and-options")
);
const EconomicVsLuxuryFinishingRiyadh = lazy(
  () =>
    import(
      "./engineering-insights/comparisons-and-options/EconomicVsLuxuryFinishingRiyadh"
    )
);
const CeramicVsPorcelainRiyadh = lazy(
  () =>
    import(
      "./engineering-insights/comparisons-and-options/CeramicVsPorcelainRiyadh"
    )
);
const GypsumBoardVsCementBoardWetAreas = lazy(
  () =>
    import(
      "./engineering-insights/comparisons-and-options/GypsumBoardVsCementBoardWetAreas"
    )
);
const CentralAcVsSplitAcVillasRiyadh = lazy(
  () =>
    import(
      "./engineering-insights/comparisons-and-options/CentralAcVsSplitAcVillasRiyadh"
    )
);
const MarbleVsQuartzVsPorcelainCountertops = lazy(
  () =>
    import(
      "./engineering-insights/comparisons-and-options/MarbleVsQuartzVsPorcelainCountertops"
    )
);
const AluminumVsUpvcWindowsRiyadh = lazy(
  () =>
    import(
      "./engineering-insights/comparisons-and-options/AluminumVsUpvcWindowsRiyadh"
    )
);
const TurnkeyVsSeparateContractorsRiyadh = lazy(
  () =>
    import(
      "./engineering-insights/comparisons-and-options/TurnkeyVsSeparateContractorsRiyadh"
    )
);
const OpenVsClosedKitchenSaudiHome = lazy(
  () =>
    import(
      "./engineering-insights/comparisons-and-options/OpenVsClosedKitchenSaudiHome"
    )
);

export default function App() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Navbar />

      <div className="pt-18">
        <ScrollToTop />

        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsGallery />} />

            <Route path="/decor" element={<Decor />} />
            <Route path="/decor/wood" element={<DecorWood />} />
            <Route path="/decor/marble" element={<DecorMarble />} />
            <Route path="/decor/shipboard" element={<DecorShipboard />} />

            <Route
              path="/villa-finishing-riyadh"
              element={<VillaFinishingRiyadh />}
            />
            <Route
              path="/villa-renovation-riyadh"
              element={<VillaRenovationRiyadh />}
            />
            <Route
              path="/construction-company-riyadh"
              element={<ConstructionCompanyRiyadh />}
            />
            <Route
              path="/villa-finishing-price-riyadh"
              element={<VillaFinishingPriceRiyadh />}
            />
            <Route path="/videos" element={<VideosLibraryPage />} />
            <Route
              path="/villa-construction-cost-calculator-riyadh"
              element={<VillaConstructionCostCalculatorRiyadh />}
            />
            <Route
              path="/projects-in-riyadh"
              element={<RiyadhProjectsMapPage />}
            />
            <Route
              path="/villa-bone-construction-riyadh"
              element={<VillaBoneConstructionRiyadh />}
            />
            <Route
              path="/apartment-finishing-riyadh"
              element={<ApartmentFinishingRiyadh />}
            />
            <Route
              path="/home-renovation-company-riyadh"
              element={<HomeRenovationCompanyRiyadh />}
            />
            <Route
              path="/contractor-almalqa-riyadh"
              element={<ContractorAlMalqaRiyadh />}
            />
            <Route
              path="/case-study-restaurant-outdoor-riyadh"
              element={<CaseStudyRestaurantOutdoorRiyadh />}
            />
            <Route
              path="/engineering-insights/cost/gypsum-board-price-riyadh"
              element={<GypsumBoardPriceRiyadh />}
            />
            <Route
              path="/engineering-insights/cost/painting-price-per-square-meter-riyadh"
              element={<PaintingPricePerSquareMeterRiyadh />}
            />

            <Route path="/account" element={<AccountHome />} />
            <Route path="/portal" element={<PortalPage />} />
            <Route
              path="/portal/projects/:id"
              element={<ProjectDetailsPage />}
            />

            <Route path="/create-account" element={<CreateAccountPage />} />
            <Route
              path="/activate-account"
              element={<ActivateAccountPage />}
            />
            <Route path="/request-project" element={<RequestProjectPage />} />

            <Route path="/admin" element={<AdminPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/building-and-finishing-prices-riyadh"
              element={<BuildingAndFinishingPricesRiyadh />}
            />

            <Route
              path="/project-tracking-system-riyadh"
              element={<ProjectTrackingSystemRiyadh />}
            />

            {/* Engineering Insights */}

            <Route
              path="/engineering-insights"
              element={<EngineeringInsightsSection />}
            />
            <Route
              path="/engineering-insights/choose-contractor"
              element={<EngineeringInsightsChooseContractorPage />}
            />
            <Route
              path="/engineering-insights/construction-and-finishing-stages"
              element={<ConstructionAndFinishingStagesPage />}
            />
            <Route
              path="/engineering-insights/common-mistakes"
              element={<CommonMistakesPage />}
            />
            <Route
              path="/engineering-insights/cost"
              element={<EngineeringInsightsCostPage />}
            />

            {/* Choose Contractor */}

            <Route
              path="/engineering-insights/how-to-choose-construction-company-riyadh"
              element={<HowToChooseConstructionCompanyRiyadh />}
            />
            <Route
              path="/engineering-insights/top-10-questions-before-hiring-construction-company"
              element={<Top10QuestionsBeforeHiringConstructionCompany />}
            />
            <Route
              path="/engineering-insights/difference-between-general-contractor-and-finishing-contractor"
              element={<DifferenceBetweenGeneralContractorAndFinishingContractor />}
            />
            <Route
              path="/engineering-insights/how-to-verify-construction-company-quality-before-signing"
              element={<HowToVerifyConstructionCompanyQualityBeforeSigning />}
            />
            <Route
              path="/engineering-insights/signs-of-unprofessional-construction-company"
              element={<SignsOfUnprofessionalConstructionCompany />}
            />
            <Route
              path="/engineering-insights/is-it-better-to-hire-one-construction-company-or-multiple-contractors"
              element={<IsItBetterToHireOneConstructionCompanyOrMultipleContractors />}
            />
            <Route
              path="/engineering-insights/how-to-read-construction-quotation-properly"
              element={<HowToReadConstructionQuotationProperly />}
            />
            <Route
              path="/engineering-insights/common-mistakes-when-hiring-construction-company-riyadh"
              element={<CommonMistakesWhenHiringConstructionCompanyRiyadh />}
            />
            <Route
              path="/engineering-insights/what-should-clear-construction-contract-include"
              element={<WhatShouldClearConstructionContractInclude />}
            />
            <Route
              path="/engineering-insights/how-to-compare-two-construction-companies-before-decision"
              element={<HowToCompareTwoConstructionCompaniesBeforeDecision />}
            />
            <Route
              path="/engineering-insights/when-low-construction-price-becomes-red-flag"
              element={<WhenLowConstructionPriceBecomesRedFlag />}
            />

            {/* Construction Stages */}

            <Route
              path="/engineering-insights/construction-and-finishing-stages/villa-construction-stages-saudi-arabia"
              element={<VillaConstructionStagesSaudiArabia />}
            />
            <Route
              path="/engineering-insights/construction-and-finishing-stages/interior-finishing-stages-villas"
              element={<InteriorFinishingStagesVillas />}
            />
            <Route
              path="/engineering-insights/construction-and-finishing-stages/how-long-does-it-take-to-build-villa-riyadh"
              element={<HowLongDoesItTakeToBuildVillaRiyadh />}
            />
            <Route
              path="/engineering-insights/construction-and-finishing-stages/construction-stage-inspection-checklist"
              element={<ConstructionStageInspectionChecklist />}
            />
            <Route
              path="/engineering-insights/construction-and-finishing-stages/structural-shell-construction-stages"
              element={<StructuralShellConstructionStages />}
            />
            <Route
              path="/engineering-insights/construction-and-finishing-stages/common-finishing-sequence-mistakes"
              element={<CommonFinishingSequenceMistakes />}
            />
            <Route
              path="/engineering-insights/construction-and-finishing-stages/when-to-start-finishing-after-structure"
              element={<WhenToStartFinishingAfterStructure />}
            />
            <Route
              path="/engineering-insights/construction-and-finishing-stages/difference-between-shell-and-finishing"
              element={<DifferenceBetweenShellAndFinishing />}
            />
            <Route
              path="/engineering-insights/construction-and-finishing-stages/villa-construction-execution-schedule"
              element={<VillaConstructionExecutionSchedule />}
            />
            <Route
              path="/engineering-insights/construction-and-finishing-stages/how-to-monitor-finishing-quality"
              element={<HowToMonitorFinishingQuality />}
            />

            {/* Common Mistakes */}

            <Route
              path="/engineering-insights/common-mistakes/mistakes-choosing-contractor-riyadh"
              element={<MistakesChoosingContractorRiyadh />}
            />
            <Route
              path="/engineering-insights/common-mistakes/mistakes-comparing-quotations"
              element={<MistakesComparingQuotations />}
            />
            <Route
              path="/engineering-insights/common-mistakes/mistakes-finishing-contract"
              element={<MistakesFinishingContract />}
            />
            <Route
              path="/engineering-insights/common-mistakes/plumbing-mistakes-before-closing-walls"
              element={<PlumbingMistakesBeforeClosingWalls />}
            />
            <Route
              path="/engineering-insights/common-mistakes/electrical-mistakes-before-finishing"
              element={<ElectricalMistakesBeforeFinishing />}
            />
            <Route
              path="/engineering-insights/common-mistakes/waterproofing-and-insulation-mistakes"
              element={<WaterproofingAndInsulationMistakes />}
            />
            <Route
              path="/engineering-insights/common-mistakes/mistakes-choosing-finishing-materials"
              element={<MistakesChoosingFinishingMaterials />}
            />
            <Route
              path="/engineering-insights/common-mistakes/scheduling-and-execution-mistakes"
              element={<SchedulingAndExecutionMistakes />}
            />
            <Route
              path="/engineering-insights/common-mistakes/final-handover-mistakes-checklist"
              element={<FinalHandoverMistakesChecklist />}
            />
            <Route
              path="/engineering-insights/common-mistakes/mistakes-site-supervision"
              element={<MistakesSiteSupervision />}
            />

            {/* Cost */}

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
              path="/engineering-insights/cost/bathroom-renovation-cost-riyadh"
              element={<BathroomRenovationCostRiyadh />}
            />
            <Route
              path="/engineering-insights/cost/annex-construction-cost-riyadh"
              element={<AnnexConstructionCostRiyadh />}
            />

            <Route
              path="/engineering-insights/comparisons-options"
              element={<ComparisonsAndOptions />}
            />
            <Route
              path="/engineering-insights/comparisons-options/economic-vs-luxury-finishing-riyadh"
              element={<EconomicVsLuxuryFinishingRiyadh />}
            />
            <Route
              path="/engineering-insights/comparisons-options/ceramic-vs-porcelain-riyadh"
              element={<CeramicVsPorcelainRiyadh />}
            />
            <Route
              path="/engineering-insights/comparisons-options/gypsum-board-vs-cement-board-wet-areas"
              element={<GypsumBoardVsCementBoardWetAreas />}
            />
            <Route
              path="/engineering-insights/comparisons-options/central-ac-vs-split-ac-villas-riyadh"
              element={<CentralAcVsSplitAcVillasRiyadh />}
            />
            <Route
              path="/engineering-insights/comparisons-options/marble-vs-quartz-vs-porcelain-countertops"
              element={<MarbleVsQuartzVsPorcelainCountertops />}
            />
            <Route
              path="/engineering-insights/comparisons-options/aluminum-vs-upvc-windows-riyadh"
              element={<AluminumVsUpvcWindowsRiyadh />}
            />
            <Route
              path="/engineering-insights/comparisons-options/turnkey-vs-separate-contractors-riyadh"
              element={<TurnkeyVsSeparateContractorsRiyadh />}
            />
            <Route
              path="/engineering-insights/comparisons-options/open-vs-closed-kitchen-saudi-home"
              element={<OpenVsClosedKitchenSaudiHome />}
            />
            <Route
              path="/engineering-insights/cost/porcelain-installation-price-riyadh"
              element={<PorcelainInstallationPriceRiyadh />}
            />

            <Route
              path="/case-study-villa-renovation-riyadh"
              element={<CaseStudyVillaRiyadh />}
            />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsAndConditions />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />
      <Toaster />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 lg:hidden">
        <a
          href="https://wa.me/966550604837"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-green-700"
        >
          🟢
        </a>

        <a
          href="tel:+966550604837"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-bold text-black shadow-lg transition-transform hover:scale-105 hover:bg-gold/90"
        >
          📞
        </a>
      </div>
    </div>
  );
}