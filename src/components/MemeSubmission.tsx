
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileImage, Upload } from "lucide-react";

const MemeSubmission = () => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle file drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // Process the selected file
  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        title: "Error",
        description: "Please select an image file (JPEG, PNG, GIF)",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File is too large (max 5MB)",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Submit the meme
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select an image first",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would upload the file to a server here
    // For this demo, we'll just show a success message
    setTimeout(() => {
      toast({
        title: "Meme Submitted",
        description: "Your evidence has been submitted for review!",
      });
      
      // Reset form
      setSelectedFile(null);
      setPreviewUrl(null);
    }, 1500);
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <div 
            className={`relative border-2 border-dashed rounded-lg p-6 text-center ${
              dragActive ? 'border-white bg-white/10' : 'border-white/30 hover:border-white/50'
            } transition-all duration-300`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="meme-upload"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            
            {previewUrl ? (
              <div className="space-y-4">
                <div className="relative mx-auto max-w-xs">
                  <img 
                    src={previewUrl} 
                    alt="Meme preview" 
                    className="mx-auto max-h-48 object-contain rounded-md shadow-lg"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute -top-2 -right-2 rounded-full p-1 h-8 w-8"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl(null);
                    }}
                  >
                    ✕
                  </Button>
                </div>
                <p className="text-sm text-white/60 truncate">
                  {selectedFile?.name}
                </p>
              </div>
            ) : (
              <>
                <FileImage className="h-10 w-10 mx-auto mb-4 text-white/50" />
                <label 
                  htmlFor="meme-upload"
                  className="block text-lg font-medium mb-2 cursor-pointer hover:text-white"
                >
                  Drop your meme evidence
                </label>
                <p className="text-sm text-white/60 mb-4">
                  or click to browse (JPEG, PNG, GIF up to 5MB)
                </p>
                <Button 
                  type="button" 
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20"
                  onClick={() => document.getElementById('meme-upload')?.click()}
                >
                  Select File
                </Button>
              </>
            )}
          </div>
          
          {previewUrl && (
            <div className="mt-4 flex justify-end">
              <Button 
                type="submit"
                className="w-full sm:w-auto"
              >
                <Upload className="mr-2 h-4 w-4" />
                Submit Evidence
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default MemeSubmission;
