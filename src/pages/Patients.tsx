import { useState } from "react";
import { ArrowLeft, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Patients = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">
                Gestion des Patients
              </h1>
              <p className="text-sm text-muted-foreground">
                Dossiers médicaux, documents et historique
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Nouveau patient
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher un patient par nom, prénom ou numéro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Patient List - Empty State */}
        <Card className="p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-tile-patients/10 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-tile-patients" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Aucun patient trouvé
            </h3>
            <p className="text-muted-foreground mb-6">
              Commencez par ajouter votre premier patient pour gérer leurs dossiers médicaux
            </p>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter un patient
            </Button>
          </div>
        </Card>

        {/* Patient Detail View - Will be shown when a patient is selected */}
        <div className="hidden">
          <Tabs defaultValue="identite" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="identite">Identité & Contacts</TabsTrigger>
              <TabsTrigger value="dossier">Dossier Médical</TabsTrigger>
              <TabsTrigger value="documents">Documents Scannés</TabsTrigger>
              <TabsTrigger value="historique">Historique</TabsTrigger>
            </TabsList>

            <TabsContent value="identite" className="mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Informations du patient</h3>
                <p className="text-muted-foreground">
                  Identité, coordonnées, mutuelle, personne à contacter...
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="dossier" className="mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Dossier Médical</h3>
                <p className="text-muted-foreground">
                  Antécédents, allergies, traitements en cours, notes médicales...
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Documents Scannés</h3>
                <p className="text-muted-foreground">
                  Pièces d'identité, ordonnances, analyses, échographies, rapports...
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="historique" className="mt-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Historique des Consultations</h3>
                <p className="text-muted-foreground">
                  Liste chronologique des rendez-vous et consultations passés...
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Patients;
