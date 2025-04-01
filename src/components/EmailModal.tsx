
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UpsellInputs, UpsellResults } from "@/utils/calculatorUtils";
import { toast } from "sonner";

interface EmailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: UpsellResults;
  inputs: UpsellInputs;
}

const EmailModal: React.FC<EmailModalProps> = ({
  open,
  onOpenChange,
  results,
  inputs,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate email sending
    setIsLoading(true);
    
    setTimeout(() => {
      // This would be replaced with actual email sending code
      setIsLoading(false);
      onOpenChange(false);
      toast.success("Analysis sent to your email!");
      
      // Clear form
      setEmail("");
      setName("");
      setCompany("");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Email Your Analysis</DialogTitle>
          <DialogDescription>
            Enter your details to receive the SaaS upsell revenue analysis in your inbox.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              Your Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company" className="text-right">
              Company Name
            </Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Acme Inc."
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? "Sending..." : "Send Analysis"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;
