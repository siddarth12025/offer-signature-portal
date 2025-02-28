
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SignatureCanvas from "../components/SignatureCanvas";
import Logo from "../components/Logo";
import offerContent from "../data/offerContent";

const OfferPage = () => {
  const [signatureComplete, setSignatureComplete] = useState(false);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const canvasRef = useRef<any>(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  const employeeId = localStorage.getItem("employeeId");
  
  if (!employeeId) {
    navigate("/");
    toast.error("Please sign in to view your offer");
    return null;
  }

  const handleAcceptOffer = () => {
    setOfferAccepted(true);
    toast.success("Offer accepted");
  };

  const handleSignature = (isComplete: boolean) => {
    setSignatureComplete(isComplete);
  };

  const handleClearSignature = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      setSignatureComplete(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!signatureComplete || !offerAccepted) {
      toast.error("Please accept and sign the offer before downloading");
      return;
    }

    setGeneratingPdf(true);
    
    // Simulate PDF generation delay
    setTimeout(() => {
      setGeneratingPdf(false);
      toast.success("Offer letter downloaded successfully");
      // In a real implementation, we would generate and download the PDF here
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("employeeId");
    navigate("/");
    toast.info("You have been logged out");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background with subtle gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-50 to-gray-100 -z-10" />
      
      <header className="w-full py-4 px-6 border-b border-gray-100">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <Logo />
          <Button variant="outline" onClick={handleLogout}>Log Out</Button>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-2xl font-medium text-gray-900">Your Offer Letter</h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Employee ID: {employeeId}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img 
                    src="/placeholder.svg" 
                    alt="Company Logo" 
                    className="h-16 w-auto"
                  />
                </div>
              </div>
              
              <div className="prose max-w-none mb-8">
                {offerContent.map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-6 mt-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Accept Your Offer</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Button
                      onClick={handleAcceptOffer}
                      disabled={offerAccepted}
                      className="mr-4"
                    >
                      {offerAccepted ? "Offer Accepted" : "Accept Offer"}
                    </Button>
                    <p className="text-sm text-gray-600">
                      By clicking "Accept Offer", you agree to the terms and conditions outlined in this offer letter.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your Signature</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Please sign below to confirm your acceptance of this offer.
                    </p>
                    
                    <div className="border border-gray-300 rounded-md p-4 mb-3">
                      <SignatureCanvas ref={canvasRef} onComplete={handleSignature} />
                    </div>
                    
                    <Button 
                      variant="outline" 
                      onClick={handleClearSignature}
                      size="sm"
                      className="mb-4"
                    >
                      Clear Signature
                    </Button>
                    
                    <div className="mt-6">
                      <Button
                        onClick={handleDownloadPdf}
                        disabled={!signatureComplete || !offerAccepted || generatingPdf}
                        className="w-full md:w-auto"
                      >
                        {generatingPdf ? "Generating PDF..." : "Download Offer Letter (PDF)"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
      <footer className="w-full py-4 px-6 border-t border-gray-100 mt-auto">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Powered by <a href="#" className="text-blue-600 hover:underline">Offer Portal</a>
          </p>
          <p className="text-sm text-gray-500">
            <a href="#" className="hover:underline">Privacy Policy</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OfferPage;
