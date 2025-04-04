
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { 
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Twitter,
  Linkedin,
  Instagram, 
  Download,
  Share2 
} from "lucide-react";
import html2canvas from "html2canvas";

interface CertificateProps {
  userName: string;
  onClose: () => void;
}

const Certificate = ({ userName, onClose }: CertificateProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const { selectedDifficulty, currentLanguage } = useAppContext();
  const certificateRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Trigger confetti explosion
    const duration = 5 * 1000;
    const end = Date.now() + duration;
    
    const colors = ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'];
    
    const launchConfetti = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors
      });
      
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(launchConfetti);
      }
    };
    
    // Delay the certificate appearance for a small moment
    setTimeout(() => {
      setIsVisible(true);
      launchConfetti();
    }, 300);
    
    return () => {
      setIsVisible(false);
    };
  }, []);

  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    try {
      // Create a canvas from the certificate div
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // Higher scale for better quality
        backgroundColor: null,
        logging: false
      });
      
      // Generate a data URL from the canvas
      const dataUrl = canvas.toDataURL('image/png');
      setDownloadUrl(dataUrl);
      
      // Create a download link and trigger it
      const link = document.createElement('a');
      link.download = `${currentLanguage || 'Python'}_Certificate_${userName.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to download certificate:', error);
    }
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

  // Share to social media
  const shareToSocial = async (platform: string) => {
    if (!downloadUrl && certificateRef.current) {
      // Create canvas and get data URL if not already done
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false
      });
      const imageUrl = canvas.toDataURL('image/png');
      setDownloadUrl(imageUrl);
      
      shareWithUrl(platform, imageUrl);
    } else if (downloadUrl) {
      shareWithUrl(platform, downloadUrl);
    }
  };

  const shareWithUrl = (platform: string, imageUrl: string | null) => {
    if (!imageUrl) return;
    
    const text = `I've completed the ${currentLanguage || 'Python'} coding challenge at ${selectedDifficulty} level! 🎉 #CodingChallenge #${currentLanguage || 'Python'}Challenge`;
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(text)}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct web share API, show instructions
        alert("To share on Instagram: Download the certificate and upload it to your Instagram account");
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
    
    setShowShareDialog(false);
  };
  
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-3xl w-full"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            >
              <div 
                ref={certificateRef}
                className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border-4 border-indigo-300 dark:border-indigo-700 rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/80 dark:bg-black/40 backdrop-blur-sm"></div>
                
                <div className="relative p-8 md:p-12 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6"
                  >
                    <div className="text-xl text-indigo-600 dark:text-indigo-400 font-serif">Certificate of Achievement</div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mb-8"
                  >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white font-serif">{currentLanguage || "Python"} Challenge</h1>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mb-10"
                  >
                    <p className="text-lg text-gray-600 dark:text-gray-300">This certifies that</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 dark:text-indigo-300 my-4 font-serif">{userName || "Coding Champion"}</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      has successfully completed all <span className="font-semibold capitalize">{selectedDifficulty}</span> {currentLanguage || "Python"} challenges,
                      demonstrating exceptional coding skills and problem-solving abilities.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="flex flex-col md:flex-row justify-between items-center mt-12 mb-6 gap-6"
                  >
                    <div className="text-left">
                      <div className="text-indigo-600 dark:text-indigo-400 font-bold">Date Completed</div>
                      <div className="text-gray-800 dark:text-gray-200">{dateFormatted}</div>
                    </div>
                    
                    <div className="h-20 w-40 border-b-2 border-indigo-600 dark:border-indigo-400">
                      <div className="text-right text-indigo-600 dark:text-indigo-400 font-bold mt-auto">CodeMaster</div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="mt-8 flex justify-center gap-3"
              >
                <Button 
                  variant="outline" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white border-none"
                  onClick={onClose}
                >
                  Continue Learning
                </Button>
                
                <Button 
                  variant="outline" 
                  className="bg-white hover:bg-gray-100 text-indigo-600 border-indigo-300" 
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                
                <Button 
                  variant="outline" 
                  className="bg-white hover:bg-gray-100 text-indigo-600 border-indigo-300" 
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Achievement</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 py-4">
            <Button 
              variant="outline" 
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => shareToSocial('twitter')}
            >
              <Twitter className="h-8 w-8 text-blue-400" />
              <span>Twitter</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => shareToSocial('linkedin')}
            >
              <Linkedin className="h-8 w-8 text-blue-600" />
              <span>LinkedIn</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex flex-col items-center gap-2 h-auto py-4"
              onClick={() => shareToSocial('instagram')}
            >
              <Instagram className="h-8 w-8 text-pink-600" />
              <span>Instagram</span>
            </Button>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowShareDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Certificate;
