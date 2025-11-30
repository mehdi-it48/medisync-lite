import { useState } from "react";
import { Edit, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface MedicalRecordSectionProps {
  title: string;
  value: string;
  onSave: (value: string) => void;
  placeholder: string;
  templates?: { label: string; value: string }[];
  isEditing: boolean;
  onEditToggle: () => void;
}

export const MedicalRecordSection = ({
  title,
  value,
  onSave,
  placeholder,
  templates,
  isEditing,
  onEditToggle,
}: MedicalRecordSectionProps) => {
  const [localValue, setLocalValue] = useState(value);

  const handleSave = () => {
    onSave(localValue);
    onEditToggle();
  };

  const handleAddTemplate = (templateValue: string) => {
    const currentText = localValue.trim();
    if (currentText) {
      setLocalValue(currentText + "\n• " + templateValue);
    } else {
      setLocalValue("• " + templateValue);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Button variant="ghost" size="sm" onClick={onEditToggle}>
          <Edit className="w-4 h-4" />
        </Button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          {templates && templates.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Templates rapides:</p>
              <div className="flex flex-wrap gap-2">
                {templates.map((template, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => handleAddTemplate(template.value)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {template.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Textarea
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            placeholder={placeholder}
            rows={8}
            className="font-mono text-sm"
          />

          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">
              Enregistrer
            </Button>
            <Button
              onClick={() => {
                setLocalValue(value);
                onEditToggle();
              }}
              variant="outline"
              size="sm"
            >
              Annuler
            </Button>
          </div>
        </div>
      ) : (
        <div className="whitespace-pre-wrap text-muted-foreground">
          {value || "Aucune information enregistrée"}
        </div>
      )}
    </Card>
  );
};
