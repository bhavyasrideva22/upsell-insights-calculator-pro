
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UpsellInputs, UpsellResults, calculateUpsellMetrics } from "@/utils/calculatorUtils";
import { ArrowDown, ArrowUp, Calendar, Download, Mail } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface CalculatorFormProps {
  onResultsCalculated: (results: UpsellResults, inputs: UpsellInputs) => void;
  onEmailClick: (results: UpsellResults, inputs: UpsellInputs) => void;
  onDownloadClick: (results: UpsellResults, inputs: UpsellInputs) => void;
}

const defaultInputs: UpsellInputs = {
  currentCustomers: 1000,
  averageRevenue: 5000,
  upsellConversionRate: 15,
  upsellAverageValue: 2000,
  growthRate: 5,
  timeframe: 12
};

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  onResultsCalculated,
  onEmailClick,
  onDownloadClick
}) => {
  const [inputs, setInputs] = useState<UpsellInputs>(defaultInputs);
  const [results, setResults] = useState<UpsellResults | null>(null);
  const isMobile = useIsMobile();

  const handleInputChange = (field: keyof UpsellInputs, value: number) => {
    const updatedInputs = { ...inputs, [field]: value };
    setInputs(updatedInputs);
  };

  const handleCalculate = () => {
    const calculatedResults = calculateUpsellMetrics(inputs);
    setResults(calculatedResults);
    onResultsCalculated(calculatedResults, inputs);
    toast("Results calculated successfully");
  };

  const handleEmailResults = () => {
    if (results) {
      onEmailClick(results, inputs);
    }
  };

  const handleDownloadResults = () => {
    if (results) {
      onDownloadClick(results, inputs);
    }
  };

  return (
    <Card className="w-full shadow-md animate-fade-in">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="currentCustomers" className="text-base font-medium">
              Current Number of Customers
            </Label>
            <div className="flex items-center space-x-4">
              <Input
                id="currentCustomers"
                type="number"
                value={inputs.currentCustomers}
                onChange={(e) => handleInputChange("currentCustomers", parseInt(e.target.value) || 0)}
                className="max-w-[140px]"
                min={0}
              />
              <Slider
                value={[inputs.currentCustomers]}
                min={100}
                max={10000}
                step={100}
                onValueChange={(value) => handleInputChange("currentCustomers", value[0])}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="averageRevenue" className="text-base font-medium">
              Average Revenue per Customer (₹)
            </Label>
            <div className="flex items-center space-x-4">
              <Input
                id="averageRevenue"
                type="number"
                value={inputs.averageRevenue}
                onChange={(e) => handleInputChange("averageRevenue", parseInt(e.target.value) || 0)}
                className="max-w-[140px]"
                min={0}
              />
              <Slider
                value={[inputs.averageRevenue]}
                min={1000}
                max={50000}
                step={500}
                onValueChange={(value) => handleInputChange("averageRevenue", value[0])}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="upsellConversionRate" className="text-base font-medium">
              Upsell Conversion Rate (%)
            </Label>
            <div className="flex items-center space-x-4">
              <Input
                id="upsellConversionRate"
                type="number"
                value={inputs.upsellConversionRate}
                onChange={(e) => handleInputChange("upsellConversionRate", parseFloat(e.target.value) || 0)}
                className="max-w-[140px]"
                min={0}
                max={100}
              />
              <Slider
                value={[inputs.upsellConversionRate]}
                min={1}
                max={50}
                step={1}
                onValueChange={(value) => handleInputChange("upsellConversionRate", value[0])}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="upsellAverageValue" className="text-base font-medium">
              Average Upsell Value (₹)
            </Label>
            <div className="flex items-center space-x-4">
              <Input
                id="upsellAverageValue"
                type="number"
                value={inputs.upsellAverageValue}
                onChange={(e) => handleInputChange("upsellAverageValue", parseInt(e.target.value) || 0)}
                className="max-w-[140px]"
                min={0}
              />
              <Slider
                value={[inputs.upsellAverageValue]}
                min={500}
                max={25000}
                step={500}
                onValueChange={(value) => handleInputChange("upsellAverageValue", value[0])}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="growthRate" className="text-base font-medium">
              Monthly Customer Growth Rate (%)
            </Label>
            <div className="flex items-center space-x-4">
              <Input
                id="growthRate"
                type="number"
                value={inputs.growthRate}
                onChange={(e) => handleInputChange("growthRate", parseFloat(e.target.value) || 0)}
                className="max-w-[140px]"
                min={0}
                max={100}
              />
              <Slider
                value={[inputs.growthRate]}
                min={0}
                max={20}
                step={0.5}
                onValueChange={(value) => handleInputChange("growthRate", value[0])}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="timeframe" className="text-base font-medium">
              Projection Timeframe (Months)
            </Label>
            <div className="flex items-center space-x-4">
              <Input
                id="timeframe"
                type="number"
                value={inputs.timeframe}
                onChange={(e) => handleInputChange("timeframe", parseInt(e.target.value) || 0)}
                className="max-w-[140px]"
                min={1}
                max={60}
              />
              <Slider
                value={[inputs.timeframe]}
                min={1}
                max={36}
                step={1}
                onValueChange={(value) => handleInputChange("timeframe", value[0])}
                className="flex-1"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleCalculate} 
              className="bg-primary hover:bg-primary/90 text-white flex-1"
            >
              Calculate Upsell Revenue
            </Button>
            
            {results && (
              <div className="flex gap-2 sm:gap-4">
                <Button
                  onClick={handleEmailResults}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2"
                  disabled={!results}
                >
                  <Mail className="h-4 w-4" />
                  {!isMobile && "Email"}
                </Button>
                
                <Button
                  onClick={handleDownloadResults}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2"
                  disabled={!results}
                >
                  <Download className="h-4 w-4" />
                  {!isMobile && "Download"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalculatorForm;
