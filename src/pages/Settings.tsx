import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Integration {
  name: string;
  logo: string;
  connected: boolean;
  description: string;
}

const integrations: Integration[] = [
  {
    name: "Google Play Store",
    logo: "📱",
    connected: true,
    description: "Sync reviews from Google Play Store",
  },
  {
    name: "Apple App Store",
    logo: "🍎",
    connected: true,
    description: "Import App Store reviews and ratings",
  },
  {
    name: "CSV Upload",
    logo: "📄",
    connected: false,
    description: "Upload feedback from CSV files",
  },
  {
    name: "Twitter",
    logo: "🐦",
    connected: false,
    description: "Monitor mentions and feedback on Twitter",
  },
  {
    name: "Email",
    logo: "📧",
    connected: false,
    description: "Import customer feedback from email",
  },
  {
    name: "Zendesk",
    logo: "💬",
    connected: false,
    description: "Sync support tickets and feedback",
  },
];

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your data sources and integrations</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Connected Sources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration, idx) => (
              <Card
                key={idx}
                className="p-6 bg-gradient-card border-2 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{integration.logo}</div>
                  {integration.connected ? (
                    <Badge className="bg-success/10 text-success border-success/20">
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline">Not Connected</Badge>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {integration.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {integration.description}
                </p>

                {integration.connected ? (
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full" size="sm">
                      Manage
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-destructive hover:text-destructive"
                      size="sm"
                    >
                      Disconnect
                    </Button>
                  </div>
                ) : (
                  <Button variant="default" className="w-full" size="sm">
                    Connect
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-6 bg-gradient-card border-2">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Need Another Integration?
          </h2>
          <p className="text-muted-foreground mb-4">
            Don't see the integration you need? Let us know and we'll add it to our
            roadmap.
          </p>
          <Button variant="gradient">Request Integration</Button>
        </Card>
      </main>
    </div>
  );
};

export default Settings;
