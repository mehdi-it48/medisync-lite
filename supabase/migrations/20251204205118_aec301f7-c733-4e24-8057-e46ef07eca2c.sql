-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('patient-documents', 'patient-documents', true);

-- Allow public read access
CREATE POLICY "Public read access for documents"
ON storage.objects
FOR SELECT
USING (bucket_id = 'patient-documents');

-- Allow upload access
CREATE POLICY "Allow upload to patient-documents"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'patient-documents');

-- Allow delete access
CREATE POLICY "Allow delete from patient-documents"
ON storage.objects
FOR DELETE
USING (bucket_id = 'patient-documents');