
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const EducationalContent: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="shadow-md border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Understanding SaaS Upsell Revenue</CardTitle>
          <CardDescription>
            How effective upselling strategies can dramatically increase your SaaS company's growth and profitability
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-left">
          <p>
            Upselling is one of the most powerful revenue growth strategies for SaaS businesses in India's rapidly expanding tech sector. 
            While customer acquisition remains important, the true profit potential often lies in expanding revenue from your existing 
            customer base through strategic upselling.
          </p>
          
          <h3 className="text-lg font-semibold text-primary mt-6">What is SaaS Upselling?</h3>
          <p>
            Upselling is the practice of encouraging customers to purchase a higher-tier package, add complementary 
            services, or expand their usage of your software. For SaaS companies, this typically takes the form of:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Upgrading from basic to premium subscription tiers</li>
            <li>Adding more user licenses or seats</li>
            <li>Purchasing advanced features or add-on modules</li>
            <li>Expanding usage across more business units</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-primary mt-6">Why Upselling Matters for SaaS Growth</h3>
          <p>
            Upselling existing customers is typically 5-25 times less expensive than acquiring new ones, making it one of the most 
            cost-effective growth strategies. Successful SaaS companies often generate 70-80% of their revenue growth from existing customers 
            through a combination of upselling and retention.
          </p>
          
          <h3 className="text-lg font-semibold text-primary mt-6">Key Metrics to Track</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Upsell Conversion Rate:</strong> The percentage of customers who accept upsell offers</li>
            <li><strong>Average Upsell Value:</strong> The average revenue increase from successful upsells</li>
            <li><strong>Upsell Revenue Percentage:</strong> The portion of total revenue coming from upsells</li>
            <li><strong>Customer Growth Rate:</strong> How quickly your customer base is expanding</li>
          </ul>
          
          <h3 className="text-lg font-semibold text-primary mt-6">Effective Upselling Strategies for Indian SaaS Companies</h3>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Value-Based Upselling:</strong> Focus on demonstrating the tangible business value and ROI of premium features, 
              not just listing technical capabilities.
            </li>
            <li>
              <strong>Usage-Triggered Offers:</strong> Monitor customer usage patterns and present upsell offers when they're approaching 
              limits or could benefit from advanced features.
            </li>
            <li>
              <strong>Success-Based Timing:</strong> Present upsells after customers have experienced success with your product, 
              such as after achieving a key milestone.
            </li>
            <li>
              <strong>Customer Segmentation:</strong> Tailor upsell approaches based on customer size, industry, usage patterns, 
              and growth potential.
            </li>
            <li>
              <strong>Training and Education:</strong> Provide resources that help customers understand the value of advanced features 
              before presenting the upsell.
            </li>
          </ol>
          
          <p className="mt-6">
            Use our calculator above to estimate the potential impact of an effective upsell strategy on your SaaS business revenue. 
            By adjusting the conversion rate, average upsell value, and other parameters, you can see how improvements in your upselling 
            approach can dramatically increase your revenue over time.
          </p>
        </CardContent>
      </Card>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">How to Use This Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-left">
          <p><strong>1. Enter your current customer count</strong> - The number of paying customers you currently have</p>
          <p><strong>2. Set your average revenue per customer</strong> - Your current monthly or annual revenue per customer</p>
          <p><strong>3. Define your upsell conversion rate</strong> - The percentage of customers you expect to successfully upsell</p>
          <p><strong>4. Estimate your average upsell value</strong> - The additional revenue per customer from successful upsells</p>
          <p><strong>5. Input your expected monthly growth rate</strong> - How quickly your customer base is growing</p>
          <p><strong>6. Select your projection timeframe</strong> - How many months into the future to project</p>
          <p><strong>7. Calculate and analyze</strong> - Review the revenue breakdown and projections</p>
          <p><strong>8. Share or download</strong> - Save your analysis as a PDF or email it to your team</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationalContent;
