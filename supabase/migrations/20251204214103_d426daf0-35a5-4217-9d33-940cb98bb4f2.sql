-- Update the function to check for 'confirmed' instead of 'confirmé'
CREATE OR REPLACE FUNCTION public.add_confirmed_appointment_to_queue()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  today DATE := CURRENT_DATE;
  next_order INTEGER;
  already_in_queue BOOLEAN;
BEGIN
  -- Only trigger when status changes to 'confirmed' and appointment is today
  IF NEW.statut = 'confirmed' AND (OLD.statut IS NULL OR OLD.statut != 'confirmed') AND NEW.date = today THEN
    -- Check if patient is already in queue today
    SELECT EXISTS (
      SELECT 1 FROM public.queue 
      WHERE patient_id = NEW.patient_id 
      AND DATE(created_at) = today
      AND status IN ('waiting', 'in_consultation')
    ) INTO already_in_queue;

    IF NOT already_in_queue THEN
      -- Get next order number for today
      SELECT COALESCE(MAX(numero_ordre), 0) + 1 INTO next_order
      FROM public.queue
      WHERE DATE(created_at) = today;

      -- Insert into queue
      INSERT INTO public.queue (patient_id, numero_ordre, status, motif)
      VALUES (NEW.patient_id, next_order, 'waiting', NEW.type);
    END IF;
  END IF;

  RETURN NEW;
END;
$$;