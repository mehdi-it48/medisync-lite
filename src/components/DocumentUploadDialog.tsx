import { useState, useRef, useEffect } from "react";
import { Upload, FileText, Loader2, Eye, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateDocument } from "@/hooks/useDocuments";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DocumentUploadDialogProps {
  patientId: string;
  patientName: string;
  children?: React.ReactNode;
}

const DOCUMENT_TYPES = [
  "Ordonnance",
  "Analyse",
  "Radiologie",
  "Compte rendu",
  "Certificat",
  "Courrier",
  "Autre",
];

export const DocumentUploadDialog = ({ patientId, patientName, children }: DocumentUploadDialogProps) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [ocrText, setOcrText] = useState("");
  const [isProcessingOcr, setIsProcessingOcr] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const createDocument = useCreateDocument();

  // Auto-generate document name when type changes
  useEffect(() => {
    if (documentType && patientName) {
      const date = new Date().toLocaleDateString("fr-FR");
      setDocumentName(`${documentType} de ${patientName} - ${date}`);
    }
  }, [documentType, patientName]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    // Create preview for images
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(selectedFile);
    } else if (selectedFile.type === "application/pdf") {
      setPreview(null);
    }
  };

  const runOcr = async () => {
    if (!file || !preview) {
      toast({
        title: "OCR non disponible",
        description: "Veuillez d'abord sélectionner une image",
        variant: "destructive",
      });
      return;
    }

    setIsProcessingOcr(true);

    try {
      const { data, error } = await supabase.functions.invoke("ocr-extract", {
        body: { imageBase64: preview },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setOcrText(data.text || "");
      
      toast({
        title: "OCR terminé",
        description: "Le texte a été extrait avec succès",
      });
    } catch (error) {
      console.error("OCR Error:", error);
      toast({
        title: "Erreur OCR",
        description: error instanceof Error ? error.message : "Impossible d'extraire le texte",
        variant: "destructive",
      });
    } finally {
      setIsProcessingOcr(false);
    }
  };

  const handleUpload = async () => {
    if (!file || !documentName || !documentType) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${patientId}/${Date.now()}_${documentName.replace(/[^a-zA-Z0-9]/g, '_')}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('patient-documents')
        .upload(fileName, file);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('patient-documents')
        .getPublicUrl(fileName);

      await createDocument.mutateAsync({
        patient_id: patientId,
        nom: documentName,
        type: documentType,
        url: publicUrl,
      });

      // Reset form
      setFile(null);
      setPreview(null);
      setDocumentName("");
      setDocumentType("");
      setOcrText("");
      setOpen(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Erreur d'upload",
        description: error instanceof Error ? error.message : "Impossible d'uploader le fichier",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setDocumentName("");
    setDocumentType("");
    setOcrText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {children || (
          <Button className="gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter un document</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* File Input */}
          <div className="space-y-2">
            <Label>Fichier</Label>
            {!file ? (
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-1">
                  Cliquez ou glissez un fichier ici
                </p>
                <p className="text-xs text-muted-foreground">
                  Images (JPG, PNG) ou PDF
                </p>
              </div>
            ) : (
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} Ko
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={resetForm}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Image Preview */}
                {preview && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-border">
                    <img src={preview} alt="Preview" className="max-h-48 w-full object-contain bg-muted" />
                  </div>
                )}
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Document Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="docName">Nom du document</Label>
              <Input
                id="docName"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                placeholder="Ex: Ordonnance Dr. Martin"
              />
            </div>
            <div className="space-y-2">
              <Label>Type de document</Label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  {DOCUMENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* OCR Section */}
          {file && file.type.startsWith("image/") && (
            <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Extraction de texte (OCR)</h4>
                  <p className="text-xs text-muted-foreground">
                    Gemini Vision - Haute précision
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={runOcr}
                  disabled={isProcessingOcr}
                  className="gap-2"
                >
                  {isProcessingOcr ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Extraction...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Extraire le texte
                    </>
                  )}
                </Button>
              </div>

              {ocrText && (
                <div className="space-y-2">
                  <Label>Texte extrait</Label>
                  <Textarea
                    value={ocrText}
                    onChange={(e) => setOcrText(e.target.value)}
                    rows={6}
                    className="text-sm font-mono"
                  />
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!file || !documentName || !documentType || isUploading}
              className="gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Enregistrer
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
