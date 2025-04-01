
import React, { useState } from "react";
import { UpsellInputs, UpsellResults } from "@/utils/calculatorUtils";
import CalculatorForm from "@/components/CalculatorForm";
import CalculatorResults from "@/components/CalculatorResults";
import EducationalContent from "@/components/EducationalContent";
import EmailModal from "@/components/EmailModal";
import { generatePDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";

const Index = () => {
  const [results, setResults] = useState<UpsellResults | null>(null);
  const [currentInputs, setCurrentInputs] = useState<UpsellInputs | null>(null);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const handleResultsCalculated = (results: UpsellResults, inputs: UpsellInputs) => {
    setResults(results);
    setCurrentInputs(inputs);
  };

  const handleEmailClick = (results: UpsellResults, inputs: UpsellInputs) => {
    setEmailModalOpen(true);
  };

  const handleDownloadClick = (results: UpsellResults, inputs: UpsellInputs) => {
    try {
      // Generate PDF
      const pdfDataUri = generatePDF({
        results,
        inputs,
        companyName: "Your Company Name",
      });
      
      // Create an anchor element and trigger download
      const downloadLink = document.createElement("a");
      downloadLink.href = pdfDataUri;
      downloadLink.download = "SaaS_Upsell_Analysis.pdf";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      toast.success("Analysis downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download analysis. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-primary text-white py-8 px-4 md:px-8">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Upsell Insights Calculator Pro</h1>
          <p className="mt-2 text-white/80 max-w-2xl">
            Maximize your SaaS revenue potential with strategic upselling - Calculate the impact on your bottom line
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h2 className="text-2xl font-bold mb-6 text-charcoal">Upsell Revenue Calculator</h2>
                <CalculatorForm
                  onResultsCalculated={handleResultsCalculated}
                  onEmailClick={handleEmailClick}
                  onDownloadClick={handleDownloadClick}
                />
              </div>
            </div>

            <div className="lg:col-span-2">
              {results && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-charcoal">Your Upsell Revenue Analysis</h2>
                  <CalculatorResults results={results} />
                </>
              )}

              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-charcoal">Upselling: The Key to SaaS Growth</h2>
                <EducationalContent />
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-primary text-white py-8 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Upsell Insights Calculator Pro</h3>
              <p className="text-white/80">
                The ultimate tool for SaaS businesses to maximize revenue through strategic upselling.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white">SaaS Growth Strategies</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Upselling Best Practices</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Revenue Optimization Guide</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <p className="text-white/80">
                Helping SaaS businesses throughout India optimize their revenue and growth strategies.
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>© {new Date().getFullYear()} Upsell Insights Calculator Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {currentInputs && (
        <EmailModal
          open={emailModalOpen}
          onOpenChange={setEmailModalOpen}
          results={results!}
          inputs={currentInputs}
        />
      )}
    </div>
  );
};

export default Index;
